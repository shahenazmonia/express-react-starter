import React, { Component } from "react";
import { Row, Col, Menu, Icon, Badge } from "antd";
import { injectIntl, InjectedIntlProps } from "react-intl";
import history from "../../../_core/history";
import Linkify from "linkifyjs/react";
import { connect } from "react-redux";
import moment from "moment";
import {
  Content,
  NotificationHeader,
  NotificationTime,
  NotificationFooter
} from "./styledNotifications";
import * as alertActions from "../../../store/actions/alertActions";
const SubMenu = Menu.SubMenu;

interface IProps {
  myNotifications?: any;
  user: any;
  readNotification: ({ notificationId: string }) => void;
  showInfo: (params: any) => any;
  fromSideMenu?: boolean;
  onDrawerClose?: () => any;
}

interface IState {}

class NotificationBox extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  static defaultProps = {
    onDrawerClose: () => {}
  };
  readNotification = ({ notificationId }) => {
    this.props.readNotification({ notificationId });
  };

  openContent = ({ notificationHeader, content, notificationId }) => {
    this.props.showInfo({
      title: notificationHeader,
      body: <Linkify>{content}</Linkify>,
      actionFunc: () => {
        this.readNotification({ notificationId });
      }
    });
  };

  onNavigate = () => {
    const { user } = this.props;
    if (user.roles[0] === "admin") history.push("/admin/messages");
    else if (user.roles[0] === "clinic") history.push("/clinic/messages");
    else if (user.roles[0] === "counselor") history.push("/counselor/messages");
    else history.push("/messages");
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { myNotifications, fromSideMenu, onDrawerClose } = this.props;
    if (fromSideMenu) {
      return (
        <Menu
          onClick={() => {}}
          defaultSelectedKeys={["1"]}
          defaultOpenKeys={["sub1"]}
          mode="inline"
        >
          <SubMenu
            key="sub4"
            title={
              <span style={{ position: "absolute", left: 0 }}>
                <Icon type="bell" style={{ fontSize: 25 }} />
                <span
                  style={{
                    position: "absolute",
                    left: "15px",
                    top: "-11px"
                  }}
                >
                  <Badge count={myNotifications.unReadNumber} />
                </span>
              </span>
            }
          >
            {myNotifications &&
              myNotifications.data.map(item => {
                return (
                  <Menu.Item
                    key="9"
                    onClick={() => {
                      if (onDrawerClose) {
                        onDrawerClose();
                      }

                      this.openContent({
                        notificationHeader: item.notificationHeader,
                        content: item.notificationContent,
                        notificationId: item._id
                      });
                    }}
                  >
                    <Content style={{ position: "absolute", left: 5 }}>
                      {item.notificationHeader}
                    </Content>
                  </Menu.Item>
                );
              })}
          </SubMenu>
        </Menu>
      );
    }
    return (
      <div style={{ margin: "-10px 0px" }}>
        <NotificationHeader>{formatMessage({ id: "NOTIFICATIONS" })}</NotificationHeader>
        <div
          style={{
            height: 1,
            width: "100%",
            backgroundColor: "#f1f1f1"
          }}
        />
        <Row
          type="flex"
          justify="center"
          style={{ width: 300, maxHeight: 280, overflowY: "scroll", whiteScace: "nowrap" }}
        >
          {myNotifications &&
            myNotifications.data.map(item => {
              return (
                <React.Fragment>
                  {!item.readAt && (
                    <Col span={24} style={{ marginBottom: 5 }}>
                      <div
                        style={{
                          backgroundColor: "#8eca8d66",
                          cursor: "pointer",
                          padding: 5,
                          borderRadius: 5,
                          marginTop: 5
                        }}
                        onClick={() =>
                          this.openContent({
                            notificationHeader: item.notificationHeader,
                            content: item.notificationContent,
                            notificationId: item._id
                          })
                        }
                      >
                        <Content>{item.notificationHeader}</Content>
                        <NotificationTime>
                          {moment(item.sendAt).format("HH:mm:ss DD/MM/YYYY")}
                        </NotificationTime>
                      </div>
                    </Col>
                  )}
                </React.Fragment>
              );
            })}
          <Col span={24} style={{ marginBottom: 5 }}>
            {myNotifications && myNotifications.unReadNumber === 0 && <div>Bildirim yok :)</div>}
          </Col>
        </Row>
        <NotificationFooter onClick={this.onNavigate}>
          {formatMessage({ id: "NOTIFICATIONS_ALL" })}
        </NotificationFooter>
      </div>
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
    showInfo: params => dispatch(alertActions.showInfo(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(NotificationBox));
