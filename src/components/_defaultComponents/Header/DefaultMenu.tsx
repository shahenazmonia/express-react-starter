import React, { Component } from "react";
import { Omit, connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import * as localeActions from "../../../store/actions/localeActions";
import { MenuProps, user } from "./MenuInterfaces";
import LanguageSelectBox from "../SelectBoxes/LanguageSelectBox";
import history from "../../../_core/history";
import { MenuButton, HeaderMenu, MenuItem } from "./styledHeader";
import SideMenu from "./SideHeader";
import { Menu, Button, Row, Col } from "antd";
import Routes from "./routes";
import Logo from "./Logo";
let Wrapper = props => <HeaderMenu className="desktop-header">{props.children}</HeaderMenu>;

interface IProps extends Omit<MenuProps, "user"> {
  user?: user;
  language: string;
  setLocale: any;
  inDefaultMainView: boolean;
}

interface IState {}

class DefaultMenu extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {};
  }
  componentDidMount() {
    this.resize();
    window.addEventListener("resize", this.resize);
  }
  componentWillUnmount() {
    // If this component is unmounted, stop listening
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    var SideMenu: any = document.getElementsByClassName("side-menu")[0];
    var DesktopHeader: any = document.getElementsByClassName("desktop-header")[0];
    if (window.innerWidth < 640) {
      SideMenu.style.display = "flex";
      DesktopHeader.style.display = "none";
    } else {
      SideMenu.style.display = "none";
      DesktopHeader.style.display = "flex";
    }
  };

  onLanguageChange(lang) {
    this.props.setLocale(lang);
  }

  menu = () => {
    const { formatMessage } = this.props.intl;

    return (
      <Menu>
        <Menu.Item key="onlineTherapy">
          <a onClick={() => history.push("/therapy/step1/onlineTherapy")}>
            {formatMessage({ id: "ONLINETHERAPY" })}
          </a>
        </Menu.Item>
        <Menu.Item key="lifeCoach">
          <a onClick={() => history.push("/therapy/step1/lifeCoach")}>
            {formatMessage({ id: "LIFECOACH" })}
          </a>
        </Menu.Item>
        <Menu.Item key="dietician">
          <a onClick={() => history.push("/therapy/step1/dietician")}>
            {formatMessage({ id: "DIETICIAN" })}
          </a>
        </Menu.Item>
      </Menu>
    );
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { language, inDefaultMainView } = this.props;
    const {
      location: { pathname }
    } = history;
    return (
      <Row>
        <SideMenu
          changeLangauge={this.onLanguageChange.bind(this)}
          routes={Routes.DefaultRoutes}
          formatMessage={formatMessage}
          language={language}
          inDefaultMainView={inDefaultMainView}
        />
        <Wrapper className="desktop-header">
          <Col span={1} />
          <Logo navPressed={() => history.push("/")} />
          <Col span={14}>
            <Row type="flex" justify="end">
              {Routes.DefaultRoutes.map(({ route, label }) => (
                <MenuButton
                  inDefaultMainView={inDefaultMainView}
                  selected={pathname === route}
                  onClick={() => route && history.push(route)}
                >
                  {formatMessage({ id: label })}
                </MenuButton>
              ))}
            </Row>
          </Col>
          <Col span={5}>
            <Row type="flex" justify="start" style={{ width: "100%" }}>
              <MenuButton style={{ alignItems: "center" }}>
                <Button type="primary" onClick={() => history.push("/login")}>
                  {formatMessage({ id: "LOGIN" })}
                </Button>
              </MenuButton>
              <LanguageSelectBox
                defaultValue={language}
                onLanguageChange={this.onLanguageChange.bind(this)}
              />
            </Row>
          </Col>
        </Wrapper>
      </Row>
    );
  }
}

const stateToProps = state => {
  return {
    language: state.locale.language
  };
};

const dispatchToProps = dispatch => {
  return {
    setLocale: params => dispatch(localeActions.setLocale(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(DefaultMenu));

/* <React.Fragment>
<div
  style={{ cursor: "pointer" }}
  onClick={() => {
    navPressed("/");
  }}
>
  <img style={{ position: "absolute", left: 10, height: 64, width: 150 }} src={trp} />
</div>
<HeaderMenu mode="horizontal" onClick={handleClick} selectedKeys={[current]}>
  <Menu.Item key="/">
    <a onClick={() => navPressed("/")}>{formatMessage({ id: "MAIN_PAGE" })}</a>
  </Menu.Item>

  <Menu.SubMenu title={<span>{formatMessage({ id: "SERVICES" })}</span>}>
    <Menu.Item key="onlineTherapy">
      <a onClick={() => navPressed("/therapy/step1/onlineTherapy")}>
        {formatMessage({ id: "ONLINETHERAPY" })}
      </a>
    </Menu.Item>
    <Menu.Item key="lifeCoach">
      <a onClick={() => navPressed("/therapy/step1/lifeCoach")}>
        {formatMessage({ id: "LIFECOACH" })}
      </a>
    </Menu.Item>
    <Menu.Item key="dietician">
      <a onClick={() => navPressed("/therapy/step1/dietician")}>
        {formatMessage({ id: "DIETICIAN" })}
      </a>
    </Menu.Item>
  </Menu.SubMenu>
  <Menu.Item key="/aboutus">{formatMessage({ id: "ABOUT_US" })}</Menu.Item>

  <Menu.Item key="/jitsi">
    <a onClick={() => navPressed("/jitsi")}>{"Jitsi"}</a>
  </Menu.Item>

  <Menu.Item key="/blog">
    <a onClick={() => navPressed("/blog")}>{formatMessage({ id: "BLOG" })}</a>
  </Menu.Item>
  <Menu.Item key="/faq">
    <a onClick={() => navPressed("/faq")}>{formatMessage({ id: "FAQ" })}</a>
  </Menu.Item>

  <Menu.Item>
    <Button onClick={() => navPressed("/login")}>{formatMessage({ id: "LOGIN" })}</Button>
  </Menu.Item>

  <Menu.Item>
    <LanguageSelectBox
      defaultValue={language}
      onLanguageChange={this.onLanguageChange.bind(this)}
    />
  </Menu.Item>
</HeaderMenu>
</React.Fragment> */
