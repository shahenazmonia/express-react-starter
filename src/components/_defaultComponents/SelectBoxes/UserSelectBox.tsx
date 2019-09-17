import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { Select } from "antd";
const Option = Select.Option;

interface IProps {
  userList?: Array<any>;
  defaultValue?: String;
  onChange?: any;
}

class UserSelectBox extends Component<IProps & InjectedIntlProps> {
  handleChange(value) {
    // console.log(value);
    this.props.onChange(value);
  }
  render() {
    const { formatMessage } = this.props.intl;
    const { userList } = this.props;
    // console.log(userList);
    return (
      <Select
        allowClear
        onChange={this.handleChange.bind(this)}
        placeholder={formatMessage({ id: "SELECT" })}
        defaultValue={this.props.defaultValue}
        style={{ width: "100%" }}
      >
        {userList &&
          userList.map(user => {
            return (
              <Option key={user._id} value={user._id}>
                {user.fullname ? formatMessage({ id: user.fullname }) : user.uniqClientId}
              </Option>
            );
          })}
      </Select>
    );
  }
}
export default injectIntl(UserSelectBox);
