import React, { Component } from "react";
import history from "../../../_core/history";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Formik } from "formik";

import * as userActions from "../../../store/actions/userActions";
import { passwordResetValidationSchema } from "./passwordResetValidationSchema";
import * as alertActions from "../../../store/actions/alertActions";
import { ShowAlertParams, ShowInfoAction } from "../../../store/actions/alertActions";

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
  token: any;
  resetPassword: any;
  showInfo: (ShowAlertParams) => ShowInfoAction;
}

class passwordResetBox extends Component<IProps & InjectedIntlProps> {
  resetPassword = (values, { setSubmitting }) => {
    const resetPwParams = {
      password: values.password,
      token: this.props.token
    };
    this.props
      .resetPassword(resetPwParams)
      .then(res => {
        this.props.showInfo({
          // TODO: Dil ve gosterilecek mesaj duzenlenecek
          title: "BAŞARILI",
          // TODO: Dil ve gosterilecek mesaj duzenlenecek
          body: "Şifreniz değiştirildi, yeni şifreniz ile giriş yapabilirsiniz.",
          actionFunc: () => {
            history.push("/");
          }
        });
      })
      .finally(() => setSubmitting(false));
  };
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <Card
        title={formatMessage({ id: "RESET_PASSWORD_TITLE" })}
        bordered={true}
        style={{ marginBottom: 50 }}
      >
        <Formik
          initialValues={{
            password: "",
            passwordConfirm: ""
          }}
          validationSchema={passwordResetValidationSchema(formatMessage)}
          onSubmit={this.resetPassword}
        >
          {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
            <Form>
              <Form.Item
                {...formItemLayout}
                label={formatMessage({ id: "CLIENT_CHANGE_PASSWORD_NEW" })}
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
                label={formatMessage({ id: "CLIENT_CHANGE_PASSWORD_NEW_AGAIN" })}
                validateStatus={
                  errors.passwordConfirm && touched.passwordConfirm ? "error" : "success"
                }
                help={
                  errors.passwordConfirm && touched.passwordConfirm ? errors.passwordConfirm : null
                }
              >
                <Input
                  type="password"
                  name="passwordConfirm"
                  onChange={handleChange}
                  value={values.passwordConfirm}
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
    resetPassword: params => dispatch(userActions.resetPassword(params)),
    showInfo: params => dispatch(alertActions.showInfo(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(passwordResetBox));
