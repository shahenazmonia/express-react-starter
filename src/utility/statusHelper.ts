import _ from "lodash";
import sessionStatus from "./constants/sessionStatus";

export const getStatusText = status => {
  return _.find(sessionStatus, ["value", status]).text;
};
