import React, { Component } from "react";
import { connect } from "react-redux";
import * as counselorActions from "../../../store/actions/counselorActions";
import * as counselorSubscriptionActions from "../../../store/actions/counselorSubscriptionActions";
import CounselorAccount from "../../_defaultComponents/CounselorAccountPage/CounselorAccount";

import { Row, Col } from "antd";

interface IProps {
  counselorId: string;
  getCounselorInfo: any;
}

interface IState {
  counselorInfo: any;
}
class CounselorAccountPage extends Component<IProps, IState> {
  state = {
    counselorInfo: {}
  };
  async componentDidMount() {
    try {
      const { counselorId } = this.props;
      const counselorInfo = (await this.props.getCounselorInfo({ counselorId })).action.payload
        .data;
      this.setState({
        counselorInfo
      });
    } catch (err) {
      // console.log(err);
    }
  }

  render() {
    const { counselorInfo } = this.state;
    return (
      <Row type="flex" justify="center">
        <Col span={24}>
          <CounselorAccount counselorInfo={counselorInfo} />
        </Col>
      </Row>
    );
  }
}

const stateToProps = state => {
  return {
    //  user: state.user || {}
  };
};

const dispatchToProps = dispatch => {
  return {
    getCounselorInfo: params => dispatch(counselorActions.getCounselorInfo(params))
  };
};

export default connect(
  null,
  dispatchToProps
)(CounselorAccountPage);
