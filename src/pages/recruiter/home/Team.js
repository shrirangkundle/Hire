import {Fragment, useState} from "react"
import Card from "../../../components/Card";
import TableComponent from "../../../components/Table";
import FormComponent  from "../../../components/form";
import { Modal } from 'antd'
import Icon from "../../../components/Icons";

function Team(params) {
    const [modalContent, setModalContent] = useState({show: false, content: {}})

    const showModal = (content) => {
        setModalContent({show: true, content: content});
    };
    
    const handleOk = () => {
        setModalContent({show: false, content: {}});
    };
    
    const handleCancel = () => {
        setModalContent({show: false, content: {}});
    };
    const createNewTeamConfig = {
        "title":"Create New Team",
        "desc": "Your new project has been created. Invite colleagues to collaborate on this project.",
        "okText":"Create team",
        "icon": <Icon width={48} height={48} type="replicate-user"/>,
        "formConfig":{
            "_order":{ "Email address":  1},
            "Email address":{
                "type": "text",
                "placeholder": "you@untitledui.com",
                "width":"100%",
                "key": "Email address",
                "label": "Email address",
                "flex": false,
                "required": true,
                "icon": "email"
            }
        }
    }
    const addTeamMemberConfig = {
        "title":"Add Team Member",
        "desc": "Your new project has been created. Invite colleagues to collaborate on this project.",
        "okText":"Add member",
        "icon": <Icon width={48} height={48} type="add-user"/>,
        "formConfig":{
            "_order":{ "First Name":  1, "Last Name": 2, "Email ID": 3 ,  "Phone Number": 4},
            "First Name":{
                "type": "text",
                // "placeholder": "Type here",
                "width":"100%",
                "key": "First Name",
                "label": "First Name",
                "flex": false,
                "required": true
            },
            "Last Name":{
                "type": "text",
                // "placeholder": "Type here",
                "width":"100%",
                "key": "Last Name",
                "label": "Last Name",
                "flex": false,
                "required": true
            },
            "Email ID":{
                "type": "text",
                "placeholder": "you@untitledui.com",
                "width":"100%",
                "key": "Email ID",
                "label": "Email ID",
                "flex": false,
                "required": true,
                "icon": "email"
            },
            "Phone Number":{
                "type": "text",
                // "placeholder": "you@untitledui.com",
                "width":"100%",
                "key": "Phone Number",
                "label": "Phone Number",
                "flex": false,
                "required": true,
            }
        }
    }

   
    
    return (
        <div className="team-tap-wrapper">

            <div className="team-tap-section">
                <div className="team-tap-left-section">
                    <div className="team-title">Teams</div>
                    <div className="secondary-text">You are on the following Accounts & Teams. You can create/ edit a new team.</div>
                </div>
                <div className="team-tap-right-section">
                    <button className={"cancle-button"} onClick={() => showModal(createNewTeamConfig)}>
                        Create new team
                    </button>
                    <button className="primary-button" onClick={() => showModal(addTeamMemberConfig)}>
                        Add team member
                    </button>
                    <Modal 
                        className="create-new-popup"
                        style={{ top: 20 }}
                        title={
                           <Fragment>
                               {modalContent.content.icon}
                               <div className="modal-title">{modalContent.content.title}</div>
                               <div className="modal-desc"> {modalContent.content.desc}</div>
                           </Fragment>
                        } 
                        visible={modalContent.show} 
                        onOk={handleOk} 
                        okText={modalContent.content.okText } 
                        onCancel={handleCancel}
                    >
                        <FormComponent  config={modalContent.content.formConfig} />
                    </Modal>
                </div>
            </div>

            <div className="team-tap-section">
                <div className="team-tap-left-section">
                    <div className="team-title">Added by You</div>
                    <div className="secondary-text">Lorem Ipsum.</div>
                </div>
                <div className="team-tap-right-section">
                   <Card limit={3} />
                </div>
            </div>

            <div className="team-tap-section">
                <div className="team-tap-left-section">
                    <div className="team-title">On Teams</div>
                    <div className="secondary-text">You are currently Assigned these Accounts.</div>
                </div>
                <div className="team-tap-right-section">
                   <Card  removeText={"Leave"}/>
                </div>
            </div>

            <div className="team-tap-section">
                <div className="team-tap-left-section">
                    <div className="team-title">Admin Users</div>
                    <div className="secondary-text">Admins can add and remove users and manageorganization-level settings.</div>
                </div>
                <div className="team-tap-right-section">
                    <TableComponent  id={"user-table"}/>
                </div>
            </div>

            <div className="team-tap-section">
                <div className="team-tap-left-section">
                    <div className="team-title">Account Users</div>
                    <div className="secondary-text">Account users can assess and review jobs, candidates, schedule interviews and download candidate reports.</div>
                </div>
                <div className="team-tap-right-section">
                    <TableComponent id={"user-table"} />
                </div>
            </div>

        </div>
    )
}
export default Team;