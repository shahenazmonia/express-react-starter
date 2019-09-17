import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import * as alertActions from "../../../store/actions/alertActions";

import { Modal, Button } from "antd";

interface IProps {
  showError: boolean;
  title: string;
  message: any;
  actionTitle: string;
  actionFunc: () => any;
  closeError: any;
}

interface IState {}

class MainErrorModal extends Component<IProps & InjectedIntlProps> {
  renderModal() {
    const { showError, title, message, actionTitle, actionFunc } = this.props;
    Modal.error({
      visible: showError,
      title: title || "ERROR",
      content: message,
      //  maskClosable: true,
      okText: actionTitle,
      onOk: () => {
        actionFunc && actionFunc();
        this.props.closeError();
      },
      onCancel: () => {
        this.props.closeError();
      }
    });
  }
  render() {
    return (this.props.showError && this.renderModal()) || "";
  }
}

const stateToProps = state => {
  return {
    showError: state.alert.error.showError,
    title: state.alert.error.title,
    message: state.alert.error.body,
    actionTitle: state.alert.error.actionTitle,
    actionFunc: state.alert.error.actionFunc
  };
};

const dispatchToProps = dispatch => {
  return {
    closeError: () => dispatch(alertActions.closeError())
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(MainErrorModal));
