import _ from "lodash";

export const findSubscriptionByName = ({ subscriptionList, subscriptionType }) => {
  return _.find(subscriptionList, ["name", subscriptionType]);
};

export const findSubscriptionById = ({ subscriptionList, subscriptionId }) => {
  return _.find(subscriptionList, ["_id", subscriptionId]);
};
