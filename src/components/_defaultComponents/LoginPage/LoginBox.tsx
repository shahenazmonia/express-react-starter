import React, { Component } from "react";
import history from "../../../_core/history";
import { injectIntl, InjectedIntlProps } from "react-intl";
import moment from "moment-timezone";
import { Formik } from "formik";
import { connect } from "react-redux";
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import GoogleLogin from "react-google-login";

import { loginValidationSchema } from "./loginValidationSchema";
import * as userActions from "../../../store/actions/userActions";
import * as adminActions from "../../../store/actions/adminActions";
import * as alertActions from "../../../store/actions/alertActions";
import { ShowAlertParams, ShowInfoAction } from "../../../store/actions/alertActions";

import { Form, Input, Button, Card, Row, Col, Icon } from "antd";

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: "//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js"
});

const formItemLayout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
};

interface IProps {
  isAdmin: boolean;
  targetPage?: string;
  loginFacebook: (params: {
    email: string;
    id: string;
    accessToken: string;
    timezone: string;
  }) => any;
  loginGoogle: (params: {
    email: string;
    id: string;
    accessToken: string;
    timezone: string;
  }) => any;
  login: (params: { email: string; password: string }) => any;
  adminLogin: (params: { email: string; password: string }) => any;
  showConfirm: (ShowAlertParams) => ShowInfoAction;
  showInfo: (ShowAlertParams) => ShowInfoAction;
  requestPasswordReset: (params: { email: string }) => any;
}

interface IState {
  forgotPasswordEmail: string | undefined;
}

class LoginBox extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      forgotPasswordEmail: undefined
    };
  }
  loginAdmin = async (values, { setSubmitting }) => {
    const { adminLogin } = this.props;
    try {
      await adminLogin({
        email: values.email,
        password: values.password
      });
      history.push("/admin");
    } catch (err) {
      setSubmitting(false);
    }
  };

  loginOther = async (values, { setSubmitting }) => {
    const { targetPage, login } = this.props;
    try {
      const data = (await login({
        email: values.email,
        password: values.password
      })).action.payload.data;
      const searchURl = await new URLSearchParams(window.location.search);
      const redirectUrl = await searchURl.get("redirect_url");
      history.push(redirectUrl ? redirectUrl : "/");
    } catch (err) {
      setSubmitting(false);
    }
  };

  responseFacebook = response => {
    // console.log("FB RESPONSE", response);
    //TODO: loading ekranina gecmeli
    //TODO: loginOther fonksiyonundaki gibi kontrollere gerek var mi karar veremedim
    //      burada o kontroller icin karar verilmesi gerekiyor.
    const email = response.email;
    const id = response.id;
    const accessToken = response.accessToken;
    if (email && id && accessToken) {
      this.props.loginFacebook({ email, id, accessToken, timezone: moment.tz.guess() }).then(() => {
        const searchURl = new URLSearchParams(window.location.search);
        const redirectUrl = searchURl.get("redirect_url");
        history.push(redirectUrl ? redirectUrl : "/");
      });
    } else {
      //TODO: Bu durumda ne yapilacagi belirlenmeli
      console.log("FB login Basarisiz");
    }
  };

  responseGoogle = response => {
    console.log("GOOGLE RESPONSE", response);
    //TODO: loading ekranina gecmeli
    //TODO: loginOther fonksiyonundaki gibi kontrollere gerek var mi karar veremedim
    //      burada o kontroller icin karar verilmesi gerekiyor.
    const email = response.profileObj.email;
    const id = response.profileObj.googleId;
    const accessToken = response.accessToken;
    if (email && id && accessToken) {
      this.props.loginGoogle({ email, id, accessToken, timezone: moment.tz.guess() }).then(() => {
        const searchURl = new URLSearchParams(window.location.search);
        const redirectUrl = searchURl.get("redirect_url");
        history.push(redirectUrl ? redirectUrl : "/");
      });
    } else {
      //TODO: Bu durumda ne yapilacagi belirlenmeli
      console.log("Google login Basarisiz");
    }
  };

  openForgotPassword = () => {
    const { formatMessage } = this.props.intl;
    this.props.showConfirm({
      title: formatMessage({ id: "FORGOT_PASSWORD" }),
      body: (
        <Input
          type="email"
          name={"forgotPasswordEmail"}
          onChange={e => this.setState({ forgotPasswordEmail: e.target.value })}
        />
      ),
      actionFunc: () => {
        this.props
          .requestPasswordReset({ email: this.state.forgotPasswordEmail || "" })
          .then(res => {
            this.props.showInfo({
              // TODO: Dil ve gosterilecek mesaj duzenlenecek
              title: "BAŞARILI",
              // TODO: Dil ve gosterilecek mesaj duzenlenecek
              body:
                "E-mail adresinize şifrenizi yenilemeniz için gerekli yönergeler içeren bir ileti gönderildi.",
              actionFunc: () => {}
            });
          });
      }
    });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { isAdmin } = this.props;
    return (
      <Card title={formatMessage({ id: "CLIENT_LOGIN" })} bordered={true}>
        <Formik
          initialValues={{ email: undefined, password: undefined }}
          validationSchema={loginValidationSchema(formatMessage)}
          onSubmit={isAdmin ? this.loginAdmin : this.loginOther}
        >
          {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
            <Form
              onSubmit={e => {
                e.preventDefault();
                handleSubmit();
              }}
            >
              <Form.Item
                {...formItemLayout}
                label={formatMessage({ id: "CLIENT_LOGIN_MAIL" })}
                validateStatus={errors.email && touched.email ? "error" : "success"}
                help={errors.email && touched.email ? errors.email : null}
              >
                <Input type="email" name="email" onChange={handleChange} value={values.email} />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label={formatMessage({ id: "CLIENT_LOGIN_PASSWORD" })}
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
              <Row type="flex" justify="center" align="middle">
                <Col span={12}>
                  <Button
                    htmlType="submit"
                    type="primary"
                    disabled={isSubmitting}
                    style={{ width: "100%" }}
                  >
                    {formatMessage({ id: "LOGIN" })}
                  </Button>
                </Col>
                <Col span={24} />
                {!isAdmin && (
                  <Col span={12} style={{ marginTop: 20 }}>
                    <GoogleLogin
                      clientId="625260821504-obe55h6lltehm4ajpd260iongefj5vpo.apps.googleusercontent.com"
                      onSuccess={this.responseGoogle}
                      onFailure={response => {
                        console.log("google login FAIL", response);
                      }}
                      render={(renderProps: any) => {
                        return (
                          <Button
                            onClick={renderProps.onClick}
                            type="primary"
                            ghost
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <Icon type="google" />
                            {formatMessage({ id: "LOGIN_WITH_GOOGLE" })}
                          </Button>
                        );
                      }}
                    />
                  </Col>
                )}
                <Col span={24} />
                {!isAdmin && (
                  <Col span={12} style={{ marginTop: 20 }}>
                    <FacebookLogin
                      appId="404491043709148"
                      autoLoad={false}
                      icon="fa-facebook"
                      fields={"email"}
                      callback={this.responseFacebook}
                      render={renderProps => {
                        return (
                          <Button
                            onClick={renderProps.onClick}
                            type="primary"
                            ghost
                            style={{
                              width: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center"
                            }}
                          >
                            <IconFont type="icon-facebook" />
                            {formatMessage({ id: "LOGIN_WITH_FACEBOOK" })}
                          </Button>
                        );
                      }}
                    />
                  </Col>
                )}
                <Col span={24} />
                {!isAdmin && (
                  <Col style={{ marginTop: 20 }}>
                    <a href={"/register"}>{formatMessage({ id: "SIGNUP" })}</a>
                  </Col>
                )}
                <Col span={24} />
                {!isAdmin && (
                  <Col style={{ marginTop: 20 }}>
                    <a onClick={this.openForgotPassword}>
                      {formatMessage({ id: "FORGOT_PASSWORD" })}
                    </a>
                  </Col>
                )}
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
    user: state.user
  };
};

const dispatchToProps = dispatch => {
  return {
    login: params => dispatch(userActions.login(params)),
    adminLogin: params => dispatch(adminActions.adminLogin(params)),
    loginFacebook: params => dispatch(userActions.loginFacebook(params)),
    loginGoogle: params => dispatch(userActions.loginGoogle(params)),
    showConfirm: params => dispatch(alertActions.showConfirm(params)),
    showInfo: params => dispatch(alertActions.showInfo(params)),
    requestPasswordReset: params => dispatch(userActions.requestPasswordReset(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(LoginBox));
