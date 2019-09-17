import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import degree from "../../../utility/constants/degree";

import { Select } from "antd";
const Option = Select.Option;

interface IProps {
  defaultValue?: string;
  onChange?: any;
  disabled?: boolean;
  value?: string;
}

class DegreeSelectBox extends Component<IProps & InjectedIntlProps> {
  handleChange(value) {
    this.props.onChange(value);
  }
  render() {
    const { formatMessage } = this.props.intl;
    const { disabled, defaultValue, value } = this.props;
    return (
      <Select
        disabled={disabled}
        onChange={this.handleChange.bind(this)}
        defaultValue={defaultValue}
        value={value}
        style={{ width: "100%" }}
      >
        {degree.map(item => {
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
export default injectIntl(DegreeSelectBox);
