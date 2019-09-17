import React, { Component } from "react";
import moment from "moment";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import * as sessionActions from "../../store/actions/sessionActions";
import * as jitsiActions from "../../store/actions/jitsiActions";
import _ from "lodash";
import history from "../../_core/history";
import { Row, Col, Button } from "antd";
import styled from "styled-components";

interface IProps {
  user: any;
  jitsi: any;
  closestSession: any;
  resetJitsi: () => void;
  getClosestSession: (params: { userId: string; role: string }) => any;
  setSessionStatus: (params: { sessionId: string; status: string }) => any;
  setJitsi: (params: {
    roomName: string;
    expiryTime: number;
    openJitsi: boolean;
    counselorId: string;
    clientId: string;
    openMeeting: boolean;
  }) => void;
}

interface IState {
  countDown: any;
  openJitsi: boolean;
}

const CdButton: any = styled.div`
  color: white;
  background-color: #e60000 !important;
  cursor: pointer;
`;

const CdRow = styled(Row)`
  display: flex !important;
  flex-direction: row;
  justify-content: center;
  margin-top: 66px;
  align-self: center;
  text-align: center;
  opacity: 0.8;
  padding: 5px 10px;
  color: white;
  align-items: center !important;
  position: fixed !important;
  background-color: #e60000;
  border-radius: 5px;
  z-index: 1000;
  @media (max-width: 768px) {
    min-width: 100%;
  }
  @media (min-width: 768px) {
    min-width: 50%;
  }

  @media (min-width: 1100px) {
    min-width: 25%;
  }
`;

const TitleSpan = styled.span`
  margin-right: 5px;
  margin-left: 10px;
`;

const TitleTime = styled.span`
  font-size: 15px;
`;

class SessionCountdown extends Component<IProps & InjectedIntlProps, IState> {
  private intervalId;
  private setTime;
  constructor(props) {
    super(props);
    this.setTime = moment.duration(props.closestSession.sessionTimeDiff);
    this.state = {
      countDown: 0,
      openJitsi: false
    };
  }

  componentDidMount() {
    this.setCountDown();
    this.intervalId = setInterval(this.setCountDown, 1000);
  }

  componentWillReceiveProps = nextProps => {
    if (this.props.closestSession.sessionTimeDiff !== nextProps.closestSession.sessionTimeDiff) {
      this.setTime = moment.duration(nextProps.closestSession.sessionTimeDiff);
    }
  };

  setCountDown = async () => {
    const {
      sessionDate,
      sessionDuration,
      _id,
      status,
      counselorId,
      clientId
    } = this.props.closestSession;

    const endTime = moment(sessionDate)
      .add(sessionDuration + 30, "minutes")
      .local()
      .valueOf();

    this.setTime = this.setTime.add(-1, "seconds");

    this.setState({
      countDown: {
        days: this.setTime.days(),
        hours: this.setTime.hours(),
        minutes: this.setTime.minutes(),
        seconds: this.setTime.seconds()
      }
    });
    if (status === "pending") {
      if (this.setTime <= 1800000 && !this.props.jitsi.openJitsi) {
        this.props.setJitsi({
          roomName: _id,
          expiryTime: endTime,
          openJitsi: true,
          counselorId,
          clientId,
          openMeeting: false
        });
      } else if (this.setTime <= 0) {
        await this.props.setSessionStatus({ sessionId: _id, status: "live" });
        await this.props.getClosestSession({
          userId: this.props.user._id,
          role: this.props.user.roles[0]
        });
        await this.props.setJitsi({
          roomName: _id,
          expiryTime: endTime,
          openJitsi: true,
          counselorId,
          clientId,
          openMeeting: true
        });
      }
    } else if (status === "live") {
      if (this.setTime <= 0) {
        await this.props.setSessionStatus({ sessionId: _id, status: "completed" });
        await this.props.getClosestSession({
          userId: this.props.user._id,
          role: this.props.user.roles[0]
        });
        this.props.resetJitsi();
      } else if (!this.props.jitsi.openJitsi) {
        await this.props.setJitsi({
          roomName: _id,
          expiryTime: endTime,
          openJitsi: true,
          counselorId,
          clientId,
          openMeeting: true
        });
      }
    }
  };

  navigateDetail = async () => {
    const { _id } = this.props.closestSession;
    const { roles } = this.props.user;
    if (_.includes(roles, "client")) history.push(`/sessionDetail/${_id}`);
    if (_.includes(roles, "counselor")) history.push(`/counselor/sessionDetail/${_id}`);
  };

  componentWillUnmount = () => {
    clearInterval(this.intervalId);
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { countDown } = this.state;
    const { openJitsi, openMeeting } = this.props.jitsi;
    return (
      <React.Fragment>
        {openJitsi && this.setTime.valueOf() >= 0 && (
          <CdRow>
            <Col style={{ margin: "5px 10px" }}>
              <CdButton
                onClick={() =>
                  window.open(
                    window.location.origin + "/jitsi",
                    "",
                    "width=600,height=400,location=0,directories=0,menubar=0,toolbar=1,status=0,scrollbars=1,resizable=1,top=5,left=5"
                  )
                }
              >
                Seans'a Git
              </CdButton>
            </Col>
            {openMeeting && (
              <Col>
                <TitleSpan>Seansın bitmesine kalan süre: </TitleSpan>
                <TitleTime>
                  {countDown.hours} : {countDown.minutes} : {countDown.seconds}
                </TitleTime>
              </Col>
            )}
            {!openMeeting && (
              <Col>
                <TitleSpan>Seansın başlamasına kalan süre: </TitleSpan>
                <TitleTime>
                  {countDown.hours} : {countDown.minutes} : {countDown.seconds}
                </TitleTime>
              </Col>
            )}
          </CdRow>
        )}
        {!openJitsi && this.setTime.valueOf() >= 0 && (
          <CdRow>
            <Col onClick={this.navigateDetail} style={{ marginRight: 15, cursor: "pointer" }}>
              {formatMessage({ id: "SESSION_COUNTDOWN_TEXT" })}
            </Col>
            <Col>
              <Row type="flex" justify="space-between" style={{ flexDirection: "row" }}>
                <Col>
                  <TitleSpan>{formatMessage({ id: "DAYS" })}</TitleSpan>
                  <TitleTime>{countDown.days}</TitleTime>
                </Col>
                <Col>
                  <TitleSpan>{formatMessage({ id: "HOURS" })}</TitleSpan>
                  <TitleTime>{countDown.hours}</TitleTime>
                </Col>
                <Col>
                  <TitleSpan>{formatMessage({ id: "MINUTES" })}</TitleSpan>
                  <TitleTime> {countDown.minutes}</TitleTime>
                </Col>
                <Col>
                  <TitleSpan>{formatMessage({ id: "SECONDS" })}</TitleSpan>
                  <TitleTime>{countDown.seconds}</TitleTime>
                </Col>
              </Row>
            </Col>
          </CdRow>
        )}
      </React.Fragment>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user,
    closestSession: state.closestSession,
    jitsi: state.jitsi
  };
};

const dispatchToProps = dispatch => {
  return {
    setSessionStatus: params => dispatch(sessionActions.setSessionStatus(params)),
    setJitsi: params => dispatch(jitsiActions.setJitsi(params)),
    resetJitsi: () => dispatch(jitsiActions.resetJitsi()),
    getClosestSession: params => dispatch(sessionActions.getClosestSession(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(SessionCountdown));
