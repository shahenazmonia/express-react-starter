import React, { Component } from "react";
import { Router, Route, Switch, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import _ from "lodash";

import users from "../../utility/constants/user";
import history from "../../_core/history";
import authService from "../../services/authService";

import FoodPlan from "../_defaultComponents/FoodPlan";

//import authService from "../services/authService";
import ClientRoutes from "./ClientRoutes";
import AdminRoutes from "./AdminRoutes";
import ClinicRoutes from "./ClinicRoutes";
import CounselorRoutes from "./CounselorRoutes";
import JitsiPage from "../client/JıtsiTestPage/JitsiPage";

class Routes extends Component<any, any> {
  checkUserPermission(role) {
    const { user } = this.props;
    if (user.roles) {
      if (_.includes(user.roles, role)) return true;
      else {
        history.push("/" + user.roles[0]);
        return false;
      }
    } else if (role === users.CLIENT) return true;
    else {
      history.push("/");
      return false;
    }
  }

  checkAuthorization() {
    // IS LOGIN
    if (!authService.isUserLoggedIn()) {
      history.push("/login");
      return false;
    } else {
      const { user, jitsi } = this.props;
      if (_.includes(user.roles, "counselor") && jitsi.openJitsi) return true;
      //IS CLIENT && SESSION START TIME
      else if (_.includes(user.roles, "client") && jitsi.openJitsi) {
        return true;
      } else return history.push("/");
    }
  }
  /*
  checkAuthorization() {
    if (!authService.isUserLoggedIn()) {
      history.push("/login");
      return false;
    }
    return true;
  }

  isAlreadyAuthenticated() {
    if (authService.isUserLoggedIn()) {
      history.push("/");
      return false;
    }
    return true;
  }*/

  render() {
    const food = {
      key: 1,
      name: "peynir",
      portion: 1,
      ok: true,
      details: "hızlı ye"
    };

    const food2 = {
      key: 2,
      name: "ekmek",
      portion: 0.5,
      ok: false,
      details: ""
    };
    const thisWeek = {
      startDate: new Date(),
      plan: [
        [[food, food2], [], [food], [], [food, food2], []],
        [[food], [], [food], [], [food], []],
        [[food], [], [food], [], [food, food2], []],
        [[food, food2], [], [food, food2], [], [food], []],
        [[food, food2], [], [food], [], [food, food2], []],
        [[food, food2], [], [food], [], [food, food2], []],
        [[food, food2], [], [food], [], [food, food2], []]
        // [[food,food2], [], [food], [], [food,food2], []]
      ],
      foodDatabase: [{ name: "ekmek", weight: 70, calories: 200 }]
    };

    return (
      <Router history={history}>
        <Switch>
          <Route
            path="/jitsi"
            render={() => {
              if (this.checkAuthorization()) return <JitsiPage />;
              else return null;
            }}
          />

          <Route
            path="/test"
            render={() => {
              return <FoodPlan modify={true} weeklyFoodPlan={thisWeek} />;
            }}
          />
          <Route
            path="/admin"
            render={() => {
              if (this.checkUserPermission(users.ADMIN)) return <AdminRoutes />;
              else return null;
            }}
          />
          <Route
            path="/clinic"
            render={() => {
              if (this.checkUserPermission(users.CLINIC)) return <ClinicRoutes />;
              else return null;
            }}
          />
          <Route
            path="/counselor"
            render={() => {
              if (this.checkUserPermission(users.COUNSELOR))
                return <CounselorRoutes user={this.props.user} />;
              else return null;
            }}
          />

          <Route
            path="/"
            render={() => {
              if (this.checkUserPermission(users.CLIENT)) return <ClientRoutes />;
              else return null;
            }}
          />
        </Switch>
      </Router>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user || {},
    jitsi: state.jitsi,
    closestSession: state.closestSession
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
)(Routes);
