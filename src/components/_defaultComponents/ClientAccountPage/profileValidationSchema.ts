import * as yup from "yup";

const phoneRegExp = /^((\\+[1-9]{1,4}[ \\-]*)|(\\([0-9]{2,3}\\)[ \\-]*)|([0-9]{2,4})[ \\-]*)*?[0-9]{3,4}?[ \\-]*[0-9]{3,4}?$/;

const billingSchema = formatMessage =>
  yup.object().shape({
    name: yup
      .string()
      .min(3, formatMessage({ id: "VALIDATION_MIN_THREE_LETTER" }))
      .required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    surname: yup
      .string()
      .min(3, formatMessage({ id: "VALIDATION_MIN_THREE_LETTER" }))
      .required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    identityNumber: yup
      .number()
      .typeError(formatMessage({ id: "VALIDATION_TC_NUMBER_TYPE" }))
      .test("len", formatMessage({ id: "VALIDATION_TC_NUMBER" }), val =>
        val == undefined ? false : val.toString().length == 11
      )
      .required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    phoneNumber: yup
      .string()
      .matches(phoneRegExp, formatMessage({ id: "VALIDATION_PHONE_NUMBER_TYPE" }))
      .required(formatMessage({ id: "VALIDATION_REQUIRED" })),
    address: yup
      .string()
      .min(10, "Adres en az 10 karakterden oluşmalı")
      .required(formatMessage({ id: "VALIDATION_REQUIRED" }))
  });

const profileSchema = formatMessage =>
  yup.object().shape({
    fullname: yup
      .string()
      .min(3, formatMessage({ id: "VALIDATION_MIN_THREE_LETTER" }))
      .required(formatMessage({ id: "VALIDATION_REQUIRED" }))
  });

export const profileValidationSchema = {
  billingSchema: formatMessage => billingSchema(formatMessage),
  profileSchema: formatMessage => profileSchema(formatMessage)
};
