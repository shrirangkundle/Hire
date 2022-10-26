import WebUtils from "../../WebUtils";

//prod
let baseUrl = WebUtils.getBaseUrl();
const hirePPBaseURl = baseUrl + "/scheduler/api/v1/";
//dev
// const hirePPBaseURl = "http://localhost:8085/api/v1/";

export default hirePPBaseURl;
