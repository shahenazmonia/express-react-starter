import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import history from "../../../_core/history";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Row, Col, Card, Input, Form, Button, Switch, Checkbox } from "antd";

import ActiveSwitch from "../../_defaultComponents/SwitchBox/ActiveSwitch";
import { subscriptionCounselorValidationSchema } from "./subscriptionCounselorValidationSchema";
import * as counselorSubscriptionActions from "../../../store/actions/counselorSubscriptionActions";
import * as alertActions from "../../../store/actions/alertActions";
import { ShowAlertParams, ShowInfoAction } from "../../../store/actions/alertActions";
import { counselorSubscriptionType } from "../../../types/subscriptionTypes";

const { TextArea } = Input;

interface IProps {
  addSubscriptionCounselor: (params: counselorSubscriptionType) => any;
  findSubscriptionCounselor: (params?: string) => any;
  updateSubscriptionCounselor: (params: counselorSubscriptionType) => any;
  showInfo: (ShowAlertParams) => ShowInfoAction;
  isEdit: boolean;
  id?: string;
  user: any;
}

interface IState {
  subscriptionData: {
    _id: string | undefined;
    name: string | undefined;
    detail: string | undefined;
    monthlyFixedFee: number | undefined;
    platformCommission: number | undefined;
    dailyMinAvailability: number | undefined;
    isPermitedToInvite: boolean;
    isActive: boolean;
  };
}

class SubscriptionCounselorOperationBox extends Component<IProps & InjectedIntlProps, IState> {
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
        isPermitedToInvite: false,
        isActive: false
      }
    };
  }

  async componentDidMount() {
    const { isEdit, id } = this.props;
    try {
      if (isEdit) {
        const subscriptionData = await this.props.findSubscriptionCounselor(id);
        this.setState({ subscriptionData: { ...subscriptionData.action.payload.data } });
      }
    } catch {
      history.push("/clinic/subscription");
    }
  }

  newSubscriptionCounselor = async (values, { setSubmitting }) => {
    const { formatMessage } = this.props.intl;
    const { _id } = this.props.user;
    try {
      await this.props.addSubscriptionCounselor({
        clinicId: _id,
        ...values
      });
      this.props.showInfo({
        title: formatMessage({ id: "SUCCESS" }),
        body: formatMessage({ id: "SUBSCRIPTION_ADDED_SUCCESS" }),
        actionFunc: () => {
          history.push("/clinic/subscription");
        }
      });
    } catch {
      setSubmitting(false);
    }
  };

  updateSubscriptionClinic = async (values, { setSubmitting }) => {
    const { _id } = this.state.subscriptionData;
    const { formatMessage } = this.props.intl;
    const { user } = this.props;
    try {
      await this.props.updateSubscriptionCounselor({ _id, clinicId: user._id, ...values });
      this.props.showInfo({
        title: formatMessage({ id: "SUCCESS" }),
        body: formatMessage({ id: "SUBSCRIPTION_UPDATE_SUCCESS" }),
        actionFunc: () => {
          history.push("/clinic/subscription");
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
      isPermitedToInvite,
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
            isPermitedToInvite,
            isActive
          }}
          validationSchema={subscriptionCounselorValidationSchema}
          onSubmit={isEdit ? this.updateSubscriptionClinic : this.newSubscriptionCounselor}
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
                    <Col span={24} style={{ display: "flex", justifyContent: "flex-end" }}>
                      <ActiveSwitch
                        checked={values.isActive}
                        style={{ marginRight: 20 }}
                        onChangeChecked={checked => setFieldValue("isActive", checked)}
                      />
                      <Checkbox
                        checked={values.isPermitedToInvite}
                        name="isPermitedToInvite"
                        onChange={handleChange}
                        value={values.isPermitedToInvite}
                      >
                        {formatMessage({ id: "SUBSCRIPTION_IS_PERMITED_TO_INVITE" })}
                      </Checkbox>
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
                <Col xs={24} md={8}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "SUBSCRIPTION_DAILY_MIN_AVAILABILITY" })}
                    validateStatus={
                      errors.dailyMinAvailability && touched.dailyMinAvailability
                        ? "error"
                        : "success"
                    }
                    help={
                      errors.dailyMinAvailability && touched.dailyMinAvailability
                        ? errors.dailyMinAvailability
                        : null
                    }
                  >
                    <Input
                      name="dailyMinAvailability"
                      type="number"
                      onChange={handleChange}
                      value={values.dailyMinAvailability}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} />
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

const stateToProps = state => {
  return {
    user: state.user
  };
};

const dispatchToProps = dispatch => {
  return {
    addSubscriptionCounselor: params =>
      dispatch(counselorSubscriptionActions.addCounselorSubscription(params)),
    findSubscriptionCounselor: params =>
      dispatch(counselorSubscriptionActions.findCounselorSubscription(params)),
    updateSubscriptionCounselor: params =>
      dispatch(counselorSubscriptionActions.updateCounselorSubscription(params)),
    showInfo: params => dispatch(alertActions.showInfo(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(SubscriptionCounselorOperationBox));
