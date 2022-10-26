import { notification } from "antd"
import { useEffect, useState } from "react"
import Fields from "./Fields"
import _ from "underscore"
import Utils from '../../Utils';
import Icon from "../Icons";
import { message as messageF } from 'antd';
import "../../styles/form.css";

function FormComponent(props) {
    const { config, reset, title, recaptcha, width, message, preFilledData, disabled, id, footer } = props;
    const [components, setComponents] = useState([])
    const [formTitle, setTitle] = useState(title)
    let template = props.template || config.template;
    let [passwordMessage, setPasswordMessage] = useState(null)

    useEffect(() => {
        if(config && config.length){
            setComponents(config)
        } else if(config && typeof config =="object" && !config.length) {
            let initialDisabled = config.initial_disabled;
            let sortOrder = _.keys(Utils.sortOrder(config._order))
            let componentList = [];
            _.map(sortOrder, order => {
                let value = config[order].value
                if(preFilledData && preFilledData[order]) {
                    value = preFilledData[order]
                } else if(config[order].default && !value) {
                    let defaultOrder = _.keys(Utils.sortOrder(config[order].default._order))
                    if(defaultOrder){
                        value = defaultOrder[0]
                    }
                }
                componentList.push({
                    id: order,
                   ...config[order],
                   disabled: disabled,
                   value: value,
                   disabled: initialDisabled
                })
            })
            if(config.title) {
                if(typeof config.title == "object") {
                    setTitle(config.title)
                } else if(typeof config.title == "string") {
                    setTitle([config.title] )
                }
            } 
            setComponents(componentList)
        }
    },[disabled, config])

    const onChange = (key, e) => {
        const { on_change } = config;
        const { onChange, id } = props
        let fieldIndex = _.findIndex(components, r => r.key === key)
        if(fieldIndex !== -1) {
            let modComponent = [...components]
            modComponent[fieldIndex].value = e.target.value
            modComponent[fieldIndex].validated = true
           setComponents(modComponent)
           if(on_change && onChange) {
                onChange({key: key, value: modComponent[fieldIndex].value, id: id})
           }
        }
    }

    const onSearch = () => {
        
    }

    const onSelect = (key, value) => {
        const { on_change } = config;
        const { onChange, id } = props
        let fieldIndex = _.findIndex(components, r => r.key === key)
        if(fieldIndex !== -1) {
            let modComponent = [...components]
            modComponent[fieldIndex].value = value
            modComponent[fieldIndex].validated = true
           setComponents(modComponent)
           if(on_change && onChange) {
                onChange({key: key, value: modComponent[fieldIndex].value, id: id})
           }
        }
    }

    const onMultiSelect = () => {

    }

    const onDateSelect = (key,value) => {
        const { on_change } = config;
        const { onChange, id } = props
        let fieldIndex = _.findIndex(components, r => r.key === key)
        if(fieldIndex !== -1) {
            let modComponent = [...components]
            modComponent[fieldIndex].value = value
            modComponent[fieldIndex].validated = true
           setComponents(modComponent)
           if(on_change && onChange) {
                onChange({key: key, value: modComponent[fieldIndex].value, id: id})
           }
        }
    }

    const getData = () => {

    }

    const onFocus = (component) => {

    }

    const getFormData = () => {
        let formData = {}
        _.map(components, r => {
            if(r.type !== "button") {
                formData = {...formData, [r.key]: r.value}
            }
        })
        return formData
    }

    const validateForm = () => {
        let modComponent = []
        let result = true
        let passwordDontMatch = null
        _.map(components, r => {
           if(r.type !== "button") {
            //validation_rule:"select-all"
            let validated = (r.required) ? r.value !== undefined && r.value !== null && r.value !== "" ? true : false : true
            if(r.validation_rule && r.validation_rule.includes("select-all")) {
                let allOption = _.keys(r.option._order)
                validated = allOption && r.value && allOption.length === r.value.length ? true : false
            }
            if(r.key=="password" && r.required) {
                let confirmPassword = _.find(components, rec => rec.key == "confirm_password")
                if(confirmPassword &&r.value && confirmPassword.value !== r.value) {
                    validated = false
                    passwordDontMatch =  "Password don't match"
                } else if(confirmPassword && r.value && confirmPassword.value == r.value) {
                   if(r.value.length < 8){
                    passwordDontMatch = 'Password is less than 8 characters' 
                    validated=false
                   } else {
                    passwordDontMatch = null 
                    validated=true
                   }
                }
            }
            modComponent.push({
                ...r,
                validated: validated
            })
            if(result) {
                result =  validated
            }
           } else if(r.type  ===  "button") {
                modComponent.push({
                    ...r,
                    validated: true
                })
           }
        })
        setPasswordMessage(passwordDontMatch)
        setComponents(modComponent) 
        return result;
    }

    const onSubmit = (submitConfig) => {
        const {onSubmit} = props;
        let formValidated = validateForm()
        if(onSubmit && !submitConfig.api && formValidated) {
            let formData = getFormData()
            onSubmit(formData)
        } else {

        }
    }

    const onReset = () => {
        let modComponent = []
        _.map(components, r => {
            delete r.value
            modComponent.push(r) 
        })
        setComponents(modComponent) 
    }

    const getFileSize = (file) => {
        let fSExt = new Array('Bytes', 'KB', 'MB', 'GB');
        let sizeinbytes = file.size; 
        let fSize = sizeinbytes
        let counter=0;
        while(fSize > 900) {
            fSize/=1024;counter++;
        }
        return (Math.round(fSize*100)/100) + ' ' + fSExt[counter]
    }

    const fileHandler = (key, info, multiple) => {
        let fileSize = getFileSize(info.current.files[0])
        const { on_change } = config;
        const { onChange, id } = props
        let fieldIndex = _.findIndex(components, r => r.key === key)
        if(fieldIndex !== -1) {
            let modComponent = [...components]
            if(!modComponent[fieldIndex].file_size || (modComponent[fieldIndex].file_size  && (info.current.files[0].size/1024) < modComponent[fieldIndex].file_size)) {
                if(multiple) {
                    if(modComponent[fieldIndex].value) {
                        if(typeof modComponent[fieldIndex].value == "string") {
                            modComponent[fieldIndex].value = [modComponent[fieldIndex].value]
                            modComponent[fieldIndex].value.push(info.current.files[0]);
                        } else {
                            modComponent[fieldIndex].value = [...modComponent[fieldIndex].value, ...info.current.files];
                        }
                    } else {
                        modComponent[fieldIndex].value = info.current.files;
                    }
                } else {
                    modComponent[fieldIndex].value = info.current.files;
                }
                modComponent[fieldIndex].fileSize = fileSize;
                modComponent[fieldIndex].validated = true;
                setComponents(modComponent)
                if(on_change && onChange) {
                    onChange({key: key, value: modComponent[fieldIndex].value, id: id});
                }
                messageF.success(`${info.current.files[0].name} file uploaded successfully`);
            } else {
                messageF.error(`${info.current.files[0].name} file size is more than 500kb`);
            }
        }
    }

    const removeValueHander = (key, index) => {
        const { on_change } = config;
        const { onChange, id } = props
        let fieldIndex = _.findIndex(components, r => r.key === key)
        if(fieldIndex !== -1) {
            let modComponent = [...components]
            if(typeof modComponent[fieldIndex].value =="object" &&  modComponent[fieldIndex].value.length) {
                let val = [...modComponent[fieldIndex].value]
                val.splice(index,1)
                if(val.length==0) {
                    val = null
                }
                modComponent[fieldIndex].value=val
            } else {
                modComponent[fieldIndex].value = null;
            }
            setComponents(modComponent)
            if(on_change && onChange) {
                onChange({key: key, value: modComponent[fieldIndex].value, id: id})
           }
        }
    }

    let exStyles = {}
    if(config.style) {
        exStyles = { ...config.style }
    }

    const onreChange = (key,value) => {
        const { on_change } = config;
        const { onChange, id } = props
        let fieldIndex = _.findIndex(components, r => r.key === key)
        if(fieldIndex !== -1) {
            let modComponent = [...components]
            modComponent[fieldIndex].value = value
            modComponent[fieldIndex].validated = true
           setComponents(modComponent)
           if(on_change && onChange) {
                onChange({key: key, value: modComponent[fieldIndex].value, id: id})
           }
        }
    }
    return (

        <form className="form-component" onSubmit={onSubmit} data-template={template||"default-template"} style={{width: width || config.width || "100%", ...exStyles}}>
            {
                formTitle != undefined && (
                    <div className="form-title"> 
                    {
                        _.map(formTitle, text => <div>{text}</div>)
                    }
                    </div>
                )
            }
           <div className="form-body-wrapper">
           {
                _.map(components, component => {
                    return (
                        <Fields
                            onChange={onChange}
                            onSelect={onSelect}
                            onMultiSelect={onMultiSelect}
                            onDateSelect={onDateSelect}
                            onSearch={onSearch}
                            config={component}
                            onSubmit={onSubmit}
                            validated={component.validated}
                            onFocus={onFocus}
                            removeValueHander={removeValueHander}
                        />
                    )
                })
            }
           </div>
            {reset && <button onClick={onReset}>Reset</button>}
            {message}
            <div style={{textAlign:"center", color:"red"}}>{passwordMessage}</div>
            {footer}
        </form>
    )
}
export default FormComponent;