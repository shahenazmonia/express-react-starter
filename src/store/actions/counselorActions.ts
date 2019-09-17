import CounselorService from "../../services/counselorService";

export enum ActionTypes {
  REGISTER_COUNSELOR = "REGISTER_COUNSELOR",
  UPDATE_PROFILE_INFO = "UPDATE_PROFILE_INFO",
  UPDATE_CV_INFO = "UPDATE_CV_INFO",
  UPDATE_ACCOUNT_INFO = "UPDATE_ACCOUNT_INFO",
  UPDATE_ACTIVE = "UPDATE_ACTIVE",
  UPDATE_COMPLETED = "UPDATE_COMPLETED",
  SET_COUNSELOR_SUBSCRIPTION = "SET_COUNSELOR_SUBSCRIPTION",
  UPDATE_CLINIC_COMMISSION = "UPDATE_CLINIC_COMMISSION",
  GET_COUNSELOR_INFO = "GET_COUNSELOR_INFO",
  FIND_COUNSELOR_USER = "FIND_COUNSELOR_USER",
  GET_COUNSELOR_LIST = "GET_COUNSELOR_LIST",
  GET_COUNSELOR_CATEGORIES = "GET_COUNSELOR_CATEGORIES",
  GET_COUNSELOR_CATEGORIES_FOR_CLINIC = "GET_COUNSELOR_CATEGORIES_FOR_CLINIC",
  GET_COUNSELOR_LIST_FOR_THERAPY_PAGE = "GET_COUNSELOR_LIST_FOR_THERAPY_PAGE",
  UPDATE_MIN_PRICE_FOR_COUNSELOR = "UPDATE_MIN_PRICE_FOR_COUNSELOR",
  GET_EFFECTIVE_PRICE = "GET_EFFECTIVE_PRICE",
  GET_EFFECTIVE_EXPIRATION_DATE = "GET_EFFECTIVE_EXPIRATION_DATE",
  GET_REGISTERED_COUNSELOR_NUMBER = "GET_REGISTERED_COUNSELOR_NUMBER",
  SWITCH_INSTANT_THERAPY = "SWITCH_INSTANT_THERAPY",
  GET_COUNSELOR_AND_INSTANT_THERAPY_INFO = "GET_COUNSELOR_AND_INSTANT_THERAPY_INFO",
  CHANGE_PASSWORD = "CHANGE_PASSWORD"
}

export function findCounselorUser(params) {
  return {
    type: ActionTypes.FIND_COUNSELOR_USER,
    payload: CounselorService.findCounselorUser(params)
  };
}

export function addPassword(params) {
  return {
    type: ActionTypes.FIND_COUNSELOR_USER,
    payload: CounselorService.addPassword(params)
  };
}

export function updateProfileInfo(params) {
  return {
    type: ActionTypes.UPDATE_PROFILE_INFO,
    payload: CounselorService.updateProfileInfo(params)
  };
}

export function updateCvInfo(params) {
  return {
    type: ActionTypes.UPDATE_CV_INFO,
    payload: CounselorService.updateCvInfo(params)
  };
}

export function updateAccountInfo(params) {
  return {
    type: ActionTypes.UPDATE_ACCOUNT_INFO,
    payload: CounselorService.updateAccountInfo(params)
  };
}

export function updateActive(params) {
  return {
    type: ActionTypes.UPDATE_ACTIVE,
    payload: CounselorService.updateActive(params)
  };
}

export function updateCompleted(params) {
  return {
    type: ActionTypes.UPDATE_COMPLETED,
    payload: CounselorService.updateCompleted(params)
  };
}

export function setCounselorSubscription(params) {
  return {
    type: ActionTypes.SET_COUNSELOR_SUBSCRIPTION,
    payload: CounselorService.setCounselorSubscription(params)
  };
}

export function updateClinicCommission(params) {
  return {
    type: ActionTypes.UPDATE_CLINIC_COMMISSION,
    payload: CounselorService.updateClinicCommission(params)
  };
}

export function getCounselorList(params) {
  return {
    type: ActionTypes.GET_COUNSELOR_LIST,
    payload: CounselorService.getCounselorList(params)
  };
}

export function getCounselorInfo(params) {
  return {
    type: ActionTypes.GET_COUNSELOR_INFO,
    payload: CounselorService.getCounselorInfo(params)
  };
}

export function getCounselorCategories(params) {
  return {
    type: ActionTypes.GET_COUNSELOR_CATEGORIES,
    payload: CounselorService.getCounselorCategories(params)
  };
}

export function getCounselorCategoryForClinic(params) {
  return {
    type: ActionTypes.GET_COUNSELOR_CATEGORIES_FOR_CLINIC,
    payload: CounselorService.getCounselorCategoryForClinic(params)
  };
}

export function getCounselorListForTherapyPage(params) {
  return {
    type: ActionTypes.GET_COUNSELOR_LIST_FOR_THERAPY_PAGE,
    payload: CounselorService.getCounselorListForTherapyPage(params)
  };
}

export function getEffectivePrice(params) {
  return {
    type: ActionTypes.GET_EFFECTIVE_PRICE,
    payload: CounselorService.getEffectivePrice(params)
  };
}

export function getEffectiveExpirationDate(params) {
  return {
    type: ActionTypes.GET_EFFECTIVE_EXPIRATION_DATE,
    payload: CounselorService.getEffectiveExpirationDate(params)
  };
}

export function updatecounselorMinPrice(params) {
  return {
    type: ActionTypes.UPDATE_MIN_PRICE_FOR_COUNSELOR,
    payload: CounselorService.updatecounselorMinPrice(params)
  };
}

export function getRegisteredCounselorNumber(params) {
  return {
    type: ActionTypes.GET_REGISTERED_COUNSELOR_NUMBER,
    payload: CounselorService.getRegisteredCounselorNumber(params)
  };
}

export function switchInstantTherapy(params) {
  return {
    type: ActionTypes.SWITCH_INSTANT_THERAPY,
    payload: CounselorService.switchInstantTherapy(params)
  };
}

export function getCounselorAndInstantTherapyInfo(params) {
  return {
    type: ActionTypes.GET_COUNSELOR_AND_INSTANT_THERAPY_INFO,
    payload: CounselorService.getCounselorAndInstantTherapyInfo(params)
  };
}

export function changePassword(params) {
  return {
    type: ActionTypes.CHANGE_PASSWORD,
    payload: CounselorService.changePassword(params)
  };
}
