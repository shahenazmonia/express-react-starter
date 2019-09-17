import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import * as balanceActions from "../../../store/actions/balanceActions";

import Balance from "../../_defaultComponents/BalancePage/Balance";

import { Row, Col, Button } from "antd";

interface IProps {
  getPaymentList: any;
}

interface IState {
  paymentList: Array<object>;
  totalPayments: number;
}

class BalancePage extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { paymentList: [], totalPayments: 0 };
  }

  componentDidMount() {
    let params = { userType: "clnAdmin", userId: 2 };
    this.props.getPaymentList(params).then(result => {
      const data = result.value.data;
      this.setState({ paymentList: data.list, totalPayments: data.total });
    });
  }

  render() {
    const { paymentList, totalPayments } = this.state;
    const { formatMessage } = this.props.intl;
    return <Balance userType="clnAdmin" paymentList={paymentList} totalPayments={totalPayments} />;
  }
}

const dispatchToProps = dispatch => {
  return {
    getPaymentList: params => dispatch(balanceActions.getPaymentList(params))
  };
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(BalancePage));
