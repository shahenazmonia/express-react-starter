import { ActionTypes } from "../actions/notificationActions";

const initialState = {
  myNotifications: []
};

const notification = (state = initialState, action) => {
  switch (action.type) {
    case "GET_MY_NOTIFICATIONS_SUCCESS":
      return {
        ...state,
        myNotifications: action.payload.data
      };
    default:
      return state;
  }
};
export default notification;
