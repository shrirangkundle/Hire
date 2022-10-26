import React, { Fragment, useRef, useState } from 'react';
import { Button, Input,Checkbox, Modal,DatePicker, Radio, Switch, Select } from 'antd';
import { EyeInvisibleOutlined, EyeTwoTone } from '@ant-design/icons';
import Icon from '../Icons';
import _ from "underscore"
import Utils from '../../Utils';
const { TextArea } = Input;
const { Option } = Select;  

function FieldWrapper(props) {
    const {validated, config} = props
    return (
        <div className='field' data-key={config.key} data-validated={validated} type={config.type} data-template={config.template} style={{display: config.flex ? "flex" : "block", width: config.width || "100%"}}>
            {config.label &&
                <div className='field-label'>
                    {config.label_icon && <Icon type={config.label_icon} width={15} height={15}/>}
                    {config.label}
                    {config.required?<span style={{color:"red", marginLeft: 4}}>*</span> : null}
                </div>
            }
            {props.children}
            <div className='field-footer'>{config.fieldFooter}</div>
        </div>
    )
}

function Fields(props) {
    const { config,  onChange, onSearch, onSelect, onMultiSelect, onDateSelect, onSubmit, validated, onFocus, fileHandler, removeValueHander, onreChange } = props;
    let fieldToRender=<div>Field</div>

    switch (config.type) {
        case "text":
            fieldToRender =  (
                <FieldWrapper config={config} validated={validated}>
                    <Input disabled={config.disabled} key={config.key} value={config.value} placeholder={config.placeholder} prefix={typeof config.icon == "string" ? <Icon type={config.icon} width={15} height={15} /> : config.icon } onChange={(e) => onChange(config.key, e)}/>
                </FieldWrapper>
            )
            break;
        case "radio":
            let sortedOrder =  config.option ? _.keys(Utils.sortOrder(config.option._order)) : []
            fieldToRender =  (
                <FieldWrapper config={config} validated={validated}>
                    <Radio.Group disabled={config.disabled} key={config.key} value={config.value} onChange={(e) => onChange(config.key,e)}>
                        {
                            _.map(sortedOrder, order => <Radio value={order}>{config.option[order].display}</Radio> )
                        }
                    </Radio.Group>
                </FieldWrapper>
            )
            break;
        case "text-area":
            fieldToRender =  (
                <FieldWrapper config={config} validated={validated}>
                    <TextArea rows={4} disabled={config.disabled} key={config.key} value={config.value} placeholder={config.placeholder}  maxLength={6} prefix={config.icon} onChange={(e) => onChange(config.key, e)} />
                </FieldWrapper>
            )
            break;
        case "password":
            fieldToRender = (
                <FieldWrapper config={config} validated={validated}>
                     <Input.Password  disabled={config.disabled} key={config.key} value={config.value} placeholder={config.placeholder} prefix={config.icon} onChange={(e) => onChange(config.key, e)} iconRender={visible => (visible ? <EyeTwoTone /> : <EyeInvisibleOutlined />)}/>
                </FieldWrapper>
            ) 
            break;
        case "date":
                fieldToRender = (
                    <FieldWrapper config={config} validated={validated}>
                         <DatePicker getPopupContainer={triggerNode => triggerNode.parentNode} disabled={config.disabled} key={config.key} value={config.value} onChange={(value) => onDateSelect(config.key, value) }/>
                    </FieldWrapper>
                )
                break;
        case "dropdown":
            let options = _.keys(Utils.sortOrder(config.options._order))
            let selectKey = config.options.key
            fieldToRender =  (
                <FieldWrapper config={config} validated={validated}>
                       <Select
                            disabled={config.disabled} 
                            key={config.key} 
                            value={config.value} 
                            placeholder={config.placeholder} 
                            onChange={(value) => onSelect(selectKey,value)}
                            style={{width:"100%"}}
                        >
                            {
                                _.map(options, o =>  <Option value={o}>{config.options[o].display}</Option>)
                            }
                        </Select>
                </FieldWrapper>
            )
            break;
        case "checkbox":
            const checkboxOptions = [];
            let sortedOptions =  config.option ? _.keys(Utils.sortOrder(config.option._order)) : []
            _.map(sortedOptions, o => {
                checkboxOptions.push(
                    { label: config.option[o] ? config.option[o].display: o, value: o},
                )
            })
            fieldToRender = (
                <FieldWrapper config={config} validated={validated}>
                        <Checkbox.Group options={checkboxOptions} onChange={(value) => onSelect(config.key, value)} />
                </FieldWrapper>  
            )
            break;
        case "switch":
            fieldToRender = (
                <FieldWrapper config={config} validated={validated}>
                   <Fragment>
                   <Switch disabled={config.disabled}  checked={config.value} onChange={(value) => onSelect(config.key, value)}  />
                    <span className='switch-display'>{config.display}</span>
                   </Fragment>
                </FieldWrapper>   
            )
            break;
        case "button":
            fieldToRender = (
                <div className='field' type={config.type} >
                    <button className={config.className||""} type="submit" button-type={config.button_type} onClick={(e) => {e.preventDefault(); onSubmit(config)}}>{config.display}</button>
                </div>
            )
            break;
        default:
            break;
    }
    return (
        fieldToRender
    )
}

export default Fields