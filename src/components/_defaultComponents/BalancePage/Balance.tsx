import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import * as balanceActions from "../../../store/actions/balanceActions";
import PaymentFilter from "./PaymentFilter";
import PaymentList from "./PaymentList";

import { Row, Col, Button } from "antd";

interface IProps {
  userType: string;
  paymentList: Array<object>;
  totalPayments: number;
}

interface IState {}

class BalancePage extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { paymentList: [], totalPayments: 0 };
  }

  componentDidMount() {}

  render() {
    const { paymentList, totalPayments } = this.props;
    const { userType } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Row type="flex" justify="center">
        <Col span={18}>
          <Row style={{ marginBottom: 20 }} type="flex" justify="space-between">
            <Col span={16}>
              <PaymentFilter userType={userType} />
            </Col>
            <Col span={8}>
              <Row type="flex" justify="end">
                <Button>{formatMessage({ id: "FILTER" })} </Button>
                {userType === "clinicalAdmin" && (
                  <Button>{formatMessage({ id: "ADD_PAYMENT" })} </Button>
                )}
              </Row>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <PaymentList userType={userType} paymentList={paymentList} />
          </Row>
        </Col>
      </Row>
    );
  }
}

export default connect(
  null,
  null
)(injectIntl(BalancePage));
