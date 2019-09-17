import baseRequest from "../_core/baseRequest";

const counselorCategoryService = {
  getCounselorCategories: params =>
    baseRequest.post("/counselorCategory/getCounselorCategories", params),
  updateCounselorMinPrice: params =>
    baseRequest.post("/counselorCategory/updateCounselorMinPrice", params),
  updateServiceInfo: params => baseRequest.post("/counselorCategory/updateServiceInfo", params)
};

export default counselorCategoryService;
