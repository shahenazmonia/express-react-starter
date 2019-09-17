import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";
import { weeklyClientData } from "../../../utility/constants/weekly";
import history from "../../../_core/history";
import categoryHelper from "../../../utility/categoryHelper";
import * as counselorActions from "../../../store/actions/counselorActions";
import * as counselorCategoryActions from "../../../store/actions/counselorCategoryActions";
import * as sessionCartActions from "../../../store/actions/sessionCartActions";
import * as availabilityCalendarActions from "../../../store/actions/availabilityCalendarActions";
import * as alertActions from "../../../store/actions/alertActions";
import { ShowAlertParams, ShowInfoAction } from "../../../store/actions/alertActions";
import SessionSubCategory from "../../_defaultComponents/SessionSubCategory";
import StepsComponent from "../../_defaultComponents/StepsComponent/StepsComponent";
import CalendarComponentClient from "../../_defaultComponents/CalendarComponent/CalendarComponentClient";
import DoctorProfile from "./DoctorProfile";

import { Row, Col, Button, DatePicker } from "antd";

interface IProps {
  sessionCart: any;
  counselorId: string;
  category?: string;
  language: string;
  showWarning: (ShowAlertParams) => ShowInfoAction;
  getCounselorInfo: (params: any) => any;
  getCounselorCategories: (params: any) => any;
  setSessionCart: (params: any) => any;
  getEffectivePrice: (params: any) => any;
  getCounselorAvailabilityForClient: (params: { counselorId: string; selectedDate: string }) => any;
}

interface IState {
  counselor: any;
  counselorCategories: any;
  clickedBox: string;
  sessionDate: any | undefined;
  availabilityData: Array<{ day: Array<number>; time: string }> | any;
  selectedDate: any;
  appointmentDays: any;
}

class OnlineTherapyStep2 extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      counselor: {},
      counselorCategories: [],
      clickedBox: "",
      sessionDate: undefined,
      availabilityData: weeklyClientData,
      selectedDate: moment().utc(),
      appointmentDays: []
    };
  }

  /*getSearchQuery(): any {
    const searchText = history.location.search;
    const query = _.split(_.split(searchText, "?")[1], "=");
    let queryObj = {};
    queryObj[query[0]] = query[1];
    return queryObj;
  }*/

  componentDidMount() {
    const { selectedDate } = this.state;
    const { category, sessionCart } = this.props;
    let counselorId = sessionCart.counselorId ? sessionCart.counselorId : this.props.counselorId;
    if (sessionCart.category) {
      this.setState({ clickedBox: sessionCart.category });
    } else if (category) {
      this.setState({ clickedBox: category });
    }
    if (sessionCart.sessionDate) {
      this.setState({ sessionDate: moment(sessionCart.selectedDate) });
    }
    this.fetchCounselorInfo({ counselorId });
    this.getCounselorAvailabilityForClient({ counselorId, selectedDate });
  }

  getCounselorAvailabilityForClient = async ({ counselorId, selectedDate }) => {
    try {
      const counselorAvailability = await this.props.getCounselorAvailabilityForClient({
        counselorId,
        selectedDate
      });
      this.replaceAvailability({
        data: counselorAvailability.action.payload.data.counselorAvailableDays
      });
      this.setState({ appointmentDays: counselorAvailability.action.payload.data.appointmentDays });
    } catch (err) {
      // console.log(err);
    }
  };

  localizeAvailabilityData = data => {
    let localizedAvailabiltyData: any = [];
    data.forEach(element => {
      element.availableDays.forEach(availableDay => {
        const localDate = moment.utc(element.time + " " + availableDay, "HH:mm d").local();
        localizedAvailabiltyData.push({ day: localDate.day(), time: localDate.format("HH:mm") });
      });
    });
    const regroupedAvailabilityData = _.chain(localizedAvailabiltyData)
      .groupBy(data => data.time)
      .map((value, key) => ({ time: key, availableDays: value.map(obj => obj.day) }))
      .value();
    // console.log(regroupedAvailabilityData);
    return regroupedAvailabilityData;
  };

  replaceAvailability = async ({ data }) => {
    const { availabilityData } = this.state;
    const localizedAvailabiltyData = await this.localizeAvailabilityData(data);
    await localizedAvailabiltyData.forEach(async (element, i) => {
      const index = await _.findIndex(availabilityData, { time: element.time });
      availabilityData[index] = { ...localizedAvailabiltyData[i] };
    });
    const maxTime = await _.maxBy(localizedAvailabiltyData, "time").time;
    const minTime = await _.minBy(localizedAvailabiltyData, "time").time;
    await this.state.availabilityData.forEach(async (element, i) => {
      if (
        element &&
        _.isEmpty(element.availableDays) &&
        (element.time > maxTime || element.time < minTime)
      ) {
        availabilityData[i] = undefined;
      }
    });
    this.setState({ availabilityData: _.compact(this.state.availabilityData) });
  };

  async fetchCounselorInfo({ counselorId }) {
    this.props.getCounselorInfo({ counselorId }).then(result => {
      this.setState({ counselor: result.action.payload.data });
    });
    try {
      const result = await Promise.all([
        this.props.getCounselorInfo({ counselorId }),
        this.props.getCounselorCategories({ counselorId, isCategoryUsed: true })
      ]);
      this.setState({
        counselor: result[0].action.payload.data,
        counselorCategories: result[1].action.payload.data
      });
    } catch (err) {
      console.log(err);
    }
  }

  onBoxClick = ({ category, effectivePrice }) => {
    this.setState({ clickedBox: category.value });
  };

  onSelectedDate = ({ sessionDate }) => {
    this.setState({ sessionDate });
  };

  onPassToPaymentClick = async () => {
    const { counselor, counselorCategories, clickedBox, sessionDate } = this.state;
    const { formatMessage } = this.props.intl;
    const category = categoryHelper.findCategoryInfo(counselorCategories, clickedBox);
    const sessionPrice = category.effectivePrice;
    const sessionDuration = category.sessionDuration;
    if (sessionDate) {
      const sessionCart = {
        category: clickedBox,
        counselorId: counselor._id,
        clinicId: counselor.clinicId,
        sessionDuration,
        sessionDate,
        sessionPrice,
        cartStartTime: moment(),
        sessionType: "regular"
      };
      await this.props.setSessionCart(sessionCart);
      await history.push("/therapy/payment");
    } else {
      this.props.showWarning({
        title: formatMessage({ id: "WARNING" }),
        body: formatMessage({ id: "WARNING_SESSION_TIME" }),
        actionFunc: async () => {}
      });
    }
  };

  onChangeDate = async date => {
    const { sessionCart } = this.props;
    let counselorId = sessionCart.counselorId ? sessionCart.counselorId : this.props.counselorId;
    const selectedDate = await moment(date).utc();
    await this.setState({
      selectedDate
    });
    await this.getCounselorAvailabilityForClient({ counselorId, selectedDate });
  };

  render() {
    const {
      counselor,
      counselorCategories,
      clickedBox,
      availabilityData,
      selectedDate,
      appointmentDays
    } = this.state;
    const { counselorId, language } = this.props;
    const { formatMessage } = this.props.intl;
    const stepsData = {
      current: 1,
      titleSteps: [
        {
          title: "Doktor Seçimi"
        },
        {
          title: "Gün ve Saat Seçimi"
        },
        {
          title: "Ödeme"
        }
      ]
    };
    return (
      <React.Fragment>
        <Row type="flex" justify="center">
          <Col span={16} style={{ marginBottom: 100, marginTop: 30 }}>
            <StepsComponent stepsData={stepsData} />
          </Col>
          <Col span={16} style={{ marginBottom: 100 }}>
            <DoctorProfile counselor={counselor} />
          </Col>
          <Col span={16}>
            <SessionSubCategory
              categories={counselorCategories}
              onBoxClick={this.onBoxClick}
              clickedBox={clickedBox}
              language={language}
            />
          </Col>
          {clickedBox && (
            <React.Fragment>
              <Col
                span={16}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  marginBottom: 20,
                  marginTop: 20
                }}
              >
                <DatePicker
                  format={"DD/MM/YYYY"}
                  defaultValue={moment()}
                  allowClear={false}
                  onChange={this.onChangeDate}
                  placeholder="Tarih seçiniz"
                />
              </Col>
              <Col span={16}>
                <CalendarComponentClient
                  availabilityData={availabilityData}
                  clickedBox={clickedBox}
                  duration={categoryHelper.findCategoryDuration(counselorCategories, clickedBox)}
                  selectedDate={selectedDate}
                  onSelectedDate={this.onSelectedDate}
                  appointmentDays={appointmentDays}
                />
              </Col>
              <Col span={16} style={{ display: "flex", justifyContent: "center" }}>
                <Button type="primary" ghost onClick={this.onPassToPaymentClick}>
                  {formatMessage({ id: "THERAPY_PAYMENT_PAY" })}
                </Button>
              </Col>
            </React.Fragment>
          )}
        </Row>
      </React.Fragment>
    );
  }
}

const stateToProps = state => {
  return {
    sessionCart: state.sessionCart || {},
    language: state.locale.language
  };
};

const dispatchToProps = dispatch => {
  return {
    getCounselorInfo: params => dispatch(counselorActions.getCounselorInfo(params)),
    getCounselorCategories: params =>
      dispatch(counselorCategoryActions.getCounselorCategories(params)),
    getEffectivePrice: params => dispatch(counselorActions.getEffectivePrice(params)),
    setSessionCart: params => dispatch(sessionCartActions.setSessionCart(params)),
    getCounselorAvailabilityForClient: params =>
      dispatch(availabilityCalendarActions.getCounselorAvailabilityForClient(params)),
    showWarning: params => dispatch(alertActions.showWarning(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(OnlineTherapyStep2));
