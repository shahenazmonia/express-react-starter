import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import moment from "moment";
import _ from "lodash";

import { getStatusText } from "../../../utility/statusHelper";
import users from "../../../utility/constants/user";

import { Row, Col, Tag, Button, Badge } from "antd";

interface IProps {
  userType?: string;
  isOpenJitsi?: boolean;
  onStartClick?: any;
  status: string;
  cancelSession?: () => any;
  epikriz?: string;
  openEpikrizModal?: () => any;
  sessionDate?: object;
}
interface IState {}

class StatusDisplay extends Component<IProps & InjectedIntlProps, IState> {
  render() {
    const { formatMessage } = this.props.intl;
    const {
      userType,
      onStartClick,
      status,
      cancelSession,
      sessionDate,
      epikriz,
      openEpikrizModal
    } = this.props;
    const startTime = moment(sessionDate);
    const isCounselor = userType === "counselor";
    const timeUntilSession = moment.duration(startTime.diff(moment()));

    return (
      <Row>
        <Col>
          {formatMessage({ id: "STATUS" }) + ": " + formatMessage({ id: getStatusText(status) })}
        </Col>
        {status === "pending" && (timeUntilSession.asDays() >= 1 || isCounselor) && (
          <Col>
            <Button type="primary" onClick={cancelSession}>
              {formatMessage({ id: "CANCEL_SESSION" })}
            </Button>
          </Col>
        )}
        {isCounselor && status === "completed" && (
          <Col>
            <Button type="primary" onClick={openEpikrizModal}>
              {formatMessage({ id: epikriz ? "UPDATE_EPIKRIZ" : "ADD_EPIKRIZ" })}
            </Button>
          </Col>
        )}
        {(userType === users.COUNSELOR || userType === users.CLIENT) &&
          this.props.isOpenJitsi &&
          status === "live" && (
            <React.Fragment>
              <Col style={{ marginTop: 10 }}>
                <Button type="primary" onClick={onStartClick}>
                  {formatMessage({ id: "JOIN_SESSION" })}
                </Button>
              </Col>
            </React.Fragment>
          )}
      </Row>
    );
  }
}

export default injectIntl(StatusDisplay);
