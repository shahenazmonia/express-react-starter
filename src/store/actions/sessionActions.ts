import sessionService from "../../services/sessionService";

export enum ActionTypes {
  CREATE_SESSION = "CREATE_SESSION",
  GET_SESSION_DETAIL = "GET_SESSION_DETAIL",
  GET_SESSION_LIST = "GET_SESSION_LIST",
  GET_SESSION_CONTROL_LIST = "GET_SESSION_CONTROL_LIST",
  GET_SESSION_LIST_FOR_CLINIC = "GET_SESSION_LIST_FOR_CLINIC",
  GET_CLOSEST_SESSION = "GET_CLOSEST_SESSION",
  START_SESSION = "START_SESSION",
  NEW_SESSION_MESSAGE = "NEW_SESSION_MESSAGE",
  GET_SESSION_MESSAGES = "GET_SESSION_MESSAGES",
  GET_COUNSELORS_OF_SESSIONS = "GET_COUNSELORS_OF_SESSIONS",
  GET_CLIENTS_OF_SESSIONS = "GET_CLIENTS_OF_SESSIONS",
  EVALUATE_SESSION = "EVALUATE_SESSION",
  SET_PRE_SESSION_INFORMATION = "SET_PRE_SESSION_INFORMATION",
  GET_INSTANT_SESSIONS = "GET_INSTANT_SESSIONS",
  GET_TOTAL_SESSION_NUMBER = "GET_TOTAL_SESSION_NUMBER",
  GET_SESSION_NUMBER_FOR_DATE = "GET_SESSION_NUMBER_FOR_DATE",
  CREATE_TOKEN_FOR_VIDEO = "CREATE_TOKEN_FOR_VIDEO",
  BLOCK_SESSION_MESSAGES = "BLOCK_SESSION_MESSAGES",
  CANCEL_SESSION = "CANCEL_SESSION",
  SET_SESSION_STATUS = "SET_SESSION_STATUS",
  RESET_CLOSEST_SESSION = "RESET_CLOSEST_SESSION",
  SAVE_EPIKRIZ = "SAVE_EPIKRIZ"
}

export function createSession(params) {
  return {
    type: ActionTypes.CREATE_SESSION,
    payload: sessionService.createSession(params)
  };
}

export function getSessionDetail(params) {
  return {
    type: ActionTypes.GET_SESSION_DETAIL,
    payload: sessionService.getSessionDetail(params)
  };
}

export function cancelSession(params) {
  return {
    type: ActionTypes.CANCEL_SESSION,
    payload: sessionService.cancelSession(params)
  };
}

export function getSessionList(params) {
  return {
    type: ActionTypes.GET_SESSION_LIST,
    payload: sessionService.getSessionList(params)
  };
}

export function getSessionListForClinic(params) {
  return {
    type: ActionTypes.GET_SESSION_LIST_FOR_CLINIC,
    payload: sessionService.getSessionListForClinic(params)
  };
}

export function getClosestSession(params) {
  return {
    type: ActionTypes.GET_CLOSEST_SESSION,
    payload: sessionService.getClosestSession(params)
  };
}

export function resetClosestSession() {
  return {
    type: ActionTypes.RESET_CLOSEST_SESSION
  };
}

export function startSession(params) {
  return {
    type: ActionTypes.START_SESSION,
    payload: sessionService.startSession(params)
  };
}

export function newSessionMessage(params) {
  return {
    type: ActionTypes.NEW_SESSION_MESSAGE,
    payload: sessionService.newSessionMessage(params)
  };
}

export function getSessionMessages(params) {
  return {
    type: ActionTypes.GET_SESSION_MESSAGES,
    payload: sessionService.getSessionMessages(params)
  };
}

export function getCounselorsOfSessions(params) {
  return {
    type: ActionTypes.GET_COUNSELORS_OF_SESSIONS,
    payload: sessionService.getCounselorsOfSessions(params)
  };
}

export function getClientsOfSessions(params) {
  return {
    type: ActionTypes.GET_CLIENTS_OF_SESSIONS,
    payload: sessionService.getClientsOfSessions(params)
  };
}

export function evaluateSession(params) {
  return {
    type: ActionTypes.EVALUATE_SESSION,
    payload: sessionService.evaluateSession(params)
  };
}

export function setPreSessionInformation(params) {
  return {
    type: ActionTypes.SET_PRE_SESSION_INFORMATION,
    payload: sessionService.setPreSessionInformation(params)
  };
}

export function getInstantSessions(params) {
  return {
    type: ActionTypes.GET_INSTANT_SESSIONS,
    payload: sessionService.getInstantSessions(params)
  };
}

export function getTotalSessionNumber(params) {
  return {
    type: ActionTypes.GET_TOTAL_SESSION_NUMBER,
    payload: sessionService.getTotalSessionNumber(params)
  };
}

export function getSessionNumberForDate(params) {
  return {
    type: ActionTypes.GET_SESSION_NUMBER_FOR_DATE,
    payload: sessionService.getSessionNumberForDate(params)
  };
}

export function createTokenForVideo(params) {
  return {
    type: ActionTypes.CREATE_TOKEN_FOR_VIDEO,
    payload: sessionService.createTokenForVideo(params)
  };
}

export const blockSessionMessages = sessionId => {
  return {
    type: ActionTypes.BLOCK_SESSION_MESSAGES,
    payload: sessionService.blockSessionMessages({ sessionId, isAllowed: false })
  };
};

export const setSessionStatus = params => {
  return {
    type: ActionTypes.SET_SESSION_STATUS,
    payload: sessionService.setSessionStatus(params)
  };
};

export const saveEpikriz = params => {
  return {
    type: ActionTypes.SAVE_EPIKRIZ,
    payload: sessionService.saveEpikriz(params)
  };
};
