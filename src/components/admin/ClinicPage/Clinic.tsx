import React, { Component } from "react";
import ClinicListBox from "./ClinicListBox";
import { Row, Col, Icon, Button } from "antd";
import { connect } from "react-redux";
import history from "../../../_core/history";
import { injectIntl, InjectedIntlProps } from "react-intl";

import * as clinicActions from "../../../store/actions/clinicActions";
import * as clinicSubscriptionActions from "../../../store/actions/clinicSubscriptionActions";
import * as alertActions from "../../../store/actions/alertActions";

import { findSubscriptionById } from "../../../utility/subscriptionHelper";

import { ShowAlertParams, ShowInfoAction } from "../../../store/actions/alertActions";
import { clinicListType } from "../../../types/clinicTypes";
import { clinicSubscriptionType } from "../../../types/subscriptionTypes";
import { paginationType } from "../../../types/paginationTypes";

interface IProps {
  getClinicSubscriptions: () => any;
  getClinicList: (params: any) => any;
  removeClinic: ({ _id: String }) => any;
  showConfirm: (ShowAlertParams) => ShowInfoAction;
}

interface IState {
  clinicList: Array<clinicListType> | [];
  clinicSubscriptions: Array<clinicSubscriptionType> | [];
  pagination: paginationType;
}

class Clinic extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      clinicList: [],
      clinicSubscriptions: [],
      pagination: { current: 1, total: undefined, pageSize: 10 }
    };
  }

  componentDidMount = async () => {
    const clinicSubscriptions = (await this.props.getClinicSubscriptions()).action.payload.data;
    this.setState({ clinicSubscriptions }, async () => {
      await this.fetchClinicList();
    });
  };

  fetchClinicList = async () => {
    const { pagination } = this.state;
    const data = (await this.props.getClinicList({ current: pagination.current })).action.payload
      .data;
    !pagination.total && this.setState({ pagination: data.pagination });
    const clinicList = data.getClinicList.map(clinic => {
      const subscription = findSubscriptionById({
        subscriptionList: this.state.clinicSubscriptions,
        subscriptionId: clinic.subscription.subscriptionId
      });
      const subscriptionType = subscription && subscription.name;
      return {
        ...clinic,
        subscriptionType
      };
    });

    this.setState({ clinicList });
  };

  onChangeCurrent = ({ current }) => {
    const { pagination } = this.state;
    this.setState({ pagination: { ...pagination, current } }, () => {
      this.fetchClinicList();
    });
  };

  removeClinic = async ({ clinicId }) => {
    const { formatMessage } = this.props.intl;
    this.props.showConfirm({
      title: formatMessage({ id: "DELETE" }),
      body: formatMessage({ id: "DELETE_ARE_YOU_SURE" }),
      actionFunc: async () => {
        await this.props.removeClinic({ _id: clinicId });
        this.fetchClinicList();
      }
    });
  };

  updateClinic = ({ clinicId }) => {
    history.push(`/admin/clinic/update/${clinicId}`);
  };

  render() {
    const { clinicList, pagination } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <Row type="flex" justify="center">
        <Col span={16} style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
          <Button
            onClick={() => history.push("/admin/clinic/new")}
            type="primary"
            icon="plus-circle"
          >
            {formatMessage({ id: "NEW_REGISTER" })}
          </Button>
        </Col>
        <Col span={16}>
          <ClinicListBox
            pagination={pagination}
            clinicList={clinicList}
            onChangeCurrent={this.onChangeCurrent}
            removeClinic={this.removeClinic}
            updateClinic={this.updateClinic}
          />
        </Col>
      </Row>
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
    getClinicList: params => dispatch(clinicActions.getClinicList(params)),
    getClinicSubscriptions: () => dispatch(clinicSubscriptionActions.getClinicSubscriptions()),
    removeClinic: id => dispatch(clinicActions.removeClinic(id)),
    showConfirm: params => dispatch(alertActions.showConfirm(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(Clinic));
