import * as yup from "yup";

const changePasswordSchema = formatMessage =>
  yup.object().shape({
    password: yup
      .string()
      .min(6, formatMessage({ id: "VALIDATION_PASSWORD_INVALID" }))
      .required(formatMessage({ id: "VALIDATION_PASSWORD_REQUIRED" })),
    newPassword: yup
      .string()
      .min(6, "Şifre 6 karakterden uzun olmalı!")
      .required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    newPasswordConfirm: yup
      .string()
      .oneOf([yup.ref("newPassword"), null], "Şifreler uyuşmuyor!")
      .required(formatMessage({ id: "VALIDATION_REQUIRED" }))
  });

export const profileValidationSchema = {
  changePasswordSchema: formatMessage => changePasswordSchema(formatMessage)
};
