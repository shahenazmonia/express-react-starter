import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import moment from "moment";
import _ from "lodash";

import blogStatus from "../../../utility/constants/blogStatus";
import webseans from "../../../logo.svg";
import config from "../../../_core/config";
import history from "../../../_core/history";
import BlogBoxImage from "../../_defaultComponents/BlogComponents/BlogBoxImage";
import BlogStats from "../../_defaultComponents/BlogComponents/BlogStats";

import { Icon, Row, Col, Card, Button, Tag } from "antd";

interface IProps {
  _id: string;
  title: string;
  imageInfo: any;
  createdAt: string;
  comments: Array<any>;
  seenCount: number;
  commentNumber: number;
  status: string;
  nextState: any;
  currentState: any;
  deleteBlog: any;
  publishBlog: any;
  removeBlog: any;
}

const styles = {
  paddingBottom: 10,
  paddingTop: 10
};

class BlogBox extends Component<IProps & InjectedIntlProps> {
  deleteBlog() {
    const { _id } = this.props;
    this.props.deleteBlog(_id);
  }

  render() {
    const { formatMessage } = this.props.intl;
    const {
      _id,
      createdAt,
      nextState,
      currentState,
      seenCount,
      commentNumber,
      status
    } = this.props;
    const blog = nextState ? nextState : currentState;
    return (
      <Card bordered={true} style={{ marginBottom: 10 }}>
        <Row type="flex" justify="start" gutter={16}>
          <Col md={4} style={{ display: "flex", alignItems: "center", ...styles }}>
            <BlogBoxImage media={blog.media} />
          </Col>
          <Col md={16} style={styles}>
            <Row>
              <Col>
                <h2>
                  <a
                    style={{ color: "black" }}
                    onClick={() => history.push("/clinic/blog/detail/" + _id)}
                  >
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
              <Col span={16}>
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
          <Col
            md={4}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              marginBottom: 5
            }}
          >
            <React.Fragment>
              <Tag style={{ marginBottom: 5 }} color={status === "published" ? "green" : "orange"}>
                {formatMessage({ id: _.find(blogStatus, ["value", status]).text })}
              </Tag>
              <Button
                onClick={() => {
                  history.push("/clinic/editor/" + _id);
                }}
              >
                {formatMessage({ id: "UPDATE" })}
              </Button>
            </React.Fragment>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default injectIntl(BlogBox);
