import baseRequest from "../_core/baseRequest";

const notificationService = {
  // getUsers: params => baseRequest.post("/message/getUsers", params),
  getMyNotifications: params => baseRequest.post("/notification/getMyNotifications", params),
  readNotification: params => baseRequest.post("/notification/readNotification", params)
};

export default notificationService;
