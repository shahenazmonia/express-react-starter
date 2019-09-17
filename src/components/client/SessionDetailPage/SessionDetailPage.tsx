import React, { Component, Fragment } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import _ from "lodash";

import * as sessionActions from "../../../store/actions/sessionActions";
import AvatarDisplay from "../../_defaultComponents/SessionDetailComponents/AvatarDisplay";
import StatusDisplay from "../../_defaultComponents/SessionDetailComponents/StatusDisplay";
import PaymentInfoDisplay from "../../_defaultComponents/SessionDetailComponents/PaymentInfoDisplay";
import EvaluationDisplay from "../../_defaultComponents/SessionDetailComponents/EvaluationDisplay";
import SessionMessages from "../../_defaultComponents/SessionDetailComponents/SessionMessages/SessionMessages";
import PreSessionInformation from "../../_defaultComponents/SessionDetailComponents/PreSessionInformation/PreSessionInformation";
import GeneralSessionInformation from "../../_defaultComponents/SessionDetailComponents/GeneralSessionInformation";

import users from "../../../utility/constants/user";
import { Row, Col, Card, Button } from "antd";
import moment from "moment";
interface IProps {
  sessionId: string;
  user: object;
  jitsi: { openJitsi: boolean; roomName: string; expiryTime: number };
  language: string;
  getSessionDetail: (params: any) => any;
  evaluateSession: (params: any) => any;
  setPreSessionInformation: (params: any) => any;
  cancelSession: (params: any) => any;
}
interface IState {
  sessionDetail: any;
}

class SessionDetailPage extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { sessionDetail: {} };
  }

  componentDidMount() {
    this.props.getSessionDetail({ sessionId: this.props.sessionId }).then(result => {
      this.setState({ sessionDetail: result.action.payload.data });
    });
  }

  setPreSessionInformation = (values, { setSubmitting }) => {
    try {
      const { sessionId } = this.props;
      this.props.setPreSessionInformation({ sessionId, ...values });
    } catch (err) {
      // console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  onEvaluateSessionClick = (evaluation, { setSubmitting }) => {
    try {
      const { sessionId, evaluateSession } = this.props;
      evaluateSession({ sessionId, evaluation });
    } catch (err) {
      // console.log(err);
    } finally {
      setSubmitting(false);
    }
  };

  onStartClick = () => {
    window.open(
      window.location.origin + "/jitsi",
      "",
      "width=600,height=400,location=0,directories=0,menubar=0,toolbar=0,status=0,scrollbars=1,resizable=1,top=5,left=5"
    );
  };

  cancelSession = async () => {
    const { cancelSession, user } = this.props;
    const { sessionDetail } = this.state;
    const result = await cancelSession({
      sessionId: sessionDetail._id,
      cancelationInfo: {
        user: sessionDetail.clientId,
        userType: users.CLIENT,
        cancelationDate: new Date()
      }
    });
    this.setState({ sessionDetail: Object.assign({}, sessionDetail, result.action.payload.data) });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { openJitsi } = this.props.jitsi;

    const { language } = this.props;
    const { sessionDetail } = this.state;
    const {
      counselorInfo,
      clientInfo,
      status,
      counselorId,
      sessionPrice,
      evaluation,
      sessionDate,
      categoryInfo
    } = sessionDetail;

    const startTime = moment(sessionDate);

    const timeUntilSession = moment.duration(startTime.diff(moment())).asDays() <= 1;
    const timeAfterSession = moment(sessionDate)
      .add(7, "d")
      .isAfter(moment());
    return (
      <Fragment>
        {!_.isEmpty(sessionDetail) && (
          <Row type="flex" justify="center">
            <Col span={16}>
              <Row type="flex" justify="space-around">
                <Col span={24}>
                  <Card title={formatMessage({ id: "SESSION_INFORMATION" })}>
                    <Col span={8}>
                      <AvatarDisplay
                        counselorInfo={counselorInfo}
                        clientInfo={clientInfo}
                        showCounselor={true}
                        id={counselorId}
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
                        userType={users.CLIENT}
                        isOpenJitsi={openJitsi}
                        onStartClick={this.onStartClick}
                        status={status}
                        cancelSession={this.cancelSession}
                        sessionDate={sessionDate}
                      />
                    </Col>
                  </Card>
                </Col>
              </Row>
              {status === "pending" && (
                <Row style={{ marginTop: 20 }}>
                  <Col span={24}>
                    <Card title={formatMessage({ id: "PRESESSION_INFORMATION" })}>
                      <PreSessionInformation
                        isClient={true}
                        clientNickname={sessionDetail.clientNickname}
                        preSessionMessage={sessionDetail.preSessionMessage}
                        setPreSessionInformation={this.setPreSessionInformation}
                      />
                    </Card>
                  </Col>
                </Row>
              )}
              {timeAfterSession && timeUntilSession && (
                <Row style={{ marginTop: 20 }}>
                  <Col span={24}>
                    <Card title={formatMessage({ id: "SESSION_MESSAGES" })}>
                      <SessionMessages sessionDetail={sessionDetail} />
                    </Card>
                  </Col>
                </Row>
              )}
              {status === "completed" && (
                <Row style={{ marginTop: 20 }}>
                  <Col span={24}>
                    <Card title={formatMessage({ id: "SESSION_EVALUATION" })}>
                      <EvaluationDisplay
                        isClient={true}
                        canBeEvaluated={timeAfterSession}
                        evaluation={evaluation}
                        onEvaluateSessionClick={this.onEvaluateSessionClick}
                      />
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
    user: state.user,
    jitsi: state.jitsi,
    language: state.locale.language
  };
};

const dispatchToProps = dispatch => {
  return {
    getSessionDetail: params => dispatch(sessionActions.getSessionDetail(params)),
    evaluateSession: params => dispatch(sessionActions.evaluateSession(params)),
    setPreSessionInformation: params => dispatch(sessionActions.setPreSessionInformation(params)),
    cancelSession: params => dispatch(sessionActions.cancelSession(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(SessionDetailPage));
