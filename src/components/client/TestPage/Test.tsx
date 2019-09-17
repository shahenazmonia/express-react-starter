import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";

import history from "../../../_core/history";
import SessionSubCategory from "../../_defaultComponents/SessionSubCategory";

import { Row, Col } from "antd";

interface IProps {}

interface IState {}

class Test extends Component<IProps & InjectedIntlProps, IState> {
  onBoxClick(category) {
    let path = "/test/";
    path = path + category.value;
    history.push(path);
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <Row type="flex" justify="center">
          <Col span={24}>
            <h2 style={{ textAlign: "center" }}>
              {formatMessage({ id: "TEST_WHICH_TEST_HEADER" })}
            </h2>
          </Col>
          <Col span={24}>
            {
              //<SessionSubCategory onBoxClick={this.onBoxClick.bind(this)} />
            }
          </Col>
        </Row>
      </div>
    );
  }
}

const dispatchToProps = dispatch => {
  return {};
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(Test));
