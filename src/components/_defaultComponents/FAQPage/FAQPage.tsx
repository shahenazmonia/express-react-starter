import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

//import * as sessionActions from "../../../store/actions/sessionActions";
import FAQ from "../../../utility/constants/faq";

import { Collapse, Calendar, Row, Col } from "antd";

interface IProps {}
interface IState {}

class FAQPage extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { formatMessage } = this.props.intl;

    return (
      <Row type="flex" justify="center">
        <Col style={{ display: "flex", justifyContent: "center", marginBottom: 20 }} span={18}>
          <h2>{formatMessage({ id: "FAQ_HEADER" })}</h2>
        </Col>
        <Col span={18}>
          <Collapse accordion>
            {FAQ.map((faq, index) => (
              <Collapse.Panel key={index.toString()} header={faq.header}>
                {faq.text}
              </Collapse.Panel>
            ))}
          </Collapse>
        </Col>
      </Row>
    );
  }
}

const dispatchToProps = dispatch => {
  return {
    //  getSessionList: params => dispatch(dashboardActions.(params))
  };
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(FAQPage));
