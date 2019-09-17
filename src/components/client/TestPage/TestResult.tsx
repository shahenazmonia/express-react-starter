import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import * as testActions from "../../../store/actions/testActions";
import { Row, Col } from "antd";

interface IProps {
  getTestResult: any;
  resultId: any;
}

interface IState {
  result: any;
}

class TestResult extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { result: {} };
  }
  componentDidMount() {
    const resultId = this.props.resultId;
    this.props.getTestResult(resultId).then(result => {
      this.setState({ result: result.value.data });
    });
  }
  render() {
    const { result } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <Row type="flex" justify="center">
        <Col span={18}>
          <Row type="flex" justify="center">
            <Col span={24}>
              <h2 style={{ textAlign: "center" }}>{formatMessage({ id: "TEST_RESULT" })}</h2>
            </Col>
            <Col span={4}>
              <div style={{ backgroundColor: "orange", textAlign: "center", fontSize: "40px" }}>
                {" "}
                {result.result + "%"}
              </div>
            </Col>
          </Row>
          <Row type="flex" justify="center" style={{ marginTop: "50px" }}>
            <Col span={24}>
              <h2 style={{ textAlign: "center" }}>
                {formatMessage({ id: "TEST_WHAT_DOES_IT_MEAN_HEADER" })}
              </h2>
            </Col>
            <Col span={24}>{"You need a better lifde"}</Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
const dispatchToProps = dispatch => {
  return {
    getTestResult: id => dispatch(testActions.getTestResult(id))
  };
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(TestResult));
