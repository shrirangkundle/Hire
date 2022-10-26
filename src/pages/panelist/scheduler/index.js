import { Table } from "antd";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import _ from "underscore";
import { Button, Popover, notification} from 'antd';
import SchedulerPopover from "./SchedulerPopover";
import WebUtils from "../../../WebUtils";
import panelistApis from "../panelistApis";
import Utils from "../../../Utils";
import { useLocation } from "react-router-dom";

const dataModal = [];
for (let i = 0; i < 24; i++) {
    dataModal.push({
        key: i,
        timeSlot: <div className="time">{`${i<10 ? '0'+i : i}:00`}</div>,
        startTime: {
            hr: i,
            mm: 0
        },
        endTime: {
            hr: i+1,
            mm: 0
        }
    });
}

function RecruiterScheduler(params) {

    const [activeRange, setActiveRange] = useState(7)
    const [data, setData] = useState(dataModal)
    const [selectedDate, setSelectedDate] = useState(null)
    const [urlParams, setUrlParams] = useState({})
    const location = useLocation()
    let userDetail = Utils.getUserDetail() || {}

    if(userDetail && userDetail.userDetail) {
      userDetail = userDetail.userDetail
    }
    const columns = [
        {
            title: '',
            width: 100,
            dataIndex: 'timeSlot',
            key: 'timeSlot',
            fixed: 'left',
        }
    ]

    useEffect(() => {
        let search = location.search
        let jdIdentifier = null
        let candidateId = null
        if(search) {
            let selectedDate = new URLSearchParams(search).get('selected_date')
            candidateId = new URLSearchParams(search).get('candidateId')
            jdIdentifier = new URLSearchParams(search).get('jdIdentifier')
            if(selectedDate) {
                formatData(1,{
                    selectedDate
                })
            } else {
                formatData(activeRange)
            }
            setUrlParams({
                selectedDate,
                candidateId,
                jdIdentifier
            })
        } else {
            formatData(activeRange)
        }
    },[])

    const openNotificationWithIcon = (type, title, message) => {
        notification[type]({
          message: title,
          description: message
        });
    };

    const convertToUTC = (date, hr, mm) => {
        const year = Number(moment(date).format("YYYY"));
        const monthIndex = Number(moment(date).format("MM"));
        const day = Number(moment(date).format("DD"));
        let timeUtc = new Date(year, monthIndex-1, day, hr, mm, 0).toISOString();
        timeUtc = timeUtc.split(".")[0]
        return timeUtc
    }

    const formatData = (range,params={}) => {
        let start =new Date();
        let selectedDate = params.selectedDate
        let end = new Date(moment(start).add(range-1, 'day'));
        if(selectedDate) {
            start = new Date(selectedDate);
            end = new Date(selectedDate);
        }
        let loop = new Date(start);
        const getDate = async() => {
            let api = panelistApis["GET_PANELIST_OPEN_SLOT"]
            let userD = {
                "startTime": convertToUTC(start, 0,0),
                "endTime": convertToUTC(end, 23, 59),
                "panelistId": userDetail.userIdentifier
            }
            if(selectedDate){
                setSelectedDate(selectedDate)
            } else if(!selectedDate) {
                setSelectedDate(null)
            }
            let endString = moment().toISOString().split(".")[1]
            WebUtils.httpOperations(api, userD,  "POST").then( res => { 
                console.log("suc", res);
                let meetings = []
                if(res.data.data) {
                    meetings = res.data.data
                }
                let temp = []
                _.map(meetings, rec => {
                    let mStart = new Date(rec.startTime+"."+endString)
                    let mEnd = new Date(rec.endTime+"."+endString)
                    temp.push({
                        ...rec,
                        date: mStart.toDateString(),
                        startTime: {
                            hr: mStart.getHours(),
                            mm: mStart.getMinutes()
                        },
                        endTime: {
                            hr: mStart.getHours() >= 23 && mEnd.getHours() == 0 ? 24 : mEnd.getHours(),
                            mm: mEnd.getMinutes()
                        }
                    })
                })
                meetings = temp
                let modData = [...data]
                while (loop <= end) {
                    let meetingIndexs = _.filter(meetings, m => m.date == loop.toDateString())
                    for (let i = 0; i < 24; i++) {      
                        if(meetingIndexs.length > 0) {
                            modData[i][`${loop.toDateString()}`]={
                                startTime: data[i].startTime,
                                endTime: data[i].endTime,
                                date: loop.toDateString(),
                                parentKey: data[i].key
                            }
                            _.map(meetingIndexs, meeting => {
                                if((meeting.startTime.hr == data[i].startTime.hr && meeting.endTime.mm <=  59) ||
                                   (meeting.endTime.hr == data[i].endTime.hr && meeting.endTime.mm ==  0)) {
                                   if(modData[i][`${loop.toDateString()}`].meetings) {
                                    modData[i][`${loop.toDateString()}`].meetings.push(meeting)
                                   } else {
                                    modData[i][`${loop.toDateString()}`].meetings = [meeting]
                                   }
                                } else if(data[i+1] && meeting.endTime.hr == data[i+1].startTime.hr && meeting.startTime.hr < data[i+1].startTime.hr && meeting.endTime.mm <=  59) {
                                    if(modData[i][`${loop.toDateString()}`].meetings) {
                                        modData[i][`${loop.toDateString()}`].meetings.push(meeting)
                                    } else {
                                        modData[i][`${loop.toDateString()}`].meetings = [meeting]
                                    }
                                }
                            })
                        } else {
                            modData[i][`${loop.toDateString()}`]={
                                startTime: data[i].startTime,
                                endTime: data[i].endTime,
                                date: loop.toDateString(),
                                parentKey: data[i].key
                            }
                        }
                    }
                    let newDate = loop.setDate(loop.getDate() + 1);
                    loop = new Date(newDate);
                }
                setData(modData)
                setActiveRange(range)
            }, error => { 
                console.log("error", error)
            })
        }
        getDate()
    }

    const addMeetings = (params) => {
        let modData = [...data]
        let postData = {}
        let api = ''
        if(params.operation == "panelist-open") {
            api = panelistApis["POST_PANELIST_OPEN_SLOT"]
            postData = {
                startTime: convertToUTC(params.date, params.startTime.hr, params.startTime.mm),
                endTime: convertToUTC(params.date, params.endTime.hr, params.endTime.mm),
                description: params.description,
                panelistId: userDetail.userIdentifier, 
                frequency: {},
                userRole: "PANELIST"
            }
        } else if(params.operation == "panelist-cancel") {
            api = panelistApis["CANCEL_PANELIST_SLOT"]
            postData = {
                slotId: params.extraInfor.slotId,
                "cancellationReason": "string"
            }

        } else if(params.operation == "panelist-accept") {
            api = panelistApis["CONFIRM_PANELIST_SLOT"]
            postData = {
                panelistId: params.extraInfor.panelistId,
                slotId: params.extraInfor.slotId
            }
        }
        WebUtils.httpOperations(api, {...postData }, "POST" ).then( res => {
            if(res.data.resultStatusInfo.resultCode=="AlreadyExists") {
                openNotificationWithIcon('warning','Slot already opened',res.data.resultStatusInfo.message)
            } else if (res.data.resultStatusInfo.resultCode=="Success") {
                openNotificationWithIcon('success','Success',res.data.resultStatusInfo.message)
                let endString = new Date().toISOString().split(".")[1]
                let resData= res.data.data
                let resStartTime = resData.startTime+"."+endString
                let resEndTime = resData.endTime+"."+endString
                let modParams = {...params}
                modParams.date =  new Date(resStartTime).toDateString()
                modParams.startTime = {
                    hr: new Date(resStartTime).getHours(),
                    mm: new Date(resStartTime).getMinutes()
                }
                modParams.endTime = {
                    hr: new Date(resStartTime).getHours() >= 23 && new Date(resEndTime).getHours() == 0 ? 24 : new Date(resEndTime).getHours(),
                    mm: new Date(resEndTime).getMinutes()
                }
                modParams.slotStatus = resData.slotStatus
                let selectedStartDateTime = _.findIndex(modData, r => Number(params.startTime.hr) == r.startTime.hr) 
                if(selectedStartDateTime != -1) {
                    if(modData[selectedStartDateTime][modParams.date].meetings) {
                        modData[selectedStartDateTime][modParams.date].meetings.push(modParams)
                    } else {
                        modData[selectedStartDateTime][modParams.date].meetings=[modParams]
                    }
                }
                setData(modData)
            } else {
                openNotificationWithIcon('error', 'Failed',res.data.resultStatusInfo.message)
            }   
        }, error => {
            openNotificationWithIcon('error','Failed')
            console.log("error", error)
        })
    }

    let start = new Date(moment(new Date()));
    let end = new Date(moment(new Date()).add(activeRange-1, 'day'));
    if(selectedDate){
        start = new Date(selectedDate);
        end = new Date(selectedDate);
    }
    let loop = new Date(start);
    console.log("data", data)

    const returnkey = (value) => {
        let key = null
        // try {
        //     key = JSON.stringify(value)
        // } catch (error) {
        //     console.log("bufg", value)
        // }
        return key

    } 
    while (loop <= end) {
        columns.push(
            {
                title: moment(loop).format("D dddd"),
                width: 140,
                dataIndex: loop.toDateString(),
                key: loop.toDateString(),
                align:"center",
                render: (value={}, r,c, re) => {
                   return  (
                    <div style={{height: 100, padding:  4}}>
                        {   value.meetings ? (
                             <div style={{position:"relative", height:"100%", width:"100%"}}>
                                 <Popover  placement="rightTop" title={false} content={<SchedulerPopover data={{...value}} template="PANELIST" onSubmit={addMeetings}/>} trigger="click">
                                     <Button style={{width:"100%", border:"0", height:"100%",position:"absolute", zIndex:0, background:"transparent", color:"transparent", padding:0, display:"flex", alignItems:"baseline"}}>
                                       B
                                    </Button>
                                </Popover>
                            {
                                _.map(value.meetings, meeting => {
                                   if(meeting.slotStatus) {
                                       let startPoint =  100 * (meeting.startTime.mm/60)
                                       let height = null
                                       if(meeting.endTime.hr == meeting.startTime.hr) {
                                           height = 100 * ((meeting.endTime.mm-meeting.startTime.mm)/60)
                                       } else {
                                            let diffInMin = (meeting.endTime.hr - meeting.startTime.hr) * 60
                                            height = 100 * (( (diffInMin + meeting.endTime.mm)-meeting.startTime.mm)/60)
                                            if(meeting.endTime.mm != 0){
                                                height=height+5
                                            }
                                       }
                                       if( meeting.slotStatus == "CANCELLED" ) {
                                            return <div className="open-cell" data-cell-type={meeting.slotStatus} >Meeting</div>
                                       } else {
                                        return (
                                           
                                            <Popover 
                                                 placement="rightTop" 
                                                 title={false} 
                                                 content={
                                                     <SchedulerPopover 
                                                         data={{...meeting, meetingPopover: true}} 
                                                         template="PANELIST" 
                                                         onSubmit={addMeetings}
                                                     />
                                                 }
                                                 trigger="click"
                                             >
                                                 <Button style={{width:"100%", border:"0", zIndex:1, background:"transparent", color:"transparent", padding:0, display:"flex", alignItems:"baseline", height: height+"%", position:"absolute", top: startPoint+"%"}}>
                                                     <div className="open-cell" data-cell-type={meeting.slotStatus} >
                                                         {
                                                             meeting.slotStatus  == "AVAILABLE" ? (
                                                                 "Open"
                                                             ) :  meeting.slotStatus  == "BOOKED" ? (
                                                                 "Blocked"
                                                             ) : meeting.slotStatus == "ACCEPTED"  ? (
                                                                 "Meeting"
                                                             ) : meeting.slotStatus == "CANCELLED" ?  (
                                                                 "Meeting"
                                                             ) : null
                                                         }
                                                         
                                                     </div>
                                                 </Button>
                                            </Popover>
                                        )
                                       }
                                    }
                                })
                            }
                            </div>                              
                            ) : (
                                <Fragment>
                                    <Popover placement="rightTop" title={false} content={<SchedulerPopover data={value} template="PANELIST" onSubmit={addMeetings}/>} trigger="click">
                                        <Button style={{width:"100%", height:"100%", border:"0", zIndex:1, background:"transparent", color:"transparent"}}>
                                            b
                                        </Button>
                                    </Popover>
                                    <div className="divider"></div>
                                </Fragment>
                            )
                        }
                    </div>
                   )
                }
            }
        )
        let newDate = loop.setDate(loop.getDate() + 1);
        loop = new Date(newDate);
    }

    const dateOption = [
        {
            display: "30 days",
            value: 30
        },
        {
            display: "7 days",
            value: 7
        }
    ]

    const scroll = {
        x: activeRange == 7 || selectedDate ? 800 : 1500
    }

    return (
        <div className="scheduler-page-wrapper">
            <div className="date-range-wrapper">
            {   
                _.map(dateOption, option => <div className="date-range" onClick={() => formatData(option.value)} data-status={option.value == activeRange}>{option.display}</div> )
            }
            </div>
            {/* <div className="job-overview">
                <div>
                    <div className="job-title">Job ID</div>
                    <div className="job-desc">A82636647</div>
                </div>

                <div>
                    <div className="job-title">Your Timezone</div>
                    <div className="job-desc">14:30+UTC; 19:30</div>
                </div>

                <div>
                    <div className="job-title">Location</div>
                    <div className="job-desc">Melbourne, Australia</div>
                </div>

                <div>
                    <div className="job-title">Role</div>
                    <div className="job-desc">Back-end Developer</div>
                </div>

                <div>
                    <div className="job-title">Recruiter</div>
                    <div className="job-desc">candicewu</div>
                </div>

                <div>
                    <div className="job-title">Email</div>
                    <div className="job-desc">@candicewu.com</div>
                </div>


            </div> */}
            <div className="candidate-overview">
                {/* Booking a slot for <span className="text-bold">Durga P</span> */}
                “CLICK” on calendar to open the slots. This helps us know when you can take interviews
            </div>
            <div className="scheduler-page">
                <div className="calender-panel">
                    <Table sticky dataSource={data} columns={columns} scroll={scroll} rowSelection={false} pagination={false}/>
                </div>
                <div className="detail-panel">
                    <div style={{position:"sticky", top: 0}}>
                        {/* <div className="detail-block push-notification">
                            <div className="title">Candidate requested new slots</div>
                            <div className="desc">Durga P has requested new slots as he is not available in next 48 hours.</div>
                            <DatePicker onChange={onChangeSlot} />
                            <RangePicker />
                            <div className="button-wrapper">
                                <div className="slot-button">Book slot for Candidate</div>
                            </div>
                        </div> */}

                        {/* <div className="detail-block book-another-panelist">
                            <div className="title">Book another panelist</div>
                            <div className="desc">Pradeeptha is not available in the time slot and cancelled the interview. Book another interviewer here.</div>
                            <div className="button-wrapper">
                                <div className="slot-button" style={{paddingRight:2}}>Next <Icon type="arrow-right" width={35} height={35}/></div>
                            </div>
                        </div> */}
                         <div className="detail-block book-another-panelist">
                            {/* {moment().tz(Intl.DateTimeFormat().resolvedOptions().timeZone).format()} */}
                            {/* {moment.tz.guess()} */}
                            {Intl.DateTimeFormat().resolvedOptions().timeZone}
                        </div>
                        

                        {/* <div className="detail-block book-another-panelist">
                            <div style={{display:"flex"}}>
                                <div className="color-indicator slot-available"></div>
                                <div>
                                    <div className="title">Slots available</div>
                                    <div className="desc">Click to book the slot</div>
                                </div>
                            </div>

                            <div style={{display:"flex"}}>
                                <div className="color-indicator slot-booked"></div>
                                <div>
                                    <div className="title">Blocked</div>
                                    <div className="desc">Booked by you</div>
                                </div>
                            </div>

                            <div style={{display:"flex"}}>
                                <div className="color-indicator slot-confirmed"></div>
                                <div>
                                    <div className="title">Confirmed</div>
                                    <div className="desc">Interviewer Confirmed this</div>
                                </div>
                            </div>

                            <div style={{display:"flex"}}>
                                <div className="color-indicator slot-canceled"></div>
                                <div>
                                    <div className="title">Cancelled</div>
                                    <div className="desc">Interviewer Cancelled this</div>
                                </div>
                            </div>

                        </div> */}

                            <div className="detail-block book-another-panelist">
                            <div style={{display:"flex"}}>
                                <div className="color-indicator empty-slot"></div>
                                <div>
                                    <div className="title">Empty</div>
                                    <div className="desc">Click to add your slots</div>
                                </div>
                            </div>

                            <div style={{display:"flex"}}>
                                <div className="color-indicator slot-available"></div>
                                <div>
                                    <div className="title">Selected</div>
                                    <div className="desc">This slot is Cliked</div>
                                </div>
                            </div>

                            <div style={{display:"flex"}}>
                                <div className="color-indicator slot-confirmed"></div>
                                <div>
                                    <div className="title">Open</div>
                                    <div className="desc">Open for an interview at this time</div>
                                </div>
                            </div>
                            <div style={{display:"flex"}}>
                                <div className="color-indicator interview-booked"></div>
                                <div>
                                    <div className="title">Blocked</div>
                                    <div className="desc">Blocked by job seeker</div>
                                </div>
                            </div>

                            <div style={{display:"flex"}}>
                                <div className="color-indicator slot-booked"></div>
                                <div>
                                    <div className="title">Accepted</div>
                                    <div className="desc">You accepted the interview</div>
                                </div>
                            </div>

                            <div style={{display:"flex"}}>
                                <div className="color-indicator slot-canceled"></div>
                                <div>
                                    <div className="title">Declined</div>
                                    <div className="desc">You declined the interview</div>
                                </div>
                            </div>

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default RecruiterScheduler;