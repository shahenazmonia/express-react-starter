import React, { Component } from "react";

import FeedbackBox from "./FeedbackBox";

import { Row, Col } from "antd";

interface IProps {}

class Feedback extends Component<IProps> {
  render() {
    return (
      <Row type="flex" justify="center">
        <Col xs={22} sm={20} md={16} lg={14} xl={8}>
          <FeedbackBox />
        </Col>
      </Row>
    );
  }
}

export default Feedback;
