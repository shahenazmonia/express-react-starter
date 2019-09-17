import React, { Component } from "react";
import { connect } from "react-redux";
import { injectIntl, InjectedIntlProps } from "react-intl";
import InfiniteScroll from "react-infinite-scroller";
import * as accountingActions from "../../../store/actions/accountingActions";
import { Input, List, Row, Col, Button, Table } from "antd";
import moment from "moment";
import history from "../../../_core/history";

const { Column } = Table;

const dateFormat = "DD/MM/YYYY";

interface IProps {
  getAccounts: any;
  getActions: any;
  getBalance: any;
}

interface IState {
  accountList: Array<object>;
  actionList: Array<object>;
  hasMore: boolean;
  hasMoreAction: boolean;
  filterSearchText: string;
  selectedAccount: string;
  totalCredit: string;
  totalDebit: string;
  balance: string;
}

class AccountsPage extends Component<IProps & InjectedIntlProps, IState> {
  private iScroll: any;
  private iScrollDetail: any;
  private sInput: any;
  constructor(props) {
    super(props);
    this.state = {
      accountList: [],
      actionList: [],
      hasMore: true,
      hasMoreAction: true,
      filterSearchText: "",
      selectedAccount: "",
      totalCredit: "0",
      totalDebit: "0",
      balance: "0"
    };
  }

  doSearch(page) {
    const { filterSearchText } = this.state;
    console.log("searchlendi", filterSearchText);
    page = page * 50;
    this.props
      .getAccounts({
        searchText: filterSearchText,
        skip: page,
        limit: 50
      })
      .then(result => {
        const data = result.value.data;
        const oldAccountList = this.state.accountList;
        const newAccountList = [...oldAccountList, ...data];
        if (data.length === 0) this.setState({ hasMore: false });
        this.setState({ accountList: newAccountList });
      });
  }

  getActionsOfAccount(page) {
    const { selectedAccount } = this.state;
    page = page * 50;
    this.props.getActions({ account: selectedAccount, skip: page, limit: 50 }).then(result => {
      const data = result.value.data;
      const oldActionList = this.state.actionList;
      const newActionList = [...oldActionList, ...data];
      if (data.length === 0) this.setState({ hasMoreAction: false });
      this.setState({ actionList: newActionList });
    });
  }

  getTotals() {
    const { selectedAccount } = this.state;
    this.props.getBalance({ account: selectedAccount }).then(result => {
      const data = result.value.data;
      this.setState({ totalCredit: data.credit, totalDebit: data.debit, balance: data.balance });
    });
  }

  clearAccountListAndDoSearch() {
    this.iScroll.pageLoaded = 0;
    this.setState({ accountList: [], hasMore: true }, () => {
      console.log("clicked");
      this.doSearch(0);
    });
  }

  clearActionListAndDoSearch() {
    this.iScrollDetail.pageLoaded = 0;
    this.setState({ actionList: [], hasMoreAction: true }, () => {
      this.getActionsOfAccount(0);
    });
  }

  componentDidMount() {
    this.doSearch(0);
  }

  render() {
    const {
      accountList = [],
      actionList = [],
      hasMore = true,
      hasMoreAction = true,
      selectedAccount,
      totalCredit,
      totalDebit,
      balance
    } = this.state;
    const { formatMessage } = this.props.intl;
    return (
      <Row type="flex" justify="center">
        <Col span={18}>
          <Row>
            <Col span={6}>
              <Col span={20}>
                <Input
                  ref={sInput => {
                    this.sInput = sInput;
                  }}
                  onChange={value => {
                    this.setState({ filterSearchText: value.target.value });
                  }}
                  onKeyPress={e => {
                    if (e.key === "Enter") {
                      this.clearAccountListAndDoSearch();
                    }
                  }}
                  placeholder={formatMessage({ id: "SEARCH_DESCRIPTION" })}
                />
              </Col>
              <Col span={4}>
                <Button
                  icon="search"
                  onClick={() => {
                    this.clearAccountListAndDoSearch();
                  }}
                />
              </Col>
            </Col>
          </Row>
          <Row style={{ paddingLeft: 15, fontSize: 16 }}>{formatMessage({ id: "ACCOUNTS" })}</Row>
          <Row style={{ height: "80vh" }}>
            <Col style={{ height: "100%" }} span={6}>
              <Row style={{ height: "100%" }}>
                <Col
                  span={24}
                  style={{
                    border: "1px solid #ccc",
                    overflowY: "auto",
                    height: "100%",
                    padding: 10
                  }}
                >
                  <InfiniteScroll
                    ref={iScroll => {
                      this.iScroll = iScroll;
                    }}
                    initialLoad={false}
                    pageStart={0}
                    loadMore={page => this.doSearch(page)}
                    hasMore={hasMore}
                    useWindow={false}
                  >
                    <List
                      locale={{ emptyText: "Hesap Bulunamadı" }}
                      dataSource={accountList}
                      renderItem={(item: any) => (
                        <List.Item
                          style={{ cursor: "pointer" }}
                          onClick={() => {
                            this.setState({ selectedAccount: item._id }, () => {
                              this.clearActionListAndDoSearch();
                              this.getTotals();
                            });
                          }}
                        >
                          {item._id}
                        </List.Item>
                      )}
                    />
                  </InfiniteScroll>
                </Col>
              </Row>
            </Col>
            <Col style={{ border: "1px solid #ccc", height: "100%", marginLeft: 10 }} span={17}>
              <Row
                style={{
                  overflowY: "auto",
                  height: "calc(100% - 90px)",
                  padding: 10
                }}
              >
                <InfiniteScroll
                  ref={iScrollDetail => {
                    this.iScrollDetail = iScrollDetail;
                  }}
                  initialLoad={false}
                  pageStart={0}
                  loadMore={page => this.getActionsOfAccount(page)}
                  hasMore={hasMoreAction}
                  useWindow={false}
                >
                  <Table
                    size="middle"
                    dataSource={actionList}
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
                      title={formatMessage({ id: "ACCOUNT" })}
                      dataIndex="date"
                      render={(text, row) => selectedAccount}
                      key={"date" + "2"}
                    />
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
                    <Column
                      align="left"
                      title={formatMessage({ id: "ACCOUNT_CREDIT" })}
                      dataIndex="credit"
                      render={(text, row) => (+text / 100).toFixed(2)}
                      key="credit"
                    />
                    <Column
                      align="left"
                      title={formatMessage({ id: "DEBIT" })}
                      dataIndex="debit"
                      render={(text, row) => (+text / 100).toFixed(2)}
                      key="debit"
                    />
                    <Column
                      align="left"
                      title={formatMessage({ id: "RUNNING_TOTAL" })}
                      dataIndex="runningTotal"
                      render={(text, row) => (+text / 100).toFixed(2)}
                      key="runningTotal"
                    />
                  </Table>
                </InfiniteScroll>
              </Row>
              <Row style={{ padding: 20 }}>
                <Row type={"flex"} justify={"end"}>
                  {formatMessage({ id: "TOTAL_CREDIT" })} : {(+totalCredit / 100).toFixed(2)}
                </Row>
                <Row type={"flex"} justify={"end"}>
                  {formatMessage({ id: "TOTAL_DEBIT" })} : {(+totalDebit / 100).toFixed(2)}
                </Row>
                <Row type={"flex"} justify={"end"}>
                  {formatMessage({ id: "BALANCE" })} : {(+balance / 100).toFixed(2)}
                </Row>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
    );
  }
}

const dispatchToProps = dispatch => {
  return {
    getAccounts: params => dispatch(accountingActions.getAccounts(params)),
    getActions: params => dispatch(accountingActions.getActions(params)),
    getBalance: params => dispatch(accountingActions.getBalance(params))
  };
};

export default connect(
  null,
  dispatchToProps
)(injectIntl(AccountsPage));
