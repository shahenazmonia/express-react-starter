import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import users from "../../../utility/constants/user";

import { Col, Button, Table } from "antd";

const { Column } = Table;

interface IProps {
  paymentList: any;
  userType: string;
}

interface IState {}

class PaymentList extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { userType } = this.props;
    return (
      <Col span={24}>
        <Table
          size="middle"
          dataSource={this.props.paymentList}
          pagination={{ total: this.props.paymentList.len }}
        >
          <Column
            align="center"
            title={formatMessage({ id: "DATE" })}
            dataIndex="date"
            key="date"
          />
          <Column
            align="center"
            title={formatMessage({ id: "NAME_OR_NICK" })}
            dataIndex="name"
            key="name"
          />
          <Column
            align="center"
            title={formatMessage({ id: "SUBJECT" })}
            dataIndex="subject"
            key="subject"
          />
          <Column
            align="center"
            title={formatMessage({ id: "CLIENT_PAYMENT" })}
            dataIndex="clientPayment"
            key="clientPayment"
          />
          <Column
            align="center"
            title={formatMessage({ id: "PLATFORM_PAYMENT" })}
            dataIndex="platformPayment"
            key="platformPayment"
          />
          <Column
            align="center"
            title={formatMessage({ id: "BALANCE_REMAINING" })}
            dataIndex="balanceRemaining"
            key="balanceRemaining"
          />
          {userType === users.ADMIN && (
            <Column
              align="center"
              title="Action"
              key="action"
              render={(text, record) => (
                <span>
                  <Button>{formatMessage({ id: "BALANCE" })}</Button>
                  <Button>{formatMessage({ id: "REFUND" })}</Button>
                </span>
              )}
            />
          )}
        </Table>
      </Col>
    );
  }
}

export default injectIntl(PaymentList);
