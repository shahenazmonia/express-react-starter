import React, { Component } from "react";
import { Row, Col } from "antd";
import SubscriptionClinicOperationBox from "../SubscriptionClinicOperation/SubscriptionClinicOperationBox";

interface IProps {}

interface IState {}

class SubscriptionClinicAdd extends Component<IProps, IState> {
  render() {
    return (
      <Row type="flex" justify="center">
        <Col xs={22} md={16}>
          <SubscriptionClinicOperationBox isEdit={false} />
        </Col>
      </Row>
    );
  }
}
export default SubscriptionClinicAdd;
