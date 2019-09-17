const closestSession = (state = {}, action) => {
  switch (action.type) {
    case "GET_CLOSEST_SESSION_SUCCESS":
      return {
        ...action.payload.data
      };
    case "RESET_CLOSEST_SESSION":
      return {};
    default:
      return state;
  }
};
export default closestSession;
