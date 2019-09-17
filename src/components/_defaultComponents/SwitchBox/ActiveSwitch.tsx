import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Switch } from "antd";

interface IProps {
  onChangeChecked: (checked: boolean) => void;
  checked: boolean;
  style?: any;
  disabled?: boolean;
}

interface IState {}

class ActiveSwitch extends Component<IProps & InjectedIntlProps, IState> {
  handleChange = checked => {
    this.props.onChangeChecked(checked);
  };

  render() {
    const { checked, style, disabled } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Switch
        checkedChildren={formatMessage({ id: "ACTIVE" })}
        unCheckedChildren={formatMessage({ id: "PASSIVE" })}
        checked={checked}
        style={style}
        disabled={disabled}
        onChange={checked => this.handleChange(checked)}
      />
    );
  }
}
export default injectIntl(ActiveSwitch);
