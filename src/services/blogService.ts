import baseRequest from "../_core/baseRequest";

const blogService = {
  getBlogs: filter => baseRequest.post("/blog/get", filter),
  getBlogsForClinic: filter => baseRequest.post("/blog/getBlogsForClinic", filter),
  addBlog: params => baseRequest.post("/blog/new", params),
  updateBlog: params => baseRequest.post("/blog/update", params),
  deleteBlog: params => baseRequest.post("/blog/delete", params),
  publishBlog: params => baseRequest.post("/blog/publish", params),
  removeBlog: params => baseRequest.post("/blog/remove", params),
  getBlogDetails: params => baseRequest.post("/blog/getBlogDetails", params),
  increaseSeenCount: params => baseRequest.post("/blog/increaseSeenCount", params),
  getMostReadBlogs: params => baseRequest.post("/blog/getMostReadBlogs", params),
  getBlogCreatorName: params => baseRequest.post("/blog/getBlogCreatorName", params)
};

export default blogService;
