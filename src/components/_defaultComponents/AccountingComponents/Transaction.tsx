import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import InfiniteScroll from "react-infinite-scroller";
import * as accountingActions from "../../../store/actions/accountingActions";
import { Input, DatePicker, Row, Col, Button, Table } from "antd";
import moment from "moment";
import history from "../../../_core/history";

const Search = Input.Search;
const { Column } = Table;

const dateFormat = "DD/MM/YYYY";

interface IProps {
  getTransactions: any;
}

interface IState {
  transactionList: Array<object>;
  hasMore: boolean;
  filterStartDate: string;
  filterEndDate: string;
  filterSearchText: string;
}

class TransactionPage extends Component<IProps & InjectedIntlProps, IState> {
  private iScroll: any;
  private sDate: any;
  private eDate: any;
  private sInput: any;
  constructor(props) {
    super(props);
    this.state = {
      transactionList: [],
      hasMore: true,
      filterEndDate: "",
      filterStartDate: "",
      filterSearchText: ""
    };
  }

  doSearch(page) {
    const { filterStartDate, filterEndDate, filterSearchText } = this.state;
    page = page * 50;
    this.props
      .getTransactions({
        startDate: filterStartDate,
        endDate: filterEndDate,
        searchText: filterSearchText,
        skip: page,
        limit: 50
      })
      .then(result => {
        const data = result.value.data;
        const oldTransactionList = this.state.transactionList;
        const newTransactionList = [...oldTransactionList, ...data];
        if (data.length === 0) this.setState({ hasMore: false });
        this.setState({ transactionList: newTransactionList });
      });
  }

  clearListAndDoSearch() {
    this.iScroll.pageLoaded = 0;
    this.setState({ transactionList: [], hasMore: true }, () => {
      this.doSearch(0);
    });
  }

  componentDidMount() {
    this.doSearch(0);
  }

  render() {
    const { transactionList = [], hasMore = true } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <Row type="flex" justify="center">
        <Col span={18}>
          <Row style={{ marginBottom: 20 }} type="flex" justify="end">
            <Button
              onClick={() => history.push("/admin/transactiondetail")}
              type="primary"
              icon="plus-circle"
            >
              {formatMessage({ id: "NEW_TRANSACTION" })}
            </Button>
          </Row>
          <Row style={{ marginBottom: 20 }} type="flex" justify="space-between">
            <Col span={20}>
              <Row type="flex">
                <Col>
                  <DatePicker
                    placeholder={formatMessage({ id: "ACCOUNTING_DATE" })}
                    ref={sDate => {
                      this.sDate = sDate;
                    }}
                    onChange={date => {
                      this.setState({ filterStartDate: date !== null ? date.toISOString() : "" });
                    }}
                    format={dateFormat}
                  />
                </Col>
                <Col>
                  <DatePicker
                    placeholder={formatMessage({ id: "ACCOUNTING_DATE" })}
                    ref={eDate => {
                      this.eDate = eDate;
                    }}
                    onChange={date => {
                      this.setState({ filterEndDate: date !== null ? date.toISOString() : "" });
                    }}
                    format={dateFormat}
                  />
                </Col>
                <Col>
                  <Input
                    ref={sInput => {
                      this.sInput = sInput;
                    }}
                    onKeyPress={e => {
                      if (e.key === "Enter") {
                        this.clearListAndDoSearch();
                      }
                    }}
                    onChange={value => {
                      this.setState({ filterSearchText: value.target.value });
                    }}
                    placeholder={formatMessage({ id: "SEARCH_DESCRIPTION" })}
                  />
                </Col>
              </Row>
            </Col>
            <Col span={4}>
              <Row type="flex" justify="end">
                <Button
                  onClick={e => {
                    this.iScroll.pageLoaded = 0;
                    this.sDate.picker.clearSelection(e);
                    this.eDate.picker.clearSelection(e);
                    this.sInput.state.value = "";
                    this.setState(
                      {
                        filterEndDate: "",
                        filterStartDate: "",
                        filterSearchText: "",
                        transactionList: [],
                        hasMore: true
                      },
                      () => {
                        this.doSearch(0);
                      }
                    );
                  }}
                >
                  {formatMessage({ id: "CLEAR" })}
                </Button>
                <Button
                  onClick={() => {
                    this.clearListAndDoSearch();
                  }}
                >
                  {formatMessage({ id: "FILTER" })}
                </Button>
              </Row>
            </Col>
          </Row>
          <Row type="flex" justify="center">
            <Col span={24}>
              <InfiniteScroll
                ref={iScroll => {
                  this.iScroll = iScroll;
                }}
                initialLoad={false}
                pageStart={0}
                loadMore={page => this.doSearch(page)}
                hasMore={hasMore}
              >
                <Table
                  size="middle"
                  dataSource={transactionList}
                  pagination={false}
                  style={{ cursor: "pointer" }}
                  onRow={(record: any, rowIndex) => {
                    return {
                      onClick: event => {
                        history.push("/admin/transactiondetail/" + record._id, { isEdit: false });
                      }
                    };
                  }}
                >
                  <Column
                    align="left"
                    title={formatMessage({ id: "DATE" })}
                    dataIndex="date"
                    render={(text, row) => moment(text).format("DD/MM/YYYY")}
                    key="date"
                  />
                  <Column
                    align="left"
                    title={formatMessage({ id: "DESCRIPTION" })}
                    dataIndex="note"
                    key="note"
                  />
                </Table>
              </InfiniteScroll>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

const dispatchToProps = dispatch => {
  return {
    getTransactions: params => dispatch(accountingActions.getTransactions(params))
  };
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(TransactionPage));
