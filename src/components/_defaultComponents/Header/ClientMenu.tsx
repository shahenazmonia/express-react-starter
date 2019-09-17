import React, { Component } from "react";
import { Menu, Button, Dropdown, Col, Row, Icon, Badge, Popover } from "antd";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import moment from "moment";
import history from "../../../_core/history";
import { MenuProps, MenuState } from "./MenuInterfaces";
import { HeaderMenu, MenuButton, MenuPopover } from "./styledHeader";
import LanguageSelectBox from "../SelectBoxes/LanguageSelectBox";
import * as localeActions from "../../../store/actions/localeActions";
import * as userActions from "../../../store/actions/userActions";
import webseans from "../../../logo.svg";
import NotificationBox from "../Notification/NotificationBox";
import * as notificationActions from "../../../store/actions/notificationActions";
import * as jitsiActions from "../../../store/actions/jitsiActions";
import * as sessionActions from "../../../store/actions/sessionActions";
import Routes from "./routes";
import Logo from "./Logo";
import SideMenu from "./SideHeader";
const SubMenu = Menu.SubMenu;

interface IProps {
  resetJitsi: () => void;
  getMyNotifications: (params: any) => any;
  resetClosestSession: () => void;
  getClosestSession: (params: { userId: string; role: string }) => any;
  readNotification: (params: { userId: string; notificationId: string; readAt: string }) => any;
  myNotifications: any;
  inDefaultMainView: boolean;
}

interface IState {}

class ClientMenu extends Component<
  IProps & MenuProps & InjectedIntlProps & { language: string; setLocale: any },
  MenuState & IState
> {
  private intervalId;
  constructor(props) {
    super(props);
    this.getNotifications();
    this.intervalId = setInterval(this.getNotifications, 30000);
  }

  componentDidMount = async () => {
    const { _id } = this.props.user;
    await this.props.getClosestSession({
      userId: _id,
      role: "client"
    });
  };

  getNotifications = async () => {
    const { _id } = this.props.user;
    try {
      await this.props.getMyNotifications({ userId: _id });
    } catch (err) {
      // console.log(err);
    }
  };

  readNotification = async ({ notificationId }) => {
    const readAt = moment.utc().format();
    console.log(this.props);

    const { _id } = this.props.user;
    try {
      await this.props.readNotification({ userId: _id, notificationId, readAt });
      await this.props.getMyNotifications({ userId: _id });
    } catch (err) {
      //console.log(err);
    }
  };

  componentWillUnmount() {
    this.props.resetClosestSession();
    this.props.resetJitsi();
    clearInterval(this.intervalId);
  }

  onLanguageChange(lang) {
    this.props.setLocale(lang);
  }

  menuMeSpecial = (subRoutes, fromSideMenu = undefined, onSideMenuClose = () => {}) => {
    const { formatMessage } = this.props.intl;
    const {
      location: { pathname }
    } = history;
    const items = () =>
      subRoutes.map(({ route, label, key }) => (
        <Menu.Item
          onClick={() => {
            onSideMenuClose();
            route && history.push(route);
          }}
          key={key}
        >
          {formatMessage({ id: label })}
        </Menu.Item>
      ));
    if (fromSideMenu) {
      return (
        <Menu onClick={() => {}} mode="inline">
          <SubMenu
            key="1"
            title={
              <span style={{ position: "absolute", left: 0 }}>
                {formatMessage({ id: "ME_SPECIAL" })}
              </span>
            }
          >
            {items()}
          </SubMenu>
        </Menu>
      );
    }
    return <Menu selectedKeys={[pathname]}>{items()}</Menu>;
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { user, handleClick, navPressed, current, language } = this.props;
    const { myNotifications, inDefaultMainView } = this.props;
    const {
      location: { pathname }
    } = history;
    const transparentHeader = inDefaultMainView && current === "/";
    return (
      <Row>
        <SideMenu
          changeLangauge={this.onLanguageChange.bind(this)}
          routes={Routes.ClientRoutes}
          formatMessage={formatMessage}
          language={language}
          specialMenu={this.menuMeSpecial}
          inDefaultMainView={false}
          readNotification={this.readNotification}
        />
        <HeaderMenu className="desktop-header">
          <Col span={1} />
          <Logo
            navPressed={() => {
              navPressed("/");
            }}
          />
          <Col span={15}>
            <Row type="flex" justify="end">
              {Routes.ClientRoutes.map(({ route, subRoutes, label }) =>
                subRoutes ? (
                  <Dropdown overlay={() => this.menuMeSpecial(subRoutes)} trigger={["hover"]}>
                    <MenuButton
                      inDefaultMainView={transparentHeader}
                      selected={pathname === route}
                      type="primary"
                    >
                      {formatMessage({ id: label })}
                    </MenuButton>
                  </Dropdown>
                ) : (
                  <MenuButton
                    inDefaultMainView={transparentHeader}
                    key={label}
                    selected={pathname === route}
                    onClick={() => route && history.push(route)}
                  >
                    {formatMessage({ id: label })}
                  </MenuButton>
                )
              )}
            </Row>
          </Col>
          <Col span={4}>
            <Row type="flex" justify="space-around" style={{ width: "100%" }}>
              <MenuPopover
                content={
                  <NotificationBox
                    myNotifications={myNotifications}
                    readNotification={this.readNotification}
                  />
                }
                trigger={"click"}
              >
                {myNotifications && (
                  <Badge count={myNotifications.unReadNumber}>
                    <Icon type="bell" style={{ fontSize: 25 }} />
                  </Badge>
                )}
                {!myNotifications && <Icon type="bell" style={{ fontSize: 25 }} />}
              </MenuPopover>
              <Button
                type="primary"
                onClick={() => {
                  this.props.logout();
                  history.push("/");
                }}
              >
                {formatMessage({ id: "LOGOUT" })}
              </Button>
              <LanguageSelectBox
                defaultValue={language}
                onLanguageChange={this.onLanguageChange.bind(this)}
              />
            </Row>
          </Col>
        </HeaderMenu>
      </Row>
    );
  }
}

const stateToProps = state => {
  return {
    language: state.locale.language,
    myNotifications: state.notification.myNotifications
  };
};

const dispatchToProps = dispatch => {
  return {
    resetJitsi: () => dispatch(jitsiActions.resetJitsi()),
    getClosestSession: params => dispatch(sessionActions.getClosestSession(params)),
    resetClosestSession: () => dispatch(sessionActions.resetClosestSession()),
    setLocale: params => dispatch(localeActions.setLocale(params)),
    logout: () => dispatch(userActions.logout()),
    getMyNotifications: params => dispatch(notificationActions.getMyNotifications(params)),
    readNotification: params => dispatch(notificationActions.readNotification(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(ClientMenu));
