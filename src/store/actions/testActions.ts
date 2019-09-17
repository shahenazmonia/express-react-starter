import testService from "../../services/testService";

export enum ActionTypes {
  GET_SUB_CATEGORIES = "GET_SUB_CATEGORIES",
  GET_TEST = "GET_TEST",
  GET_PAST_TESTS = "GET_PAST_TESTS",
  SEND_RESULT_DOC = "SEND_RESULT_DOC",
  GET_TEST_RESULT = "GET_TEST_RESULT"
}

export function getSubCategories() {
  return {
    type: ActionTypes.GET_SUB_CATEGORIES,
    payload: testService.getSubCategories()
  };
}
export function getTest(category) {
  return {
    type: ActionTypes.GET_TEST,
    payload: testService.getTest(category)
  };
}
export function saveResultDoc(id) {
  return {
    type: ActionTypes.GET_TEST,
    payload: testService.saveResultDoc(id)
  };
}
export function getPastTests(id) {
  return {
    type: ActionTypes.GET_PAST_TESTS,
    payload: testService.getPastTests(id)
  };
}
export function getTestResult(id) {
  return {
    type: ActionTypes.GET_TEST,
    payload: testService.getTestResult(id)
  };
}
