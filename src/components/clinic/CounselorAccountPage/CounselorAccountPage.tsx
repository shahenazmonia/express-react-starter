import React, { Component } from "react";
import { connect } from "react-redux";
import * as counselorActions from "../../../store/actions/counselorActions";
import * as counselorSubscriptionActions from "../../../store/actions/counselorSubscriptionActions";
import CounselorAccount from "../../_defaultComponents/CounselorAccountPage/CounselorAccount";
import CounselorControlBox from "./CounselorControlBox";
import history from "../../../_core/history";

import { Row, Col } from "antd";

interface IProps {
  counselorId: string;
  getCounselorInfo: any;
  getCounselorSubscriptions: (params: { clinicId: string }) => any;
}

interface IState {
  counselorInfo: any;
  subscriptionList: Array<any>;
}
class CounselorAccountPage extends Component<IProps, IState> {
  state = {
    counselorInfo: {},
    subscriptionList: []
  };

  async componentDidMount() {
    try {
      const { counselorId } = this.props;
      const counselorInfo = (await this.props.getCounselorInfo({ counselorId })).action.payload
        .data;
      const subscriptionList = (await this.props.getCounselorSubscriptions({
        clinicId: counselorInfo.clinicId
      })).action.payload.data;
      this.setState({
        counselorInfo,
        subscriptionList
      });
    } catch (err) {
      // history.goBack();
    }
  }

  render() {
    const { counselorInfo, subscriptionList } = this.state;
    return (
      <Row type="flex" justify="center">
        <Col xs={22} sm={18} lg={14}>
          <CounselorControlBox subscriptionList={subscriptionList} counselorInfo={counselorInfo} />
        </Col>
        <Col span={24}>
          <CounselorAccount counselorInfo={counselorInfo} />
        </Col>
      </Row>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user || {}
  };
};

const dispatchToProps = dispatch => {
  return {
    getCounselorInfo: params => dispatch(counselorActions.getCounselorInfo(params)),
    //  getCounselorCategories: params => dispatch(counselorActions.getCounselorCategories(params)),
    getCounselorSubscriptions: params =>
      dispatch(counselorSubscriptionActions.getCounselorSubscriptions(params))
  };
};

export default connect(
  null,
  dispatchToProps
)(CounselorAccountPage);
