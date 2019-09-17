import categoryService from "../../services/categoryService";
export enum ActionTypes {
  GET_CATEGORIES_BY_MAIN_CATEGORY = "GET_CATEGORIES_BY_MAIN_CATEGORY",

  GET_CATEGORIES = "GET_CATEGORIES",
  ADD_CATEGORY = "ADD_CATEGORY",
  UPDATE_CATEGORY = "UPDATE_CATEGORY",
  FIND_CATEGORY = "FIND_CATEGORY",
  REMOVE_CATEGORY = "REMOVE_CATEGORY"
}

export function getCategoriesByMainCategory(params) {
  return {
    type: ActionTypes.GET_CATEGORIES_BY_MAIN_CATEGORY,
    payload: categoryService.getCategoriesByMainCategory(params)
  };
}

export function getCategories() {
  return {
    type: ActionTypes.GET_CATEGORIES,
    payload: categoryService.getCategories()
  };
}

export function addCategory(params) {
  return {
    type: ActionTypes.ADD_CATEGORY,
    payload: categoryService.addCategory(params)
  };
}

export function updateCategory(params) {
  return {
    type: ActionTypes.UPDATE_CATEGORY,
    payload: categoryService.updateCategory(params)
  };
}

export function findCategory(params) {
  return {
    type: ActionTypes.FIND_CATEGORY,
    payload: categoryService.findCategory(params)
  };
}

export function removeCategory(params) {
  return {
    type: ActionTypes.REMOVE_CATEGORY,
    payload: categoryService.removeCategory(params)
  };
}
