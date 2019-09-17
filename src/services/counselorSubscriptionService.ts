import baseRequest from "../_core/baseRequest";
type subscriptionType = {
  _id?: string;
  clinicId: string;
  name: string;
  detail: string;
  monthlyFixedFee: number;
  platformCommission: number;
  dailyMinAvailability: number;
  isActive: boolean;
};

const counselorSubscriptionService = {
  addCounselorSubscription: (params: subscriptionType) =>
    baseRequest.post("/counselorSubscription/new", params),

  updateCounselorSubscription: (params: subscriptionType) =>
    baseRequest.post("/counselorSubscription/update", params),

  removeCounselorSubscription: (params: { subscriptionId: string }) =>
    baseRequest.post("/counselorSubscription/remove", params),

  getCounselorSubscriptions: params =>
    baseRequest.post("/counselorSubscription/getSubscriptions", params),

  findCounselorSubscription: (params: string) =>
    baseRequest.post(`/counselorSubscription/${params}`)
};

export default counselorSubscriptionService;
