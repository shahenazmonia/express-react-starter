import baseRequest from "../_core/baseRequest";

const clinicCategoryService = {
  getClinicCategories: params => baseRequest.post("/clinicCategory/getClinicCategories", params),
  updateCategoryMinPrice: params =>
    baseRequest.post("/clinicCategory/updateCategoryMinPrice", params)
};

export default clinicCategoryService;
