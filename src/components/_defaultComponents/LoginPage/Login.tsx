import React, { Component } from "react";
import LoginBox from "./LoginBox";
import { Row, Col } from "antd";

interface IProps {
  isAdmin: boolean;
  targetPage?: string;
}

class Login extends Component<IProps> {
  render() {
    const { isAdmin, targetPage } = this.props;
    return (
      <Row type="flex" justify="center">
        <Col xs={22} sm={20} md={16} lg={14} xl={8}>
          <LoginBox isAdmin={isAdmin} targetPage={targetPage} />
        </Col>
      </Row>
    );
  }
}

export default Login;
