import counselorCategoryService from "../../services/counselorCategoryService";
export enum ActionTypes {
  GET_COUNSELOR_CATEGORIES = "GET_COUNSELOR_CATEGORIES",
  UPDATE_COUNSELOR_MIN_PRICE = "UPDATE_COUNSELOR_MIN_PRICE",
  UPDATE_SERVICE_INFO = "UPDATE_SERVICE_INFO"
}

export function getCounselorCategories(params) {
  return {
    type: ActionTypes.GET_COUNSELOR_CATEGORIES,
    payload: counselorCategoryService.getCounselorCategories(params)
  };
}

export function updateCounselorMinPrice(params) {
  return {
    type: ActionTypes.UPDATE_COUNSELOR_MIN_PRICE,
    payload: counselorCategoryService.updateCounselorMinPrice(params)
  };
}

export function updateServiceInfo(params) {
  return {
    type: ActionTypes.UPDATE_SERVICE_INFO,
    payload: counselorCategoryService.updateServiceInfo(params)
  };
}
