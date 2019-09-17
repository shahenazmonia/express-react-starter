import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import history from "../../../_core/history";
import RegisterBox from "../../_defaultComponents/RegisterBox/RegisterBox";
import * as counselorActions from "../../../store/actions/counselorActions";

interface IProps {
  id: string;
  findCounselorUser(params: any): any;
}

interface IState {
  email: string | undefined;
}

class RegisterPageForCounselor extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      email: undefined
    };
  }

  componentDidMount = async () => {
    const { id } = this.props;
    try {
      const email = (await this.props.findCounselorUser(id)).action.payload.data.email;
      this.setState({ email });
    } catch (err) {
      // console.log(err);
    }
  };
  render() {
    return (
      <Row type="flex" justify="center">
        <Col xs={22} sm={20} md={16} lg={14} xl={8}>
          <RegisterBox isCounselor={true} {...this.props} {...this.state} />
        </Col>
      </Row>
    );
  }
}
const dispatchToProps = dispatch => {
  return {
    findCounselorUser: params => dispatch(counselorActions.findCounselorUser(params))
  };
};

export default connect(
  null,
  dispatchToProps
)(RegisterPageForCounselor);
