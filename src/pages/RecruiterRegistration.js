import { useState } from "react"
import {notification} from "antd"
import FormComponent from "../components/form"
import Icon from "../components/Icons"
import { useNavigate } from "react-router-dom"
import Lottie from "react-lottie";
import registrationLottie from "../assets/registrationLottie/registrationLottie.json";
import _ from "underscore"
import WebUtils from "../WebUtils"
import AppAPIs from "../APIs/AppAPIs"

const registrationLottieFile = {
  loop: true,
  autoplay: true,
  animationData: registrationLottie,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function CandidateRegistration(props) {
    const [message, setMessage] = useState(null)
    const navigate = useNavigate()
    let config = {
        title:["Register","Start your 60-day free trial."],
        _order: {firstName:1,lastName: 2,contactNumber: 3, email: 4,password: 5,confirm_password: 6,submit: 7},
        firstName:{
            type:"text",
            label:"First Name",
            key:"firstName",
            required: true,
            width:"48%",
            placeholder:"Enter your First Name"
        },
        lastName: {
            type:"text",
            label:"Last Name",
            key:"lastName",
            width:"50%",
            required: true,
            placeholder:"Enter your Last Name"
        },
        contactNumber: {
            type:"text",
            label:"Phone Number",
            key:"contactNumber",
            width:"100%",
            required: true,
            placeholder:"Enter your Phone Number"
        },
        email: {
            type:"text",
            label:"Email",
            key:"email",
            required: true,
            placeholder:"Enter your email"
        },
        password:{
            type:"password",
            label:"Password",
            key:"password",
            required: true,
            placeholder:"Enter your password",
            fieldFooter:"Must be at least 8 characters."
        },
        confirm_password:{
            type:"password",
            label:"Confirm Password",
            key:"confirm_password",
            required: true,
            placeholder:"Enter your password"
        },
        email:{
            type:"text",
            label:"Email",
            key:"email",
            required: true,
            placeholder:"Enter your email"
        },
        // userRole:{
        //     type:"dropdown",
        //     label:"User Type",
        //     key:"userRole",
        //     width:"100%",
        //     required: true, 
        //     placeholder:"I want to get job offers",
        //     options: {
        //         key:"userRole",
        //         _order: {
        //             "HIRING MANAGER": 1,
        //             "RECRUITER": 2,
        //             "CANDIDATE": 3,
        //             "PANELIST": 4
        //         },
        //         "HIRING MANAGER": {
        //             display:"Hiring Manager"
        //         },
        //         "RECRUITER": {
        //             display:"Recruiter"
        //         },
        //         "CANDIDATE": {
        //             display:"Candidate"
        //         },
        //         "PANELIST": {
        //             display:"Panelist"
        //         }
        //     }
        // },
        submit:{
            type:"button",
            display:"Create account",
            button_type: "primary",
            className:"primary-button"
        }
    }
    const submitHandler = (data) => {
        if(data){
            setMessage(<div>Please Wait.</div>)
            let formData = {};
            _.map(data,(value, key) => {
                if(key != "confirm_password") {
                    if(key == "email" || key == "password"){
                        formData = {
                            ...formData,
                            [key]: btoa(value)
                        }
                    } else {
                        formData = {
                            ...formData,
                            [key]: value
                        }
                    }
                    
                }
            })
            formData["userRole"]="RECRUITER"
            WebUtils.httpOperations(AppAPIs["REGISTER_USER"], formData, "POST").then(res => {
                if(res.data && res.data.resultStatusInfo && res.data.resultStatusInfo.resultCode == "SUCCESS") {
                    notification.open({
                        message: 'Registration Completed',
                        description: `Varification email  sent to ${data.email} Successfully.`,
                        icon: <Icon type="green-tick"/>
                    });
                    navigate("/login")
                } else if(res.data && res.data.resultStatusInfo){
                    setMessage(<div>{res.data.resultStatusInfo.message}</div>)
                }
            }, error => {
                setMessage(<div style={{textAlign:"center", color: "red"}}>{"Registration Failed."}</div>)
            }) 
            // WebUtils.httpOperations(AppAPIs["REGISTER_USER"], formData, "POST").then(res => {
            //     if(res.data && res.data.resultStatusInfo && res.data.resultStatusInfo.resultCode == "SUCCESS") {
            //         notification["success"]({
            //             message: res.data.resultStatusInfo.message
            //         });
            //     } else if(res.data && res.data.resultStatusInfo){
            //         notification["warning"]({
            //             message: res.data.resultStatusInfo.message
            //         });
            //     }
            // }, error => {
            //     if(error.data && error.data.resultStatusInfo) {
            //         notification["error"]({
            //             message: error.data.resultStatusInfo.message
            //         });
            //     } else {
            //         notification["error"]({
            //             message: "Failed"
            //         });
            //     }
            // })  
        }
    }
    return (
        <div className="registration-page">
        <div className="left-section">
            {/* <Lottie options={registrationLottieFile} height={"60%"} width={"60% "} /> */}
            {/* <Icon type={"candidate-svg"}/> */}
            <div className="image-wrapper" role={"RECRUITER"}></div>
            <div className="text-wrapper">
                <div className="title-1">
                    Connect best
                </div>
                <div className="title-2">
                    candidates with 
                </div>
                <div className="title-3">
                    amazing employers
                </div>
                {/* <div className="sub-title">
                    Save Wasted Effort, Costs and Time.
                </div> */}
                
                <div className="secondary-title-1">
                    Interview potential candidates and
                </div>
                <div className="secondary-title-2">
                    connect them with world-class       
                </div>
                <div className="secondary-title-3">
                    employers
                </div>
                </div>
                

        </div>
        <div className="right-section">
            <div className="logo-holder">
                <Icon type="hire-logo" width={180} height={60} />
            </div>
            <FormComponent 
                config={config}
                onSubmit={submitHandler}
                message={message}
                footer={<div style={{textAlign:"center", marginTop:10}}>Already have an account? <span style={{color:"#206EC7", cursor:"pointer"}} onClick={()=> navigate( `/login`)}>Login</span></div>}/>
        </div>
    </div>
    )
}
export default CandidateRegistration