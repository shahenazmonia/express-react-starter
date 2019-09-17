import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import { Formik } from "formik";
import * as yup from "yup";
import moment from "moment-timezone";
import { Form, Input, Button, Card, Row, Col } from "antd";
import * as clinicActions from "../../../store/actions/clinicActions";
import * as alertActions from "../../../store/actions/alertActions";

export const loginValidationSchema = formatMessage =>
  yup.object().shape({
    email: yup
      .string()
      .email(formatMessage({ id: "VALIDATION_MAIL_INVALID" }))
      .required(formatMessage({ id: "VALIDATION_MAIL_REQUIRED" }))
  });

interface IProps {
  invitation(params: any): any;
  showConfirm(params: any): any;
  user: any;
}

class Invitation extends Component<IProps & InjectedIntlProps, any> {
  onInvitation = async (values, { setSubmitting, resetForm }) => {
    const { _id } = this.props.user;
    try {
      const invitationInfo = await this.props.invitation({
        email: values.email,
        clinicId: _id,
        timezone: moment.tz.guess()
      });
      this.props.showConfirm({
        title: "Counselor invitation link",
        body: "http://localhost:3000/invitation/" + invitationInfo.action.payload.data._id,
        actionFunc: () => {}
      });
      setSubmitting(false);
      resetForm();
    } catch (err) {
      setSubmitting(false);
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <Formik
        initialValues={{ email: undefined }}
        validationSchema={loginValidationSchema(formatMessage)}
        onSubmit={this.onInvitation}
      >
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
          <Row type="flex" align="middle" style={{ flexDirection: "column" }}>
            <Col xs={22} md={12}>
              <Form.Item
                colon={false}
                label={formatMessage({ id: "CLINIC_ADMIN_INVITATION_EMAIL" })}
                validateStatus={errors.email && touched.email ? "error" : "success"}
                help={errors.email && touched.email ? errors.email : null}
              >
                <Input type="email" name="email" onChange={handleChange} value={values.email} />
              </Form.Item>
            </Col>
            <Col span={22} style={{ display: "flex", justifyContent: "center" }}>
              <Button
                type="primary"
                disabled={isSubmitting}
                onClick={e => {
                  handleSubmit();
                }}
              >
                {formatMessage({ id: "CLINIC_ADMIN_INVITATION_BUTTON" })}
              </Button>
            </Col>
          </Row>
        )}
      </Formik>
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
    invitation: params => dispatch(clinicActions.invitation(params)),
    showConfirm: params => dispatch(alertActions.showConfirm(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(Invitation));
