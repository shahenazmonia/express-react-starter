import * as yup from "yup";

export const passwordResetValidationSchema = formatMessage =>
  yup.object().shape({
    password: yup
      .string()
      .min(6, "Şifre 6 karakterden uzun olmalı!")
      .required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    passwordConfirm: yup
      .string()
      .oneOf([yup.ref("password"), null], "Şifreler uyuşmuyor!")
      .required(formatMessage({ id: "VALIDATION_REQUIRED" }))
  });
