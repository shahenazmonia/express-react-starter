//ONAYLANDIĞINA DAIR BILGILENDIRME MODALI AÇILACAK
import React, { Component } from "react";
import { InputNumber, Icon } from "antd";
import styled from "styled-components";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import _ from "lodash";
import AntTable from "antd/lib/table/Table";
import Column from "antd/lib/table/Column";

import * as counselorActions from "../../../store/actions/counselorActions";

const StyledTable = styled(AntTable)<{ bg: any; updatedRecord: any }>`
  .ant-table-tbody > .changed {
    background: #b7eb8f !important;
  }
`;

const Table = props => <StyledTable {...props} />;
interface IProps {
  id?: string;
  language: string;
  categoryData: Array<any>;
  updateCounselorMinPrice: (params: any) => any;
  getCounselorCategory: () => any;
}

interface IState {
  id?: string;
  serviceCategories: Array<any>;
  updateServiceCategories: Array<any>;
}

class ServiceOperationBox extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      serviceCategories: [],
      updateServiceCategories: []
    };
  }

  componentDidMount() {
    const { categoryData } = this.props;
    this.setState({ serviceCategories: categoryData });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.categoryData !== nextProps.categoryData)
      this.setState({ serviceCategories: nextProps.categoryData });
  }

  onUpdatecounselorMinPrice = async record => {
    const { id } = this.props;
    const { updateServiceCategories } = this.state;
    const getCategoryByIndexId = await _.find(updateServiceCategories, { _id: record._id });
    try {
      await this.props.updateCounselorMinPrice({
        counselorId: id,
        categoryId: getCategoryByIndexId._id,
        counselorMinPrice: getCategoryByIndexId.counselorMinPrice
      });
      this.props.getCounselorCategory();
    } catch (err) {
      // console.log(err);
    }
  };

  onChangecounselorMinPrice = (inputNumber, record) => {
    const { updateServiceCategories } = this.state;
    const index = _.findIndex(updateServiceCategories, { _id: record._id });

    if (index !== -1) updateServiceCategories[index].counselorMinPrice = inputNumber;
    else updateServiceCategories.push({ ...record, counselorMinPrice: inputNumber });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { serviceCategories } = this.state;
    const { language } = this.props;
    return (
      <Table
        bordered
        size="middle"
        pagination={{ pageSize: 10 }}
        rowKey={record => record._id}
        dataSource={serviceCategories}
        rowClassName={record => {
          if (record.counselorMinPrice) {
            return "changed";
          } else {
            return "same";
          }
        }}
      >
        <Column
          align="center"
          width={150}
          title={formatMessage({ id: "GENERAL_MIN_PRICE" })}
          dataIndex="generalMinPrice"
          key="generalMinPrice"
        />
        <Column
          align="center"
          width={150}
          title={formatMessage({ id: "CLINIC_MIN_PRICE" })}
          dataIndex="clinicMinPrice"
          key="clinicMinPrice"
        />
        <Column
          align="center"
          width={150}
          title={formatMessage({ id: "COUNSELOR_PRICE" })}
          dataIndex="price"
          key="price"
        />
        <Column
          align="center"
          width={150}
          title={formatMessage({ id: "MIN_PRICE_FOR_COUNSELOR" })}
          dataIndex="counselorMinPrice"
          key="counselorMinPrice"
          render={(text, record: any) => (
            <span>
              {record.counselorMinPrice && record.counselorMinPrice}
              {!record.counselorMinPrice && "-"}
            </span>
          )}
        />
        <Column
          align="center"
          width={150}
          title={formatMessage({ id: "CATEGORY" })}
          dataIndex={language === "tr" ? "name_TR" : "name_EN"}
          key={language === "tr" ? "name_TR" : "name_EN"}
        />
        <Column
          align="center"
          width={200}
          title={formatMessage({ id: "EDIT" })}
          key="Edit"
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
                    placeholder={"Minimum fiyat giriniz!"}
                    onChange={text => this.onChangecounselorMinPrice(text, record)}
                    style={{
                      width: "100%",
                      borderColor:
                        _.max([record.clinicMinPrice, record.generalMinPrice]) >
                        record.counselorMinPrice
                          ? "red"
                          : "#f1f1f1"
                    }}
                  />
                  {_.max([record.clinicMinPrice, record.generalMinPrice]) >
                    record.counselorMinPrice && (
                    <p style={{ color: "red", fontSize: 13 }}>
                      {formatMessage({ id: "MIN_PRICE_LISTED" })}{" "}
                      {_.max([
                        record.clinicMinPrice,
                        record.generalMinPrice,
                        record.counselorMinPrice
                      ])}{" "}
                      ₺
                    </p>
                  )}
                </div>
                <span
                  onClick={() => {
                    this.onUpdatecounselorMinPrice(record);
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
    );
  }
}

const stateToProps = state => {
  return {
    language: state.locale.language
  };
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(ServiceOperationBox));
