import * as yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;
const ibanRegExp = /^TR\d{7}[0-9A-Z]{17}$/;

const profileValidation = formatMessage =>
  yup.object().shape({
    fullname: yup.string().min(3, formatMessage({ id: "VALIDATION_MIN_THREE_LETTER" }))
  });

const cvValidation = formatMessage =>
  yup.object().shape({
    coverLetter: yup.string().min(10, "En az 10 Karakterden oluşmalıdır!"),
    workExperience: yup.string().min(10, "En az 10 karakterden oluşmalıdır!"),
    courses: yup.string().min(10, "En az 10 karakterden oluşmalıdır!")
  });

const accountValidation = formatMessage =>
  yup.object().shape({
    accountName: yup
      .string()
      .min(3, formatMessage({ id: "VALIDATION_MIN_THREE_LETTER" }))
      .required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    accountSurname: yup.string().required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    identityNumber: yup
      .number()
      .typeError(formatMessage({ id: "VALIDATION_TC_NUMBER_TYPE" }))
      .test("len", formatMessage({ id: "VALIDATION_TC_NUMBER" }), val =>
        val === undefined ? false : val.toString().length === 11
      )
      .required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, formatMessage({ id: "VALIDATION_PHONE_NUMBER_TYPE" }))
      .required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    address: yup
      .string()
      .min(10, "Adres en az 10 karakterden oluşmalı")
      .required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    iban: yup
      .string()
      .matches(ibanRegExp, "İban numarasını kontrol ediniz!")
      .required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    taxAdministration: yup.string().required("Bu alan zorunlu"),
    taxNumber: yup
      .number()
      .typeError("Rakamlardan oluşmalıdır!")
      .required(formatMessage({ id: "VALIDATION_REQUIRED" }))
  });

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
  profileValidation: formatMessage => profileValidation(formatMessage),
  cvValidation: formatMessage => cvValidation(formatMessage),
  accountValidation: formatMessage => accountValidation(formatMessage),
  changePasswordSchema: formatMessage => changePasswordSchema(formatMessage)
};
