import baseRequest from "../_core/baseRequest";

const TestService = {
  getSubCategories: () => baseRequest.post("/test/getSubCategories"),
  getTest: category => baseRequest.post("/test/getTest", { category }),
  saveResultDoc: resultDoc => baseRequest.post("/test/saveResultDoc", resultDoc),
  getTestResult: id => baseRequest.post("/test/getTestResult", id),
  getPastTests: params => baseRequest.post("/test/getPastTests", params)
};

export default TestService;
