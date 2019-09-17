import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import _ from "lodash";
import moment from "moment";

import { Calendar, Row, Col } from "antd";
import styled from "styled-components";
//import * as sessionActions from "../../../store/actions/sessionActions";
import { Link } from "react-router-dom";

const StyledCalendar = styled(Calendar)`
  margin-top: 50px;
  .ant-radio-button-wrapper {
    display: none;
  }
`;

interface IProps {
  //userType: string;
  sessionNumberForDate: Array<{ date: string; sessionNumber: number }> | Array<any>;
  getSessionNumberForDate: ({ currentDate: string }) => void;
  user: any;
}
interface IState {
  value?: any;
}

class CalendarComponent extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { value: [] };
  }

  componentDidMount() {}

  onPanelChange = (value, mode) => {
    this.props.getSessionNumberForDate({ currentDate: moment.utc(value).format() });
  };

  dateCellRender = value => {
    const { sessionNumberForDate } = this.props;
    const route = `/${this.props.user.roles[0]}/sessions/`;

    let item = _.find(sessionNumberForDate, { date: moment(value).format("DD/MM/YYYY") });
    return (
      <Link
        to={{
          pathname: item && item.sessionNumber ? route : undefined,
          state: {
            filter: {
              date: moment(value)
                .utc()
                .format()
            }
          }
        }}
      >
        <Row
          type="flex"
          justify="center"
          style={{
            maxWidth: 100,
            height: 50,
            backgroundColor: item && "rgb(24, 144, 255)",
            borderRadius: 25
          }}
        >
          <Col style={{ alignItems: "center", justifyContent: "center", display: "flex" }}>
            {item && <span style={{ fontSize: 25, color: "white" }}>{item.sessionNumber}</span>}
            {!item && <span style={{ fontSize: 25, color: item && "white" }} />}
          </Col>
        </Row>
      </Link>
    );
  };

  render() {
    // const { userType } = this.props;
    const { formatMessage } = this.props.intl;
    const { value } = this.state;
    return (
      <Row type="flex" justify="center">
        <Col>
          <StyledCalendar
            locale={"TR"}
            onPanelChange={this.onPanelChange}
            dateCellRender={this.dateCellRender}
          />
        </Col>
      </Row>
    );
  }
}

const dispatchToProps = dispatch => {
  return {
    //  getSessionList: params => dispatch(dashboardActions.(params))
  };
};

const stateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(CalendarComponent));
