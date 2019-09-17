import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import moment from "moment";

import { Avatar, Row, Col, Card, Icon, Comment, Tooltip, Tag } from "antd";

interface IProps {
  comment: any;
  confirmComment: any;
  refuseComment: any;
  deleteComment: any;
}

const styles = {
  paddingBottom: 10,
  paddingTop: 10
};

class CommentBox extends Component<IProps & InjectedIntlProps> {
  render() {
    const { _id, nickname, commentText, date, status, isDeleted } = this.props.comment;
    const { formatMessage } = this.props.intl;
    return (
      <Card>
        <Row type="flex">
          <Col span={18}>
            <Comment
              author={<a>{nickname}</a>}
              avatar={
                <Avatar
                  src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                  alt={nickname}
                />
              }
              content={<p>{commentText}</p>}
              datetime={<span>{moment(date).format("DD-MM-YYYY HH:mm")}</span>}
            />
          </Col>
          <Col
            span={6}
            style={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}
          >
            {status === "pending" ? (
              <React.Fragment>
                <span
                  onClick={() => {
                    this.props.confirmComment({ commentId: _id });
                  }}
                  style={{ margin: 10 }}
                >
                  <Tooltip title={formatMessage({ id: "CONFIRM" })}>
                    <Icon style={{ fontSize: 28 }} type="check-circle" />
                  </Tooltip>
                </span>
                <span
                  onClick={() => {
                    this.props.refuseComment({ commentId: _id });
                  }}
                  style={{ margin: 10 }}
                >
                  <Tooltip title={formatMessage({ id: "REFUSE" })}>
                    <Icon style={{ fontSize: 28 }} type="close" />
                  </Tooltip>
                </span>
              </React.Fragment>
            ) : (
              <Tag>{status}</Tag>
            )}
            {isDeleted === false ? (
              <span
                onClick={() => {
                  this.props.deleteComment({ commentId: _id });
                }}
                style={{ margin: 10 }}
              >
                <Tooltip title={formatMessage({ id: "DELETE" })}>
                  <Icon style={{ fontSize: 28 }} type="delete" />
                </Tooltip>
              </span>
            ) : (
              <Tag>{"deleted"}</Tag>
            )}
          </Col>
        </Row>
      </Card>
    );
  }
}

export default injectIntl(CommentBox);
