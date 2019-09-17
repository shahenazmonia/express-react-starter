import React from "react";
import { Router, Route, Switch } from "react-router-dom";
import { connect } from "react-redux";

import { loadState } from "../../_core/localStorage";
import history from "../../_core/history";
import authService from "../../services/authService";

import Main from "../Main";
import Home from "../client/HomePage/Home";
import Register from "../client/RegisterPage/Register";
import Feedback from "../client/FeedbackPage/Feedback";
import Blog from "../client/BlogPage/Blog";
import BlogDetail from "../client/BlogDetailPage/BlogDetail";
import Account from "../client/AccountPage/Account";
import Test from "../client/TestPage/Test";
import TestProcess from "../client/TestPage/TestProcess";
import TestResult from "../client/TestPage/TestResult";
import SessionPageClient from "../client/SessionPage/SessionPage";
import SessionDetailPage from "../client/SessionDetailPage/SessionDetailPage";
import OnlineTherapyStep1 from "../client/OnlineTherapyStep1Page/OnlineTherapyStep1";
import OnlineTherapyStep2 from "../client/OnlineTherapyStep2Page/OnlineTherapyStep2";
import OnlineTherapyPayment from "../client/OnlineTherapyPaymentPage/OnlineTherapyPayment";
import OnlineTherapyPaymentSuccessful from "../client/OnlineTherapyPaymentSuccessfulPage/OnlineTherapyPaymentSuccessful";
import CounselorProfilePage from "../client/CounselorProfilePage/CounselorProfilePage";
import MyTestsPage from "../client/MyTestsPage/MyTestsPage";
import FAQPage from "../_defaultComponents/FAQPage/FAQPage";
import RegisterPageForCounselor from "../counselor/RegisterPage/RegisterPageForCounselor";

import CancelRefundPage from "../_defaultComponents/CancelRefundPage/CancelRefundPage";
import MessagesPage from "../client/MessagesPage/MessagesPage";
import Profile from "../counselor/ProfilePage/Profile";

import Login from "../client/LoginPage/LoginPage";
import AdminLogin from "../admin/LoginPage/LoginPage";
import PasswordReset from "../_defaultComponents/PasswordResetPage/PasswordReset";

function checkAuthorization() {
  if (!authService.isUserLoggedIn()) {
    history.push("/login?redirect_url=" + window.location.pathname);
    return false;
  }
  return true;
}

function checkSteps() {
  const sessionCart = loadState().sessionCart || {};
  const { counselorId, category, sessionDate } = sessionCart;
  if (!counselorId) {
    history.push("/therapy/step1/onlineTherapy");
    return false;
  } else if (!(category && sessionDate)) {
    history.push("/therapy/step2/" + counselorId);
    return false;
  }
  return true;
}

const ClientRoutes = () => {
  return (
    <Main>
      <Switch>
        <Route
          exact
          path="/"
          render={() => {
            return <Home />;
          }}
        />

        <Route
          exact
          path="/register"
          render={() => {
            return <Register />;
          }}
        />

        <Route
          path="/about"
          render={() => {
            return <Feedback />;
          }}
        />

        <Route
          path="/contact"
          render={() => {
            return <Feedback />;
          }}
        />

        <Route
          exact
          path="/blog"
          render={props => {
            return <Blog search={props.location.search} />;
          }}
        />

        <Route
          exact
          path="/blog/detail/:blogId"
          render={props => {
            return <BlogDetail blogId={props.match.params.blogId} />;
          }}
        />

        <Route
          exact
          path="/faq"
          render={() => {
            return <FAQPage />;
          }}
        />

        <Route
          exact
          path="/cancel-refund"
          render={() => {
            return <CancelRefundPage />;
          }}
        />

        <Route
          exact
          path="/account"
          render={() => {
            if (checkAuthorization()) return <Account />;
            else return null;
          }}
        />

        <Route
          exact
          path="/sessions"
          render={() => {
            if (checkAuthorization()) return <SessionPageClient />;
            else return null;
          }}
        />

        <Route
          exact
          path="/sessionDetail/:sessionId"
          render={props => {
            if (checkAuthorization())
              return <SessionDetailPage sessionId={props.match.params.sessionId} />;
            else return null;
          }}
        />

        <Route
          exact
          path="/client/counselorProfile/:counselorId"
          render={props => {
            return <Profile id={props.match.params.counselorId} />;
          }}
        />

        <Route
          exact
          path="/test"
          render={props => {
            return <Test />;
          }}
        />

        <Route
          exact
          path="/myTests"
          render={() => {
            if (checkAuthorization()) return <MyTestsPage />;
            return null;
          }}
        />

        <Route
          exact
          path="/test/:category"
          render={props => {
            return <TestProcess category={props.match.params.category} />;
          }}
        />

        <Route
          exact
          path="/test/:category/result/:result"
          render={props => {
            return <TestResult resultId={props.match.params.result} />;
          }}
        />

        <Route
          exact
          path="/therapy/step1/:mainCategory"
          render={props => {
            return <OnlineTherapyStep1 mainCategory={props.match.params.mainCategory} />;
          }}
        />

        <Route
          exact
          path="/therapy/step2/:counselorId/:category?"
          render={props => {
            return (
              <OnlineTherapyStep2
                counselorId={props.match.params.counselorId}
                category={props.match.params.category}
              />
            );
          }}
        />

        <Route
          exact
          path="/therapy/payment"
          render={props => {
            if (checkSteps()) return <OnlineTherapyPayment />;
            else return null;
          }}
        />

        <Route
          exact
          path="/therapy/payment/successful/:sessionId"
          render={props => {
            return <OnlineTherapyPaymentSuccessful sessionId={props.match.params.sessionId} />;
          }}
        />

        <Route
          exact
          path="/messages"
          render={() => {
            return <MessagesPage />;
          }}
        />

        <Route
          path="/login/:targetPage?"
          render={props => {
            return <Login targetPage={props.match.params.targetPage} />;
          }}
        />

        <Route
          exact
          path="/adminlogin"
          render={() => {
            return <AdminLogin />;
          }}
        />

        <Route
          exact
          path="/invitation/:id"
          render={props => {
            return <RegisterPageForCounselor {...props.match.params} />;
          }}
        />

        <Route
          exact
          path="/passwordreset/:token"
          render={props => {
            return <PasswordReset {...props.match.params} />;
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

export default ClientRoutes;
