import webseans from "../../../logo.svg";
import React from "react";
import { Col, Row } from "antd";
import { MenuButton } from "./styledHeader";
export default ({ navPressed }) => (
  <Col span={4} style={{ alignItems: "flex-start", justifyContent: "center" }}>
    <MenuButton>
      <img
        onClick={() => {
          navPressed("/");
        }}
        style={{
          cursor: "pointer",
          width: 100,
          margin: "auto"
        }}
        src={webseans}
      />
    </MenuButton>
  </Col>
);
