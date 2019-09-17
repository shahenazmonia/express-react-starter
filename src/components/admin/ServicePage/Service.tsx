import React, { Component } from "react";
import { Row, Col, Button } from "antd";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";

import history from "../../../_core/history";
import ServiceListBox from "./ServiceListBox";

import * as alertActions from "../../../store/actions/alertActions";
import * as categoryActions from "../../../store/actions/categoryActions";

import { ShowAlertParams, ShowInfoAction } from "../../../store/actions/alertActions";
import { paginationType } from "../../../types/paginationTypes";
import { categoryType } from "../../../types/categoryTypes";

interface IProps {
  getCategories: () => any;
  removeCategory: ({ _id: string }) => any;
  showConfirm: (ShowAlertParams) => ShowInfoAction;
  language: string;
}

interface IState {
  categories: Array<categoryType> | [];
}

class Service extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { categories: [] };
  }
  componentDidMount() {
    this.fetchCategories();
  }

  fetchCategories = async () => {
    try {
      const data = (await this.props.getCategories()).action.payload.data;
      this.setState({ categories: data.categoryList });
    } catch (err) {
      // console.log(err);
    }
  };
  removeCategory = ({ categoryId }) => {
    const { formatMessage } = this.props.intl;
    this.props.showConfirm({
      title: formatMessage({ id: "DELETE" }),
      body: formatMessage({ id: "DELETE_ARE_YOU_SURE" }),
      actionFunc: async () => {
        await this.props.removeCategory({ _id: categoryId });
        this.fetchCategories();
      }
    });
  };

  updateCategory = ({ categoryId }) => {
    history.push(`/admin/service/update/${categoryId}`);
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { categories } = this.state;
    return (
      <Row type="flex" justify="center">
        <Col span={16} style={{ display: "flex", justifyContent: "flex-end", marginBottom: 10 }}>
          <Button
            onClick={() => history.push("/admin/service/new")}
            type="primary"
            icon="plus-circle"
          >
            {formatMessage({ id: "NEW_CATEGORY" })}
          </Button>
        </Col>
        <Col span={16}>
          <ServiceListBox
            categories={categories}
            language={this.props.language}
            removeCategory={this.removeCategory}
            updateCategory={this.updateCategory}
          />
        </Col>
      </Row>
    );
  }
}

const stateToProps = state => {
  return {
    language: state.locale.language
  };
};

const dispatchToProps = dispatch => {
  return {
    removeCategory: params => dispatch(categoryActions.removeCategory(params)),
    showConfirm: params => dispatch(alertActions.showConfirm(params)),
    getCategories: () => dispatch(categoryActions.getCategories())
  };
};
export default connect(
  stateToProps,
  dispatchToProps
)(injectIntl(Service));
