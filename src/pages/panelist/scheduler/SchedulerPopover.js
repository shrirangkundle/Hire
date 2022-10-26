import moment from "moment";
import { Fragment, useEffect, useRef, useState } from "react";
import _ from "underscore";
import { TimePicker, DatePicker, Select, Checkbox, Input, InputNumber} from 'antd';
import {ClockCircleOutlined} from "@ant-design/icons"
import Icon from "../../../components/Icons";

const { TextArea } = Input;
const { RangePicker } = TimePicker;
const { Option } = Select;

function SchedulerPopover(props) {
    const {data, template} = props;
    const popoverWrapper = useRef()
    const [formData, setFormData] = useState({
        date: data.date,
        slotStatus: data.slotStatus,
        startTime: data.startTime || {},
        endTime: data.endTime || {},
        description: data.description,
        recuring: "",
        extraInfor: data
    });

    const dateHandler = (value) => {
        let modFormData = {...formData}
        modFormData["date"] = moment(value).format("")
        setFormData(modFormData)
    }

    const timeHandler = (se, hm, value) => {
        let modFormData = {...formData}
        if(value && typeof value == "object") {
            modFormData = {
                ...modFormData,
                [se]:{
                    ...modFormData[se],
                    [hm]: Number(value.target.value)
                }
            }
        } else if(typeof value == "number") {
            modFormData = {
                ...modFormData,
                [se]:{ 
                    ...modFormData[se],
                    [hm]: value
                }
            }
        }
        setFormData(modFormData)
    }

    const changeHandle = (key, value) => {
        let modFormData = {...formData}
        modFormData = {
            ...modFormData,
            [key]: value.target.value
        }
        setFormData(modFormData)
    }

    const selectHandler = (value) =>{ 

    }

    const submitHandler = (operation) => {
        props.onSubmit({...formData, operation})
    }

    let title = ""
    
    if(template == "PANELIST") {
        if(!data.slotStatus) {
            title = "Slot Opening"
        } else if(data.slotStatus) {
            title = "Edit"
        }
    } else if(template == "CANDIDATE") {
        if(data.slotStatus) {
            title = "Interview for (Job Role)"
        }
        title = "Interview for (Job Role)"
    }
    let content = null
    if(template == "PANELIST" && !data.slotStatus)  {
        content = (
            <div className="scheduler-popover" >
                <div className="popover-title">
                    Slot Opening
                </div>
                <div className="label">
                    Date and time
                </div>
                <DatePicker 
                    getPopupContainer={triggerNode => triggerNode.parentNode} 
                    style={{width:"100%"}}
                    format="dddd, MMMM DD"
                    value={moment(data.date)} 
                    allowClear={false}
                    disabled={template == "CANDIDATE"}
                    // onChange={(value) => onDateSelect(config.key, value) }
                />
                <br/>
               <div className="time-wrapper">
                    <div className="start-section section">
                        <Input   disabled={template == "CANDIDATE"} className="input-field" size="small" value={formData.startTime.hr} onChange={(value) => timeHandler("startTime","hr", value)}/>
                        :
                        <InputNumber disabled={template == "CANDIDATE"} size="small" type={"number"} min={0} max={59} value={formData.startTime.mm} onChange={(value) => timeHandler("startTime","mm", value)}/>
                    </div>
                    <span className="seperator">-</span>
                    <div className="end-section section">
                        <Input disabled={template == "CANDIDATE"} className="input-field" size="small"value={formData.endTime.hr} onChange={(value) => timeHandler("endTime","hr", value)}/>
                        :
                        <InputNumber disabled={template == "CANDIDATE"} size="small" type={"number"} min={0} max={59} value={formData.endTime.mm} onChange={(value) => timeHandler("endTime","mm", value)}/>
                    </div>
                    <ClockCircleOutlined />
               </div>
                {
                    template == "PANELIST" && (
                        <Fragment>
                            <div  className="frequency">
                                <div className="label">
                                    Frequency
                                </div>
                                <Select
                                    showSearch={false}
                                    defaultValue="Does not repeat"
                                    optionFilterProp="children"
                                    style={{width:"100%"}}
                                    // onChange={onChange}
                                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                >
                                    <Option value="Does not repeat">Does not repeat</Option>
                                    <Option value="Daily">Daily</Option>
                                    <Option value="Weekdays (Monday to Friday)">Weekdays (Monday to Friday)</Option>
                                    <Option value="Weekly on Tuesday">Weekly on Tuesday</Option>
                                </Select>
                            </div>
                            <div className="all-day">
                                <Checkbox >All Day</Checkbox>
                            </div> 
                        </Fragment>
                    )
                }
                <div className="desctiption">
                    <div className="label">
                        Description
                    </div>
                    <TextArea
                        disabled={template == "CANDIDATE"} 
                        value={formData.description} 
                        rows={4} 
                        placeholder="Enter a description..." 
                        onChange={ (e) => changeHandle("description", e)}
                    />   
                </div>
                <div style={{display:"flex", justifyContent:"flex-end", marginTop: 15}}>
                    {/* <button className="cancle-button" onClick={()=>props.changeHoverState(data)}>Cancel</button> */}
                    <button className="primary-button" onClick={() => submitHandler("panelist-open")}>Submit</button>
                </div>
            </div>
        );
    } else if(template == "PANELIST" && data.slotStatus == "AVAILABLE")  {
        content = (
            <div className="scheduler-popover" >
                <div className="popover-title">
                    Edit
                </div>
                <div className="label">
                    Date and time
                </div>
                <DatePicker 
                    getPopupContainer={triggerNode => triggerNode.parentNode} 
                    style={{width:"100%"}}
                    format="dddd, MMMM DD"
                    value={moment(data.date)} 
                    allowClear={false}
                    disabled={template == "CANDIDATE"}
                    // onChange={(value) => onDateSelect(config.key, value) }
                />
                <br/>
               <div className="time-wrapper">
                    <div className="start-section section">
                        <Input   disabled={template == "CANDIDATE"} className="input-field" size="small" value={formData.startTime.hr} onChange={(value) => timeHandler("startTime","hr", value)}/>
                        :
                        <InputNumber disabled={template == "CANDIDATE"} size="small" type={"number"} min={0} max={59} value={formData.startTime.mm} onChange={(value) => timeHandler("startTime","mm", value)}/>
                    </div>
                    <span className="seperator">-</span>
                    <div className="end-section section">
                        <Input disabled={template == "CANDIDATE"} className="input-field" size="small"value={formData.endTime.hr} onChange={(value) => timeHandler("endTime","hr", value)}/>
                        :
                        <InputNumber disabled={template == "CANDIDATE"} size="small" type={"number"} min={0} max={59} value={formData.endTime.mm} onChange={(value) => timeHandler("endTime","mm", value)}/>
                    </div>
                    <ClockCircleOutlined />
               </div>
                {
                    template == "PANELIST" && (
                        <Fragment>
                            <div  className="frequency">
                                <div className="label">
                                    Frequency
                                </div>
                                <Select
                                    showSearch={false}
                                    defaultValue="Does not repeat"
                                    optionFilterProp="children"
                                    style={{width:"100%"}}
                                    // onChange={onChange}
                                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                >
                                    <Option value="Does not repeat">Does not repeat</Option>
                                    <Option value="Daily">Daily</Option>
                                    <Option value="Weekdays (Monday to Friday)">Weekdays (Monday to Friday)</Option>
                                    <Option value="Weekly on Tuesday">Weekly on Tuesday</Option>
                                </Select>
                            </div>
                            <div className="all-day">
                                <Checkbox >All Day</Checkbox>
                            </div> 
                        </Fragment>
                    )
                }
                <div className="desctiption">
                    <div className="label">
                        Description
                    </div>
                    <TextArea
                        disabled={template == "CANDIDATE"} 
                        value={formData.description} 
                        rows={4} 
                        placeholder="Enter a description..." 
                        onChange={ (e) => changeHandle("description", e)}
                    />   
                </div>
                <div style={{display:"flex", justifyContent:"flex-end", marginTop: 15}}>
                    {/* <button className="cancle-button" onClick={()=>props.changeHoverState(data)}>Cancel</button> */}
                    <button className="primary-button" onClick={submitHandler}>
                        {
                            template == "CANDIDATE" ? (
                                "Confirm"
                            ) : "Submit"
                        }
                        </button>
                </div>
            </div>
        );
    } else if(template == "PANELIST" && data.slotStatus == "BOOKED") {
        content =  <div className="scheduler-popover" >
        <div className="popover-title">
            Interview for - Front end developer
        </div>
        <div className="label">
            Date and time
        </div>
        <DatePicker 
            getPopupContainer={triggerNode => triggerNode.parentNode} 
            style={{width:"100%"}}
            format="dddd, MMMM DD"
            value={moment(data.date)} 
            allowClear={false}
            disabled={true}
            // onChange={(value) => onDateSelect(config.key, value) }
        />
        <br/>
       <div className="time-wrapper">
            <div className="start-section section">
                <Input   disabled={true} className="input-field" size="small" value={formData.startTime.hr} onChange={(value) => timeHandler("startTime","hr", value)}/>
                :
                <InputNumber disabled={true} size="small" type={"number"} min={0} max={59} value={formData.startTime.mm} onChange={(value) => timeHandler("startTime","mm", value)}/>
            </div>
            <span className="seperator">-</span>
            <div className="end-section section">
                <Input disabled={true} className="input-field" size="small"value={formData.endTime.hr} onChange={(value) => timeHandler("endTime","hr", value)}/>
                :
                <InputNumber disabled={true} size="small" type={"number"} min={0} max={59} value={formData.endTime.mm} onChange={(value) => timeHandler("endTime","mm", value)}/>
            </div>
            <ClockCircleOutlined />
       </div>
        <div className="desctiption">
            <div className="label">
                Description
            </div>
            <TextArea
                disabled={true} 
                value={formData.description} 
                rows={4} 
                placeholder="Enter a description..." 
                onChange={ (e) => changeHandle("description", e)}
            />   
        </div>
        <div style={{display:"flex", justifyContent:"flex-end", marginTop: 15}}>
            <button className="cancle-button"  onClick={() => submitHandler("panelist-cancel")}>Cancel</button>
            <button className="primary-button" onClick={() => submitHandler("panelist-accept")}>Accept</button>
        </div>
    </div>
    } else if(template == "PANELIST" && data.slotStatus == "ACCEPTED") {
        content =  (
        <div className="scheduler-popover" >
        <div className="popover-title">
            Interview for - Front end developer
        </div>
        <div className="label">
            Date and time
        </div>
        <DatePicker 
            getPopupContainer={triggerNode => triggerNode.parentNode} 
            style={{width:"100%"}}
            format="dddd, MMMM DD"
            value={moment(data.date)} 
            allowClear={false}
            disabled={true}
            // onChange={(value) => onDateSelect(config.key, value) }
        />
        <br/>
       <div className="time-wrapper">
            <div className="start-section section">
                <Input   disabled={true} className="input-field" size="small" value={formData.startTime.hr} onChange={(value) => timeHandler("startTime","hr", value)}/>
                :
                <InputNumber disabled={true} size="small" type={"number"} min={0} max={59} value={formData.startTime.mm} onChange={(value) => timeHandler("startTime","mm", value)}/>
            </div>
            <span className="seperator">-</span>
            <div className="end-section section">
                <Input disabled={true} className="input-field" size="small"value={formData.endTime.hr} onChange={(value) => timeHandler("endTime","hr", value)}/>
                :
                <InputNumber disabled={true} size="small" type={"number"} min={0} max={59} value={formData.endTime.mm} onChange={(value) => timeHandler("endTime","mm", value)}/>
            </div>
            <ClockCircleOutlined />
       </div>
       <div className="join-meeting-button">
           <Icon type="camera"/>
            Join
       </div>
        <div className="desctiption">
            <div className="label">
                Description
            </div>
            <TextArea
                disabled={true} 
                value={formData.description} 
                rows={4} 
                placeholder="Enter a description..." 
                onChange={ (e) => changeHandle("description", e)}
            />   
        </div>
        {/* <div style={{display:"flex", justifyContent:"flex-end", marginTop: 15}}>
            <button className="cancle-button"  onClick={() => submitHandler("panelist-cancel")}>Cancel</button>
            <button className="primary-button" onClick={() => submitHandler("panelist-accept")}>Accept</button>
        </div> */}
        </div> 
        )
    } else if(template == "CANDIDATE" && data.slotStatus == "AVAILABLE") {
        content =  (
            <div className="scheduler-popover" >
            <div className="popover-title">
                {title}
            </div>
            <div className="label">
                Date and time
            </div>
            <DatePicker 
                getPopupContainer={triggerNode => triggerNode.parentNode} 
                style={{width:"100%"}}
                format="dddd, MMMM DD"
                value={moment(data.date)} 
                allowClear={false}
                disabled={template == "CANDIDATE"}
                // onChange={(value) => onDateSelect(config.key, value) }
            />
            <br/>
           <div className="time-wrapper">
                <div className="start-section section">
                    <Input   disabled={template == "CANDIDATE"} className="input-field" size="small" value={formData.startTime.hr} onChange={(value) => timeHandler("startTime","hr", value)}/>
                    :
                    <InputNumber disabled={template == "CANDIDATE"} size="small" type={"number"} min={0} max={59} value={formData.startTime.mm} onChange={(value) => timeHandler("startTime","mm", value)}/>
                </div>
                <span className="seperator">-</span>
                <div className="end-section section">
                    <Input disabled={template == "CANDIDATE"} className="input-field" size="small"value={formData.endTime.hr} onChange={(value) => timeHandler("endTime","hr", value)}/>
                    :
                    <InputNumber disabled={template == "CANDIDATE"} size="small" type={"number"} min={0} max={59} value={formData.endTime.mm} onChange={(value) => timeHandler("endTime","mm", value)}/>
                </div>
                <ClockCircleOutlined />
           </div>
            {
                template == "PANELIST" && (
                    <Fragment>
                        <div  className="frequency">
                            <div className="label">
                                Frequency
                            </div>
                            <Select
                                showSearch={false}
                                defaultValue="Does not repeat"
                                optionFilterProp="children"
                                style={{width:"100%"}}
                                // onChange={onChange}
                                filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                            >
                                <Option value="Does not repeat">Does not repeat</Option>
                                <Option value="Daily">Daily</Option>
                                <Option value="Weekdays (Monday to Friday)">Weekdays (Monday to Friday)</Option>
                                <Option value="Weekly on Tuesday">Weekly on Tuesday</Option>
                            </Select>
                        </div>
                        <div className="all-day">
                            <Checkbox >All Day</Checkbox>
                        </div> 
                    </Fragment>
                )
            }
            <div className="desctiption">
                <div className="label">
                    Description
                </div>
                <TextArea
                    disabled={template == "CANDIDATE"} 
                    value={formData.description} 
                    rows={4} 
                    placeholder="Enter a description..." 
                    onChange={ (e) => changeHandle("description", e)}
                />   
            </div>
            <div style={{display:"flex", justifyContent:"flex-end", marginTop: 15}}>
                {/* <button className="cancle-button" onClick={()=>props.changeHoverState(data)}>Cancel</button> */}
                <button className="primary-button" onClick={() => submitHandler("candidate-confirm")}>Confirm</button>
            </div>
            </div>
        )
    } else if(template == "CANDIDATE" && data.slotStatus == "ACCEPTED") {
        content =  (
        <div className="scheduler-popover" >
        <div className="popover-title">
            Interview for - Front end developer
        </div>
        <div className="label">
            Date and time
        </div>
        <DatePicker 
            getPopupContainer={triggerNode => triggerNode.parentNode} 
            style={{width:"100%"}}
            format="dddd, MMMM DD"
            value={moment(data.date)} 
            allowClear={false}
            disabled={true}
            // onChange={(value) => onDateSelect(config.key, value) }
        />
        <br/>
       <div className="time-wrapper">
            <div className="start-section section">
                <Input   disabled={true} className="input-field" size="small" value={formData.startTime.hr} onChange={(value) => timeHandler("startTime","hr", value)}/>
                :
                <InputNumber disabled={true} size="small" type={"number"} min={0} max={59} value={formData.startTime.mm} onChange={(value) => timeHandler("startTime","mm", value)}/>
            </div>
            <span className="seperator">-</span>
            <div className="end-section section">
                <Input disabled={true} className="input-field" size="small"value={formData.endTime.hr} onChange={(value) => timeHandler("endTime","hr", value)}/>
                :
                <InputNumber disabled={true} size="small" type={"number"} min={0} max={59} value={formData.endTime.mm} onChange={(value) => timeHandler("endTime","mm", value)}/>
            </div>
            <ClockCircleOutlined />
       </div>
       <div className="join-meeting-button">
           <Icon type="camera"/>
            Join
       </div>
        <div className="desctiption">
            <div className="label">
                Description
            </div>
            <TextArea
                disabled={true} 
                value={formData.description} 
                rows={4} 
                placeholder="Enter a description..." 
                onChange={ (e) => changeHandle("description", e)}
            />   
        </div>
        {/* <div style={{display:"flex", justifyContent:"flex-end", marginTop: 15}}>
            <button className="cancle-button"  onClick={() => submitHandler("panelist-cancel")}>Cancel</button>
            <button className="primary-button" onClick={() => submitHandler("panelist-accept")}>Accept</button>
        </div> */}
        </div> 
        )
    } else if(template == "CANDIDATE" && data.slotStatus == "BOOKED") {
        content =  (
            <div className="scheduler-popover" >
                <div className="popover-title">
                    Interview for - Front end developer
                </div>
                <div className="label">
                    Date and time
                </div>
                <DatePicker 
                    getPopupContainer={triggerNode => triggerNode.parentNode} 
                    style={{width:"100%"}}
                    format="dddd, MMMM DD"
                    value={moment(data.date)} 
                    allowClear={false}
                    disabled={true}
                    // onChange={(value) => onDateSelect(config.key, value) }
                />
                <br/>
            <div className="time-wrapper">
                    <div className="start-section section">
                        <Input   disabled={true} className="input-field" size="small" value={formData.startTime.hr} onChange={(value) => timeHandler("startTime","hr", value)}/>
                        :
                        <InputNumber disabled={true} size="small" type={"number"} min={0} max={59} value={formData.startTime.mm} onChange={(value) => timeHandler("startTime","mm", value)}/>
                    </div>
                    <span className="seperator">-</span>
                    <div className="end-section section">
                        <Input disabled={true} className="input-field" size="small"value={formData.endTime.hr} onChange={(value) => timeHandler("endTime","hr", value)}/>
                        :
                        <InputNumber disabled={true} size="small" type={"number"} min={0} max={59} value={formData.endTime.mm} onChange={(value) => timeHandler("endTime","mm", value)}/>
                    </div>
                    <ClockCircleOutlined />
            </div>
                <div className="desctiption">
                    <div className="label">
                        Description
                    </div>
                    <TextArea
                        disabled={true} 
                        value={formData.description} 
                        rows={4} 
                        placeholder="Enter a description..." 
                        onChange={ (e) => changeHandle("description", e)}
                    />   
                </div>
                <div style={{display:"flex", justifyContent:"flex-end", marginTop: 15}}>
                    <button className="cancle-button"  onClick={() => submitHandler("candidate-cancel")}>Cancel</button>
                    {/* <button className="primary-button" onClick={() => submitHandler("panelist-accept")}>Accept</button> */}
                </div>
            </div>
        )
    } else if(template ==  "ADMIN" && data.slotStatus == "AVAILABLE") {
        content =  (
            <div className="scheduler-popover" >
            <div className="popover-title">
                {title}
            </div>
            <div className="label">
                Date and time
            </div>
            <DatePicker 
                getPopupContainer={triggerNode => triggerNode.parentNode} 
                style={{width:"100%"}}
                format="dddd, MMMM DD"
                value={moment(data.date)} 
                allowClear={false}
                disabled={template == "CANDIDATE"}
                // onChange={(value) => onDateSelect(config.key, value) }
            />
            <br/>
           <div className="time-wrapper">
                <div className="start-section section">
                    <Input   disabled={template == "CANDIDATE"} className="input-field" size="small" value={formData.startTime.hr} onChange={(value) => timeHandler("startTime","hr", value)}/>
                    :
                    <InputNumber disabled={template == "CANDIDATE"} size="small" type={"number"} min={0} max={59} value={formData.startTime.mm} onChange={(value) => timeHandler("startTime","mm", value)}/>
                </div>
                <span className="seperator">-</span>
                <div className="end-section section">
                    <Input disabled={template == "CANDIDATE"} className="input-field" size="small"value={formData.endTime.hr} onChange={(value) => timeHandler("endTime","hr", value)}/>
                    :
                    <InputNumber disabled={template == "CANDIDATE"} size="small" type={"number"} min={0} max={59} value={formData.endTime.mm} onChange={(value) => timeHandler("endTime","mm", value)}/>
                </div>
                <ClockCircleOutlined />
           </div>
            <div className="desctiption">
                <div className="label">
                    Description
                </div>
                <TextArea
                    disabled={template == "CANDIDATE"} 
                    value={formData.description} 
                    rows={4} 
                    placeholder="Enter a description..." 
                    onChange={ (e) => changeHandle("description", e)}
                />   
            </div>
            <div style={{display:"flex", justifyContent:"flex-end", marginTop: 15}}>
                {/* <button className="cancle-button" onClick={()=> submitHandler("admin-cancel")}>Cancel</button> */}
                <button className="primary-button" onClick={() => submitHandler("admin-confirm")}>Confirm</button>
            </div>
            </div>
        )
    } else if(template ==  "ADMIN"  && data.slotStatus == "ACCEPTED") {
        content =  (
        <div className="scheduler-popover" >
        <div className="popover-title">
            Interview for - Front end developer
        </div>
        <div className="label">
            Date and time
        </div>
        <DatePicker 
            getPopupContainer={triggerNode => triggerNode.parentNode} 
            style={{width:"100%"}}
            format="dddd, MMMM DD"
            value={moment(data.date)} 
            allowClear={false}
            disabled={true}
            // onChange={(value) => onDateSelect(config.key, value) }
        />
        <br/>
       <div className="time-wrapper">
            <div className="start-section section">
                <Input   disabled={true} className="input-field" size="small" value={formData.startTime.hr} onChange={(value) => timeHandler("startTime","hr", value)}/>
                :
                <InputNumber disabled={true} size="small" type={"number"} min={0} max={59} value={formData.startTime.mm} onChange={(value) => timeHandler("startTime","mm", value)}/>
            </div>
            <span className="seperator">-</span>
            <div className="end-section section">
                <Input disabled={true} className="input-field" size="small"value={formData.endTime.hr} onChange={(value) => timeHandler("endTime","hr", value)}/>
                :
                <InputNumber disabled={true} size="small" type={"number"} min={0} max={59} value={formData.endTime.mm} onChange={(value) => timeHandler("endTime","mm", value)}/>
            </div>
            <ClockCircleOutlined />
       </div>
       <div className="join-meeting-button">
           <Icon type="camera"/>
            Join
       </div>
        <div className="desctiption">
            <div className="label">
                Description
            </div>
            <TextArea
                disabled={true} 
                value={formData.description} 
                rows={4} 
                placeholder="Enter a description..." 
                onChange={ (e) => changeHandle("description", e)}
            />   
        </div>
        {/* <div style={{display:"flex", justifyContent:"flex-end", marginTop: 15}}>
            <button className="cancle-button"  onClick={() => submitHandler("panelist-cancel")}>Cancel</button>
            <button className="primary-button" onClick={() => submitHandler("panelist-accept")}>Accept</button>
        </div> */}
        </div> 
        )
    } else if(template == "ADMIN" && !data.slotStatus)  {
        content = (
            <div className="scheduler-popover" >
                <div className="popover-title">
                    Slot Confirm
                </div>
                <div className="label">
                    Date and time
                </div>
                <DatePicker 
                    getPopupContainer={triggerNode => triggerNode.parentNode} 
                    style={{width:"100%"}}
                    format="dddd, MMMM DD"
                    value={moment(data.date)} 
                    allowClear={false}
                    disabled={template == "CANDIDATE"}
                    // onChange={(value) => onDateSelect(config.key, value) }
                />
                <br/>
               <div className="time-wrapper">
                    <div className="start-section section">
                        <Input   disabled={template == "CANDIDATE"} className="input-field" size="small" value={formData.startTime.hr} onChange={(value) => timeHandler("startTime","hr", value)}/>
                        :
                        <InputNumber disabled={template == "CANDIDATE"} size="small" type={"number"} min={0} max={59} value={formData.startTime.mm} onChange={(value) => timeHandler("startTime","mm", value)}/>
                    </div>
                    <span className="seperator">-</span>
                    <div className="end-section section">
                        <Input disabled={template == "CANDIDATE"} className="input-field" size="small"value={formData.endTime.hr} onChange={(value) => timeHandler("endTime","hr", value)}/>
                        :
                        <InputNumber disabled={template == "CANDIDATE"} size="small" type={"number"} min={0} max={59} value={formData.endTime.mm} onChange={(value) => timeHandler("endTime","mm", value)}/>
                    </div>
                    <ClockCircleOutlined />
               </div>
                {
                    template == "PANELIST" && (
                        <Fragment>
                            <div  className="frequency">
                                <div className="label">
                                    Frequency
                                </div>
                                <Select
                                    showSearch={false}
                                    defaultValue="Does not repeat"
                                    optionFilterProp="children"
                                    style={{width:"100%"}}
                                    // onChange={onChange}
                                    filterOption={(input, option) => option.children.toLowerCase().includes(input.toLowerCase())}
                                >
                                    <Option value="Does not repeat">Does not repeat</Option>
                                    <Option value="Daily">Daily</Option>
                                    <Option value="Weekdays (Monday to Friday)">Weekdays (Monday to Friday)</Option>
                                    <Option value="Weekly on Tuesday">Weekly on Tuesday</Option>
                                </Select>
                            </div>
                            <div className="all-day">
                                <Checkbox >All Day</Checkbox>
                            </div> 
                        </Fragment>
                    )
                }
                <div className="desctiption">
                    <div className="label">
                        Description
                    </div>
                    <TextArea
                        disabled={template == "CANDIDATE"} 
                        value={formData.description} 
                        rows={4} 
                        placeholder="Enter a description..." 
                        onChange={ (e) => changeHandle("description", e)}
                    />   
                </div>
                <div style={{display:"flex", justifyContent:"flex-end", marginTop: 15}}>
                    {/* <button className="cancle-button" onClick={()=>props.changeHoverState(data)}>Cancel</button> */}
                    <button className="primary-button" onClick={() => submitHandler("admin-open")}>Submit</button>
                </div>
            </div>
        );
    }
   
    return content
}
export default SchedulerPopover
