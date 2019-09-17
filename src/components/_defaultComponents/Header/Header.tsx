import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import history from "../../../_core/history";
import { injectIntl, InjectedIntlProps } from "react-intl";

import USER from "../../../utility/constants/user";
import { user } from "./MenuInterfaces";

import AdminMenu from "./AdminMenu";
import CounselorMenu from "./CounselorMenu";
import ClinicMenu from "./ClinicMenu";
import ClientMenu from "./ClientMenu";
import DefaultMenu from "./DefaultMenu";

interface IProps {
  title?: string;
  user: any;
  path: string;
  inDefaultMainView: boolean;
}

interface IState {
  current: string;
  path?: string;
}

const FixedHeader = styled("div")<{ inDefaultMainView: boolean }>`
  background-color: ${props => (props.inDefaultMainView ? "transparent" : "white")};
  position: fixed;
  z-index: 1000;
  right: 0;
  left: 0;
  top: 0;
  margin-bottom: 30;
`;

class Header extends Component<IProps & InjectedIntlProps, IState> {
  private header;
  constructor(props) {
    super(props);
    this.header = React.createRef();
    this.state = { current: window.location.pathname };
  }

  componentDidMount() {
    this.resize();
    window.addEventListener("resize", this.resize);
    this.setState({
      current: window.location.pathname
    });
  }
  componentWillUnmount() {
    // If this component is unmounted, stop listening
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    var SideMenu: any = document.getElementsByClassName("side-menu")[0];
    var DesktopHeader: any = document.getElementsByClassName("desktop-header")[0];
    if (window.innerWidth < 768) {
      SideMenu.style.display = "flex";
      DesktopHeader.style.display = "none";
    } else {
      SideMenu.style.display = "none";
      DesktopHeader.style.display = "flex";
    }
  };

  componentWillReceiveProps(nextProps) {
    if (this.props.path !== nextProps.path) {
      this.setState({ current: nextProps.path });
    }
  }

  handleClick = e => {
    if (e.key) {
      this.setState({
        current: e.key
      });
    }
  };

  navPressed(path) {
    //  this.setState({ hideMobileMenu: true, path });
    this.setState({
      current: path
    });
    history.push(path);
  }

  /* logout() {
    this.props.logout().finally(() => {
      history.push("/login");
    });
  }*/
  static defaultProps: { inDefaultMainView?: boolean } = {
    inDefaultMainView: false
  };

  renderMenu() {
    const { formatMessage } = this.props.intl;
    const { user, inDefaultMainView } = this.props;
    const { current } = this.state;
    let menu;

    if (user && user.loggedIn) {
      switch (user.roles && user.roles[0]) {
        case USER.ADMIN:
          menu = (
            <AdminMenu
              user={user}
              current={current}
              handleClick={this.handleClick.bind(this)}
              navPressed={this.navPressed.bind(this)}
            />
          );
          break;
        case USER.COUNSELOR:
          menu = (
            <CounselorMenu
              user={user}
              current={current}
              handleClick={this.handleClick.bind(this)}
              navPressed={this.navPressed.bind(this)}
            />
          );
          break;
        case USER.CLINIC:
          menu = (
            <ClinicMenu
              user={user}
              current={current}
              handleClick={this.handleClick.bind(this)}
              navPressed={this.navPressed.bind(this)}
            />
          );
          break;
        case USER.CLIENT:
          menu = (
            <ClientMenu
              user={user}
              current={current}
              inDefaultMainView={inDefaultMainView}
              handleClick={this.handleClick.bind(this)}
              navPressed={this.navPressed.bind(this)}
            />
          );
          break;
        default:
          break;
      }
    } else {
      menu = (
        <DefaultMenu
          current={current}
          inDefaultMainView={inDefaultMainView}
          handleClick={this.handleClick.bind(this)}
          navPressed={this.navPressed.bind(this)}
        />
      );
    }

    return menu;
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { user, inDefaultMainView } = this.props;
    const { current } = this.state;
    return (
      <FixedHeader inDefaultMainView={inDefaultMainView} ref={this.header} className="main-header">
        {this.renderMenu()}
      </FixedHeader>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user || {},
    // lang: state.locale.language,
    constant: state.constant || {}
  };
};

const dispatchToProps = dispatch => {
  return {
    //  logout: params => dispatch(userActions.logout(params))
  };
};
export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(Header));
