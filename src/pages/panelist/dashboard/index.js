import { useEffect, useState } from "react";
import _ from "underscore";
import CustomCaleder from "../../../components/Calender";
import Icon from "../../../components/Icons";
import Box from "./Box";
import { Space, Table, Tag, DatePicker } from 'antd';
import moment from "moment";
import Utils from "../../../Utils";
import panelistApis from "../panelistApis";
import WebUtils from "../../../WebUtils";

function Dashboard(props) {

    const [activeRange, setActiveRange] = useState('this_week')
    const [activeJobType, setActiveJobType] = useState('my_job')
    const [activeCalenderOption, setActiveCalenderOption] = useState('month')
    const [meetings, setMeetings] = useState([])
    let userDetail = Utils.getUserDetail() || {}
    if(userDetail && userDetail.userDetail) {
      userDetail = userDetail.userDetail
    }
    let recuiterName = userDetail.firstName

    useEffect(() => {
        console.log(userDetail)
        formatData(30)
    },[])

   
    let rangeOption = [
        {
            key: "this_week",
            value:"this_week",
            display:"This Week"
        },
        {
            key: "this_month",
            value:"this_month",
            display:"This Month"
        },
        {
            key: "this_year",
            value:"this_year",
            display:"This Year"
        }
    ]
    let jobTypes = [
        {
            key: "my_job",
            value:"my_job",
            display:"Today"
        },
        {
            key: "all_jobs",
            value:"all_jobs",
            display:"This Week"
        },
        {
            key: "priority_jobs",
            value:"priority_jobs",
            display:"This Month"
        }
    ]

    let calenderOptions = [
        {
            key: "month",
            value:"month",
            display:"Month"
        },
        {
            key: "weekly",
            value:"weekly",
            display:"Weekly"
        }
    ]

    const columns = [
        {
          title: 'Company',
          dataIndex: 'company',
          key: 'company',
          render: (text,rec) => 
                <div className="company-column">
                    <div className="company-logo"></div>
                    <div className="column-wrapper">
                        <div className="main-text">{text}</div> <div className="desc-text">{rec.manager}</div>
                    </div>
                </div>,
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
          width: 180,
          render: (text, rec) => <div><div className="main-text">{text}</div> <div className="desc-text">{rec.code}</div></div>,
        },
        {
            title: "Candidate Name",
            dataIndex: 'candidate_name',
            key: 'candidate_name',
            width: 180,
            render: (text, rec) => text,

        },
        {
          title: 'Date/Time',
          dataIndex: 'address',
          key: 'address',
         
          render: (text) => <div>{moment().format("MMM/DD/YYYY h:mm a")}</div>,
        },
        {
            title: '',
            key: 'tags',
            dataIndex: 'tags',
            width: 10,
            render: (_, { tags }) => (
              <>
                <button className="primary-button-shadow" style={{ fontSize: 13,height: 36, width: 77}}>Review</button>
              </>
            ),
          },
          {
            title: '',
            key: 'tags',
            width: 10,
            dataIndex: 'tags',
            render: (_, { tags }) => (
              <>
               <button className="primary-button" style={{ fontSize: 13,height: 36, width: 57}}>Join</button>
              </>
            ),
          }
    ];
    const data = [
    {
        key: '1',
        name: 'John Brown',
        age: 32,
        address: 'New York No. 1 Lake Park',
        tags: [100, 12, 3, 1],
        manager:'Tim Cook',
        company:"Catalog",
        role:"Full Stack Developer",
        code:"EF46299",
        candidate_name:"Akshit Bandari"
    },
    {
        key: '2',
        name: 'Jim Green',
        age: 42,
        address: 'London No. 1 Lake Park',
        tags: [100, 12, 3, 1],
        manager:'Tim Cook',
        company:"Circooles",
        role:"Product Manager",
        code:"EF46299",
        candidate_name:"Karan Gaba"
    },
    {
        key: '3',
        name: 'Joe Black',
        age: 32,
        address: 'Sidney No. 1 Lake Park',
        tags: [100, 12, 3, 1],
        manager:'Tim Cook',
        company:"Command+R",
        role:"UX Designer",
        code:"EF46299",
        candidate_name:"Spraha Varma"
    },
    ];

    const pastInterviewcolumns = [
        {
          title: 'Company',
          dataIndex: 'company',
          key: 'company',
          render: (text,rec) => 
                <div className="company-column">
                    <div className="company-logo"></div>
                    <div className="column-wrapper">
                        <div className="main-text">{text}</div> <div className="desc-text">{rec.manager}</div>
                    </div>
                </div>,
        },
        {
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
          width: 180,
          render: (text, rec) => <div><div className="main-text">{text}</div> <div className="desc-text">{rec.code}</div></div>,
        },
        {
            title: "Candidate Name",
            dataIndex: 'candidate_name',
            key: 'candidate_name',
            width: 180,
            render: (text, rec) => text,

        },
        {
          title: 'Date/Time',
          dataIndex: 'address',
          key: 'address',
         
          render: (text) => <div>{moment().format("MMM/DD/YYYY h:mm a")}</div>,
        },
          {
            title: '',
            key: 'tags',
            
            dataIndex: 'tags',
            render: (_, { tags }) => (
              <>
               <button className="primary-button" style={{minWidth:"9.5138vw", fontSize: 13, height: 36, width: 123}}>View / Update</button>
              </>
            ),
          }
    ];

    const formatData = (range) => {
        const start =new Date();
        const end = new Date(moment(start).add(range-1, 'day'));
        let loop = new Date(start);
        const getDate = async() => {
            let api = panelistApis["GET_PANELIST_OPEN_SLOT"]
            let userD = {
                "startTime": convertToUTC(start, 0,0),
                "endTime": convertToUTC(end, 23, 59),
                "panelistId": userDetail.userIdentifier
            }
            let endString = moment().toISOString().split(".")[1]
            WebUtils.httpOperations(api, userD,  "POST").then( res => { 
                console.log("suc", res);
                let resMeetings = []
                if(res.data.data) {
                    resMeetings = res.data.data
                }
                let temp = []
                _.map(resMeetings, rec => {
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
                resMeetings = temp
                setMeetings(resMeetings)
                // setActiveRange(range)
            }, error => { 
                console.log("error", error)
            })
        }
        getDate()
    }
    console.log("meetings", meetings)

    const convertToUTC = (date, hr, mm) => {
        const year = Number(moment(date).format("YYYY"));
        const monthIndex = Number(moment(date).format("MM"));
        const day = Number(moment(date).format("DD"));
        let timeUtc = new Date(year, monthIndex-1, day, hr, mm, 0).toISOString();
        timeUtc = timeUtc.split(".")[0]
        return timeUtc
    }
    return (
        <div className="recruiter-dashboard">

            <div className="dashboard-left-section">
                {/* <div className="welcome-text">Welcome back, {recuiterName}!</div>
                <div className="page-desc">Track, Manage & Schedule your Hiring Activities like a Champion. All the best!</div> */}

                <div className="range-wrapper">
                    {
                        _.map(rangeOption, o => {
                            return (
                                <div className="option" data-status={o.key == activeRange} onClick={() => setActiveRange(o.key)}>
                                    <span className="active-indicator"></span>
                                    {o.display}
                                </div>
                            )
                        })
                    }
                </div>

                <div className="overveiw-box-wrapper">
                    <Box 
                        data={[
                            {
                                key: "My Reward Points",
                                value:"25,000",
                                change_value:"10%",
                                arrow_dir:"direction-up"
                            },
                            {
                                key: "Interviews Done",
                                value:"14",
                                change_value:"12%",
                                arrow_dir:"direction-up"
                            },
                            {
                                key: "Candidates Selected",
                                value:"12",
                                change_value:"10%",
                                arrow_dir:"direction-up"
                            }
                        ]} 
                        template={"template-1"}
                    />
                </div>
                <div className="overveiw-box-wrapper">
                    <Box  data={[
                            {
                                key: "Upcoming Interviews",
                                value:"4"
                            },
                            {
                                key: "Reports Pending",
                                value:"1"
                            },
                            {
                                key: "Slot Acceptance Pending",
                                value:"1"
                            }
                        ]}  template={"template-2"}/>
                </div>
                <div className="overveiw-box-wrapper">
                    <Box  data={[
                            {
                                key: "Candidates Offered Jobs",
                                value:"6",
                                change_value:"10%",
                                arrow_dir:"direction-up"
                            },
                            {
                                key: "Selection Rates",
                                value:"70%",
                                change_value:"12%",
                                arrow_dir:"direction-up"
                            },
                            {
                                key: "Final Offer Rate",
                                value:"42%",
                                change_value:"1%",
                                arrow_dir:"direction-down"
                            }
                        ]}  template={"template-1"}/>
                </div>
                <div className="job-list-table">
                    <div className="table-title-wrapper">
                        <div className="table-title">Upcoming Interviews</div>
                        <div className="table-view-all">View all</div>
                    </div>
                    <div className="table-header">
                        <div className="range-wrapper">
                        {
                            _.map(jobTypes, o => {
                                return (
                                    <div className="option" data-status={o.key == activeJobType} onClick={() => setActiveJobType(o.key)}>
                                        <span className="active-indicator"></span>
                                        {o.display}
                                    </div>
                                )
                            })
                        }
                        </div>
                        <div className="search-filter-wrapper">
                            <div className="search-box">
                                <Icon type="search" width={15} height={15}/>
                                <input placeholder="search"/>
                            </div>
                            <button className="filter-button"> <Icon type="filter-line" width={15} height={15}/> Filter</button>
                        </div>
                    </div>
                    <Table columns={columns} dataSource={data}  pagination={false}/>

                </div>

                <div className="job-list-table" style={{marginTop: 28}}>
                    <div className="table-title-wrapper">
                        <div className="table-title">Past Interviews</div>
                        <div className="table-view-all">View all</div>
                    </div>
                    <div className="table-header">
                        <div className="range-wrapper">
                        {
                            _.map(jobTypes, o => {
                                return (
                                    <div className="option" data-status={o.key == activeJobType} onClick={() => setActiveJobType(o.key)}>
                                        <span className="active-indicator"></span>
                                        {o.display}
                                    </div>
                                )
                            })
                        }
                        </div>
                        <div className="search-filter-wrapper">
                            <div className="search-box">
                                <Icon type="search" width={15} height={15}/>
                                <input placeholder="search"/>
                            </div>
                            <button className="filter-button"> <Icon type="filter-line" width={15} height={15}/> Filter</button>
                        </div>
                    </div>
                    <Table columns={pastInterviewcolumns} dataSource={data}  pagination={false}/>

                </div>
                
            </div>

            <div className="dashboard-right-section">
                    <div className="calender-wrapper">
                    <div  className="calender-title-section">
                            <div style={{fontSize:16, fontWeight:"600"}}>Calendar</div>
                            <div className="range-wrapper">
                                {
                                    _.map(calenderOptions, o => {
                                        return (
                                            <div className="option" data-status={o.key == activeCalenderOption} onClick={() => setActiveCalenderOption(o.key)}>
                                                <span className="active-indicator"></span>
                                                {o.display}
                                            </div>
                                        )
                                    })
                                }
                        </div>
                            
                        </div>
                       <CustomCaleder
                            redirectLink={"/panelist/scheduler"}
                            meetings={meetings}
                            config={{
                                mode:"daily"
                            }}
                        />
                    </div>
            </div>
        
        </div>
    )
}
export default Dashboard;


