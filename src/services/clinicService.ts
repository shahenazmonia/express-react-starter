import baseRequest from "../_core/baseRequest";

const clinicService = {
  getClinicList: params => baseRequest.post("/clinicList", params),
  addClinic: params => baseRequest.post("/clinic/new", params),
  updateClinic: params => baseRequest.post("/clinic/update", params),
  updateClinicImage: params => baseRequest.post("/clinic/updateClinicImage", params),
  removeClinic: id => baseRequest.post("/clinic/remove", id),
  findClinic: id => baseRequest.post(`/clinic/${id}`),
  invitation: params => baseRequest.post("/clinic/invitation", params),
  changePassword: params => baseRequest.post("/clinic/changePassword", params),
  getCategories: params => baseRequest.post("/clinic/getCategories", params),
  categoryMinPriceUpdate: params => baseRequest.post("/clinic/categoryMinPrice/update", params)
};

export default clinicService;
