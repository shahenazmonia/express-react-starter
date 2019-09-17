import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import gender from "../../../utility/constants/gender";

import { Select } from "antd";
const Option = Select.Option;

interface IProps {
  value?: string;
  placeholder?: string;
  onChange?: any;
  disabled?: boolean;
}

class GenderBox extends Component<IProps & InjectedIntlProps, any> {
  handleChange(value) {
    this.props.onChange(value);
  }
  render() {
    const { formatMessage } = this.props.intl;
    const { placeholder, value, disabled } = this.props;
    return (
      <Select
        onChange={this.handleChange.bind(this)}
        placeholder={placeholder}
        value={value}
        disabled={disabled}
        style={{ width: "100%" }}
      >
        {gender.map(item => {
          return (
            <Option key={item.value} value={item.value}>
              {formatMessage({ id: item.text })}
            </Option>
          );
        })}
      </Select>
    );
  }
}
export default injectIntl(GenderBox);
