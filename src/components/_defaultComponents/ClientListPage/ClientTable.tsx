import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import moment from "moment";

import history from "../../../_core/history";
import { paginationType } from "../../../types/paginationTypes";

import { Col, Button, Table } from "antd";

const { Column } = Table;

interface IProps {
  user: any;
  clientList: any;
  pagination: paginationType;
  onChangeCurrent: ({ current: number }) => void;
}

interface IState {}

class ClientTable extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
  }

  handleTableChange = pagination => {
    this.props.onChangeCurrent({ current: pagination.current });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { clientList, pagination } = this.props;
    return (
      <Table
        size="middle"
        bordered
        pagination={pagination}
        onChange={this.handleTableChange}
        dataSource={[
          ...Array.from({ length: (pagination.current - 1) * pagination.pageSize }),
          ...clientList
        ]}
      >
        <Column
          width={150}
          align="center"
          title="Müşteri No"
          dataIndex="uniqClientId"
          key="uniqClientId"
        />
        <Column
          width={150}
          align="center"
          title="Kayıt Tarihi"
          dataIndex={"registerDate"}
          key={"registerDate"}
        />
        <Column
          width={150}
          align="center"
          title="Görüşme Sayısı"
          dataIndex="sessionCount"
          key="sessionCount"
          render={(text, record: any) => (
            <span>{record.sessionCount ? record.sessionCount : "-"}</span>
          )}
        />
        <Column
          width={150}
          align="center"
          title="Bakiye"
          dataIndex="balance"
          key="balance"
          render={(text, record: any) => (
            <span>
              {record.balance && record.balance}
              {!record.balance && "-"}
            </span>
          )}
        />
        <Column
          width={150}
          align="center"
          title="Son Görüşme"
          dataIndex="lastSessionDate"
          key="lastSessionDate"
          render={(text, record: any) => (
            <span>
              {record.lastSessionDate ? moment(record.lastSessionDate).format("DD/MM/YYYY") : "-"}
            </span>
          )}
        />
        <Column
          width={150}
          align="center"
          title="Durum"
          key="state"
          render={text => (
            <span>
              {text.isActive && formatMessage({ id: "ACTIVE" })}
              {!text.isActive && formatMessage({ id: "PASSIVE" })}
            </span>
          )}
        />
        <Column
          width={150}
          align="center"
          render={(text, record) => (
            <span>
              <Button
                onClick={() => history.push("/" + this.props.user.roles[0] + "/client/" + text._id)}
              >
                {formatMessage({ id: "DETAIL" })}
              </Button>
            </span>
          )}
        />
      </Table>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user
  };
};

export default connect(
  stateToProps,
  null
)(injectIntl(ClientTable));
