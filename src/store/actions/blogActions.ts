import blogService from "../../services/blogService";
export enum ActionTypes {
  GET_BLOGS = "GET_BLOGS",
  GET_BLOGS_FOR_CLINIC = "GET_BLOGS_FOR_CLINIC",
  ADD_BLOG = "ADD_BLOG",
  UPDATE_BLOG = "UPDATE_BLOG",
  DELETE_BLOG = "DELETE_BLOG",
  PUBLISH_BLOG = "PUBLISH_BLOG",
  GET_BLOG_DETAILS = "GET_BLOG_DETAILS",
  REMOVE_BLOG = "REMOVE_BLOG",
  INCREASE_SEEN_COUNT = "INCREASE_SEEN_COUNT",
  GET_MOST_READ_BLOGS = "GET_MOST_READ_BLOGS",
  GET_BLOG_CREATOR_NAME = "GET_BLOG_CREATOR_NAME"
}

export function getBlogs(filter) {
  return {
    type: ActionTypes.GET_BLOGS,
    payload: blogService.getBlogs(filter)
  };
}

export function getBlogsForClinic(filter) {
  return {
    type: ActionTypes.GET_BLOGS_FOR_CLINIC,
    payload: blogService.getBlogsForClinic(filter)
  };
}

export function addBlog(params) {
  return {
    type: ActionTypes.ADD_BLOG,
    payload: blogService.addBlog(params)
  };
}

export function updateBlog(params) {
  return {
    type: ActionTypes.UPDATE_BLOG,
    payload: blogService.updateBlog(params)
  };
}

export function deleteBlog(params) {
  return {
    type: ActionTypes.DELETE_BLOG,
    payload: blogService.deleteBlog(params)
  };
}

export function getBlogDetails(params) {
  return {
    type: ActionTypes.GET_BLOG_DETAILS,
    payload: blogService.getBlogDetails(params)
  };
}

export function publishBlog(params) {
  return {
    type: ActionTypes.PUBLISH_BLOG,
    payload: blogService.publishBlog(params)
  };
}

export function removeBlog(params) {
  return {
    type: ActionTypes.REMOVE_BLOG,
    payload: blogService.removeBlog(params)
  };
}

export function increaseSeenCount(params) {
  return {
    type: ActionTypes.INCREASE_SEEN_COUNT,
    payload: blogService.increaseSeenCount(params)
  };
}

export function getMostReadBlogs(params) {
  return {
    type: ActionTypes.GET_MOST_READ_BLOGS,
    payload: blogService.getMostReadBlogs(params)
  };
}

export function getBlogCreatorName(params) {
  return {
    type: ActionTypes.GET_BLOG_CREATOR_NAME,
    payload: blogService.getBlogCreatorName(params)
  };
}
