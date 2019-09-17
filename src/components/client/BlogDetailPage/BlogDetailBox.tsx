import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import { FacebookShareButton, FacebookIcon, TwitterShareButton, TwitterIcon } from "react-share";
import draftToHtml from "draftjs-to-html";
import moment from "moment";

import config from "../../../_core/config";
import * as alertActions from "../../../store/actions/alertActions";
import * as blogActions from "../../../store/actions/blogActions";
import CommentBox from "./CommentBox";
import CommentList from "./CommentList";
import BlogCreatorDetail from "../../_defaultComponents/BlogComponents/BlogCreatorDetail";
import BlogVideoThumbnail from "../../_defaultComponents/BlogVideo/BlogVideoThumbnail";

import { Avatar, Row, Col, Card, Icon } from "antd";

interface IProps {
  blog: any;
  comments: any;
  addComment: any;
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

class BlogDetailBox extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { creatorName: "" };
  }
  componentDidMount() {}

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

  addComment(values, { setSubmitting, resetForm }) {
    const theComment = {
      blogId: this.props.blog._id,
      nickname: values.nickname,
      commentText: values.commentText,
      date: moment()
    };
    this.props
      .addComment({ theComment })
      .then(result => {
        this.props.showInfo({
          title: "Başarılı",
          body:
            "Yorum başarılı bir şekilde oluşturuldu. Admin onayından geçtikten sonra yayınlanacak"
        });
      })
      .finally(() => {
        resetForm();
      });
  }

  render() {
    const { blog, comments } = this.props;
    const { creatorName } = this.state;
    const currentState = this.props.blog.currentState || {};
    const { media = {} } = currentState;
    const { image } = media;
    return (
      <Card bordered={true} style={{ marginBottom: 10 }}>
        <Row>
          <Col span={24} style={{ display: "flex", ...styles, flexDirection: "column" }}>
            <h2>
              <b>{currentState && currentState.title}</b>
            </h2>
            {currentState &&
              media &&
              (image ? (
                <img
                  src={config.getBasePublicUrl() + "api/getFile/" + image._id}
                  alt="Terapi"
                  width="100%"
                  height="auto"
                />
              ) : (
                <BlogVideoThumbnail media={media} />
              ))}
          </Col>
          <Col span={24} style={styles}>
            <BlogCreatorDetail
              creatorId={blog.creatorId}
              creatorRole={blog.creatorRole}
              creatorName={creatorName}
              createdAt={blog.createdAt}
              isClient={true}
            />

            <div
              style={{
                marginTop: 10
              }}
              dangerouslySetInnerHTML={{
                __html: draftToHtml(currentState && currentState.contentState)
              }}
            />

            <Row type="flex" justify="end" gutter={10}>
              <Col>
                <TwitterShareButton
                  style={{ cursor: "pointer" }}
                  url={config.getBasePublicUrl() + "blog/detail/" + blog._id}
                >
                  <TwitterIcon size={32} round={true} />
                </TwitterShareButton>
              </Col>
              <Col>
                <FacebookShareButton
                  style={{ cursor: "pointer" }}
                  url={config.getBasePublicUrl() + "blog/detail/" + blog._id}
                >
                  <FacebookIcon size={32} round={true} />
                </FacebookShareButton>
              </Col>
            </Row>
          </Col>
          <Col span={24}>
            <CommentBox blogId={blog && blog._id} addComment={this.addComment.bind(this)} />
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
)(injectIntl(BlogDetailBox));
