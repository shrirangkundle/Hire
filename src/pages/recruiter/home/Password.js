import FormComponent from "../../../components/form";

function Password(props) {
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
            "flex": true,
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
        "_order": {
            "Current password": 1,
            "New password":2,
            "Confirm new password": 3
        },
        "Current password": {
            "type": "password",
            "placeholder": "Type here",
            "width":"100%",
            "key": "Current password",
            "label": "Current password",
            "flex": true,
            "required": true
        },
        "New password": {
            "type": "password",
            "placeholder": "Type here",
            "width":"100%",
            "key": "New password",
            "label": "New password",
             "flex": true,
            "required": true,
            "footer": "Your new password must be more than 8 characters."
        },
        "Confirm new password": {
            "type": "password",
            "placeholder": "Type here",
            "width":"100%",
            "key": "Confirm new password",
            "label": "Confirm new password",
             "flex": true,
            "required": true
        }
    }
    return (
        <div className="password-tab-wrapper">
            <div className="password-tab-left-section">
                <div className="title">Personal info</div>
                <div className="secondary-line">Update your photo and personal details.</div>
           </div>
           <div  className="password-tab-right-section">
                <FormComponent config={config2}/>
           </div>
        </div>
    )
}
export default Password;