import React, { Component } from "react";
import ClientAccount from "../../_defaultComponents/ClientAccountPage/ClientAccount";
import users from "../../../utility/constants/user";
import { Row, Col } from "antd";

interface IProps {
  clientId: string;
}

class ClientAccountPage extends Component<IProps> {
  render() {
    return (
      <Row type="flex" justify="center">
        <Col xs={22} sm={18} lg={14}>
          <ClientAccount clientId={this.props.clientId} userType={users.ADMIN} />
        </Col>
      </Row>
    );
  }
}
export default ClientAccountPage;
