import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import serviceCategory from "../../../utility/constants/serviceCategory";

import { Select } from "antd";

const Option = Select.Option;

interface IProps {
  value?: Array<string>;
  mode?: string;
  onChange?: any;
  disabled?: boolean;
}

class ServiceCategorySelectBox extends Component<IProps & InjectedIntlProps> {
  handleChange = value => {
    this.props.onChange(value);
  };
  render() {
    const { formatMessage } = this.props.intl;
    const { value, mode, disabled = false } = this.props;
    return (
      <Select
        disabled={disabled}
        value={value}
        mode={mode}
        onChange={this.handleChange}
        style={{ width: "100%" }}
      >
        {serviceCategory.map(item => {
          return (
            <Option key={item.id.toString()} value={item.value}>
              {formatMessage({ id: item.text })}
            </Option>
          );
        })}
      </Select>
    );
  }
}
export default injectIntl(ServiceCategorySelectBox);
