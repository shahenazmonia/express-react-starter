import React, { Component } from "react";
import { Icon, Card, Row, Col, Empty } from "antd";
import { injectIntl, InjectedIntlProps } from "react-intl";
import _ from "lodash";
import EmptyComponent from "../EmptyComponent";

interface IProps {
  workExperienceData:
    | Array<{ _id?: string; workExperience: string; workExperienceDate: string }>
    | any;
  deleteItem?: any;
  isCounselor?: boolean;
}

class WorkExperienceList extends Component<IProps & InjectedIntlProps, any> {
  constructor(props) {
    super(props);
  }
  handleDelete = param => {
    this.props.deleteItem(param);
  };

  render() {
    const { workExperienceData, isCounselor } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <Row>
          {workExperienceData.length !== 0 &&
            workExperienceData.map(item => {
              return (
                <Card style={{ marginBottom: 10, borderRadius: 5 }}>
                  <Col>
                    <h4>{item.workExperience}</h4>
                    <h4>{item.workExperienceDate}</h4>
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
          {workExperienceData.length === 0 && (
            <EmptyComponent description={"NO_DATA_WORK_EXPERIENCE"} />
          )}
        </Row>
      </div>
    );
  }
}

export default injectIntl(WorkExperienceList);
