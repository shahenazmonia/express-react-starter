import * as yup from "yup";

export const loginValidationSchema = formatMessage =>
  yup.object().shape({
    email: yup
      .string()
      .email(formatMessage({ id: "VALIDATION_MAIL_INVALID" }))
      .required(formatMessage({ id: "VALIDATION_MAIL_REQUIRED" })),
    password: yup
      .string()
      .min(6, formatMessage({ id: "VALIDATION_PASSWORD_INVALID" }))
      .required(formatMessage({ id: "VALIDATION_PASSWORD_REQUIRED" }))
  });
