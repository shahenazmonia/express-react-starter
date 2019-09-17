import React, { Component } from "react";
import { Row, Col } from "antd";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import * as counselorActions from "../../../store/actions/counselorActions";
import * as counselorCategoryActions from "../../../store/actions/counselorCategoryActions";
import history from "../../../_core/history";
import CounselorServiceOperationBox from "./CounselorServiceOperationBox";

interface IProps {
  user: any;
  id: string;
  getCounselorInfo: any;
  getCounselorCategories: (params: any) => any;
  updateCounselorMinPrice: (params: any) => any;
}

interface IState {
  id?: string;
  categoryData: Array<any>;
  doctorName: string | undefined;
}

class ServiceOperation extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      categoryData: [],
      doctorName: undefined
    };
  }

  async componentDidMount() {
    this.getCounselorCategories();
  }

  getCounselorCategories = () => {
    try {
      const { _id } = this.props.user;
      const { id } = this.props;
      this.props.getCounselorCategories({ counselorId: id, clinicId: _id }).then(res => {
        this.setState({ categoryData: res.action.payload.data });
      });
    } catch {
      history.goBack();
    }
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { id } = this.props;
    const { categoryData } = this.state;
    return (
      <Row type="flex" justify="center">
        <Col span={18} style={{ marginBottom: 20 }}>
          <CounselorServiceOperationBox
            getCounselorCategory={this.getCounselorCategories}
            categoryData={categoryData}
            id={id}
            updateCounselorMinPrice={this.props.updateCounselorMinPrice}
          />
        </Col>
      </Row>
    );
  }
}

const stateToProps = state => {
  return {
    user: state.user
  };
};

const dispatchToProps = dispatch => {
  return {
    getCounselorInfo: params => dispatch(counselorActions.getCounselorInfo(params)),
    getCounselorCategories: params =>
      dispatch(counselorCategoryActions.getCounselorCategories(params)),
    updateCounselorMinPrice: params =>
      dispatch(counselorCategoryActions.updateCounselorMinPrice(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(ServiceOperation));
