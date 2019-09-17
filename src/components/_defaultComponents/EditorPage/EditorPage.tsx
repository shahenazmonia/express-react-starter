import React from "react";
import { Editor } from "react-draft-wysiwyg";
import { EditorState, convertToRaw, convertFromRaw } from "draft-js";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { connect } from "react-redux";
import moment from "moment";

import config from "../../../_core/config";
import history from "../../../_core/history";
import * as alertActions from "../../../store/actions/alertActions";
import * as fileUploadActions from "../../../store/actions/fileUploadActions";
import * as blogActions from "../../../store/actions/blogActions";
import ServiceCategorySelectBox from "../SelectBoxes/ServiceCategorySelectBox";
import UploadImage from "../UploadFile";

import { Radio, Button, Card, Input, Row, Col, Alert, message } from "antd";
const RadioGroup = Radio.Group;
interface IProps {
  blogId?: string;
}

interface ReduxProps {
  updateBlog: any;
  showInfo: any;
  user: any;
  uploadFile: any;
  addBlog: any;
  getBlogDetails: any;
}

interface IState {
  blog: any;
  blogImage: any;
  editorState: EditorState | undefined;
  imageInfo?: any;
  title?: string;
  isUpdate: boolean;
  media: any;
  url: any;
  error: boolean;
}

class EditorPage extends React.Component<IProps & ReduxProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      blog: {},
      editorState: undefined,
      blogImage: undefined,
      imageInfo: {},
      isUpdate: false,
      media: undefined,
      url: undefined,
      error: false
    };
  }

  componentDidMount() {
    if (this.props.blogId) {
      this.fetchBlogInfo(this.props.blogId);
      this.setState({ isUpdate: true });
    }
  }

  async fetchBlogInfo(blogId) {
    this.props.getBlogDetails({ blogId }).then(res => {
      const blogInfo = res.action.payload.data;
      const rawContent = convertFromRaw(
        blogInfo.currentState ? blogInfo.currentState.contentState : blogInfo.nextState.contentState
      );
      let editorState = EditorState.createWithContent(rawContent);
      this.setState(
        {
          blog: blogInfo.currentState ? blogInfo.currentState : blogInfo.nextState,
          editorState
        },
        () => {
          const { blog } = this.state;
          this.setState({ url: blog ? (blog.media || {}).url : undefined });
        }
      );
    });
  }

  onEditorStateChange = editorState => {
    this.setState({
      editorState
    });
  };

  handleUploadImage(e) {
    this.setState({ imageInfo: e });
  }

  chooseMedia = e => {
    this.setState({ media: e.target.value });
  };

  onUpdateClick() {
    const { blog, imageInfo, editorState, url, media } = this.state;
    const { user, blogId } = this.props;
    let updateInfo = {
      ...blog,
      blogId,
      title: blog.title,
      mainCategory: blog.mainCategory,
      contentState: convertToRaw(editorState.getCurrentContent()),
      plainText: editorState.getCurrentContent().getPlainText(' '),
      updaterId: user._id,
      updaterRole: user.roles[0],
      updateDate: moment()
    };
    if (imageInfo._id) updateInfo["media"] = { type: "image", image: imageInfo };
    if (url || (url && media === 2)) updateInfo["media"] = { type: "video", url };
    this.props.updateBlog({ updateInfo }).then(res => {
      this.props.showInfo({
        title: "Başarılı",
        body: "Blog başarılı bir şekilde güncellendi.",
        actionFunc: () => {
          history.push("/" + this.props.user.roles[0] + "/blog");
        }
      });
    });
  }

  validateForm = blog => {
    const blog_fields = ["title", "contentState", "mainCategory", "media"];
    let valid = true;
    blog_fields.forEach(field => (blog[field] ? null : (valid = false)));
    return valid;
  };
  renderUploadImage = () => {
    return (
      <Card style={{ marginTop: "10px" }}>
        <UploadImage fileSizeLimit={30} icon="file" updateState={e => this.handleUploadImage(e)} />
      </Card>
    );
  };

  renderVideoInput = () => {
    const { formatMessage } = this.props.intl;
    return (
      <Card style={{ marginTop: "10px" }}>
        <Input
          placeholder={formatMessage({ id: "ENTER_YOUR_VIDEO_LINK_HERE" })}
          value={this.state.url}
          onChange={e => {
            this.setState({ url: e.target.value });
          }}
        />
      </Card>
    );
  };
  onSaveClick() {
    const { blog, imageInfo, editorState, url, media } = this.state;
    const { user, blogId } = this.props;
    let blogInfo = {
      creatorId: user._id,
      creatorRole: user.roles[0],
      createdAt: moment(),
      title: blog.title,
      mainCategory: blog.mainCategory,
      contentState: convertToRaw(editorState.getCurrentContent()),
      plainText: editorState.getCurrentContent().getPlainText(' ')
    };
    if (imageInfo._id) blogInfo["media"] = { type: "image", image: imageInfo };
    if (url && media === 2) blogInfo["media"] = { type: "video", url };
    if (this.validateForm(blogInfo)) {
      this.props.addBlog({ blogInfo }).then(res => {
        this.props.showInfo({
          title: "Başarılı",
          body: "Blog başarılı bir şekilde oluşturuldu.",
          actionFunc: () => {
            history.push("/" + this.props.user.roles[0] + "/blog");
          }
        });
      });
    } else {
      this.setState({ error: true });
      setTimeout(() => this.setState({ error: false }), 1000);
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { blog, imageInfo, isUpdate, media } = this.state;

    return (
      <Row type="flex" justify="center">
        <Col span={16}>
          <Card>
            <Row style={{ marginBottom: 20 }}>
              <Col span={24}>
                <h2>{formatMessage({ id: "TITLE" })}</h2>
              </Col>
              <Col span={16}>
                <Input
                  placeholder={formatMessage({ id: "ENTER_TITLE" })}
                  value={blog.title}
                  onChange={e => {
                    this.setState({ blog: { ...blog, title: e.target.value } });
                  }}
                />
              </Col>
            </Row>
            <Row style={{ marginBottom: 20 }}>
              <Col>
                <h2>{formatMessage({ id: "IMAGE" })}</h2>
              </Col>
              <Col>
                <Card>
                  {!isUpdate && (
                    <RadioGroup onChange={this.chooseMedia} value={this.state.media}>
                      <Radio value={2}>Video</Radio>
                      <Radio value={1}>Image</Radio>
                    </RadioGroup>
                  )}
                  {media === 1
                    ? this.renderUploadImage()
                    : media === 2
                    ? this.renderVideoInput()
                    : null}
                  {((blog.media && blog.media.image) || (imageInfo && imageInfo._id)) && (
                    <div>
                      <img
                        width={180}
                        height={240}
                        src={
                          (imageInfo._id || blog.media.image._id) &&
                          config.getBasePublicUrl() +
                            "api/getFile/" +
                            (imageInfo._id || blog.media.image._id)
                        }
                      />
                      {this.renderUploadImage()}
                    </div>
                  )}
                  {blog.media && blog.media.url && this.renderVideoInput()}
                </Card>
              </Col>
            </Row>
            <Row style={{ marginBottom: 20 }}>
              <Col span={24}>
                <h2>{formatMessage({ id: "MAIN_CATEGORY" })}</h2>
              </Col>
              <Col span={16}>
                <ServiceCategorySelectBox
                  value={blog.mainCategory}
                  onChange={mainCategory => {
                    this.setState({ blog: { ...blog, mainCategory } });
                  }}
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>{formatMessage({ id: "CONTENT" })}</h2>
              </Col>
              <Col>
                <Card>
                  <Editor
                    spellcheck
                    editorStyle={{ display: "flex", width: "100%", height: 400 }}
                    editorState={this.state.editorState}
                    onEditorStateChange={this.onEditorStateChange}
                  />
                </Card>
              </Col>
            </Row>
          </Card>
          {this.state.error && (
            <Alert
              message={formatMessage({ id: "PLEASE_FILL_SOME_DATA_IN_FIELDS" })}
              type="error"
              showIcon
            />
          )}
          <div style={{ display: "flex", width: "100%", justifyContent: "center" }}>
            <Button
              type="primary"
              ghost
              style={{ textAlign: "center", marginTop: 20 }}
              onClick={isUpdate ? this.onUpdateClick.bind(this) : this.onSaveClick.bind(this)}
            >
              {isUpdate ? formatMessage({ id: "UPDATE" }) : formatMessage({ id: "SAVE" })}
            </Button>
          </div>
        </Col>
      </Row>
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
    uploadFile: ({ file, name }) => dispatch(fileUploadActions.uploadFile({ file, name })),
    addBlog: params => dispatch(blogActions.addBlog(params)),
    updateBlog: params => dispatch(blogActions.updateBlog(params)),
    getBlogDetails: params => dispatch(blogActions.getBlogDetails(params)),
    showInfo: params => dispatch(alertActions.showInfo(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(EditorPage));
