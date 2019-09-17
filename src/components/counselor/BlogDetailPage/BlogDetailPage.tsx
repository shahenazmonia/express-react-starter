import React, { Component } from "react";
import { connect } from "react-redux";

import * as blogActions from "../../../store/actions/blogActions";
import * as commentActions from "../../../store/actions/commentActions";
import BlogDetail from "../../_defaultComponents/BlogDetailPage/BlogDetail";

import { Row, Col, Card, Input } from "antd";

interface IProps {
  blogId: string;
  getBlogDetails: any;
  getComments: any;
}

interface IState {
  blog: any;
  comments: any;
}

class BlogDetailPage extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = { blog: {}, comments: [] };
  }
  componentDidMount() {
    const promises = [
      this.props.getBlogDetails({ blogId: this.props.blogId }),
      this.props.getComments({ blogId: this.props.blogId, status: "confirmed", isDeleted: false })
    ];
    Promise.all(promises).then(result => {
      this.setState({
        blog: result[0].action.payload.data,
        comments: result[1].action.payload.data
      });
    });
  }
  render() {
    return (
      <Row type="flex" justify="center">
        <Col xs={22} md={{ span: 15, offset: 1 }}>
          <BlogDetail blog={this.state.blog} comments={this.state.comments} />
        </Col>
      </Row>
    );
  }
}

const stateToProps = state => {
  return {
    // user: state.user || {}
  };
};

const dispatchToProps = dispatch => {
  return {
    getBlogDetails: params => dispatch(blogActions.getBlogDetails(params)),
    getComments: params => dispatch(commentActions.getComments(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(BlogDetailPage);
