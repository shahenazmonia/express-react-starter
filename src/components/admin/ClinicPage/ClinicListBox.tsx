import React, { Component } from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Table, Icon } from "antd";

import { clinicListType } from "../../../types/clinicTypes";
import { paginationType } from "../../../types/paginationTypes";

const { Column } = Table;

interface IProps {
  clinicList: Array<clinicListType> | [];
  removeClinic: ({ clinicId: string }) => void;
  updateClinic: ({ clinicId: string }) => void;
  onChangeCurrent: ({ current: number }) => void;
  pagination: paginationType;
}

interface IState {}

class ClinicListBox extends Component<IProps & InjectedIntlProps, IState> {
  onUpdateClinic = ({ clinicId }) => {
    this.props.updateClinic({ clinicId });
  };

  onRemoveClinic = ({ clinicId }) => {
    this.props.removeClinic({ clinicId });
  };

  handleTableChange = pagination => {
    this.props.onChangeCurrent({ current: pagination.current });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { clinicList, pagination } = this.props;
    return (
      <React.Fragment>
        <Table
          pagination={pagination}
          bordered
          onChange={this.handleTableChange}
          dataSource={[
            ...Array.from({ length: (pagination.current - 1) * pagination.pageSize }),
            ...clinicList
          ]}
        >
          <Column
            align="center"
            title={formatMessage({ id: "CLINIC_NAME" })}
            dataIndex={"name"}
            key={"name"}
          />
          <Column
            align="center"
            title={formatMessage({ id: "CLINIC_SUBSCRIPTION_TYPE" })}
            dataIndex={"subscriptionType"}
            key={"subscriptionType"}
          />
          <Column
            align="center"
            title={formatMessage({ id: "CLINIC_SERVICE_CATEGORY" })}
            dataIndex={"mainCategories"}
            key={"mainCategories"}
            render={(text: any, record: any, index: any) => {
              return record.mainCategories.map((category, index) => {
                return <p key={index}>{formatMessage({ id: category.toUpperCase() })}</p>;
              });
            }}
          />
          <Column
            align="center"
            title={formatMessage({ id: "CLINIC_ACTIVE" })}
            dataIndex={"isActive"}
            key={"isActive"}
            render={(text, record: any, index) => {
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
            title={formatMessage({ id: "DELETE" })}
            dataIndex={"delete"}
            key={"delete"}
            render={(text, record: any, index) => {
              return (
                <span
                  onClick={() => this.onRemoveClinic({ clinicId: record._id })}
                  style={{ margin: 10 }}
                >
                  <Icon type="delete" />
                </span>
              );
            }}
          />

          <Column
            align="center"
            title={formatMessage({ id: "EDIT" })}
            dataIndex={"edit"}
            key={"edit"}
            render={(text, record: any, index) => {
              return (
                <span
                  onClick={() => {
                    this.onUpdateClinic({ clinicId: record._id });
                  }}
                  style={{ margin: 10 }}
                >
                  <Icon type="edit" />
                </span>
              );
            }}
          />
        </Table>
      </React.Fragment>
    );
  }
}

const stateToProps = state => {
  return {
    //  generalSubscriptions: state.constants.generalSubscriptions
  };
};

const dispatchToProps = dispatch => {
  return {
    // showConfirm: params => dispatch(alertActions.showConfirm(params))
  };
};

export default connect(
  null,
  null
)(injectIntl(ClinicListBox));
