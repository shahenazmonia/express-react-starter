const sessionCart = (state = {}, action) => {
  switch (action.type) {
    case "SET_SESSION_CART":
      return { ...state, ...action.payload };
    case "RESET_SESSION_CART":
      return {};
    default:
      return state;
  }
};

export default sessionCart;
