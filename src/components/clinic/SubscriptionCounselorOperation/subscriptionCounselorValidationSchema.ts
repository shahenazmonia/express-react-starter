import * as yup from "yup";

export const subscriptionCounselorValidationSchema = formatMessage =>
  yup.object().shape({
    name: yup
      .string()
      .min(3, "En az 3 karakterden oluşmalıdır!")
      .required("Bu alan gereklidir!"),
    detail: yup
      .string()
      .min(10, "En az 10 karakterden oluşmalıdır!")
      .required("Bu alan gereklidir!"),
    monthlyFixedFee: yup
      .number()
      .typeError("Lütfen rakam giriniz!")
      .min(10, "En az 10 ₺ olmalıdır!")
      .required("Bu alan zorunludur!"),
    platformCommission: yup
      .number()
      .typeError("Lütfen rakam giriniz!")
      .min(10, "En az 10 ₺ olmalıdır!")
      .required("Bu alan zorunludur!"),
    dailyMinAvailability: yup
      .number()
      .typeError("Lütfen saat olarak giriniz!")
      .min(1, "En az 1 saat olmalıdır!")
      .required("Bu alan zorunludur!")
  });
