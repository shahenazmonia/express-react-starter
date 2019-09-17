import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Icon, Button } from "antd";
import { injectIntl, InjectedIntlProps } from "react-intl";

import history from "../../../_core/history";
import SubscriptionClinicListBox from "./SubscriptionClinicListBox";
import * as alertActions from "../../../store/actions/alertActions";
import * as clinicSubscriptionActions from "../../../store/actions/clinicSubscriptionActions";
import { ShowAlertParams, ShowInfoAction } from "../../../store/actions/alertActions";

type subscriptionType = {
  _id?: string;
  name: string;
  detail: string;
  monthlyFixedFee: number;
  platformCommission: number;
  dailyMinAvailability: number;
  isActive: boolean;
};

interface IProps {
  generalSubscriptions: Array<subscriptionType>;
  removeSubscriptionClinic: (params: { subscriptionId: string }) => any;
  showConfirm: (ShowAlertParams) => ShowInfoAction;
}

interface IState {}

class SubscriptionClinic extends Component<IProps & InjectedIntlProps, IState> {
  removeSubscription = ({ subscriptionId }) => {
    const { formatMessage } = this.props.intl;
    this.props.showConfirm({
      title: formatMessage({ id: "DELETE" }),
      body: formatMessage({ id: "DELETE_ARE_YOU_SURE" }),
      actionFunc: () => {
        this.props.removeSubscriptionClinic({ subscriptionId });
      }
    });
  };

  updateSubscription = ({ subscriptionId }) => {
    history.push(`/admin/subscription/update/${subscriptionId}`);
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { generalSubscriptions } = this.props;
    return (
      <Row type="flex" justify="center">
        <Col span={16} style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
          <Button
            onClick={() => history.push("/admin/subscription/new")}
            type="primary"
            icon="plus-circle"
          >
            {formatMessage({ id: "NEW_SUBSCRIPTION" })}
          </Button>
        </Col>
        <Col span={16}>
          <SubscriptionClinicListBox
            generalSubscriptions={generalSubscriptions}
            removeSubscription={this.removeSubscription}
            updateSubscription={this.updateSubscription}
          />
        </Col>
      </Row>
    );
  }
}

const stateToProps = state => {
  return {
    generalSubscriptions: state.constants.generalSubscriptions
  };
};

const dispatchToProps = dispatch => {
  return {
    removeSubscriptionClinic: params =>
      dispatch(clinicSubscriptionActions.removeClinicSubscription(params)),
    showConfirm: params => dispatch(alertActions.showConfirm(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(SubscriptionClinic));
