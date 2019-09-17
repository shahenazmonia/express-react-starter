import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import history from "../../../_core/history";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Row, Col, Card, Input, Form, Button, Checkbox } from "antd";

import ActiveSwitch from "../../_defaultComponents/SwitchBox/ActiveSwitch";
import { subscriptionClinicValidationSchema } from "./subscriptionClinicValidationSchema";
import * as clinicSubscriptionActions from "../../../store/actions/clinicSubscriptionActions";
import * as alertActions from "../../../store/actions/alertActions";

const { TextArea } = Input;

type subscriptionType = {
  _id?: string;
  name: string;
  detail: string;
  monthlyFixedFee: number;
  platformCommission: number;
  dailyMinAvailability: number;
  isActive: boolean;
};

interface IProps {
  addSubscriptionClinic: (params: subscriptionType) => any;
  findSubscriptionClinic: (params?: string) => any;
  updateSubscriptionClinic: (params: subscriptionType) => any;
  showInfo: (params: any) => any;
  isEdit: boolean;
  id?: string;
}

interface IState {
  subscriptionData: {
    _id: string | undefined;
    name: string | undefined;
    detail: string | undefined;
    monthlyFixedFee: number | undefined;
    platformCommission: number | undefined;
    dailyMinAvailability: number | undefined;
    isActive: boolean;
  };
}

class SubscriptionClinicOperationBox extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      subscriptionData: {
        _id: undefined,
        name: undefined,
        detail: undefined,
        monthlyFixedFee: undefined,
        platformCommission: undefined,
        dailyMinAvailability: undefined,
        isActive: false
      }
    };
  }

  async componentDidMount() {
    const { isEdit, id } = this.props;
    try {
      if (isEdit) {
        const subscriptionData = await this.props.findSubscriptionClinic(id);
        this.setState({ subscriptionData: { ...subscriptionData.action.payload.data } });
      }
    } catch {
      history.push("/admin/subscription");
    }
  }

  newSubscriptionClinic = async (values, { setSubmitting }) => {
    const { formatMessage } = this.props.intl;
    try {
      await this.props.addSubscriptionClinic(values);
      this.props.showInfo({
        title: formatMessage({ id: "SUCCESS" }),
        body: formatMessage({ id: "SUBSCRIPTION_ADDED_SUCCESS" }),
        actionFunc: () => {
          history.push("/admin/subscription");
        }
      });
    } catch {
      setSubmitting(false);
    }
  };

  updateSubscriptionClinic = async (values, { setSubmitting, resetForm }) => {
    const { _id } = this.state.subscriptionData;
    const { formatMessage } = this.props.intl;
    try {
      await this.props.updateSubscriptionClinic({ ...values, _id });
      this.props.showInfo({
        title: formatMessage({ id: "SUCCESS" }),
        body: formatMessage({ id: "SUBSCRIPTION_UPDATE_SUCCESS" }),
        actionFunc: () => {
          history.push("/admin/subscription");
        }
      });
    } catch {
      setSubmitting(false);
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { isEdit } = this.props;
    const {
      _id,
      name,
      detail,
      monthlyFixedFee,
      platformCommission,
      dailyMinAvailability,
      isActive
    } = this.state.subscriptionData;
    return (
      <Card bordered={true} style={{ marginBottom: 50 }}>
        <Formik
          enableReinitialize
          initialValues={{
            name,
            detail,
            monthlyFixedFee,
            platformCommission,
            dailyMinAvailability,
            isActive
          }}
          validationSchema={subscriptionClinicValidationSchema}
          onSubmit={isEdit ? this.updateSubscriptionClinic : this.newSubscriptionClinic}
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
              <Row gutter={8} type="flex">
                <Col span={24}>
                  <Row type="flex" justify="space-between">
                    <Col
                      span={24}
                      style={{
                        display: "flex",
                        justifyContent: "flex-end",
                        flexDirection: "row"
                      }}
                    >
                      <ActiveSwitch
                        checked={values.isActive}
                        onChangeChecked={checked => setFieldValue("isActive", checked)}
                      />
                    </Col>
                    <Col span={24} />
                    <Col sm={16} md={8}>
                      <Form.Item
                        colon={false}
                        label={formatMessage({ id: "SUBSCRIPTION_NAME" })}
                        validateStatus={errors.name && touched.name ? "error" : "success"}
                        help={errors.name && touched.name ? errors.name : null}
                      >
                        <Input
                          name="name"
                          type="text"
                          onChange={handleChange}
                          value={values.name}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={16}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "SUBSCRIPTION_DETAIL" })}
                    validateStatus={errors.detail && touched.detail ? "error" : "success"}
                    help={errors.detail && touched.detail ? errors.detail : null}
                  >
                    <TextArea
                      rows={4}
                      name="detail"
                      onChange={handleChange}
                      value={values.detail}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} />
                <Col xs={24} md={8}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "SUBSCRIPTION_MONTHLY_FIXED_FEE" })}
                    validateStatus={
                      errors.monthlyFixedFee && touched.monthlyFixedFee ? "error" : "success"
                    }
                    help={
                      errors.monthlyFixedFee && touched.monthlyFixedFee
                        ? errors.monthlyFixedFee
                        : null
                    }
                  >
                    <Input
                      name="monthlyFixedFee"
                      type="number"
                      onChange={handleChange}
                      value={values.monthlyFixedFee}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "SUBSCRIPTION_PLATFORM_COMMISSION" })}
                    validateStatus={
                      errors.platformCommission && touched.platformCommission ? "error" : "success"
                    }
                    help={
                      errors.platformCommission && touched.platformCommission
                        ? errors.platformCommission
                        : null
                    }
                  >
                    <Input
                      name="platformCommission"
                      type="number"
                      onChange={handleChange}
                      value={values.platformCommission}
                    />
                  </Form.Item>
                </Col>
                <br />
                <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
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

const dispatchToProps = dispatch => {
  return {
    addSubscriptionClinic: params =>
      dispatch(clinicSubscriptionActions.addClinicSubscription(params)),
    findSubscriptionClinic: params =>
      dispatch(clinicSubscriptionActions.findClinicSubscription(params)),
    updateSubscriptionClinic: params =>
      dispatch(clinicSubscriptionActions.updateClinicSubscription(params)),
    showInfo: params => dispatch(alertActions.showInfo(params))
  };
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(SubscriptionClinicOperationBox));
