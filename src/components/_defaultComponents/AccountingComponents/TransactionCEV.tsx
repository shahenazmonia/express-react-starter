import React, { Component } from "react";
import { Formik, FieldArray, Field, getIn } from "formik";
import { connect } from "react-redux";
import history from "../../../_core/history";
import { injectIntl, InjectedIntlProps } from "react-intl";
import { Row, Col, Card, Input, Form, Button, DatePicker } from "antd";
import moment from "moment";
import { TransactionCEVValidationSchema } from "./TransactionCEVValidationSchema";
import * as accountingActions from "../../../store/actions/accountingActions";
import * as alertActions from "../../../store/actions/alertActions";

const { TextArea } = Input;

const dateFormat = "DD/MM/YYYY";

type entry = {
  note: string;
  credit: number;
  debit: number;
  account: string;
};

type transactionType = {
  _id?: string;
  date: string;
  note: string;
  entries: Array<entry>;
};

interface IProps {
  showInfo: (params: any) => any;
  showConfirm: (params: any) => any;
  isEdit?: boolean;
  id?: string;
  getTransaction: any;
  transactionCE: any;
  deleteTransaction: any;
}

interface IState {
  transaction: {
    _id: string | undefined;
    date: string | undefined;
    note: string | undefined;
    entries: Array<entry> | undefined;
  };
}

class TransactionCEV extends Component<IProps & InjectedIntlProps, IState> {
  constructor(props) {
    super(props);
    this.state = {
      transaction: {
        _id: undefined,
        date: undefined,
        note: undefined,
        entries: [
          { note: "", debit: 0, credit: 0, account: "" },
          { note: "", debit: 0, credit: 0, account: "" }
        ]
      }
    };
  }

  async componentDidMount() {
    const { id } = this.props;
    // console.log(this.props.match)
    try {
      if (id) {
        const transaction = await this.props.getTransaction({ id });
        transaction.action.payload.data.date = moment(
          transaction.action.payload.data.date
        ).toDate();
        transaction.action.payload.data.entries = transaction.action.payload.data.entries.map(
          entry => {
            return {
              ...entry,
              debit: (+entry.debit / 100).toFixed(2),
              credit: (+entry.credit / 100).toFixed(2)
            };
          }
        );
        this.setState({ transaction: { ...transaction.action.payload.data } });
      }
    } catch {
      history.push("/admin");
    }
  }

  saveTransaction = async (values, { setSubmitting }) => {
    const { id } = this.props;
    let totalCredit = 0;
    let totalDebit = 0;
    const fixedEntries = values.entries.map(entry => {
      totalDebit += +entry.debit;
      totalCredit += +entry.credit;
      return {
        ...entry,
        debit: Math.round(+entry.debit * 100),
        credit: Math.round(+entry.credit * 100)
      };
    });
    if (id) values.id = id;
    values.entries = fixedEntries;
    if (totalDebit === totalCredit) {
      try {
        await this.props.transactionCE(values);
        this.props.showInfo({
          title: "Başarılı",
          body: "Mahsup Fişi Oluşturuldu",
          actionFunc: () => {
            history.push("/admin/transactions");
          }
        });
      } catch {
        values.entries = values.entries.map(entry => {
          return {
            ...entry,
            debit: (+entry.debit / 100).toFixed(2),
            credit: (+entry.credit / 100).toFixed(2)
          };
        });
        this.setState({ transaction: { ...values } });
        setSubmitting(false);
      }
    } else {
      values.entries = values.entries.map(entry => {
        return {
          ...entry,
          debit: (+entry.debit / 100).toFixed(2),
          credit: (+entry.credit / 100).toFixed(2)
        };
      });
      this.setState({ transaction: { ...values } });

      this.props.showInfo({
        title: "Hata",
        body: "Mahsup Fişinde toplam borç ile toplam alacak eşit olmalıdır.",
        actionFunc: () => {
          setSubmitting(false);
        }
      });
    }
  };

  deleteTransaction = async () => {
    this.props.showConfirm({
      title: "Emin misiniz?",
      body: "Bu mahsup fişini silmek istediğinizden emin misiniz?",
      actionFunc: async () => {
        try {
          await this.props.deleteTransaction({ id: this.state.transaction._id });
          this.props.showInfo({
            title: "Başarılı",
            body: "Mahsup fişi silindi.",
            actionFunc: () => {
              history.push("/admin/transactions");
            }
          });
        } catch (err) {
          console.log(err);
        }
      }
    });
  };

  render() {
    const { formatMessage } = this.props.intl;
    const { isEdit } = this.props;
    const { _id, date, note, entries = [] } = this.state.transaction;
    let totalCredit = 0;
    let totalDebit = 0;
    return (
      <Card bordered={true} style={{ marginBottom: 50 }}>
        <Formik
          enableReinitialize
          initialValues={{
            date,
            note,
            entries
          }}
          validationSchema={TransactionCEVValidationSchema}
          onSubmit={this.saveTransaction}
        >
          {({
            values,
            errors,
            touched,
            handleChange,
            handleSubmit,
            isSubmitting,
            setFieldValue
          }) => {
            let totalCredit = 0;
            let totalDebit = 0;
            return (
              <Form onSubmit={handleSubmit}>
                <Row style={{ marginBottom: 20 }}>
                  <Col span={5}>
                    <Button
                      onClick={() => {
                        history.push("/admin/transactions");
                      }}
                      type="primary"
                      icon="profile"
                    >
                      {formatMessage({ id: "TRANSACTIONS" })}
                    </Button>
                  </Col>
                  <Col span={15}>
                    <Button
                      onClick={() => {
                        history.push("/admin/accounts");
                      }}
                      type="primary"
                      icon="reconciliation"
                    >
                      {formatMessage({ id: "ACCOUNTS" })}
                    </Button>
                  </Col>
                  {_id && (
                    <Col span={4} style={{ textAlign: "right" }}>
                      <Button onClick={this.deleteTransaction} type="danger" icon="delete">
                        {formatMessage({ id: "DELETE_TRANSACTION" })}
                      </Button>
                    </Col>
                  )}
                </Row>
                <Row gutter={8} type="flex">
                  <Col xs={24} md={14}>
                    <Form.Item
                      colon={false}
                      label={formatMessage({ id: "DATE" })}
                      validateStatus={errors.date && touched.date ? "error" : "success"}
                      help={errors.date && touched.date ? errors.date : null}
                    >
                      <DatePicker
                        disabled={!isEdit}
                        placeholder={formatMessage({ id: "ACCOUNTING_DATE" })}
                        value={values.date ? moment(values.date, dateFormat) : undefined}
                        onChange={date => {
                          date && setFieldValue("date", moment(date).format(dateFormat));
                          !date && setFieldValue("date", undefined);
                        }}
                        format={dateFormat}
                        name="date"
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={8} type="flex">
                  <Col xs={24} md={24}>
                    <Form.Item
                      colon={false}
                      label={formatMessage({ id: "DESCRIPTION" })}
                      validateStatus={errors.note && touched.note ? "error" : "success"}
                      help={errors.note && touched.note ? errors.note : null}
                    >
                      <TextArea
                        disabled={!isEdit}
                        rows={4}
                        name="note"
                        onChange={handleChange}
                        value={values.note}
                      />
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={8} type="flex">
                  <Col xs={24} md={24}>
                    <Row gutter={8} type="flex">
                      <Col md={4} xs={4}>
                        {formatMessage({ id: "ACCOUNT" })}
                      </Col>
                      <Col md={12} xs={12}>
                        {formatMessage({ id: "DESCRIPTION" })}
                      </Col>
                      <Col md={4} xs={4}>
                        {formatMessage({ id: "ACCOUNT_CREDIT" })}
                      </Col>
                      <Col md={4} xs={4}>
                        {formatMessage({ id: "DEBIT" })}
                      </Col>
                    </Row>
                    <FieldArray
                      name="entries"
                      render={arrayHelpers => (
                        <div>
                          {values.entries.map((entry, index) => {
                            totalDebit += +entry.debit;
                            totalCredit += +entry.credit;
                            return (
                              <Row gutter={8} type="flex">
                                <Col md={4} xs={4}>
                                  <Field
                                    disabled={!isEdit}
                                    style={{ width: "100%" }}
                                    name={`entries.${index}.account`}
                                  />
                                  <Field
                                    name={`entries.${index}.account`}
                                    render={({ form }) => {
                                      const error = getIn(form.errors, `entries.${index}.account`);
                                      const touch = getIn(form.touched, `entries.${index}.account`);
                                      return touch && error ? (
                                        <div style={{ color: "red" }}>{error}</div>
                                      ) : null;
                                    }}
                                  />
                                </Col>
                                <Col md={12} xs={12}>
                                  <Field
                                    disabled={!isEdit}
                                    style={{ width: "100%" }}
                                    name={`entries.${index}.note`}
                                  />
                                  <Field
                                    name={`entries.${index}.note`}
                                    render={({ form }) => {
                                      const error = getIn(form.errors, `entries.${index}.note`);
                                      const touch = getIn(form.touched, `entries.${index}.note`);
                                      return touch && error ? (
                                        <div style={{ color: "red" }}>{error}</div>
                                      ) : null;
                                    }}
                                  />
                                </Col>
                                <Col md={4} xs={4}>
                                  <Field
                                    disabled={!isEdit}
                                    style={{ textAlign: "right", width: "100%" }}
                                    name={`entries.${index}.credit`}
                                  />
                                  <Field
                                    name={`entries.${index}.credit`}
                                    render={({ form }) => {
                                      const error = getIn(form.errors, `entries.${index}.credit`);
                                      const touch = getIn(form.touched, `entries.${index}.credit`);
                                      return touch && error ? (
                                        <div style={{ color: "red" }}>{error}</div>
                                      ) : null;
                                    }}
                                  />
                                </Col>
                                <Col md={4} xs={4}>
                                  <Row>
                                    <Col md={20} xs={20}>
                                      <Field
                                        disabled={!isEdit}
                                        style={{ textAlign: "right", width: "100%" }}
                                        name={`entries.${index}.debit`}
                                      />
                                      <Field
                                        name={`entries.${index}.debit`}
                                        render={({ form }) => {
                                          const error = getIn(
                                            form.errors,
                                            `entries.${index}.debit`
                                          );
                                          const touch = getIn(
                                            form.touched,
                                            `entries.${index}.debit`
                                          );
                                          return touch && error ? (
                                            <div style={{ color: "red" }}>{error}</div>
                                          ) : null;
                                        }}
                                      />
                                    </Col>
                                    <Col md={4} xs={4}>
                                      {isEdit && values.entries.length > 2 && (
                                        <Button
                                          size="small"
                                          type="danger"
                                          onClick={() => arrayHelpers.remove(index)}
                                        >
                                          -
                                        </Button>
                                      )}
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                            );
                          })}
                          <Row gutter={8} type="flex">
                            <Col style={{ textAlign: "right" }} md={16} xs={16}>
                              {formatMessage({ id: "TOTAL_CREDIT" })}:
                            </Col>
                            <Col md={4} xs={4} style={{ textAlign: "right" }}>
                              {totalCredit.toFixed(2)}
                            </Col>
                          </Row>
                          <Row gutter={8} type="flex">
                            <Col style={{ textAlign: "right" }} md={16} xs={16}>
                              {formatMessage({ id: "TOTAL_DEBIT" })}:
                            </Col>
                            <Col md={4} xs={4} />
                            <Col style={{ textAlign: "right" }} md={4} xs={4}>
                              <Col md={20} xs={20}>
                                {totalDebit.toFixed(2)}
                              </Col>
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              span={24}
                              style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
                            >
                              {isEdit && (
                                <Button
                                  type="primary"
                                  size="small"
                                  onClick={() =>
                                    arrayHelpers.push({
                                      note: "",
                                      credit: 0,
                                      debit: 0,
                                      account: ""
                                    })
                                  }
                                >
                                  +
                                </Button>
                              )}
                            </Col>
                          </Row>
                          <Row>
                            <Col
                              span={24}
                              style={{ marginTop: 5, display: "flex", justifyContent: "center" }}
                            >
                              {typeof errors.entries === "string" ? (
                                <div style={{ color: "red" }}>{errors.entries}</div>
                              ) : null}
                            </Col>
                          </Row>
                        </div>
                      )}
                    />
                  </Col>
                </Row>
                <Row style={{ marginTop: 20 }} gutter={8} type="flex">
                  <Col span={24} style={{ display: "flex", justifyContent: "center" }}>
                    {isEdit && (
                      <Button
                        type="primary"
                        disabled={isSubmitting}
                        onClick={e => {
                          handleSubmit();
                        }}
                      >
                        {formatMessage({ id: "SAVE" })}
                      </Button>
                    )}
                  </Col>
                </Row>
              </Form>
            );
          }}
        </Formik>
      </Card>
    );
  }
}

const dispatchToProps = dispatch => {
  return {
    getTransaction: params => dispatch(accountingActions.getTransaction(params)),
    transactionCE: params => dispatch(accountingActions.transactionCE(params)),
    deleteTransaction: params => dispatch(accountingActions.deleteTransaction(params)),
    showConfirm: params => dispatch(alertActions.showConfirm(params)),
    showInfo: params => dispatch(alertActions.showInfo(params))
  };
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(TransactionCEV));
