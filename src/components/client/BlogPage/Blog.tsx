import React, { Component } from "react";
import { connect } from "react-redux";
import { InjectedIntlProps, injectIntl } from "react-intl";
import InfiniteScroll from "react-infinite-scroller";
import _ from "lodash";

import * as blogActions from "../../../store/actions/blogActions";
import BlogBox from "./BlogBox";
import MostReadBlogs from "./MostReadBlogs";

import styled from "styled-components";
import { Row, Col, Card, Input } from "antd";

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
  min-height: 60vh;
  @media (max-width: 768px) {
    justify-content: center;
  }
  @media (min-width: 768px) {
    justify-content: start;
  }
`;

interface IProps {
  getBlogs: any;
  search: string;
}

interface IState {
  blogList: Array<any>;
  hasMore: boolean;
  mostReadBlogs: Array<Object>;
  searchValue: string;
}

class Blog extends Component<IProps & InjectedIntlProps, IState> {
  state = {
    blogList: [],
    mostReadBlogs: [],
    hasMore: true,
    searchValue: this.getSearchQuery() || ""
  };
  async componentDidMount() {
    this.getSearchQuery();
  }

  getSearchQuery(): string {
    const searchText = this.props.search;
    const query = _.split(_.split(searchText, "?")[1], "=");
    let queryObj = {};
    queryObj[query[0]] = query[1];
    return queryObj["search"];
  }

  loadBlogs = async page => {
    let blogList = this.state.blogList;
    const newBlogs = await this.fetchBlogList({ page });
    if (newBlogs.length !== 0) {
      this.setState({ blogList: [...blogList, ...newBlogs] });
    } else this.setState({ hasMore: false });
  };

  async fetchBlogList(params) {
    try {
      const { searchValue } = this.state;
      let filter = { status: "published", searchValue, ...params };
      let promises = [this.props.getBlogs(filter)];
      const result = await Promise.all(promises);
      return result[0].action.payload.data;
    } catch (err) {
      return [];
    }
  }

  onSearch = value => {
    this.setState({ blogList: [], searchValue: value }, () => {
      this.loadBlogs(1);
    });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { blogList, hasMore, searchValue } = this.state;
    return (
      <RowFix type="flex">
        <ColFix xs={22} md={6}>
          <Input.Search
            name="searchInput"
            placeholder={formatMessage({ id: "PLACEHOLDER_SEARCH_IN_BLOGS" })}
            onChange={e => this.setState({ searchValue: e.target.value })}
            value={searchValue}
            onSearch={value => this.onSearch(value)}
            style={{ width: "100%" }}
          />
          <MostReadBlogs />
        </ColFix>
        <Col xs={22} md={{ span: 15, offset: 1 }}>
          <InfiniteScroll pageStart={0} loadMore={page => this.loadBlogs(page)} hasMore={hasMore}>
            {blogList &&
              blogList.map((blog, i) => {
                return (
                  <React.Fragment key={i}>
                    <BlogBox {...blog} />
                  </React.Fragment>
                );
              })}
          </InfiniteScroll>
        </Col>
      </RowFix>
    );
  }
}
/*const stateToProps = state => {
  return {};
};*/

const dispatchToProps = dispatch => {
  return {
    getBlogs: filter => dispatch(blogActions.getBlogs(filter))
  };
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(Blog));
