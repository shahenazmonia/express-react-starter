import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { Input, DatePicker, Row, Col } from "antd";

const Search = Input.Search;

interface IProps {
  userType: string;
}

interface IState {}

class PaymentFilter extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { formatMessage } = this.props.intl;
    return (
      <Row type="flex">
        <Col>
          <DatePicker />
        </Col>
        <Col>
          <Search placeholder={formatMessage({ id: "SEARCH_NICK" })} />
        </Col>
        <Col>
          <Search placeholder={formatMessage({ id: "SEARCH_PROBLEM" })} />
        </Col>
      </Row>
    );
  }
}

export default injectIntl(PaymentFilter);
