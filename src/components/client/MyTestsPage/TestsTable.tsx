import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";

import { Table, Button } from "antd";
const { Column } = Table;

interface IProps {
  myTests: any;
}

interface IState {}

class TestsTable extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <Table
        size="middle"
        dataSource={this.props.myTests}
        pagination={{ total: this.props.myTests.len }}
      >
        <Column align="center" title="SUBJECT" dataIndex="subject" key="subject" />
        <Column align="center" title="DATE" dataIndex="date" key="date" />
        <Column align="center" title="RESULT" dataIndex="result" key="result" />
        <Column
          align="center"
          title="ACTION"
          key="action"
          render={(text, record) => (
            <span>
              <Button>{formatMessage({ id: "DETAIL" })}</Button>
            </span>
          )}
        />
      </Table>
    );
  }
}

export default injectIntl(TestsTable);
