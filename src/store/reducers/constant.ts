import { ActionTypes } from "../actions/constantsActions";
const initialState = {
  generalSubscriptions: [],
  categories: [],
  counselorSelectCategory: []
};
const constants = (state = initialState, action) => {
  switch (action.type) {
    case "GET_CLINIC_SUBSCRIPTION_SUCCESS":
      return {
        ...state,
        generalSubscriptions: action.payload.data
      };
    case "ADD_CLINIC_SUBSCRIPTION_SUCCESS":
      return {
        ...state,
        generalSubscriptions: action.payload.data
      };
    case "REMOVE_CLINIC_SUBSCRIPTION_SUCCESS":
      return {
        ...state,
        generalSubscriptions: action.payload.data
      };
    case "UPDATE_CLINIC_SUBSCRIPTION_SUCCESS":
      return {
        ...state,
        generalSubscriptions: action.payload.data
      };
    default:
      return state;
  }
};
export default constants;
