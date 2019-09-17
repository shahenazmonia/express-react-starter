import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import * as alertActions from "../../../store/actions/alertActions";

import { Modal, Button } from "antd";

interface IProps {
  showInfo: boolean;
  title: string;
  message: string;
  closeInfo: any;
  actionFunc: any;
}

interface IState {}

class MainInfoModal extends Component<IProps & InjectedIntlProps> {
  renderModal() {
    Modal.info({
      visible: this.props.showInfo,
      title: this.props.title || "INFO",
      content: <div style={{ maxHeight: 400, overflowY: "scroll" }}>{this.props.message}</div>,
      onOk: () => {
        if (this.props.actionFunc) this.props.actionFunc();
        this.props.closeInfo();
      },
      onCancel: () => {
        this.props.closeInfo();
      }
    });
  }
  render() {
    return (this.props.showInfo && this.renderModal()) || "";
  }
}

const stateToProps = state => {
  return {
    showInfo: state.alert.info.showInfo,
    title: state.alert.info.title,
    message: state.alert.info.body,
    actionFunc: state.alert.info.actionFunc
  };
};

const dispatchToProps = dispatch => {
  return {
    closeInfo: () => dispatch(alertActions.closeInfo())
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(MainInfoModal));
