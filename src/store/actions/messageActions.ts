import messageService from "../../services/messageService";

export enum ActionTypes {
  SEND_MESSAGE = "SEND_MESSAGE",
  SENT_MESSAGE_LIST = "SENT_MESSAGE_LIST"
}

export function sendMessage(params) {
  return {
    type: ActionTypes.SEND_MESSAGE,
    payload: messageService.sendMessage(params)
  };
}

export function sentMessageList(params) {
  return {
    type: ActionTypes.SENT_MESSAGE_LIST,
    payload: messageService.sentMessageList(params)
  };
}
