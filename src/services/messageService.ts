import baseRequest from "../_core/baseRequest";

const messageService = {
  sendMessage: params => baseRequest.post("/message/sendMessage", params),
  sentMessageList: params => baseRequest.post("/message/sentMessageList", params)
};

export default messageService;
