import * as yup from "yup";

export const waitingRoomValidationSchema = formatMessage =>
  yup.object().shape({
    clientNickname: yup.string().required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    preSessionMessage: yup
      .string()
      .max(500, formatMessage({ id: "WAITING_ROOM_MESSAGE_VALIDATION_TEXT" }, { value: 500 }))
      .required(formatMessage({ id: "VALIDATION_MESSAGE_REQUIRED" }))
  });
