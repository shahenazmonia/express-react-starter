import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import config from "../../../_core/config";

import { Avatar, Row, Col } from "antd";
import { Link } from "react-router-dom";
import { connect } from "react-redux";
interface IProps {
  counselorInfo: any;
  clientInfo: any;
  showCounselor: boolean;
  id?: any;
  user: any;
}
interface IState {}

class AvatarDisplay extends Component<IProps & InjectedIntlProps, IState> {
  render() {
    const { formatMessage } = this.props.intl;
    const { showCounselor, counselorInfo, clientInfo } = this.props;
    const avatarImage = showCounselor
      ? (counselorInfo.profilePhoto || {})._id
      : (clientInfo.profilePhoto || {})._id;
    const { id } = this.props;
    const route = `/${this.props.user.roles[0]}`;

    return (
      <Row type="flex">
        <Col>
          <Link
            to={{
              pathname: showCounselor
                ? route + `/counselorProfile/${id}`
                : id
                ? route + `/client/${id}`
                : undefined
            }}
          >
            <Avatar
              src={avatarImage && config.getBasePublicUrl() + "api/getFile/" + avatarImage}
              style={{ fontSize: 64 }}
              shape="square"
              size={80}
              icon="user"
            />
          </Link>
        </Col>
        <Link
          to={{
            pathname: showCounselor
              ? route + `/counselorProfile/${id}`
              : id
              ? route + `/client/${id}`
              : undefined
          }}
        >
          <Col style={{ marginLeft: 10, alignSelf: "center" }}>
            {showCounselor
              ? counselorInfo && formatMessage({ id: "COUNSELOR" }) + " : " + counselorInfo.fullname
              : clientInfo &&
                formatMessage({ id: "UNIQ_CLIENT_ID" }) + " : " + clientInfo.uniqClientId}
          </Col>
        </Link>
      </Row>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user
  };
};

const AvatarWithInject = injectIntl(AvatarDisplay);
export default connect(
  stateToProps,
  null
)(AvatarWithInject);
