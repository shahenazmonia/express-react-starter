import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import draftToHtml from "draftjs-to-html";

import config from "../../../_core/config";
import * as alertActions from "../../../store/actions/alertActions";
import * as blogActions from "../../../store/actions/blogActions";
import CommentList from "./CommentList";
import BlogImage from "../BlogComponents/BlogBoxImage";
import BlogCreatorDetail from "../BlogComponents/BlogCreatorDetail";

import { Avatar, Row, Col, Card, Icon } from "antd";
import VideoThumbnail from "../BlogVideo/BlogVideoThumbnail";

interface IProps {
  blog: any;
  comments: any;
  showInfo: any;
  getBlogCreatorName: (params: any) => any;
}

interface IState {
  creatorName: string;
}

const styles = {
  paddingBottom: 10,
  paddingTop: 10
};

class BlogDetail extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { creatorName: "" };
  }
  async componentDidMount() {}

  async componentWillReceiveProps(nextProps) {
    if (nextProps.blog !== this.props.blog) {
      try {
        const { blog } = nextProps;
        const creatorName = (await this.props.getBlogCreatorName({
          creatorId: blog.creatorId,
          creatorRole: blog.creatorRole
        })).action.payload.data;
        this.setState({ creatorName });
      } catch (err) {
        // console.log(err);
      }
    }
  }

  render() {
    const { blog, comments } = this.props;
    const { creatorName } = this.state;
    const blogInfo = blog.nextState ? blog.nextState : blog.currentState || {};
    const { media = {} } = blogInfo;
    const { image, url } = media;
    return (
      <Card bordered={true} style={{ marginBottom: 10 }}>
        <Row>
          <Col span={24} style={{ display: "flex", ...styles, flexDirection: "column" }}>
            <h1>
              <b>{blogInfo && blogInfo.title}</b>
            </h1>
            {blogInfo && blogInfo.media && image ? (
              <img
                src={
                  image._id && config.getBasePublicUrl() + "api/getFile/" + blogInfo.media.image._id
                }
                alt="Terapi"
                width="100%"
                height="auto"
              />
            ) : (
              <VideoThumbnail media={media} />
            )}

            {/*<BlogImage imageId={blogInfo.media.type === 'image' && blogInfo.media.type === 'image'._id} />*/}
          </Col>
          <Col span={24} style={styles}>
            <BlogCreatorDetail
              creatorId={blog.creatorId}
              creatorRole={blog.creatorRole}
              creatorName={creatorName}
              createdAt={blog.createdAt}
            />

            <div
              style={{
                marginTop: 10
              }}
              dangerouslySetInnerHTML={{
                __html: draftToHtml(blogInfo && blogInfo.contentState)
              }}
            />
          </Col>
          <Col span={24}>
            {comments &&
              comments.map((comment, i) => {
                return (
                  <React.Fragment key={i}>
                    <CommentList comment={comment} />
                  </React.Fragment>
                );
              })}
          </Col>
        </Row>
      </Card>
    );
  }
}

const dispatchToProps = dispatch => {
  return {
    showInfo: params => dispatch(alertActions.showInfo(params)),
    getBlogCreatorName: params => dispatch(blogActions.getBlogCreatorName(params))
  };
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(BlogDetail));
