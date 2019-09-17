import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import _ from "lodash";

import { Icon, InputNumber, message } from "antd";
import AntTable from "antd/lib/table/Table";
import Column from "antd/lib/table/Column";
import { categoryForClinicType } from "../../../types/categoryTypes";
import styled from "styled-components";

interface IProps {
  user: any;
  language: String;
  categoryData: Array<categoryForClinicType> | [];
  updateMinPrice: (record: categoryForClinicType) => void;
  changeMinPrice: (text: String, record: categoryForClinicType) => void;
}

const StyledTable = styled(AntTable)<{ bg: any; updatedRecord: any }>`
  ${props =>
    props.bg
      ? `  .ant-table-tbody > tr .${props.updatedRecord} > td .${
          props.updatedRecord
        } { background: #b7eb8f !important; }`
      : null}
  .ant-table-tbody > tr:hover:not(.ant-table-expanded-row) > td {
    background-color: ${props => (props.bg ? "#b7eb8f  !important" : "#e6f7ff  !important")};
  }
`;

const Table = props => <StyledTable {...props} />;

interface IState {
  bg: boolean;
  updatedRecord: string;
}

class ServiceBox extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      bg: false,
      updatedRecord: ""
    };
  }
  onChangeMinPrice = (text, record) => {
    this.props.changeMinPrice(text, record);
  };

  onUpdateMinPrice = record => {
    this.props.updateMinPrice(record);
    this.setState({ bg: true });
    message.success("the price is updated!");
    setTimeout(() => {
      this.setState({ bg: false });
    }, 500);
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { language } = this.props;
    const { categoryData } = this.props;
    const { bg, updatedRecord } = this.state;
    return (
      <React.Fragment>
        <Table
          bordered
          size="middle"
          bg={bg}
          updatedRecord={updatedRecord}
          rowClassName={record => record._id}
          //  pagination={false}
          //  scroll={{ y: 500 }}
          rowKey={record => record._id}
          dataSource={categoryData}
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
            key={language === "tr" ? "detai_TR" : "detail_EN"}
          />
          <Column
            align="center"
            width={150}
            title={formatMessage({ id: "ADMIN_SERVICE_MIN_PRICE" })}
            dataIndex={"generalMinPrice"}
            key={"generalMinPrice"}
          />
          <Column
            align="center"
            width={150}
            title={formatMessage({ id: "CLINIC_SERVICE_MIN_PRICE" })}
            dataIndex={"clinicMinPrice"}
            key={"clinicMinPrice"}
          />
          <Column
            align="center"
            width={150}
            title={formatMessage({ id: "SERVICE_CATEGORY" })}
            dataIndex={"mainCategory"}
            key={"mainCategory"}
            render={(text: any, record: categoryForClinicType, index) => {
              return <p>{formatMessage({ id: record.mainCategory.toUpperCase() })}</p>;
            }}
          />
          <Column
            align="center"
            width={150}
            title={formatMessage({ id: "CLINIC_ACTIVE" })}
            dataIndex={"isActive"}
            key={"isActve"}
            render={(text, record: categoryForClinicType, index) => {
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
            title={formatMessage({ id: "EDIT" })}
            dataIndex="edit"
            key="edit"
            render={(text, record: any, index) => {
              return (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "space-between"
                  }}
                >
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      width: "100%"
                    }}
                  >
                    <InputNumber
                      placeholder={record.clinicMinPrice}
                      onChange={text => this.onChangeMinPrice(text, record)}
                      style={{
                        width: "100%",
                        borderColor:
                          record.generalMinPrice > record.clinicMinPrice ? "red" : "#f1f1f1"
                      }}
                    />
                    {record.generalMinPrice > record.clinicMinPrice && (
                      <p style={{ color: "red", fontSize: 13 }}>
                        {formatMessage({ id: "MIN_PRICE_LISTED" }) + " " + record.generalMinPrice} ₺
                      </p>
                    )}
                  </div>
                  <span
                    onClick={() => {
                      this.onUpdateMinPrice(record);
                      this.setState({ updatedRecord: record._id });
                    }}
                    style={{ marginLeft: 10 }}
                  >
                    <Icon type="save" style={{ fontSize: 25 }} />
                  </span>
                </div>
              );
            }}
          />
        </Table>
      </React.Fragment>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {
    // getCategories: params => dispatch(clinicActions.getCategories(params)),
    // categoryMinPriceUpdate: params => dispatch(clinicActions.categoryMinPriceUpdate(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(ServiceBox));
