import baseRequest from "../_core/baseRequest";

const accountingService = {
  getTransactions: params => baseRequest.post("/adminuser/accounting/gettransactions", params),
  getAccounts: params => baseRequest.post("/adminuser/accounting/getaccounts", params),
  getActions: params => baseRequest.post("/adminuser/accounting/getactions", params),
  getBalance: params => baseRequest.post("/adminuser/accounting/getbalance", params),
  getTransaction: params => baseRequest.post("/adminuser/accounting/gettransaction", params),
  transactionCE: params => baseRequest.post("/adminuser/accounting/transaction/ce", params),
  deleteTransaction: params => baseRequest.post("/adminuser/accounting/transaction/delete", params)
};

export default accountingService;
