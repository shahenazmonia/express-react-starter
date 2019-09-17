import AdminService from "../../services/adminService";
import AuthService from "../../services/authService";

export enum ActionTypes {
  REGISTER_ADMIN = "REGISTER_ADMIN",
  LOGIN_ADMIN = "LOGIN_ADMIN"
}

export function adminLogin(params) {
  return {
    type: ActionTypes.LOGIN_ADMIN,
    payload: AuthService.adminLogin(params.email, params.password)
  };
}
