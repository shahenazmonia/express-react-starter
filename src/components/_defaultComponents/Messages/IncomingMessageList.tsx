import React, { Component } from "react";
import { Card, Row, Col } from "antd";
import { connect } from "react-redux";
import moment from "moment";
import { injectIntl, InjectedIntlProps } from "react-intl";
import _ from "lodash";
interface IProps {
  myNotifications: any;
  openNotification: (params: {
    notificationHeader: string;
    content: string;
    notificationId: string;
    isRead: boolean;
  }) => any;
}

class IncomingMessageList extends Component<IProps & InjectedIntlProps> {
  constructor(props) {
    super(props);
  }
  handleDelete = param => {};

  handleEdit = param => {};

  openNotification = ({ notificationHeader, content, notificationId, isRead }) => {
    this.props.openNotification({ notificationHeader, content, notificationId, isRead });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { myNotifications } = this.props;
    return (
      <Row style={{ height: 300, overflowY: "scroll" }}>
        {myNotifications.length !== 0 &&
          myNotifications.data.map(item => {
            return (
              <React.Fragment>
                {item.readAt && (
                  <Card
                    bodyStyle={{
                      padding: 10,
                      backgroundColor: "rgb(206, 230, 236)",
                      cursor: "pointer"
                    }}
                    onClick={() =>
                      this.openNotification({
                        notificationHeader: item.notificationHeader,
                        content: item.notificationContent,
                        notificationId: item._id,
                        isRead: false
                      })
                    }
                  >
                    <Col span={8}>
                      {formatMessage({ id: "FROM_USER_MESSAGE" }) + " : " + item.fromUser.name}
                    </Col>
                    <Col
                      span={24}
                      style={{
                        height: 20,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {item.notificationHeader}
                    </Col>
                    <Col style={{ position: "absolute", right: 5, top: 5 }}>
                      {moment(item.sendAt)
                        .local()
                        .format("HH:mm:ss DD/MM/YYYY")}
                    </Col>
                  </Card>
                )}
                {!item.readAt && (
                  <Card
                    bodyStyle={{
                      padding: 10,
                      backgroundColor: "rgb(206, 230, 236)",
                      cursor: "pointer"
                    }}
                    onClick={() =>
                      this.openNotification({
                        notificationHeader: item.notificationHeader,
                        content: item.notificationContent,
                        notificationId: item._id,
                        isRead: true
                      })
                    }
                  >
                    <Col span={8}>
                      {formatMessage({ id: "FROM_USER_MESSAGE" }) + " : " + item.fromUser.name}
                    </Col>
                    <Col
                      span={24}
                      style={{
                        height: 20,
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap"
                      }}
                    >
                      {item.notificationHeader}
                    </Col>
                    <Col style={{ position: "absolute", right: 5, top: 5 }}>
                      {moment(item.sendAt)
                        .local()
                        .format("HH:mm:ss DD/MM/YYYY")}
                    </Col>
                  </Card>
                )}
              </React.Fragment>
            );
          })}
      </Row>
    );
  }
}

const stateToProps = state => {
  return {
    myNotifications: state.notification.myNotifications
  };
};

export default connect(
  stateToProps,
  null
)(injectIntl(IncomingMessageList));
