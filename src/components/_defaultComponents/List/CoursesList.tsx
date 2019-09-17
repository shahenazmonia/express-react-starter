import React, { Component } from "react";
import { Icon, Card, Row, Col, Empty } from "antd";
import { injectIntl, InjectedIntlProps } from "react-intl";
import _ from "lodash";
import EmptyComponent from "../EmptyComponent";

interface IProps {
  coursesData: Array<{ _id?: string; courses: string; coursesDate: string }> | any;
  deleteItem?: any;
  isCounselor?: boolean;
}

class CoursesList extends Component<IProps & InjectedIntlProps, any> {
  constructor(props) {
    super(props);
  }
  handleDelete = param => {
    this.props.deleteItem(param);
  };

  render() {
    const { coursesData, isCounselor } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <Row>
          {coursesData.length !== 0 &&
            coursesData.map(item => {
              return (
                <Card style={{ marginBottom: 10, borderRadius: 5 }}>
                  <Col>
                    <h4>{item.courses}</h4>
                    <h4>{item.coursesDate}</h4>
                    {isCounselor && (
                      <span
                        style={{ position: "absolute", right: 20, top: 15 }}
                        onClick={() => this.handleDelete(item)}
                      >
                        <Icon type="delete" style={{ fontSize: 20 }} />
                      </span>
                    )}
                  </Col>
                </Card>
              );
            })}
          {coursesData.length === 0 && <EmptyComponent description={"NO_DATA_COURSES"} />}
        </Row>
      </div>
    );
  }
}

export default injectIntl(CoursesList);
