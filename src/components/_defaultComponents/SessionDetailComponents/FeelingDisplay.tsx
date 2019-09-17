import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { Icon } from "antd";

interface IProps {
  feeling: string;
}
interface IState {}

class FeelingDisplay extends Component<IProps & InjectedIntlProps, IState> {
  render() {
    const { formatMessage } = this.props.intl;
    const { feeling = "meh" } = this.props;
    return <Icon style={{ fontSize: 32 }} type={this.props.feeling} />;
  }
}

export default injectIntl(FeelingDisplay);
