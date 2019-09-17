export enum ActionTypes {
  SET_LOCALE = "SET_LOCALE"
}

export function setLocale(language) {
  return {
    type: "SET_LOCALE",
    payload: language
  };
}
