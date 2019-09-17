import commentService from "../../services/commentService";

export enum ActionTypes {
  ADD_COMMENT = "ADD_COMMENT",
  GET_COMMENTS = "GET_COMMENTS",
  CONFIRM_COMMENT = "CONFIRM_COMMENT",
  REFUSE_COMMENT = "REFUSE_COMMENT",
  DELETE_COMMENT = "DELETE_COMMENT"
}

export function addComment(params) {
  return {
    type: ActionTypes.ADD_COMMENT,
    payload: commentService.addComment(params)
  };
}

export function getComments(params) {
  return {
    type: ActionTypes.GET_COMMENTS,
    payload: commentService.getComments(params)
  };
}

export function confirmComment(params) {
  return {
    type: ActionTypes.CONFIRM_COMMENT,
    payload: commentService.confirmComment(params)
  };
}

export function refuseComment(params) {
  return {
    type: ActionTypes.REFUSE_COMMENT,
    payload: commentService.refuseComment(params)
  };
}

export function deleteComment(params) {
  return {
    type: ActionTypes.DELETE_COMMENT,
    payload: commentService.deleteComment(params)
  };
}
