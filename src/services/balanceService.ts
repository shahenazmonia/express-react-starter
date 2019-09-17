import baseRequest from "../_core/baseRequest";

const BalanceService = {
  getPaymentList: params => baseRequest.post("/balance/getPaymentList", params)
};

export default BalanceService;
