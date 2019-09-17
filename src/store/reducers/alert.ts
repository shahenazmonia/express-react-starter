import {
  ActionTypes,
  ErrorAction,
  ConfirmAction,
  WarningAction,
  InfoAction
} from "../actions/alertActions";

export interface State {
  error?: { showError?: boolean };
  confirm?: { showConfirm?: boolean };
  warning?: { showWarning?: boolean };
  info?: { showInfo?: boolean };
}

const initialState = {
  error: { showError: false },
  confirm: { showConfirm: false },
  warning: { showWarning: false },
  info: { showInfo: false }
};

const alert = (
  state: State = initialState,
  action: ErrorAction | ConfirmAction | WarningAction | InfoAction
) => {
  switch (action.type) {
    case ActionTypes.SHOW_ERR:
      return {
        ...state,
        error: {
          showError: true,
          body: action.body,
          title: action.title,
          actionFunc: action.actionFunc,
          actionTitle: action.actionTitle
        }
      };
    case ActionTypes.CLOSE_ERR:
      return { ...state, error: { showError: false } };

    case ActionTypes.SHOW_CONFIRM:
      return {
        ...state,
        confirm: {
          showConfirm: true,
          body: action.body,
          title: action.title,
          actionFunc: action.actionFunc,
          actionTitle: action.actionTitle
        }
      };
    case ActionTypes.CLOSE_CONFIRM:
      return { ...state, confirm: { showConfirm: false } };

    case ActionTypes.SHOW_WARNING:
      return {
        ...state,
        warning: {
          showWarning: true,
          body: action.body,
          title: action.title,
          actionFunc: action.actionFunc,
          actionTitle: action.actionTitle
        }
      };
    case ActionTypes.CLOSE_WARNING:
      return { ...state, warning: { showWarning: false } };

    case ActionTypes.SHOW_INFO:
      return {
        ...state,
        info: {
          showInfo: true,
          body: action.body,
          title: action.title,
          actionFunc: action.actionFunc,
          actionTitle: action.actionTitle
        }
      };
    case ActionTypes.CLOSE_INFO:
      return { ...state, info: { showInfo: false } };
    default:
      return state;
  }
};

export default alert;
