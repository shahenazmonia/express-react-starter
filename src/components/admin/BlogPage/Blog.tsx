import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import InfiniteScroll from "react-infinite-scroller";
import _ from "lodash";

import blogStatus from "../../../utility/constants/blogStatus";
import history from "../../../_core/history";
import * as blogActions from "../../../store/actions/blogActions";
import BlogBox from "./BlogBox";

import styled from "styled-components";
import { Row, Col, Input, Pagination, Select, Button } from "antd";
const Search = Input.Search;
const Option = Select.Option;

interface IProps {
  getBlogs: any;
  publishBlog: any;
  removeBlog: any;
}

interface IState {
  blogList: Array<Object>;
  hasMore: boolean;
  status: string;
  searchValue: string;
}

class Blog extends Component<IProps & InjectedIntlProps, IState> {
  state = {
    blogList: [],
    hasMore: true,
    status: "",
    searchValue: ""
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
      const { status, searchValue } = this.state;
      const filter = { status, searchValue, ...params };
      const result = await this.props.getBlogs(filter);
      return result.action.payload.data;
    } catch (err) {
      return [];
    }
  }

  async publishBlog(blogId) {
    try {
      const { blogList } = this.state;
      let newBlogList: any = blogList;
      await this.props.publishBlog({ blogId });
      const publishedBlogIndex = _.findIndex(blogList, ["_id", blogId]);
      newBlogList[publishedBlogIndex].status = "published";
      this.setState({ blogList: newBlogList });
    } catch (err) {
      // console.log(err);
    }
  }

  async removeBlog(blogId) {
    try {
      const { blogList } = this.state;
      let newBlogList: any = blogList;
      await this.props.removeBlog({ blogId });
      const removedBlogIndex = _.findIndex(blogList, ["_id", blogId]);
      newBlogList[removedBlogIndex].status = "removed";
      this.setState({ blogList: newBlogList });
    } catch (err) {
      // console.log(err);
    }
  }

  onSearch = value => {
    this.setState({ blogList: [], searchValue: value }, () => {
      this.loadBlogs(1);
    });
  };

  handleStatusChange = value => {
    this.setState({ blogList: [], status: value }, () => {
      this.loadBlogs(1);
    });
  };
  render() {
    const { formatMessage } = this.props.intl;
    const { blogList, hasMore, searchValue } = this.state;
    return (
      <React.Fragment>
        <Row type="flex" justify="center">
          <Col xs={22} md={16}>
            <Row type="flex" justify="space-between">
              <Col>
                <Search
                  name="searchInput"
                  placeholder={formatMessage({ id: "PLACEHOLDER_SEARCH_IN_BLOGS" })}
                  onChange={e => this.setState({ searchValue: e.target.value })}
                  value={searchValue}
                  onSearch={value => this.onSearch(value)}
                  style={{ width: "100%" }}
                />
              </Col>
              <Col>
                <Select
                  allowClear
                  onChange={this.handleStatusChange}
                  placeholder={formatMessage({ id: "SELECT_STATUS" })}
                  style={{ width: 200 }}
                >
                  {blogStatus.map(item => {
                    return (
                      <Option key={item.id.toString()} value={item.value}>
                        {formatMessage({ id: item.text })}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
              <Col style={{ display: "flex", marginBottom: 20, justifyContent: "flex-end" }}>
                <Button onClick={() => history.push("/admin/editor")}>
                  {formatMessage({ id: "ADD_BLOG" })}
                </Button>
              </Col>
            </Row>
          </Col>
          <Col xs={22} md={16}>
            <InfiniteScroll pageStart={0} loadMore={page => this.loadBlogs(page)} hasMore={hasMore}>
              {blogList &&
                blogList.map((item, i) => {
                  return (
                    <BlogBox
                      key={i}
                      {...item}
                      publishBlog={this.publishBlog.bind(this)}
                      removeBlog={this.removeBlog.bind(this)}
                    />
                  );
                })}
            </InfiniteScroll>
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}
const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {
    getBlogs: filter => dispatch(blogActions.getBlogs(filter)),
    publishBlog: params => dispatch(blogActions.publishBlog(params)),
    removeBlog: params => dispatch(blogActions.removeBlog(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(Blog));
