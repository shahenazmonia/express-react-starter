import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import users from "../../../utility/constants/user";
import * as alertActions from "../../../store/actions/alertActions";
import * as userActions from "../../../store/actions/userActions";
import { ShowAlertParams, ShowInfoAction } from "../../../store/actions/alertActions";
import ClientProfileBox from "./ClientProfileBox";
import ClientBillingBox from "./ClientBillingBox";

import { Row, Col } from "antd";

interface IProps {
  userType: string;
  user: any;
  updateProfileInfo?: any;
  updateBillingInfo?: any;
  getUserInfo?: any;
  updateActive: any;
  showInfo: (ShowAlertParams) => ShowInfoAction;
  updateSmsPermited: (params: { clientId: string; isSmsPermited: boolean }) => any;
  updateMailPermited: (params: { clientId: string; isMailPermited: boolean }) => any;
  updateNotificationPermited: (params: {
    clientId: string;
    isNotificationPermited: boolean;
  }) => any;
  clientId?: string;
}

interface IState {
  userInfo: any;
  isActive: boolean;
  isSmsPermited: boolean;
  isMailPermited: boolean;
  isNotificationPermited: boolean;
}

class ClientAccount extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
      isActive: false,
      isSmsPermited: false,
      isMailPermited: false,
      isNotificationPermited: false
    };
  }
  componentDidMount = async () => {
    const id = this.props.clientId ? this.props.clientId : this.props.user._id; //if admin, will render sent id, otherwise will render client id
    try {
      const result = (await this.props.getUserInfo({ id })).action.payload.data;
      this.setState({
        userInfo: { ...result },
        isActive: result.isActive,
        isSmsPermited: result.isSmsPermited,
        isMailPermited: result.isMailPermited,
        isNotificationPermited: result.isNotificationPermited
      });
    } catch (err) {
      console.log(err);
    }
  };

  onProfileInfoSubmit = async (values, { setSubmitting }) => {
    const profileInfo = { id: this.props.user._id, ...values };
    const { formatMessage } = this.props.intl;
    try {
      await this.props.updateProfileInfo({ profileInfo });
      this.props.showInfo({
        title: formatMessage({ id: "SUCCESS" }),
        body: formatMessage({ id: "CLIENT_PROFILE_UPDATE_SUCCESS" }),
        actionFunc: () => {}
      });
    } catch (err) {
      console.log(err);
    }
  };

  onBillingInfoSubmit = async values => {
    const billingInfo = { id: this.props.user._id, ...values };
    const { formatMessage } = this.props.intl;
    try {
      this.props.updateBillingInfo({ billingInfo }).then(result => console.log(result));
      this.props.showInfo({
        title: formatMessage({ id: "SUCCESS" }),
        body: formatMessage({ id: "CLIENT_BILLING_UPDATE_SUCCESS" }),
        actionFunc: () => {}
      });
    } catch (err) {
      console.log(err);
    }
  };

  onChangeSwitch = checked => {
    const { _id } = this.state.userInfo;
    this.setState({ isActive: checked }, () => {
      this.props.updateActive({ isActive: checked, id: _id });
    });
  };

  onChangeSms = () => {
    const { user } = this.props;
    this.setState({ isSmsPermited: !this.state.isSmsPermited }, () =>
      this.props.updateSmsPermited({ clientId: user._id, isSmsPermited: this.state.isSmsPermited })
    );
  };

  onChangeMail = () => {
    const { user } = this.props;
    this.setState({ isMailPermited: !this.state.isMailPermited }, () => {
      this.props.updateMailPermited({
        clientId: user._id,
        isMailPermited: this.state.isMailPermited
      });
    });
  };

  onChangeNotification = () => {
    const { user } = this.props;
    this.setState({ isNotificationPermited: !this.state.isNotificationPermited }, () => {
      this.props.updateNotificationPermited({
        clientId: user._id,
        isNotificationPermited: this.state.isNotificationPermited
      });
    });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { userType } = this.props;
    const { isActive, isSmsPermited, isMailPermited, isNotificationPermited } = this.state;
    const isClient = userType === users.CLIENT ? true : false;
    const isAdmin = userType === users.ADMIN ? true : false;
    return (
      <Row type="flex" justify="center">
        <Col span={24}>
          <ClientProfileBox
            userInfo={this.state.userInfo}
            onProfileInfoSubmit={this.onProfileInfoSubmit}
            isAdmin={isAdmin}
            onChangeSwitch={this.onChangeSwitch}
            isActive={isActive}
            isClient={isClient}
            onChangeSms={this.onChangeSms}
            onChangeMail={this.onChangeMail}
            onChangeNotification={this.onChangeNotification}
            isSmsPermited={isSmsPermited}
            isMailPermited={isMailPermited}
            isNotificationPermited={isNotificationPermited}
          />
        </Col>
        <Col span={24}>
          <ClientBillingBox
            userInfo={this.state.userInfo}
            onBillingInfoSubmit={this.onBillingInfoSubmit.bind(this)}
            isAdmin={isAdmin}
            isClient={isClient}
          />
        </Col>
      </Row>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user || {}
  };
};

const dispatchToProps = dispatch => {
  return {
    showInfo: params => dispatch(alertActions.showInfo(params)),
    updateProfileInfo: params => dispatch(userActions.updateProfileInfo(params)),
    updateBillingInfo: params => dispatch(userActions.updateBillingInfo(params)),
    getUserInfo: params => dispatch(userActions.getUserInfo(params)),
    updateActive: params => dispatch(userActions.updateActive(params)),
    updateSmsPermited: params => dispatch(userActions.updateSmsPermited(params)),
    updateMailPermited: params => dispatch(userActions.updateMailPermited(params)),
    updateNotificationPermited: params => dispatch(userActions.updateNotificationPermited(params))
  };
};
export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(ClientAccount));
