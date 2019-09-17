import * as yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

export const ClinicValidationSchema = (formatMessage, isEdit) =>
  yup.object().shape({
    name: yup
      .string()
      .min(3, formatMessage({ id: "VALIDATION_MIN_THREE_LETTER" }))
      .required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    subscriptionType: yup.string().required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    expirationDate: yup.string(),
    mainCategories: yup.array().required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    address: yup
      .string()
      .min(10, formatMessage({ id: "VALIDATION_ADDRESS" }))
      .required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, formatMessage({ id: "VALIDATION_PHONE_NUMBER_TYPE" }))
      .required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    email: yup
      .string()
      .email(formatMessage({ id: "VALIDATION_MAIL_INVALID" }))
      .required(formatMessage({ id: "VALIDATION_MAIL_REQUIRED" })),
    activeCounselorNumber: yup.number().required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    taxAdministration: yup.string().required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    taxNumber: yup
      .number()
      .typeError(formatMessage({ id: "VALIDATION_TAX_NUMBER" }))
      .test("len", formatMessage({ id: "VALIDATION_TAX_NUMBER_INVALID" }), val =>
        val === undefined ? false : val.toString().length === 10
      )
      .required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    iban: yup.number().required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    contactName: yup
      .string()
      .min(3, formatMessage({ id: "VALIDATION_MIN_THREE_LETTER" }))
      .required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    contactPhoneNumber: yup
      .string()
      .matches(phoneRegExp, formatMessage({ id: "VALIDATION_PHONE_NUMBER_TYPE" }))
      .required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    contactEmail: yup
      .string()
      .email(formatMessage({ id: "VALIDATION_MAIL_INVALID" }))
      .required(formatMessage({ id: "VALIDATION_MAIL_REQUIRED" })),
    password: !isEdit
      ? yup
          .string()
          .min(6, "MIN 6 CHARACTER!")
          .required(formatMessage({ id: "VALIDATION_REQUIRED" }))
      : yup.string().min(6, "MIN 6 CHARACTER!"),
    passwordConfirm: !isEdit
      ? yup
          .string()
          .oneOf([yup.ref("password"), null], "PASSWORD_DO_NOT_MATCH!")
          .required(formatMessage({ id: "VALIDATION_REQUIRED" }))
      : yup.string().oneOf([yup.ref("password"), null], "PASSWORD_DO_NOT_MATCH!")
  });
