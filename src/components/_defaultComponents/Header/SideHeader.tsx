import { Drawer, Icon, Col, Button, Row, Badge, Dropdown } from "antd";
import React, { Component } from "react";
import LanguageSelectBox from "../SelectBoxes/LanguageSelectBox";
import history from "../../../_core/history";
import { connect } from "react-redux";
import * as notificationActions from "../../../store/actions/notificationActions";
import * as userActions from "../../../store/actions/userActions";
import NotificationBox from "../Notification/NotificationBox";

interface IProps {
  formatMessage: (params: any) => any;
  language: any;
  changeLangauge: (params: any) => any;
  inDefaultMainView?: boolean;
  myNotifications?: any;
  user: any;
  routes: any;
  specialMenu?: (subRoutes: any, label: any, onClose: any) => any;
  readNotification?: ({ notificationId: string }) => void;
  logout: () => any;
}
interface IState {
  visible: boolean;
}

class SideMenu extends Component<IProps, IState> {
  state = { visible: false };

  showDrawer = () => {
    this.setState({
      visible: true
    });
  };

  onClose = () => {
    this.setState({
      visible: false
    });
  };

  static defaultProps = {
    specialMenu: () => {}
  };

  render() {
    const margin = { marginTop: "10px", marginBottom: "10px" };
    const {
      formatMessage,
      language,
      changeLangauge,
      inDefaultMainView,
      myNotifications,
      user,
      specialMenu,
      readNotification
    } = this.props;
    return (
      <div className="side-menu" style={{ display: "none" }}>
        <Icon
          type="bars"
          onClick={this.showDrawer}
          style={{
            color: inDefaultMainView ? "white" : "green",
            position: "absolute",
            right: 10,
            top: 15,
            fontSize: "30px"
          }}
        />
        <Drawer
          title="Menu"
          placement="right"
          closable={false}
          onClose={this.onClose}
          visible={this.state.visible}
        >
          <Col span={24}>
            {!inDefaultMainView && readNotification && (
              <NotificationBox
                myNotifications={myNotifications}
                readNotification={readNotification}
                fromSideMenu={true}
                onDrawerClose={this.onClose}
              />
            )}

            {this.props.routes.map(({ route, label, subRoutes }) =>
              subRoutes ? (
                specialMenu && specialMenu(subRoutes, label, this.onClose)
              ) : (
                <Row>
                  <a href={route}>{formatMessage({ id: label })}</a>
                </Row>
              )
            )}
            <Button
              style={margin}
              type="primary"
              size="small"
              onClick={() => {
                if (user.loggedIn) {
                  this.props.logout();
                  history.push("/");
                } else {
                  history.push("/login");
                }
              }}
            >
              {formatMessage({ id: user.loggedIn ? "LOGOUT" : "LOGIN" })}
            </Button>
            <LanguageSelectBox
              style={margin}
              defaultValue={language}
              onLanguageChange={changeLangauge}
            />
          </Col>
        </Drawer>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(userActions.logout()),
  getMyNotifications: params => dispatch(notificationActions.getMyNotifications(params))
});

const mapStateToProps = state => ({
  user: state.user,
  myNotifications: state.notification.myNotifications
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideMenu);
