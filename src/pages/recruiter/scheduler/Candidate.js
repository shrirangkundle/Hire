import { Table } from "antd";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import _ from "underscore";
import { TimePicker, DatePicker, Button, Popover, Select, Checkbox, Input, notification} from 'antd';
import Icon from "../../../components/Icons";
import SchedulerPopover from "./SchedulerPopover";
import WebUtils from "../../../WebUtils";
import recruiterApis from "../recruiterApis";

const { TextArea } = Input;
const { RangePicker } = TimePicker;
const { Option } = Select;

const staticData = [];
for (let i = 0; i < 24; i++) {
    staticData.push({
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

function Candidate(params) {

    const [activeRange, setActiveRange] = useState(7)
    const [data, setData] = useState(staticData)
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
        formatData(activeRange)
    },[])

    const openNotificationWithIcon = (type, title, message) => {
        notification[type]({
          message: title,
          description: message
        });
      };


    const convert = (params) => {
        const {date, startTime, endTime} = params;
        const year = Number(moment(date).format("YYYY"));
        const monthIndex = Number(moment(date).format("MM"));
        const day = Number(moment(date).format("DD"));
        const startTimeUtc = new Date(year, monthIndex, day, startTime.hr, startTime.mm, 0).toISOString();
        const endTimeUtc = new Date(year, monthIndex, day, endTime.hr, endTime.mm, 0).toISOString();
        return {
            startTime: startTimeUtc.split(".")[0],
            endTime: endTimeUtc.split(".")[0]
        }
    }

    const convertToUTC = (date, hr, mm) => {
        const year = Number(moment(date).format("YYYY"));
        const monthIndex = Number(moment(date).format("MM"));
        const day = Number(moment(date).format("DD"));
        let timeUtc = new Date(year, monthIndex-1, day, hr, mm, 0).toISOString();
        timeUtc = timeUtc.split(".")[0]
        return timeUtc
    }

    const formatData = (range) => {
        const start =new Date();
        const end = new Date(moment(start).add(range-1, 'day'));
        let loop = new Date(start);
        const getDate = async() => {
            let api = recruiterApis["GET_CANDIDATE_SLOTS"]
            let userD = {
                candidateId: "candidate2",
                jdId:'JD_BU1657610433'
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
                            console.log("dasdas", new Date('2022-07-27T05:03:11'+"."+endString).toDateString())
                            _.map(meetingIndexs, meeting => {
                                if(meeting.slotStatus=="ACCEPTED"){
                                    console.log("found meer",meeting, loop.toDateString() )
                                }
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
        let api = recruiterApis["BOOK_CANDIDATE_SLOTS"]
        let postData = {
            panelistId:params.extraInfor.panelistId,
            slotId:params.extraInfor.slotId,
            candidateId:"candidate2",
            jdId:'JD_BU1657610433',
            recruiterId: params.extraInfor.recruiterId
        }
        if(params.operation == "candidate-cancel") {
            api = recruiterApis["CANCEL_PANELIST_SLOT"]
            postData = {
                slotId: params.extraInfor.slotId,
                "cancellationReason": "string"
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

    const start = new Date();
    const end = new Date(moment(new Date()).add(activeRange-1, 'day'));
    let loop = new Date(start);
    console.log("data", data)
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
                                 {/* <Popover  placement="rightTop" title={false} content={<SchedulerPopover key={JSON.stringify(value)} data={{...value}} template="open" onSubmit={addMeetings}/>} trigger="click">
                                     <Button style={{width:"100%", border:"0", height:"100%",position:"absolute", zIndex:0, background:"transparent", color:"transparent", padding:0, display:"flex", alignItems:"baseline"}}>
                                       B
                                    </Button>
                                </Popover> */}
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
                                       if(meeting.slotStatus == "CANCELLED") {
                                        return (
                                            <div className="booked-cell" data-cell-type={meeting.slotStatus} > 
                                                Meeting
                                            </div>
                                        )
                                       } else {
                                        return (
                                            <Popover placement="rightTop" title={false} content={<SchedulerPopover key={JSON.stringify(meeting)} data={{...meeting, meetingPopover: true}} template="CANDIDATE" onSubmit={addMeetings}/>} trigger="click">
                                                <Button style={{width:"100%", border:"0", zIndex:1, background:"transparent", color:"transparent", padding:0, display:"flex", alignItems:"baseline", height: height+"%", position:"absolute", top: startPoint+"%"}}>
                                                    <div className="booked-cell" data-cell-type={meeting.slotStatus} > 
                                                    {meeting.slotStatus == 'ACCEPTED' ? (
                                                        "Confirmed" 
                                                    ) :meeting.slotStatus == 'BOOKED' ? (
                                                        "Blocked"
                                                    ) : "Book"}
                                                    </div>
                                                </Button>
                                            </Popover>
                                        )
                                       }
                                       
                                   } else {
                                       return  <div className="booked-cell"> Book(4)</div>
                                   }
                               })
                           }
                            </div>                              
                            ) : (
                                <Fragment>
                                    {/* <Popover placement="rightTop" title={false} content={<SchedulerPopover key={JSON.stringify(value)} data={value} template="open" onSubmit={addMeetings}/>} trigger="click">
                                        <Button style={{width:"100%", height:"100%", border:"0", zIndex:1, background:"transparent", color:"transparent"}}>
                                            b
                                        </Button>
                                    </Popover> */}
                                    <div className="divider"></div>
                                </Fragment>
                            )
                           
                            // value == 3 ? (
                            //     <Fragment>
                            //         <div className="book-tag tag">Book(4)</div>
                            //         <div className="booked-tag tag">Blocked(18)</div>
                            //         <div className="confirmed-tag tag">Confirmed(12)</div>
                            //         <div className="canceled-tag tag">Cancelled(4)</div>
                            //     </Fragment>
                            // ) :  value == 1 ? (
                            //     <div className="booked-cell"> Book(4)</div>
                            // ) : (
                            //     <Fragment>
                            //         <Popover  placement="rightTop" title={false} content={<SchedulerPopover data={value} template="open"/>} trigger="click">
                            //             <Button style={{width:"100%", height:"100%", border:"0", zIndex:1, background:"transparent", color:"transparent"}}>
                            //                 b
                            //             </Button>
                            //         </Popover>
                            //         <div className="divider"></div>
                            //     </Fragment>
                            // )

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
        x: activeRange == 7 ? 800 : 1500
    }

    const onChangeSlot = () => {

    }


    return (
        <div className="scheduler-page-wrapper">
            <div className="date-range-wrapper">
            {   
                _.map(dateOption, option => <div className="date-range" onClick={() => formatData(option.value)} data-status={option.value == activeRange}>{option.display}</div> )
            }
            </div>
            <div className="job-overview">
                

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
                    <div className="job-title">Website</div>
                    <div className="job-desc">candicewu.com</div>
                </div>
                <div>
                    <div className="job-title">Recruiter</div>
                    <div className="job-desc">candicewu</div>
                </div>

                <div>
                    <div className="job-title">Email</div>
                    <div className="job-desc">@candicewu.com</div>
                </div>


            </div>
            <div className="candidate-overview">
           
                Book an interview in just 48 hours
                {/* “CLICK” on calendar to open the slots. This helps us know when you can take interviews */}
            </div>
            <div className="scheduler-page">
                <div className="calender-panel">
                    <Table sticky dataSource={data} columns={columns} scroll={scroll} rowSelection={false} pagination={false}/>
                </div>
                <div className="detail-panel">
                    <div style={{position:"sticky", top: 0}}>

                        <div className="detail-block push-notification">
                            <div className="title">Request another slot</div>
                            <div className="desc">If you are not available in next 48 hours, you can request Recruiter to book as per your preference</div>
                            <DatePicker onChange={onChangeSlot} />
                            <RangePicker />
                            <div className="button-wrapper">
                                <div className="slot-button">Request</div>
                            </div>
                        </div>

                        {/* <div className="detail-block book-another-panelist">
                            <div className="title">Book another panelist</div>
                            <div className="desc">Pradeeptha is not available in the time slot and cancelled the interview. Book another interviewer here.</div>
                            <div className="button-wrapper">
                                <div className="slot-button" style={{paddingRight:2}}>Next <Icon type="arrow-right" width={35} height={35}/></div>
                            </div>
                        </div> */}
                        
                        

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
                                <div className="color-indicator c-slot-available"></div>
                                <div>
                                    <div className="title">Slots available to you</div>
                                    <div className="desc">Click to book your slot</div>
                                </div>
                            </div>

                            <div style={{display:"flex"}}>
                                <div className="color-indicator slot-booked"></div>
                                <div>
                                    <div className="title">Booked</div>
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
                           

                           

                            

                        </div>

                    </div>
                </div>
            </div>
        </div>
    )
}
export default Candidate;