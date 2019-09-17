import React, { Component } from "react";
import { Table, Icon } from "antd";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { categoryType } from "../../../types/categoryTypes";
import { paginationType } from "../../../types/paginationTypes";

const { Column } = Table;

interface IProps {
  updateCategory: ({ categoryId: string }) => void;
  removeCategory: ({ categoryId: string }) => void;
  categories: Array<categoryType>;
  language: string;
}

interface IState {}

class ServiceBox extends Component<IProps & InjectedIntlProps, IState> {
  onRemoveCategory = ({ categoryId }) => {
    this.props.removeCategory({ categoryId });
  };

  onUpdateCategory = ({ categoryId }) => {
    this.props.updateCategory({ categoryId });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { categories, language } = this.props;
    return (
      <React.Fragment>
        <Table
          bordered
          size="middle"
          dataSource={categories}
        //  pagination={false}
        //  scroll={{ y: 500 }}
          rowKey={(record: any) => record._id}
        >
          <Column
            align="center"
            width={150}
            title={formatMessage({ id: "SERVICE_NAME" })}
            dataIndex={language === "tr" ? "name_TR" : "name_EN"}
            key={"value"}
          />
          <Column
            align="center"
            width={150}
            title={formatMessage({ id: "SERVICE_DETAIL" })}
            dataIndex={language === "tr" ? "detail_TR" : "detail_EN"}
            key={language === "tr" ? "detail_TR" : "detail_EN"}
          />
          <Column
            align="center"
            width={150}
            title={formatMessage({ id: "SERVICE_MIN_PRICE" })}
            dataIndex={"generalMinPrice"}
            key={"generalMinPrice"}
          />
          <Column
            align="center"
            width={150}
            title={formatMessage({ id: "SERVICE_CATEGORY" })}
            dataIndex={"mainCategory"}
            key={"mainCategory"}
            render={(text: any, record: any, index: any) => {
              return <p>{formatMessage({ id: record.mainCategory.toUpperCase() })}</p>;
            }}
          />
          <Column
            align="center"
            width={150}
            title={formatMessage({ id: "ACTIVE" })}
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
            width={150}
            title={formatMessage({ id: "DELETE" })}
            dataIndex={"delete"}
            key={"delete"}
            render={(text, record: any, index) => {
              return (
                <span
                  onClick={() => this.onRemoveCategory({ categoryId: record._id })}
                  style={{ margin: 10 }}
                >
                  <Icon type="delete" />
                </span>
              );
            }}
          />
          <Column
            align="center"
            width={150}
            title={formatMessage({ id: "EDIT" })}
            dataIndex={"edit"}
            key={"edit"}
            render={(text, record: any, index) => {
              return (
                <span
                  onClick={() => {
                    this.onUpdateCategory({ categoryId: record._id });
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

export default injectIntl(ServiceBox);
