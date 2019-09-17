import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import _ from "lodash";
import * as sessionActions from "../../../store/actions/sessionActions";
import users from "../../../utility/constants/user";

import Session from "../../_defaultComponents/SessionPage/Session";
interface IProps {
  getSessionList: (params: any) => any;
  getCounselorsOfSessions: (params: any) => any;
  location?: any;
}
interface IState {
  sessionFilter: Object;
  sessionList: Array<object>;
  counselorList: Array<any>;
  totalSessions: number;
}

class SessionPage extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      sessionFilter: { page: 1 },
      sessionList: [],
      counselorList: [],
      totalSessions: 0
    };
  }

  componentDidMount() {
    this.fetchLists();
  }

  static defaultProps = {
    location: {}
  };

  componentDidUpdate(prevProps, prevState) {
    if (!_.isEmpty(prevProps.location.state) && _.isEmpty(this.props.location.state)) {
      this.setState({ sessionFilter: { page: 1 } }, () => this.fetchLists());
    }
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
      const { getSessionList, getCounselorsOfSessions } = this.props;
      const promises = [getSessionList(sessionFilter), getCounselorsOfSessions({})];
      const result = await Promise.all(promises);
      this.setState({
        sessionList: result[0].action.payload.data.sessionList,
        totalSessions: result[0].action.payload.data.totalSessions,
        counselorList: result[1].action.payload.data
      });
    } catch (err) {
      // console.log(err);
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { sessionList, counselorList, totalSessions } = this.state;
    return (
      <Session
        userType={users.ADMIN}
        sessionList={sessionList}
        counselorList={counselorList}
        changeFilter={this.changeFilter}
        totalSessions={totalSessions}
        handlePagination={this.handlePagination}
      />
    );
  }
}

const dispatchToProps = dispatch => {
  return {
    getSessionList: params => dispatch(sessionActions.getSessionList(params)),
    getCounselorsOfSessions: params => dispatch(sessionActions.getCounselorsOfSessions(params))
  };
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(SessionPage));
