import React from "react";
import { Route, Switch, Router } from "react-router-dom";
import { connect } from "react-redux";

import history from "../../_core/history";
import Main from "../Main";
import CounselorBlog from "../counselor/BlogPage/Blog";
import BlogDetail from "../counselor/BlogDetailPage/BlogDetailPage";
import Account from "../counselor/AccountPage/Account";
import SessionPageCouncelor from "../counselor/SessionPage/SessionPage";
import SessionDetailPage from "../counselor/SessionDetailPage/SessionDetailPage";
import BalancePageCounselor from "../counselor/BalancePage/BalancePage";
import Profile from "../counselor/ProfilePage/Profile";
import CounselorEditorPage from "../counselor/EditorPage/CounselorEditorPage";
import CalendarPlan from "../counselor/CalendarPlanPage/CalendarPlan";
import MessagesPage from "../counselor/MessagesPage/MessagesPage";
import Invitation from "../counselor/InvitationPage/Invitation";

class CounselorRoutes extends React.Component<any, any> {
  checkUserPermission() {
    const { user } = this.props;
    if (!user.isCompleted) history.push("/counselor/account");
    else return true;
  }
  render() {
    return (
      <Main>
        <Switch>
          <Route
            exact
            path="/counselor"
            render={props => {
              if (this.checkUserPermission()) return <SessionPageCouncelor />;
              else return null;
            }}
          />

          <Route
            exact
            path="/counselor/account"
            render={props => {
              return <Account {...props} />;
            }}
          />

          <Route
            exact
            path="/counselor/invitation"
            render={() => {
              return <Invitation />;
            }}
          />

          <Route
            exact
            path="/counselor/blog"
            render={() => {
              if (this.checkUserPermission()) return <CounselorBlog />;
              else return null;
            }}
          />

          <Route
            exact
            path="/counselor/blog/detail/:blogId"
            render={props => {
              return <BlogDetail blogId={props.match.params.blogId} />;
            }}
          />

          <Route
            exact
            path="/counselor/balance"
            render={() => {
              if (this.checkUserPermission()) return <BalancePageCounselor />;
              else return null;
            }}
          />

          <Route
            exact
            path="/counselor/sessions"
            render={() => {
              if (this.checkUserPermission()) return <SessionPageCouncelor />;
              else return null;
            }}
          />

          <Route
            exact
            path="/counselor/sessionDetail/:sessionId"
            render={props => {
              if (this.checkUserPermission())
                return <SessionDetailPage sessionId={props.match.params.sessionId} />;
              else return null;
            }}
          />

          <Route
            path="/counselor/profile"
            render={() => {
              if (this.checkUserPermission()) return <Profile />;
              else return null;
            }}
          />

          <Route
            exact
            path="/counselor/editor"
            render={() => {
              if (this.checkUserPermission()) return <CounselorEditorPage />;
              else return null;
            }}
          />

          <Route
            exact
            path="/counselor/calendarPlan"
            render={() => {
              if (this.checkUserPermission()) return <CalendarPlan />;
              else return null;
            }}
          />

          <Route
            exact
            path="/counselor/messages"
            render={() => {
              return <MessagesPage />;
            }}
          />

          <Route
            exact
            path="/counselor/editor/:id"
            render={props => {
              if (this.checkUserPermission())
                return <CounselorEditorPage blogId={props.match.params.id} />;
              else return null;
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
  }
}
export default CounselorRoutes;
