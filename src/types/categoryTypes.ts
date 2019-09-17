export type categoryType = {
  _id: string | undefined;
  value: string | undefined;
  name_TR: string | undefined;
  name_EN: string | undefined;
  detail_TR: string | undefined;
  detail_EN: string | undefined;
  generalMinPrice: number | undefined;
  mainCategory: Array<string> | undefined;
  sessionDuration: number | undefined;
  isActive: boolean;
  isDeleted: boolean;
};

export type categoryForClinicType = {
  _id: string;
  value: string;
  name_TR: string;
  name_EN: string;
  detail_TR: string;
  detail_EN: string;
  generalMinPrice: number;
  clinicMinPrice: number;
  price: number;
  mainCategory: string;
  sessionDuration: number | undefined;
  isActive: boolean;
  isDeleted: boolean;
};
