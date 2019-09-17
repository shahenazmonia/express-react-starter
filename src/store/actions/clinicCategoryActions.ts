import clinicCategoryService from "../../services/clinicCategoryService";
export enum ActionTypes {
  GET_CLINIC_CATEGORIES = "GET_CLINIC_CATEGORIES",
  UPDATE_CATEGORY_MIN_PRICE = "UPDATE_CATEGORY_MIN_PRICE"
}

export function getClinicCategories(params) {
  return {
    type: ActionTypes.GET_CLINIC_CATEGORIES,
    payload: clinicCategoryService.getClinicCategories(params)
  };
}

export function updateCategoryMinPrice(params) {
  return {
    type: ActionTypes.UPDATE_CATEGORY_MIN_PRICE,
    payload: clinicCategoryService.updateCategoryMinPrice(params)
  };
}
