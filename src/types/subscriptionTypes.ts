export type clinicSubscriptionType = {
  detail: String;
  isActive: Boolean;
  monthlyFixedFee: Number;
  name: String;
  platformCommission: Number;
  _id: String;
};

export type counselorSubscriptionType = {
  _id?: string;
  clinicId: string;
  name: string;
  detail: string;
  monthlyFixedFee: number;
  platformCommission: number;
  dailyMinAvailability?: number;
  isPermitedToInvite: boolean;
  isActive: boolean;
};
