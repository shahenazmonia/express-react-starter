import React, { Component } from "react";
import ClinicOperationBox from "../ClinicOperation/ClinicOperationBox";
import { Row, Col } from "antd";
import ChangePasswordBox from "./ChangePasswordBox";

interface IProps {
  id: string;
  onlyReview?: boolean;
}

interface IState {}

class ClinicEdit extends Component<IProps, IState> {
  render() {
    const { id, onlyReview } = this.props;
    return (
      <Row type="flex" justify="center">
        <Col xs={22} md={16}>
          <ClinicOperationBox isEdit={true} onlyReview={onlyReview} id={id} />
        </Col>
        {onlyReview && (
          <Col xs={22} md={16}>
            <ChangePasswordBox />
          </Col>
        )}
      </Row>
    );
  }
}
export default ClinicEdit;
