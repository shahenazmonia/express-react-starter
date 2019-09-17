import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Select } from "antd";
import _ from "lodash";

const Option = Select.Option;

interface IProps {
  options: Array<any>;
  value?: any;
  onChange?: any;
  disabled?: boolean;
  usedCategories?: any;
  language: string;
}

class ServiceSelectBox extends Component<IProps & InjectedIntlProps, any> {
  handleChange(value) {
    const { options } = this.props;
    let item = _.find(options, { _id: value });
    this.props.onChange(item);
  }
  render() {
    const { disabled, usedCategories, options, language, value } = this.props;
    return (
      <Select
        disabled={disabled}
        value={
          (value && language === "tr" && value.mainCategory + " / " + value.name_TR) ||
          (value && language === "tr" && value.mainCategory + " / " + value.name_EN)
        }
        onChange={this.handleChange.bind(this)}
        style={{ width: "100%" }}
      >
        {options.map(item => {
          if (_.findIndex(usedCategories, { _id: item._id }) === -1 && item.isActive)
            return (
              <Option key={item.value} value={item._id}>
                {language === "tr" && item.mainCategory + " / " + item.name_TR}
                {language === "en" && item.mainCategory + " / " + item.name_EN}
              </Option>
            );
          return null;
        })}
      </Select>
    );
  }
}

export default injectIntl(ServiceSelectBox);
