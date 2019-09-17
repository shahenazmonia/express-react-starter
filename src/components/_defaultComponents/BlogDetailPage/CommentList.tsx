import React, { Component } from "react";
import { Avatar, Row, Col, Card, Icon, Comment, Tooltip } from "antd";
import moment from "moment";

interface IProps {
  comment: any;
}

const styles = {
  paddingBottom: 10,
  paddingTop: 10
};

class CommentList extends Component<IProps> {
  render() {
    const { nickname, commentText, date } = this.props.comment;
    return (
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
    );
  }
}

export default CommentList;
