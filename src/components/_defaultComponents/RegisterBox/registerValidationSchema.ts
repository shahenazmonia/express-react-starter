import * as yup from "yup";
export const registerValidationSchema = formatMessage =>
  yup.object().shape({
    email: yup
      .string()
      .email(formatMessage({ id: "VALIDATION_MAIL_INVALID" }))
      .required(formatMessage({ id: "VALIDATION_MAIL_REQUIRED" })),
    password: yup
      .string()
      .min(6, formatMessage({ id: "VALIDATION_PASSWORD_INVALID" }))
      .required(formatMessage({ id: "VALIDATION_PASSWORD_REQUIRED" })),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Şifreler uyuşmuyor!")
      .required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    privacy: yup
      .mixed()
      .oneOf([true], "Gizlilik politikasını ve hizmet şartlarını kabul etmelisiniz!")
  });
