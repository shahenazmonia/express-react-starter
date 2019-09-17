import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";
import { injectIntl, InjectedIntlProps } from "react-intl";

import * as alertActions from "../../../store/actions/alertActions";
import * as counselorActions from "../../../store/actions/counselorActions";
import * as fileUploadActions from "../../../store/actions/fileUploadActions";
import * as counselorCategoryActions from "../../../store/actions/counselorCategoryActions";

import CounselorProfileBox from "./CounselorProfileBox";
import CounselorCvBox from "./CounselorCvBox";
import CounselorAccountBox from "./CounselorAccountBox";
import CounselorServiceBox from "./CounselorServiceBox";

import { Row, Col, Spin } from "antd";
import ChangePasswordBox from "./ChangePasswordBox";

import { ShowAlertParams, ShowInfoAction } from "../../../store/actions/alertActions";

interface IProps {
  user: any;
  isCounselor?: boolean;
  updateProfileInfo: any;
  updateCvInfo: any;
  updateAccountInfo: any;
  updateServiceInfo: any;
  counselorInfo?: any;
  uploadFile: ({ file: any, name: String }) => any;
  getCounselorInfo?: any;
  showInfo: (ShowAlertParams) => ShowInfoAction;
  intl: any;
}
interface IState {}

class CounselorAccount extends Component<IProps & InjectedIntlProps, IState> {
  scrollEditRef: any;
  constructor(props) {
    super(props);
    this.scrollEditRef = React.createRef();
    this.state = {};
  }

  showInfoModal = ({ body }) => {
    const { formatMessage } = this.props.intl;
    this.props.showInfo({
      title: formatMessage({ id: "SUCCESS" }),
      body: formatMessage({ id: body })
    });
  };

  onProfileInfoSubmit = (values, { setSubmitting }) => {
    const counselor = { ...values };
    delete counselor.email;
    counselor.video_url =
      counselor.video_url && counselor.video_url.trim() === "" ? null : counselor.video_url;
    const profileInfo = { counselorId: this.props.user._id, ...counselor };
    this.props
      .updateProfileInfo({ ...profileInfo })
      .then(result => this.showInfoModal({ body: "UPDATE_PROFILE_INFO_SUCCESS" }))
      .finally(() => setSubmitting(false));
  };

  onCvInfoSubmit = (values, { setSubmitting }, educationData, workExperienceData, coursesData) => {
    const cvInfo = {
      counselorId: this.props.user._id,
      coverLetter: values.coverLetter,
      educationData,
      workExperienceData,
      coursesData
    };
    this.props
      .updateCvInfo({ cvInfo })
      .then(result => this.showInfoModal({ body: "UPDATE_CV_INFO_SUCCESS" }))
      .finally(() => setSubmitting(false));
  };

  onAccountInfoSubmit = (values, { setSubmitting }) => {
    const accountInfo = { counselorId: this.props.user._id, ...values };
    this.props
      .updateAccountInfo({ ...accountInfo })
      .then(result => this.showInfoModal({ body: "UPDATE_ACCOUNT_INFO_SUCCESS" }))
      .finally(() => setSubmitting(false));
  };

  onServiceInfoSubmit = async values => {
    try {
      await this.props.updateServiceInfo({
        counselorId: this.props.user._id,
        serviceCategories: values
      });
      this.showInfoModal({ body: "UPDATE_SERVICE_INFO_SUCCESS" });
      this.props.getCounselorInfo();
    } catch (err) {
      // console.log(err)
    }
  };

  onScrollToView = () => {
    this.scrollEditRef.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
  };

  render() {
    const { counselorInfo, uploadFile, isCounselor, user } = this.props;
    const { formatMessage } = this.props.intl;

    if (!_.isEmpty(counselorInfo)) {
      return (
        <Row type="flex" justify="center">
          <Col xs={22} sm={18} lg={14}>
            <Row type="flex" justify="start">
              <h3> {formatMessage({ id: "SUBSCRIPTION_EXPIRATION_DATE" })}: </h3>{" "}
              {counselorInfo.subscription && (
                <h3 style={{ marginLeft: 10 }}>{`  ${
                  counselorInfo.subscription.expirationDate
                }`}</h3>
              )}
            </Row>
            <CounselorProfileBox
              counselorInfo={counselorInfo}
              uploadFile={uploadFile}
              isCounselor={isCounselor}
              onProfileInfoSubmit={this.onProfileInfoSubmit}
            />
          </Col>
          <Col xs={22} sm={18} lg={14}>
            <CounselorCvBox
              counselorInfo={counselorInfo}
              isCounselor={isCounselor}
              onCvInfoSubmit={this.onCvInfoSubmit}
            />
          </Col>
          <Col xs={22} sm={18} lg={14}>
            <span ref={ref => (this.scrollEditRef = ref)} />
            <CounselorServiceBox
              onScrollToView={this.onScrollToView}
              counselorInfo={counselorInfo}
              isCounselor={isCounselor}
              onServiceInfoSubmit={this.onServiceInfoSubmit}
            />
          </Col>
          <Col xs={22} sm={18} lg={14}>
            <CounselorAccountBox
              counselorInfo={counselorInfo}
              isCounselor={isCounselor}
              onAccountInfoSubmit={this.onAccountInfoSubmit}
            />
          </Col>
          {isCounselor && (
            <Col xs={22} sm={18} lg={14}>
              <ChangePasswordBox />
            </Col>
          )}
        </Row>
      );
    }
    return (
      <Row type="flex" justify="center">
        <Spin size="large" />
      </Row>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user || {}
  };
};

const dispatchToProps = dispatch => {
  return {
    updateProfileInfo: params => dispatch(counselorActions.updateProfileInfo(params)),
    updateCvInfo: params => dispatch(counselorActions.updateCvInfo(params)),
    updateAccountInfo: params => dispatch(counselorActions.updateAccountInfo(params)),
    updateServiceInfo: params => dispatch(counselorCategoryActions.updateServiceInfo(params)),
    uploadFile: ({ file, name }) => dispatch(fileUploadActions.uploadFile({ file, name })),
    showInfo: params => dispatch(alertActions.showInfo(params))
  };
};

const Account = connect(
  stateToProps,
  dispatchToProps
)(CounselorAccount);

export default injectIntl(Account);
