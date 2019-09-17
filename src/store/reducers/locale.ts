const locale = (state = { language: "tr" }, action) => {
  switch (action.type) {
    case "SET_LOCALE":
      return { language: action.payload };
    default:
      return state;
  }
};

export default locale;
