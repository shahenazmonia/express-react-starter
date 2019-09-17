import React, { Component } from "react";

import users from "../../../utility/constants/user";
import { connect } from "react-redux";
import ClientProfile from "../../_defaultComponents/ClientAccountPage/ClientAccount";
import ChangePasswordBox from "./ChangePasswordBox";

import { Row, Col } from "antd";

interface IProps {
  user: any;
}

class Account extends Component<IProps> {
  render() {
    const { user } = this.props;
    return (
      <Row type="flex" justify="center">
        <Col xs={22} sm={18} lg={14}>
          <ClientProfile userType={users.CLIENT} />
        </Col>
        {user.loginType === "Regular" && (
          <Col xs={22} sm={18} lg={14}>
            <ChangePasswordBox />
          </Col>
        )}
      </Row>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user || {}
  };
};
export default connect(
  stateToProps,
  null
)(Account);
