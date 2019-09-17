import balanceService from "../../services/balanceService";

export enum ActionTypes {
  GET_PAYMENT_LIST = "GET_PAYMENT_LIST"
}

export function getPaymentList(params) {
  return {
    type: ActionTypes.GET_PAYMENT_LIST,
    payload: balanceService.getPaymentList(params)
  };
}
