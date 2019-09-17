import React, { Component } from "react";
import { Row, Col } from "antd";
import ClinicOperationBox from "../ClinicOperation/ClinicOperationBox";

interface IProps {}

interface IState {}

class ClinicAdd extends Component<IProps, IState> {
  render() {
    return (
      <Row type="flex" justify="center">
        <Col xs={22} md={16}>
          <ClinicOperationBox isEdit={false} />
        </Col>
      </Row>
    );
  }
}
export default ClinicAdd;
