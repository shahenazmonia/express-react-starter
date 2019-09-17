import React, { Component } from "react";
import styled from "styled-components";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { SecondaryButton as Button } from "../../_defaultComponents/Buttons/index";
import history from "../../../_core/history";

import { Row, Col } from "antd";

const Container = styled.div`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  height: calc(${window.innerHeight}px - 140px);
`;

const Video = styled.video`
  width: 100% !important;
  object-fit: cover;
  height: calc(${window.innerHeight}px);
  background-size: cover;
  overflow: hidden;
  position: fixed;
  top: 0px;
`;

const LinearGra = styled.div`
  top: 0;
  left: 0;
  right: 0;
  height: 100vh;
  bottom: 0;
  position: fixed;
  background: ${props =>
    `linear-gradient(160deg, ${props.theme.colors.primaryGreen} 1%, ${
      props.theme.colors.primaryBlue
    } 100%)`};
  z-index: 60;
  opacity: 0.5;
`;

export const Text = styled.div`
  color: ${props => props.theme.colors.white};
  font-size: 16px;
  margin: 10px;
`;
export const ButtonsContainer = styled(Row)`
  z-index: 75;
  align-self: center;
  align-items: flex-start;
  flex-direction: column;
  position: fixed;
  justify-content: flex-start;
  display: flex;
  width: 80%;
  bottom: 40px;
  left: 10px;
  flex-flow: column !important;

  .button {
    background-color: transparent !important;
    color: ${props => props.theme.colors.white} !important;
    display: flex
    align-items: center;
    justify-content: center;
    align-self: flex-start;
    line-height: 25px;
    width: 13vw;
    margin: 15px;
    font-weight: 800 !important;
    font-size: 17px !important;
  }
`;
const Source = styled.source``;

class Slider extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      height: window.innerHeight
    };
  }

  componentDidMount() {
    window.addEventListener("resize", this.resize);
  }
  componentWillUnmount() {
    // If this component is unmounted, stop listening
    window.removeEventListener("resize", this.resize);
  }

  resize = () => {
    this.setState({ height: window.innerHeight });
  };

  render() {
    const { height } = this.state;
    const { formatMessage } = this.props.intl;

    return (
      <Container>
        <Video id="onlineTherapy" loop={true} autoPlay muted controls={false}>
          <Source src={"../../../videos/Background.mp4"} type="video/mp4" />
        </Video>
        <LinearGra className="slider-overlay" />
        <Col span={20}>
          <ButtonsContainer type="flex" className="buttons-container">
            <img
              className="button"
              src={require("../../../images/btn_2.svg")}
              onClick={() => history.push("/therapy/step1/dietician")}

            />
            <img
              src={require("../../../images/btn.svg")}
              className="button"
              onClick={() => history.push("/therapy/step1/onlineTherapy")}
            />
            <img
              src={require("../../../images/btn_1.svg")}
              className="button"
              onClick={() => history.push("/therapy/step1/lifeCoach")}
            />
          </ButtonsContainer>
        </Col>
      </Container>
    );
  }
}

export default injectIntl(Slider);
