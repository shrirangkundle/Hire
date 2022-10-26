import WebUtils from "../../WebUtils"

// let baseUrl = "https://platform.dev.hireplusplus.com"
let baseUrl = WebUtils.getBaseUrl()
//let baseUrl = "http://20.241.180.161:8085"
export default {
    GET_PANELIST_OPEN_SLOT: baseUrl+"/scheduler/api/v1/slot/panelist/get",
    POST_PANELIST_OPEN_SLOT: baseUrl+"/scheduler/api/v1/slot/panelist/open",
    CONFIRM_PANELIST_SLOT: baseUrl+"/scheduler/api/v1/slot/panelist/accept",
    CANCEL_PANELIST_SLOT: baseUrl+"/scheduler/api/v1/slot/cancel",

    GET_CANDIDATE_SLOTS: baseUrl+"/scheduler/api/v1/slot/candidate/get",
    BOOK_CANDIDATE_SLOTS: baseUrl+"/scheduler/api/v1/slot/candidate/book",

    POST_ADMIN_OPEN_SLOT: baseUrl+"/scheduler/api/v1/slot/admin",
    GET_PANELISTS: baseUrl+"/aimatcher/api/v1/panelist/matchPanelistsForJd",
    GET_USER_DETAIL: baseUrl + "/accountmanager/api/v1/account/getUserDetails/"
}  