import clinicService from "../../services/clinicService";

export enum ActionTypes {
  ADD_CLINIC = "ADD_CLINIC",
  GET_CLINIC_LIST = "GET_CLINIC_LIST",
  UPDATE_CLINIC = "UPDATE_CLINIC",
  FIND_CLINIC = "FIND_CLINIC",
  REMOVE_CLINIC = "REMOVE_CLINIC",
  INVITATION = "INVITATION",
  CATEGORY_MIN_PRICE_UPDATE = "CATEGORY_MIN_PRICE_UPDATE",
  GET_CATEGORIES = "GET_CATEGORIES",
  UPDATE_CLINIC_IMAGE = "UPDATE_CLINIC_IMAGE",
  CHANGE_PASSWORD = "CHANGE_PASSWORD"
}

export function addClinic(params) {
  return {
    type: ActionTypes.ADD_CLINIC,
    payload: clinicService.addClinic(params)
  };
}

export function getClinicList(params) {
  return {
    type: ActionTypes.GET_CLINIC_LIST,
    payload: clinicService.getClinicList(params)
  };
}

export function updateClinic(params) {
  return {
    type: ActionTypes.UPDATE_CLINIC,
    payload: clinicService.updateClinic(params)
  };
}

export function findClinic(params) {
  return {
    type: ActionTypes.REMOVE_CLINIC,
    payload: clinicService.findClinic(params)
  };
}

export function removeClinic(params) {
  return {
    type: ActionTypes.REMOVE_CLINIC,
    payload: clinicService.removeClinic(params)
  };
}

export function invitation(params) {
  return {
    type: ActionTypes.INVITATION,
    payload: clinicService.invitation(params)
  };
}

export function categoryMinPriceUpdate(params) {
  return {
    type: ActionTypes.CATEGORY_MIN_PRICE_UPDATE,
    payload: clinicService.categoryMinPriceUpdate(params)
  };
}

export function getCategories(params) {
  return {
    type: ActionTypes.GET_CATEGORIES,
    payload: clinicService.getCategories(params)
  };
}

export function updateClinicImage(params) {
  return {
    types: ActionTypes.UPDATE_CLINIC_IMAGE,
    payload: clinicService.updateClinicImage(params)
  };
}

export function changePassword(params) {
  return {
    type: ActionTypes.CHANGE_PASSWORD,
    payload: clinicService.changePassword(params)
  };
}
