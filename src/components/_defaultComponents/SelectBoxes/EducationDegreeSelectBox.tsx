import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import EducationType from "../../../utility/constants/educationType";

import { Select } from "antd";
const Option = Select.Option;

interface IProps {
  value?: String;
  onChange?: any;
  disabled?: boolean;
}

class EducationDegreeSelectBox extends Component<IProps & InjectedIntlProps, any> {
  handleChange = value => {
    this.props.onChange(value);
  };
  render() {
    const { formatMessage } = this.props.intl;
    const { disabled, value } = this.props;
    return (
      <Select
        disabled={disabled}
        value={value}
        placeholder={formatMessage({ id: "CHOOSE_EDUCATION_TYPE" })}
        onChange={this.handleChange}
        style={{ width: "100%", fontFamily: "Arcon,Harabara!important;" }}
      >
        {EducationType.map(item => {
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
export default injectIntl(EducationDegreeSelectBox);
