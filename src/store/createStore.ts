import { createStore, applyMiddleware, compose } from "redux";
import promiseMiddleware from "redux-promise-middleware";
import thunkMiddleware from "redux-thunk";

import reducers from "./reducers/combineReducers";
import requestMiddleware from "../_core/requestMiddleware";
import { devTools } from "../_core/devTools";
import { loadState } from "../_core/localStorage";

const composeEnhancers = devTools || compose;
const promiseTypeSuffixes = ["LOADING", "SUCCESS", "ERROR"];

const middleWare = applyMiddleware(
  thunkMiddleware,
  promiseMiddleware({ promiseTypeSuffixes }),
  requestMiddleware()
);

const persistedState = loadState();
const store = createStore(reducers, persistedState, composeEnhancers(middleWare));

export default store;
