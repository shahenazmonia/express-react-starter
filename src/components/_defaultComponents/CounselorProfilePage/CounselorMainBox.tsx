import * as React from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import _ from "lodash";
import history from "../../../_core/history";
import config from "../../../_core/config";
import EducationType from "../../../utility/constants/educationType";
import CounselorServiceCategoryBox from "./CounselorServiceCategoryBox";
import BlogVideoThumbnail from "../BlogVideo/BlogVideoThumbnail";

import { Row, Col, Avatar, Rate, Button, Card, Switch, Icon } from "antd";
import EmptyComponent from "../EmptyComponent";

interface IProps {
  isCounselor: boolean;
  counselorInfo: any;
  counselorCategories: any;
  instantTherapy: boolean;
  onInstantTherapySwitch: (params: any) => any;
}

interface IState {}

class CounselorMainBox extends React.Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { isCounselor, counselorInfo, counselorCategories, instantTherapy } = this.props;
    const { formatMessage } = this.props.intl;
    const counselorProfilePhoto = (counselorInfo.profilePhoto || {})._id;
    return (
      <Card bordered>
        <Row type="flex" justify="space-between">
          <Col
            span={24}
            style={{
              height: 300,
              backgroundColor: "#f3f3f3",
              padding: 0,
              position: "relative",
              display: "flex",
              alignItems: "center",
              justifyContent: "center"
            }}
          >
            {counselorInfo.video_url ? (
              <BlogVideoThumbnail
                media={{
                  url: counselorInfo.video_url
                }}
              />
            ) : (
              <Icon type="play-circle" style={{ fontSize: "70px", color: "grey" }} />
            )}
          </Col>
          <Col span={24} style={{ height: 80 }}>
            <Avatar
              src={
                counselorProfilePhoto &&
                config.getBasePublicUrl() + "api/getFile/" + counselorProfilePhoto
              }
              icon={!counselorProfilePhoto ? "user" : undefined}
              shape="circle"
              size={150}
              style={{ position: "absolute", top: -75, color: "white", objectFit: "contain" }}
            />
          </Col>
          <Col>
            <h3>{counselorInfo.fullname}</h3>
            <Rate value={counselorInfo.rating} />
          </Col>
          <Col
            span={2}
            style={{
              background: "#f1f1f1",
              textAlign: "center",
              height: "fit-content",
              padding: "10px 0px"
            }}
          >
            <h3>{formatMessage({ id: "COUNSELOR_PROFILE_SESSION" })}</h3>
            <h4>
              <b>{counselorInfo.sessionNumberCounselor}</b>
            </h4>
          </Col>
          <Col
            span={2}
            style={{
              background: "#f1f1f1",
              textAlign: "center",
              height: "fit-content",
              padding: "10px 0px"
            }}
          >
            <h3>{formatMessage({ id: "COUNSELOR_PROFILE_ILL" })}</h3>
            <h4>
              <b>{counselorInfo.clientsNumberCounselor}</b>
            </h4>
          </Col>
          <Col style={{ display: isCounselor ? "flex" : "none", flexDirection: "column" }}>
            <Button ghost type="primary" onClick={() => history.push("/counselor/account")}>
              {formatMessage({ id: "COUNSELOR_PROFILE_ACCOUNT" })}
            </Button>
            <Row style={{ marginTop: 10 }} type="flex" justify="center">
              <Col span={24}>
                <b>{formatMessage({ id: "INSTANT_THERAPY" })}</b>
              </Col>
              <Col span={12}>
                <Switch
                  checked={instantTherapy}
                  style={{ marginTop: 10 }}
                  onChange={this.props.onInstantTherapySwitch}
                />
              </Col>
            </Row>
          </Col>
          <Col span={24} style={{ marginTop: 20 }}>
            <Card>
              <h2>{formatMessage({ id: "COUNSELOR_PROFILE_ABOUT" })}</h2>
              <hr />
              {counselorInfo.coverLetter ? (
                <p>{counselorInfo.coverLetter}</p>
              ) : (
                <EmptyComponent description={"NO_COVER_LETTER"} />
              )}
            </Card>
          </Col>
          <Col span={24} style={{ marginTop: 20 }}>
            <Card>
              <h2>{formatMessage({ id: "COUNSELOR_PROFILE_SERVICE_CATEGORIES" })}</h2>
              <hr />
              {counselorCategories.length !== 0 ? (
                counselorCategories.map((category, i) => (
                  <React.Fragment key={i}>
                    <CounselorServiceCategoryBox category={category} />
                  </React.Fragment>
                ))
              ) : (
                <EmptyComponent description={"NO_COUNSELOR_CATEGORIES"} />
              )}
            </Card>
          </Col>
          <Col span={24} style={{ marginTop: 20 }}>
            <Card>
              <h2>{formatMessage({ id: "COUNSELOR_PROFILE_EDUCATION" })}</h2>
              {counselorInfo && counselorInfo.educationData !== 0 ? (
                counselorInfo.educationData.map((item, i) => {
                  return (
                    <React.Fragment key={i}>
                      <hr />
                      <h3 style={{ color: "red" }}>{item.educationSchool}</h3>
                      <h3 style={{ color: "black" }}>
                        {_.findIndex(EducationType, { value: item.educationDegree }) !== -1 &&
                          formatMessage({
                            id: _.find(EducationType, { value: item.educationDegree }).text
                          })}
                      </h3>
                    </React.Fragment>
                  );
                })
              ) : (
                <EmptyComponent description={"NO_EDUCATION_DATA"} />
              )}
            </Card>
          </Col>
          <Col span={24} style={{ marginTop: 20 }}>
            <Card>
              <h2>{formatMessage({ id: "COUNSELOR_PROFILE_WORK_EXPERIENCE" })}</h2>
              {counselorInfo &&
                counselorInfo.workExperienceData &&
                counselorInfo.workExperienceData.map((item, i) => {
                  return (
                    <React.Fragment key={i}>
                      <hr />
                      <h3 style={{ color: "red" }}>{item.workExperience}</h3>
                      <p>{item.workExperienceDate}</p>
                    </React.Fragment>
                  );
                })}
            </Card>
          </Col>
          <Col span={24} style={{ marginTop: 20 }}>
            <Card>
              <h2>{formatMessage({ id: "COUNSELOR_PROFILE_COURSES" })}</h2>
              {counselorInfo &&
                counselorInfo.coursesData &&
                counselorInfo.coursesData.map((item, i) => {
                  return (
                    <React.Fragment key={i}>
                      <hr />
                      <h3 style={{ color: "red" }}>
                        {item.courses}
                        <p style={{ color: "grey" }}>{" " + item.coursesDate}</p>
                      </h3>
                    </React.Fragment>
                  );
                })}
            </Card>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default injectIntl(CounselorMainBox);
