import React, { Component } from "react";
import Messages from "../../_defaultComponents/Messages/Messages";

class MessagesPage extends Component<{}> {
  render() {
    return <Messages isShowSendBox={false} role={"client"} />;
  }
}

export default MessagesPage;
