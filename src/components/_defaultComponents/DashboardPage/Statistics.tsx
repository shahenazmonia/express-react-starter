import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

//import * as sessionActions from "../../../store/actions/sessionActions";
import { Link } from "react-router-dom";

import { Card, Row, Col, Statistic, Popover } from "antd";

interface IProps {
  instantSessionNumber: number | undefined;
  registeredCounselorNumber: number | undefined;
  totalSessionNumber: number | undefined;
  user: any;
}
interface IState {
  value?: any;
}

class Statistics extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    // const { userType } = this.props;
    const { formatMessage } = this.props.intl;
    const { value } = this.state;
    const { instantSessionNumber, registeredCounselorNumber, totalSessionNumber } = this.props;
    const styledCard = {
      borderRadius: 3
    };
    const route = `/${this.props.user.roles[0]}`;
    return (
      <Row type="flex" justify="start" gutter={8}>
        <Col span={6}>
          <Link to={{ pathname: route + "/sessions/", state: { filter: { status: "live" } } }}>
            <Card style={styledCard}>
              <Statistic
                title={
                  formatMessage({ id: "NUMBER_OF_INSTANT_CALL" })
                  // <Row type="flex" justify="center">
                  //   <Col span={23}>{formatMessage({ id: "NUMBER_OF_INSTANT_CALL" })}</Col>
                  //   <Col span={1}>
                  //     <Popover content={<p>Şu anki canlı görüşme sayısı.</p>} title="canlı görüşme">
                  //       <Icon type="info-circle" />
                  //     </Popover>
                  //   </Col>
                  // </Row>
                }
                value={instantSessionNumber}
              />
            </Card>
          </Link>
        </Col>
        <Col span={6}>
          <Link to={route + "/counselorList/"}>
            <Card style={styledCard}>
              <Statistic
                title={formatMessage({ id: "NUMBER_OF_REGISTERED_COUNSELOR" })}
                value={registeredCounselorNumber}
              />
            </Card>
          </Link>
        </Col>
        <Col span={6}>
          <Card style={styledCard}>
            <Statistic title={formatMessage({ id: "NUMBER_OF_TOTAL_PAYMENTS" })} value={12312} />
          </Card>
        </Col>
        <Col span={6}>
          <Link to={{ pathname: route + "/sessions/", state: { filter: {} } }}>
            <Card style={styledCard}>
              <Statistic
                title={formatMessage({ id: "NUMBER_OF_TOTAL_SESSIONS" })}
                value={totalSessionNumber}
              />
            </Card>
          </Link>
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
)(injectIntl(Statistics));
