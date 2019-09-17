import clinicSubscriptionService from "../../services/clinicSubscriptionService";

export enum ActionTypes {
  ADD_CLINIC_SUBSCRIPTION = "ADD_CLINIC_SUBSCRIPTION",
  UPDATE_CLINIC_SUBSCRIPTION = "UPDATE_CLINIC_SUBSCRIPTION",
  FIND_CLINIC_SUBSCRIPTION = "FIND_CLINIC_SUBSCRIPTION",
  REMOVE_CLINIC_SUBSCRIPTION = "REMOVE_CLINIC_SUBSCRIPTION",
  GET_CLINIC_SUBSCRIPTION = "GET_CLINIC_SUBSCRIPTION"
}

export function getClinicSubscriptions() {
  return {
    type: ActionTypes.GET_CLINIC_SUBSCRIPTION,
    payload: clinicSubscriptionService.getClinicSubscriptions()
  };
}

export function addClinicSubscription(params) {
  return {
    type: ActionTypes.ADD_CLINIC_SUBSCRIPTION,
    payload: clinicSubscriptionService.addClinicSubscription(params)
  };
}

export function updateClinicSubscription(params) {
  return {
    type: ActionTypes.UPDATE_CLINIC_SUBSCRIPTION,
    payload: clinicSubscriptionService.updateClinicSubscription(params)
  };
}

export function findClinicSubscription(params) {
  return {
    type: ActionTypes.FIND_CLINIC_SUBSCRIPTION,
    payload: clinicSubscriptionService.findClinicSubscription(params)
  };
}

export function removeClinicSubscription(params) {
  return {
    type: ActionTypes.REMOVE_CLINIC_SUBSCRIPTION,
    payload: clinicSubscriptionService.removeClinicSubscription(params)
  };
}
