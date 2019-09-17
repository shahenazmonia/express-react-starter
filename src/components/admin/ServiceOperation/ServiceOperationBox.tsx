import React, { Component } from "react";
import { Row, Col, Card, Input, Form, Button, Switch, InputNumber } from "antd";
import { Formik } from "formik";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import ServiceCategorySelectBox from "../../_defaultComponents/SelectBoxes/ServiceCategorySelectBox";
import ActiveSwitch from "../../_defaultComponents/SwitchBox/ActiveSwitch";
import { serviceValidationSchema } from "./serviceValidationSchema";
import * as categoryActions from "../../../store/actions/categoryActions";
import * as alertActions from "../../../store/actions/alertActions";
import history from "../../../_core/history";
import { ShowAlertParams, ShowInfoAction } from "../../../store/actions/alertActions";

import { categoryType } from "../../../types/categoryTypes";

const { TextArea } = Input;

interface IProps {
  addCategory: (params: categoryType) => any;
  findCategory: (params?: string) => any;
  updateCategory: (params: categoryType) => any;
  showInfo: (ShowAlertParams) => ShowInfoAction;
  isEdit: boolean;
  id?: string;
  user: any;
}

interface IState {
  categoryData: any;
}

class ServiceOperationBox extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      categoryData: {
        _id: undefined,
        value: undefined,
        name_TR: undefined,
        name_EN: undefined,
        detail_TR: undefined,
        detail_EN: undefined,
        generalMinPrice: undefined,
        mainCategory: undefined,
        sessionDuration: undefined,
        isActive: false,
        isDeleted: false
      }
    };
  }

  async componentDidMount() {
    const { isEdit, id } = this.props;
    try {
      if (isEdit) {
        let categoryData = await this.props.findCategory(id);
        this.setState({ categoryData: { ...categoryData.action.payload.data } });
      }
    } catch {
      history.push("/admin/service");
    }
  }

  newCategory = async (values, { setSubmitting }) => {
    const { formatMessage } = this.props.intl;
    try {
      await this.props.addCategory({ ...values, userId: this.props.user._id });
      this.props.showInfo({
        title: formatMessage({ id: "SUCCESS" }),
        body: formatMessage({ id: "CATEGORY_ADDED_SUCCESS" }),
        actionFunc: () => {
          history.push("/admin/service");
        }
      });
    } catch {
      setSubmitting(false);
    }
  };

  updateCategory = async (values, { setSubmitting, resetForm }) => {
    const { _id } = this.state.categoryData;
    const { formatMessage } = this.props.intl;
    try {
      await this.props.updateCategory({ ...values, _id, userId: this.props.user._id });
      this.props.showInfo({
        title: formatMessage({ id: "SUCCESS" }),
        body: formatMessage({ id: "CATEGORY_UPDATE_SUCCESS" }),
        actionFunc: () => {
          history.push("/admin/service");
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
      value,
      name_TR,
      name_EN,
      detail_TR,
      detail_EN,
      generalMinPrice,
      mainCategory,
      sessionDuration,
      isActive,
      isDeleted
    } = this.state.categoryData;
    return (
      <Card bordered={true} style={{ marginBottom: 50 }}>
        <Formik
          enableReinitialize
          initialValues={{
            _id,
            value,
            name_TR,
            name_EN,
            detail_TR,
            detail_EN,
            generalMinPrice,
            mainCategory,
            sessionDuration,
            isActive,
            isDeleted
          }}
          validationSchema={serviceValidationSchema(formatMessage)}
          onSubmit={isEdit ? this.updateCategory : this.newCategory}
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
              <Form.Item style={{ display: "flex", justifyContent: "flex-end" }} colon={false}>
                <ActiveSwitch
                  checked={values.isActive}
                  onChangeChecked={checked => setFieldValue("isActive", checked)}
                />
              </Form.Item>
              <Row type="flex" gutter={16} style={{ flexDirection: "column" }}>
                <Col span={24}>
                  <Row type="flex" gutter={16} justify="space-between">
                    <Col xs={24} md={8}>
                      <Form.Item
                        colon={false}
                        label={formatMessage({ id: "SERVICE" })}
                        validateStatus={errors.value && touched.value ? "error" : "success"}
                        help={errors.value && touched.value ? errors.value : null}
                      >
                        <Input
                          name="value"
                          type="text"
                          onChange={handleChange}
                          value={values.value}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                      <Form.Item
                        colon={false}
                        label={formatMessage({ id: "SERVICE_NAME_TR" })}
                        validateStatus={errors.name_TR && touched.name_TR ? "error" : "success"}
                        help={errors.name_TR && touched.name_TR ? errors.name_TR : null}
                      >
                        <Input
                          name="name_TR"
                          type="text"
                          onChange={handleChange}
                          value={values.name_TR}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={8}>
                      <Form.Item
                        colon={false}
                        label={formatMessage({ id: "SERVICE_NAME_EN" })}
                        validateStatus={errors.name_EN && touched.name_EN ? "error" : "success"}
                        help={errors.name_EN && touched.name_EN ? errors.name_EN : null}
                      >
                        <Input
                          name="name_EN"
                          type="text"
                          onChange={handleChange}
                          value={values.name_EN}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={16}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "SERVICE_DETAIL_TR" })}
                    validateStatus={errors.detail_TR && touched.detail_TR ? "error" : "success"}
                    help={errors.detail_TR && touched.detail_TR ? errors.detail_TR : null}
                  >
                    <TextArea
                      rows={4}
                      name="detail_TR"
                      onChange={handleChange}
                      value={values.detail_TR}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={16}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "SERVICE_DETAIL_EN" })}
                    validateStatus={errors.detail_EN && touched.detail_EN ? "error" : "success"}
                    help={errors.detail_EN && touched.detail_EN ? errors.detail_EN : null}
                  >
                    <TextArea
                      rows={4}
                      name="detail_EN"
                      onChange={handleChange}
                      value={values.detail_EN}
                    />
                  </Form.Item>
                </Col>
                <Col span={16}>
                  <Row type="flex" gutter={16} justify="space-between">
                    <Col xs={24} md={12}>
                      <Form.Item
                        colon={false}
                        label={formatMessage({ id: "SESSION_DURATION" })}
                        validateStatus={
                          errors.sessionDuration && touched.sessionDuration ? "error" : "success"
                        }
                        help={
                          errors.sessionDuration && touched.sessionDuration
                            ? errors.sessionDuration
                            : null
                        }
                      >
                        <Input
                          name="sessionDuration"
                          type="number"
                          onChange={handleChange}
                          value={values.sessionDuration}
                        />
                      </Form.Item>
                    </Col>
                    <Col xs={24} md={12}>
                      <Form.Item
                        colon={false}
                        label={formatMessage({ id: "SERVICE_MIN_PRICE" })}
                        validateStatus={
                          errors.generalMinPrice && touched.generalMinPrice ? "error" : "success"
                        }
                        help={
                          errors.generalMinPrice && touched.generalMinPrice
                            ? errors.generalMinPrice
                            : null
                        }
                      >
                        <Input
                          name="generalMinPrice"
                          type="number"
                          onChange={handleChange}
                          value={values.generalMinPrice}
                        />
                      </Form.Item>
                    </Col>
                  </Row>
                </Col>
                <Col xs={24} md={8}>
                  <Form.Item colon={false} label={formatMessage({ id: "SERVICE_CATEGORY" })}>
                    <ServiceCategorySelectBox
                      value={values.mainCategory}
                      mode={"default"}
                      onChange={mainCategory => setFieldValue("mainCategory", mainCategory)}
                    />
                  </Form.Item>
                </Col>
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
    addCategory: params => dispatch(categoryActions.addCategory(params)),
    findCategory: params => dispatch(categoryActions.findCategory(params)),
    updateCategory: params => dispatch(categoryActions.updateCategory(params)),
    showInfo: params => dispatch(alertActions.showInfo(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(ServiceOperationBox));
