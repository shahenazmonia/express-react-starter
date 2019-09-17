import React, { Component } from "react";
import { Row, Col, Card, Input, Button } from "antd";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

const { TextArea } = Input;

interface IProps {
  onSendMessage: (
    params: { message: string | undefined; messageHeader: string | undefined }
  ) => void;
  clearText: boolean;
  onClearText: () => void;
}

interface IState {
  message: string | undefined;
  messageHeader: string | undefined;
}

class MessageSendBox extends Component<IProps & InjectedIntlProps, IState> {
  textRef: any;
  constructor(props) {
    super(props);
    this.textRef = React.createRef();
    this.state = {
      message: undefined,
      messageHeader: undefined
    };
  }

  onSendMessage = () => {
    const { message, messageHeader } = this.state;
    this.props.onSendMessage({ message, messageHeader });
  };

  componentWillReceiveProps(nextProps) {
    if (nextProps.clearText === true && this.state.message) {
      this.setState({ message: undefined, messageHeader: undefined }, () =>
        this.props.onClearText()
      );
    }
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { message, messageHeader } = this.state;
    return (
      <Row style={{ marginTop: 20 }}>
        <Col span={24}>
          <Input
            onChange={e => this.setState({ messageHeader: e.target.value })}
            value={messageHeader}
            placeholder={formatMessage({ id: "MESSAGE_HEADER" })}
          />
        </Col>
        <Col span={24} style={{ marginTop: 10 }}>
          <TextArea
            rows={4}
            ref={this.textRef}
            onChange={e => this.setState({ message: e.target.value })}
            value={message}
            placeholder={formatMessage({ id: "WRITE_MESSAGE" })}
          />
        </Col>
        <Col span={24} style={{ marginTop: 10, display: "flex", justifyContent: "flex-end" }}>
          <Button onClick={() => this.onSendMessage()}>{formatMessage({ id: "SEND" })}</Button>
        </Col>
      </Row>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {};
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(MessageSendBox));
