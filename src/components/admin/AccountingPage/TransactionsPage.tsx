import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import * as accountingActions from "../../../store/actions/accountingActions";
import users from "../../../utility/constants/user";

import Transaction from "../../_defaultComponents/AccountingComponents/Transaction";

interface IProps {}

interface IState {}

class TransactionsPage extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return <Transaction />;
  }
}

const dispatchToProps = dispatch => {
  return {};
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(TransactionsPage));
