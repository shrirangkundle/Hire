import WebUtils from "../WebUtils";
//let baseUrl = WebUtils.getBaseUrl();
let baseUrl = window.location.hostname=="localhost" ? "https://platform.dev.hireplusplus.com" : window.location.origin

export default {
  REGISTER_USER: baseUrl + "/accountmanager/api/v1/registration/add",
  LOGIN_USER: baseUrl + "/accountmanager/api/v1/login/?",
  GET_USER_DETAIL: baseUrl + "/accountmanager/api/v1/account/getUserDetails/",
  //LOGIN_USER: baseUrl+"api/v1/login/",
  LOGIN_REFRESH: baseUrl + "/accountmanager/api/v1/login/refresh?",
};
