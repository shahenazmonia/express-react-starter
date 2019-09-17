import baseRequest from "../_core/baseRequest";

const CounselorService = {
  addPassword: params => baseRequest.post("/counseloruser/addPassword", params),

  findCounselorUser: params => baseRequest.get(`/counseloruser/find/${params}`),

  updateProfileInfo: params => baseRequest.post("/counseloruser/updateProfileInfo", params),

  updateCvInfo: params => baseRequest.post("/counseloruser/updateCvInfo", params),

  updateAccountInfo: params => baseRequest.post("/counseloruser/updateAccountInfo", params),

  updateActive: params => baseRequest.post("/counseloruser/updateActive", params),

  updateCompleted: params => baseRequest.post("/counseloruser/updateCompleted", params),

  setCounselorSubscription: params =>
    baseRequest.post("/counseloruser/setCounselorSubscription", params),

  updateClinicCommission: params =>
    baseRequest.post("/counseloruser/updateClinicCommission", params),

  getCounselorInfo: params => baseRequest.post("/counseloruser/getCounselorInfo", params),

  getCounselorList: params => baseRequest.post("/counseloruser/getCounselorList", params),

  getCounselorCategories: params =>
    baseRequest.post("/counseloruser/getCounselorCategories", params),

  getCounselorCategoryForClinic: params =>
    baseRequest.post("/counseloruser/getCounselorCategoryForClinic", params),

  getCounselorListForTherapyPage: params =>
    baseRequest.post("/counseloruser/getCounselorListForTherapyPage", params),

  getEffectivePrice: params => baseRequest.post("/counseloruser/getEffectivePrice", params),

  getEffectiveExpirationDate: params =>
    baseRequest.post("/counseloruser/getEffectiveExpirationDate", params),

  updatecounselorMinPrice: params =>
    baseRequest.post("/counseloruser/updatecounselorMinPrice", params),

  getRegisteredCounselorNumber: params =>
    baseRequest.post("/counseloruser/getRegisteredCounselorNumber", params),

  switchInstantTherapy: params => baseRequest.post("/counseloruser/switchInstantTherapy", params),

  getCounselorAndInstantTherapyInfo: params =>
    baseRequest.post("/counseloruser/getCounselorAndInstantTherapyInfo", params),
  changePassword: params => baseRequest.post("/counseloruser/changePassword", params)
};

export default CounselorService;
