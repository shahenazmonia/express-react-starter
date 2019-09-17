import * as React from "react";

import { Row, Col, Avatar, Rate } from "antd";
import webseans from "../../../logo.svg";
import config from "../../../_core/config";

interface IProps {
  counselor: any;
}

interface IState {}

class DoctorProfile extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
  }

  render() {
    const { counselor } = this.props;
    return (
      <Row type="flex" align="middle">
        <Col>
          {counselor.profilePhoto ? (
            <Avatar
              size={128}
              shape="square"
              src={config.getBasePublicUrl() + "api/getFile/" + counselor.profilePhoto._id}
            />
          ) : (
            <Avatar size={128} shape="square" src={webseans} />
          )}
          <span>
            <h3>100 Seans</h3>
          </span>
          <span>
            <Rate value={5} />
          </span>
        </Col>
        <Col>
          <h3>{counselor.fullname}</h3>
          <h3>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium, adipisci! Unde
            sint at perferendis fugit quaerat quidem aperiam, recusandae alias!
          </h3>
        </Col>
      </Row>
    );
  }
}

export default DoctorProfile;
