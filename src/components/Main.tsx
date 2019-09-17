import React, { Component } from "react";
import { connect } from "react-redux";
import _ from "lodash";

import * as clinicSubscriptionActions from "../store/actions/clinicSubscriptionActions";
import * as sessionActions from "../store/actions/sessionActions";
import * as notificationActions from "../store/actions/notificationActions";

import Header from "./_defaultComponents/Header/Header";
import SessionCountdown from "./_defaultComponents/SessionCountdown";
import MainErrorModal from "./_defaultComponents/Modals/MainErrorModal";
import MainConfirmModal from "./_defaultComponents/Modals/MainConfirmModal";
import MainWarningModal from "./_defaultComponents/Modals/MainWarningModal";
import MainInfoModal from "./_defaultComponents/Modals/MainInfoModal";
import history from "../_core/history";
import Footer from "./_defaultComponents/Footer";

import { Layout } from "antd";

interface IProps {
  user?: any;
  closestSession: any;
  getClinicSubscriptions(): any;
}

class Main extends Component<IProps, any> {
  async componentDidMount() {
    await this.props.getClinicSubscriptions();
  }

  render() {
    const {
      location: { pathname }
    } = history;
    const inDefaultMainView = pathname === "/";
    const { closestSession, user } = this.props;
    const clientView = _.includes(user.roles, "client") || (user.roles || []).length === 0;

    return (
      <Layout style={{ backgroundColor: "#ffffff", width: "100vw" }}>
        {user.roles &&
          (_.includes(user.roles, "counselor") || _.includes(user.roles, "client")) &&
          !_.isEmpty(closestSession) && <SessionCountdown />}
        <MainErrorModal />
        <MainConfirmModal />
        <MainWarningModal />
        <MainInfoModal />
        <Layout.Header className="ant-d-header" style={{ backgroundColor: "transparent" }}>
          {!inDefaultMainView && (
            <Header inDefaultMainView={false} path={window.location.pathname} />
          )}
        </Layout.Header>
        <Layout.Content style={{ paddingTop: "30px" }}>{this.props.children}</Layout.Content>
        {clientView
          ? !inDefaultMainView && (
              <Layout.Footer style={{ padding: 0, marginTop: "50px" }}>
                <Footer />
              </Layout.Footer>
            )
          : null}
      </Layout>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user,
    closestSession: state.closestSession
  };
};

const dispatchToProps = dispatch => {
  return {
    getClinicSubscriptions: () => dispatch(clinicSubscriptionActions.getClinicSubscriptions())
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(Main);
