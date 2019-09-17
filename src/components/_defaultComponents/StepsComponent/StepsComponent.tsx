import * as React from "react";
import { connect } from "react-redux";

import history from "../../../_core/history";
import * as sessionCartActions from "../../../store/actions/sessionCartActions";

import { Steps, Icon } from "antd";
const Step = Steps.Step;

interface IProps {
  stepsData: { current: number; titleSteps: Array<{ title: string }> };
  resetSessionCart: () => any;
  sessionCart: any;
}

interface IState {}

class StepsComponent extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
    // this.props.resetSessionCart();
  }

  render() {
    const { stepsData, sessionCart } = this.props;
    return (
      <Steps
        current={stepsData.current}
        style={{ display: "flex", width: "100%", justifyContent: "center" }}
      >
        {stepsData.titleSteps.map((item, i) => {
          return (
            <Step
              key={i}
              title={
                <div
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    if (i == 0) history.push("/therapy/step1/onlineTherapy");
                    else if (i == 1)
                      sessionCart.counselorId
                        ? history.push("/therapy/step2/" + sessionCart.counselorId)
                        : history.push("/therapy/step1/onlineTherapy");
                    else history.push("/therapy/payment");
                  }}
                >
                  {item.title}
                </div>
              }
            />
          );
        })}
      </Steps>
    );
  }
}

const stateToProps = state => {
  return {
    sessionCart: state.sessionCart || {}
  };
};

const dispatchToProps = dispatch => {
  return {
    resetSessionCart: () => dispatch(sessionCartActions.resetSessionCart())
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(StepsComponent);
