import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import moment from "moment";

import { Row, Col } from "antd";

interface IProps {
  sessionDate: string;
  sessionPrice: number;
  categoryName: string;
}
interface IState {}

class GeneralSessionInformation extends Component<IProps & InjectedIntlProps, IState> {
  render() {
    const { formatMessage } = this.props.intl;
    const { sessionDate, sessionPrice, categoryName } = this.props;
    return (
      <Row type="flex" justify="center">
        <Col span={24}>
          {formatMessage({ id: "SESSION_DATE" }) +
            " : " +
            moment(sessionDate)
              .local()
              .format("DD/MM/YYYY HH:mm")}
        </Col>
        <Col span={24}>{formatMessage({ id: "SESSION_PRICE" }) + " : " + +sessionPrice + " ₺"}</Col>
        <Col span={24}>{formatMessage({ id: "SUBJECT" }) + " : " + categoryName}</Col>
      </Row>
    );
  }
}

export default injectIntl(GeneralSessionInformation);
