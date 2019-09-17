import axios from "axios";
import { loadState } from "./localStorage";
import config from "./config";

const isUserLoggedIn = () => !!(loadState().user && loadState().user.loggedIn);

const baseUrl = config.getBasePublicUrl() + "api";

// todo: check if needed
axios.defaults.baseURL = baseUrl;
// axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";
// axios.defaults.headers.get["Access-Control-Allow-Origin"] = "*";

const baseRequest = {
  addHeader: (token?: string): void => {
    let sessionToken = null;
    if (isUserLoggedIn()) {
      sessionToken = loadState().user.sessionToken;
    }
    axios.defaults.headers.common["Authorization"] = "Bearer " + (sessionToken || token);
  },
  clearHeader: (): void => {
    axios.defaults.headers.common["Authorization"] = "Bearer ";
  },
  setAcceptLanguage: (language?: string): void => {
    const lang = loadState().locale && loadState().locale.language;
    axios.defaults.headers.common["Accept-Language"] = lang || language;
  },
  request: (method: string, path: string, params?: object, responseType?: string): Promise<any> => {
    return axios({ method, url: path, data: params, responseType }).then(result => {
      if (result.data.message) {
        throw new Error(result.data.message);
      } else {
        return result.data;
      }
    });
  },
  get: (path: string) => baseRequest.request("GET", path),
  post: (path: string, params?: object) => baseRequest.request("POST", path, params),
  download: (path: string, params: object) => baseRequest.request("POST", path, params, "blob"),

  uploadFile: (path, imageFile, params = {}) => {
    return new Promise((resolve, reject) => {
      let url = baseUrl + path;
      let xhr = new XMLHttpRequest();
      let fd = new FormData();
      xhr.open("POST", url, true);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4 && xhr.status === 200) {
          resolve(JSON.parse(xhr.responseText));
        }
      };
      let sessionToken = null;
      if (isUserLoggedIn()) {
        sessionToken = loadState().user.sessionToken;
      }
      xhr.setRequestHeader("Authorization", "Bearer " + sessionToken);
      fd.append("datas", JSON.stringify(params));
      fd.append("file", imageFile);
      xhr.send(fd);
    });
  }
};

baseRequest.addHeader();
baseRequest.setAcceptLanguage();

export default baseRequest;
