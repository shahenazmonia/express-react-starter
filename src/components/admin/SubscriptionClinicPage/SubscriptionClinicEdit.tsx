import React, { Component } from "react";
import { Row, Col } from "antd";
import SubscriptionClinicOperationBox from "../SubscriptionClinicOperation/SubscriptionClinicOperationBox";

interface IProps {
  id: string;
}

interface IState {}

class SubscriptionClinicEdit extends Component<IProps, IState> {
  render() {
    const { id } = this.props;
    return (
      <Row type="flex" justify="center">
        <Col xs={22} md={16}>
          <SubscriptionClinicOperationBox isEdit={true} id={id} />
        </Col>
      </Row>
    );
  }
}
export default SubscriptionClinicEdit;
