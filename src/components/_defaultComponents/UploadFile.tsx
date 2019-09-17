import React from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { injectIntl, InjectedIntlProps } from "react-intl";

import { Upload as Uploader, Icon, Avatar, Button } from "antd";
import { UploadFile } from "antd/lib/upload/interface";
import * as fileUploadActions from "../../store/actions/fileUploadActions";
import * as alertActions from "../../store/actions/alertActions";
import { element } from "prop-types";
const Container = styled.div`
  .ant-upload-select-picture-card i {
    font-size: 32px;
    color: #999;
  }

  .ant-upload-select-picture-card .ant-upload-text {
    margin-top: 8px;
    color: #666;
  }
`;
interface IProps {
  acceptedTypes: any;
  multiple: boolean;
  uploadFile: (file: any) => any;
  showInfo: (params: any) => any;
  listType: any;
  icon: any;
  updateState: (params: any) => any;
  visible: boolean;
  fileSizeLimit: any;
  showUploadList: boolean;
  className?: any;
}

interface IState {
  previewVisible: boolean;
  previewImage: string;
  fileList: any;
  fileId: any;
  loading: boolean;
}

class UploadImage extends React.Component<IProps & InjectedIntlProps, IState> {
  state = {
    previewVisible: false,
    previewImage: "",
    fileList: [],
    fileId: undefined,
    loading: false
  };

  static defaultProps = {
    acceptedTypes: "image/gif, image/jpeg, image/png",
    multiple: false,
    icon: "user",
    listType: "picture",
    updateState: () => {},
    visible: true,
    fileSizeLimit: 15,
    showUploadList: false
  };

  handleCancel = () => this.setState({ previewVisible: false });

  handlePreview = file => {
    this.setState({
      previewImage: file.url || file.thumbUrl,
      previewVisible: true
    });
  };

  handleChange = ({ fileList }) => {
    console.log(fileList);

    this.setState({ fileList: [...fileList] });
  };

  beforeUpload = file => {
    const { fileSizeLimit, acceptedTypes } = this.props;
    if (file.size > fileSizeLimit * 1000 * 100) {
      this.props.showInfo({
        title: "HATAA",
        body: "image is too large, please pick a smaller fil",
        actionFunc: () => {
          this.setState({ fileList: [] });
        }
      });
      return false;
    } else {
      return true;
    }
  };

  render() {
    const { previewVisible, previewImage, fileList, fileId } = this.state;
    const {
      listType,
      multiple,
      uploadFile,
      acceptedTypes,
      icon,
      updateState,
      visible,
      children,
      showUploadList,
      className
    } = this.props;
    const { formatMessage } = this.props.intl;
    const Upload = props =>
      icon === "dragger" ? (
        <Uploader.Dragger {...props}>{props.children}</Uploader.Dragger>
      ) : (
        <Uploader {...props}>{props.children}</Uploader>
      );
    const uploadButton = (
      <div>
        {(() => {
          switch (icon) {
            case "user":
              return (
                <div>
                  <Avatar
                    size={100}
                    shape="square"
                    icon={"user"}
                    style={{ objectFit: "contain" }}
                  />
                </div>
              );
              break;
            case "file":
              return (
                <Button>
                  <Icon type="upload" />
                  {formatMessage({ id: "UPLOAD_FILE" })}
                </Button>
              );
              break;
            case "dragger":
              return (
                <div
                  style={{
                    alignItems: "flex-end",
                    display: "flex",
                    justifyContent: "center",
                    minHeight: "150px"
                  }}
                >
                  <div style={{ position: "absolute", bottom: 2 }}>
                    {" "}
                    {formatMessage({ id: "UPLOAD_FILE_HINT" })}
                  </div>
                </div>
              );
              break;
            default:
              return (
                <Button>
                  <Icon type="upload" />
                  {formatMessage({ id: "UPLOAD_FILE" })}
                </Button>
              );
              break;
          }
        })()}
      </div>
    );
    return (
      <Container className="clearfix">
        <Upload
          customRequest={({ onSuccess, onError, file }) => {
            this.setState({ loading: true });
            return uploadFile(file).then(result => {
              const fileInfo = result.action.payload.data;
              this.setState({ loading: false });
              onSuccess();
              this.handleChange({
                fileList: [
                  { ...(this.state.fileList[0] || {}), name: fileInfo.filename, status: "done" }
                ]
              });
              updateState(fileInfo);
            });
          }}
          className={className}
          style={{ display: visible ? "auto" : "none" }}
          listType={listType}
          accept={acceptedTypes}
          fileList={fileList}
          multiple={multiple}
          onPreview={this.handlePreview}
          onChange={this.handleChange}
          openFileDialogOnClick={!(icon === "dragger")}
          showUploadList={showUploadList}
          beforeUpload={this.beforeUpload}
        >
          {uploadButton}
          {icon === "dragger" && (
            <div
              style={{
                alignItems: "flex-end",
                display: "flex",
                justifyContent: "center",
                minHeight: "150px"
              }}
            />
          )}
          {children}
        </Upload>
      </Container>
    );
  }
}

const UploadImageWithRedux = connect(
  null,
  dispatch => ({
    uploadFile: file => dispatch(fileUploadActions.uploadFile({ file, name: file.name })),
    showInfo: params => dispatch(alertActions.showInfo(params))
  })
)(UploadImage);
export default injectIntl(UploadImageWithRedux);
