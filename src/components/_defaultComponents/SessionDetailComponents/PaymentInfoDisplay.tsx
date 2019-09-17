import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Row, Col } from "antd";

interface IProps {
  sessionPrice: number;
}
interface IState {}

class PaymentInfoDisplay extends Component<IProps & InjectedIntlProps, IState> {
  render() {
    const { formatMessage } = this.props.intl;
    const { sessionPrice } = this.props;
    return (
      <React.Fragment>
        <Row>
          <Col>Tutar:{sessionPrice}</Col>
          <Col>İndirim:0</Col>
          <Col>Toplam:{sessionPrice}</Col>
        </Row>
      </React.Fragment>
    );
  }
}

export default injectIntl(PaymentInfoDisplay);
