//dev

import WebUtils from "../../WebUtils";

let baseUrl = WebUtils.getBaseUrl();
//prod
const hirePPBaseURl = baseUrl + "/accountmanager/api/v1";

//dev
// const hirePPBaseURl = "http://localhost:8083/api/v1";

export default hirePPBaseURl;
