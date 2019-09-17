import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import moment from "moment";
import { injectIntl, InjectedIntlProps } from "react-intl";
import _ from "lodash";

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
  sentMessageData: Array<sentMessageType>;
  openSentMessage: (params: { messageHeader: string; message: string }) => void;
}

class SentMessageList extends Component<IProps & InjectedIntlProps> {
  constructor(props) {
    super(props);
  }
  handleDelete = param => {};

  handleEdit = param => {};

  openContent = ({ messageHeader, message }) => {
    this.props.openSentMessage({ messageHeader, message });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { sentMessageData } = this.props;
    return (
      <Row style={{ height: 300, overflowY: "scroll" }}>
        {sentMessageData.length !== 0 &&
          sentMessageData.map(item => {
            return (
              <Card
                style={{
                  marginBottom: 10,
                  position: "relative",
                  cursor: "pointer",
                  borderRadius: 5
                }}
                onClick={() =>
                  this.openContent({ messageHeader: item.messageHeader, message: item.message })
                }
              >
                {item.toUsers === "admin" && (
                  <Col span={8}>
                    {formatMessage({ id: "TO_USER_MESSAGE" }) +
                      " : " +
                      formatMessage({ id: "ADMIN" })}
                  </Col>
                )}
                {item.toUsers === "clinics" && (
                  <Col span={8}>
                    {formatMessage({ id: "TO_USER_MESSAGE" }) +
                      " : " +
                      formatMessage({ id: "CLINICS" })}
                  </Col>
                )}
                {item.toUsers === "counselors" && (
                  <Col span={8}>
                    {formatMessage({ id: "TO_USER_MESSAGE" }) +
                      " : " +
                      formatMessage({ id: "COUNSELORS" })}
                  </Col>
                )}

                {item.toUsers === "clients" && (
                  <Col span={8}>
                    {formatMessage({ id: "TO_USER_MESSAGE" }) +
                      " : " +
                      formatMessage({ id: "CLIENTS" })}
                  </Col>
                )}

                <Col
                  span={16}
                  style={{
                    height: 20,
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                  }}
                >
                  {item.messageHeader}
                </Col>
                <Col style={{ position: "absolute", right: 10, top: 10 }}>
                  {moment(item.sendAt)
                    .local()
                    .format("HH:mm:ss DD/MM/YYYY")}
                </Col>
              </Card>
            );
          })}
      </Row>
    );
  }
}

export default injectIntl(SentMessageList);
