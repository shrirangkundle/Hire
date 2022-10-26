import WebUtils from "../../WebUtils";

// //prod
let baseUrl = WebUtils.getBaseUrl();
const hirePPBaseURl = baseUrl + "/aimatcher/api/v1";

//dev
// const hirePPBaseURl = "http://localhost:8086/api/v1";

export default hirePPBaseURl;
