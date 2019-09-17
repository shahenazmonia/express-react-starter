import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import { Formik } from "formik";
import history from "../../../../_core/history";
import * as sessionActions from "../../../../store/actions/sessionActions";
import { waitingRoomValidationSchema } from "./preSessionInformationValidationSchema";
import { Row, Col, Form, Card, Input, Button, Icon, Checkbox } from "antd";

interface IProps {
  isClient: boolean;
  clientNickname: string;
  preSessionMessage: string;
  startSession: (values) => any;
  setPreSessionInformation: (values: any, functions: any) => any;
}

class PreSessionInformation extends Component<IProps & InjectedIntlProps> {
  onSubmit = (values, { setSubmitting }) => {
    this.props.setPreSessionInformation(values, { setSubmitting });
  };
  render() {
    const { formatMessage } = this.props.intl;
    const { isClient, clientNickname, preSessionMessage } = this.props;
    return (
      <Row type="flex" justify="center">
        <Col span={24}>
          <Formik
            enableReinitialize
            initialValues={{
              clientNickname: clientNickname || "",
              preSessionMessage: preSessionMessage || ""
            }}
            validationSchema={waitingRoomValidationSchema(formatMessage)}
            onSubmit={this.onSubmit.bind(this)}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleSubmit,
              isSubmitting,
              setFieldValue
            }) => (
              <Form>
                <Form.Item
                  labelCol={{ span: 24 }}
                  label={formatMessage({ id: "NICKNAME" })}
                  wrapperCol={{ span: 12 }}
                  validateStatus={
                    errors.clientNickname && touched.clientNickname ? "error" : "success"
                  }
                  help={
                    errors.clientNickname && touched.clientNickname ? errors.clientNickname : null
                  }
                >
                  <Input
                    type="name"
                    name="clientNickname"
                    onChange={handleChange}
                    value={values.clientNickname}
                  />
                </Form.Item>
                <Form.Item
                  label={formatMessage({ id: "WAITING_ROOM_MESSAGE_TEXT" })}
                  validateStatus={
                    errors.preSessionMessage && touched.preSessionMessage ? "error" : "success"
                  }
                  help={
                    errors.preSessionMessage && touched.preSessionMessage
                      ? errors.preSessionMessage
                      : null
                  }
                >
                  <Input.TextArea
                    rows={4}
                    name="preSessionMessage"
                    onChange={handleChange}
                    value={values.preSessionMessage}
                  />
                </Form.Item>
                <Row type="flex" justify="center">
                  <Col
                    style={{ display: "flex", justifyContent: "center", marginTop: 10 }}
                    span={24}
                  >
                    <Button
                      disabled={!isClient}
                      type="primary"
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
        </Col>
      </Row>
    );
  }
}

const dispatchToProps = dispatch => {
  return {
    startSession: params => dispatch(sessionActions.startSession(params))
  };
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(PreSessionInformation));
