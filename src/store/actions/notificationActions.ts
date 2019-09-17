import notificationService from "../../services/notificationService";

export enum ActionTypes {
  GET_MY_NOTIFICATIONS = "GET_MY_NOTIFICATIONS",
  READ_NOTIFICATION = "READ_NOTIFICATION"
}

export function getMyNotifications(params) {
  return {
    type: ActionTypes.GET_MY_NOTIFICATIONS,
    payload: notificationService.getMyNotifications(params)
  };
}

export function readNotification(params) {
  return {
    type: ActionTypes.READ_NOTIFICATION,
    payload: notificationService.readNotification(params)
  };
}
