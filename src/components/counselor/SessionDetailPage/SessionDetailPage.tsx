import React, { Component, Fragment } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import _ from "lodash";
import moment from "moment";
import * as alertActions from "../../../store/actions/alertActions";
import * as sessionActions from "../../../store/actions/sessionActions";
import users from "../../../utility/constants/user";
import AvatarDisplay from "../../_defaultComponents/SessionDetailComponents/AvatarDisplay";
import StatusDisplay from "../../_defaultComponents/SessionDetailComponents/StatusDisplay";
import PaymentInfoDisplay from "../../_defaultComponents/SessionDetailComponents/PaymentInfoDisplay";
import MessageDisplay from "../../_defaultComponents/SessionDetailComponents/MessageDisplay";
import FeelingDisplay from "../../_defaultComponents/SessionDetailComponents/FeelingDisplay";
import TestResultDisplay from "../../_defaultComponents/SessionDetailComponents/TestResultDisplay";
import EpikrizDisplay from "../../_defaultComponents/SessionDetailComponents/EpikrizDisplay";
import PreSessionInformationDisplay from "../../_defaultComponents/SessionDetailComponents/PreSessionInformationDisplay";
import SessionMessages from "../../_defaultComponents/SessionDetailComponents/SessionMessages/SessionMessages";
import GeneralSessionInformation from "../../_defaultComponents/SessionDetailComponents/GeneralSessionInformation";
import EpikrizModal from "../../_defaultComponents/Modals/CounselorFeedbackModal";

import { Row, Col, Card, Button } from "antd";
import JitsiPage from "../../client/JıtsiTestPage/JitsiPage";

interface IProps {
  showConfirm: any;
  sessionId: string;
  jitsi: any;
  language: string;
  getSessionDetail: (params: any) => any;
  cancelSession: (params: any) => any;
  saveEpikriz: (params: any) => any;
}
interface IState {
  saveSession: boolean;
  sessionDetail: any;
  openEpikrizModal: boolean;
}

class SessionDetailPage extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { saveSession: true, sessionDetail: {}, openEpikrizModal: false };
  }

  componentDidMount() {
    this.props.getSessionDetail({ sessionId: this.props.sessionId }).then(result => {
      this.setState({ sessionDetail: result.action.payload.data });
    });
  }

  updateSession = (sessionDetail: any) => {
    this.setState({ sessionDetail: Object.assign({}, this.state.sessionDetail, sessionDetail) });
  };

  onStartClick = () => {
    window.open(
      window.location.origin + "/jitsi",
      "",
      "width=600,height=400,location=0,directories=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1,top=5,left=5"
    );
  };

  cancelSession = async () => {
    const { cancelSession } = this.props;
    const { sessionDetail } = this.state;
    const result = await cancelSession({
      sessionId: sessionDetail._id,
      cancelationInfo: {
        cancelationDate: new Date(),
        user: sessionDetail.couselorId,
        userType: users.COUNSELOR
      }
    });

    this.updateSession(result.action.payload.data);
  };

  openEpikrizModal = () => {
    this.setState({ openEpikrizModal: true });
  };

  closeEpikrizModal = () => {
    this.setState({ openEpikrizModal: false });
  };

  saveEpikriz = async values => {
    const result = await this.props.saveEpikriz({
      sessionId: this.state.sessionDetail._id,
      epikriz: values.epikriz
    });
    this.updateSession(result.action.payload.data);
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { openJitsi } = this.props.jitsi;
    const { language } = this.props;
    const { sessionDetail, openEpikrizModal } = this.state;
    const {
      counselorInfo,
      clientInfo,
      status,
      sessionPrice,
      feeling,
      tests,
      epikriz,
      note,
      sessionDate,
      categoryInfo,
      preSessionMessage,
      clientNickname
    } = sessionDetail;
    const endTime = sessionDate
      ? Math.floor(new Date(sessionDate).getTime() / 1000) + 60 * 60
      : undefined;
    const startTime = moment(sessionDate);

    const timeUntilSession = moment.duration(startTime.diff(moment())).asDays() <= 1;
    const timeAfterSession = moment(sessionDetail.sessionDate)
      .add(7, "d")
      .isAfter(moment());

    return (
      <Fragment>
        <EpikrizModal
          epikriz={epikriz}
          openModal={openEpikrizModal}
          onSubmit={this.saveEpikriz}
          hideFeedbackModal={this.closeEpikrizModal}
        />
        {
          //endTime && <JitsiPage roomName={this.props.sessionId} expiryTime={endTime} />
        }
        {!_.isEmpty(sessionDetail) && (
          <Row type="flex" justify="center">
            <Col span={16}>
              <Row type="flex" justify="space-between">
                <Col span={24}>
                  <Card title={formatMessage({ id: "SESSION_INFORMATION" })}>
                    <Col span={8}>
                      <AvatarDisplay
                        counselorInfo={counselorInfo}
                        clientInfo={clientInfo}
                        showCounselor={false}
                      />
                    </Col>
                    <Col style={{ display: "flex", justifyContent: "center" }} span={8}>
                      <GeneralSessionInformation
                        sessionDate={sessionDate}
                        sessionPrice={sessionPrice}
                        categoryName={
                          language === "tr" ? categoryInfo.name_TR : categoryInfo.name_EN
                        }
                      />
                    </Col>
                    <Col style={{ display: "flex", justifyContent: "flex-end" }} span={8}>
                      <StatusDisplay
                        userType={users.COUNSELOR}
                        isOpenJitsi={openJitsi}
                        onStartClick={this.onStartClick}
                        status={status}
                        cancelSession={this.cancelSession}
                        sessionDate={sessionDate}
                        epikriz={epikriz}
                        openEpikrizModal={this.openEpikrizModal}
                      />
                    </Col>
                  </Card>
                </Col>
              </Row>
              {timeAfterSession && timeUntilSession && (
                <Row style={{ marginTop: 20 }}>
                  <Col span={24}>
                    <Card title={formatMessage({ id: "SESSION_MESSAGES" })}>
                      <SessionMessages
                        updateSession={this.updateSession}
                        sessionDetail={sessionDetail}
                      />
                    </Card>
                  </Col>
                </Row>
              )}
              {(feeling || tests || epikriz || clientNickname || preSessionMessage) && (
                <Row style={{ marginTop: 20 }}>
                  <Col span={24}>
                    <Card title={formatMessage({ id: "SESSION_DETAILED_INFORMATION" })}>
                      <Row>
                        {/*<Col>
                      <MessageDisplay />
                    </Col>*/}
                        {feeling && (
                          <Col>
                            <FeelingDisplay feeling={feeling} />
                          </Col>
                        )}
                        {tests && (
                          <Col style={{ marginTop: 10 }}>
                            <TestResultDisplay />
                          </Col>
                        )}
                        {epikriz && (
                          <Col style={{ marginTop: 10 }}>
                            <EpikrizDisplay epikriz={epikriz} />
                          </Col>
                        )}
                        {(clientNickname || preSessionMessage) && (
                          <Col>
                            <PreSessionInformationDisplay
                              clientNickname={clientNickname}
                              preSessionMessage={preSessionMessage}
                            />
                          </Col>
                        )}
                      </Row>
                    </Card>
                  </Col>
                </Row>
              )}
              <Row style={{ marginTop: 20 }}>
                <Col span={24}>
                  <Card title={formatMessage({ id: "PAYMENT_INFORMATION" })}>
                    <PaymentInfoDisplay sessionPrice={sessionPrice} />
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        )}
      </Fragment>
    );
  }
}
const stateToProps = state => {
  return {
    jitsi: state.jitsi,
    language: state.locale.language
  };
};

const dispatchToProps = dispatch => {
  return {
    showConfirm: params => dispatch(alertActions.showConfirm(params)),
    getSessionDetail: params => dispatch(sessionActions.getSessionDetail(params)),
    cancelSession: params => dispatch(sessionActions.cancelSession(params)),
    saveEpikriz: params => dispatch(sessionActions.saveEpikriz(params))
  };
};
export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(SessionDetailPage));
