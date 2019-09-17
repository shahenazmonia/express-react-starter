import React, { StatelessComponent } from "react";
import moment from "moment";

import webseans from "../../../logo.svg";
import config from "../../../_core/config";
import history from "../../../_core/history";
import BlogBoxImage from "../../_defaultComponents/BlogComponents/BlogBoxImage";
import BlogStats from "../../_defaultComponents/BlogComponents/BlogStats";

import { Icon, Row, Col, Card } from "antd";

interface BlogBoxProps {
  _id: string;
  title: string;
  comment_size: Int32Array;
  date: string;
  description: string;
  viewed: Int32Array;
  imageInfo: any;
  createdAt: string;
  nextState: any;
  currentState: any;
  seenCount: number;
  commentNumber: number;
  status: string;
  comments: Array<any>;
}

const styles = {
  paddingBottom: 10,
  paddingTop: 10
};

const BlogBox: StatelessComponent<BlogBoxProps> = props => {
  const { _id, createdAt, comments, seenCount, commentNumber, nextState, currentState } = props;
  const blog = currentState;
  return (
    <Card bordered={true} style={{ marginBottom: 10 }}>
      <Row type="flex" justify="start" gutter={16}>
        <Col md={6} style={{ display: "flex", alignItems: "center", ...styles }}>
          <BlogBoxImage media={blog.media} />
        </Col>
        <Col md={18} style={styles}>
          <Row>
            <Col span={16}>
              <h2>
                <a style={{ color: "black" }} onClick={() => history.push("/blog/detail/" + _id)}>
                  {blog.title}
                </a>
              </h2>
            </Col>
          </Row>
          <Row>
            <Col>
              <BlogStats
                createdAt={createdAt}
                seenCount={seenCount}
                commentNumber={commentNumber}
              />
            </Col>
          </Row>
          <Row style={{ marginTop: 10 }}>
            <Col span={24}>
              <div
                style={{
                  height: 32,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  whiteSpace: "nowrap"
                }}
              >
                {blog.plainText}
              </div>
            </Col>
          </Row>
        </Col>
      </Row>
    </Card>
  );
};

export default BlogBox;
