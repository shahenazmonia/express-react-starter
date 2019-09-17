import React, { Component } from "react";
import { Menu, Button, Icon, Dropdown, Badge, Row, Col } from "antd";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import moment from "moment";
import history from "../../../_core/history";
import { MenuProps, MenuState } from "./MenuInterfaces";
import { MenuButton, HeaderMenu, MenuPopover } from "./styledHeader";
import LanguageSelectBox from "../SelectBoxes/LanguageSelectBox";
import * as localeActions from "../../../store/actions/localeActions";
import * as userActions from "../../../store/actions/userActions";
import webseans from "../../../logo.svg";
import NotificationBox from "../Notification/NotificationBox";
import * as notificationActions from "../../../store/actions/notificationActions";
import Routes from "./routes";
import SideMenu from "./SideHeader";
import Logo from "./Logo";
const SubMenu = Menu.SubMenu;

interface IProps {
  getMyNotifications: (params: { userId: string }) => any;
  readNotification: (params: { userId: string; notificationId: string; readAt: string }) => any;
  myNotifications: any;
}

interface IState {}

class AdminMenu extends Component<
  IProps & MenuProps & InjectedIntlProps & { setLocale: any; language: any },
  MenuState & IState
> {
  private intervalId;
  constructor(props) {
    super(props);
    this.getNotifications();
    this.intervalId = setInterval(this.getNotifications, 30000);
  }

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
    clearInterval(this.intervalId);
  }

  onLanguageChange(lang) {
    this.props.setLocale(lang);
  }

  menu = (subRoutes, fromSideMenu = undefined, onSideMenuClose = () => {}) => {
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
    const { myNotifications } = this.props;
    const {
      location: { pathname }
    } = history;
    return (
      <Row>
        <SideMenu
          changeLangauge={this.onLanguageChange.bind(this)}
          routes={Routes.AdminRoutes}
          formatMessage={formatMessage}
          language={language}
          specialMenu={this.menu}
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
              {Routes.AdminRoutes.map(({ route, subRoutes, label }) =>
                subRoutes ? (
                  <Dropdown overlay={() => this.menu(subRoutes)} trigger={["hover"]}>
                    <MenuButton selected={pathname === route} type="primary">
                      {formatMessage({ id: label })}
                    </MenuButton>
                  </Dropdown>
                ) : (
                  <MenuButton
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
          <Col span={4} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-around'}}>
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
                {/* {!myNotifications && <Icon type="bell" style={{ fontSize: 25 }} />} */}
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
    setLocale: params => dispatch(localeActions.setLocale(params)),
    logout: () => dispatch(userActions.logout()),
    getMyNotifications: params => dispatch(notificationActions.getMyNotifications(params)),
    readNotification: params => dispatch(notificationActions.readNotification(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(AdminMenu));

/*

 <React.Fragment>
        <div
          style={{ cursor: "pointer" }}
          onClick={() => {
            navPressed("/");
          }}
        >
          <img style={{ position: "absolute", left: 10, height: 64, width: 150 }} src={trp} />
        </div>
        <Menu mode="horizontal" onClick={handleClick} selectedKeys={[current]}>
          <Menu.Item key="/admin/dashboard">
            <a onClick={() => navPressed("/admin/dashboard")}>
              {formatMessage({ id: "DASHBOARD" })}
            </a>
          </Menu.Item>

          <Menu.Item key="/admin/blog">
            <a onClick={() => navPressed("/admin/blog")}>{formatMessage({ id: "BLOG" })}</a>
          </Menu.Item>

          <Menu.Item key="/admin/clientList">
            <a onClick={() => navPressed("/admin/clientList")}>
              {formatMessage({ id: "CLIENT_LIST" })}
            </a>
          </Menu.Item>

          <Menu.Item key="/admin/sessions">
            <a onClick={() => navPressed("/admin/sessions")}>{formatMessage({ id: "SESSIONS" })}</a>
          </Menu.Item>
          <Menu.SubMenu title={<span>{formatMessage({ id: "ME_SPECIAL" })}</span>}>
            <Menu.Item key="/admin/service">
              <a onClick={() => navPressed("/admin/service")}>
                {formatMessage({ id: "CATEGORIES" })}
              </a>
            </Menu.Item>
            <Menu.Item key="/admin/subscription">
              <a onClick={() => navPressed("/admin/subscription")}>
                {formatMessage({ id: "SUBSCRIPTIONS" })}
              </a>
            </Menu.Item>
            <Menu.Item key="/admin/clinic">
              <a onClick={() => navPressed("/admin/clinic")}>
                {formatMessage({ id: "CLINIC_LIST" })}
              </a>
            </Menu.Item>
            <Menu.Item key="/admin/counselorList">
              <a onClick={() => navPressed("/admin/counselorList")}>
                {formatMessage({ id: "COUNSELOR_LIST" })}
              </a>
            </Menu.Item>
            <Menu.Item key="/admin/balance">
              <a onClick={() => navPressed("/admin/balance")}>
                {formatMessage({ id: "MY_BALANCE" })}
              </a>
            </Menu.Item>
            <Menu.Item key="cancel-refund">{formatMessage({ id: "CANCEL_REFUND" })}</Menu.Item>
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
