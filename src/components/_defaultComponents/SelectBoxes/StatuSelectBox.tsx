import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { Select } from "antd";
const Option = Select.Option;

interface IProps {
  defaultValue?: String;
  onChange?: any;
  statusList?: Array<any>;
  filter?: any;
}

class StatuSelectBox extends Component<IProps & InjectedIntlProps, any> {
  handleChange(value) {
    this.props.onChange(value);
  }
  render() {
    const { formatMessage } = this.props.intl;
    const { statusList } = this.props;
    const statusValues = {
      live: "LIVE",
      pending: "PENDING",
      completed: "COMPLETED",
      canceled: "CANCELED"
    };
    const selectedValue = statusValues[(this.props.filter || {}).status];
    return (
      <Select
        allowClear
        onChange={this.handleChange.bind(this)}
        placeholder={formatMessage({ id: "SELECT_STATUS" })}
        defaultValue={this.props.defaultValue}
        style={{ width: "100%" }}
        value={selectedValue && formatMessage({ id: selectedValue })}
      >
        {statusList &&
          statusList.map(statu => {
            return (
              <Option key={statu.id} value={statu.value}>
                {formatMessage({ id: statu.text })}
              </Option>
            );
          })}
      </Select>
    );
  }
}
export default injectIntl(StatuSelectBox);
