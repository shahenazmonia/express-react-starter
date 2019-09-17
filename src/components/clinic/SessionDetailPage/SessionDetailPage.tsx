import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import _ from "lodash";

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
import EvaluationDisplay from "../../_defaultComponents/SessionDetailComponents/EvaluationDisplay";
import SessionMessages from "../../_defaultComponents/SessionDetailComponents/SessionMessages/SessionMessages";
import GeneralSessionInformation from "../../_defaultComponents/SessionDetailComponents/GeneralSessionInformation";

import { Row, Col, Card } from "antd";

interface IProps {
  showConfirm: any;
  sessionId: string;
  language: string;
  getSessionDetail: (params: any) => any;
}
interface IState {
  saveSession: boolean;
  sessionDetail: any;
}

class SessionDetailPage extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { saveSession: true, sessionDetail: {} };
  }

  componentDidMount() {
    this.props.getSessionDetail({ sessionId: this.props.sessionId }).then(result => {
      this.setState({ sessionDetail: result.action.payload.data });
    });
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { language } = this.props;
    const { sessionDetail } = this.state;
    const {
      counselorInfo,
      clientInfo,
      status,
      sessionPrice,
      evaluation,
      feeling,
      tests,
      epikriz,
      note,
      sessionDate,
      categoryInfo,
      clientNickname,
      preSessionMessage
    } = sessionDetail;

    return (
      <Row type="flex" justify="center">
        {!_.isEmpty(sessionDetail) && (
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
                      categoryName={language === "tr" ? categoryInfo.name_TR : categoryInfo.name_EN}
                    />
                  </Col>
                  <Col style={{ display: "flex", justifyContent: "flex-end" }} span={8}>
                    <StatusDisplay userType={users.CLINIC} status={status} />
                  </Col>
                </Card>
              </Col>
            </Row>
            {/* <Row style={{ marginTop: 20 }}>
                <Col span={24}>
                  <Card title={formatMessage({ id: "SESSION_MESSAGES" })}>
                    <SessionMessages sessionDetail={sessionDetail} />
                  </Card>
                </Col>
               </Row>*/}
            {(evaluation || feeling || tests || epikriz || clientNickname || preSessionMessage) && (
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
                      {evaluation && (
                        <Col>
                          <EvaluationDisplay isClient={false} evaluation={evaluation} />
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
        )}
      </Row>
    );
  }
}
const stateToProps = state => {
  return {
    language: state.locale.language
  };
};

const dispatchToProps = dispatch => {
  return {
    showConfirm: params => dispatch(alertActions.showConfirm(params)),
    getSessionDetail: params => dispatch(sessionActions.getSessionDetail(params))
  };
};
export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(SessionDetailPage));
