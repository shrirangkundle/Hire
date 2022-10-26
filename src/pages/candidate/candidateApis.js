import WebUtils from "../../WebUtils"

// let baseUrl = "https://platform.dev.hireplusplus.com"
let baseUrl =WebUtils.getBaseUrl()
//let baseUrl = "http://20.241.180.161:8085"
export default {
    CANCEL_PANELIST_SLOT: baseUrl+"/scheduler/api/v1/slot/cancel",
    GET_CANDIDATE_SLOTS: baseUrl+"/scheduler/api/v1/slot/candidate/get",
    BOOK_CANDIDATE_SLOTS: baseUrl+"/scheduler/api/v1/slot/candidate/book",
    GET_USER_DETAIL: baseUrl + "/accountmanager/api/v1/account/getUserDetails/"
}  