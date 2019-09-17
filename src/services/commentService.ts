import baseRequest from "../_core/baseRequest";

const commentService = {
  addComment: params => baseRequest.post("/comment/addComment", params),
  getComments: params => baseRequest.post("/comment/getComments", params),
  confirmComment: params => baseRequest.post("/comment/confirmComment", params),
  refuseComment: params => baseRequest.post("/comment/refuseComment", params),
  deleteComment: params => baseRequest.post("/comment/deleteComment", params)
};

export default commentService;
