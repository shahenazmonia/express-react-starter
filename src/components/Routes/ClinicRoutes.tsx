import React from "react";
import { Route, Switch } from "react-router-dom";
import { connect } from "react-redux";
import history from "../../_core/history";
import Main from "../Main";
import DashboardPageClnAdmin from "../clinic/DashboardPage/DashboardPage";
import SessionPageClnAdmin from "../clinic/SessionPage/SessionPage";
import SessionDetailPage from "../clinic/SessionDetailPage/SessionDetailPage";
import BalancePageClnAdmin from "../clinic/BalancePage/BalancePage";
import CouncelorListPage from "../clinic/CouncelorListPage/CouncelorListPage";
import ClinicEdit from "../admin/ClinicPage/ClinicEdit";

import CounselorAccountPage from "../clinic/CounselorAccountPage/CounselorAccountPage";
import ClinicBlog from "../clinic/BlogPage/Blog";
import ClinicEditorPage from "../clinic/EditorPage/ClinicEditorPage";
import Invitation from "../clinic/InvitationPage/Invitation";
import CounselorProfilePage from "../clinic/CounselorProfilePage/CounselorProfilePage";
import CounselorServiceOperation from "../clinic/CounselorServiceOperation/CounselorServiceOperation";
import SubscriptionCounselorAdd from "../clinic/SubscriptionCounselorPage/SubscriptionCounselorAdd";
import SubscriptionCounselorEdit from "../clinic/SubscriptionCounselorPage/SubscriptionCounselorEdit";
import SubscriptionCounselor from "../clinic/SubscriptionCounselorPage/SubscriptionCounselor";
import Service from "../clinic/ServicePage/Service";
import BlogDetail from "../clinic/BlogDetailPage/BlogDetailPage";
import ClientListPage from "../clinic/ClientListPage/ClientListPage";
import ClientAccountPage from "../clinic/ClientAccountPage/ClientAccountPage";
import MessagesPage from "../clinic/MessagesPage/MessagesPage";

const ClinicRoutes = () => {
  return (
    <Main>
      <Switch>
        <Route
          exact
          path="/clinic"
          render={() => {
            return <DashboardPageClnAdmin />;
          }}
        />

        <Route
          path="/clinic/sessions"
          render={props => {
            return <SessionPageClnAdmin {...props} />;
          }}
        />

        <Route
          exact
          path="/clinic/sessionDetail/:sessionId"
          render={props => {
            return <SessionDetailPage sessionId={props.match.params.sessionId} />;
          }}
        />

        <Route
          exact
          path="/clinic/balance"
          render={() => {
            return <BalancePageClnAdmin />;
          }}
        />

        <Route
          exact
          path="/clinic/dashboard"
          render={() => {
            return <DashboardPageClnAdmin />;
          }}
        />

        <Route
          exact
          path="/clinic/counselorList"
          render={() => {
            return <CouncelorListPage />;
          }}
        />

        <Route
          exact
          path="/clinic/account"
          render={() => {
            return <ClinicEdit onlyReview={true} id={""} />;
          }}
        />
        <Route
          exact
          path="/clinic/counselor/service/:id"
          render={props => {
            return <CounselorServiceOperation {...props.match.params} />;
          }}
        />

        <Route
          exact
          path="/clinic/counselor/:counselorId"
          render={props => {
            return <CounselorAccountPage counselorId={props.match.params.counselorId} />;
          }}
        />

        <Route
          exact
          path="/clinic/blog"
          render={() => {
            return <ClinicBlog />;
          }}
        />

        <Route
          exact
          path="/clinic/blog/detail/:blogId"
          render={props => {
            return <BlogDetail blogId={props.match.params.blogId} />;
          }}
        />

        <Route
          exact
          path="/clinic/clientList"
          render={() => {
            return <ClientListPage />;
          }}
        />

        <Route
          path="/clinic/client/:id"
          render={props => {
            return <ClientAccountPage clientId={props.match.params.id} />;
          }}
        />

        <Route
          exact
          path="/clinic/editor"
          render={() => {
            return <ClinicEditorPage />;
          }}
        />

        <Route
          exact
          path="/clinic/messages"
          render={() => {
            return <MessagesPage />;
          }}
        />

        <Route
          exact
          path="/clinic/editor/:id"
          render={props => {
            return <ClinicEditorPage blogId={props.match.params.id} />;
          }}
        />

        <Route
          exact
          path="/clinic/subscription"
          render={() => {
            return <SubscriptionCounselor />;
          }}
        />

        <Route
          exact
          path="/clinic/subscription/new"
          render={() => {
            return <SubscriptionCounselorAdd />;
          }}
        />

        <Route
          exact
          path="/clinic/subscription/update/:id"
          render={props => {
            return <SubscriptionCounselorEdit {...props.match.params} />;
          }}
        />

        <Route
          exact
          path="/clinic/invitation"
          render={() => {
            return <Invitation />;
          }}
        />

        <Route
          exact
          path="/clinic/counselorProfile/:counselorId"
          render={props => {
            return <CounselorProfilePage counselorId={props.match.params.counselorId} />;
          }}
        />

        <Route
          path="/clinic/service"
          render={() => {
            return <Service />;
          }}
        />

        <Route
          render={() => {
            history.push("/");
            return null;
          }}
        />
      </Switch>
    </Main>
  );
};

export default ClinicRoutes;
