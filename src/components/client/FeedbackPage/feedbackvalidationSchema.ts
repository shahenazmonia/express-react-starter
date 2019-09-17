import * as yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const feedbackValidationSchema = formatMessage =>
  yup.object().shape({
    fullname: yup
      .string()
      .min(3, formatMessage({ id: "VALIDATION_MIN_THREE_LETTER" }))
      .required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    email: yup
      .string()
      .email(formatMessage({ id: "VALIDATION_MAIL_INVALID" }))
      .required(formatMessage({ id: "VALIDATION_MAIL_REQUIRED" })),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, formatMessage({ id: "VALIDATION_PHONE_NUMBER_TYPE" }))
      .required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    message: yup
      .string()
      .min(10, formatMessage({ id: "VALIDATION_MESSAGE" }))
      .required(formatMessage({ id: "VALIDATION_REQUIRED" }))
  });
