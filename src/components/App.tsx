import React, { Component } from "react";
import { Provider, connect } from "react-redux";
import { ThemeProvider } from "styled-components";

import { IntlProvider } from "react-intl";
import Routes from "./Routes/Routes";
import "antd/dist/antd.css";
import messages from "../utility/locale/messages";
import theme from "../styles/index";

class LanguageProvider extends Component<{ language: string }> {
  render() {
    const { language } = this.props;
    return (
      <ThemeProvider theme={theme}>
        <IntlProvider locale={language} messages={messages[language]} key={language}>
          <Routes />
        </IntlProvider>
      </ThemeProvider>
    );
  }
}

class App extends Component<any> {
  render() {
    return (
      <Provider store={this.props.store}>
        <LanguageProviderX />
      </Provider>
    );
  }
}

function stateToProps(state) {
  return {
    language: state.locale.language
  };
}
const LanguageProviderX = connect(stateToProps)(LanguageProvider);

export default App;
