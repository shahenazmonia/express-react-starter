export enum ActionTypes {
  SHOW_ERR = "SHOW_ERR",
  CLOSE_ERR = "CLOSE_ERR",
  SHOW_CONFIRM = "SHOW_CONFIRM",
  CLOSE_CONFIRM = "CLOSE_CONFIRM",
  SHOW_WARNING = "SHOW_WARNING",
  CLOSE_WARNING = "CLOSE_WARNING",
  SHOW_INFO = "SHOW_INFO",
  CLOSE_INFO = "CLOSE_INFO"
}

export interface ShowAlertParams {
  body: string;
  title?: string;
  actionTitle?: string;
  actionFunc?: () => void;
}

export interface ShowErrorAction extends ShowAlertParams {
  type: ActionTypes.SHOW_ERR;
}

interface ShowConfirmAction extends ShowAlertParams {
  type: ActionTypes.SHOW_CONFIRM;
}

interface ShowWarningAction extends ShowAlertParams {
  type: ActionTypes.SHOW_WARNING;
}

export interface ShowInfoAction extends ShowAlertParams {
  type: ActionTypes.SHOW_INFO;
}

export function showError(params: ShowAlertParams): ShowErrorAction {
  return {
    type: ActionTypes.SHOW_ERR,
    ...params
  };
}

interface CloseErrorAction {
  type: ActionTypes.CLOSE_ERR;
}

export function closeError(): CloseErrorAction {
  return {
    type: ActionTypes.CLOSE_ERR
  };
}

interface ShowConfirmAction extends ShowAlertParams {
  type: ActionTypes.SHOW_CONFIRM;
}

export function showConfirm(params: ShowAlertParams): ShowConfirmAction {
  return {
    type: ActionTypes.SHOW_CONFIRM,
    ...params
  };
}

interface CloseConfirmAction {
  type: ActionTypes.CLOSE_CONFIRM;
}

export function closeConfirm(): CloseConfirmAction {
  return {
    type: ActionTypes.CLOSE_CONFIRM
  };
}

interface ShowWarningAction extends ShowAlertParams {
  type: ActionTypes.SHOW_WARNING;
}

export function showWarning(params: ShowAlertParams): ShowWarningAction {
  return {
    type: ActionTypes.SHOW_WARNING,
    ...params
  };
}

interface CloseWarningAction {
  type: ActionTypes.CLOSE_WARNING;
}

export function closeWarning(): CloseWarningAction {
  return {
    type: ActionTypes.CLOSE_WARNING
  };
}

export function showInfo(params: ShowAlertParams): ShowInfoAction {
  return {
    type: ActionTypes.SHOW_INFO,
    ...params
  };
}

interface CloseInfoAction {
  type: ActionTypes.CLOSE_INFO;
}

export function closeInfo(): CloseInfoAction {
  return {
    type: ActionTypes.CLOSE_INFO
  };
}

export type ErrorAction = ShowErrorAction | CloseErrorAction;
export type ConfirmAction = ShowConfirmAction | CloseConfirmAction;
export type WarningAction = ShowWarningAction | CloseWarningAction;
export type InfoAction = ShowInfoAction | CloseInfoAction;
