import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { Card, Input, Button } from "antd";

const TextArea = Input.TextArea;

interface IProps {
  onPayClick: () => any;
  sessionCart: any;
}

interface IState {
  promotionInput: string;
  cardInfoInput: string;
}

class PaymentBox extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      promotionInput: "",
      cardInfoInput: ""
    };
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { sessionPrice } = this.props.sessionCart;
    return (
      <Card title={formatMessage({ id: "THERAPY_PAYMENT" })} bordered={true}>
        <h3>
          {formatMessage({ id: "THERAPY_PAYMENT_AMOUNT" })} {sessionPrice} ₺
        </h3>
        <h3>{formatMessage({ id: "THERAPY_PAYMENT_BALANCE" })} 0 ₺</h3>
        <br />
        <h4>{formatMessage({ id: "THERAPY_PAYMENT_PROMOTION" })}</h4>
        <Input
          style={{ width: "20%", marginRight: 10 }}
          onChange={text => this.setState({ promotionInput: text.target.value })}
        />
        <Button>{formatMessage({ id: "THERAPY_PAYMENT_APPLY" })}</Button>
        <h3 style={{ marginTop: 30 }}>
          {formatMessage({ id: "THERAPY_PAYMENT_AMOUNT_PAYABLE" })} {sessionPrice} ₺
        </h3>

        <h4>{formatMessage({ id: "THERAPY_PAYMENT_CARD_INFO" })}</h4>
        <TextArea rows={4} />
        <div style={{ display: "flex", width: "100%", justifyContent: "center", marginTop: 30 }}>
          <Button type="primary" ghost onClick={this.props.onPayClick}>
            {formatMessage({ id: "THERAPY_PAYMENT_PAY" })}
          </Button>
        </div>
      </Card>
    );
  }
}

export default injectIntl(PaymentBox);
