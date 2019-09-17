const initialState = {
  openJitsi: false,
  openMeeting: false
};
const jitsi = (state = initialState, action) => {
  switch (action.type) {
    case "SET_JITSI":
      return { ...state, ...action.payload };
    case "RESET_JITSI":
      return { ...initialState };
    default:
      return state;
  }
};

export default jitsi;
