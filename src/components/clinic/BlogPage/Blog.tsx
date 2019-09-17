import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import InfiniteScroll from "react-infinite-scroller";

import blogStatus from "../../../utility/constants/blogStatus";
import history from "../../../_core/history";
import * as blogActions from "../../../store/actions/blogActions";
import BlogBox from "./BlogBox";

import styled from "styled-components";
import { Row, Col, Input, Pagination, Select, Button } from "antd";
const Search = Input.Search;
const Option = Select.Option;

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
  getBlogsForClinic: any;
  user: any;
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
      const filter = { clinicId: this.props.user._id, status, searchValue, ...params };
      const result = await this.props.getBlogsForClinic(filter);
      return result.action.payload.data;
    } catch (err) {
      return [];
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
          <Col xs={22} md={{ span: 16 }}>
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
                <Button onClick={() => history.push("/clinic/editor")}>
                  {formatMessage({ id: "ADD_BLOG" })}
                </Button>
              </Col>
            </Row>
          </Col>
        </Row>
        <RowFix type="flex" justify="center">
          <Col xs={22} md={{ span: 16 }}>
            <InfiniteScroll pageStart={0} loadMore={page => this.loadBlogs(page)} hasMore={hasMore}>
              {blogList &&
                blogList.map((item, i) => {
                  return <BlogBox key={i} {...item} />;
                })}
            </InfiniteScroll>
          </Col>
        </RowFix>
      </React.Fragment>
    );
  }
}
const stateToProps = state => {
  return {
    user: state.user
  };
};

const dispatchToProps = dispatch => {
  return {
    getBlogsForClinic: filter => dispatch(blogActions.getBlogsForClinic(filter))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(Blog));
