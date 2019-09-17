import UserService from "../../services/userService";
import AuthService from "../../services/authService";

export enum ActionTypes {
  REGISTER = "REGISTER",
  LOGIN = "LOGIN",
  LOGIN_FACEBOOK = "LOGIN_FACEBOOK",
  LOGIN_GOOGLE = "LOGIN_GOOGLE",
  LOGOUT = "LOGOUT",
  UPDATE_PROFILE_INFO = "UPDATE_PROFILE_INFO",
  UPDATE_BILLING_INFO = "UPDATE_BILLING_INFO",
  UPDATE_USER_ACTIVE = "UPDATE_USER_ACTIVE",
  CHANGE_PASSWORD = "CHANGE_PASSWORD",
  GET_USER_INFO = "GET_USER_INFO",
  GET_CLIENT_LIST = "GET_CLIENT_LIST",
  GET_CLIENT_LIST_FOR_CLINIC = "GET_CLIENT_LIST_FOR_CLINIC",
  REQUEST_PASSWORD_RESET = "REQUEST_PASSWORD_RESET",
  CHECK_TEMP_TOKEN = "CHECK_TEMP_TOKEN",
  RESET_PASSWORD = "RESET_PASSWORD",
  GET_CLIENT_ID_BY_EMAIL = "GET_CLIENT_ID_BY_EMAIL",
  UPDATE_SMS_PERMITED = "UPDATE_SMS_PERMITED",
  UPDATE_MAIL_PERMITED = "UPDATE_MAIL_PERMITED",
  UPDATE_NOTIFICATION_PERMITED = "UPDATE_NOTIFICATION_PERMITED"
}

export function register(params) {
  return {
    type: ActionTypes.REGISTER,
    payload: UserService.register(params)
  };
}

export function login(params) {
  return {
    type: ActionTypes.LOGIN,
    payload: AuthService.login(params.email, params.password)
  };
}

export function logout() {
  return {
    type: ActionTypes.LOGOUT,
    payload: AuthService.logout()
  };
}

export function updateProfileInfo(params) {
  return {
    type: ActionTypes.UPDATE_PROFILE_INFO,
    payload: UserService.updateProfileInfo(params)
  };
}

export function updateBillingInfo(params) {
  return {
    type: ActionTypes.UPDATE_BILLING_INFO,
    payload: UserService.updateBillingInfo(params)
  };
}

export function updateActive(params) {
  return {
    type: ActionTypes.UPDATE_USER_ACTIVE,
    payload: UserService.updateActive(params)
  };
}

export function changePassword(params) {
  return {
    type: ActionTypes.CHANGE_PASSWORD,
    payload: UserService.changePassword(params)
  };
}

export function getUserInfo(params) {
  return {
    type: ActionTypes.GET_USER_INFO,
    payload: UserService.getUserInfo(params)
  };
}

export function getClientList(params) {
  return {
    type: ActionTypes.GET_CLIENT_LIST,
    payload: UserService.getClientList(params)
  };
}

export function getClientListForClinic(params) {
  return {
    type: ActionTypes.GET_CLIENT_LIST_FOR_CLINIC,
    payload: UserService.getClientListForClinic(params)
  };
}

export function loginFacebook(params) {
  return {
    type: ActionTypes.LOGIN_FACEBOOK,
    payload: UserService.loginFacebook(params)
  };
}

export function loginGoogle(params) {
  return {
    type: ActionTypes.LOGIN_GOOGLE,
    payload: UserService.loginGoogle(params)
  };
}

export function requestPasswordReset(params) {
  return {
    type: ActionTypes.REQUEST_PASSWORD_RESET,
    payload: UserService.requestPasswordReset(params)
  };
}

export function checkTempToken(params) {
  return {
    type: ActionTypes.CHECK_TEMP_TOKEN,
    payload: UserService.checkTempToken(params)
  };
}

export function resetPassword(params) {
  return {
    type: ActionTypes.RESET_PASSWORD,
    payload: UserService.resetPassword(params)
  };
}

export function getClientIdByEmail(params) {
  return {
    type: ActionTypes.GET_CLIENT_ID_BY_EMAIL,
    payload: UserService.getClientIdByEmail(params)
  };
}

export function updateSmsPermited(params) {
  return {
    type: ActionTypes.UPDATE_SMS_PERMITED,
    payload: UserService.updateSmsPermited(params)
  };
}

export function updateMailPermited(params) {
  return {
    type: ActionTypes.UPDATE_MAIL_PERMITED,
    payload: UserService.updateMailPermited(params)
  };
}

export function updateNotificationPermited(params) {
  return {
    type: ActionTypes.UPDATE_NOTIFICATION_PERMITED,
    payload: UserService.updateNotificationPermited(params)
  };
}
