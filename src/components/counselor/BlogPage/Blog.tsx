import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { injectIntl, InjectedIntlProps } from "react-intl";
import InfiniteScroll from "react-infinite-scroller";

import BlogBox from "./BlogBox";
import history from "../../../_core/history";
import * as blogActions from "../../../store/actions/blogActions";

import { Row, Col, Button, Pagination } from "antd";
import { deleteBlog } from "../../../store/actions/blogActions";

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
  getBlogs: any;
  user: any;
  deleteBlog: any;
}

interface IState {
  blogList: Array<Object>;
  hasMore: boolean;
}

class Blog extends Component<IProps & InjectedIntlProps, IState> {
  state = {
    blogList: [],
    hasMore: true
  };

  componentDidMount() {}

  loadBlogs = async page => {
    let blogList = this.state.blogList;
    const newBlogs = await this.fetchBlogList({ page });
    if (newBlogs.length !== 0) {
      this.setState({ blogList: [...blogList, ...newBlogs] });
    } else this.setState({ hasMore: false });
  };

  async fetchBlogList(params) {
    try {
      const filter = { creatorId: this.props.user._id };
      const result = await this.props.getBlogs({ ...filter, ...params });
      return result.action.payload.data;
    } catch (err) {
      return [];
    }
  }

  deleteBlog(id) {
    const params = { id };
    //  this.props.deleteBlog({ params }).then(res => this.fetchBlogs());
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { blogList, hasMore } = this.state;
    return (
      <React.Fragment>
        <Row type="flex" justify="center">
          <Col xs={22} md={{ span: 16 }}>
            <Row type="flex" justify="end">
              <Col>
                <Button onClick={() => history.push("/counselor/editor")}>
                  {formatMessage({ id: "ADD_BLOG" })}
                </Button>
              </Col>
            </Row>
            <RowFix type="flex" justify="center">
              <Col span={24}>
                <InfiniteScroll
                  pageStart={0}
                  loadMore={page => this.loadBlogs(page)}
                  hasMore={hasMore}
                >
                  {blogList &&
                    blogList.map((item, i) => {
                      return <BlogBox key={i} {...item} deleteBlog={this.deleteBlog.bind(this)} />;
                    })}
                </InfiniteScroll>
              </Col>
            </RowFix>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
const stateToProps = state => {
  return {
    user: state.user || {}
  };
};

const dispatchToProps = dispatch => {
  return {
    getBlogs: filter => dispatch(blogActions.getBlogs(filter)),
    deleteBlog: params => dispatch(blogActions.deleteBlog(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(Blog));
