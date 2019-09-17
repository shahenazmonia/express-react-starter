import * as yup from "yup";

export const TransactionCEVValidationSchema = formatMessage =>
  yup.object().shape({
    date: yup.string().required("Bu alan gereklidir!"),
    note: yup
      .string()
      .min(5, "En az 5 karakterden oluşmalıdır!")
      .required("Bu alan gereklidir!"),
    entries: yup
      .array()
      .of(
        yup.object().shape({
          note: yup.string().required("Bu alan gereklidir!"),
          credit: yup.number().required("Bu alan gereklidir!").typeError("Rakam olmali"),
          debit: yup.number().required("Bu alan gereklidir!").typeError("Rakam olmali"),
          account: yup.string().required("Bu alan gereklidir!")
        })
      )
      .min(2, "En az 2 islem girilmelidir!")
      .required("Bu alanlar zorunludur!")
  });
