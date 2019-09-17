import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import ServiceOperationBox from "../ServiceOperation/ServiceOperationBox";

interface IProps {}

interface IState {}

class ServiceAdd extends Component<IProps, IState> {
  render() {
    return (
      <Row type="flex" justify="center">
        <Col xs={22} md={16}>
          <ServiceOperationBox isEdit={false} />
        </Col>
      </Row>
    );
  }
}
export default ServiceAdd;
