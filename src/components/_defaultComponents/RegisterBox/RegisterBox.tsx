import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import history from "../../../_core/history";
import { registerValidationSchema } from "./registerValidationSchema";
import * as userActions from "../../../store/actions/userActions";
import * as counselorActions from "../../../store/actions/counselorActions";
import PolicyModal from "../Modals/PolicyModal";
import moment from "moment-timezone";

import { Form, Input, Button, Card, Row, Col, Checkbox } from "antd";

const formItemLayout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
};

interface IProps {
  register(params: any): any;
  addPassword(params: any): any;
  isCounselor: boolean;
  id?: string;
  email?: string;
}

interface IState {
  openPPModal: boolean;
}

class RegisterBox extends Component<IProps & InjectedIntlProps, IState> {
  state = { openPPModal: false };
  clientRegister = (values, { setSubmitting }) => {
    this.props
      .register({
        email: values.email,
        password: values.password,
        role: "client",
        timezone: moment.tz.guess()
      })
      .then(res => {
        history.push("/login");
      })
      .catch(err => {
        setSubmitting(false);
      });
  };

  counselorRegister = (values, { setSubmitting }) => {
    const { id } = this.props;
    this.props.addPassword({ id: id, email: values.email, password: values.password }).then(res => {
      history.push("/login");
    });
  };

  openPolicyModal = () => {
    this.setState({ openPPModal: true });
  };

  hidePolicyModal = () => {
    this.setState({ openPPModal: false });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { isCounselor, email } = this.props;
    const { openPPModal } = this.state;
    return (
      <React.Fragment>
        <PolicyModal
          openModal={openPPModal}
          title={formatMessage({ id: "PRIVACY_POLICIY_AND_TERMS_OF_SERVICE" })}
          content={
            formatMessage({ id: "PRIVACY_POLICY_TEXT" }) +
            formatMessage({ id: "TERMS_OF_SERVICE_TEXT" })
          }
          hidePolicyModal={this.hidePolicyModal}
        />
        <Card title={formatMessage({ id: "CLIENT_REGISTER" })} bordered={true}>
          <Formik
            enableReinitialize
            initialValues={{
              email,
              password: undefined,
              passwordConfirm: undefined,
              privacy: false
            }}
            validationSchema={registerValidationSchema(formatMessage)}
            onSubmit={isCounselor ? this.counselorRegister : this.clientRegister}
          >
            {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
              <Form>
                <Form.Item
                  {...formItemLayout}
                  label={formatMessage({ id: "CLIENT_REGISTER_MAIL" })}
                  validateStatus={errors.email && touched.email ? "error" : "success"}
                  help={errors.email && touched.email ? errors.email : null}
                >
                  <Input
                    disabled={isCounselor}
                    type="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  label={formatMessage({ id: "CLIENT_REGISTER_PASSWORD" })}
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
                  label={formatMessage({ id: "CLIENT_REGISTER_PASSWORD_CONFIRM" })}
                  validateStatus={
                    errors.passwordConfirm && touched.passwordConfirm ? "error" : "success"
                  }
                  help={
                    errors.passwordConfirm && touched.passwordConfirm
                      ? errors.passwordConfirm
                      : null
                  }
                >
                  <Input
                    type="password"
                    name="passwordConfirm"
                    onChange={handleChange}
                    value={values.passwordConfirm}
                  />
                </Form.Item>
                <Form.Item
                  {...formItemLayout}
                  validateStatus={errors.privacy && touched.privacy ? "error" : "success"}
                  help={errors.privacy && touched.privacy ? errors.privacy : null}
                >
                  <Checkbox onChange={handleChange} name="privacy" />
                  <a style={{ marginLeft: 10 }} onClick={this.openPolicyModal}>
                    {formatMessage({ id: "PRIVACY_POLICIY_AND_TERMS_OF_SERVICE" })}
                  </a>
                </Form.Item>
                <Row type="flex" justify="center">
                  <Col>
                    <Button
                      type="primary"
                      disabled={isSubmitting}
                      onClick={e => {
                        handleSubmit();
                      }}
                    >
                      {formatMessage({ id: "SIGNUP" })}
                    </Button>
                  </Col>
                </Row>
              </Form>
            )}
          </Formik>
        </Card>
      </React.Fragment>
    );
  }
}

const dispatchToProps = dispatch => {
  return {
    register: params => dispatch(userActions.register(params)),
    addPassword: params => dispatch(counselorActions.addPassword(params))
  };
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(RegisterBox));
