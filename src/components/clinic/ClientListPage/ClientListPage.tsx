import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import * as userActions from "../../../store/actions/userActions";
import ClientList from "../../_defaultComponents/ClientListPage/ClientList";
import { paginationType } from "../../../types/paginationTypes";

interface IProps {
  user: any;
  getClientListForClinic(params: { clinicId: string; current: number }): any;
}
interface IState {
  clientList: Array<object>;
  pagination: paginationType;
}

class ClientListPage extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { clientList: [], pagination: { current: 1, total: undefined, pageSize: 10 } };
  }

  componentDidMount() {
    this.fetchClientList();
  }

  fetchClientList = async () => {
    const { user } = this.props;
    const { pagination } = this.state;
    try {
      const data = (await this.props.getClientListForClinic({
        clinicId: user._id,
        current: pagination.current
      })).action.payload.data;
      this.setState({ clientList: data.clientList });
      !pagination.total && this.setState({ pagination: data.pagination });
    } catch (err) {}
  };

  onChangeCurrent = async ({ current }) => {
    const { pagination } = this.state;
    this.setState({ pagination: { ...pagination, current } }, () => {
      this.fetchClientList();
    });
  };

  render() {
    const { clientList, pagination } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <ClientList
        clientList={clientList}
        pagination={pagination}
        onChangeCurrent={this.onChangeCurrent}
      />
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user
  };
};

const dispatchToProps = dispatch => {
  return {
    getClientListForClinic: params => dispatch(userActions.getClientListForClinic(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(ClientListPage));
