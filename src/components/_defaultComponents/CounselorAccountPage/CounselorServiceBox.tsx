import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";

import * as counselorCategoryActions from "../../../store/actions/counselorCategoryActions";
import ServiceSelectBox from "../SelectBoxes/ServiceSelectBox";
import ServiceList from "../List/ServiceList";
import _ from "lodash";

import { Row, Col, Card, Button, Input, InputNumber, Icon } from "antd";
const { TextArea } = Input;

type category = {
  _id: string;
  text_TR: string;
  text_EN: string;
  value: string;
  detail: string;
  generalMinPrice: number;
  mainCategory: string;
  isActive: boolean;
  clinicMinPrice: number;
  price: number;
  isCategoryUsed: boolean;
  counselorMinPrice?: number;
  description: string;
};

interface IProps {
  isCounselor?: boolean;
  counselorInfo: any;
  onScrollToView?: any;
  language: string;
  onServiceInfoSubmit(values: any): any;
  getCounselorCategories: (params: any) => any;
}

interface IState {
  serviceCategories: Array<category>;
  servicesItem: any | undefined;
  price: number | undefined;
  description: string | undefined;
  counselorCategoryOptions: [];
}

class CounselorServiceBox extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      serviceCategories: [],
      servicesItem: undefined,
      price: undefined,
      description: undefined,
      counselorCategoryOptions: []
    };
  }

  async componentDidMount() {
    try {
      const { counselorInfo } = this.props;
      const result = await Promise.all([
        this.props.getCounselorCategories({ counselorId: counselorInfo._id }),
        this.props.getCounselorCategories({
          counselorId: counselorInfo._id,
          isCategoryUsed: true
        })
      ]);
      this.setState({
        counselorCategoryOptions: result[0].action.payload.data,
        serviceCategories: result[1].action.payload.data
      });
    } catch (err) {
      // console.log(err);
    }
  }

  addServices = async () => {
    let { serviceCategories, servicesItem, price, description } = this.state;
    const index = _.findIndex(serviceCategories, { _id: servicesItem._id });
    if (servicesItem && price && index === -1) {
      serviceCategories.push({
        ...servicesItem,
        description,
        price,
        isCategoryUsed: true
      });
    } else if (servicesItem && price && description && index !== -1) {
      serviceCategories[index] = { ...servicesItem, description, price, isCategoryUsed: true };
      this.setState({ serviceCategories });
    }
    this.setState({
      serviceCategories,
      servicesItem: undefined,
      price: undefined,
      description: undefined
    });
  };

  deleteServices(item) {
    const { serviceCategories } = this.state;
    let index = _.findIndex(serviceCategories, { _id: item._id });
    serviceCategories[index] = { ...serviceCategories[index], isCategoryUsed: false };
    this.setState({ serviceCategories });
  }

  editService(item) {
    this.setState({ servicesItem: item, price: item.price, description: item.description }, () => {
      this.props.onScrollToView();
    });
  }

  onSubmit = () => {
    const { serviceCategories } = this.state;
    this.props.onServiceInfoSubmit(serviceCategories);
  };

  onChangePrice = price => {
    this.setState({ price });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { serviceCategories, servicesItem, counselorCategoryOptions } = this.state;
    const { isCounselor, language } = this.props;
    return (
      <Card
        title={formatMessage({ id: "COUNSELOR_SERVICES" })}
        bordered={true}
        style={{ marginBottom: 50 }}
      >
        <Row gutter={20} type="flex" align="middle">
          {isCounselor && (
            <Col xs={20} md={6} style={{ marginTop: 10, marginBottom: servicesItem ? 20 : 0 }}>
              <ServiceSelectBox
                language={language}
                disabled={!isCounselor}
                value={servicesItem}
                options={counselorCategoryOptions}
                usedCategories={serviceCategories}
                onChange={e => this.setState({ servicesItem: e })}
              />
            </Col>
          )}
          {isCounselor && (
            <Col xs={20} md={6} style={{ marginTop: 10 }}>
              <InputNumber
                disabled={!isCounselor}
                value={this.state.price}
                onChange={this.onChangePrice}
                style={{ width: "100%" }}
              />
              {servicesItem && (
                <span>
                  {formatMessage({ id: "MIN_PRICE_LISTED" }) +
                    " " +
                    _.max([
                      servicesItem.clinicMinPrice,
                      servicesItem.generalMinPrice,
                      servicesItem.counselorMinPrice
                    ]) +
                    " ₺"}
                </span>
              )}
            </Col>
          )}
          {isCounselor && (
            <Col span={2} style={{ marginTop: 10 }}>
              <span onClick={this.addServices}>
                <Icon type="plus-circle" style={{ fontSize: 30 }} />
              </span>
            </Col>
          )}
          {isCounselor && (
            <Col xs={20} md={12} style={{ marginTop: 10 }}>
              <TextArea
                disabled={!isCounselor}
                rows={4}
                name="description"
                value={this.state.description}
                onChange={text => this.setState({ description: text.target.value })}
              />
            </Col>
          )}
          <Col span={24}>
            <ServiceList
              language={language}
              serviceCategories={serviceCategories}
              isCounselor={isCounselor}
              deleteItem={id => this.deleteServices(id)}
              editService={edit => this.editService(edit)}
            />
          </Col>
          <Col span={24} style={{ marginTop: 20 }}>
            <Row type="flex" justify="center" align="middle">
              <Col>
                <Button disabled={!isCounselor} type="primary" onClick={this.onSubmit}>
                  {formatMessage({ id: "SAVE" })}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
      </Card>
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
    getCounselorCategories: params =>
      dispatch(counselorCategoryActions.getCounselorCategories(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(CounselorServiceBox));
