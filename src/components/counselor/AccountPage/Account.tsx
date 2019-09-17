import React, { Component } from "react";
import { connect } from "react-redux";
import CounselorAccount from "../../_defaultComponents/CounselorAccountPage/CounselorAccount";
import * as counselorActions from "../../../store/actions/counselorActions";

class Account extends Component<any, any> {
  state = { counselorInfo: {} };

  componentDidMount() {
    this.getCounselorInfo();
  }

  getCounselorInfo = async () => {
    try {
      const counselorId = this.props.user._id;
      const counselorInfo = (await this.props.getCounselorInfo({ counselorId })).action.payload
        .data;
      this.setState({
        counselorInfo
      });
    } catch (err) {
      // console.log(err);
    }
  };

  render() {
    const { counselorInfo } = this.state;
    console.log(counselorInfo);
    return (
      <CounselorAccount
        counselorInfo={counselorInfo}
        getCounselorInfo={this.getCounselorInfo}
        isCounselor={true}
      />
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user || {}
  };
};

const dispatchToProps = dispatch => {
  return {
    getCounselorInfo: params => dispatch(counselorActions.getCounselorInfo(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(Account);
