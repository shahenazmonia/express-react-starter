import baseRequest from "../_core/baseRequest";
import { cancelSession } from "@actions/sessionActions";

const SessionService = {
  createSession: params => baseRequest.post("/sessions/createSession", params),
  getSessionDetail: params => baseRequest.post("/sessions/getSessionDetail", params),
  getSessionList: params => baseRequest.post("/sessions/getSessionList", params),
  getSessionListForClinic: params => baseRequest.post("/sessions/getSessionListForClinic", params),
  getClosestSession: params => baseRequest.post("/sessions/getClosestSession", params),
  startSession: params => baseRequest.post("/sessions/startSession", params),
  newSessionMessage: params => baseRequest.post("/sessions/newSessionMessage", params),
  getSessionMessages: params => baseRequest.post("/sessions/getSessionMessages", params),
  getCounselorsOfSessions: params => baseRequest.post("/sessions/getCounselorsOfSessions", params),
  getClientsOfSessions: params => baseRequest.post("/sessions/getClientsOfSessions", params),
  evaluateSession: params => baseRequest.post("/sessions/evaluateSession", params),
  setPreSessionInformation: params =>
    baseRequest.post("/sessions/setPreSessionInformation", params),
  getInstantSessions: params => baseRequest.post("/sessions/getInstantSessions", params),
  getTotalSessionNumber: params => baseRequest.post("/sessions/getTotalSessionNumber", params),
  getSessionNumberForDate: params => baseRequest.post("/sessions/getSessionNumberForDate", params),
  createTokenForVideo: ({ room, exp }) =>
    baseRequest.get(`/sessions/createtokenforvideo/${room}/${exp}`),
  blockSessionMessages: params => baseRequest.post("/sessions/blockSessionMessages", params),
  cancelSession: params => baseRequest.post("/sessions/cancelSession", params),
  setSessionStatus: params => baseRequest.post("/sessions/setSessionStatus", params),
  saveEpikriz: params => baseRequest.post("/sessions/saveEpikriz", params)
};

export default SessionService;
