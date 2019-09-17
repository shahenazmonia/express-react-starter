import * as React from "react";
import { Card, Row, Col, Button } from "antd";
import _ from "lodash";
import history from "../../../_core/history";
import CounselorCalendarModal from "../Modals/CounselorCalendarModal";
import { injectIntl, InjectedIntlProps } from "react-intl";
interface IProps {
  isCounselor: boolean;
  counselorInfo: any;
}

interface IState {
  openModal: boolean;
}
class CounselorTopBox extends React.Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);

    this.state = {
      openModal: false
    };
  }

  hideFeedbackModal() {
    this.setState({ openModal: false });
  }

  render() {
    const { isCounselor } = this.props;
    const { openModal } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <React.Fragment>
        <CounselorCalendarModal
          openModal={openModal}
          hideFeedbackModal={() => this.hideFeedbackModal()}
        />
        <Card>
          <Row>
            <Col span={24}>
              <h3 style={{ textAlign: "center" }}>
                {formatMessage({ id: "COUNSELOR_PROFILE_HOURLY_WAGE_RANGE" })}
              </h3>
              <p style={{ textAlign: "center" }}>100 - 200 TL</p>
            </Col>
            <Col span={24} style={{ marginTop: 20, display: isCounselor ? "none" : "block" }}>
              <Button onClick={() => history.push("/therapy/time")} style={{ width: "100%" }}>
                {formatMessage({ id: "COUNSELOR_PROFILE_TRIAL_SESSION" })}
              </Button>
            </Col>
            <Col span={24} style={{ marginTop: 20, display: isCounselor ? "none" : "block" }}>
              <Button onClick={() => history.push("/therapy/payment")} style={{ width: "100%" }}>
                {formatMessage({ id: "COUNSELOR_PROFILE_BUY_NOW" })}
              </Button>
            </Col>
            <Col
              onClick={() => history.push("/therapy/time")}
              span={24}
              style={{ marginTop: 20, display: isCounselor ? "none" : "block" }}
            >
              <Button style={{ width: "100%" }}>
                {formatMessage({ id: "COUNSELOR_PROFILE_APPOINTMENT" })}
              </Button>
            </Col>
            <Col span={24} style={{ marginTop: 20 }}>
              <Button onClick={() => this.setState({ openModal: true })} style={{ width: "100%" }}>
                {formatMessage({ id: "COUNSELOR_PROFILE_CALENDER" })}
              </Button>
            </Col>
            <Col span={24} style={{ marginTop: 20 }}>
              <Button
                onClick={() => {
                  isCounselor ? history.push("/counselor/blog") : history.push("/blog");
                }}
                style={{ width: "100%" }}
              >
                {formatMessage({ id: "COUNSELOR_PROFILE_BLOG" })}
              </Button>
            </Col>
          </Row>
        </Card>
      </React.Fragment>
    );
  }
}

export default injectIntl(CounselorTopBox);
