import React, { Component } from "react";
import { Row, Col, Card, Tabs } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import { injectIntl, InjectedIntlProps } from "react-intl";

import Linkify from "linkifyjs/react";
import * as alertActions from "../../../store/actions/alertActions";
import * as messageActions from "../../../store/actions/messageActions";
import * as notificationActions from "../../../store/actions/notificationActions";
import IncomingMessageList from "./IncomingMessageList";
import SentMessageList from "./SentMessageList";
import MessageUserBox from "./MessageUserBox";
import MessageSendBox from "./MessageSendBox";

type sentMessageType = {
  eventType: string;
  fromUser: { _id: string; userType: string };
  message: string;
  messageHeader: string;
  sendAt: string;
  toUsers: string;
  _id: string;
};

interface IProps {
  showInfo: (params: any) => any;
  sendMessage: (params: any) => any;
  sentMessageList: (params: any) => any;
  getMyNotifications: (params: { userId: string }) => any;
  readNotification: (params: { userId: string; notificationId: string; readAt: string }) => any;
  isShowSendBox: boolean;
  role: string;
  user: any;
}

interface IState {
  toUsers: string | undefined;
  message: string | undefined;
  messageHeader: string | undefined;
  sentMessageData: Array<sentMessageType> | [];
  clearText: boolean;
}

class Messages extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      toUsers: undefined,
      message: undefined,
      messageHeader: undefined,
      sentMessageData: [],
      clearText: false
    };
  }

  componentDidMount = async () => {
    this.fetchSentMessageList();
  };

  fetchSentMessageList = async () => {
    const { role, user } = this.props;
    const fromUser = { _id: user._id, userType: role };
    try {
      if (role === "clinic" || role === "admin") {
        const sentMessageData = (await this.props.sentMessageList({ fromUser })).action.payload
          .data;
        this.setState({ sentMessageData });
      }
    } catch (err) {
      console.log(err);
    }
  };

  openNotification = async ({ notificationHeader, content, notificationId, isRead }) => {
    const readAt = moment.utc().format();
    const { _id } = this.props.user;
    this.props.showInfo({
      title: notificationHeader,
      body: <Linkify>{content}</Linkify>,
      actionFunc: async () => {
        isRead && (await this.props.readNotification({ userId: _id, notificationId, readAt }));
        isRead && (await this.props.getMyNotifications({ userId: _id }));
      }
    });
  };

  openSentMessage = async ({ messageHeader, message }) => {
    this.props.showInfo({
      title: messageHeader,
      body: <Linkify>{message}</Linkify>,
      actionFunc: async () => {}
    });
  };

  selectedToUser = ({ toUsers }) => {
    this.setState({ toUsers });
  };

  onSendMessage = ({ message, messageHeader }) => {
    const { toUsers } = this.state;
    if (!toUsers) {
      this.props.showInfo({
        title: "HATA",
        body: "Lütfen Alıcı Seçiniz!",
        actionFunc: () => {}
      });
    } else this.setState({ message, messageHeader }, () => this.sendMessage());
  };

  sendMessage = async () => {
    const { message, toUsers, messageHeader } = this.state;
    const { user, role } = this.props;
    const sendAt = moment.utc().format();
    const eventType = "message";
    const name =
      (role === "admin" && "Admin") ||
      (role === "clinic" && user.name) ||
      (role === "counselor" && user.fullname) ||
      (role === "client" && user.fullname);
    try {
      await this.props.sendMessage({
        fromUser: { _id: user._id, userType: role, name },
        toUsers,
        message,
        messageHeader,
        sendAt,
        eventType
      });

      this.props.showInfo({
        title: "BAŞARILI",
        body: "Mesaj başarıyla gönderildi!",
        actionFunc: () => {}
      });
      this.setState({ clearText: true });
      this.fetchSentMessageList();
    } catch {}
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { isShowSendBox, role } = this.props;
    const { sentMessageData, clearText } = this.state;
    return (
      <Row type="flex" justify="center">
        <Col span={16}>
          <Card>
            <Row type="flex" justify="center">
              {isShowSendBox && (
                <Col xs={24} md={8}>
                  <h3>{formatMessage({ id: "MESSAGE_RECEIVER" })}</h3>
                  <MessageUserBox selectedToUser={this.selectedToUser} role={role} />
                </Col>
              )}
            </Row>
            {(role === "counselor" || role === "client") && (
              <Row>
                <Col span={24}>
                  <h3>{formatMessage({ id: "NOTIFICATION" })}</h3>
                  <IncomingMessageList openNotification={this.openNotification} />
                </Col>
              </Row>
            )}
            {(role === "clinic" || role === "admin") && (
              <Row>
                <Col span={24}>
                  <Tabs defaultActiveKey="1" type="card">
                    <Tabs.TabPane tab="Gelen Mesajlar" key="1">
                      <Card bordered bodyStyle={{ padding: 5 }}>
                        <IncomingMessageList openNotification={this.openNotification} />
                      </Card>
                    </Tabs.TabPane>
                    <Tabs.TabPane tab="Giden Mesajlar" key="2">
                      <Card bordered bodyStyle={{ padding: 5 }}>
                        <SentMessageList
                          sentMessageData={sentMessageData}
                          openSentMessage={this.openSentMessage}
                        />
                      </Card>
                    </Tabs.TabPane>
                  </Tabs>
                  {isShowSendBox && (
                    <MessageSendBox
                      onSendMessage={this.onSendMessage}
                      clearText={clearText}
                      onClearText={() => this.setState({ clearText: false })}
                    />
                  )}
                </Col>
              </Row>
            )}
          </Card>
        </Col>
      </Row>
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
    showInfo: params => dispatch(alertActions.showInfo(params)),
    sendMessage: params => dispatch(messageActions.sendMessage(params)),
    sentMessageList: params => dispatch(messageActions.sentMessageList(params)),
    readNotification: params => dispatch(notificationActions.readNotification(params)),
    getMyNotifications: params => dispatch(notificationActions.getMyNotifications(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(Messages));
