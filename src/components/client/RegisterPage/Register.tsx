import React, { Component } from "react";
import { Row, Col } from "antd";
import RegisterBox from "../../_defaultComponents/RegisterBox/RegisterBox";

class Register extends Component<{}> {
  render() {
    return (
      <Row type="flex" justify="center">
        <Col xs={22} sm={20} md={16} lg={14} xl={8}>
          <RegisterBox isCounselor={false} />
        </Col>
      </Row>
    );
  }
}

export default Register;
