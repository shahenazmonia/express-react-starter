import availabilityService from "../../services/availabilityCalendarService";

export enum ActionTypes {
  GET_COUNSELOR_AVAILABILITY = "GET_COUNSELOR_AVAILABILITY",
  UDPATE_COUNSELOR_AVAILABILITY = "UDPATE_COUNSELOR_AVAILABILITY",
  GET_COUNSELOR_AVAILABILITY_FOR_CLIENT = "GET_COUNSELOR_AVAILABILITY_FOR_CLIENT"
}

export function getCounselorAvailability(params) {
  return {
    type: ActionTypes.GET_COUNSELOR_AVAILABILITY,
    payload: availabilityService.getCounselorAvailability(params)
  };
}

export function updateCounselorAvailability(params) {
  return {
    type: ActionTypes.GET_COUNSELOR_AVAILABILITY,
    payload: availabilityService.updateCounselorAvailability(params)
  };
}

export function getCounselorAvailabilityForClient(params) {
  return {
    type: ActionTypes.GET_COUNSELOR_AVAILABILITY_FOR_CLIENT,
    payload: availabilityService.getCounselorAvailabilityForClient(params)
  };
}
