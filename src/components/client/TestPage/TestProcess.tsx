import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import history from "../../../_core/history";
import * as testActions from "../../../store/actions/testActions";
import { Row, Col, Radio, Button, Card } from "antd";

const RadioGroup = Radio.Group;

type testDataType = {
  name?: string;
  detail?: string;
  questions?: Array<questionType>;
};

type questionType = {
  question: string;
};

interface IProps {
  getTest: any;
  category: string;
  saveResultDoc: any;
}
interface IState {
  resultDoc: object;
  testData: testDataType;
  radioValues: Array<number>;
}

class TestProcess extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = { testData: {}, resultDoc: {}, radioValues: [] };
  }
  componentDidMount() {
    this.props.getTest(this.props.category).then(result => {
      this.setState({ testData: result.value.data });
    });
  }
  onClick() {
    const category = this.props.category;
    const { resultDoc } = this.state;
    this.props.saveResultDoc(resultDoc).then(result => {
      history.push("/test/" + category + "/result/" + result.value.data.id);
    });
  }
  onRadioChange(e, index) {
    let radioValues = this.state.radioValues;
    radioValues[index] = e.target.value;
    this.setState({ radioValues });
  }
  render() {
    const { testData } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <Row type="flex" justify="center">
        <Col span={16}>
          <Row>
            <Col>
              <h2 style={{ textAlign: "center" }}>{testData.name}</h2>
            </Col>
            <Col>{testData.detail}</Col>
          </Row>
          <Row style={{ marginTop: "50px" }}>
            <Col>
              <Card style={{ backgroundColor: "orange", color: "white" }}>
                <Row type="flex" justify="end">
                  <Col span={2}>TRUE</Col>
                  <Col span={2}>PARTLY TRUE</Col>
                  <Col span={2}>NOT TRUE</Col>
                </Row>
              </Card>
            </Col>
            <Col>
              <Row>
                {testData &&
                  testData.questions &&
                  testData.questions.map((qdata, index) => (
                    <Col key={index}>
                      <Card>
                        <Row type="flex" justify="space-between">
                          <Col span={16}>{qdata.question}</Col>
                          <Col span={6}>
                            <RadioGroup
                              style={{
                                display: "flex",
                                flexDirection: "row",
                                justifyContent: "space-between"
                              }}
                              onChange={e => this.onRadioChange(e, index)}
                              value={this.state.radioValues[index]}
                            >
                              <Radio
                                style={{
                                  display: "block",
                                  height: "30px",
                                  lineHeight: "30px"
                                }}
                                value={100}
                              />
                              <Radio
                                style={{
                                  display: "block",
                                  height: "30px",
                                  lineHeight: "30px"
                                }}
                                value={50}
                              />
                              <Radio
                                style={{
                                  display: "block",
                                  height: "30px",
                                  lineHeight: "30px"
                                }}
                                value={0}
                              />
                            </RadioGroup>
                          </Col>
                        </Row>
                      </Card>
                    </Col>
                  ))}
              </Row>
            </Col>
          </Row>
          <Row type="flex" justify="end">
            <Col style={{ marginTop: 30 }}>
              <Button type="primary" onClick={this.onClick.bind(this)}>
                {formatMessage({ id: "TEST_SHOW_RESULT" })}
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}
const dispatchToProps = dispatch => {
  return {
    getTest: id => dispatch(testActions.getTest(id)),
    saveResultDoc: resultDoc => dispatch(testActions.saveResultDoc(resultDoc))
  };
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(TestProcess));
