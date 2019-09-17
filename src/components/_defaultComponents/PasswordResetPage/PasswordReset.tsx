import React, { Component } from "react";
import { connect } from "react-redux";
import history from "../../../_core/history";
import { injectIntl, InjectedIntlProps } from "react-intl";
import PasswordResetBox from "./PasswordResetBox";
import * as userActions from "../../../store/actions/userActions";
import { Row, Col } from "antd";

interface IProps {
  token: string;
  checkTempToken: (params: { token: string }) => any;
}

class PasswordReset extends Component<IProps & InjectedIntlProps> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {
    this.props
      .checkTempToken({ token: this.props.token })
      .then(res => {
        console.log(res);
      })
      .catch(err => {
        history.push("/");
      });
  }

  render() {
    return (
      <Row type="flex" justify="center">
        <Col xs={22} sm={20} md={16} lg={14} xl={8}>
          <PasswordResetBox token={this.props.token} />
        </Col>
      </Row>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {
    checkTempToken: params => dispatch(userActions.checkTempToken(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(PasswordReset));
