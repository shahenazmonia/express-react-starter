import React, { Component } from "react";
import { injectIntl, InjectedIntlProps } from "react-intl";

import moment from "moment";
import { Table, Button } from "antd";
import { ColumnProps } from "antd/lib/table";
import foodPlanSections from "../../utility/constants/foodPlanSections";
import foodPlanColumns from "../../utility/constants/foodPlanColumns";
import foodColumns from "../../utility/constants/foodColumns";
import portions from "../../utility/constants/portions";
import "../../utility/foodPlanStyles.css";

type weeklyFoodPlanType = {
  plan: Array<object>;
  startDate: Date;
  foodDatabase: Array<foodDatabaseType>;
};

type foodDatabaseType = {
  name: string;
  calories: number;
  weight: number;
};

interface IFoodPlan {
  key: string;
  name: string;
  1: Array<object>;
  2: Array<object>;
  3: Array<object>;
  4: Array<object>;
  5: Array<object>;
  6: Array<object>;
  7: Array<object>;
}

interface IFood {
  name: string;
  portion: string;
  portionInfo: string;
  calorie: number;
  ok: boolean;
  details: string;
  key: string;
}

interface IProps {
  modify: boolean;
  weeklyFoodPlan: weeklyFoodPlanType;
}

interface IState {
  weeklyPlan: Array<IFoodPlan>;
  columns: Array<object>;
  foodDatabase: Array<foodDatabaseType>;
  selectedRowKeys: Array<string>;
}

class FoodPlan extends Component<IProps, IState> {
  constructor(props) {
    super(props);
    // this.onRowSelect = this.onRowSelect.bind(this);
    const weeklyPlan: IFoodPlan[] = foodPlanSections;

    this.state = {
      weeklyPlan,
      columns: foodPlanColumns,
      foodDatabase: props.weeklyFoodPlan.foodDatabase,
      selectedRowKeys: []
    };
  }

  componentWillMount() {
    this.createColumns();
    this.createRows();
  }

  createRows = () => {
    const { foodDatabase } = this.state;
    const { weeklyFoodPlan } = this.props;
    const weeklyPlan = foodPlanSections;
    weeklyFoodPlan.plan.forEach((day, index) => {
      for (let i = 0; i < 6; i++) {
        weeklyPlan[i][index + 1] = day[i].map(element => {
          const food =
            foodDatabase.find(meal => {
              return meal.name === element.name;
            }) ||
            portions.find(meal => {
              return meal.name === element.name;
            });
          return food
            ? {
                ...element,
                portionInfo: food.weight,
                calorie: element.portion * food.calories,
                key: "" + i + "-" + index + "-" + element.key
              }
            : element;
        });
      }
    });
    this.setState({ weeklyPlan });
  };

  createColumns = () => {
    const { weeklyFoodPlan } = this.props;
    const { selectedRowKeys } = this.state;
    const foodRenderColumns = foodColumns.map(column => {
      if (column.dataIndex === "calorie") {
        return {
          ...column,

          render: (cell, row, index) => {
            return cell + " cal";
          }
        };
      } else if (column.dataIndex === "portionInfo") {
        return {
          ...column,
          render: (cell, row, index) => {
            return cell + "gr x " + row.portion;
          }
        };
      } else {
        return column;
      }
    });

    const columns: ColumnProps<IFoodPlan>[] = foodPlanColumns.map((col, index) => {
      const rowSelection = {
        selectedRowKeys,
        onChange: this.onSelectChange
      };
      return index === 0
        ? {
            ...col,
            title: () => {
              return (
                <div>
                  {" "}
                  <Button shape="circle" icon="check" onClick={this.saveChecked.bind(this, true)} />
                  <Button
                    shape="circle"
                    icon="close"
                    onClick={this.saveChecked.bind(this, false)}
                  />
                </div>
              );
            }
          }
        : {
            ...col,
            title: moment(weeklyFoodPlan.startDate)
              .add(index - 1, "days")
              .format("D/M/YYYY"),
            render: (cell, row, index) => {
              return (
                <Table<IFood>
                  columns={foodRenderColumns}
                  dataSource={cell}
                  pagination={false}
                  showHeader={false}
                  size={"small"}
                  bordered={false}
                  expandedRowRender={record => <p style={{ margin: 0 }}>{record.details}</p>}
                  expandRowByClick={true}
                  expandIconAsCell={false}
                  rowClassName={record => {
                    return record.ok ? "food-row-done" : "food-row-not-done";
                  }}
                  rowSelection={rowSelection}
                />
              );
            }
          };
    });
    this.setState({ columns });
  };

  onSelectChange = selectedRowKeys => {
    // console.log("selectedRowKeys changed: ", selectedRowKeys);
    this.setState({ selectedRowKeys }, () => this.createColumns());
  };

  saveChecked(eaten) {
    const { weeklyPlan, selectedRowKeys } = this.state;
    selectedRowKeys.forEach(rowKey => {
      const keyArray = rowKey.split("-");
      // console.log(keyArray);
      weeklyPlan[parseInt(keyArray[0])][parseInt(keyArray[1]) + 1] = weeklyPlan[
        parseInt(keyArray[0])
      ][parseInt(keyArray[1]) + 1].map(element => {
        if (element.key === rowKey) {
          return { ...element, ok: eaten };
        } else {
          return element;
        }
      });
    });
    this.setState({ weeklyPlan, selectedRowKeys: [] }, () => this.createColumns());
  }

  render = () => {
    const { weeklyPlan, columns } = this.state;
    return (
      <Table<IFoodPlan>
        columns={columns}
        dataSource={weeklyPlan}
        pagination={false}
        bordered={true}
        size={"small"}
      />
    );
  };
}

export default FoodPlan;
