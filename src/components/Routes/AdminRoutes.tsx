import React from "react";
import { Route, Switch } from "react-router-dom";

import history from "../../_core/history";
import Main from "../Main";
//Admin
import Clinic from "../admin/ClinicPage/Clinic";
import ClinicAdd from "../admin/ClinicPage/ClinicAdd";
import ClinicEdit from "../admin/ClinicPage/ClinicEdit";
import SubscriptionClinicAdd from "../admin/SubscriptionClinicPage/SubscriptionClinicAdd";
import SubscriptionClinicEdit from "../admin/SubscriptionClinicPage/SubscriptionClinicEdit";
import SubscriptionClinic from "../admin/SubscriptionClinicPage/SubscriptionClinic";
import ServiceAdd from "../admin/ServicePage/ServiceAdd";
import ServiceEdit from "../admin/ServicePage/ServiceEdit";
import Service from "../admin/ServicePage/Service";
import AdminBlog from "../admin/BlogPage/Blog";
import BlogDetail from "../admin/BlogDetailPage/BlogDetailPage";
import ManageCommentsPage from "../admin/ManageCommentsPage/ManageCommentsPage";
import AdminEditorPage from "../admin/EditorPage/AdminEditorPage";
import DashboardPageAdmin from "../admin/DashboardPage/DashboardPage";
import SessionPageAdmin from "../admin/SessionPage/SessionPage";
import SessionDetailPage from "../admin/SessionDetailPage/SessionDetailPage";
import ClientListPage from "../admin/ClientListPage/ClientListPage";
import ClientAccountPage from "../admin/ClientAccountPage/ClientAccountPage";
import BalancePageAdmin from "../admin/BalancePage/BalancePage";
import CounselorListPage from "../admin/CouncelorListPage/CouncelorListPage";
import CounselorAccountPage from "../admin/CounselorAccountPage/CounselorAccountPage";
import CounselorProfilePage from "../admin/CounselorProfilePage/CounselorProfilePage";
import MessagesPage from "../admin/MessagesPage/MessagesPage";
import TransactionsPage from "../admin/AccountingPage/TransactionsPage";
import TransactionDetailPage from "../admin/AccountingPage/TransactionDetailPage";
import AccountsPage from "../admin/AccountingPage/AccountsPage";

const AdminRoutes = () => {
  return (
    <Main>
      <Switch>
        <Route
          exact
          path="/admin"
          render={() => {
            return <DashboardPageAdmin />;
          }}
        />

        <Route
          exact
          path="/admin/dashboard"
          render={() => {
            return <DashboardPageAdmin />;
          }}
        />

        <Route
          path="/admin/sessions"
          render={props => {
            return <SessionPageAdmin {...props} />;
          }}
        />

        <Route
          exact
          path="/admin/sessionDetail/:sessionId"
          render={props => {
            return <SessionDetailPage sessionId={props.match.params.sessionId} />;
          }}
        />

        <Route
          exact
          path="/admin/balance"
          render={() => {
            return <BalancePageAdmin />;
          }}
        />

        <Route
          exact
          path="/admin/blog"
          render={() => {
            return <AdminBlog />;
          }}
        />

        <Route
          exact
          path="/admin/blog/detail/:blogId"
          render={props => {
            return <BlogDetail blogId={props.match.params.blogId} />;
          }}
        />

        <Route
          exact
          path="/admin/:blogId/comments"
          render={props => {
            return <ManageCommentsPage blogId={props.match.params.blogId} />;
          }}
        />

        <Route
          exact
          path="/admin/editor"
          render={() => {
            return <AdminEditorPage />;
          }}
        />

        <Route
          exact
          path="/admin/editor/:id"
          render={props => {
            return <AdminEditorPage blogId={props.match.params.id} />;
          }}
        />

        <Route
          exact
          path="/admin/Clinic"
          render={() => {
            return <Clinic />;
          }}
        />

        <Route
          exact
          path="/admin/clinic/new"
          render={() => {
            return <ClinicAdd />;
          }}
        />

        <Route
          exact
          path="/admin/clinic/update/:id"
          render={props => {
            return <ClinicEdit {...props.match.params} />;
          }}
        />

        <Route
          exact
          path="/admin/subscription"
          render={() => {
            return <SubscriptionClinic />;
          }}
        />

        <Route
          exact
          path="/admin/subscription/new"
          render={() => {
            return <SubscriptionClinicAdd />;
          }}
        />

        <Route
          exact
          path="/admin/subscription/update/:id"
          render={props => {
            return <SubscriptionClinicEdit {...props.match.params} />;
          }}
        />

        <Route
          exact
          path="/admin/service"
          render={() => {
            return <Service />;
          }}
        />

        <Route
          exact
          path="/admin/service/new"
          render={() => {
            return <ServiceAdd />;
          }}
        />

        <Route
          exact
          path="/admin/messages"
          render={() => {
            return <MessagesPage />;
          }}
        />

        <Route
          exact
          path="/admin/service/update/:id"
          render={props => {
            return <ServiceEdit {...props.match.params} />;
          }}
        />

        <Route
          exact
          path="/admin/clientList"
          render={() => {
            return <ClientListPage />;
          }}
        />

        <Route
          path="/admin/client/:id"
          render={props => {
            return <ClientAccountPage clientId={props.match.params.id} />;
          }}
        />

        <Route exact path="/admin/counselorList" render={props => <CounselorListPage />} />

        <Route
          exact
          path="/admin/counselor/:counselorId"
          render={props => {
            return <CounselorAccountPage counselorId={props.match.params.counselorId} />;
          }}
        />

        <Route
          exact
          path="/admin/counselorProfile/:counselorId"
          render={props => {
            return <CounselorProfilePage counselorId={props.match.params.counselorId} />;
          }}
        />

        <Route
          exact
          path="/admin/transactions"
          render={props => {
            return <TransactionsPage />;
          }}
        />

        <Route
          exact
          path="/admin/accounts"
          render={props => {
            return <AccountsPage />;
          }}
        />

        <Route
          exact
          path="/admin/transactiondetail/:id?"
          render={props => {
            const isEdit = props.location.state ? props.location.state.isEdit : true;
            return <TransactionDetailPage id={props.match.params.id} isEdit={isEdit} />;
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

export default AdminRoutes;
