import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import * as sessionActions from "../../../store/actions/sessionActions";

import Session from "../../_defaultComponents/SessionPage/Session";
import history from "../../../_core/history";

interface IProps {
  user: any;
  getSessionList: (params: any) => any;
  getClientsOfSessions: (params: any) => any;
}
interface IState {
  sessionFilter: Object;
  sessionList: Array<object>;
  clientList: Array<object>;
  totalSessions: number;
}

class SessionPage extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      sessionFilter: { counselorId: props.user._id, page: 1 },
      sessionList: [],
      clientList: [],
      totalSessions: 0
    };
  }

  componentDidMount() {
    this.fetchLists();
  }

  handlePagination = ({ page }) => {
    const { sessionFilter } = this.state;
    this.setState({ sessionFilter: { ...sessionFilter, page } }, () => this.fetchLists());
  };

  changeFilter = filter => {
    const { sessionFilter } = this.state;
    const newFilter = { ...sessionFilter, ...filter };
    this.setState({ sessionFilter: newFilter }, () => this.fetchLists());
  };

  fetchLists = async () => {
    try {
      const { sessionFilter } = this.state;
      const { user, getSessionList, getClientsOfSessions } = this.props;
      const promises = [
        getSessionList(sessionFilter),
        getClientsOfSessions({ counselorId: user._id, page: 1 })
      ];
      const result = await Promise.all(promises);
      this.setState({
        sessionList: result[0].action.payload.data.sessionList,
        totalSessions: result[0].action.payload.data.totalSessions,
        clientList: result[1].action.payload.data
      });
    } catch (err) {
      // console.log(err);
    }
  };

  render() {
    const { sessionList, clientList, totalSessions } = this.state;
    const { formatMessage } = this.props.intl;

    return (
      <Session
        userType="counselor"
        sessionList={sessionList}
        clientList={clientList}
        changeFilter={this.changeFilter}
        totalSessions={totalSessions}
        handlePagination={this.handlePagination}
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
    getSessionList: params => dispatch(sessionActions.getSessionList(params)),
    getClientsOfSessions: params => dispatch(sessionActions.getClientsOfSessions(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(SessionPage));
