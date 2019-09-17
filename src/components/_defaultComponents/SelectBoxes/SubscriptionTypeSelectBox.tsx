import React, { Component } from "react";

import { Select } from "antd";
import { injectIntl, InjectedIntlProps } from "react-intl";
const Option = Select.Option;

interface IProps {
  subscriptionList: Array<any>;
  value?: string;
  onChange?: any;
  disabled?: boolean;
}

class SubscriptionTypeSelectBox extends Component<IProps & InjectedIntlProps> {
  handleChange(value) {
    this.props.onChange(value);
  }
  render() {
    const { value, subscriptionList, disabled } = this.props;
    const { formatMessage } = this.props.intl;

    return (
      <Select
        placeholder={formatMessage({ id: "PICK_SUBSCRIPTION" })}
        value={value}
        disabled={disabled}
        onChange={this.handleChange.bind(this)}
        style={{ width: "100%" }}
      >
        {subscriptionList.map(item => {
          return (
            item.isActive && (
              <Option key={item.id} value={item.name}>
                {item.name}
              </Option>
            )
          );
        })}
      </Select>
    );
  }
}

export default injectIntl(SubscriptionTypeSelectBox);
