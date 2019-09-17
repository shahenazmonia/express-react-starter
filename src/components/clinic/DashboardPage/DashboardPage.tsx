import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import Dashboard from "../../_defaultComponents/DashboardPage/Dashboard";

interface IProps {
  // userType: string;
}
interface IState {}

class DashboardPage extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    //  const { userType } = this.props;
    const { formatMessage } = this.props.intl;
    return <Dashboard />;
  }
}

const dispatchToProps = dispatch => {
  return {
    //  getSessionList: params => dispatch(dashboardActions.(params))
  };
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(DashboardPage));
