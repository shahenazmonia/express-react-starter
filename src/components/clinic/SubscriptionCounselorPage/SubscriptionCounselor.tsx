import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Button } from "antd";
import { injectIntl, InjectedIntlProps } from "react-intl";

import history from "../../../_core/history";
import SubscriptionCounselorListBox from "./SubscriptionCounselorBox";
import * as alertActions from "../../../store/actions/alertActions";
import * as counselorSubscriptionActions from "../../../store/actions/counselorSubscriptionActions";
import { counselorSubscriptionType } from "../../../types/subscriptionTypes";
import { ShowAlertParams, ShowInfoAction } from "../../../store/actions/alertActions";

interface IProps {
  getCounselorSubscriptions: (params: { clinicId: string }) => any;
  removeSubscriptionCounselor: (params: { subscriptionId: string; clinicId: string }) => any;
  showConfirm: (ShowAlertParams) => ShowInfoAction;
  user: any;
}

interface IState {
  subscriptionList: Array<counselorSubscriptionType>;
}

class SubscriptionCounselor extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { subscriptionList: [] };
  }
  componentDidMount() {
    this.fetchCounselorSubscriptions();
  }

  fetchCounselorSubscriptions(params?: any) {
    const { _id } = this.props.user;
    this.props.getCounselorSubscriptions({ clinicId: _id }).then(result => {
      this.setState({ subscriptionList: result.action.payload.data });
    });
  }

  removeSubscription = ({ subscriptionId }) => {
    const { formatMessage } = this.props.intl;
    const { user } = this.props;
    this.props.showConfirm({
      title: formatMessage({ id: "DELETE" }),
      body: formatMessage({ id: "DELETE_ARE_YOU_SURE" }),
      actionFunc: async () => {
        try {
          await this.props.removeSubscriptionCounselor({ subscriptionId, clinicId: user._id });
          this.fetchCounselorSubscriptions();
        } catch {}
      }
    });
  };

  updateSubscription = ({ subscriptionId }) => {
    history.push(`/clinic/subscription/update/${subscriptionId}`);
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { subscriptionList } = this.state;
    return (
      <Row type="flex" justify="center">
        <Col span={16} style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
          <Button
            onClick={() => history.push("/clinic/subscription/new")}
            type="primary"
            icon="plus-circle"
          >
            {formatMessage({ id: "NEW_SUBSCRIPTION" })}
          </Button>
        </Col>
        <Col span={16}>
          <SubscriptionCounselorListBox
            subscriptionList={subscriptionList}
            updateSubscription={this.updateSubscription}
            removeSubscription={this.removeSubscription}
          />
        </Col>
      </Row>
    );
  }
}
const stateToProps = state => {
  return {
    user: state.user
  };
};

const dispatchToProps = dispatch => {
  return {
    getCounselorSubscriptions: params =>
      dispatch(counselorSubscriptionActions.getCounselorSubscriptions(params)),
    removeSubscriptionCounselor: params =>
      dispatch(counselorSubscriptionActions.removeCounselorSubscription(params)),
    showConfirm: params => dispatch(alertActions.showConfirm(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(SubscriptionCounselor));
