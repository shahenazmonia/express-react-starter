import React, { Component } from "react";
import { Row, Col, Card, Input, Form, Button } from "antd";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Formik } from "formik";

import { profileValidationSchema } from "./profileValidationSchema";

const { TextArea } = Input;

interface IProps {
  isAdmin: boolean;
  isClient: boolean;
  onBillingInfoSubmit: any;
  userInfo: any;
}

class ClientBillingBox extends Component<IProps & InjectedIntlProps> {
  render() {
    const { formatMessage } = this.props.intl;
    const { userInfo, isAdmin, isClient, onBillingInfoSubmit } = this.props;
    return (
      <Card
        title={formatMessage({ id: "CLIENT_BILLING" })}
        bordered={true}
        style={{ marginBottom: 50 }}
      >
        <Formik
          enableReinitialize
          initialValues={{
            name: userInfo.name,
            surname: userInfo.surname,
            identityNumber: userInfo.identityNumber,
            phoneNumber: userInfo.phoneNumber,
            address: userInfo.address
          }}
          validationSchema={profileValidationSchema.billingSchema(formatMessage)}
          onSubmit={values => {
            onBillingInfoSubmit(values);
          }}
        >
          {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
            <Row type="flex" justify="space-between" gutter={40}>
              <Col span={12}>
                <Form.Item
                  colon={false}
                  label={formatMessage({ id: "CLIENT_BILLING_NAME" })}
                  validateStatus={errors.name && touched.name ? "error" : "success"}
                  help={errors.name && touched.name ? errors.name : null}
                >
                  <Input
                    disabled={!isClient}
                    type="text"
                    name="name"
                    onChange={handleChange}
                    value={values.name}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  colon={false}
                  label={formatMessage({ id: "CLIENT_BILLING_SURNAME" })}
                  validateStatus={errors.surname && touched.surname ? "error" : "success"}
                  help={errors.surname && touched.surname ? errors.surname : null}
                >
                  <Input
                    disabled={!isClient}
                    type="text"
                    name="surname"
                    value={values.surname}
                    onChange={handleChange}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  colon={false}
                  label={formatMessage({ id: "CLIENT_BILLING_IDENTIFICATION_NUMBER" })}
                  validateStatus={
                    errors.identityNumber && touched.identityNumber ? "error" : "success"
                  }
                  help={
                    errors.identityNumber && touched.identityNumber ? errors.identityNumber : null
                  }
                >
                  <Input
                    disabled={!isClient}
                    type="text"
                    name="identityNumber"
                    onChange={handleChange}
                    value={values.identityNumber}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  colon={false}
                  label={formatMessage({ id: "CLIENT_BILLING_MOBILE_PHONE" })}
                  validateStatus={errors.phoneNumber && touched.phoneNumber ? "error" : "success"}
                  help={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : null}
                >
                  <Input
                    disabled={!isClient}
                    name="phoneNumber"
                    onChange={handleChange}
                    value={values.phoneNumber}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Form.Item
                  colon={false}
                  label={formatMessage({ id: "CLIENT_BILLING_ADDRESS" })}
                  validateStatus={errors.address && touched.address ? "error" : "success"}
                  help={errors.address && touched.address ? errors.address : null}
                >
                  <TextArea
                    disabled={!isClient}
                    rows={4}
                    name="address"
                    onChange={handleChange}
                    value={values.address}
                  />
                </Form.Item>
              </Col>
              <Col span={24}>
                <Row type="flex" justify="center" align="middle">
                  <Col>
                    <Button
                      type="primary"
                      disabled={!isClient}
                      onClick={e => {
                        handleSubmit();
                      }}
                    >
                      {formatMessage({ id: "SAVE" })}
                    </Button>
                  </Col>
                </Row>
              </Col>
            </Row>
          )}
        </Formik>
      </Card>
    );
  }
}
export default injectIntl(ClientBillingBox);
