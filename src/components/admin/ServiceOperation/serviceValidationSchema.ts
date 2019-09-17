import * as yup from "yup";

export const serviceValidationSchema = formatMessage =>
  yup.object().shape({
    value: yup
      .string()
      .min(3, "En az 3 karakterden oluşmalıdır!")
      .required("Bu alan zorunludur!"),
    name_TR: yup
      .string()
      .min(3, "En az 3 karakterden oluşmalıdır!")
      .required("Bu alan zorunludur!"),
    name_EN: yup
      .string()
      .min(3, "En az 3 karakterden oluşmalıdır!")
      .required("Bu alan zorunludur!"),
    detail_TR: yup
      .string()
      .min(10, "En az 10 karakterden oluşmalıdır!")
      .required("Bu alan zorunludur!"),
    detail_EN: yup
      .string()
      .min(10, "En az 10 karakterden oluşmalıdır!")
      .required("Bu alan zorunludur!"),
    generalMinPrice: yup
      .number()
      .typeError("Lütfen rakam giriniz!")
      .min(10, "En az 10 ₺ olmalıdır!")
      .required("Bu alan zorunludur!")
  });
