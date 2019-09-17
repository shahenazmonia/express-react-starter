import baseRequest from "../_core/baseRequest";
import { loadState } from "../_core/localStorage";

const AuthService = {
  isUserLoggedIn: () => {
    return !!(loadState().user && loadState().user.loggedIn);
  },
  login: (email: string, password: string) =>
    baseRequest.post("/login", { email, password }).then(result => {
      baseRequest.addHeader(result.data.sessionToken);
      return result;
    }),
  adminLogin: (email: string, password: string) =>
    baseRequest.post("/admin/login", { email, password }).then(result => {
      baseRequest.addHeader(result.data.sessionToken);
      return result;
    }),
  logout: () => baseRequest.clearHeader()
};

export default AuthService;
