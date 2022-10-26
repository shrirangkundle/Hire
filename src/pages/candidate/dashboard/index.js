import { useRef, useState } from "react";
import _ from "underscore";
import CustomCaleder from "../../../components/Calender";
import Icon from "../../../components/Icons";
import Box from "./Box";
import { Space, Table, Tag, DatePicker, message as messageF, Modal } from 'antd';
import moment from "moment";
import FormComponent from "../../../components/form";
import {
    FacebookShareCount,
    HatenaShareCount,
    OKShareCount,
    PinterestShareCount,
    RedditShareCount,
    TumblrShareCount,
    VKShareCount
  } from "react-share";

  import {
    EmailIcon,
    FacebookIcon,
    FacebookMessengerIcon,
    HatenaIcon,
    InstapaperIcon,
    LineIcon,
    LinkedinIcon,
    LivejournalIcon,
    MailruIcon,
    OKIcon,
    PinterestIcon,
    PocketIcon,
    RedditIcon,
    TelegramIcon,
    TumblrIcon,
    TwitterIcon,
    ViberIcon,
    VKIcon,
    WeiboIcon,
    WhatsappIcon,
    WorkplaceIcon
  } from "react-share";


  import {
    EmailShareButton,
    FacebookShareButton,
    HatenaShareButton,
    InstapaperShareButton,
    LineShareButton,
    LinkedinShareButton,
    LivejournalShareButton,
    MailruShareButton,
    OKShareButton,
    PinterestShareButton,
    PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    TumblrShareButton,
    TwitterShareButton,
    ViberShareButton,
    VKShareButton,
    WhatsappShareButton,
    WorkplaceShareButton,
    FacebookMessengerShareButton
  } from "react-share";
import PDFViewer from "./PDFViewer";
import Utils from "../../../Utils";

function Dashboard(props) {

    const [activeRange, setActiveRange] = useState('this_week')
    const [activeJobType, setActiveJobType] = useState('my_job')
    const [activeCalenderOption, setActiveCalenderOption] = useState('month')
    const inputFile = useRef()
    const [isModalVisible, setIsModalVisible] = useState(false);        
    const [resume, setResume] = useState('https://filesamples.com/samples/document/pdf/sample2.pdf')
    let userDetail = Utils.getUserDetail()
    if(userDetail && userDetail.userDetail) {
        userDetail = userDetail.userDetail
    }
    let candidateName = userDetail.firstName
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
          title: 'Role',
          dataIndex: 'role',
          key: 'role',
          width:180,
          render: (text, rec) => <div><div className="main-text">{text}</div> <div className="desc-text" style={{color:"#2888F6"}}>{rec.code}</div></div>,
        },
        {
            title: 'Company',
            dataIndex: 'company',
            key: 'company',
            render: (text,rec) => 
                  <div className="company-column">
                      <div className="company-logo"></div>
                      <div className="column-wrapper">
                          <div className="main-text">{text}</div>
                      </div>
                  </div>,
        },
        {
          title: 'Location / Type',
          dataIndex: 'address',
          key: 'address',
          render: (text, rec) => <div><div className="main-text">{"Banglore"}</div> <div className="desc-text">{"Full Time"}</div></div>,
        },
        {
          title: '',
          key: 'tags',
          dataIndex: 'tags',
          render: (_, { tags }) => (
            <>
              {
                <Tag className="tags-column" color={"blue"} key={"submit-column"}>
                    {"Apply"}
                </Tag>
              }
              {
                <Icon type={"share"} width={30} height={30} onClick={showModal}/>
              }
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
        {
            key: '4',
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
            key: '5',
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
            key: '6',
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
    
    const copyToClipboard = (value) => {
        var content = document.getElementById('url-to-copy');
        navigator.clipboard.writeText(value)
        .then(() => {
            messageF.success('URL Copied');
        })
        .catch(err => {
            messageF.error('Failed to Copy');
         })
    }
    const fileHandler = (info) => {
        //messageF.success(`${info.current.files[0].name} file uploaded successfully`);
        setResume(info.current.files[0])
    }

    const onUpload = (info) => {
        messageF.success(`${info.current.files[0].name} file uploaded successfully`);
    }

    const showModal = (e) => {
        e.preventDefault()
        setIsModalVisible(true);
      };
    
      const handleOk = (e) => {
        e.preventDefault()
        setIsModalVisible(false);
      };
    
      const handleCancel = (e) => {
        e.preventDefault()
        setIsModalVisible(false);
      };

    console.log("resume",resume)
    return (
        <div className="candidate-dashboard">

            <div className="c-dashboard-left-section">
                {/* <div className="welcome-text">Welcome back, {candidateName}!</div>
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
                                key: "Job offers this year",
                                value:"200",
                                icon:"suitcase"
                               
                            },
                            {
                                key: "Companies hiring",
                                value:"50",
                                icon:"company2"
                             
                            },
                            {
                                key: "New openings",
                                value:"500",
                                icon:"exclamation"
                            }
                        ]} 
                        template={"template-2"}
                    />
                </div>
                <div className="overveiw-box-wrapper">
                    <Box  data={[
                            {
                                key: "New candidates enrolled",
                                value:"2000",
                                icon:"candidates"
                            },
                            {
                                key: "Average salary offer",
                                value:"12.5",
                                unit:"lakhs",
                                icon:"rupee"
                            },
                            {
                                key: "Remote jobs",
                                value:"200",
                                icon:"desktop"
                            }
                        ]}  template={"template-2"}/>
                </div>
            </div>

            <div className="c-dashboard-right-section">
                <div className="form-wrapper">
                    <FormComponent 
                        config={{
                            title:["Interview Details"],
                            _order:{jobId:1, role:2, date: 3, join: 4},
                            jobId:{
                                label:"Job ID",
                                type:"text",
                                flex: true
                            },
                            role:{
                                label:"Role",
                                type:"text",
                                flex: true
                            },
                            date: {
                                label:"Date",
                                type:"date",
                                flex: true  
                            },
                            join: {
                                display:"Join",
                                type:"button",
                                className: "primary-button"  
                            }
                        }}
                    />
                </div>
            </div>

            <div className="table-wrapper">
            <div className="job-list-table">
                    <div className="table-title-wrapper">
                        <div className="table-title">Jobs Matching My Skills</div>
                    </div>
                    {/* <div className="table-header">
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
                    </div> */}
                    <Table columns={columns} dataSource={data}  pagination={false}/>
                </div>
               
            </div>
            <div className="pdf-wrapper">
               
              <PDFViewer resume={resume}/>
                <input accept="application/pdf" type={"file"} onChange={(e) => {e.preventDefault(); fileHandler(inputFile)}} ref={inputFile} style={{display:"none"}} />
                <div className="button-wrapper">
                    <div className="blue-button" onClick={(e) => {e.preventDefault(); inputFile.current.click()}}>Browse</div>
                    <div className="fill-blue-button" onClick={(e) => {e.preventDefault();onUpload(inputFile)}}><Icon type={"download-cloud"} width={25} height={25}/> Upload</div>
                </div>
            </div>
            <Modal title="Share to" className="share-to-popup" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}>
                <div className="copy-wrapper">
                    <div className="copy-button" onClick={() => copyToClipboard('https://ant.design/docs/react/introduce')}><Icon type={"copy"} width={15} height={15}/><span style={{marginLeft: 8}}>Copy</span></div>
                    <div className="url-section" id={"url-to-copy"}>https://ant.design/docs/react/introduce</div>
                </div>
                <WhatsappShareButton size={32} url={"https://ant.design/docs/react/introduce"} >
                    <WhatsappIcon size={32} round={true}/>
                </WhatsappShareButton>

                <FacebookShareButton size={32} url={"https://ant.design/docs/react/introduce"} >
                    <FacebookIcon size={32} round={true}/>
                </FacebookShareButton>

                <LinkedinShareButton size={32} url={"https://ant.design/docs/react/introduce"} >
                    <LinkedinIcon size={32} round={true}/>
                </LinkedinShareButton>

                <FacebookMessengerShareButton size={32} url={"https://ant.design/docs/react/introduce"} >
                    <FacebookMessengerIcon size={32} round={true}/>
                </FacebookMessengerShareButton>

                <TwitterShareButton url={"https://ant.design/docs/react/introduce"} >
                    <TwitterIcon size={32} round={true}/>
                </TwitterShareButton>

            </Modal>
        
        </div>
    )
}
export default Dashboard;


