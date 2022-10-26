import axios from "axios";
import AppAPIs from "./APIs/AppAPIs";
import Utils from "./Utils";

let userDetail = Utils.getUserDetail();
const axiosInstance = axios.create({
    baseURL: window.location.hostname == "localhost" ? "https://platform.dev.hireplusplus.com" :  window.location.origin,
    headers: {
      ...(userDetail && {
        'Authorization':  "Bearer " + userDetail.accessToken,
        username: "abcd",
        userId: userDetail.userIdentifier,
      })
    }
});

axios.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    const originalRequest = error.config;
    let userDetail = Utils.getUserDetail();
    let refreshToken = "";
    if (userDetail && userDetail.refreshToken) {
      refreshToken = userDetail.refreshToken;
    }
    const now = Math.ceil(Date.now() / 1000);
    const refreshTokenParts = JSON.parse(atob(refreshToken.split('.')[1]));
    if (refreshTokenParts && refreshTokenParts.exp > now) {
      return axiosInstance
      .get(AppAPIs["LOGIN_REFRESH"] + `refreshToken=${refreshToken}`)
      .then((response) => {
        if (response.status === 200) {
          let userIdentifier = userDetail.userIdentifier
          let userRole =  userDetail.userRole
          userDetail = { ...userDetail, ...response.data.data, userIdentifier, userRole };
          Utils.setUserDetail(userDetail);
          axios.defaults.headers['Authorization'] = "Bearer " + userDetail.accessToken;
          originalRequest.headers['Authorization'] = "Bearer " + userDetail.accessToken;
          return axiosInstance(originalRequest);
        } else if (response.status != 200) {
          return axiosInstance(originalRequest);
        }
      })
      .catch(err => {
          console.log(err)
      });
    } else if(refreshTokenParts && refreshTokenParts.exp < now) {
      console.log("Refresh token is expired", refreshTokenParts.exp, now);
      Utils.removeUserDetail();
      window.location.href = "/";
    }
  }
);

//For Post Calls
// axios.interceptors.response.use(
//   response => {
//       return response
//   }, error => {
//       const originalRequest = error.config
//       const refreshToken = ''
//       //If token expires
//       return (
//           axios.get(AppAPIs["LOGIN_REFRESH"]+`refreshToken=${refreshToken}`).then(res => {
//               if (res.status === 200) {
//                 axios.defaults.headers.common['Authorization'] ='Bearer ' + ""
//                 return axios(originalRequest)
//               } else if (res.status != 200) {
//                   //router.push('/login')
//                   return Promise.reject(error)
//               }
//           })
//       )
//   }
// )

const setHeaderParams = () => {
  let userDetail = Utils.getUserDetail();
  if (userDetail) {
    axios.defaults.headers.common = {
      authorization: "Bearer " + userDetail.accessToken,
      username: "abcd",
      userId: userDetail.userIdentifier,
    };
  }
};

const WebUtils = {
  httpOperations: (
    url,
    data,
    httpMethod = undefined,
    responseType = undefined
  ) => {
    setHeaderParams();
    if (httpMethod == "GET") {
      return axios.get(url, { params: data }).then(
        (success) => Promise.resolve(success),
        (error) => Promise.reject(error)
      );
    } else if (httpMethod == "DELETE") {
      return axios.delete(url, { data }).then(
        (success) => Promise.resolve(success),
        (error) => Promise.reject(error)
      );
    } else if (httpMethod == "POST" && responseType != "formData") {
      return axios.post(url, data).then(
        (success) => Promise.resolve(success),
        (error) => Promise.reject(error)
      );
    } else if (httpMethod == "POST" && responseType == "formData") {
      return axios
        .post(url, data, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then(
          (success) => Promise.resolve(success),
          (error) => Promise.reject(error)
        );
    } else if (httpMethod == "PUT") {
      return axios.put(url, data).then(
        (success) => Promise.resolve(success),
        (error) => Promise.reject(error)
      );
    }
  },
  getBaseUrl: () => {
    if(window.location.hostname == "localhost") {
      return "https://platform.dev.hireplusplus.com"
    } else {
      return window.location.origin
    }
  }
};

export default WebUtils;
