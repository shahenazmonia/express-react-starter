import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import moment from "moment";

import * as sessionActions from "../../../store/actions/sessionActions";
import * as counselorActions from "../../../store/actions/counselorActions";
import Calendar from "./Calendar";
import Statistics from "./Statistics";

import { Row, Col } from "antd";

interface IProps {
  //userType: string;
  user: any;
  getInstantSessions: (params: { userId: string; role: string }) => any;
  getRegisteredCounselorNumber: (params: { userId: string; role: string }) => any;
  getTotalSessionNumber: (params: { userId: string; role: string }) => any;
  getSessionNumberForDate: (params: { currentDate: string; userId: string; role: string }) => any;
}
interface IState {
  instantSessionNumber: number | undefined;
  registeredCounselorNumber: number | undefined;
  totalSessionNumber: number | undefined;
  sessionNumberForDate: Array<Object> | [];
}

class DashboardPage extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      instantSessionNumber: undefined,
      registeredCounselorNumber: undefined,
      totalSessionNumber: undefined,
      sessionNumberForDate: []
    };
  }

  componentDidMount() {
    this.getInstantSessionNumber();
    this.getRegisteredCounselorNumber();
    this.getTotalSessionNumber();
    this.getSessionNumberForDate({ currentDate: moment.utc().format() });
  }

  getInstantSessionNumber = async () => {
    const { user } = this.props;
    try {
      const instantSessionNumber = (await this.props.getInstantSessions({
        userId: user._id,
        role: user.roles[0]
      })).action.payload.data.instantSessionNumber;
      this.setState({ instantSessionNumber });
    } catch (err) {}
  };

  getRegisteredCounselorNumber = async () => {
    const { user } = this.props;
    try {
      const registeredCounselorNumber = (await this.props.getRegisteredCounselorNumber({
        userId: user._id,
        role: user.roles[0]
      })).action.payload.data.registeredCounselorNumber;
      this.setState({ registeredCounselorNumber });
    } catch (err) {}
  };

  getTotalSessionNumber = async () => {
    const { user } = this.props;
    try {
      const totalSessionNumber = (await this.props.getTotalSessionNumber({
        userId: user._id,
        role: user.roles[0]
      })).action.payload.data.totalSessionNumber;
      this.setState({ totalSessionNumber });
    } catch (err) {}
  };

  getSessionNumberForDate = async ({ currentDate }) => {
    const { user } = this.props;
    try {
      const sessionNumberForDate = (await this.props.getSessionNumberForDate({
        currentDate,
        userId: user._id,
        role: user.roles[0]
      })).action.payload.data.sessionNumberForDate;
      this.setState({ sessionNumberForDate });
    } catch (err) {}
  };

  render() {
    //const { userType } = this.props;
    const { formatMessage } = this.props.intl;
    const {
      instantSessionNumber,
      registeredCounselorNumber,
      totalSessionNumber,
      sessionNumberForDate
    } = this.state;
    return (
      <Row type="flex" justify="center">
        <Col span={18}>
          <Row>
            <Col>
              <Statistics
                instantSessionNumber={instantSessionNumber}
                registeredCounselorNumber={registeredCounselorNumber}
                totalSessionNumber={totalSessionNumber}
              />
            </Col>
          </Row>
          <Row>
            <Col>
              <Calendar
                sessionNumberForDate={sessionNumberForDate}
                getSessionNumberForDate={this.getSessionNumberForDate}
              />
            </Col>
          </Row>
        </Col>
      </Row>
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
    //  getSessionList: params => dispatch(dashboardActions.(params))
    getInstantSessions: params => dispatch(sessionActions.getInstantSessions(params)),
    getRegisteredCounselorNumber: params =>
      dispatch(counselorActions.getRegisteredCounselorNumber(params)),
    getTotalSessionNumber: params => dispatch(sessionActions.getTotalSessionNumber(params)),
    getSessionNumberForDate: params => dispatch(sessionActions.getSessionNumberForDate(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(DashboardPage));
