import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import * as testActions from "../../../store/actions/testActions";

import TestsTable from "./TestsTable";

import { Row, Col } from "antd";

interface IProps {
  getPastTests: any;
}

interface IState {
  myTests: Array<object>;
}

class MyTestsPage extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { myTests: [] };
  }

  componentDidMount() {
    this.props.getPastTests().then(result => {
      this.setState({ myTests: result.value.data });
    });
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { myTests } = this.state;
    return (
      <div>
        <Row type="flex" justify="center">
          <Col span={18}>
            <h2 style={{ textAlign: "center" }}>{formatMessage({ id: "MY_TESTS" })}</h2>
          </Col>
          <Col span={18}>
            <TestsTable myTests={myTests} />
          </Col>
        </Row>
      </div>
    );
  }
}

const dispatchToProps = dispatch => {
  return {
    getPastTests: params => dispatch(testActions.getPastTests(params))
  };
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(MyTestsPage));
