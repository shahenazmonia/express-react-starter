import counselorSubscriptionService from "../../services/counselorSubscriptionService";

export enum ActionTypes {
  ADD_COUNSELOR_SUBSCRIPTION = "ADD_COUNSELOR_SUBSCRIPTION",
  UPDATE_COUNSELOR_SUBSCRIPTION = "UPDATE_COUNSELOR_SUBSCRIPTION",
  FIND_COUNSELOR_SUBSCRIPTION = "FIND_COUNSELOR_SUBSCRIPTION",
  REMOVE_COUNSELOR_SUBSCRIPTION = "REMOVE_COUNSELOR_SUBSCRIPTION",
  GET_COUNSELOR_SUBSCRIPTIONS = "GET_COUNSELOR_SUBSCRIPTIONS"
}

export function addCounselorSubscription(params) {
  return {
    type: ActionTypes.ADD_COUNSELOR_SUBSCRIPTION,
    payload: counselorSubscriptionService.addCounselorSubscription(params)
  };
}

export function updateCounselorSubscription(params) {
  return {
    type: ActionTypes.UPDATE_COUNSELOR_SUBSCRIPTION,
    payload: counselorSubscriptionService.updateCounselorSubscription(params)
  };
}

export function getCounselorSubscriptions(params) {
  return {
    type: ActionTypes.GET_COUNSELOR_SUBSCRIPTIONS,
    payload: counselorSubscriptionService.getCounselorSubscriptions(params)
  };
}

export function findCounselorSubscription(params) {
  return {
    type: ActionTypes.FIND_COUNSELOR_SUBSCRIPTION,
    payload: counselorSubscriptionService.findCounselorSubscription(params)
  };
}

export function removeCounselorSubscription(params) {
  return {
    type: ActionTypes.REMOVE_COUNSELOR_SUBSCRIPTION,
    payload: counselorSubscriptionService.removeCounselorSubscription(params)
  };
}
