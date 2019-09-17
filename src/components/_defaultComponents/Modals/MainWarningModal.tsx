import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import * as alertActions from "../../../store/actions/alertActions";

import { Modal } from "antd";

interface IProps {
  showWarning: boolean;
  message: any;
  closeWarning: any;
}

interface IState {}

class MainWarningModal extends Component<IProps & InjectedIntlProps> {
  renderModal() {
    Modal.warning({
      visible: this.props.showWarning,
      title: "WARNING",
      content: this.props.message,
      onOk: () => {
        this.props.closeWarning();
      },
      onCancel: () => {
        this.props.closeWarning();
      }
    });
  }
  render() {
    return (this.props.showWarning && this.renderModal()) || "";
  }
}

const stateToProps = state => {
  return {
    showWarning: state.alert.warning.showWarning,
    message: state.alert.warning.body
  };
};

const dispatchToProps = dispatch => {
  return {
    closeWarning: () => dispatch(alertActions.closeWarning())
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(MainWarningModal));
