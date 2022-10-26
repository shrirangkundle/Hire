import { useState } from "react";
import _ from "underscore";
import CustomCaleder from "../../../components/Calender";
import Icon from "../../../components/Icons";
import Box from "./Box";
import { Space, Table, Tag, DatePicker } from 'antd';
import moment from "moment";
import Utils from "../../../Utils";

function Dashboard(props) {

    const [activeRange, setActiveRange] = useState('this_week')
    const [activeJobType, setActiveJobType] = useState('my_job')
    const [activeCalenderOption, setActiveCalenderOption] = useState('month')
    let userDetail = Utils.getUserDetail()
    let recuiterName = ""
    if(userDetail && userDetail.userDetail){
        userDetail = userDetail.userDetail
        recuiterName = userDetail.firstName
    }
    
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
            display:"My Jobs"
        },
        {
            key: "all_jobs",
            value:"all_jobs",
            display:"All jobs"
        },
        {
            key: "priority_jobs",
            value:"priority_jobs",
            display:"Priority Jobs"
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
          render: (text, rec) => <div><div className="main-text">{text}</div> <div className="desc-text">{rec.code}</div></div>,
        },
        {
          title: 'Closing Date',
          dataIndex: 'address',
          key: 'address',
          render: (text) => <div>{moment().format("MMM/DD/YYYY")}</div>,
        },
        {
          title: <div><span style={{color:"#0086C9"}}>Uploaded</span> / <span style={{color:"#DC6803"}}>Shortlist</span> / <span style={{color:"#039855"}}>Selected</span> / <span tyle={{color:"#667085"}}>Submitted</span></div>,
          key: 'tags',
          dataIndex: 'tags',
          render: (_, { tags }) => (
            <>
              {tags.map((tag) => {
                  
                let color = '';
                if(tag == 100) {
                    color = 'blue'
                } else if(tag == 12) {
                    color = 'orange'
                } else if(tag == 3) {
                    color = 'green'
                } else {
                    color='lightGrey'
                }
      
                if (tag === 'loser') {
                  color = 'volcano';
                }
      
                return (
                  <Tag className="tags-column" color={color} key={tag}>
                    {tag}
                  </Tag>
                );
              })}
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
          code:"EF46299"
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
          code:"EF46299"
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
          code:"EF46299"
        },
      ];
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
                                key: "Incentives Accrued",
                                value:"₹1,280",
                                change_value:"10%",
                                arrow_dir:"direction-up"
                            },
                            {
                                key: "My Active Jobs",
                                value:"14",
                                change_value:"12%",
                                arrow_dir:"direction-up"
                            },
                            {
                                key: "Submissions",
                                value:"₹12",
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
                                key: "Submissions in Pipeline",
                                value:"4"
                            },
                            {
                                key: "Client interviews",
                                value:"5"
                            },
                            {
                                key: "Panelist interviews",
                                value:"12"
                            }
                        ]}  template={"template-2"}/>
                </div>
                <div className="overveiw-box-wrapper">
                    <Box  data={[
                            {
                                key: "Submission within Timeline",
                                value:"68%",
                                change_value:"10%",
                                arrow_dir:"direction-up"
                            },
                            {
                                key: "Panlist Success Rates",
                                value:"70%",
                                change_value:"12%",
                                arrow_dir:"direction-up"
                            },
                            {
                                key: "Client Success Rate",
                                value:"35%",
                                change_value:"1%",
                                arrow_dir:"direction-down"
                            }
                        ]}  template={"template-1"}/>
                </div>
                <div className="job-list-table">
                    <div className="table-title-wrapper">
                        <div className="table-title">Job List</div>
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


