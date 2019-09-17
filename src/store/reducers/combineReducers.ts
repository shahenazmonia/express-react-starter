import { combineReducers } from "redux";

import alert from "./alert";
import constants from "./constant";
import user from "./user";
import locale from "./locale";
import sessionCart from "./sessionCart";
import closestSession from "./closestSession";
import notification from "./notification";
import jitsi from "./jitsi";
const reducers = combineReducers({
  alert,
  constants,
  user,
  locale,
  sessionCart,
  closestSession,
  notification,
  jitsi
});

export default reducers;
