import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import * as alertActions from "../../../store/actions/alertActions";

import { Modal } from "antd";

interface IProps {
  showConfirm: boolean;
  message: any;
  closeConfirm: any;
  title: string;
  actionFunc: any;
}

interface IState {}

class MainConfirmModal extends Component<IProps & InjectedIntlProps> {
  renderModal() {
    Modal.confirm({
      visible: this.props.showConfirm,
      title: this.props.title,
      content: this.props.message,
      onOk: () => {
        this.props.actionFunc();
        this.props.closeConfirm();
      },
      onCancel: () => {
        this.props.closeConfirm();
      }
    });
  }
  render() {
    return (this.props.showConfirm && this.renderModal()) || "";
  }
}

const stateToProps = state => {
  return {
    showConfirm: state.alert.confirm.showConfirm,
    message: state.alert.confirm.body,
    title: state.alert.confirm.title,
    actionFunc: state.alert.confirm.actionFunc
  };
};

const dispatchToProps = dispatch => {
  return {
    closeConfirm: () => dispatch(alertActions.closeConfirm())
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(MainConfirmModal));
