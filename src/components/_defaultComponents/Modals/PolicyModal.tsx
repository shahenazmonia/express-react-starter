import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { Formik } from "formik";
import * as yup from "yup";
import { Modal, Row, Col, Button } from "antd";

interface IProps {
  openModal: boolean;
  title: string;
  content: string;
  hidePolicyModal: () => any;
}

interface IState {}

class PolicyModal extends Component<IProps & InjectedIntlProps, IState> {
  private formik = React.createRef<Formik>();
  constructor(props) {
    super(props);
    this.state = { rateValue: 3 };
  }

  handleCancel = () => {
    this.props.hidePolicyModal();
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { openModal, title, content } = this.props;
    return (
      <Modal
        title={title}
        visible={openModal}
        centered
        // cancelText={formatMessage({ id: "CLOSE" })}
        onCancel={this.handleCancel}
        footer={[<Button onClick={this.handleCancel}>{formatMessage({ id: "CLOSE" })}</Button>]}
      >
        <Row>
          <Col>
            <div dangerouslySetInnerHTML={{ __html: content }} />
          </Col>
        </Row>
      </Modal>
    );
  }
}

export default injectIntl(PolicyModal);
