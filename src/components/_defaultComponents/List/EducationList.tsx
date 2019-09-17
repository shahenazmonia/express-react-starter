import React, { Component } from "react";
import { Icon, Card, Row, Col, Empty } from "antd";
import EducationType from "../../../utility/constants/educationType";
import { injectIntl, InjectedIntlProps } from "react-intl";
import _ from "lodash";
import EmptyComponent from "../EmptyComponent";

interface IProps {
  educationData: Array<{ _id?: string; educationSchool: string; educationDegree: string }> | any;
  deleteItem?: any;
  isCounselor?: boolean;
}

class EducationList extends Component<IProps & InjectedIntlProps, any> {
  constructor(props) {
    super(props);
  }
  handleDelete = param => {
    this.props.deleteItem(param);
  };

  render() {
    const { educationData, isCounselor } = this.props;
    const { formatMessage } = this.props.intl;
    return (
      <div>
        <Row>
          {educationData.length !== 0 &&
            educationData.map(item => {
              return (
                <Card style={{ marginBottom: 10, borderRadius: 5 }}>
                  <Col>
                    <h4>
                      {_.findIndex(EducationType, { value: item.educationDegree }) !== -1 &&
                        formatMessage({
                          id: _.find(EducationType, { value: item.educationDegree }).text
                        })}
                    </h4>
                    <h4>{item.educationSchool}</h4>
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
          {educationData.length === 0 && <EmptyComponent description={"NO_DATA_EDUCATION"} />}
        </Row>
      </div>
    );
  }
}

export default injectIntl(EducationList);
