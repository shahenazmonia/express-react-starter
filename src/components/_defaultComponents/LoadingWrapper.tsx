import React from "react";
import { Spin, Row, Col } from "antd";
import theme from "../../styles/index";

export default props => (
  <div>
    {!props.loading ? (
      props.children
    ) : (
      <Col span={24} style={theme.fullPageCentered}>
        <Spin size={"large"} style={{ position: "absolute", alignSelf: "center" }} />
      </Col>
    )}
  </div>
);
