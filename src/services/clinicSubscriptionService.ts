import baseRequest from "../_core/baseRequest";
type subscriptionType = {
  _id?: string;
  name: string;
  detail: string;
  monthlyFixedFee: number;
  platformCommission: number;
  isActive: boolean;
};

const clinicSubscriptionService = {
  getClinicSubscriptions: () => baseRequest.get("/clinicSubscriptions"),
  addClinicSubscription: (params: subscriptionType) =>
    baseRequest.post("/clinicSubscription/new", params),
  updateClinicSubscription: (params: subscriptionType) =>
    baseRequest.post("/clinicSubscription/update/", params),
  removeClinicSubscription: (params: { subscriptionId: string }) =>
    baseRequest.post("/clinicSubscription/remove", params),
  findClinicSubscription: (params: string) => baseRequest.post(`/clinicSubscription/${params}`)
};

export default clinicSubscriptionService;
