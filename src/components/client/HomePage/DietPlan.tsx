import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styled from "styled-components";
import { Row, Col } from "antd";
import { SecondaryButton as Button } from "../../_defaultComponents/Buttons/index";
import theme from "../../../styles/index";

import Counselor from "./Counselor";

const Heading = styled.h1`
  margin-top: 50px;
  margin-bottom: 0px
  font-size: 37px !important;
  font-weight: 400
  text-align: center;
  font-family: Harabara;
  letter-spacing: 3px;
  color: ${props => props.color};
`;

const SubHeading = styled.h1`
  font-size: 17px !important;
  font-weight: 500
  text-align: center;
  color: ${props => props.theme.colors.midGray};
`;

const Wrapper = styled.div`
  h3 {
    font-family: Harabara;
    color: ${props => props.theme.colors.primaryGreen};
    font-size: 24px;
    letter-spacing: 3px;

  }

  p {
    font-size: 17px;
  }

  .section {
  }

  img {
    width: -webkit-fill-available;
  }

  .ant-col-12 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: center;
  }

  .button:hover {
    background-color: ${props => props.theme.colors.primaryGreen} !important;
    color: ${props => props.theme.colors.white} !important;
    cursor: pointer;
  }

  .button {
    background-color: transparent !important;
    border: 1px solid ${props => props.theme.colors.primaryGreen} !important;
    color: ${props => props.theme.colors.primaryGreen} !important;
    display: flex
    align-items: center;
    justify-content: center;
    align-self: center;
    line-height: 25px;
    font-weight: 800 !important;
    font-size: 17px !important;
  }
`;

interface IProps {}
interface IState {}
class OnlineTherapy extends Component<IProps & InjectedIntlProps, IState> {
  render() {
    const { formatMessage } = this.props.intl;

    return (
      <Col span={18}>
        <Wrapper>
          <Heading>{formatMessage({ id: "DIETICIAN_HEADING" })}</Heading>
          <SubHeading>{formatMessage({ id: "DIETICIAN_SUB_HEADING" })}</SubHeading>
          <Row className="section" type="flex">
            <Col span={12}>
              <img style={{ objectFit: "cover" }} src={require("../../../images/diet-plan.svg")} />
            </Col>
            <Col span={12}>
              <h3>{formatMessage({ id: "DIETICIAN_FIRST_SECTION_TITLE" })}</h3>
              {/* <p>{formatMessage({ id: "DIETICIAN_FIRST_SECTION_DESCRIPTION" })}</p> */}
            </Col>
          </Row>
          <Row className="section" type="flex">
            <Col span={12}>
              <h3>{formatMessage({ id: "DIETICIAN_SECOND_SECTION_TITLE" })}</h3>
              <p>{formatMessage({ id: "DIETICIAN_SECOND_SECTION_DESCRIPTION" })}</p>
            </Col>
            <Col span={12}>
              <img style={{ objectFit: "cover" }} src={require("../../../images/diet-plan.svg")} />
            </Col>
          </Row>
          <Row className="section" type="flex">
            <Col span={12}>
              <img style={{ objectFit: "cover" }} src={require("../../../images/diet-plan.svg")} />
            </Col>
            <Col span={12}>
              <h3>{formatMessage({ id: "DIETICIAN_THIRD_SECTION_TITLE" })}</h3>
              <p>{formatMessage({ id: "DIETICIAN_THIRD_SECTION_DESCRIPTION" })}</p>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Button icon="file-text" className="button">
              {formatMessage({ id: "DIETICIAN_TOOLS" })}
            </Button>
          </Row>
          <Heading>{formatMessage({ id: "DIETICIANS_LIST" })}</Heading>
          <Counselor title={"Diyetisyenler"} />
        </Wrapper>
      </Col>
    );
  }
}

export default injectIntl(OnlineTherapy);
