import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import * as sessionActions from "../../../store/actions/sessionActions";
import * as counselorActions from "../../../store/actions/counselorActions";

import StepsComponent from "../../_defaultComponents/StepsComponent/StepsComponent";
import PaymentSuccessful from "./PaymentSuccessfulBox";

import { Row, Col, Alert } from "antd";

interface IProps {
  sessionId: string;
  getSessionDetail: (params: any) => any;
  getCounselorInfo: (params: any) => any;
}

interface IState {
  sessionInfo: any;
  counselorInfo: any;
}

class OnlineTherapyPaymentSuccessful extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { sessionInfo: {}, counselorInfo: {} };
  }

  componentDidMount() {
    const { sessionId } = this.props;
    this.props.getSessionDetail({ sessionId }).then(result => {
      this.setState({ sessionInfo: result.action.payload.data }, () => {
        this.props
          .getCounselorInfo({ counselorId: this.state.sessionInfo.counselorId })
          .then(result => {
            this.setState({ counselorInfo: result.action.payload.data });
          });
      });
    });
  }

  render() {
    const { formatMessage } = this.props.intl;
    const { sessionInfo, counselorInfo } = this.state;
    const stepsData = {
      current: 3,
      titleSteps: [
        {
          title: "Doktor Seçimi"
        },
        {
          title: "Gün ve Saat Seçimi"
        },
        {
          title: "Ödeme"
        }
      ]
    };
    return (
      <React.Fragment>
        <Row type="flex" justify="center">
          <Col span={20} style={{ marginBottom: 50, marginTop: 30 }}>
            <StepsComponent stepsData={stepsData} />
          </Col>
          <Col span={6} style={{ marginBottom: 50 }}>
            <Alert
              message="Ödeme Başarılı"
              type="success"
              description={
                " Lorem ipsum dolor, sit amet consectetur adipisicing elit. Accusamus, nobis dolorum adipisci quos rerum doloremque deleniti in maiores suscipit incidunt."
              }
              showIcon
              style={{ fontSize: 20 }}
            />
          </Col>
          <Col span={20}>
            <PaymentSuccessful sessionInfo={sessionInfo} counselorInfo={counselorInfo} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const dispatchToProps = dispatch => {
  return {
    getSessionDetail: params => dispatch(sessionActions.getSessionDetail(params)),
    getCounselorInfo: params => dispatch(counselorActions.getCounselorInfo(params))
  };
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(OnlineTherapyPaymentSuccessful));
