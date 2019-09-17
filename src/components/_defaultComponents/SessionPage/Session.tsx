import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

//import * as sessionActions from "../../../store/actions/sessionActions";
import users from "../../../utility/constants/user";
import SessionFilter from "./SessionFilter";
import SessionList from "./SessionList";
import history from "../../../_core/history";

import { Row, Col } from "antd";

interface IProps {
  language: string;
  userType: string;
  sessionList: Array<object>;
  counselorList?: Array<any>;
  clientList?: Array<any>;
  changeFilter: (filter: Object) => any;
  handlePagination?: any;
  totalSessions: number;
}
interface IState {
  filter: any;
}

class SessionPage extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      filter: undefined
    };
  }

  componentDidMount() {
    const {
      location: { state }
    } = history;
    if (state) {
      this.props.changeFilter({ ...state.filter });
      this.setState({ filter: { ...state.filter } });
    }
  }

  onCounselorChange = counselorId => {
    this.props.changeFilter({ counselorId });
  };

  onClientChange = clientId => {
    this.props.changeFilter({ clientId });
  };

  onStatusChange = status => {
    this.props.changeFilter({ status });
    this.setState({ filter: { status } });
  };

  render() {
    const { sessionList, totalSessions } = this.props;
    const { userType, counselorList, clientList, language } = this.props;
    const { formatMessage } = this.props.intl;
    const isCounselor = userType === users.COUNSELOR ? true : false;
    return (
      <Row type="flex" justify="center">
        <Col span={16}>
          <Row style={{ marginBottom: 20, marginTop: 30 }} type="flex" justify="space-between">
            <Col span={12}>
              <h2>{formatMessage({ id: "SESSION_LIST" })}</h2>
            </Col>
            <Col span={12}>
              <SessionFilter
                userType={userType}
                counselorList={counselorList}
                clientList={clientList}
                onCounselorChange={this.onCounselorChange}
                onClientChange={this.onClientChange}
                onStatusChange={this.onStatusChange}
                filter={this.state.filter}
              />
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <SessionList
              userType={userType}
              sessionList={sessionList}
              totalSessions={totalSessions}
              isCounselor={isCounselor}
              language={language}
              handlePagination={this.props.handlePagination}
            />
          </Row>
          <Row>
            <Col span={6} style={{ marginTop: -35 }}>
              <h3>{formatMessage({ id: "TOTAL" }) + totalSessions}</h3>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

const stateToProps = state => {
  return {
    language: state.locale.language
  };
};

export default connect(
  stateToProps,
  null
)(injectIntl(SessionPage));
