import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import * as commentActions from "../../../store/actions/commentActions";
import users from "../../../utility/constants/user";
import CommentBox from "./CommentBox";

import { Row, Col, Button, Card } from "antd";

interface IProps {
  getComments: any;
  confirmComment: any;
  refuseComment: any;
  deleteComment: any;
  blogId: any;
}

interface IState {
  comments: any;
}

class ManageCommentsPage extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { comments: [] };
  }

  componentDidMount() {
    this.fetchComments();
  }

  fetchComments() {
    this.props.getComments({ blogId: this.props.blogId }).then(result => {
      this.setState({ comments: result.action.payload.data });
    });
  }

  confirmComment({ commentId }) {
    this.props.confirmComment({ commentId }).then(result => {
      this.fetchComments();
    });
  }

  refuseComment({ commentId }) {
    this.props.refuseComment({ commentId }).then(result => {
      this.fetchComments();
    });
  }

  deleteComment({ commentId }) {
    this.props.deleteComment({ commentId }).then(result => {
      this.fetchComments();
    });
  }

  render() {
    const { comments } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <Row type="flex" justify="center">
        <Col span={18}>
          <Card>
            {comments.map(comment => {
              return (
                <CommentBox
                  comment={comment}
                  confirmComment={this.confirmComment.bind(this)}
                  refuseComment={this.refuseComment.bind(this)}
                  deleteComment={this.deleteComment.bind(this)}
                />
              );
            })}
          </Card>
        </Col>
      </Row>
    );
  }
}

const dispatchToProps = dispatch => {
  return {
    getComments: params => dispatch(commentActions.getComments(params)),
    confirmComment: params => dispatch(commentActions.confirmComment(params)),
    refuseComment: params => dispatch(commentActions.refuseComment(params)),
    deleteComment: params => dispatch(commentActions.deleteComment(params))
  };
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(ManageCommentsPage));
