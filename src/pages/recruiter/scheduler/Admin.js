import { Table } from "antd";
import moment from "moment";
import { Fragment, useEffect, useState } from "react";
import _ from "underscore";
import { Button, Popover, notification,  Input} from 'antd';
import SchedulerPopover from "./SchedulerPopover";
import WebUtils from "../../../WebUtils";
import recruiterApis from "../recruiterApis";
import Icon from "../../../components/Icons";
import { useLocation } from "react-router-dom";
import Utils from "../../../Utils";

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

function Admin(params) {

    const [activeRange, setActiveRange] = useState(7)
    const [data, setData] = useState(dataModal)
    const [panelistId, setPanelistId] = useState(null)
    const [selectedDate, setSelectedDate] = useState(null)
    const [panelistData, setPanelistData]  = useState([])
    const [urlParams, setUrlParams] = useState({})
    const [candidateDetail, setCandidateDetail] = useState({})
    const location = useLocation()
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
        let recruiterId = null
        if(search) {
            let selectedDate = new URLSearchParams(search).get('selected_date')
            candidateId = new URLSearchParams(search).get('candidateId')
            jdIdentifier = new URLSearchParams(search).get('jdIdentifier')
            recruiterId = new URLSearchParams(search).get('recruiterId')
            if(selectedDate) {
                formatData(1,{
                    selectedDate,
                    candidateId,
                    jdIdentifier,
                    recruiterId
                })
            } else {
                formatData(activeRange)
            }
            // candidateId: "candidate2",
            // jdIdentifier:'JD_BU1657610433',
            setUrlParams({
                selectedDate,
                candidateId,
                jdIdentifier,
                recruiterId
            })
        } else {
            formatData(activeRange)
        }
        getCandidate(candidateId)
        getPanelist({jdId:jdIdentifier})
    },[])

    const getCandidate = (id) => {
        // setCandidateDetail({
        //     "id": "62e02dd497df9a04143b350c",
        //     "version": 1,
        //     "userIdentifier": "candidate2",
        //     "keycloakUserId": "6197e6b6-c48d-4a4c-9692-a81113954c80",
        //     "email": "pv.durga@bridgentech.com",
        //     "mobile": "1234",
        //     "userRole": "CANDIDATE",
        //     "active": true,
        //     "firstName": "Durga Prasad",
        //     "lastName": "V"
        // })
        WebUtils.httpOperations(recruiterApis["GET_USER_DETAIL"]+id, {}, "GET").then(res => {
            setCandidateDetail(res.data.data)
        }, error => error)
    }

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

    const formatData = (range, _params) => {
        let start =new Date();
        let params =  _params || urlParams
        let selectedDate = params.selectedDate
        let end = new Date(moment(start).add(range-1, 'day'));
        if(selectedDate) {
            start = new Date(selectedDate);
            end = new Date(selectedDate);
        }
        let loop = new Date(start);
        const getDate = async() => {
            let api = recruiterApis["GET_PANELIST_OPEN_SLOT"]
            let userD = {
                "startTime": convertToUTC(start, 0,0),
                "endTime": convertToUTC(end, 23, 59),
                "panelistId": panelistId
            }
            setActiveRange(range)
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
               
            }, error => { 
                console.log("error", error)
                
            })
        }
        getDate()
    }

    const handlePanelistId = (_panelistId) => {
        const start =new Date();
        const end = new Date(moment(start).add(activeRange-1, 'day'));
        let loop = new Date(start);
        const getDate = async() => {
            let api = recruiterApis["GET_PANELIST_OPEN_SLOT"]
            let userD = {
                "startTime": convertToUTC(start, 0,0),
                "endTime": convertToUTC(end, 23, 59),
                "panelistId": _panelistId
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
                setActiveRange(activeRange)
                setPanelistId(_panelistId)
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
        let modUrlParams = {...urlParams}
        delete modUrlParams.selectedDate
        if(params.operation == "admin-open") {
            api = recruiterApis["POST_ADMIN_OPEN_SLOT"]
            postData = {
                startTime: convertToUTC(params.date, params.startTime.hr, params.startTime.mm),
                endTime: convertToUTC(params.date, params.endTime.hr, params.endTime.mm),
                description: params.description,
                panelistId: panelistId, 
               
                frequency: {},
                userRole: "ADMIN",
                slotStatus: "ACCEPTED",
                ...modUrlParams
            }
        } else if(params.operation == "admin-cancel") {
            api = recruiterApis["CANCEL_PANELIST_SLOT"]
            postData = {
                slotId: params.extraInfor.slotId,
                "cancellationReason": "string"
            }

        } else if(params.operation == "admin-confirm") {
            api = recruiterApis["POST_ADMIN_OPEN_SLOT"]
            postData = {
                panelistId: params.extraInfor.panelistId,
                slotId: params.extraInfor.slotId,
                startTime: convertToUTC(params.date, params.startTime.hr, params.startTime.mm),
                endTime: convertToUTC(params.date, params.endTime.hr, params.endTime.mm),
                description: params.description,
                frequency: {},
                userRole: "ADMIN",
                slotStatus: "ACCEPTED",
                ...modUrlParams
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
    let search = location.search
    if(selectedDate){
        start = new Date(selectedDate);
        end = new Date(selectedDate);
    }
    let loop = new Date(start)
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
                                 <Popover  placement="rightTop" title={false} content={<SchedulerPopover data={{...value}} template="ADMIN" onSubmit={addMeetings}/>} trigger="click">
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
                                                         template="ADMIN" 
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
                                    <Popover placement="rightTop" title={false} content={<SchedulerPopover data={value} template="ADMIN" onSubmit={addMeetings}/>} trigger="click">
                                        <Button style={{width:"100%", height:"100%", border:"0", zIndex:1, background:"transparent", color:"transparent"}}>
                                            b
                                        </Button>
                                    </Popover>
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

    const getPanelist = (data) => {
        let api = recruiterApis["GET_PANELISTS"]
        // setPanelistData([
        //     {
        //         id: "panelist1",
        //         display:"Panelist 1"
        //     },
        //     {
        //         id: "panelist2",
        //         display:"Panelist 2"
        //     }, {
        //         id: "panelist3",
        //         display:"Panelist 3"
        //     },
        //     {
        //         id: "panelist4",
        //         display:"Panelist 4"
        //     }
        // ])
        // setPanelistId("panelist1")
        let apiUrl = api + "?" + Utils.toParams(data)
        WebUtils.httpOperations(apiUrl,null,"POST").then(res => {
            let modPanelist = []
            _.map(res.data.data, r => {
                modPanelist.push({
                    id: r,
                    display: r
                })
            })
            setPanelistData(modPanelist)
            if(res.data.data[0]){
                setPanelistId(res.data.data[0].id)
            }
        }, error => console.log(error))
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

    // let panelistData = [
    //     {
    //         id: "panelist1",
    //         display:"Panelist 1"
    //     },
    //     {
    //         id: "panelist2",
    //         display:"Panelist 2"
    //     }, {
    //         id: "panelist3",
    //         display:"Panelist 3"
    //     },
    //     {
    //         id: "panelist4",
    //         display:"Panelist 4"
    //     }
    // ]

    let selectedPanelist = _.find(panelistData, rec => rec.id == panelistId)

    return (
        <div className="scheduler-page-wrapper">
            <div className="date-range-wrapper">
            {   
                _.map(dateOption, option => <div className="date-range" onClick={() => formatData(option.value)} data-status={option.value == activeRange}>{option.display}</div> )
            }
            </div>
            <div className="candidate-overview">
                {/* Booking a slot for <span className="text-bold">{selectedPanelist ? selectedPanelist.display : null}</span> */}
                Booking a slot for <span className="text-bold">{candidateDetail.firstName} {candidateDetail.lastName}</span>
                {/* “CLICK” on calendar to open the slots. This helps us know when you can take interviews */}
            </div>
            <div className="scheduler-page admin-scheduler">
                <div className="detail-panel">
                    <div style={{position:"sticky", top: 0}} className="panelist-list-wrapper">
                    <Input size="large" placeholder="Search" prefix={<Icon type="search" width={15} height={15} />} />
                        <div className="detail-block panelist-list-section">
                            {
                                _.map(panelistData, rec =>  <div data-status={selectedPanelist && selectedPanelist.id==rec.id} className="panelist" onClick={()=>handlePanelistId(rec.id)}>
                                <div className="panelist-image"></div>
                                    {rec.display}
                                </div>)
                            }
                           
                            {/* <div style={{display:"flex"}}>
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
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="calender-panel">
                    <Table sticky dataSource={data} columns={columns} scroll={scroll} rowSelection={false} pagination={false}/>
                </div>
            </div>
        </div>
    )
}
export default Admin;