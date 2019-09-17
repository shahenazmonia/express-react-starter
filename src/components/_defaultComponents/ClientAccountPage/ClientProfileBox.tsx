import React, { Component } from "react";
import { connect } from "react-redux";
import { Row, Col, Card, Input, Form, Button, DatePicker, Avatar, Switch } from "antd";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Formik } from "formik";
import moment from "moment";
import history from "../../../_core/history";

import ActiveSwitch from "../SwitchBox/ActiveSwitch";
import GenderBox from "../SelectBoxes/GenderBox";
import { profileValidationSchema } from "./profileValidationSchema";
import * as alertActions from "../../../store/actions/alertActions";
import * as fileUploadActions from "../../../store/actions/fileUploadActions";
import config from "../../../_core/config";
import UploadImage from "../UploadFile";

const dateFormat = "DD/MM/YYYY";

interface IProps {
  isAdmin: boolean;
  isClient: boolean;
  onProfileInfoSubmit: any;
  userInfo: any;
  isActive: boolean;
  onChangeSwitch: (checked: boolean) => void;
  showInfo: (params: any) => any;
  uploadFile: ({ file: any, name: String }) => any;
  onChangeSms: () => void;
  onChangeMail: () => void;
  onChangeNotification: () => void;
  isSmsPermited: boolean;
  isMailPermited: boolean;
  isNotificationPermited: boolean;
}
interface IState {
  clientPhoto: any;
}
class ClientProfileBox extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      clientPhoto: {
        _id: undefined
      }
    };
  }

  updateState = () => {};

  render() {
    const { formatMessage } = this.props.intl;
    const { clientPhoto } = this.state;

    const {
      userInfo,
      isAdmin,
      isClient,
      onProfileInfoSubmit,
      isActive,
      onChangeSwitch,
      isSmsPermited,
      isMailPermited,
      isNotificationPermited,
      onChangeSms,
      onChangeMail,
      onChangeNotification
    } = this.props;
    const imageId = clientPhoto._id || (userInfo.profilePhoto || {})._id;
    return (
      <Card
        title={
          !isClient
            ? formatMessage({ id: "ADMIN_CLIENT_MEMBER_INFORMATION" })
            : formatMessage({ id: "CLIENT_PROFILE" })
        }
        extra={
          isAdmin ? (
            <div>
              <Button
                onClick={() =>
                  history.push("/admin/sessions", { filter: { clientId: userInfo._id } })
                }
                style={{ marginRight: 20 }}
              >
                {formatMessage({ id: "ADMIN_CLIENT_SESSION" })}
              </Button>
              <ActiveSwitch checked={isActive} onChangeChecked={onChangeSwitch} />
            </div>
          ) : (
            isClient && (
              <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ marginBottom: 10 }}>
                  {formatMessage({ id: "CLIENT_UNIQ_ID" })} : {userInfo.uniqClientId}
                </div>
                {userInfo.loginType && (
                  <div style={{ marginBottom: 10 }}>
                    {formatMessage({ id: "CLIENT_LOGIN_TYPE" })} :{" "}
                    {formatMessage({ id: userInfo.loginType.toUpperCase() })}
                  </div>
                )}
                <div style={{ marginBottom: 10 }}>
                  {formatMessage({ id: "CLIENT_TIMEZONE" })} : {userInfo.timezone}
                </div>
                <div>
                  <Switch
                    style={{ marginRight: 10 }}
                    checked={isSmsPermited}
                    checkedChildren={formatMessage({ id: "SMS" })}
                    unCheckedChildren={formatMessage({ id: "SMS" })}
                    onChange={onChangeSms}
                  />
                  <Switch
                    style={{ marginRight: 10 }}
                    checked={isMailPermited}
                    checkedChildren={formatMessage({ id: "MAIL" })}
                    unCheckedChildren={formatMessage({ id: "MAIL" })}
                    onChange={onChangeMail}
                  />
                  <Switch
                    checked={isNotificationPermited}
                    checkedChildren={formatMessage({ id: "NOTIFICATION" })}
                    unCheckedChildren={formatMessage({ id: "NOTIFICATION" })}
                    onChange={onChangeNotification}
                  />
                </div>
              </div>
            )
          )
        }
        bordered={true}
        style={{ marginBottom: 50 }}
      >
        <Formik
          enableReinitialize
          initialValues={{
            fullname: userInfo.fullname,
            birthday: userInfo.birthday
              ? moment(userInfo.birthday, dateFormat).format("DD/MM/YYYY")
              : undefined,
            gender: userInfo.gender,
            profilePhoto: userInfo.profilePhoto
          }}
          validationSchema={profileValidationSchema.profileSchema(formatMessage)}
          onSubmit={onProfileInfoSubmit}
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
            <Row type="flex" justify="space-between" gutter={40} style={{ marginTop: 20 }}>
              <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <div>
                  <span
                    style={{ cursor: "copy" }}
                    onClick={() => {
                      if (isClient) {
                        const filePicker: any = document.getElementsByClassName("ant-upload")[1];
                        filePicker.click();
                      }
                    }}
                  >
                    <Avatar
                      shape="square"
                      size={100}
                      icon={imageId ? undefined : "user"}
                      src={imageId && config.getBasePublicUrl() + "api/getFile/" + imageId}
                      style={{ objectFit: "contain" }}
                    />
                  </span>
                  <Form.Item colon={false}>
                    <UploadImage
                      visible={!userInfo && userInfo.profilePhoto}
                      updateState={data => {
                        setFieldValue("profilePhoto", data);
                        this.setState({ clientPhoto: data });
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              <Col span={12}>
                <Form.Item
                  colon={false}
                  label={formatMessage({ id: "FULLNAME" })}
                  validateStatus={errors.fullname && touched.fullname ? "error" : "success"}
                  help={errors.fullname && touched.fullname ? errors.fullname : null}
                >
                  <Input
                    disabled={!isClient}
                    type="name"
                    name="fullname"
                    onChange={handleChange}
                    value={values.fullname}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item
                  colon={false}
                  label={formatMessage({ id: "CLIENT_PROFILE_BIRTHDAY" })}
                  validateStatus={errors.birthday && touched.birthday ? "error" : "success"}
                  help={errors.birthday && touched.birthday ? errors.birthday : null}
                >
                  <DatePicker
                    disabled={!isClient}
                    placeholder={formatMessage({ id: "CLIENT_PROFILE_BIRTHDAY" })}
                    value={values.birthday ? moment(values.birthday, dateFormat) : undefined}
                    onChange={birthday => {
                      birthday && setFieldValue("birthday", moment(birthday).format(dateFormat));
                      !birthday && setFieldValue("birthday", undefined);
                    }}
                    style={{ width: "100%" }}
                    format={dateFormat}
                  />
                </Form.Item>
              </Col>
              <Col span={12}>
                <Form.Item colon={false} label={formatMessage({ id: "GENDER" })}>
                  <GenderBox
                    disabled={!isClient}
                    value={values.gender}
                    placeholder={formatMessage({ id: "GENDER" })}
                    onChange={e => setFieldValue("gender", e)}
                  />
                </Form.Item>
              </Col>
              <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
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
          )}
        </Formik>
      </Card>
    );
  }
}
const ClientProfileBoxWithRedux = connect(
  null,
  dispatch => ({
    showInfo: params => dispatch(alertActions.showInfo(params)),
    uploadFile: ({ file, name }) => dispatch(fileUploadActions.uploadFile({ file, name }))
  })
)(ClientProfileBox);

export default injectIntl(ClientProfileBoxWithRedux);
