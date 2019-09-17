import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { Formik } from "formik";
import * as yup from "yup";
import { Modal, Input, Rate, Form, Button } from "antd";

interface IProps {
  openModal: boolean;
  hideFeedbackModal: () => void;
}

interface IState {
  rateValue: number;
}

class ClientSessionFeedbackModal extends Component<IProps & InjectedIntlProps, IState> {
  private formik = React.createRef<Formik>();
  constructor(props) {
    super(props);
    this.state = { rateValue: 3 };
  }
  handleSubmit(values) {
    // console.log(values);
    this.props.hideFeedbackModal();
  }

  handleCancel() {
    this.props.hideFeedbackModal();
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { openModal } = this.props;
    return (
      <Modal
        title={formatMessage({ id: "EVALUATE_SESSION" })}
        visible={openModal}
        centered
        cancelText={formatMessage({ id: "CANCEL" })}
        onCancel={this.handleCancel.bind(this)}
        okText={formatMessage({ id: "SAVE" })}
        onOk={() => this.formik.current!.submitForm()}
      >
        {
          <Formik
            ref={this.formik}
            initialValues={{ feedbackMessage: undefined, rateValue: 3 }}
            validationSchema={yup.object().shape({
              feedbackMessage: yup
                .string()
                .max(500, formatMessage({ id: "VALIDATION_MESSAGE_LENGHT_TEXT" }, { value: 500 })),
              rateValue: yup.number()
            })}
            onSubmit={this.handleSubmit.bind(this)}
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
                  validateStatus={
                    errors.feedbackMessage && touched.feedbackMessage ? "error" : "success"
                  }
                  help={
                    errors.feedbackMessage && touched.feedbackMessage
                      ? errors.feedbackMessage
                      : null
                  }
                >
                  <Input.TextArea
                    name="feedbackMessage"
                    rows={4}
                    value={values.feedbackMessage}
                    onChange={handleChange}
                  />
                </Form.Item>
                <Form.Item
                  validateStatus={errors.rateValue && touched.rateValue ? "error" : "success"}
                  help={errors.rateValue && touched.rateValue ? errors.rateValue : null}
                >
                  <Rate
                    value={values.rateValue}
                    onChange={val => {
                      setFieldValue("rateValue", val);
                    }}
                  />
                </Form.Item>
              </Form>
            )}
          </Formik>
        }
      </Modal>
    );
  }
}

export default injectIntl(ClientSessionFeedbackModal);
