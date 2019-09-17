import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Row, Col } from "antd";

interface IProps {}
interface IState {}

class TestResultDisplay extends Component<IProps & InjectedIntlProps, IState> {
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <Row>
        <Col>
          <h3>{formatMessage({ id: "TEST_RESULTS" })}</h3>
        </Col>
        <Col>Depresyon: %70</Col>
      </Row>
    );
  }
}

export default injectIntl(TestResultDisplay);
