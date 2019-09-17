import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Row, Col } from "antd";
import * as counselorActions from "../../../store/actions/counselorActions";
import CouncelorListTable from "./CouncelorListTable";

interface IProps {
  user: any;
  counselorList: Array<object>;
  totalCounselorNumber: number;
  handlePagination: any;
  isAdmin?: boolean;
}
interface IState {}

class CouncelorListPage extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { counselorList: [], totalCounselorNumber: 0 };
  }

  componentDidMount() {}

  render() {
    const { counselorList, totalCounselorNumber, isAdmin } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <Row type="flex" justify="center">
        <Col>
          <CouncelorListTable
            counselorList={counselorList}
            totalCounselorNumber={totalCounselorNumber}
            handlePagination={this.props.handlePagination}
            isAdmin={isAdmin}
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
  return {};
};

export default connect(
  stateToProps,
  null
)(injectIntl(CouncelorListPage));
