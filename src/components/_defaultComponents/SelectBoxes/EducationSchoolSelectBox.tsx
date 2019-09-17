import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Select } from "antd";

import Universities from "../../../utility/constants/universities";

const Option = Select.Option;

interface IProps {
  value: any;
  onChange?: any;
  disabled?: boolean;
}

class EducationSchoolSelectBox extends Component<IProps & InjectedIntlProps, any> {
  handleChange = value => {
    this.props.onChange(value);
  };
  render() {
    const { formatMessage } = this.props.intl;
    const { disabled } = this.props;
    return (
      <Select
        disabled={disabled}
        value={this.props.value}
        placeholder={formatMessage({ id: "CHOOSE_EDUCATION_SCHOOL" })}
        onChange={this.handleChange}
        style={{ width: "100%" }}
      >
        {Universities.map(item => {
          return (
            <Option key={item.value.toString()} value={item.title}>
              {item.title}
            </Option>
          );
        })}
      </Select>
    );
  }
}
export default injectIntl(EducationSchoolSelectBox);
