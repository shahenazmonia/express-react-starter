import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/App";
import { saveState } from "./_core/localStorage";
import store from "./store/createStore";

import { addLocaleData } from "react-intl";
import en from "react-intl/locale-data/en";
import tr from "react-intl/locale-data/tr";

addLocaleData(en);
addLocaleData(tr);

store.subscribe(() => {
  saveState({
    user: store.getState().user,
    locale: store.getState().locale,
    sessionCart: store.getState().sessionCart,
    jitsi: store.getState().jitsi
  });
});

ReactDOM.render(<App store={store} />, document.getElementById("root"));
