import * as React from "react";
import { connect } from "react-redux";
import _ from "lodash";

import * as counselorActions from "../../../store/actions/counselorActions";
import * as counselorCategoryActions from "../../../store/actions/counselorCategoryActions";
import CounselorMainBox from "./CounselorMainBox";
import CounselorTopBox from "./CounselorTopBox";
import users from "../../../utility/constants/user";

import { Row, Col, Modal } from "antd";
import { async } from "q";

interface IProps {
  userType?: string;
  counselorId?: string;
  getCounselorInfo: (params: any) => any;
  getCounselorCategories: (params: any) => any;
  switchInstantTherapy: (params: any) => any;
}

interface IState {
  counselorInfo: any;
  counselorCategories: any;
  instantTherapy: boolean;
}

class CounselorProfile extends React.Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = { counselorInfo: {}, counselorCategories: [], instantTherapy: false };
  }

  componentDidMount() {
    this.fetchCounselorInfo();
  }

  fetchCounselorInfo = async () => {
    try {
      const { counselorId } = this.props;
      const result = await Promise.all([
        this.props.getCounselorInfo({ counselorId }),
        this.props.getCounselorCategories({ counselorId, isCategoryUsed: true })
      ]);
      this.setState({
        counselorInfo: result[0].action.payload.data,
        counselorCategories: result[1].action.payload.data,
        instantTherapy: result[0].action.payload.data.instantTherapy
      });
    } catch (err) {
      // console.log(err);
    }
  };

  onInstantTherapySwitch = async checked => {
    try {
      const { counselorId } = this.props;
      await this.props.switchInstantTherapy({ counselorId, instantTherapy: checked });
      await this.fetchCounselorInfo();
    } catch (err) {
      // console.log(err);
    }
  };

  render() {
    const { userType } = this.props;
    const { counselorInfo, counselorCategories, instantTherapy } = this.state;
    const isCounselor = userType === users.COUNSELOR ? true : false;
    console.log("counselorInfo", counselorInfo);

    return (
      <Row type="flex">
        <Col md={{ span: 7 }} style={{ position: "fixed", right: 80 }}>
          <CounselorTopBox counselorInfo={counselorInfo} isCounselor={isCounselor} />
        </Col>
        <Col md={{ span: 12, offset: 2 }}>
          {!_.isEmpty(counselorInfo) && (
            <CounselorMainBox
              counselorInfo={counselorInfo}
              counselorCategories={counselorCategories}
              instantTherapy={instantTherapy}
              isCounselor={isCounselor}
              onInstantTherapySwitch={this.onInstantTherapySwitch}
            />
          )}
        </Col>
      </Row>
    );
  }
}

const stateToProps = state => {
  return {};
};

const dispatchToProps = dispatch => {
  return {
    getCounselorInfo: params => dispatch(counselorActions.getCounselorInfo(params)),
    getCounselorCategories: params =>
      dispatch(counselorCategoryActions.getCounselorCategories(params)),
    switchInstantTherapy: params => dispatch(counselorActions.switchInstantTherapy(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(CounselorProfile);
