import { useState } from "react";
import Sidebar from "../../components/SideBar";
import "../../styles/recruiter.css";
import "../../styles/tabs.css";
import "../../styles/profile.css";
import "../../styles/passwordTabs.css";
import "../../styles/teamTab.css";
import 'antd/dist/antd.css';
import TopBar from "../../components/TopBar";
import RecruiterHome from "./home";
import { useParams } from "react-router-dom";
import RecruiterScheduler from "./scheduler";
import Candidate from "./scheduler/Candidate";
import Admin from "./scheduler/Admin";
import Dashboard from "./dashboard";

function RecruiterPage(props) {

    const [toggleStatus, setSidebarSatus] = useState("right")
    let curPage = null
    const handleToggle = () => {
      if(toggleStatus == "left") {
        setSidebarSatus("right")
      } else {
        setSidebarSatus("left")
      }
    }
    let params = useParams()
    if(params && params.page) {
      curPage = params.page
    }
    console.log("useLocation", useParams())
    return (
      <div className="recuiter-profile-page">
            <Sidebar toggleStatus={toggleStatus} toggleHandle={handleToggle} activePage={curPage} role="RECRUITER"/>
            <div style={{width: toggleStatus == "left"? "100%": "85%", height:"100vh", overflowY: "auto", transition:"all 0.3s"}}>
              <TopBar curPage={curPage}/>
                {
                  curPage === "home" &&
                  <RecruiterHome/>
                }
                {
                  curPage === "scheduler" &&
                  <RecruiterScheduler />
                }
                {
                  curPage === "candidate" &&
                  <Candidate />
                }
                {
                  curPage === "admin" &&
                  <Admin />
                }
                {
                  curPage === "dashboard" &&
                  <Dashboard />
                }
            </div>
      </div>
    )
}
export default RecruiterPage;