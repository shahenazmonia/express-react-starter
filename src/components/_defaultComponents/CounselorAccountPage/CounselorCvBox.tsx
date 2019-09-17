import React, { Component } from "react";
import { Card, Input, Form, Row, Col, Button, Icon, DatePicker } from "antd";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Formik } from "formik";
import moment from "moment";
import _ from "lodash";

import EducationDegreeSelectBox from "../SelectBoxes/EducationDegreeSelectBox";
import EducationSchoolSelectBox from "../SelectBoxes/EducationSchoolSelectBox";
import EducationList from "../List/EducationList";
import WorkExperinceList from "../List/WorkExperinceList";
import CoursesList from "../List/CoursesList";

import { profileValidationSchema } from "./profileValdationSchema";

const { TextArea } = Input;
const { RangePicker } = DatePicker;

interface IProps {
  isCounselor?: boolean;
  counselorInfo: any;
  onCvInfoSubmit: any;
}

interface IState {
  educationData: Array<any>;
  workExperienceData: Array<Object>;
  coursesData: Array<Object>;
}

class CounselorCvBox extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      educationData: [],
      workExperienceData: [],
      coursesData: []
    };
  }
  componentDidMount = () => {
    const {
      educationData = [],
      workExperienceData = [],
      coursesData = []
    } = this.props.counselorInfo;
    this.setState({ educationData, workExperienceData, coursesData });
  };

  onAddEducation = async ({ setFieldValue, educationDegree, educationSchool, educationData }) => {
    if (educationDegree && educationSchool) {
      educationData.push({
        educationDegree,
        educationSchool
      });
      this.setState({ educationData });
      setFieldValue("educationDegree", undefined);
      setFieldValue("educationSchool", undefined);
    }
  };

  onAddWorkExperience = async ({
    setFieldValue,
    workExperience,
    workExperienceDate,
    workExperienceData
  }) => {
    if (workExperience && workExperienceDate) {
      workExperienceData.push({
        workExperience,
        workExperienceDate
      });
      this.setState({ workExperienceData });
      setFieldValue("workExperience", undefined);
      setFieldValue("workExperienceRange[0]", undefined);
      setFieldValue("workExperienceRange[1]", undefined);
    }
  };

  onAddCourses = async ({ setFieldValue, courses, coursesDate, coursesData }) => {
    if (courses && coursesDate) {
      coursesData.push({
        courses,
        coursesDate
      });
      this.setState({ coursesData });
      setFieldValue("courses", undefined);
      setFieldValue("coursesDate", undefined);
    }
  };

  deleteData(data, id) {
    let index = _.findIndex(data, { id: id });
    data.splice(index, 1);
    this.setState({ ...data });
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { educationData, workExperienceData, coursesData } = this.state;
    const { isCounselor, counselorInfo, onCvInfoSubmit } = this.props;
    return (
      <Card
        title={formatMessage({ id: "COUNSELOR_CV_MY_COVER_LETTER" })}
        bordered={true}
        style={{ marginBottom: 50 }}
      >
        <Formik
          enableReinitialize
          initialValues={{
            coverLetter: counselorInfo.coverLetter,
            educationDegree: counselorInfo.educationDegree,
            educationSchool: counselorInfo.educationSchool,
            workExperience: counselorInfo.workExperience,
            workExperienceRange: counselorInfo.workExperienceRange,
            courses: counselorInfo.courses,
            coursesDate: counselorInfo.coursesDate
          }}
          validationSchema={profileValidationSchema.cvValidation(formatMessage)}
          onSubmit={(values, { setSubmitting }) =>
            onCvInfoSubmit(
              values,
              { setSubmitting },
              educationData,
              workExperienceData,
              coursesData
            )
          }
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
            <Form onSubmit={handleSubmit}>
              <Row>
                <Col span={24}>
                  <Form.Item
                    colon={false}
                    label={formatMessage({ id: "COUNSELOR_CV_COVER_LETTER" })}
                    validateStatus={errors.coverLetter && touched.coverLetter ? "error" : "success"}
                    help={errors.coverLetter && touched.coverLetter ? errors.coverLetter : null}
                  >
                    <TextArea
                      disabled={!isCounselor}
                      rows={4}
                      name="coverLetter"
                      onChange={handleChange}
                      value={values.coverLetter}
                    />
                  </Form.Item>
                </Col>
                {isCounselor && (
                  <Col span={24}>
                    <h3>{formatMessage({ id: "COUNSELOR_CV_EDUCATION_INFORMATION" })}</h3>
                    <Row type="flex" align="middle" gutter={8} style={{ marginBottom: 20 }}>
                      <Col xs={24} md={11} style={{ marginTop: 10 }}>
                        <EducationSchoolSelectBox
                          value={values.educationSchool}
                          onChange={e => setFieldValue("educationSchool", e)}
                        />
                      </Col>
                      <Col xs={24} md={11} style={{ marginTop: 10 }}>
                        <EducationDegreeSelectBox
                          value={values.educationDegree}
                          onChange={e => setFieldValue("educationDegree", e)}
                        />
                      </Col>
                      <Col
                        style={{
                          display: "flex",
                          justifyContent: "flex-end",
                          alignItems: "center",
                          marginTop: 5
                        }}
                        md={2}
                      >
                        <span
                          onClick={e => {
                            this.onAddEducation({
                              setFieldValue,
                              educationDegree: values.educationDegree,
                              educationSchool: values.educationSchool,
                              educationData
                            });
                          }}
                        >
                          <Icon type="plus-circle" style={{ fontSize: 30, color: "#000000" }} />
                        </span>
                      </Col>
                    </Row>
                  </Col>
                )}
                <Col span={24}>
                  <EducationList
                    educationData={educationData}
                    isCounselor={isCounselor}
                    deleteItem={id => this.deleteData(educationData, id)}
                  />
                </Col>
                {isCounselor && (
                  <Col span={24}>
                    <Row type="flex" align="middle" justify="space-between">
                      <Col span={20}>
                        <Form.Item
                          colon={false}
                          label={formatMessage({ id: "COUNSELOR_CV_WORK_EXPERIENCE" })}
                          validateStatus={
                            errors.workExperience && touched.workExperience ? "error" : "success"
                          }
                          help={
                            errors.workExperience && touched.workExperience
                              ? errors.workExperience
                              : null
                          }
                        >
                          <TextArea
                            disabled={!isCounselor}
                            rows={4}
                            name="workExperience"
                            onChange={handleChange}
                            value={values.workExperience}
                          />
                        </Form.Item>
                      </Col>
                      <Col>
                        <span
                          onClick={e =>
                            this.onAddWorkExperience({
                              setFieldValue,
                              workExperience: values.workExperience,
                              workExperienceDate:
                                values.workExperienceRange[0] || values.workExperienceRange[1]
                                  ? `${moment(values.workExperienceRange[0]).format(
                                      "YYYY-MM"
                                    )} - ${moment(values.workExperienceRange[1]).format("YYYY-MM")}`
                                  : undefined,
                              workExperienceData
                            })
                          }
                        >
                          <Icon type="plus-circle" style={{ fontSize: 30, color: "#000000" }} />
                        </span>
                      </Col>
                      <Col xs={20} md={12} style={{ marginBottom: 20 }}>
                        <RangePicker
                          disabled={!isCounselor}
                          format={"MM/YYYY"}
                          placeholder={[
                            formatMessage({ id: "START_WORK_EXPERIENCE" }),
                            formatMessage({ id: "FINISH_WORK_EXPERIENCE" })
                          ]}
                          value={
                            values.workExperienceRange && [
                              values.workExperienceRange[0],
                              values.workExperienceRange[1]
                            ]
                          }
                          onChange={date => {
                            date.length !== 0 &&
                              setFieldValue("workExperienceRange[0]", moment(date[0], "MM/YYYY"));
                            date.length !== 0 &&
                              setFieldValue("workExperienceRange[1]", moment(date[1], "MM/YYYY"));
                            date.length === 0 && setFieldValue("workExperienceRange[0]", undefined);
                            date.length === 0 && setFieldValue("workExperienceRange[1]", undefined);
                          }}
                        />
                      </Col>
                    </Row>
                  </Col>
                )}
                <Col span={24}>
                  <WorkExperinceList
                    workExperienceData={workExperienceData}
                    isCounselor={isCounselor}
                    deleteItem={id => this.deleteData(workExperienceData, id)}
                  />
                </Col>
                {
                  //SERTIFIKALAR
                }
                {isCounselor && (
                  <Col span={24} style={{ marginBottom: 20 }}>
                    <Row type="flex" align="middle" justify="space-between">
                      <Col span={20}>
                        <Form.Item
                          colon={false}
                          label={formatMessage({ id: "COUNSELOR_CV_COURSES" })}
                          validateStatus={errors.courses && touched.courses ? "error" : "success"}
                          help={errors.courses && touched.courses ? errors.courses : null}
                        >
                          <TextArea
                            disabled={!isCounselor}
                            rows={4}
                            name="courses"
                            onChange={handleChange}
                            value={values.courses}
                          />
                        </Form.Item>
                      </Col>
                      <Col>
                        <span
                          onClick={e =>
                            this.onAddCourses({
                              setFieldValue,
                              courses: values.courses,
                              coursesDate: values.coursesDate,
                              coursesData
                            })
                          }
                        >
                          <Icon type="plus-circle" style={{ fontSize: 30, color: "#000000" }} />
                        </span>
                      </Col>
                      <Col xs={20} md={12}>
                        <DatePicker
                          disabled={!isCounselor}
                          format={"DD/MM/YYYY"}
                          placeholder={formatMessage({ id: "COUNSELOR_CV_COURSES_DATE" })}
                          value={
                            values.coursesDate
                              ? moment(values.coursesDate, "DD/MM/YYYY")
                              : undefined
                          }
                          onChange={coursesDate => {
                            coursesDate &&
                              setFieldValue(
                                "coursesDate",
                                moment(coursesDate).format("DD/MM/YYYY")
                              );
                            !coursesDate && setFieldValue("coursesDate", undefined);
                          }}
                          style={{ width: "100%" }}
                        />
                      </Col>
                    </Row>
                  </Col>
                )}
                <Col span={24}>
                  <CoursesList
                    coursesData={coursesData}
                    isCounselor={isCounselor}
                    deleteItem={id => this.deleteData(coursesData, id)}
                  />
                </Col>

                <Col span={24} style={{ marginTop: 20 }}>
                  <Row type="flex" justify="center">
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

export default injectIntl(CounselorCvBox);
