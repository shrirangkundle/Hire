import WebUtils from "../../WebUtils";

//prod
let baseUrl = WebUtils.getBaseUrl();
const hirePPBaseURl = baseUrl + "/interview/api/v1";

//dev
// const hirePPBaseURl = "http://localhost:8087/interview/api/v1";

export default hirePPBaseURl;
