import React, { Component } from "react";
import SubCategoryBox from "./SubCategoryBox";
import { connect } from "react-redux";
import { Row, Col } from "antd";
import _ from "lodash";

import history from "../../_core/history";

interface IProps {
  categories: any;
  onBoxClick: ({  }: any) => any;
  mainCategory?: string;
  isTherapyPage?: boolean;
  clickedBox?: string;
  language: string;
}
interface IState {}

class SessionSubCategory extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    this.state = {};
  }

  componentDidMount() {}

  render() {
    const { categories, language } = this.props;
    return (
      <Row type="flex" justify="center">
        <Col style={{marginBottom:20}}><h3>Kategori Seçiniz...</h3></Col>
        <Col span={24}>
          <Row type="flex" align="middle" justify="center" gutter={48}>
            {categories &&
              categories.map((category, i) => {
                const { clinicMinPrice, generalMinPrice, price, counselorMinPrice } = category;
                const effectivePrice = _.max([
                  clinicMinPrice,
                  generalMinPrice,
                  price,
                  counselorMinPrice
                ]);
                return (
                  <Col key={i} xs={24} sm={12} md={8}>
                    <SubCategoryBox
                      isTherapyPage={this.props.isTherapyPage}
                      onBoxClick={({ category, effectivePrice }) =>
                        this.props.onBoxClick({ category, effectivePrice })
                      }
                      category={category}
                      language={language}
                      isClicked={category.value === this.props.clickedBox}
                      effectivePrice={price && effectivePrice}
                    />
                  </Col>
                );
              })}
          </Row>
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
    //  getCategories: params => dispatch(categoryActions.getCategories(params))
  };
};

export default connect(
  stateToProps,
  dispatchToProps
)(SessionSubCategory);
