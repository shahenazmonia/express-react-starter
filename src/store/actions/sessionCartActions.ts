export enum ActionTypes {
  SET_SESSION_CART = "SET_SESSION_CART",

  RESET_SESSION_CART = "RESET_SESSION_CART"
}

export function setSessionCart(sessionCart) {
  return {
    type: ActionTypes.SET_SESSION_CART,
    payload: sessionCart
  };
}

export function resetSessionCart() {
  return {
    type: ActionTypes.RESET_SESSION_CART
  };
}
