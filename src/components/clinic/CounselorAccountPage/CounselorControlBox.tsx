import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import moment from "moment";

import { findSubscriptionById, findSubscriptionByName } from "../../../utility/subscriptionHelper";
import * as counselorActions from "../../../store/actions/counselorActions";
import * as alertActions from "../../../store/actions/alertActions";

import SubscriptionTypeSelectBox from "../../_defaultComponents/SelectBoxes/SubscriptionTypeSelectBox";
import ActiveSwitch from "../../_defaultComponents/SwitchBox/ActiveSwitch";
import history from "../../../_core/history";
import { Card, Row, Col, Switch, Checkbox, Button, DatePicker } from "antd";

interface IProps {
  counselorInfo: any;
  updateActive: any;
  updateClinicCommission: any;
  updateCompleted: any;
  setCounselorSubscription: (params: any) => any;
  subscriptionList: Array<any>;
  showInfo: (params: any) => any;
}

interface IState {
  isActive: boolean;
  isCompleted: boolean;
  clinicCommission: number | undefined;
  subscriptionType: any;
  expirationDate: string;
}

class CommissionRate extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      isActive: false,
      isCompleted: false,
      clinicCommission: undefined,
      subscriptionType: "",
      expirationDate: ""
    };
  }

  async componentWillReceiveProps(nextProps) {
    if (this.props.counselorInfo != nextProps.counselorInfo) {
      const { isActive, clinicCommission, isCompleted, subscription } = nextProps.counselorInfo;

      const { subscriptionList } = nextProps;
      const subscriptionType =
        subscription &&
        (await findSubscriptionById({
          subscriptionList,
          subscriptionId: subscription.subscriptionId
        }));
      const expirationDate = subscription && subscription.expirationDate;
      this.setState({
        isActive,
        clinicCommission,
        isCompleted,
        subscriptionType: subscription && subscriptionType && subscriptionType.name,
        expirationDate
      });
    }
  }

  onSubscriptionChange = value => {
    this.setState({ subscriptionType: value });
  };

  setCounselorSubscription = async () => {
    const { subscriptionType, expirationDate } = this.state;
    const { subscriptionList, counselorInfo } = this.props;
    const { formatMessage } = this.props.intl;
    const subscriptionId = (await findSubscriptionByName({
      subscriptionList,
      subscriptionType
    }))._id;
    await this.props.setCounselorSubscription({
      counselorId: counselorInfo._id,
      subscriptionId,
      expirationDate
    });
    this.props.showInfo({
      title: formatMessage({ id: "SUCCESS" }),
      body: formatMessage({ id: "SUBSCRIPTION_UPDATE_SUCCESS" }),
      actionFunc: () => {}
    });
  };

  onChangeActive = async checked => {
    const { _id, clinicId } = this.props.counselorInfo;
    try {
      await this.props.updateActive({ isActive: checked, _id, clinicId });
      this.setState({ isActive: checked });
    } catch (err) {
      // console.log(err);
    }
  };

  onChangeCompleted = checked => {
    const { _id } = this.props.counselorInfo;
    this.setState({ isCompleted: checked }, () => {
      this.props.updateCompleted({ id: _id, isCompleted: checked });
    });
  };

  onSubmit = () => {
    const { _id } = this.props.counselorInfo;
    const { clinicCommission } = this.state;
    this.props.updateClinicCommission({ _id, clinicCommission });
  };

  render() {
    const {
      isActive,
      isCompleted,
      clinicCommission,
      subscriptionType,
      expirationDate
    } = this.state;
    const { subscriptionList } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Row type="flex" align="middle" style={{ marginBottom: 20 }}>
        <Col xs={24} md={16}>
          <Row type="flex" gutter={8}>
            <Col xs={24} md={10}>
              <h4>Abonelik Tipi</h4>
              <SubscriptionTypeSelectBox
                onChange={this.onSubscriptionChange}
                subscriptionList={subscriptionList}
                value={subscriptionType}
              />
            </Col>
            <Col xs={24} md={10}>
              <h4>{formatMessage({ id: "SUBSCRIPTION_EXPIRATION_DATE" })}</h4>
              <DatePicker
                placeholder={formatMessage({ id: "PICK_DATE" })}
                value={expirationDate ? moment(expirationDate, "DD/MM/YYYY") : undefined}
                onChange={date => {
                  this.setState({ expirationDate: date ? moment(date).format("DD/MM/YYYY") : "" });
                }}
                format="DD/MM/YYYY"
              />
            </Col>

            <Col style={{ marginTop: 25, justifyContent: "center" }} xs={24} md={2}>
              <Button
                disabled={!expirationDate || !subscriptionType}
                type="primary"
                onClick={this.setCounselorSubscription}
              >
                {formatMessage({ id: "SAVE" })}
              </Button>
            </Col>
          </Row>
        </Col>

        <Col xs={24} md={8}>
          <Row type="flex" justify="end">
            <Col>
              <Checkbox
                checked={isCompleted}
                onChange={e => this.onChangeCompleted(e.target.checked)}
                value={isCompleted}
              >
                <span style={{ fontSize: 15 }}>
                  {formatMessage({ id: "COUNSELOR_IS_COMPOLETED" })}
                </span>
              </Checkbox>
            </Col>
            <Col>
              <ActiveSwitch
                checked={isActive}
                onChangeChecked={checked => this.onChangeActive(checked)}
              />
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

const dispatchToProps = dispatch => {
  return {
    updateActive: params => dispatch(counselorActions.updateActive(params)),
    updateClinicCommission: params => dispatch(counselorActions.updateClinicCommission(params)),
    updateCompleted: params => dispatch(counselorActions.updateCompleted(params)),
    setCounselorSubscription: params => dispatch(counselorActions.setCounselorSubscription(params)),
    showInfo: params => dispatch(alertActions.showInfo(params))
  };
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(CommissionRate));
