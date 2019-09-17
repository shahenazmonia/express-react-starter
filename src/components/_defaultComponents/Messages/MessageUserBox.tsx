import React, { Component } from "react";
import { Row, Col, Card } from "antd";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import MessageRoleSelectBox from "../SelectBoxes/MessageRoleSelectBox";
// import UserListCheckBox from "../CheckBoxes/UserListCheckBox";

interface IProps {
  role: string;
  selectedToUser: ({ toUsers: string }) => void;
}

interface IState {}

class MessageUserBox extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { role, selectedToUser } = this.props;
    return (
      <Row>
        <Col span={24}>
          <MessageRoleSelectBox role={role} selectedToUser={selectedToUser} />
        </Col>
        {/* <UserListCheckBox /> */}
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
)(injectIntl(MessageUserBox));
