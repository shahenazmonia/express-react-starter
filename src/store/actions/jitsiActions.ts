export enum ActionTypes {
  SET_JITSI = "SET_JITSI",
  RESET_JITSI = "RESET_JITSI"
}

export function setJitsi(params) {
  return {
    type: ActionTypes.SET_JITSI,
    payload: params
  };
}

export function resetJitsi() {
  return {
    type: ActionTypes.RESET_JITSI
  };
}
