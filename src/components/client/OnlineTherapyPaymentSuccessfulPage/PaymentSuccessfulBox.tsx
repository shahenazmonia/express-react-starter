import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";
import moment from "moment";
import config from "../../../_core/config";

import { Card, Avatar, Row, Col } from "antd";

interface IProps {
  sessionInfo: any;
  counselorInfo: any;
}
interface IState {}

class PaymentBox extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
  }
  render() {
    const { formatMessage } = this.props.intl;
    const { sessionInfo, counselorInfo } = this.props;
    const imageId = (counselorInfo.profilePhoto || {})._id;
    const avatar = imageId && config.getBasePublicUrl() + "api/getFile/" + imageId;

    return (
      <Card bordered={true}>
        <Row type="flex" align="middle" gutter={18}>
          <Col style={{ marginBottom: 20 }}>
            <Avatar src={avatar} icon={!avatar ? "user" : undefined} shape="square" size={128} />
          </Col>
          <Col span={18}>
            <h3>{counselorInfo.fullname}</h3>
            <span>
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Cupiditate repudiandae
              assumenda harum dignissimos maiores magni possimus ad placeat est. Iure.
            </span>
          </Col>
          <Col span={24}>
            <br />
            <h2>{formatMessage({ id: "THERAPY_SUCCESFUL_PAYMENT_INFO" })}</h2>
            <hr />
            <h3>
              {formatMessage({ id: "THERAPY_PAYMENT_AMOUNT_PAYABLE" })} {sessionInfo.sessionPrice} ₺
            </h3>
            <h3>{formatMessage({ id: "THERAPY_PAYMENT_BALANCE" })} 0 ₺</h3>
            <h3>
              {formatMessage({ id: "THERAPY_SUCCESSFUL_AMOUNT_PAID" })} {sessionInfo.sessionPrice} ₺
            </h3>
          </Col>
          <Col span={24}>
            <br />
            <br />
            <h2>{formatMessage({ id: "THERAPY_SUCCESFUL_APPOINTMENT_INFO" })}</h2>
            <hr />
            <h3>
              {formatMessage({ id: "THERAPY_SUCCESSFUL_DATE" })}
              {moment(sessionInfo.sessionDate)
                .local()
                .format("DD/MM/YYYY")}
            </h3>
            <h3>
              {formatMessage({ id: "THERAPY_SUCCESSFUL_HOUR" })}
              {moment(sessionInfo.sessionDate)
                .local()
                .format("HH:mm")}
            </h3>
          </Col>
        </Row>
      </Card>
    );
  }
}

export default injectIntl(PaymentBox);
