import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import ServiceOperationBox from "../ServiceOperation/ServiceOperationBox";

interface IProps {
  id: string;
}

interface IState {}

class ServiceEdit extends Component<IProps, IState> {
  render() {
    const { id } = this.props;
    return (
      <Row type="flex" justify="center">
        <Col xs={22} md={16}>
          <ServiceOperationBox isEdit={true} id={id} />
        </Col>
      </Row>
    );
  }
}
export default ServiceEdit;
