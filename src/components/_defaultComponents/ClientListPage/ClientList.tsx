import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { paginationType } from "../../../types/paginationTypes";

import ClientTable from "./ClientTable";

import { Row, Col } from "antd";

interface IProps {
  clientList: Array<object>;
  pagination: paginationType;
  onChangeCurrent: ({ current: number }) => void;
}

interface IState {}

class ClientList extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { clientList: [] };
  }

  componentDidMount() {}

  render() {
    const { clientList, pagination, onChangeCurrent } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Row type="flex" justify="center">
        <Col span={16}>
          {clientList && (
            <ClientTable
              clientList={clientList}
              onChangeCurrent={onChangeCurrent}
              pagination={pagination}
            />
          )}
        </Col>
      </Row>
    );
  }
}

export default connect(
  null,
  null
)(injectIntl(ClientList));
