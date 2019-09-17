import React, { StatelessComponent } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { Row, Col, Button } from "antd";

interface IProps {
  category: any;
}

const CounselorServiceCategoryBox: StatelessComponent<IProps & InjectedIntlProps> = props => {
  const { formatMessage } = props.intl;
  const { category } = props;
  return (
    <Row type="flex" justify="space-between">
      <Col span={14}>
        <Row>
          <Col>
            <h3 style={{ color: "red" }}>{category.name_TR}</h3>
          </Col>
          <Col>{category.description || category.detail_TR}</Col>
        </Row>
      </Col>
      <Col span={6}>
        <Row type="flex" justify="center">
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <h3>{category.effectivePrice + " TL"}</h3>
          </Col>
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <b style={{ color: "red" }}>{category.sessionDuration + " dakika"}</b>
          </Col>
          <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
            <Button type="dashed">{formatMessage({ id: "MAKE_AN_APPOINTMENT" })}</Button>
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default injectIntl(CounselorServiceCategoryBox);
