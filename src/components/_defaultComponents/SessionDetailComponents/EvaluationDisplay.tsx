import React, { Component } from "react";
import { Formik } from "formik";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Row, Col, Form, Input, Rate, Button } from "antd";

interface IProps {
  isClient: boolean;
  canBeEvaluated?: boolean;
  evaluation: { message: string; rateValue: number };
  onEvaluateSessionClick?: (
    evaluation: { message: string | undefined; rateValue: number | undefined },
    {  }: any
  ) => any;
}
interface IState {}

class EvaluationDisplay extends Component<IProps & InjectedIntlProps, IState> {
  render() {
    const { formatMessage } = this.props.intl;
    const { isClient, canBeEvaluated, evaluation, onEvaluateSessionClick } = this.props;
    return (
      <Formik
        enableReinitialize
        initialValues={{
          message: evaluation && evaluation.message,
          rateValue: evaluation && evaluation.rateValue
        }}
        validationSchema={{}}
        onSubmit={(values: any, { setSubmitting }) => {
          onEvaluateSessionClick && onEvaluateSessionClick(values, { setSubmitting });
        }}
      >
        {({ values, errors, touched, handleChange, handleSubmit, isSubmitting, setFieldValue }) => (
          <Form>
            <Form.Item label={formatMessage({ id: "EVALUATE_SESSION" })}>
              <Input.TextArea
                disabled={!isClient || !canBeEvaluated}
                name="message"
                onChange={handleChange}
                value={values.message}
                rows={4}
              />
            </Form.Item>
            <Form.Item label={formatMessage({ id: "RATE" })}>
              <Rate
                disabled={!isClient || !canBeEvaluated}
                value={values.rateValue}
                onChange={val => setFieldValue("rateValue", val)}
              />
            </Form.Item>
            {isClient && (
              <Row type="flex" justify="end">
                <Col>
                  <Button
                    type="primary"
                    disabled={isSubmitting || !canBeEvaluated}
                    onClick={e => {
                      handleSubmit();
                    }}
                  >
                    {evaluation
                      ? formatMessage({ id: "UPDATE_EVALUATION" })
                      : formatMessage({ id: "SAVE_EVALUATION" })}
                  </Button>
                </Col>
              </Row>
            )}
          </Form>
        )}
      </Formik>
    );
  }
}

export default injectIntl(EvaluationDisplay);
