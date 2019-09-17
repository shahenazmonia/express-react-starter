import React, { Component } from "react";
import moment from "moment";
import styled from 'styled-components'
import _ from "lodash";

import { InjectedIntlProps, injectIntl } from "react-intl";
import { Avatar, Row, Col, Card, Icon, Comment, Tooltip, message } from "antd";
import config from "../../../../_core/config";

const Wrapper = styled.div`    max-width: 100%;
border-bottom-left-radius: 30px;
border-top-left-radius: 30px;
border-top-right-radius: 30px;
padding-right: 5px;
margin-bottom: 5px;`
interface IProps {
  user: any;
  messageList: any;
  clientInfo: any;
  counselorInfo: any;
  deleteSessionMessage: (messageInfo: any) => any;
}

class MessageList extends Component<IProps & InjectedIntlProps> {
  messageEl: any = React.createRef();
  checkIsMe(senderId) {
    const { user } = this.props;
    return senderId === user._id ? true : false;
  }

  componentDidMount() {
    this.scrollToBottom();
  }
  componentDidUpdate() {
    this.scrollToBottom();
  }
  scrollToBottom = () => {
    this.messageEl.scrollTo(0, this.messageEl.scrollHeight);
  };

  render() {
    const { messageList, user, clientInfo, counselorInfo } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Card>
        <Wrapper
          ref={messageEl => {
            this.messageEl = messageEl;
          }}
          style={{ height: 550, overflowY: "scroll" }}
        >
          {messageList &&
            messageList.map(messageInfo => {
              const isMe = this.checkIsMe(messageInfo.senderId);
              return (
                <Row style={{ marginTop: 5 }} type="flex" justify={isMe ? "end" : "start"}>
                  <Col
                    style={{ display: "flex", justifyContent: isMe ? "flex-end" : "flex-start" }}
                    span={18}
                  >
                    <Comment
                    className=""
                      style={{
                        backgroundColor: isMe ? "#49A398" : "#f5f5f5",
                        borderRadius: 5,
                        maxWidth: "100%",
                        paddingRight: 5,
                        
                      }}
                      content={
                        <div>
                          <p style={{ color: isMe ? "#F2F2F2" : "grey" }}>{messageInfo.message}</p>
                          {messageInfo.file && (
                            <>
                              <a
                                target="_blank"
                                rel="noopener noreferrer"
                                href={
                                  config.getBasePublicUrl() + "api/getFile/" + messageInfo.file._id
                                }
                                style={{
                                  textDecoration: "underline",
                                  color: isMe ? "#F2F2F2" : "grey"
                                }}
                              >
                                {messageInfo.file.filename}
                              </a>
                              <Icon type="file" />
                            </>
                          )}
                          <div
                            style={{ display: "flex", justifyContent: "flex-end", width: "100%" }}
                          >
                            <span
                              style={{
                                marginRight: 15,
                                color: isMe ? "#f2f2f2" : "#c9c9c9",
                                opacity: 0.8
                              }}
                            >
                              {isMe
                                ? formatMessage({ id: "ME" })
                                : _.includes(user.roles, "counselor")
                                ? `${formatMessage({ id: "CLIENT_UNIQ_ID" })} : ${
                                    clientInfo.uniqClientId
                                  }`
                                : `${counselorInfo.fullname}`}
                            </span>
                            <span
                              style={
                                isMe
                                  ? { color: "#f2f2f2", opacity: 0.5 }
                                  : { color: "#c9c9c9", opacity: 0.8 }
                              }
                            >
                              {moment(messageInfo.sentAt).format("DD-MM-YYYY HH:mm")}
                            </span>
                          </div>
                        </div>
                      }
                    />
                    {
                      // <Icon type="close" onClick={() => this.props.deleteSessionMessage(messageInfo)} />
                    }
                  </Col>
                </Row>
              );
            })}
        </Wrapper>
      </Card>
    );
  }
}

export default injectIntl(MessageList);
