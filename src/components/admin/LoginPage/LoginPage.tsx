import React, { Component } from "react";

import users from "../../../utility/constants/user";
import Login from "../../_defaultComponents/LoginPage/Login";
import { Row, Col } from "antd";

class LoginPage extends Component<{}> {
  render() {
    return <Login isAdmin={true} />;
  }
}

export default LoginPage;
