import React, { Component } from "react";
import { Row, Col } from "antd";
import SubscriptionCounselorOperationBox from "../SubscriptionCounselorOperation/SubscriptionCounselorOperationBox";

interface IProps {
  id: string;
}

interface IState {}

class SubscriptionCounselorEdit extends Component<IProps, IState> {
  render() {
    const { id } = this.props;
    return (
      <Row type="flex" justify="center">
        <Col xs={22} md={16}>
          <SubscriptionCounselorOperationBox isEdit={true} id={id} />
        </Col>
      </Row>
    );
  }
}
export default SubscriptionCounselorEdit;
