import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Select } from "antd";

import { sendRoleForAdmin, sendRoleForClinic } from "../../../utility/constants/messageSendRole";

const Option = Select.Option;

interface IProps {
  role: string;
  selectedToUser: ({ toUsers: string }) => void;
}

class MessageRoleSelectBox extends Component<IProps & InjectedIntlProps, any> {
  handleChange(value) {
    this.props.selectedToUser({ toUsers: value });
  }
  render() {
    const { formatMessage } = this.props.intl;
    const { role } = this.props;
    return (
      <Select onChange={this.handleChange.bind(this)} style={{ width: "100%" }}>
        {role === "admin" &&
          sendRoleForAdmin.map(item => {
            return (
              <Option key={item.id.toString()} value={item.value}>
                {formatMessage({ id: item.text })}
              </Option>
            );
          })}
        {role === "clinic" &&
          sendRoleForClinic.map(item => {
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
export default injectIntl(MessageRoleSelectBox);
