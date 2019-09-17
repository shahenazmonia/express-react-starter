export type clinicListType = {
  isActive: boolean;
  name: String;
  serviceCategory: Array<String>;
  subscription: { subscriptionId: String; expirationDate: String };
  subscriptionType: String;
  _id: String;
};

export type ClinicAddType = {
  name: String;
  subscriptionType: { expirationDate: String; subscriptionId: String };
  expirationDate: String;
  mainCategories: Array<String>;
  isList: boolean;
  address: String;
  phoneNumber: String;
  email: String;
  activeCounselorNumber: Number;
  taxAdministration: String;
  taxNumber: String;
  iban: String;
  isPlatformClinic: boolean;
  contactName: String;
  contactPhoneNumber: String;
  contactEmail: String;
  isActive: boolean;
};

export type ClinicUpdateType = {
  _id: String | Number;
  name: String;
  subscriptionType: { expirationDate: String; subscriptionId: String };
  expirationDate: String;
  mainCategories: Array<String>;
  isList: boolean;
  address: String;
  phoneNumber: String;
  email: String;
  activeCounselorNumber: Number;
  taxAdministration: String;
  taxNumber: String;
  iban: String;
  isPlatformClinic: boolean;
  contactName: String;
  contactPhoneNumber: String;
  contactEmail: String;
  isActive: boolean;
};
