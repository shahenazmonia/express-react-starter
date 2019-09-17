import React, { Component } from "react";
import { Formik } from "formik";
import { connect } from "react-redux";
import moment from "moment";
import { injectIntl, InjectedIntlProps } from "react-intl";
import _ from "lodash";

import history from "../../../_core/history";
import {findSubscriptionById,findSubscriptionByName} from "../../../utility/subscriptionHelper";
import { ClinicValidationSchema } from "./ClinicValidationSchema";
import * as alertActions from "../../../store/actions/alertActions";
import * as clinicSubscriptionActions from "../../../store/actions/clinicSubscriptionActions";
import * as clinicActions from "../../../store/actions/clinicActions";
import * as fileUploadActions from "../../../store/actions/fileUploadActions";
import SubscriptionTypeSelectBox from "../../_defaultComponents/SelectBoxes/SubscriptionTypeSelectBox";
import ServiceCategorySelectBox from "../../_defaultComponents/SelectBoxes/ServiceCategorySelectBox";
import ActiveSwitch from "../../_defaultComponents/SwitchBox/ActiveSwitch";
import config from "../../../_core/config";

import { ShowAlertParams, ShowInfoAction } from "../../../store/actions/alertActions";
import { Row, Col, Card, Input, Form, Button, Avatar, Checkbox, Switch, DatePicker } from "antd";
import UploadImage from "../../_defaultComponents/UploadFile";

const { TextArea } = Input;

interface IProps {
  getClinicSubscriptions: () => any;
  addClinic(params: any): any;
  findClinic(params: any): any;
  updateClinic(params: any): any;
  updateClinicImage(params: any): any;
  showInfo: (ShowAlertParams) => ShowInfoAction;
  uploadFile: ({ file: any, name: String }) => any;
  id?: string;
  clinicId?: string;
  isEdit: boolean;
  onlyReview?: boolean;
}

interface IState {
  clinicData: any;
  clinicSubscriptions: Array<Object>;
}

class ClinicOperationBox extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      clinicData: {
        _id: undefined,
        name: undefined,
        subscriptionType: undefined,
        expirationDate: undefined,
        mainCategories: undefined,
        isList: false,
        address: undefined,
        phoneNumber: undefined,
        email: undefined,
        activeCounselorNumber: undefined,
        taxAdministration: undefined,
        taxNumber: undefined,
        iban: undefined,
        isPlatformClinic: false,
        contactName: undefined,
        contactPhoneNumber: undefined,
        contactEmail: undefined,
        isActive: false
      },
      clinicSubscriptions: []
    };
  }

  async componentDidMount() {
    const { isEdit, id: clinic_id, clinicId, onlyReview } = this.props;
    let id = clinic_id;
    if (onlyReview && clinicId) {
      id = clinicId;
    }
    const clinicSubscriptions = (await this.props.getClinicSubscriptions()).action.payload.data;
    this.setState({ clinicSubscriptions }, async () => {
      try {
        if (isEdit) {
          const clinicData = (await this.props.findClinic(id)).action.payload.data;
          const subscription = findSubscriptionById({
            subscriptionList: this.state.clinicSubscriptions,
            subscriptionId: clinicData.subscription.subscriptionId
          });
          const subscriptionType = subscription && subscription.name;
          this.setState({
            clinicData: {
              ...clinicData,
              expirationDate: clinicData.subscription.expirationDate,
              subscriptionType
            }
          });
        }
      } catch (err) {
        history.push("/admin/clinic");
      }
    });
  }

  newClinic = async (values, { setSubmitting }) => {
    const { formatMessage } = this.props.intl;
    const subscription = findSubscriptionByName({
      subscriptionList: this.state.clinicSubscriptions,
      subscriptionType: values.subscriptionType
    });
    const subscriptionId = subscription._id;
    try {
      let newValues = _.omit(values, ["passwordConfirm", "subscriptionType"]);
      newValues.subscriptionId = subscriptionId;
      await this.props.addClinic({ ...newValues, isDeleted: false });
      this.props.showInfo({
        title: formatMessage({ id: "SUCCESS" }),
        body: formatMessage({ id: "CLINIC_ADDED_SUCCESS" }),
        actionFunc: () => {
          history.push("/admin/clinic");
        }
      });
      setSubmitting(false);
    } catch {
      setSubmitting(false);
    }
  };

  update = async (values, { setSubmitting, resetForm }) => {
    const { _id, imageInfo } = this.state.clinicData;
    const { formatMessage } = this.props.intl;
    const { clinicSubscriptions } = this.state;
    const subscriptionId = _.find(clinicSubscriptions, ["name", values.subscriptionType])._id;
    try {
      let newValues = _.omit(values, ["password", "passwordConfirm", "subscriptionType"]);
      newValues.subscriptionId = subscriptionId;
      await this.props.updateClinic({ ...newValues, _id, isDeleted: false });
      this.props.showInfo({
        title: formatMessage({ id: "SUCCESS" }),
        body: formatMessage({ id: "CLINIC_UPDATE_SUCCESS" }),
        actionFunc: () => {
          history.push("/admin/clinic");
        }
      });
    } catch {
      setSubmitting(false);
    }
  };

  updateImage = async () => {
    const { _id, imageInfo } = this.state.clinicData;
    const { formatMessage } = this.props.intl;
    try {
      await this.props.updateClinicImage({ _id, imageInfo });
      this.props.showInfo({
        title: formatMessage({ id: "SUCCESS" }),
        body: formatMessage({ id: "CLINIC_UPDATE_IMAGE_SUCCESS" }),
        actionFunc: () => {
          history.push("/clinic/account");
        }
      });
    } catch {}
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { isEdit, onlyReview } = this.props;
    const { clinicSubscriptions, clinicData } = this.state;
    const {
      name,
      subscriptionType,
      expirationDate,
      mainCategories,
      isList,
      address,
      phoneNumber,
      email,
      activeCounselorNumber,
      taxAdministration,
      taxNumber,
      iban,
      contactName,
      contactPhoneNumber,
      contactEmail,
      isPlatformClinic,
      isActive,
      roles
    } = this.state.clinicData;
    const isClinic = roles && roles.includes("clinic");
    const imageId = (clinicData.imageInfo || {})._id;
    return (
      <Card
        bordered={true}
        title={
          <Row type="flex" align="middle">
            <Avatar
              shape="square"
              size={100}
              icon={imageId ? undefined : "user"}
              src={imageId && config.getBasePublicUrl() + "api/getFile/" + imageId}
              style={{ objectFit: "contain" }}
            />
            <UploadImage
              visible={!clinicData && clinicData.imageInfo}
              updateState={imageInfo => {
                this.setState({
                  clinicData: {
                    ...clinicData,
                    imageInfo
                  }
                });
                this.updateImage();
              }}
            />
            {onlyReview && (
              <div style={{ marginLeft: 20 }}>
                <Button
                  type="primary"
                  onClick={() => {
                    if (isClinic) {
                      const filePicker: any = document.getElementsByClassName("ant-upload")[1];
                      filePicker.click();
                    }
                  }}
                >
                  {formatMessage({ id: clinicData.imageInfo ? "UPDATE_PHOTO" : "UPLOAD_PHOTO" })}
                </Button>
              </div>
            )}
          </Row>
        }
        style={{ marginBottom: 50, flexDirection: "column" }}
      >
        <Formik
          enableReinitialize
          initialValues={{
            name,
            subscriptionType,
            expirationDate,
            mainCategories,
            isList,
            address,
            phoneNumber,
            email,
            activeCounselorNumber,
            taxAdministration,
            taxNumber,
            iban,
            contactName,
            contactPhoneNumber,
            contactEmail,
            isPlatformClinic,
            password: undefined,
            passwordConfirm: undefined,
            isActive
          }}
          validationSchema={ClinicValidationSchema(formatMessage, isEdit)}
          onSubmit={isEdit ? this.update : this.newClinic}
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
              <Row gutter={8} type="flex" align="bottom">
                <Col
                  style={{
                    display: "flex",
                    position: "absolute",
                    right: 25,
                    top: 0,
                    marginTop: 20
                  }}
                >
                  {!onlyReview && (
                    <Col>
                      <Form.Item colon={false}>
                        <Checkbox
                          checked={values.isPlatformClinic}
                          name="isPlatformClinic"
                          disabled={onlyReview}
                          onChange={handleChange}
                          value={values.isPlatformClinic}
                        >
                          {formatMessage({ id: "CLINIC_IS_PLATFORM" })}
                        </Checkbox>
                      </Form.Item>
                    </Col>
                  )}
                  {!onlyReview && (
                    <Col>
                      <Form.Item colon={false}>
                        <Checkbox
                          checked={values.isList}
                          name="isList"
                          disabled={onlyReview}
                          onChange={handleChange}
                          value={values.isList}
                        >
                          {formatMessage({ id: "CLINIC_IS_LIST" })}
                        </Checkbox>
                      </Form.Item>
                    </Col>
                  )}
                  {!onlyReview && (
                    <Col>
                      <Form.Item colon={false}>
                        <ActiveSwitch
                          checked={values.isActive}
                          style={{ marginLeft: 20 }}
                          disabled={onlyReview}
                          onChangeChecked={checked => setFieldValue("isActive", checked)}
                        />
                      </Form.Item>
                    </Col>
                  )}
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "CLINIC_NAME" })}
                    validateStatus={errors.name && touched.name ? "error" : "success"}
                    help={errors.name && touched.name ? errors.name : null}
                  >
                    <Input
                      disabled={onlyReview}
                      name="name"
                      type="text"
                      onChange={handleChange}
                      value={values.name}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "CLINIC_SUBSCRIPTION_TYPE" })}
                    validateStatus={
                      errors.subscriptionType && touched.subscriptionType ? "error" : "success"
                    }
                    help={
                      errors.subscriptionType && touched.subscriptionType
                        ? errors.subscriptionType
                        : null
                    }
                  >
                    <SubscriptionTypeSelectBox
                      subscriptionList={clinicSubscriptions}
                      value={values.subscriptionType}
                      disabled={onlyReview}
                      onChange={value => setFieldValue("subscriptionType", value)}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "SUBSCRIPTION_EXPIRATION_DATE" })}
                    validateStatus={
                      errors.expirationDate && touched.expirationDate ? "error" : "success"
                    }
                    help={
                      errors.expirationDate && touched.expirationDate ? errors.expirationDate : null
                    }
                  >
                    <DatePicker
                      style={{ width: "100%" }}
                      disabled={onlyReview}
                      placeholder={formatMessage({ id: "PICK_DATE" })}
                      value={
                        values.expirationDate
                          ? moment(values.expirationDate, "DD/MM/YYYY")
                          : undefined
                      }
                      onChange={date => {
                        date && setFieldValue("expirationDate", moment(date).format("DD/MM/YYYY"));
                        !date && setFieldValue("expirationDate", undefined);
                      }}
                      format="DD/MM/YYYY"
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "CLINIC_SERVICE_CATEGORY" })}
                    validateStatus={
                      errors.mainCategories && touched.mainCategories ? "error" : "success"
                    }
                    help={
                      errors.mainCategories && touched.mainCategories ? errors.mainCategories : null
                    }
                  >
                    <ServiceCategorySelectBox
                      value={values.mainCategories}
                      mode={"multiple"}
                      disabled={onlyReview}
                      onChange={data => setFieldValue("mainCategories", data)}
                    />
                  </Form.Item>
                </Col>
                <Col span={24}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "CLINIC_ADDRESS" })}
                    validateStatus={errors.address && touched.address ? "error" : "success"}
                    help={errors.address && touched.address ? errors.address : null}
                  >
                    <TextArea
                      rows={4}
                      name="address"
                      value={values.address}
                      onChange={handleChange}
                      disabled={onlyReview}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "CLINIC_PHONE_NUMBER" })}
                    validateStatus={errors.phoneNumber && touched.phoneNumber ? "error" : "success"}
                    help={errors.phoneNumber && touched.phoneNumber ? errors.phoneNumber : null}
                  >
                    <Input
                      name="phoneNumber"
                      type="text"
                      onChange={handleChange}
                      value={values.phoneNumber}
                      disabled={onlyReview}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "CLINIC_EMAIL" })}
                    validateStatus={errors.email && touched.email ? "error" : "success"}
                    help={errors.email && touched.email ? errors.email : null}
                  >
                    <Input
                      name="email"
                      disabled={onlyReview && isEdit}
                      type="email"
                      onChange={handleChange}
                      value={values.email}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "CLINIC_ACTIVE_COUNSELOR" })}
                    validateStatus={
                      errors.activeCounselorNumber && touched.activeCounselorNumber
                        ? "error"
                        : "success"
                    }
                    help={
                      errors.activeCounselorNumber && touched.activeCounselorNumber
                        ? errors.activeCounselorNumber
                        : null
                    }
                  >
                    <Input
                      disabled={onlyReview}
                      name="activeCounselorNumber"
                      type="text"
                      onChange={handleChange}
                      value={values.activeCounselorNumber}
                    />
                  </Form.Item>
                </Col>
                <hr />
                <Col xs={24} md={6}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "CLINIC_TAX_ADMINISTRATION" })}
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
                      disabled={onlyReview}
                      name="taxAdministration"
                      type="text"
                      onChange={handleChange}
                      value={values.taxAdministration}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "CLINIC_TAX_NUMBER" })}
                    validateStatus={errors.taxNumber && touched.taxNumber ? "error" : "success"}
                    help={errors.taxNumber && touched.taxNumber ? errors.taxNumber : null}
                  >
                    <Input
                      disabled={onlyReview}
                      name="taxNumber"
                      type="text"
                      onChange={handleChange}
                      value={values.taxNumber}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={12}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "CLINIC_IBAN" })}
                    validateStatus={errors.iban && touched.iban ? "error" : "success"}
                    help={errors.iban && touched.iban ? errors.iban : null}
                  >
                    <Input
                      disabled={onlyReview}
                      name="iban"
                      type="text"
                      onChange={handleChange}
                      value={values.iban}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} />
                <Col xs={24} md={6}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "CLINIC_CONTACT" })}
                    validateStatus={errors.contactName && touched.contactName ? "error" : "success"}
                    help={errors.contactName && touched.contactName ? errors.contactName : null}
                  >
                    <Input
                      disabled={onlyReview}
                      name="contactName"
                      type="text"
                      onChange={handleChange}
                      value={values.contactName}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "CLINIC_CONTACT_PHONE_NUMBER" })}
                    validateStatus={
                      errors.contactPhoneNumber && touched.contactPhoneNumber ? "error" : "success"
                    }
                    help={
                      errors.contactPhoneNumber &&
                      touched.contactPhoneNumber &&
                      errors.contactPhoneNumber
                    }
                  >
                    <Input
                      disabled={onlyReview}
                      name="contactPhoneNumber"
                      type="text"
                      onChange={handleChange}
                      value={values.contactPhoneNumber}
                    />
                  </Form.Item>
                </Col>
                <Col xs={24} md={6}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "CLINIC_CONTACT_MAIL" })}
                    validateStatus={
                      errors.contactEmail && touched.contactEmail ? "error" : "success"
                    }
                    help={errors.contactEmail && touched.contactEmail && errors.contactEmail}
                  >
                    <Input
                      disabled={onlyReview}
                      name="contactEmail"
                      type="email"
                      onChange={handleChange}
                      value={values.contactEmail}
                    />
                  </Form.Item>
                </Col>
                <Col span={24} />
                {!isEdit && !onlyReview && (
                  <Col xs={24} md={6}>
                    <Form.Item
                      colon={false}
                      label={formatMessage({ id: "CLINIC_PASSWORD" })}
                      validateStatus={errors.password && touched.password ? "error" : "success"}
                      help={errors.password && touched.password && errors.password}
                    >
                      <Input
                        disabled={onlyReview}
                        name="password"
                        type="password"
                        onChange={handleChange}
                        value={values.password}
                      />
                    </Form.Item>
                  </Col>
                )}
                {!isEdit && (
                  <Col xs={24} md={6}>
                    <Form.Item
                      colon={false}
                      label={formatMessage({ id: "CLINIC_PASSWORD_CONFIRM" })}
                      validateStatus={
                        errors.passwordConfirm && touched.passwordConfirm ? "error" : "success"
                      }
                      help={
                        errors.passwordConfirm && touched.passwordConfirm && errors.passwordConfirm
                      }
                    >
                      <Input
                        disabled={onlyReview}
                        name="passwordConfirm"
                        type="password"
                        onChange={handleChange}
                        value={values.passwordConfirm}
                      />
                    </Form.Item>
                  </Col>
                )}
                <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
                  {!onlyReview && (
                    <Button
                      type="primary"
                      disabled={isSubmitting}
                      onClick={e => {
                        handleSubmit();
                      }}
                    >
                      {formatMessage({ id: "SAVE" })}
                    </Button>
                  )}
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
    clinicId: (state.user || {})._id
  };
};

const dispatchToProps = dispatch => {
  return {
    getClinicSubscriptions: () => dispatch(clinicSubscriptionActions.getClinicSubscriptions()),
    addClinic: params => dispatch(clinicActions.addClinic(params)),
    findClinic: params => dispatch(clinicActions.findClinic(params)),
    updateClinic: params => dispatch(clinicActions.updateClinic(params)),
    updateClinicImage: params => dispatch(clinicActions.updateClinicImage(params)),

    showInfo: params => dispatch(alertActions.showInfo(params)),
    uploadFile: ({ file, name }) => dispatch(fileUploadActions.uploadFile({ file, name }))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(ClinicOperationBox));
