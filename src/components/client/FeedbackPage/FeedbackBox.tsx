import React, { Component } from "react";

import { injectIntl, InjectedIntlProps } from "react-intl";
import { Formik } from "formik";
import { feedbackValidationSchema } from "./feedbackvalidationSchema";

import { Form, Input, Button, Card, Row, Col } from "antd";
const { TextArea } = Input;

const formItemLayout = {
  labelCol: {
    span: 24
  },
  wrapperCol: {
    span: 24
  }
};

interface IProps {}

class FeedbackBox extends Component<IProps & InjectedIntlProps, any> {
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <Card bordered={true}>
        <Formik
          initialValues={{
            fullname: undefined,
            email: undefined,
            phoneNumber: undefined,
            message: undefined
          }}
          validationSchema={feedbackValidationSchema(formatMessage)}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 400);
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
            <Form>
              <Form.Item
                {...formItemLayout}
                label={formatMessage({ id: "CLIENT_FEEDBACK_FULLNAME" })}
                validateStatus={errors.fullname && touched.fullname ? "error" : "success"}
                help={errors.fullname && touched.fullname ? errors.fullname : null}
              >
                <Input
                  type="text"
                  name="fullname"
                  onChange={handleChange}
                  value={values.fullname}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label={formatMessage({ id: "CLIENT_FEEDBACK_MAIL" })}
                validateStatus={errors.email && touched.email ? "error" : "success"}
                help={errors.email && touched.email ? errors.email : null}
              >
                <Input type="email" name="email" onChange={handleChange} value={values.email} />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label={formatMessage({ id: "CLIENT_FEEDBACK_MOBILE_PHONE" })}
                validateStatus={errors.phoneNumber && touched.phoneNumber ? "error" : "success"}
                help={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : null}
              >
                <Input
                  type="tel"
                  name="phoneNumber"
                  onChange={handleChange}
                  value={values.phoneNumber}
                />
              </Form.Item>
              <Form.Item
                {...formItemLayout}
                label={formatMessage({ id: "CLIENT_FEEDBACK_MESSAGE" })}
                validateStatus={errors.message && touched.message ? "error" : "success"}
                help={errors.message && touched.message ? errors.message : null}
              >
                <TextArea rows={4} name="message" onChange={handleChange} value={values.message} />
              </Form.Item>
              <Row type="flex" justify="end">
                <Col>
                  <Button
                    type="primary"
                    disabled={isSubmitting}
                    onClick={e => {
                      handleSubmit();
                    }}
                  >
                    {formatMessage({ id: "SEND" })}
                  </Button>
                </Col>
              </Row>
            </Form>
          )}
        </Formik>
        <p>Bizimle iletişime geçmek için 0850 255 09 15 numaralı telefondan arayabilirsiniz.</p>
      </Card>
    );
  }
}

export default injectIntl(FeedbackBox);
