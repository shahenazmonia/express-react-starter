import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Row, Col } from "antd";
import TransactionCEV from "../../_defaultComponents/AccountingComponents/TransactionCEV";

interface IProps {
  id?: string;
  isEdit?: boolean;
}

interface IState {}

class TransactionDetailPage extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    return (
      <Row type="flex" justify="center">
        <Col xs={22} md={16}>
          <TransactionCEV isEdit={this.props.isEdit} id={this.props.id} />
        </Col>
      </Row>
    );
  }
}

const dispatchToProps = dispatch => {
  return {};
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(TransactionDetailPage));
