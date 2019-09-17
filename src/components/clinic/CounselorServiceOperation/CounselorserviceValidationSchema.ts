import * as yup from "yup";

export const CounselorserviceValidationSchema = formatMessage =>
  yup.object().shape({
    name: yup
      .string()
      .min(3, "En az 3 karakterden oluşmalıdır!")
      .required("Bu alan zorunludur!"),
    detail: yup
      .string()
      .min(10, "En az 10 karakterden oluşmalıdır!")
      .required("Bu alan zorunludur!"),
    minPrice: yup
      .number()
      .typeError("Lütfen rakam giriniz!")
      .min(10, "En az 10 ₺ olmalıdır!")
      .required("Bu alan zorunludur!")
  });
