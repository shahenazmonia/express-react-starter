import React, { Component } from "react";
import { Table, Icon } from "antd";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

const { Column } = Table;

type subscriptionType = {
  _id?: string;
  name: string;
  detail: string;
  monthlyFixedFee: number;
  platformCommission: number;
  dailyMinAvailability: number;
  isActive: boolean;
};

interface IProps {
  generalSubscriptions: Array<subscriptionType>;
  updateSubscription: ({ subscriptionId: string }) => void;
  removeSubscription: ({ subscriptionId: string }) => void;
}

interface IState {}

class SubscriptionClinicListBox extends Component<IProps & InjectedIntlProps, IState> {
  removeItem = ({ subscriptionId }) => {
    this.props.removeSubscription({ subscriptionId });
  };

  updateItem = ({ subscriptionId }) => {
    this.props.updateSubscription({ subscriptionId });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { generalSubscriptions } = this.props;
    return (
      <React.Fragment>
        <Table
          bordered
          dataSource={generalSubscriptions}
          pagination={{ pageSize: 10 }}
          rowKey={(record: any) => record._id}
        >
          <Column
            width={100}
            align="center"
            title={formatMessage({ id: "SUBSCRIPTION_NAME" })}
            dataIndex={"name"}
            key={"name"}
          />
          <Column
            width={450}
            align="center"
            title={formatMessage({ id: "SUBSCRIPTION_DETAIL" })}
            dataIndex={"detail"}
            key={"detail"}
          />
          <Column
            width={100}
            align="center"
            title={formatMessage({ id: "SUBSCRIPTION_MONTHLY_FIXED_FEE" })}
            dataIndex={"monthlyFixedFee"}
            key={"monthlyFixedFee"}
          />
          <Column
            width={100}
            align="center"
            title={formatMessage({ id: "SUBSCRIPTION_PLATFORM_COMMISSION" })}
            dataIndex={"platformCommission"}
            key={"platformCommission"}
          />
          <Column
            width={100}
            align="center"
            title={formatMessage({ id: "CLINIC_ACTIVE" })}
            dataIndex={"isActive"}
            key={"isActive"}
            render={(text, record: subscriptionType, index) => {
              return (
                <span>
                  {record.isActive && <span>{formatMessage({ id: "ACTIVE" })}</span>}
                  {!record.isActive && <span>{formatMessage({ id: "PASSIVE" })}</span>}
                </span>
              );
            }}
          />
          <Column
            width={100}
            align="center"
            title={formatMessage({ id: "DELETE" })}
            dataIndex={"delete"}
            key={"delete"}
            render={(text, record: subscriptionType, index) => {
              return (
                <span
                  onClick={() => this.removeItem({ subscriptionId: record._id })}
                  style={{ margin: 10 }}
                >
                  <Icon type="delete" />
                </span>
              );
            }}
          />
          <Column
            width={100}
            align="center"
            title={formatMessage({ id: "EDIT" })}
            dataIndex={"edit"}
            key={"edit"}
            render={(text, record: subscriptionType, index) => {
              return (
                <span
                  onClick={() => this.updateItem({ subscriptionId: record._id })}
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
  return {};
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(SubscriptionClinicListBox));
