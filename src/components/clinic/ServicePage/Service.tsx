import React, { Component } from "react";
import ServiceListBox from "./ServiceListBox";
import { Row, Col } from "antd";
import _ from "lodash";
import { connect } from "react-redux";

import * as clinicCategoryActions from "../../../store/actions/clinicCategoryActions";
import { categoryForClinicType } from "../../../types/categoryTypes";

interface IProps {
  user: any;
  getClinicCategories: (params: { clinicId: string }) => any;
  updateCategoryMinPrice: (params: {
    clinicId: string;
    categoryId: string;
    clinicMinPrice: number;
  }) => any;
  language: String;
}

interface IState {
  clinicCategories: Array<any> | [];
  updateData: Array<categoryForClinicType>;
}

class Service extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      clinicCategories: [],
      updateData: []
    };
  }

  componentDidMount() {
    this.getCategoryMinPrice();
  }

  getCategoryMinPrice = async () => {
    const { _id } = this.props.user;

    try {
      const clinicCategories = (await this.props.getClinicCategories({
        clinicId: _id
      })).action.payload.data;

      this.setState({ clinicCategories });
    } catch (err) {
      // console.log(err);
    }
  };

  updateMinPrice = async record => {
    const { _id } = record;
    const { user } = this.props;
    const { updateData } = this.state;
    const updateMinPriceData = await _.find(updateData, { _id: record._id });
    try {
      await this.props.updateCategoryMinPrice({
        clinicId: user._id,
        categoryId: _id,
        clinicMinPrice: updateMinPriceData.clinicMinPrice
      });
      this.getCategoryMinPrice();
    } catch (err) {
      // console.log("SERVICE LIST BOX HATA");
    }
  };

  changeMinPrice = (text, record) => {
    const { updateData } = this.state;
    const index = _.findIndex(updateData, { _id: record._id });

    if (index !== -1) updateData[index].clinicMinPrice = text;
    else updateData.push({ ...record, clinicMinPrice: text });
  };

  render() {
    const { language, user } = this.props;
    const { clinicCategories } = this.state;
    return (
      <Row type="flex" justify="center">
        <Col span={16}>
          {clinicCategories && (
            <ServiceListBox
              user={user}
              language={language}
              categoryData={clinicCategories}
              changeMinPrice={this.changeMinPrice}
              updateMinPrice={this.updateMinPrice}
            />
          )}
        </Col>
      </Row>
    );
  }
}

const stateToProps = state => {
  return {
    language: state.locale.language,
    user: state.user
  };
};

const dispatchToProps = dispatch => {
  return {
    getClinicCategories: params => dispatch(clinicCategoryActions.getClinicCategories(params)),
    updateCategoryMinPrice: params => dispatch(clinicCategoryActions.updateCategoryMinPrice(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(Service);
