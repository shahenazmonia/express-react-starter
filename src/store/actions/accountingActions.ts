import accountingService from "../../services/accountingService";

export enum ActionTypes {
  GET_TRANSACTIONS = "GET_TRANSACTIONS",
  GET_ACCOUNTS = "GET_ACCOUNTS",
  GET_ACTIONS = "GET_ACTIONS",
  GET_BALANCE = "GET_BALANCE",
  GET_TRANSACTION = "GET_TRANSACTION",
  TRANSACTION_CE = "TRANSACTION_CE",
  DELETE_TRANSACTION = "DELETE_TRANSACTION"
}

export function getTransactions(params) {
  return {
    type: ActionTypes.GET_TRANSACTIONS,
    payload: accountingService.getTransactions(params)
  };
}

export function getAccounts(params) {
  return {
    type: ActionTypes.GET_ACCOUNTS,
    payload: accountingService.getAccounts(params)
  };
}

export function getActions(params) {
  return {
    type: ActionTypes.GET_ACTIONS,
    payload: accountingService.getActions(params)
  };
}

export function getBalance(params) {
  return {
    type: ActionTypes.GET_BALANCE,
    payload: accountingService.getBalance(params)
  };
}

export function getTransaction(params) {
  return {
    type: ActionTypes.GET_TRANSACTION,
    payload: accountingService.getTransaction(params)
  };
}

export function transactionCE(params) {
  return {
    type: ActionTypes.TRANSACTION_CE,
    payload: accountingService.transactionCE(params)
  };
}

export function deleteTransaction(params) {
  return {
    type: ActionTypes.DELETE_TRANSACTION,
    payload: accountingService.deleteTransaction(params)
  };
}
