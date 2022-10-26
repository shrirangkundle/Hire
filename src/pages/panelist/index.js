
import { useState } from "react";
import Sidebar from "../../components/SideBar";
import 'antd/dist/antd.css';
import TopBar from "../../components/TopBar";
import { useParams } from "react-router-dom";
import Dashboard from "./dashboard"
import Schedular from "./scheduler"

function CandidatePage(props) {

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
    let views = [
        {
          display: "Home",
          key: "home",
          path: "/panelist/home",
          // path: "/recuiter/home"
        },
        {
          display: "Jobs",
          key: "job",
          path: "/panelist/jobs",
        },
        {
          display: "Calendar",
          key: "scheduler",
          path: "/panelist/scheduler",
        },
        {
          display: "Reports",
          key: "reports",
          path: "/panelist/reports",
        },
        {
          display: "Rewards",
          key: "rewards",
          path: "/panelist/rewards",
        },
    ];
    return (
      <div className="recuiter-profile-page">
            <Sidebar toggleStatus={toggleStatus} toggleHandle={handleToggle} activePage={curPage} views={views}/>
            <div style={{width: toggleStatus == "left"? "100%": "85%", height:"100vh", overflowY: "auto", transition:"all 0.3s"}}>
              <TopBar curPage={curPage}/>
              {
                curPage === "home" &&
                <Dashboard />
              }
              {
                curPage === "scheduler" &&
                <Schedular />
              }
            </div>
      </div>
    )
}
export default CandidatePage;