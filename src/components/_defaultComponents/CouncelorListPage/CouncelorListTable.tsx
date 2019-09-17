import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import history from "../../../_core/history";
import moment from "moment";

import { Icon, Col, Button, Table } from "antd";
const { Column } = Table;

interface IProps {
  counselorList: any;
  totalCounselorNumber: number;
  handlePagination: any;
  isAdmin?: boolean;
}

interface IState {
  currentPage: number;
  pageSize: number;
}

class CouncelorListTable extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { currentPage: 1, pageSize: 10 };
  }

  handlePagination = page => {
    this.setState({ currentPage: page });
    this.props.handlePagination({ page });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { counselorList, totalCounselorNumber, isAdmin } = this.props;
    const { currentPage, pageSize } = this.state;
    return (
      <Col span={24}>
        <Table
          bordered
          rowKey={record => record._id}
          size="middle"
          dataSource={[...Array.from({ length: (currentPage - 1) * pageSize }), ...counselorList]}
          pagination={{ onChange: this.handlePagination, pageSize, total: totalCounselorNumber }}
        >
          <Column
            align="center"
            width={150}
            title={formatMessage({ id: "NAME" })}
            dataIndex="fullname"
            key="fullname"
          />
          <Column
            align="center"
            width={150}
            title={formatMessage({ id: "REGISTER_DATE" })}
            dataIndex="registerDate"
            key="registerDate"
            render={(text, record: any) => (
              <span>{moment(record.registerDate).format("DD/MM/YYYY ")}</span>
            )}
          />
          <Column
            align="center"
            width={150}
            title={formatMessage({ id: "LAST_SESSION_DATE" })}
            dataIndex="lastSessionDate"
            key="lastSessionDate"
            render={(text, record: any) => (
              <span>
                {record.lastSessionDate ? moment(record.lastSessionDate).format("DD/MM/YYYY") : "-"}
              </span>
            )}
          />
          <Column
            align="center"
            width={150}
            title={formatMessage({ id: "DEBT" })}
            dataIndex="debt"
            key="debt"
            render={(text, record: any) => (
              <span>
                {record.debt && record.debt}
                {!record.debt && "-"}
              </span>
            )}
          />
          <Column
            align="center"
            width={150}
            title={formatMessage({ id: "CREDIT" })}
            dataIndex="credit"
            key="credit"
            render={(text, record: any) => (
              <span>
                {record.credit && record.credit}
                {!record.credit && "-"}
              </span>
            )}
          />
          <Column
            align="center"
            width={150}
            title={formatMessage({ id: "ACTIVENESS" })}
            dataIndex="isActive"
            key="isActive"
            render={(text, record: any) => {
              return (
                <span>
                  {record.isActive && <span>{formatMessage({ id: "ACTIVE" })}</span>}
                  {!record.isActive && <span>{formatMessage({ id: "PASSIVE" })}</span>}
                </span>
              );
            }}
          />
          <Column
            align="center"
            width={150}
            key="action"
            render={(text, record: any) => (
              <span>
                <Button
                  onClick={() =>
                    history.push("/" + (isAdmin ? "admin" : "clinic") + "/counselor/" + record._id)
                  }
                >
                  {formatMessage({ id: "DETAIL" })}
                </Button>
              </span>
            )}
          />
          {!isAdmin && (
            <Column
              align="center"
              width={150}
              title={formatMessage({ id: "EDIT" })}
              key="Edit"
              render={(text, record: any) => (
                <span
                  onClick={() => history.push(`/clinic/counselor/service/${record._id}`)}
                  style={{ margin: 10 }}
                >
                  <Icon type="edit" />
                </span>
              )}
            />
          )}
        </Table>
      </Col>
    );
  }
}

export default injectIntl(CouncelorListTable);
