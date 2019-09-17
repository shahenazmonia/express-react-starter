import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

interface IProps {
  preSessionMessage: string;
  clientNickname: string;
}
interface IState {}

class PreSessionInformation extends Component<IProps & InjectedIntlProps, IState> {
  render() {
    const { formatMessage } = this.props.intl;
    const { preSessionMessage, clientNickname } = this.props;
    return (
      <div>
        <h3>{formatMessage({ id: "CLIENT_NICKNAME" })}</h3>
        <p>{clientNickname}</p>
        <h3>{formatMessage({ id: "PRESESSION_MESSAGE" })}</h3>
        <p>{preSessionMessage}</p>
      </div>
    );
  }
}

export default injectIntl(PreSessionInformation);
