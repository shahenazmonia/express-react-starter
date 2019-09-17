import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import moment from "moment";
import _ from "lodash";

import * as sessionActions from "../../../../store/actions/sessionActions";
import MessageList from "./MessageList";
import NewMessage from "./NewMessage";

import { Row, Col, message, Button } from "antd";

interface IProps {
  user: any;
  newSessionMessage: (params: any) => any;
  getSessionMessages: (params: any) => any;
  blockSessionMessages: (params: any) => any;
  updateSession?: (sessionDetail: any) => any;
  sessionDetail: any;
}
interface IState {
  messageList: Array<object>;
}

class SessionMessages extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { messageList: [] };
  }

  componentDidMount() {
    const { sessionDetail } = this.props;
    this.fetchMessages((sessionDetail || {})._id);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.sessionDetail !== this.props.sessionDetail) {
      this.fetchMessages(nextProps.sessionDetail._id);
    }
  }

  newSessionMessage = async (message, file) => {
    const { user, sessionDetail, newSessionMessage } = this.props;
    try {
      let params = {
        sessionId: sessionDetail._id,
        senderId: user._id,
        message,
        file
      };
      await newSessionMessage(params);
      await this.fetchMessages(sessionDetail._id);
    } catch (err) {
      // console.log(err);
    }
  };

  deleteSessionMessage = async messageInfo => {
    try {
      // console.log(messageInfo);
    } catch (err) {
      // console.log(err);
    }
  };

  fetchMessages = async sessionId => {
    try {
      const { sessionDetail } = this.props;
      const messageList = (await this.props.getSessionMessages({ sessionId })).action.payload.data;
      this.setState({ messageList });
    } catch (err) {
      // console.log(err);
    }
  };

  blockMessages = async () => {
    const { sessionDetail, updateSession } = this.props;
    try {
      const newSession: any = (await this.props.blockSessionMessages(sessionDetail._id)).action
        .payload.data.session;
      updateSession && updateSession(newSession);
    } catch (err) {
      // console.log(err);
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const {
      user,
      user: { roles },
      sessionDetail
    } = this.props;
    const { messageList } = this.state;
    const isCounselor = roles.includes("counselor");
    const isClient = roles.includes("client");
    return (
      <React.Fragment>
        <Row type="flex" justify="space-between">
          {isCounselor && !_.isEmpty(messageList) && (
            <Button
              disabled={sessionDetail.allowMessages === false}
              type="primary"
              onClick={this.blockMessages}
            >
              {formatMessage({
                id: sessionDetail.allowMessages === false ? "MESSAGES_BLOCKED" : "BLOCK_MESSAGES"
              })}
            </Button>
          )}
          {isClient && sessionDetail.allowMessages === false && (
            <h3>{formatMessage({ id: "MESSAGES_BLOCKED" })}</h3>
          )}
        </Row>
        <Row>
          {!_.isEmpty(messageList) ? (
            <Col>
              <MessageList
                user={user}
                messageList={messageList}
                clientInfo={sessionDetail.clientInfo}
                counselorInfo={sessionDetail.counselorInfo}
                deleteSessionMessage={this.deleteSessionMessage}
              />
            </Col>
          ) : (
            <Col>
              <p>{formatMessage({ id: "NO_SESSION_MESSAGES" })}</p>
            </Col>
          )}
          {sessionDetail.allowMessages !== false &&
            moment(sessionDetail.sessionDate)
              .add(7, "d")
              .isAfter(moment()) && (
              <Col style={{ marginTop: 5 }}>
                <NewMessage
                  sessionId={sessionDetail._id}
                  user={user}
                  newSessionMessage={this.newSessionMessage}
                />
              </Col>
            )}
        </Row>
      </React.Fragment>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user
  };
};

const dispatchToProps = dispatch => {
  return {
    newSessionMessage: params => dispatch(sessionActions.newSessionMessage(params)),
    getSessionMessages: params => dispatch(sessionActions.getSessionMessages(params)),
    blockSessionMessages: params => dispatch(sessionActions.blockSessionMessages(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(SessionMessages));
