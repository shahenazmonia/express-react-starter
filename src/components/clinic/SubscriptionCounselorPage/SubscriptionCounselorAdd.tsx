import React, { Component } from "react";
import { Row, Col } from "antd";
import SubscriptionCounselorOperationBox from "../SubscriptionCounselorOperation/SubscriptionCounselorOperationBox";

interface IProps {}

interface IState {}

class SubscriptionCounselorAdd extends Component<IProps, IState> {
  render() {
    return (
      <Row type="flex" justify="center">
        <Col xs={22} md={16}>
          <SubscriptionCounselorOperationBox isEdit={false} />
        </Col>
      </Row>
    );
  }
}
export default SubscriptionCounselorAdd;
