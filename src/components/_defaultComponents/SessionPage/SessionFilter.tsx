import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import users from "../../../utility/constants/user";

import UserSelectBox from "../SelectBoxes/UserSelectBox";
import StatuSelectBox from "../SelectBoxes/StatuSelectBox";
import sessionStatus from "../../../utility/constants/sessionStatus";

import { Row, Col, Select } from "antd";

interface IProps {
  userType: string;
  onCounselorChange: (counselor: any) => any;
  onClientChange: (client: any) => any;
  onStatusChange: (status: any) => any;
  counselorList?: Array<any>;
  clientList?: Array<any>;
  filter?: any;
}

interface IState {}

class SessionFilter extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { counselorList, clientList, userType, filter } = this.props;
    return (
      <Row type="flex" justify="end">
        {userType !== users.COUNSELOR && (
          <Col span={12}>
            <UserSelectBox
              userList={counselorList}
              onChange={value => {
                this.props.onCounselorChange(value);
              }}
            />
          </Col>
        )}
        {userType === users.COUNSELOR && (
          <Col span={12}>
            <UserSelectBox
              userList={clientList}
              onChange={value => {
                this.props.onClientChange(value);
              }}
            />
          </Col>
        )}
        <Col span={12}>
          <StatuSelectBox
            filter={filter}
            onChange={value => this.props.onStatusChange(value)}
            statusList={sessionStatus}
          />
        </Col>
      </Row>
    );
  }
}

export default injectIntl(SessionFilter);
