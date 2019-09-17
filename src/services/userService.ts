import baseRequest from "../_core/baseRequest";

const UserService = {
  register: params => baseRequest.post("/user/new", params),
  updateProfileInfo: params => baseRequest.post("/user/updateProfileInfo", params),
  updateBillingInfo: params => baseRequest.post("/user/updateBillingInfo", params),
  updateActive: params => baseRequest.post("/user/updateActive", params),
  changePassword: params => baseRequest.post("/user/changePassword", params),
  getUserInfo: params => baseRequest.post("/user/getUserInfo", params),
  getClientList: params => baseRequest.post("/user/getClientList", params),
  getClientListForClinic: params => baseRequest.post("/user/getClientListForClinic", params),
  loginFacebook: params => {
    return baseRequest.post("/fb/token/check", params).then(res => {
      baseRequest.addHeader(res.data.sessionToken);
      return res;
    });
  },
  loginGoogle: params => {
    return baseRequest.post("/google/token/check", params).then(res => {
      baseRequest.addHeader(res.data.sessionToken);
      return res;
    });
  },
  requestPasswordReset: params => baseRequest.post("/requestpasswordreset", params),
  checkTempToken: params => baseRequest.post("/checktemptoken", params),
  resetPassword: params => baseRequest.post("/resetpassword", params),
  getClientIdByEmail: params => baseRequest.post("/user/getClientIdByEmail", params),

  updateSmsPermited: params => baseRequest.post("/updateSmsPermited", params),
  updateMailPermited: params => baseRequest.post("/updateMailPermited", params),
  updateNotificationPermited: params => baseRequest.post("/updateNotificationPermited", params)
};

export default UserService;
