import baseRequest from "../_core/baseRequest";

const categoryService = {
  getCategories: () => baseRequest.post("/category"),
  getCategoriesByMainCategory: params => baseRequest.post("/category/get", params),
  addCategory: params => baseRequest.post("/category/new", params),
  updateCategory: params => baseRequest.post("/category/update", params),
  removeCategory: params => baseRequest.post("/category/remove", params),
  findCategory: (id: string) => baseRequest.post(`/category/${id}`)
};

export default categoryService;
