import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import moment from "moment";

import categoryHelper from "../../../utility/categoryHelper";
import history from "../../../_core/history";
import SessionSubCategory from "../../_defaultComponents/SessionSubCategory";
import ServiceCategorySelectBox from "../../_defaultComponents/SelectBoxes/ServiceCategorySelectBox";
import * as counselorActions from "../../../store/actions/counselorActions";
import * as categoryActions from "../../../store/actions/categoryActions";
import * as sessionCartActions from "../../../store/actions/sessionCartActions";
import DoctorList from "./DoctorList";

import { Row, Col, DatePicker, Button } from "antd";

interface IProps {
  language: string;
  mainCategory: string;
  getCounselorListForTherapyPage: (params: any) => any;
  getCategoriesByMainCategory: (params: any) => any;
  getCounselorAndInstantTherapyInfo: (params: any) => any;
  setSessionCart: (params: any) => any;
  resetSessionCart: () => any;
}

interface IState {
  mainCategory: string;
  categories: any;
  counselorList: any;
  clickedBox: string;
  selectDate: string | undefined;
}

class OnlineTherapyStep1 extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      mainCategory: props.mainCategory,
      categories: [],
      counselorList: [],
      clickedBox: "",
      selectDate: moment().toISOString()
    };
  }

  componentDidMount() {
    const { mainCategory } = this.props;
    this.props.resetSessionCart();
    this.fetchCounselorList({ mainCategory });
    this.getCategoriesByMainCategory({ mainCategory });
  }

  fetchCounselorList(param) {
    const { selectDate } = this.state;
    const params = { selectDate, ...param };
    this.props.getCounselorListForTherapyPage(params).then(res => {
      this.setState({ counselorList: res.action.payload.data });
    });
  }

  onBoxClick = ({ category }) => {
    if (category.value !== this.state.clickedBox) {
      this.setState({ clickedBox: category.value });
      this.fetchCounselorList({ categoryId: category._id });
    } else {
      this.setState({ clickedBox: "" });
      this.fetchCounselorList({ mainCategory: this.props.mainCategory });
    }
  };

  onMainCategoryChange = mainCategory => {
    this.setState({ mainCategory, clickedBox: "" }, () => {
      history.replace("/therapy/step1/" + mainCategory);
      this.fetchCounselorList({ mainCategory: this.state.mainCategory });
      this.getCategoriesByMainCategory({ mainCategory: this.state.mainCategory });
    });
  };

  getCategoriesByMainCategory = async ({ mainCategory }) => {
    try {
      const result = await this.props.getCategoriesByMainCategory({ mainCategory });
      this.setState({ categories: result.action.payload.data });
    } catch {
      console.log("error");
    }
  };

  onInstantTherapyClick = async counselor => {
    try {
      const { clickedBox, categories } = this.state;
      const category = await categoryHelper.findCategoryInfo(categories, clickedBox);
      // console.log(category);

      //  const sessionDuration = categoryHelper.findCategoryDuration(categories, clickedBox);
      const infoData = (await this.props.getCounselorAndInstantTherapyInfo({
        counselorId: counselor._id,
        categoryId: category._id,
        duration: category.sessionDuration
      })).action.payload.data;
      //console.log(infoData);
      await this.props.setSessionCart({
        counselorId: infoData.counselorId,
        clinicId: infoData.clinicId,
        category: category.value,
        sessionDate: infoData.sessionDate,
        sessionPrice: infoData.sessionPrice,
        sessionDuration: category.sessionDuration,
        cartStartTime: moment(),
        sessionType: "instant"
      });
      await history.push("/therapy/payment");
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { language } = this.props;
    const { mainCategory, categories, counselorList, clickedBox, selectDate } = this.state;
    return (
      <Row type="flex" justify="center">
        <Col span={16}>
          <Row>
            <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
              <h3>{formatMessage({ id: "HOW_CAN_WE_HELP_YOU" })}</h3>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span={6} style={{ marginTop: 20, marginBottom: 20 }}>
              <ServiceCategorySelectBox
                value={[mainCategory]}
                mode={"default"}
                onChange={this.onMainCategoryChange}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <SessionSubCategory
                categories={categories}
                onBoxClick={this.onBoxClick}
                clickedBox={clickedBox}
                language={language}
              />
            </Col>
          </Row>
          <Row>
            <Col span={24} style={{ width: "100%", display: "flex", justifyContent: "center" }}>
              <DatePicker
                style={{ marginRight: 10 }}
                placeholder="Gün Seçiniz..."
                format="DD/MM/YYYY"
                allowClear={true}
                onChange={date =>
                  this.setState({
                    selectDate: moment(date).toISOString()
                  })
                }
              />
              <Button>Filtrele</Button>
            </Col>
          </Row>
          <Row>
            <Col span={24}>
              <DoctorList
                clickedBox={clickedBox}
                counselorList={counselorList}
                onInstantTherapyClick={this.onInstantTherapyClick}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

const stateToProps = state => {
  return {
    language: state.locale.language
  };
};

const dispatchToProps = dispatch => {
  return {
    getCounselorListForTherapyPage: params =>
      dispatch(counselorActions.getCounselorListForTherapyPage(params)),
    getCategoriesByMainCategory: params =>
      dispatch(categoryActions.getCategoriesByMainCategory(params)),
    getCounselorAndInstantTherapyInfo: params =>
      dispatch(counselorActions.getCounselorAndInstantTherapyInfo(params)),
    setSessionCart: params => dispatch(sessionCartActions.setSessionCart(params)),
    resetSessionCart: () => dispatch(sessionCartActions.resetSessionCart())
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(OnlineTherapyStep1));
