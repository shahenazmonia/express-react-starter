import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import languageOptions from "../../../utility/constants/language";

import { Select } from "antd";

const Option = Select.Option;

interface IProps {
  defaultValue?: String;
  onChange?: Function;
  style?: object;
  onLanguageChange: any;
}

const options = languageOptions;

class LanguageSelectBox extends Component<IProps & InjectedIntlProps, any> {
  handleChange(value) {
    // this.props.onChange(value);
  }
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <Select onChange={this.props.onLanguageChange} defaultValue={this.props.defaultValue}>
        {options.map(item => {
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
export default injectIntl(LanguageSelectBox);
