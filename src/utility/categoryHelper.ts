import _ from "lodash";

export default {
  findCategoryInfo(categories, category) {
    return _.find(categories, ["value", category]);
  },
  findCategoryDuration(categories, category) {
    const categoryInfo = this.findCategoryInfo(categories, category);
    return categoryInfo ? categoryInfo.sessionDuration : 0;
  }
};
