import React, { Component } from "react";
import { Menu, Button, Dropdown, Icon, Col, Badge, Row, Popover } from "antd";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import moment from "moment";
import history from "../../../_core/history";
import { MenuProps, MenuState } from "./MenuInterfaces";
import { HeaderMenu, MenuButton, MenuPopover } from "./styledHeader";
import LanguageSelectBox from "../SelectBoxes/LanguageSelectBox";
import * as localeActions from "../../../store/actions/localeActions";
import * as counselorActions from "../../../store/actions/counselorActions";
import * as userActions from "../../../store/actions/userActions";
import webseans from "../../../logo.svg";
import NotificationBox from "../Notification/NotificationBox";
import * as notificationActions from "../../../store/actions/notificationActions";
import * as sessionActions from "../../../store/actions/sessionActions";
import * as jitsiActions from "../../../store/actions/jitsiActions";
import Routes from "./routes";
import SideMenu from "./SideHeader";
import Logo from "./Logo";
const SubMenu = Menu.SubMenu;
interface IProps {
  user: any;
  resetJitsi: () => void;
  resetClosestSession: () => void;
  getCounselorInfo: (params: any) => any;
  getClosestSession: (params: { userId: string; role: string }) => any;
  getMyNotifications: (params: { userId: string }) => any;
  readNotification: (params: { userId: string; notificationId: string; readAt: string }) => any;
  myNotifications: any;
}

interface IState {
  isPermitedToInvite: boolean;
}

class CounselorMenu extends Component<
  IProps & MenuProps & InjectedIntlProps & { setLocale: any; language: any },
  MenuState & IState
> {
  private intervalId;
  constructor(props) {
    super(props);
    this.getNotifications();
    this.intervalId = setInterval(this.getNotifications, 30000);
    this.state = { isPermitedToInvite: false };
  }

  componentDidMount = async () => {
    const { _id } = this.props.user;
    await this.props.getClosestSession({
      userId: _id,
      role: "counselor"
    });
    const counselorInfo = (await this.props.getCounselorInfo({ counselorId: _id })).action.payload
      .data;
    this.setState({
      isPermitedToInvite:
        (counselorInfo.subscription && counselorInfo.subscription.isPermitedToInvite) || false
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
    const { isPermitedToInvite } = this.state;
    const {
      location: { pathname }
    } = history;
    // key === "/counselor/invitation" &&
    //           !subscription &&
    //           !subscription.isPermitedToInvite
    const items = () =>
      subRoutes.map(({ route, label, key }) => {
        return (
          <Menu.Item
            style={{ padding: 10, cursor: "pointer" }}
            onClick={() => route && history.push(route)}
            key={key}
          >
            {formatMessage({ id: label })}
          </Menu.Item>
        );
      });
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
            {isPermitedToInvite && (
              <Menu.Item
                style={{ padding: 10, cursor: "pointer" }}
                onClick={() => history.push("/counselor/invitation")}
                key={"/counselor/invitation"}
              >
                {formatMessage({ id: "INVITATION" })}
              </Menu.Item>
            )}
          </SubMenu>
        </Menu>
      );
    }
    return (
      <Menu selectedKeys={[pathname]}>
        {items()}
        {isPermitedToInvite && (
          <Menu.Item
            style={{ padding: 10, cursor: "pointer" }}
            onClick={() => history.push("/counselor/invitation")}
            key={"/counselor/invitation"}
          >
            {formatMessage({ id: "INVITATION" })}
          </Menu.Item>
        )}
      </Menu>
    );
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { user, handleClick, navPressed, current, language } = this.props;
    const { myNotifications } = this.props;
    const {
      location: { pathname }
    } = history;
    return (
      <Row>
        <SideMenu
          changeLangauge={this.onLanguageChange.bind(this)}
          routes={Routes.CounselorRoutes}
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
              {Routes.CounselorRoutes.map(({ route, subRoutes, label }) =>
                subRoutes ? (
                  <Dropdown
                    key={label}
                    overlay={() => this.menuMeSpecial(subRoutes)}
                    trigger={["hover"]}
                  >
                    <MenuButton selected={pathname === route} type="primary">
                      {formatMessage({ id: label })}
                    </MenuButton>
                  </Dropdown>
                ) : (
                  <MenuButton
                    key={label}
                    selected={pathname === route}
                    onClick={() => {
                      if (route) history.push(route);
                    }}
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
                placement={"bottom"}
              >
                {myNotifications && (
                  <Badge
                    count={myNotifications.unReadNumber}
                    style={{
                      fontSize: 20
                    }}
                  >
                    <Icon
                      type="bell"
                      style={{
                        fontSize: 25
                      }}
                    />
                  </Badge>
                )}
                {!myNotifications && (
                  <Icon
                    type="bell"
                    style={{
                      fontSize: 25
                    }}
                  />
                )}
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
    getCounselorInfo: params => dispatch(counselorActions.getCounselorInfo(params)),
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
)(injectIntl(CounselorMenu));

/*

 <React.Fragment>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navPressed("/counselor");
          }}
        >
          <img style={{ position: "absolute", left: 10, height: 64, width: 150 }} src={trp} />
        </div>
        <Menu mode="horizontal" onClick={handleClick} selectedKeys={[current]}>
          <Menu.SubMenu title={<span>{formatMessage({ id: "SERVICES" })}</span>}>
            <Menu.Item key="onlineTherapy">{formatMessage({ id: "ONLINETHERAPY" })}</Menu.Item>
            <Menu.Item key="lifeCoach">{formatMessage({ id: "LIFECOACH" })}</Menu.Item>
            <Menu.Item key="dietician">{formatMessage({ id: "DIETICIAN" })}</Menu.Item>
          </Menu.SubMenu>

          <Menu.Item key="/counselor/blog">
            <a onClick={() => navPressed("/counselor/blog")}>{formatMessage({ id: "BLOG" })}</a>
          </Menu.Item>

          <Menu.Item key="/counselor/sessions">
            <a onClick={() => navPressed("/counselor/sessions")}>
              {formatMessage({ id: "SESSIONS" })}
            </a>
          </Menu.Item>

          <Menu.Item key="/counselor/messages">
            <a onClick={() => navPressed("/counselor/messages")}>
              {formatMessage({ id: "MY_MESSAGES" })}
            </a>
          </Menu.Item>

          <Menu.SubMenu title={<span>{formatMessage({ id: "ME_SPECIAL" })}</span>}>
            <Menu.Item key="account">
              <a onClick={() => navPressed("/counselor/account")}>
                {formatMessage({ id: "MY_ACCOUNT" })}
              </a>
            </Menu.Item>
            <Menu.Item key="profile">
              <a onClick={() => navPressed("/counselor/profile")}>
                {formatMessage({ id: "MY_PROFILE" })}
              </a>
            </Menu.Item>
            <Menu.Item key="calendarPlan">
              <a onClick={() => navPressed("/counselor/calendarPlan")}>
                {formatMessage({ id: "MY_CALENDAR_PLAN" })}
              </a>
            </Menu.Item>
            <Menu.Item key="balance">{formatMessage({ id: "MY_BALANCE" })}</Menu.Item>
          </Menu.SubMenu>

          <Menu.Item>
            <Button
              type="primary"
              ghost
              onClick={() => {
                this.props.logout();
                history.push("/");
              }}
            >
              {formatMessage({ id: "LOGOUT" })}
            </Button>
          </Menu.Item>

          <Menu.Item>
            <LanguageSelectBox
              defaultValue={language}
              onLanguageChange={this.onLanguageChange.bind(this)}
            />
          </Menu.Item>
        </Menu>
      </React.Fragment>

*/
