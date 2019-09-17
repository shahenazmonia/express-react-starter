import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

interface IProps {}
interface IState {}

class MessageDisplay extends Component<IProps & InjectedIntlProps, IState> {
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <h3>{formatMessage({ id: "CLIENT_MESSAGE" })}</h3>
        <p>message</p>
      </div>
    );
  }
}

export default injectIntl(MessageDisplay);
