import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import styled from "styled-components";

import history from "../../_core/history";
import webseans from "../../images/webseans.png";
import letsencrypt from "../../images/letsencrypt.png";
import payu from "../../images/payu.png";
import hippaa from "../../images/hippaa.png";
import PolicyModal from "./Modals/PolicyModal";

import { Menu, Icon, Row, Col } from "antd";
const logos = [{ url: letsencrypt }, { url: payu }, { url: hippaa }];
const ListTitle = styled.h3`
  color: ${props => props.theme.colors.primaryGreen};
  font-weight: 700;
  font-size: 14px;
  text-align: left;
  line-height: 1;
  margin-bottom: 15px;
  vertical-align: baseline;
  display: flex;
  word-break: break-word;
  flex-wrap: wrap;
  flex-grow: 1;
  flex-shrink: 1;
`;

const WarningText = styled.h4`
  font-size: 15px;
  text-align: center;
  color: white;
`;
const Wrapper = styled(Col)`
  display: flex;
  align-items: center;
  z-index: 100;
  justiy-content: space-around;
  flex-direction: column;
  color: ${props => props.theme.colors.midGray}
  background-color: #fafafa;
  border-top: 1px solid #f3f3f3;
  padding: 50px 0px;
  padding-bottom: 0px;
  a {
    text-align: left;
    color: ${props => props.theme.colors.midGray};
    margin-right: auto;

  }
  a:hover {
    color: ${props => props.theme.colors.primaryBlue}
  }

 .footer-list {
   display: flex;
   flex-direction: column;
   alignIt
 }

 p {
  font-family: Harabara;
  font-size: 24px;
  text-align: center;
  letter-spacing: 2px;
  margin-top: 7px;
  color: ${props => props.theme.colors.primaryBlack}

}

`;

const Logo = styled.img`
  width: 50%;
  object-fit: contain;
  align-self: flex-start;
  transform: translate(0px, -14px);
`;

const WarningBanner = styled(Row)`
  background-color: ${props => props.theme.colors.red};
  padding: 20px 20px;
  margin-top: 10px;
`;

const ReliabilitySection = styled(Row)`
  padding: 0px 10vw;
`;

interface FooterProps {
  fromDefaultMenu?: boolean;
}
interface IState {
  openPPModal: boolean;
  openToSModal: boolean;
  openDSModal: boolean;
}

class Footer extends Component<FooterProps & InjectedIntlProps, IState> {
  state = { openPPModal: false, openToSModal: false, openDSModal: false };
  openPPModal = () => {
    this.setState({ openPPModal: true });
  };

  hidePPModal = () => {
    this.setState({ openPPModal: false });
  };
  openToSModal = () => {
    this.setState({ openToSModal: true });
  };

  hideToSModal = () => {
    this.setState({ openToSModal: false });
  };
  openDSModal = () => {
    this.setState({ openDSModal: true });
  };

  hideDSModal = () => {
    this.setState({ openDSModal: false });
  };
  render() {
    const { formatMessage } = this.props.intl;
    const { openPPModal, openToSModal, openDSModal } = this.state;
    const { fromDefaultMenu } = this.props;
    return (
      <Wrapper span={24}>
        {fromDefaultMenu && (
          <>
            <PolicyModal
              openModal={openPPModal}
              title={formatMessage({ id: "PRIVACY_POLICIY" })}
              content={formatMessage({ id: "PRIVACY_POLICY_TEXT" })}
              hidePolicyModal={this.hidePPModal}
            />
            <PolicyModal
              openModal={openToSModal}
              title={formatMessage({ id: "TERMS_OF_SERVICE" })}
              content={formatMessage({ id: "TERMS_OF_SERVICE_TEXT" })}
              hidePolicyModal={this.hideToSModal}
            />
            <PolicyModal
              openModal={openDSModal}
              title={formatMessage({ id: "DISTANCE_SALES_CONTRACT" })}
              content={formatMessage({ id: "DISTANCE_SALES_CONTRACT_TEXT" })}
              hidePolicyModal={this.hideDSModal}
            />
            <ReliabilitySection type="flex" justify="center">
              <span>
                <img
                  style={{ width: "50px", height: "65px", "object-fit": "none" }}
                  src={require("../../images/security.svg")}
                />
              </span>
              <p>Sitemiz güvenlidir</p>
            </ReliabilitySection>
            <ReliabilitySection type="flex" justify="space-around">
              {logos.map(item => (
                <Logo style={{ width: "15vw", height: "15vw" }} src={item.url} />
              ))}
            </ReliabilitySection>
          </>
        )}
        <Row type="flex" className="footer-wrapper" align="top" justify="center">
          <Col span={5}>
            <div>
              <Logo src={webseans} />
            </div>
          </Col>
          <Col className="footer-list" span={5}>
            <ListTitle>Sayfalar</ListTitle>
            <a href="">Ana Sayfa</a>
            <a href="/about">Hakkımızda</a>
            <a href="/contact">İletişim</a>
          </Col>
          <Col className="footer-list" span={5}>
            <ListTitle>Hizmet Alanlarımız</ListTitle>

            <a href="/therapy/step1/onlineTherapy">Online Terapi</a>
            <a href="/therapy/step1/lifeCoach">Yaşam Koçu</a>
            <a href="/therapy/step1/dietician">Diyetisyen</a>
          </Col>
          <Col className="footer-list" span={5}>
            <ListTitle>Destek</ListTitle>
            <a href="/FAQ">SSS</a>
            <a onClick={this.openPPModal}>{formatMessage({ id: "PRIVACY_POLICIY" })}</a>
            <a onClick={this.openToSModal}>{formatMessage({ id: "TERMS_OF_SERVICE" })}</a>
            <a onClick={this.openDSModal}>{formatMessage({ id: "DISTANCE_SALES_CONTRACT" })}</a>
            <a href="/cancel-refund">{`İptal & İade`}</a>
          </Col>
        </Row>
        {fromDefaultMenu && (
          <WarningBanner>
            <WarningText>
              webseans.com hayati riskler taşıyan ve acil psikolojik sorunların çözümü için uygun
              değildir. Medikal tedavi gerektiren veya kriz durumları, intihar veya başkalarına
              zarar verme düşüncesi gibi ciddi sorun(lar) yaşıyorsanız vakit kaybetmeden lütfen en
              yakınınızdaki acil servise müracaat edin.
            </WarningText>
          </WarningBanner>
        )}
      </Wrapper>
    );
  }
}

export default injectIntl(Footer);
