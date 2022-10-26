import FormComponent from "../../../components/form";

function Profile(props) {
    let { isEditable } = props;
    let  config = {
        "initial_disabled": !isEditable,
        // "title":"Company Profile",
        "_order": {"First Name": 1, "Last Name": 2,"Company Name": 3,"Company Website":  4, "Email ID": 4,"Phone Number": 5, "Linkedin Profile": 6},
        "First Name":{
            "type": "text",
            "placeholder": "Type here",
            "width":"49%",
            "key": "First Name",
            "label": "First Name",
            "flex": false,
            "required": true
        },
        "Last Name":{
            "type": "text",
            "placeholder": "Type here",
            "width":"49%",
            "key": "Last Name",
            "label": "Last Name",
            "flex": false,
            "required": true
        },
        "Company Name":{
            "type": "text",
            "placeholder": "Type here",
            "width":"49%",
            "key": "Company Name",
            "label": "Company Name",
            "flex": false,
            "required": true
        },
        "Company Website": {
            "type": "text",
            "placeholder": "Type here",
            "width":"49%",
            "key": "Company Website",
            "label": "Company Website",
            "flex": false,
            "required": true
        },
        "Email ID":{
            "type": "text",
            "placeholder": "Type here",
            "width":"49%",
            "key": "Email ID",
            "label": "Email ID",
            "flex": false,
            "required": true
        },
        "Phone Number":{
            "type": "text",
            "placeholder": "Type here",
            "width":"49%",
            "key": "Phone Number",
            "label": "Phone Number",
            "flex": false,
            "required": true
        },
        "Linkedin Profile":{
            "type": "text",
            "placeholder": "Type here",
            "width":"100%",
            "key": "Linkedin Profile",
            "label": "Linkedin Profile",
            "flex": false,
            "required": false
        },
        "description":{
            "type": "text",
            "placeholder": "Type here",
            "width":"100%",
            "key": "description",
            "label": "Description",
            "flex": false,
            "required": true
        }
    }
    let config2 = {
        "initial_disabled": !isEditable,
        // "title":"Company Profile",
        "_order": {"I m only hiring for my Organisation": 1, "I m also open for freelance hiriring assignemnets as an individual": 2,"Timezone": 3,"Country":  4},
        "I m only hiring for my Organisation":{
            "type": "switch",
            // "placeholder": "Type here",
            "width":"100%",
            "key": "I m only hiring for my Organisation",
            "display": "I m only hiring for my Organisation",
            "flex": false,
            "required": false
        },
        "I m also open for freelance hiriring assignemnets as an individual":{
            "type": "switch",
            // "placeholder": "Type here",
            "width":"100%",
            "key": "II’m also open for freelance hiriring assignemnets as an individual",
            "display": "II’m also open for freelance hiriring assignemnets as an individual",
            "flex": false,
            "required": false
        },
        "Timezone":{
            "type": "text",
            "placeholder": "Type here",
            "width":"100%",
            "key": "Timezone",
            "label": "Timezone",
            "flex": false,
            "required": true
        },
        "Country":{
            "type": "text",
            "placeholder": "Type here",
            "width":"100%",
            "key": "Country",
            "label": "Country",
            "flex": false,
            "required": true
        },
        "Company Website": {
            "type": "text",
            "placeholder": "Type here",
            "width":"49%",
            "key": "Company Website",
            "label": "Company Website",
            "flex": false,
            "required": true
        },
        "Email ID":{
            "type": "text",
            "placeholder": "Type here",
            "width":"49%",
            "key": "Email ID",
            "label": "Email ID",
            "flex": false,
            "required": true
        },
        "Phone Number":{
            "type": "text",
            "placeholder": "Type here",
            "width":"49%",
            "key": "Phone Number",
            "label": "Phone Number",
            "flex": false,
            "required": true
        },
        "Linkedin Profile":{
            "type": "text",
            "placeholder": "Type here",
            "width":"100%",
            "key": "Linkedin Profile",
            "label": "Linkedin Profile",
            "flex": false,
            "required": false
        },
        "description":{
            "type": "text",
            "placeholder": "Type here",
            "width":"100%",
            "key": "description",
            "label": "Description",
            "flex": false,
            "required": true
        }
    }
    return (
        <div className="profile-tab-wrapper">
            <div className="profile-tab-left-section">
                <div className="title">Personal info</div>
                <div className="secondary-line">Update your photo and personal details.</div>
           </div>
           <div  className="profile-tab-right-section">
                <FormComponent config={config}/>
           </div>
           <div className="profile-tab-left-section" style={{paddingTop: 30, borderTop: "1px  solid #EAECF0"}}>
                <div className="title">Activity on Hire++</div>
                <div className="secondary-line">Please update your availaibility and Timezone.</div>
           </div>
           <div  className="profile-tab-right-section" style={{paddingTop: 30, borderTop: "1px  solid #EAECF0"}}>
                <FormComponent config={config2}/>
           </div>
        </div>
    )
}
export default Profile;