import React, { Component } from "react";
import { Row, Col, Card, Input, Form, Button, DatePicker, Avatar } from "antd";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import { Formik } from "formik";
import moment from "moment";

import GenderBox from "../SelectBoxes/GenderBox";
import DegreeSelectBox from "../SelectBoxes/DegreeSelectBox";
import config from "../../../_core/config";
import { profileValidationSchema } from "./profileValdationSchema";
import * as alertActions from "../../../store/actions/alertActions";
import UploadImage from "../UploadFile";

const dateFormat = "DD/MM/YYYY";

interface IProps {
  isCounselor?: boolean;
  counselorInfo: any;
  onProfileInfoSubmit: (values: any, e: any) => any;
  uploadFile: ({ file: any, name: String }) => any;
  showInfo: (params: any) => any;
}
interface IState {
  counselorPhoto: any;
}

class CounselorProfileBox extends Component<IProps & InjectedIntlProps, IState> {
  state = {
    counselorPhoto: {
      _id: ""
    }
  };
  chooseProfilePhoto = (e, setFieldValue) => {
    const { uploadFile } = this.props;
    const types = ["image/png", "image/jpeg", "image/gif"];
    const errs: Array<String> = [];
    const files = Array.from(e.target.files);
    const file: any = files[0];
    if (types.every(type => file.type !== type)) {
      this.props.showInfo({
        title: "HATA",
        body: "image is not a supported format",
        actionFunc: () => {}
      });
    } else if (file.size > 150000) {
      this.props.showInfo({
        title: "HATA",
        body: "image is too large, please pick a smaller fil",
        actionFunc: () => {}
      });
    } else {
      uploadFile({ file, name: file.name }).then(result => {
        setFieldValue("profilePhoto", result.action.payload.data);
        this.setState({ counselorPhoto: result.action.payload.data });
      });
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { counselorInfo, isCounselor, onProfileInfoSubmit } = this.props;
    const { counselorPhoto } = this.state;
    const imageId = counselorPhoto._id || (counselorInfo.profilePhoto || {})._id;
    return (
      <Card
        title={formatMessage({ id: "COUNSELOR_PROFILE" })}
        bordered={true}
        style={{ marginBottom: 50 }}
      >
        <Formik
          enableReinitialize
          initialValues={{
            fullname: counselorInfo.fullname,
            degree: counselorInfo.degree,
            birthday: counselorInfo.birthday ? counselorInfo.birthday : null,
            gender: counselorInfo.gender,
            profilePhoto: counselorInfo.profilePhoto,
            email: counselorInfo.email,
            video_url: counselorInfo["video_url"]
          }}
          validationSchema={profileValidationSchema.profileValidation(formatMessage)}
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
            <Row type="flex" justify="space-between" gutter={40}>
              <div style={{ display: "flex", justifyContent: "center", width: "100%" }}>
                <div
                  style={{ cursor: "copy" }}
                  onClick={() => {
                    if (isCounselor) {
                      const filePicker: any = document.getElementsByClassName("ant-upload")[1];
                      filePicker.click();
                    }
                  }}
                >
                  <Avatar
                    shape="square"
                    size={100}
                    icon="user"
                    src={imageId && config.getBasePublicUrl() + "api/getFile/" + imageId}
                    style={{ objectFit: "contain" }}
                  />
                  <Form.Item
                    colon={false}
                    validateStatus={errors.fullname && touched.fullname ? "error" : "success"}
                    help={errors.fullname && touched.fullname ? errors.fullname : null}
                  >
                    <UploadImage
                      visible={!counselorInfo && counselorInfo.profilePhoto}
                      updateState={data => {
                        setFieldValue("profilePhoto", data);
                        this.setState({ counselorPhoto: data });
                      }}
                    />
                  </Form.Item>
                </div>
              </div>
              <Col xs={24} md={12}>
                <Form.Item
                  colon={false}
                  label={formatMessage({ id: "COUSELOR_PROFILE_FULLNAME" })}
                  validateStatus={errors.fullname && touched.fullname ? "error" : "success"}
                  help={errors.fullname && touched.fullname ? errors.fullname : undefined}
                >
                  <Input
                    disabled={!isCounselor}
                    type="text"
                    name="fullname"
                    onChange={handleChange}
                    value={values.fullname}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item colon={false} label={formatMessage({ id: "COUNSELOR_PROFILE_DEGREE" })}>
                  <DegreeSelectBox
                    disabled={!isCounselor}
                    value={values.degree}
                    onChange={e => setFieldValue("degree", e)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item
                  colon={false}
                  label={formatMessage({ id: "COUNSELOR_PROFILE_BIRTHDAY" })}
                >
                  <DatePicker
                    disabled={!isCounselor}
                    placeholder={formatMessage({ id: "COUNSELOR_PROFILE_BIRTHDAY" })}
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
              <Col xs={24} md={12}>
                <Form.Item colon={false} label={formatMessage({ id: "GENDER" })}>
                  <GenderBox
                    disabled={!isCounselor}
                    value={values.gender}
                    placeholder={formatMessage({ id: "GENDER" })}
                    onChange={e => setFieldValue("gender", e)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item colon={true} label={formatMessage({ id: "EMAIL" })}>
                  <Input
                    disabled={true}
                    value={values.email}
                    onChange={e => setFieldValue("email", e.target.value)}
                  />
                </Form.Item>
              </Col>
              <Col xs={24} md={12}>
                <Form.Item colon={false} label={formatMessage({ id: "VIDEO_URL" })}>
                  <Input
                    disabled={!isCounselor}
                    value={values["video_url"]}
                    onChange={e => setFieldValue("video_url", e.target.value)}
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
          )}
        </Formik>
      </Card>
    );
  }
}

const CounselorProfileBoxWithRedux = connect(
  null,
  dispatch => ({
    showInfo: params => dispatch(alertActions.showInfo(params))
  })
)(CounselorProfileBox);

export default injectIntl(CounselorProfileBoxWithRedux);
