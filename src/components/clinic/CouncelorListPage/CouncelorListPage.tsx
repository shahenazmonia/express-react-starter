import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Row, Col } from "antd";
import * as counselorActions from "../../../store/actions/counselorActions";
import CouncelorList from "../../_defaultComponents/CouncelorListPage/CouncelorListPage";

interface IProps {
  getCounselorList(params): any;
  user: any;
}
interface IState {
  counselorList: Array<object>;
  totalCounselorNumber: number;
  page: number;
}

class CouncelorListPage extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { counselorList: [], totalCounselorNumber: 0, page: 1 };
  }

  componentDidMount() {
    this.fetchCounselorList();
  }

  fetchCounselorList = async () => {
    try {
      const { _id } = this.props.user;
      const { page } = this.state;
      const data = (await this.props.getCounselorList({ clinicId: _id, page })).action.payload.data;
      this.setState({
        counselorList: data.counselorList,
        totalCounselorNumber: data.totalCounselorNumber
      });
    } catch (err) {
      // console.log(err);
    }
  };

  handlePagination = ({ page }) => {
    this.setState({ page }, () => this.fetchCounselorList());
  };

  render() {
    const { counselorList, totalCounselorNumber } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <Row type="flex" justify="center">
        <Col span={16}>
          <CouncelorList
            counselorList={counselorList}
            totalCounselorNumber={totalCounselorNumber}
            handlePagination={this.handlePagination}
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
    getCounselorList: params => dispatch(counselorActions.getCounselorList(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(CouncelorListPage));
