import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";

import history from "../../../_core/history";
import * as blogActions from "../../../store/actions/blogActions";
import * as commentActions from "../../../store/actions/commentActions";
import BlogDetailBox from "./BlogDetailBox";
import MostReadBlogs from "../BlogPage/MostReadBlogs";

import { Row, Col, Card, Input } from "antd";
import { injectIntl, InjectedIntlProps } from "react-intl";

const ColFix = styled(Col)`
  @media (max-width: 768px) {
    position: relative;
  }
  @media (min-width: 768px) {
    position: fixed !important;
    right: 50px;
  }
`;

const RowFix = styled(Row)`
  @media (max-width: 768px) {
    justify-content: center;
  }
  @media (min-width: 768px) {
    justify-content: start;
  }
`;

interface IProps {
  blogId: string;
  getBlogDetails: (params: any) => any;
  increaseSeenCount: (params: any) => any;
  getComments: (params: any) => any;
  addComment: (params: any) => any;
}

interface IState {
  blog: any;
  comments: any;
}

class BlogDetail extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { blog: {}, comments: [] };
  }
  componentDidMount() {
    const promises = [
      this.props.getBlogDetails({ blogId: this.props.blogId }),
      this.props.getComments({ blogId: this.props.blogId, status: "confirmed", isDeleted: false }),
      this.props.increaseSeenCount({ blogId: this.props.blogId })
    ];
    Promise.all(promises).then(result => {
      this.setState({
        blog: result[0].action.payload.data,
        comments: result[1].action.payload.data
      });
    });
  }
  render() {
    const { formatMessage } = this.props.intl;
    return (
      <RowFix type="flex">
        <ColFix xs={22} md={6}>
          <Input.Search
            placeholder={formatMessage({ id: "PLACEHOLDER_SEARCH_IN_BLOGS" })}
            onSearch={value => history.push("/blog?search=" + value)}
            style={{ width: "100%" }}
          />
          <MostReadBlogs />
        </ColFix>
        <Col xs={22} md={{ span: 15, offset: 1 }}>
          <BlogDetailBox
            blog={this.state.blog}
            comments={this.state.comments}
            addComment={this.props.addComment}
          />
        </Col>
      </RowFix>
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
    increaseSeenCount: params => dispatch(blogActions.increaseSeenCount(params)),
    getComments: params => dispatch(commentActions.getComments(params)),
    addComment: params => dispatch(commentActions.addComment(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(BlogDetail));
