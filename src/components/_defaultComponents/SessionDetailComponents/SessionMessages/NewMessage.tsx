import React, { Component } from "react";
import moment from "moment";

import { Input, Row, Col, Card, Button } from "antd";
import { InjectedIntlProps, injectIntl } from "react-intl";
import UploadFile from "../../UploadFile";

interface IProps {
  user: any;
  newSessionMessage: (params: any, params2: any) => any;
  sessionId: string;
}

interface IState {
  message: string;
  file: any;
  sent: boolean;
}

class NewMessage extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { message: "", file: undefined, sent: false };
  }
  onSendClick = () => {
    const { file } = this.state;
    this.props.newSessionMessage(this.state.message, file);
    this.setState({ message: "", file: undefined, sent: true });
  };

  componentDidMount() {}

  render() {
    const {} = this.props;
    const { formatMessage } = this.props.intl;
    const { message, file, sent } = this.state;
    return (
      <Row style={{ padding: 20, alignItems: "center", justifyContent: "center" }}>
        <Col>
          <h4>{formatMessage({ id: "SEND_MESSAGE" })}</h4>
        </Col>
        <Col>
          <UploadFile
            acceptedTypes="application/pdf"
            icon="dragger"
            fileSizeLimit={20}
            showUploadList={!sent && true}
            listType="text"
            updateState={file => {
              this.setState({ file });
            }}
          />
          <UploadFile
            acceptedTypes="application/pdf"
            fileSizeLimit={20}
            showUploadList={!sent && true}
            className={"new-message"}
            listType="text"
            visible={false}
            updateState={file => {
              this.setState({ file });
            }}
          />
        </Col>
        <Col
          style={{
            position: "absolute",
            width: "80%",
            alignSelf: "center",
            "margin-left": "auto",
            "margin-right": "auto",
            left: 0,
            right: 0,
            bottom: 0,
            marginTop: "auto",
            top: "25%",
            marginBottom: "auto"
          }}
        >
          <Input.TextArea
            name="message"
            value={message}
            style={{ minHeight: "100px", alignSelf: "center", justifyContent: "center" }}
            onChange={e => this.setState({ message: e.target.value })}
          />
        </Col>
        <Col style={{ display: "flex", justifyContent: "flex-end", marginTop: 15 }}>
          <Row>
            <Col
              style={{
                display: "flex",
                justifyContent: "flex-end",
                marginTop: 15
              }}
            >
              <Button
                type="primary"
                onClick={() => {
                  const filePicker: any = document
                    .getElementsByClassName("new-message")[0]
                    .getElementsByClassName("ant-upload")[1];
                  filePicker.click();
                }}
                icon="file"
                style={{ marginRight: 15 }}
              >
                {formatMessage({ id: "ATTACH_FILE" })}
              </Button>
              <Button
                disabled={message || file ? false : true}
                type="primary"
                onClick={this.onSendClick}
              >
                {formatMessage({ id: "SEND" })}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

export default injectIntl(NewMessage);
