import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

interface IProps {
  epikriz: string;
}
interface IState {}

class EpikrizDisplay extends Component<IProps & InjectedIntlProps, IState> {
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <h3>{formatMessage({ id: "EPIKRIZ" })}</h3>
        <p>{this.props.epikriz}</p>
      </div>
    );
  }
}

export default injectIntl(EpikrizDisplay);
