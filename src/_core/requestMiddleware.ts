import { Middleware } from "redux";
import * as alertActions from "../store/actions/alertActions";
//import * as userActions from "../store/actions/userActions";
import baseRequest from "./baseRequest";
import history from "./history";

const middleWare: Middleware = api => next => action => {
  if (action.type) {
    const error = /.*_ERROR$/;
    if (action.type.match(error)) {
      try {
        const message = action.payload.response.data.message;
        api.dispatch(alertActions.showError({ body: message, actionFunc: () => null }));
        if (message === "Unauthorized") {
          baseRequest.addHeader();
          //    api.dispatch(userActions.resetUser());
        }
      } catch (error) {
        api.dispatch(alertActions.showError({ body: "Something wrong happened" }));
      } finally {
      }
    }
  }
  return next(action);
};

export default function requestMiddleware() {
  return middleWare;
}
