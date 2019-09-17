import React, { Component } from "react";
import styled from "styled-components";
import { Col } from "antd";
import { Link } from "react-router-dom";

import Footer from "../../_defaultComponents/Footer";
import Slider from "./Slider";
import Header from "../../_defaultComponents/Header/Header";
import theme from "../../../styles/index";
import OnlineTherapy from "./OnlineTherapy";
import LifeCoach from "./LifeCoach";
import DietPlan from "./DietPlan";

const tabs_content = [
  {
    pathname: "/therapy/step1/onlineTherapy",
    category: "Terapistler"
  },
  { pathname: "/therapy/step1/lifeCoach", category: "Yaşam Koçları" },
  { pathname: "/therapy/step1/dietician", category: "Diyetisyenler" }
];

const Container = styled(Col)`
  z-index: 100;
  display: flex !important;
  background-color: white;
  flex-direction: row !important;
  position-width: thin;
  border-color: grey;
  box-shadow: inset 0 -1px 0 0 #e3e3e3;
  background-color: rgba(255, 255, 255, 0.96);
  white-space: nowrap;
  text-align: center;
  min-height: 5vh;
  width: 100vw !important
  justify-content: center
  align-items: center
`;

const Text = styled.p`
  margin: 10px;
  font-size: 17px !important;
  font-weight: 600 !important;
  align-self: center;
  color: ${props => props.color || props.theme.colors.primaryBlue};
  &:hover {
    cursor: pointer;
  }
`;

const SlidingContainer = styled.div`
  z-index: 150;
  background-color: white;
  display: flex;
  position: relative;
  justify-content: center;
  width: 100%;
  align-items: center;
  flex-direction: column;
`;
class Home extends Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      headerPosition: "relative",
      selectedTab: tabs_content[0],
      opacity: 0.5
    };
    this.handleScroll = this.handleScroll.bind(this);
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  }

  handleScroll(event) {
    var container: any = document.getElementsByClassName("moving-container")[0];
    var header: any = document.getElementsByClassName("header")[0];
    var fakeHeader: any = document.getElementsByClassName("fake-header")[0];
    var sliderOverlay: any = document.getElementsByClassName("slider-overlay")[0];
    var buttonsContainer: any = document.getElementsByClassName("buttons-container")[0];
    var mainHeader: any = document.getElementsByClassName("main-header")[0];
    var antDHeader: any = document.getElementsByClassName("ant-d-header")[0];
    var topOffset: any = container.offsetTop;
    fakeHeader.style.height = `${header.clientHeight}px`;

    const opacity =
      ((window.innerHeight - container.getBoundingClientRect().top) / window.innerHeight) * 0.8 +
      0.5;
    if (sliderOverlay) sliderOverlay.style.opacity = opacity;
    if (buttonsContainer)
      buttonsContainer.style.opacity = 1 - opacity + 0.2 >= 0.5 ? 1 : 1 - opacity + 0.2;
    mainHeader.style.transform = `translate(${0}px,-${
      window.pageYOffset > topOffset / 2 ? (window.pageYOffset - topOffset / 2) * 0.2 : 0
    }px)`;
    if (window.pageYOffset > topOffset + 94) {
      window.requestAnimationFrame(() => {
        header.classList && header.classList.add("sticky");
        header.style.position = "fixed";
        fakeHeader.style.display = "flex";
      });
    } else {
      header.classList && header.classList.remove("sticky");
      header.style.position = "relative";
      fakeHeader.style.display = "none";
    }
  }

  scrollToTop = () => {
    var container: any = document.getElementsByClassName("moving-container")[0];
    window.scrollTo({
      top: container.offsetTop + 110,
      behavior: "smooth"
    });
  };

  render() {
    return (
      <Col span={24}>
        <Header inDefaultMainView={true} path={window.location.pathname} />
        <Slider />
        <SlidingContainer className="moving-container">
          <div className="fake-header" style={{ display: "none" }} />
          <Container span={24} className="header">
            {tabs_content.map(elem => (
              <div
                onClick={() => {
                  this.setState({ selectedTab: elem });
                  this.scrollToTop();
                }}
              >
                <Text
                  color={
                    this.state.selectedTab.category === elem.category
                      ? theme.colors.primaryGreen
                      : theme.colors.primaryBlue
                  }
                >
                  {elem.category}
                </Text>
              </div>
            ))}
          </Container>
          {(() => {
            switch (this.state.selectedTab.category) {
              case "Terapistler":
                return <OnlineTherapy />;
              case "Yaşam Koçları":
                return <LifeCoach />;
              case "Diyetisyenler":
                return <DietPlan />;
              default:
                return <OnlineTherapy />;
            }
          })()}

          <Footer fromDefaultMenu />
        </SlidingContainer>
      </Col>
    );
  }
}

export default Home;
