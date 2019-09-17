import React, { Component } from "react";
import { Row, Col, Card, Input, Form, Button } from "antd";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Formik } from "formik";

import { profileValidationSchema } from "./profileValdationSchema";

const { TextArea } = Input;

interface IProps {
  isCounselor?: boolean;
  counselorInfo: any;
  onAccountInfoSubmit: any;
}
interface IState {}

class CounselorAccountBox extends Component<IProps & InjectedIntlProps, IState> {
  render() {
    const { formatMessage } = this.props.intl;
    const { counselorInfo, isCounselor, onAccountInfoSubmit } = this.props;
    return (
      <Card
        title={formatMessage({ id: "COUNSELOR_ACCOUNT" })}
        bordered={true}
        style={{ marginBottom: 50 }}
      >
        <Formik
          enableReinitialize
          initialValues={{
            accountName: counselorInfo.accountName,
            accountSurname: counselorInfo.accountSurname,
            identityNumber: counselorInfo.identityNumber,
            phoneNumber: counselorInfo.phoneNumber,
            address: counselorInfo.address,
            iban: counselorInfo.iban,
            taxAdministration: counselorInfo.taxAdministration,
            taxNumber: counselorInfo.taxNumber
          }}
          validationSchema={profileValidationSchema.accountValidation(formatMessage)}
          onSubmit={onAccountInfoSubmit}
        >
          {({ values, errors, touched, handleChange, handleSubmit, isSubmitting }) => (
            <Form>
              <Row type="flex" justify="space-between" gutter={40}>
                <Col xs={24} md={12}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "COUNSELOR_ACCOUNT_NAME" })}
                    validateStatus={errors.accountName && touched.accountName ? "error" : "success"}
                    help={errors.accountName && touched.accountName ? errors.accountName : null}
                  >
                    <Input
                      disabled={!isCounselor}
                      type="text"
                      name="accountName"
                      onChange={handleChange}
                      value={values.accountName}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "COUNSELOR_ACCOUNT_SURNAME" })}
                    validateStatus={
                      errors.accountSurname && touched.accountSurname ? "error" : "success"
                    }
                    help={
                      errors.accountSurname && touched.accountSurname ? errors.accountSurname : null
                    }
                  >
                    <Input
                      disabled={!isCounselor}
                      type="text"
                      name="accountSurname"
                      onChange={handleChange}
                      value={values.accountSurname}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "COUNSELOR_ACCOUNT_IDENTIFICATION_NUMBER" })}
                    validateStatus={
                      errors.identityNumber && touched.identityNumber ? "error" : "success"
                    }
                    help={
                      errors.identityNumber && touched.identityNumber ? errors.identityNumber : null
                    }
                  >
                    <Input
                      disabled={!isCounselor}
                      type="text"
                      name="identityNumber"
                      onChange={handleChange}
                      value={values.identityNumber}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "COUNSELOR_ACCOUNT_MOBILE_PHONE" })}
                    validateStatus={errors.phoneNumber && touched.phoneNumber ? "error" : "success"}
                    help={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : null}
                  >
                    <Input
                      disabled={!isCounselor}
                      type="text"
                      name="phoneNumber"
                      onChange={handleChange}
                      value={values.phoneNumber}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "COUNSELOR_ACCOUNT_ADDRESS" })}
                    validateStatus={errors.address && touched.address ? "error" : "success"}
                    help={errors.address && touched.address ? errors.address : null}
                  >
                    <TextArea
                      disabled={!isCounselor}
                      rows={4}
                      name="address"
                      onChange={handleChange}
                      value={values.address}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "COUNSELOR_ACCOUNT_IBAN" })}
                    validateStatus={errors.iban && touched.iban ? "error" : "success"}
                    help={errors.iban && touched.iban ? errors.iban : null}
                  >
                    <Input
                      disabled={!isCounselor}
                      type="text"
                      name="iban"
                      onChange={handleChange}
                      value={values.iban}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "COUNSELOR_ACCOUNT_TAX_ADMINISTRATION" })}
                    validateStatus={
                      errors.taxAdministration && touched.taxAdministration ? "error" : "success"
                    }
                    help={
                      errors.taxAdministration && touched.taxAdministration
                        ? errors.taxAdministration
                        : null
                    }
                  >
                    <Input
                      disabled={!isCounselor}
                      type="text"
                      name="taxAdministration"
                      onChange={handleChange}
                      value={values.taxAdministration}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "COUNSELOR_ACCOUNT_TAX_NUMBER" })}
                    validateStatus={errors.taxNumber && touched.taxNumber ? "error" : "success"}
                    help={errors.taxNumber && touched.taxNumber ? errors.taxNumber : null}
                  >
                    <Input
                      disabled={!isCounselor}
                      type="text"
                      name="taxNumber"
                      onChange={handleChange}
                      value={values.taxNumber}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Row type="flex" justify="center" align="middle">
                    <Col>
                      <Button
                        type="primary"
                        disabled={isSubmitting || !isCounselor}
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
            </Form>
          )}
        </Formik>
      </Card>
    );
  }
}
export default injectIntl(CounselorAccountBox);
