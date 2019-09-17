import React, { Component } from "react";
import { connect } from "react-redux";
import styled from "styled-components";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Avatar, Carousel, Icon, Col, Button as BookingButton } from "antd";

import { getCounselorList } from "../../../store/actions/counselorActions";
import config from "../../../_core/config";
import theme from "../../../styles/index";

const Title = styled.div`
  margin-top: 20px;
  color: ${props => props.theme.colors.primaryGreen};
  font-size: 17px;
  font-weight: normal;
`;

const Button = styled.span`
  :hover {
    cursor: pointer;
  }
`;

const ArrowRight = styled(Icon)`
  position: absolute;
  right: 20px;
  font-size: 20px;
  z-index: 1000;
  bottom: 50%;
`;

const ArrowLeft = styled(Icon)`
  position: absolute;
  left: 20px;
  font-size: 20px;
  z-index: 1000;
  bottom: 50%;
`;

const CarouselItem = styled.div`
  display: flex !important;
  justify-content: center !important;
  align-items: center !important;
  margin: 10px;
  flex-direction: column !important;
`;

const AvatarItem = styled(Avatar)`
  border-radius: 50%;
  border: 2px ${props => props.theme.colors.white} solid;
  @media (min-width: 768px) {
    width: 70px !important;
    height: 70px !important;
    font-size: 70px !important;
  }
  @media (max-width: 768px) {
    width: 70px !important;
    height: 70px !important;
    font-size: 70px !important;
  }
`;

const Cover = styled.img`
  width: 100% !important;
  overflow: hidden;
`;

const GradLeft = styled.div`
  position: absolute;
  left: 0px;
  z-index: 100;
  background-color: grey;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 1) 30%,
    rgba(255, 255, 255, 0.7679446778711485) 43%,
    rgba(255, 255, 255, 0) 57%
  );
  top: 0px;
  bottom: 0px;
  width: 300px;
`;

const GradRight = styled.div`
  position: absolute;
  right: 0px;
  z-index: 100;
  background-color: grey;
  background: rgb(255, 255, 255);
  background: linear-gradient(
    270deg,
    rgba(255, 255, 255, 1) 30%,
    rgba(255, 255, 255, 0.7679446778711485) 43%,
    rgba(255, 255, 255, 0) 57%
  );
  top: 0px;
  bottom: 0px;
  width: 300px;
`;

const Content = styled.div``;

interface IProps {
  title: string;
  getCounselorList: (params: any) => any;
}

interface IState {
  counselorList: any;
}

class Counselor extends Component<IProps & InjectedIntlProps, any> {
  private carousel = React.createRef<Carousel>();
  constructor(props) {
    super(props);
    this.next = this.next.bind(this);
    this.previous = this.previous.bind(this);
  }
  state = {
    counselorList: [
      {
        fullname: "Ada Lovelace",
        isActive: true,
        lastSessionDate: null,
        registerDate: "2019-04-25T13:54:17.095Z",
        _id: "5cc1bc09a9f2224f6333b584"
      },
      {
        fullname: "Ada Lovelace",
        isActive: true,
        lastSessionDate: null,
        registerDate: "2019-04-25T13:54:17.095Z",
        _id: "5cc1bc09a9f2224f6333b584"
      },
      {
        fullname: "Ada Lovelace",
        isActive: true,
        lastSessionDate: null,
        registerDate: "2019-04-25T13:54:17.095Z",
        _id: "5cc1bc09a9f2224f6333b584"
      }
    ]
  };

  next() {
    this.carousel.current!.innerSlider.slickNext();
  }
  previous() {
    this.carousel.current!.innerSlider.slickPrev();
  }

  getData = async () => {
    const result = (await this.props.getCounselorList({ page: 1, skip: 1 })).action.payload.data;
    this.setState({ counselorList: [...result.counselorList, ...this.state.counselorList] });
  };

  componentDidMount() {
    this.getData();
  }

  render() {
    var settings = {
      dots: false,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      initialSlide: 0,
      responsive: [
        {
          breakpoint: 1260,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 768,
          settings: {
            slidesToShow: 3
          }
        },
        {
          breakpoint: 576,
          settings: {
            slidesToShow: 1
          }
        }
      ]
    };

    const { title } = this.props;
    const { counselorList } = this.state;
    const { formatMessage } = this.props.intl;

    return (
      <div style={{ position: "relative", marginTop: 20 }}>
        <Button onClick={this.previous}>
          <ArrowLeft type="left" />
        </Button>
        <Content className="content">
          <GradLeft />
          <Carousel ref={this.carousel} className="carousel" {...settings}>
            {counselorList &&
              counselorList.map((item: any, i) => {
                return (
                  <div style={{ padding: 20 }}>
                    <CarouselItem key={i}>
                      <Cover src="https://crowdcast-prod.imgix.net/-K80ucf8t18dzkswZQ2g/profile-cover-5942" />
                      <Col
                        style={{
                          transform: `translate(0, -50px)`,
                          alignItems: "center",
                          justifyContent: "center",
                          display: "flex",
                          flexDirection: "column"
                        }}
                      >
                        {item.profilePhoto && item.profilePhoto._id ? (
                          <AvatarItem
                            src={config.getBasePublicUrl() + "api/getFile/" + item.profilePhoto._id}
                            style={{}}
                          />
                        ) : (
                          <AvatarItem
                            icon="user"
                            src="https://crowdcast-prod.imgix.net/-K80ucf8t18dzkswZQ2g/profile-4782"
                            style={{}}
                          />
                        )}
                        <Title>{item.fullname}</Title>
                        <p>{formatMessage({ id: "VIEW_NOW" })}</p>
                        <BookingButton
                          size="large"
                          style={{
                            backgroundColor: theme.colors.primaryBlue,
                            color: theme.colors.white
                          }}
                        >
                          {formatMessage({ id: "MAKE_AN_APPOINTMENT" })}
                        </BookingButton>
                      </Col>
                    </CarouselItem>
                  </div>
                );
              })}
          </Carousel>
          <GradRight />
        </Content>
        <Button onClick={this.next}>
          <ArrowRight type="right" />
        </Button>
      </div>
    );
  }
}

const CounselorWithRedux = connect(
  null,
  dispatch => ({
    getCounselorList: params => dispatch(getCounselorList(params))
  })
)(Counselor);

export default injectIntl(CounselorWithRedux);
