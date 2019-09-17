import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import history from "../../../_core/history";
import users from "../../../utility/constants/user";
import * as sessionActions from "../../../store/actions/sessionActions";
import * as sessionCartActions from "../../../store/actions/sessionCartActions";
import * as alertActions from "../../../store/actions/alertActions";
import StepsComponent from "../../_defaultComponents/StepsComponent/StepsComponent";
import PaymentBox from "./PaymentBox";

import { Row, Col } from "antd";

interface IProps {
  user: any;
  sessionCart: any;
  createSession: (params: any) => any;
  getClosestSession: (params: any) => any;
  setSessionCart: (params: any) => any;
  resetSessionCart: () => any;
  showError: (params: any) => any;
}

interface IState {}

class OnlineTherapyPayment extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
  }

  onPayClick = async () => {
    const { sessionCart, user, showError } = this.props;
    if (!user.loggedIn) {
      showError({
        title: "Ödeme Hatası",
        body: "Seans alımı yapabilmeniz için giriş yapmanız gereklidir.",
        actionTitle: "Giriş Yap",
        actionFunc: () => {
          history.push("/login/?redirect_url=/therapy/payment");
        }
      });
    } else {
      try {
        const result = await this.props.createSession({
          sessionInfo: { ...sessionCart, clientId: user._id }
        });

        await this.props.resetSessionCart();
        await history.push("/therapy/payment/successful/" + result.action.payload.data._id);
        await this.props.getClosestSession({ userId: user._id, role: users.CLIENT });
      } catch (err) {
        console.log(err);
      }
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { sessionCart } = this.props;
    const stepsData = {
      current: 2,
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
          <Col span={20} style={{ marginBottom: 100, marginTop: 30 }}>
            <StepsComponent stepsData={stepsData} />
          </Col>
          <Col span={20}>
            <PaymentBox sessionCart={sessionCart} onPayClick={this.onPayClick} />
          </Col>
        </Row>
      </React.Fragment>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user,
    sessionCart: state.sessionCart
  };
};

const dispatchToProps = dispatch => {
  return {
    createSession: params => dispatch(sessionActions.createSession(params)),
    getClosestSession: params => dispatch(sessionActions.getClosestSession(params)),
    setSessionCart: params => dispatch(sessionCartActions.setSessionCart(params)),
    resetSessionCart: () => dispatch(sessionCartActions.resetSessionCart()),
    showError: params => dispatch(alertActions.showError(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(OnlineTherapyPayment));
