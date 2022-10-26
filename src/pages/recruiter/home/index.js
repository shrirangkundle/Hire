import { Fragment, useState } from "react";
import ProfileSection from "./ProfileSection";
import Tabs from "../../../components/Tabs";
import Profile from "./Profile";
import Incentive from "./Incentive";
import Password from "./Password";
import Team from "./Team";

function RecruiterHome(props) {
    const [activeTab, setActiveTab] = useState("profile")
    const [isEditable, setIsEditable] = useState(false)

    const onChange = (value) => {
        setActiveTab(value)
        setIsEditable(false)
    }
    
    const tabConfig = [
      {
        display:"Profile",
        key:"profile"
      },
      {
        display:"Password",
        key:"password"
      },
      {
        display:"Team",
        key:"team"
      },
      {
        display:"Incentives & Payments",
        key: "incentives_payments"
      }
    ]

    return (
        <Fragment>
            <ProfileSection isEditable={isEditable} onChange={(value) => setIsEditable(value)}/>
              <Tabs onChange={onChange} config={tabConfig} activeTab={activeTab}/>
                {
                    activeTab == "profile" && 
                    <Profile isEditable={isEditable} />
                }
                {
                    activeTab == "password" && 
                    <Password  isEditable={isEditable}/>
                }
                {
                    activeTab == "team" && 
                    <Team isEditable={isEditable}/>
                }
                {
                    activeTab == "incentives_payments" && 
                    <Incentive isEditable={isEditable}/>
                }
        </Fragment>
    )
}
export default RecruiterHome;