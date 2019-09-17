import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import moment from "moment";
import users from "../../../utility/constants/user";

import { getStatusText } from "../../../utility/statusHelper";
import history from "../../../_core/history";

import { Avatar, Col, Button, Table } from "antd";
import config from "../../../_core/config";

const { Column } = Table;

interface IProps {
  language: string;
  userType: string;
  sessionList: any;
  isCounselor: boolean;
  totalSessions: number;
  handlePagination?: any;
}

interface IState {
  currentPage: number;
  pageSize: number;
}

class SessionList extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      currentPage: 1,
      pageSize: 10
    };
  }

  handlePagination = page => {
    this.setState({ currentPage: page });
    this.props.handlePagination({ page });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { userType, isCounselor, sessionList, totalSessions, language } = this.props;
    const { currentPage, pageSize } = this.state;
    return (
      <Col span={24}>
        <Table
          bordered
          rowKey={record => record._id}
          size="middle"
          dataSource={[...Array.from({ length: (currentPage - 1) * pageSize }), ...sessionList]}
          pagination={{ onChange: this.handlePagination, pageSize, total: totalSessions }}
        >
          <Column
            align="center"
            key="AVATAR"
            render={(text, record: any) => {
              const { counselorInfo, clientInfo } = record;
              const profilePhoto = isCounselor
                ? clientInfo.profilePhoto
                : counselorInfo.profilePhoto;
              return (
                <Avatar
                  icon={profilePhoto ? undefined : "user"}
                  size="large"
                  src={
                    profilePhoto && config.getBasePublicUrl() + "api/getFile/" + profilePhoto._id
                  }
                />
              );
            }}
          />
          {!isCounselor && (
            <Column
              align="center"
              title={formatMessage({ id: "NAME" })}
              key="userName"
              render={(text, record: any) => {
                return <span>{record.counselorInfo.fullname}</span>;
              }}
            />
          )}

          {isCounselor && (
            <Column
              align="center"
              title={formatMessage({ id: "UNIQ_CLIENT_ID" })}
              key="userName"
              render={(text, record: any) => {
                return <span>{record.clientInfo.uniqClientId}</span>;
              }}
            />
          )}

          <Column
            align="center"
            title={formatMessage({ id: "SUBJECT" })}
            dataIndex={language === "tr" ? "categoryInfo.name_TR" : "categoryInfo.name_EN"}
            key="category"
          />
          <Column
            align="center"
            title={formatMessage({ id: "DATE" })}
            dataIndex="sessionDate"
            key="sessionDate"
            render={(text, record: any) => (
              <span>{moment(record.sessionDate).format("DD/MM/YYYY HH:mm")}</span>
            )}
          />
          <Column
            align="center"
            title={formatMessage({ id: "STATUS" })}
            dataIndex="status"
            key="status"
            render={(text, record: any) => (
              <span>{formatMessage({ id: getStatusText(record.status) })}</span>
            )}
          />
          <Column
            align="center"
            key="action"
            render={(text, record: any) => (
              <span>
                <Button
                  onClick={() => {
                    history.push(
                      userType === users.CLIENT
                        ? "/sessionDetail/" + record._id
                        : "/" + userType + "/sessionDetail/" + record._id
                    );
                  }}
                >
                  {formatMessage({ id: "DETAIL" })}
                </Button>
              </span>
            )}
          />
        </Table>
      </Col>
    );
  }
}

export default injectIntl(SessionList);
