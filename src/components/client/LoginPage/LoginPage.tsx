import React, { Component } from "react";

import users from "../../../utility/constants/user";
import Login from "../../_defaultComponents/LoginPage/Login";
import { Row, Col } from "antd";

class LoginPage extends Component<{ targetPage?: string }> {
  render() {
    return <Login isAdmin={false} targetPage={this.props.targetPage} />;
  }
}

export default LoginPage;
