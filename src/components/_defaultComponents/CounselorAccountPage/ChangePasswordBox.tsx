import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Formik } from "formik";

import * as counselorActions from "../../../store/actions/counselorActions";
import * as userActions from "../../../store/actions/userActions";

import history from "../../../_core/history";
import { profileValidationSchema } from "./profileValdationSchema";
import { Row, Col, Card, Input, Form, Button } from "antd";

const formItemLayout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
};

interface IProps {
  user: any;
  changePassword: any;
  logout: any;
}

class ChangePasswordBox extends Component<IProps & InjectedIntlProps> {
  changePassword = (values, { setSubmitting }) => {
    const changePwParams = {
      email: this.props.user.email,
      password: values.password,
      newPassword: values.newPassword
    };
    this.props
      .changePassword({ changePwParams })
      .then(res => {
        this.props.logout();
        history.push("/login");
      })
      .finally(() => setSubmitting(false));
  };
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <Card
        title={formatMessage({ id: "CLIENT_CHANGE_PASSWORD_NAME" })}
        bordered={true}
        style={{ marginBottom: 50 }}
      >
        <Formik
          initialValues={{
            password: "",
            newPassword: "",
            newPasswordConfirm: ""
          }}
          validationSchema={profileValidationSchema.changePasswordSchema(formatMessage)}
          onSubmit={this.changePassword}
        >
          {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
            <Form>
              <Form.Item
                {...formItemLayout}
                label={formatMessage({ id: "CLIENT_CHANGE_PASSWORD" })}
                validateStatus={errors.password && touched.password ? "error" : "success"}
                help={errors.password && touched.password ? errors.password : null}
              >
                <Input
                  type="password"
                  name="password"
                  onChange={handleChange}
                  value={values.password}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label={formatMessage({ id: "CLIENT_CHANGE_PASSWORD_NEW" })}
                validateStatus={errors.newPassword && touched.newPassword ? "error" : "success"}
                help={errors.newPassword && touched.newPassword ? errors.newPassword : null}
              >
                <Input
                  type="password"
                  name="newPassword"
                  onChange={handleChange}
                  value={values.newPassword}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label={formatMessage({ id: "CLIENT_CHANGE_PASSWORD_NEW_AGAIN" })}
                validateStatus={
                  errors.newPasswordConfirm && touched.newPasswordConfirm ? "error" : "success"
                }
                help={
                  errors.newPasswordConfirm && touched.newPasswordConfirm
                    ? errors.newPasswordConfirm
                    : null
                }
              >
                <Input
                  type="password"
                  name="newPasswordConfirm"
                  onChange={handleChange}
                  value={values.newPasswordConfirm}
                />
              </Form.Item>
              <Row type="flex" justify="center" align="middle">
                <Col>
                  <Button
                    type="primary"
                    disabled={isSubmitting}
                    onClick={e => {
                      handleSubmit();
                    }}
                  >
                    {formatMessage({ id: "SAVE" })}
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
      </Card>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user || {}
  };
};

const dispatchToProps = dispatch => {
  return {
    changePassword: params => dispatch(counselorActions.changePassword(params)),
    logout: () => dispatch(userActions.logout())
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(ChangePasswordBox));
