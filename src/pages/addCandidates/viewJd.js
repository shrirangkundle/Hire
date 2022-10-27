import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import defaultCompanySvg from "../../assets/AddCandidate/companyLogo.svg";
import defaultOwnerImg from "../../assets/AddCandidate/ownerDefault.png";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineUser } from "react-icons/ai";
import { RiSuitcaseLine } from "react-icons/ri";
import hirePPBaseURl from "../../assets/envVar/baseUrl";
import addCandidateNew from "../../assets/AddCandidate/addCandidateIllustration.svg";
import Button from "react-bootstrap/esm/Button";
import "../../styles/jobdetails.css";
import TopBar from "../../components/TopBar";
import { Link } from "react-router-dom";
import {
  AiOutlineDelete,
  AiOutlineCalendar,
  AiOutlineClockCircle,
} from "react-icons/ai";
import aiLogo from "../../assets/viewJd/match.svg";
import { BiUserPlus } from "react-icons/bi";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Form from "react-bootstrap/Form";
import Pagination from "react-bootstrap/Pagination";
import { Modal } from "antd";
import WebUtils from "../../WebUtils";
import Utils from "../../Utils";
import eraseLocalStorage from "../../assets/eraseLocalStorage";
import SkillAddComponent from "../../components/viewJd/SkillWeightageModal";
import hirePPBaseURlScheduler from "../../assets/envVar/baseUrlScheduler";
import Alert from "react-bootstrap/Alert";
import AddMultipleCandidate from "./addMultipleCandidate";
// import "../../styles/addMultipleCandidate.css";

var JdHTML_text =
  '<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <title>Document</title> </head> <body> <h3>Loading</h3> </body></html>';

function ViewJd(props) {
  const [toggleStatus, setSidebarSatus] = useState("right");
  const [jobDescription, setJobDescription] = useState({});
  const [pagenationItemArr, setPagenationItemArr] = useState([]);
  const [candidateArr, setCandidateArr] = useState([]);
  const [createdDate, setCreatedDate] = useState("01-01-2011");
  const [dateOfJoining, setDateOfJoining] = useState("01-01-2022*");
  const [candidateDataFlag, setCandidateDataFlag] = useState(false);
  const [lgShow, setLgShow] = useState(false);
  const [currPage, setCurrPage] = useState(1);
  const [newPageSize, setNewPageSize] = useState(5);
  const [skillsCount, setSkillsCount] = useState(0);
  const [skillFlag, setSkillFlag] = useState(false);
  const [skillPresentArr, setSkillPresentArr] = useState([]);
  const [interviewDetails, setInterviewDetails] = useState({});
  const [prevSkillPercTotal, setPrevSkillPercTotal] = useState(100);
  const [jdHTML, setJdHTML] = useState(JdHTML_text);
  const [parsedJdModal, setParsedJdModal] = useState(false);
  const [modalShow, setModalShow] = useState(false);

  const [skillsRequired, setSkillsRequired] = useState([]);
  var jobId = window.location.pathname.split("/").pop();
  //
  const [loading, setLoading] = useState(false);
  const [visible, setVisible] = useState(false);
  const [visibleSkill, setVisibleSkill] = useState(false);
  const [interviewVisible, setInterviewVisible] = useState(false);
  const [skillChanged, setSkillChanged] = useState(true);
  const [interviewUserDetails, setInterviewUserDetails] = useState([
    { firstName: "", email: "" },
    { firstName: "", email: "" },
  ]);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertText, setShowAlertText] = useState("");
  var sliderVal = {
    certification: 0,
    jobTitle: 0,
    industries: 0,
    education: 0,
    skills: 0,
    managementLevel: 0,
  };

  var prevSliderValue = localStorage.getItem("prevSliderData");
  if (prevSliderValue !== null) {
    sliderVal = JSON.parse(prevSliderValue);
  }

  useEffect(() => {
    if (skillChanged === true) {
      jobDetailsFunc();
    }
  }, [visibleSkill]);

  const showModal = () => {
    setVisible(true);
  };

  const skillChangedFlag = () => {
    setSkillChanged(true);
  };

  const showSkillModal = () => {
    setVisibleSkill(true);
  };

  const showInterviewModal = (resumeId) => {
    fetchInterviewDetails(resumeId);
  };

  const showParsedJdModal = () => {
    setParsedJdModal(true);
  };
  const hideParsedJdModal = () => {
    setParsedJdModal(false);
  };

  const handleOk = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setVisible(false);
    }, 3000);
  };

  const handleCancel = () => {
    setVisible(false);
  };

  const HandleSkillCancel = () => {
    setVisibleSkill(false);
  };

  const HandleInterviewCancel = () => {
    setInterviewVisible(false);
  };
  //

  function reviewCandidateRedirect(resumeId) {
    if (skillPresentArr.length === 0) {
      setShowAlert(true);
      setShowAlertText("Please add skill before reviewing candidate");
      return;
    }
    window.location.href = `/candidateReview?jdId=${jobId}&resumeId=${resumeId}`;
  }

  function scheduleInterviewCandidateRedirect(resumeId) {
    let userDetail = Utils.getUserDetail();
    window.location.href = `/recuiter/admin?candidateId=${resumeId}&jdIdentifier=${jobId}&recruiterId=${userDetail.userIdentifier}`;
  }

  function dateStringGenerator(dateStr) {
    var strArr = dateStr.split("T");
    var interStr = strArr[0];
    var FinalArr = interStr.split("-");
    return FinalArr[2] + "-" + FinalArr[1] + "-" + FinalArr[0];
  }

  function timeStrGenerator(dateStr) {
    var strArr = dateStr.split("T");
    var interStr = strArr[1];
    var FinalArr = interStr.split(":");
    return FinalArr[0] + ":" + FinalArr[1];
  }

  function on() {
    document.getElementById("overlayAllJd").style.display = "block";
  }

  function off() {
    document.getElementById("overlayAllJd").style.display = "none";
  }

  const fetchInterviewDetails = (interviewDetailResumeId) => {
    WebUtils.httpOperations(
      `${hirePPBaseURlScheduler}slot/interviewDetails?jdIdentifier=${jobId}&candidateId=${interviewDetailResumeId}`,
      {},
      "GET"
    ).then(
      (response) => {
        setInterviewDetails(response.data.data);
        var candidateId = response.data.data.candidateId;
        var panelistId = response.data.data.panelistId;
        getInterviewUsersDetail(candidateId, panelistId);
        // setInterviewVisible(true);
      },
      (error) => error
    );
  };

  const getInterviewUsersDetail = (candidateId, panelistId) => {
    var userArr = [];
    userArr.push(candidateId, panelistId);
    let baseUrl = WebUtils.getBaseUrl();
    WebUtils.httpOperations(
      `${baseUrl}/accountmanager/api/v1/account/getUsersDetails`,
      userArr,
      "POST"
    ).then(
      (response) => {
        // getInterviewUsersDetail();
        setInterviewUserDetails(response.data.data);
        setInterviewVisible(true);
      },
      (error) => error
    );
  };

  const ActionBtn = (props) => {
    if (props.actionText == "REVIEW") {
      return (
        <div
          className="reviewStatus"
          onClick={() => reviewCandidateRedirect(props.resumeId)}
        >
          Review
        </div>
      );
    } else if (props.actionText == "SCHEDULE_INTERVIEW") {
      return (
        <div
          className="reviewStatus"
          onClick={() => scheduleInterviewCandidateRedirect(props.resumeId)}
        >
          Schedule Interview
        </div>
      );
    } else if (props.actionText == "INTERVIEW_DETAILS") {
      return (
        <div
          className="reviewStatus"
          onClick={() => showInterviewModal(props.resumeId)}
        >
          Interview Details
        </div>
      );
    } else {
      return <div className="reviewStatus">{props.actionText}</div>;
    }
  };

  const StateItem = (props) => {
    if (props.stateVal === "UPDATED_NEW") {
      return <div className="NEW">New</div>;
    } else if (props.stateVal === "AI_SCORED") {
      return <div className="AI_SCORED">AI Scored</div>;
    } else if (props.stateVal === "DROP_CANDIDATE") {
      return <div className="DROP_CANDIDATE">Dropped</div>;
    } else if (props.stateVal === "SHORTLISTED_FOR_INTERVIEW") {
      return <div className="SHORTLISTED_FOR_INTERVIEW">Shortlisted</div>;
    } else if (props.stateVal === "NEW") {
      return <div className="NEW">New</div>;
    } else if (props.stateVal === "INTERVIEW_SCHEDULED") {
      return (
        <div className="INTERVIEW_SCHEDULED">
          <p>Interview Scheduled</p>
        </div>
      );
    } else if (props.stateVal === "INTERVIEW_COMPLETED") {
      return (
        <div className="INTERVIEW_COMPLETED">
          <p>Interview Scheduled</p>
        </div>
      );
    } else if (props.stateVal === "SELECTED") {
      return (
        <div className="SELECTED">
          <p>Interview Scheduled</p>
        </div>
      );
    } else if (props.stateVal === "STAND_BY") {
      return (
        <div className="SELECTED">
          <p>Standby</p>
        </div>
      );
    } else if (props.stateVal === "SUBMITTED_TO_CLIENT") {
      return (
        <div className="SUBMITTED_TO_CLIENT">
          <p>Interview Scheduled</p>
        </div>
      );
    } else {
      return <div>{props.stateVal}</div>;
    }
  };

  //STAND_BY

  const jobDetailsFunc = () => {
    WebUtils.httpOperations(
      `${hirePPBaseURl}/jd/?jdId=${jobId}`,
      {},
      "GET"
    ).then(
      (response) => {
        setJobDescription(response.data.data);
        if (response.data.data.parsedJobData !== null) {
          setJdHTML(response.data.data.parsedJobData.parsedJdHtml);
        }

        if (response.data.data.interviewSkillDataList === null) {
          setSkillFlag(false);
        } else {
          var tempTotal = 0;
          var tempSkillArr = response.data.data.interviewSkillDataList;
          setSkillPresentArr(tempSkillArr);
          for (let i = 0; i < tempSkillArr; i++) {
            tempTotal = tempTotal + tempSkillArr[i].skillWeightage;
          }
          // setPrevSkillPercTotal(prevSkillPercTotal - tempTotal);
          setSkillFlag(true);
        }
        var updatedDate = dateStringGenerator(
          response.data.data.preferredJoiningDate
        );
        setDateOfJoining(updatedDate);
        setSkillChanged(false);
      },
      (error) => error
    );
  };

  const setCurrentPageFunc = (num) => {
    localStorage.setItem("currentResumePage", num);
    setCurrPage(num);
  };

  const candidateDetailsFunc = (currPage, pageSize) => {
    on();
    WebUtils.httpOperations(
      `${hirePPBaseURl}/resume/all?jdId=${jobId}&pageNumber=${currPage}&pageSize=${pageSize}`,
      {},
      "GET"
    ).then(
      (response) => {
        var candidateArr = response.data.data;
        if (candidateArr === null) {
          off();
        } else {
          off();
          setCandidateDataFlag(true);
          setCandidateArr(response.data.data);
        }
      },
      (error) => {
        off();
        console.log(error);
      }
    );
  };

  function resumeCounterFunc() {
    WebUtils.httpOperations(
      `${hirePPBaseURl}/resume/all/count?jdId=${jobId}`,
      {},
      "GET"
    ).then(
      (response) => {
        var count = response.data.data;

        var pageData = Math.ceil(count / newPageSize);
        // setPageCount(pageData);
        var storedCurrPage = Number(localStorage.getItem("currentResumePage"));
        if (storedCurrPage == 0) {
          storedCurrPage = 1;
        }
        let items = [];
        for (let number = 1; number <= pageData; number++) {
          items.push(
            <Pagination.Item
              key={number}
              active={number === storedCurrPage}
              onClick={() => setCurrentPageFunc(number)}
            >
              {number}
            </Pagination.Item>
          );
        }
        if (items.length > 1) {
          setPagenationItemArr(items);
        }
      },
      (error) => error
    );
  }

  const SkillChip = (props) => {
    return (
      <>
        <div className="newChip">
          {`${props.skillDetail.skillName} (${props.skillDetail.skillWeightage}%)`}
        </div>
      </>
    );
  };

  const SkillAbsent = () => {
    return (
      <>
        <div className="mt-5"></div>
        <Col md={12} className="d-flex justify-content-center">
          <p>Add weightage to your skills here</p>
        </Col>
        <div className="mt-4"></div>
        <Col md={12}>
          <div
            className="filterNavBtn"
            style={{ background: "#206DC5", color: "white" }}
            onClick={showSkillModal}
          >
            <span>+ Add Skill</span>
          </div>
        </Col>
      </>
    );
  };

  const SkillPresent = () => {
    return (
      <>
        {skillPresentArr.map((i, index) => {
          return (
            <Col key={index}>
              <SkillChip skillDetail={i} />
            </Col>
          );
        })}
      </>
    );
  };

  useEffect(() => {
    eraseLocalStorage();
    jobDetailsFunc();
    candidateDetailsFunc(0, 5);
    resumeCounterFunc();
    let userDetail = Utils.getUserDetail() || {};
  }, []);

  useEffect(() => {
    resumeCounterFunc();
    var storedCurrPage = Number(localStorage.getItem("currentResumePage"));
    if (storedCurrPage == 0) {
      storedCurrPage = 1;
    }
    candidateDetailsFunc(storedCurrPage - 1, newPageSize);
  }, [currPage, newPageSize]);

  function dateStringGenerator(dateStr) {
    var strArr = dateStr.split("T");
    var interStr = strArr[0];
    var FinalArr = interStr.split("-");
    var finalStr = FinalArr[2] + "-" + FinalArr[1] + "-" + FinalArr[0];
    // setCreatedDate(finalStr);
    return FinalArr[2] + "-" + FinalArr[1] + "-" + FinalArr[0];
  }

  const handleToggle = () => {
    if (toggleStatus == "left") {
      setSidebarSatus("right");
    } else {
      setSidebarSatus("left");
    }
  };

  const matchCandidateFunc = () => {
    on();
    var data = {
      positionTitlesMustHaveAnExactMatch: false,
      certifications: sliderVal["certification"],
      education: sliderVal["education"],
      jobTitles: sliderVal["jobTitle"],
      skills: sliderVal["skills"],
      industries: sliderVal["industries"],
      languages: 0,
      executiveType: 0,
      managementLevel: sliderVal["managementLevel"],
    };

    WebUtils.httpOperations(
      `${hirePPBaseURl}/jd/matchResume?jdId=${jobId}`,
      data,
      "POST"
    ).then(
      (response) => {
        off();
        setCandidateArr(response.data.data);
        setVisible(false);
      },
      (error) => {
        off();
        console.log(error);
      }
    );
  };

  var newSkillCount = 0;
  const SkillWeightageModal = (props) => {
    return (
      <>
        <Modal
          visible={props.showSkillModal}
          title="Skill Weightage"
          // onOk={handleOk}
          onCancel={HandleSkillCancel}
          width={650}
          footer={
            [
              // <Button key="back" variant="light" >
              //   Cancel
              // </Button>,
            ]
          }
        >
          <Row>
            <Col md={12} className="d-flex justify-content-center">
              <SkillAddComponent
                cancelBtn={HandleSkillCancel}
                jdIdentifier={jobId}
                skillChangeFlag={skillChangedFlag}
                prevData={skillPresentArr}
              />
            </Col>
          </Row>
        </Modal>
      </>
    );
  };

  const InterviewDetailsModal = (props) => {
    return (
      <>
        <Modal
          visible={interviewVisible}
          title="Interview Details"
          // onOk={handleOk}
          onCancel={HandleInterviewCancel}
          width={850}
          footer={
            [
              // <Button key="back" variant="light" onClick={HandleSkillCancel}>
              //   Cancel
              // </Button>,
            ]
          }
        >
          <Row>
            <Col md={12}>
              Job Role
              <div className="interviewDetailsBox">
                <RiSuitcaseLine size={20}></RiSuitcaseLine>
                {jobDescription.jdName}
              </div>
            </Col>

            <Col md={6}>
              Date
              <div className="interviewDetailsBox">
                <AiOutlineCalendar size={20}></AiOutlineCalendar>
                {interviewDetails.startTime
                  ? dateStringGenerator(interviewDetails.startTime)
                  : "TBD"}
              </div>
            </Col>
            <Col md={6}>
              Time
              <div className="interviewDetailsBox">
                <AiOutlineClockCircle size={20}></AiOutlineClockCircle>
                {interviewDetails.startTime
                  ? timeStrGenerator(interviewDetails.startTime)
                  : "TBD"}
              </div>
            </Col>
            <div className="mt-2"></div>
            <Col md={12}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col md={12}>
                      <h5>Panelist Details</h5>
                    </Col>

                    <Col md={6}>
                      Panelist Name
                      <div className="interviewDetailsBox">
                        {interviewUserDetails[1].firstName}
                      </div>
                    </Col>

                    <Col md={6}>
                      Panelist Email
                      <div className="interviewDetailsBox">
                        {interviewUserDetails[1].email}
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <div className="mt-2"></div>
            <Col md={12}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col md={12}>
                      <h5>Candidate Details</h5>
                    </Col>
                    <Col md={6}>
                      Candidate Name
                      <div className="interviewDetailsBox">
                        {interviewUserDetails[0].firstName}
                      </div>
                    </Col>
                    <Col md={6}>
                      Candidate Id
                      <div className="interviewDetailsBox">
                        {interviewUserDetails[0].email}
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <div className="mt-2"></div>
            <Col md={12}>
              <h6>Meeting Details</h6>
              <a
                href={`https://interview.dev.hireplusplus.com/system-checks?userRole=RECRUITER&interviewId=${interviewDetails.slotId}&userName=${interviewUserDetails[1].firstName}`}
              >
                <p>{`https://interview.dev.hireplusplus.com/system-checks?userRole=RECRUITER&interviewId=${interviewDetails.slotId}&userName=${interviewUserDetails[1].firstName}`}</p>
              </a>
            </Col>
          </Row>
        </Modal>
      </>
    );
  };

  const ParsedJdModal = (props) => {
    return (
      <>
        <Modal
          visible={parsedJdModal}
          title="Job Details"
          // onOk={handleOk}
          onCancel={hideParsedJdModal}
          width={850}
          footer={
            [
              // <Button key="back" variant="light" onClick={HandleSkillCancel}>
              //   Cancel
              // </Button>,
            ]
          }
        >
          <Row>
            <Col md={12}>
              <Card className="candidateOverflowCard">
                <Card.Body>
                  <Row>
                    <Col md={12}>
                      <div
                        className="content"
                        dangerouslySetInnerHTML={{
                          __html: jdHTML,
                        }}
                      ></div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Modal>
      </>
    );
  };

  const MatchCandidateModal = (props) => {
    return (
      <>
        <Modal
          visible={props.showModal}
          title="Run A.I Assesment"
          onOk={handleOk}
          onCancel={handleCancel}
          width={850}
          footer={[
            <Button key="back" variant="light" onClick={handleCancel}>
              Cancel
            </Button>,

            <Button onClick={matchCandidateFunc}>Run</Button>,
          ]}
        >
          <Row className="d-flex justify-content-center">
            <Col md={5}>
              <Row>
                <Col md={12} className="matchCandidateChip">
                  <Row style={{ marginTop: "5px", marginBottom: "5px" }}>
                    <Col md={12}>
                      <h5 className="matchCandidateText">Certifications</h5>
                    </Col>
                    <Col md={10}>
                      <input
                        type="range"
                        defaultValue={sliderVal["certification"]}
                        min="0"
                        max="100"
                        step="1"
                        className="progress matchCandidateRange"
                        onChange={(e) => {
                          // e.preventDefault();
                          // setSkillSlider(e.target.value);
                          sliderVal["certification"] = Number(e.target.value);
                        }}
                      />
                    </Col>
                    <Col md={2}>
                      {/* <div className="numContainer">
                        <h6>{skillSlider}</h6>
                      </div> */}
                    </Col>
                  </Row>
                  {/* <input
                    type="range"
                    // value={skillSlider}
                    min="0"
                    max="100"
                    step="1"
                    className="progress"
                    onChange={(e) => {
                      // e.preventDefault();
                      // setSkillSlider(e.target.value);
                      sliderVal["value"] = e.target.value;
                    }}
                  /> */}
                </Col>
                <Col md={12} className="matchCandidateChip matchCandidateAlt">
                  <Row style={{ marginTop: "5px", marginBottom: "5px" }}>
                    <Col md={12}>
                      <h5 className="matchCandidateText">Job Title</h5>
                    </Col>
                    <Col md={10}>
                      <input
                        defaultValue={0}
                        type="range"
                        // value={skillSlider}
                        min="0"
                        max="100"
                        step="1"
                        className="progress matchCandidateRange"
                        onChange={(e) => {
                          // e.preventDefault();
                          // setSkillSlider(e.target.value);
                          sliderVal["jobTitle"] = Number(e.target.value);
                        }}
                      />
                    </Col>
                    <Col md={2}>
                      {/* <div className="numContainer">
                        <h6>{skillSlider}</h6>
                      </div> */}
                    </Col>
                  </Row>
                  {/* <input
                    type="range"
                    // value={skillSlider}
                    min="0"
                    max="100"
                    step="1"
                    className="progress"
                    onChange={(e) => {
                      // e.preventDefault();
                      // setSkillSlider(e.target.value);
                      sliderVal["value"] = e.target.value;
                    }}
                  /> */}
                </Col>
                <Col md={12} className="matchCandidateChip">
                  <Row style={{ marginTop: "5px", marginBottom: "5px" }}>
                    <Col md={12}>
                      <h5 className="matchCandidateText">Industries</h5>
                    </Col>
                    <Col md={10}>
                      <input
                        defaultValue={0}
                        type="range"
                        // value={skillSlider}
                        min="0"
                        max="100"
                        step="1"
                        className="progress matchCandidateRange"
                        onChange={(e) => {
                          // e.preventDefault();
                          // setSkillSlider(e.target.value);
                          sliderVal["industries"] = Number(e.target.value);
                        }}
                      />
                    </Col>
                    <Col md={2}>
                      {/* <div className="numContainer">
                        <h6>{skillSlider}</h6>
                      </div> */}
                    </Col>
                  </Row>
                  {/* <input
                    type="range"
                    // value={skillSlider}
                    min="0"
                    max="100"
                    step="1"
                    className="progress"
                    onChange={(e) => {
                      // e.preventDefault();
                      // setSkillSlider(e.target.value);
                      sliderVal["value"] = e.target.value;
                    }}
                  /> */}
                </Col>
              </Row>
            </Col>
            <Col md={5} style={{ marginLeft: "15px" }}>
              <Row>
                <Col md={12} className="matchCandidateChip">
                  <Row style={{ marginTop: "5px", marginBottom: "5px" }}>
                    <Col md={12}>
                      <h5 className="matchCandidateText">Education</h5>
                    </Col>
                    <Col md={10}>
                      <input
                        defaultValue={0}
                        type="range"
                        // value={skillSlider}
                        min="0"
                        max="100"
                        step="1"
                        className="progress matchCandidateRange"
                        onChange={(e) => {
                          // e.preventDefault();
                          // setSkillSlider(e.target.value);
                          sliderVal["education"] = Number(e.target.value);
                        }}
                      />
                    </Col>
                    <Col md={2}>
                      {/* <div className="numContainer">
                        <h6>{skillSlider}</h6>
                      </div> */}
                    </Col>
                  </Row>
                  {/* <input
                    type="range"
                    // value={skillSlider}
                    min="0"
                    max="100"
                    step="1"
                    className="progress"
                    onChange={(e) => {
                      // e.preventDefault();
                      // setSkillSlider(e.target.value);
                      sliderVal["value"] = e.target.value;
                    }}
                  /> */}
                </Col>
                <Col md={12} className="matchCandidateChip matchCandidateAlt">
                  <Row style={{ marginTop: "5px", marginBottom: "5px" }}>
                    <Col md={12}>
                      <h5 className="matchCandidateText">Skills</h5>
                    </Col>
                    <Col md={10}>
                      <input
                        defaultValue={0}
                        type="range"
                        // value="0"
                        min="0"
                        max="100"
                        step="1"
                        className="progress matchCandidateRange"
                        onChange={(e) => {
                          // e.preventDefault();
                          // setSkillSlider(e.target.value);
                          sliderVal["skills"] = Number(e.target.value);
                        }}
                      />
                    </Col>
                    <Col md={2}>
                      {/* <div className="numContainer">
                        <h6>{skillSlider}</h6>
                      </div> */}
                    </Col>
                  </Row>
                  {/* <input
                    type="range"
                    // value={skillSlider}
                    min="0"
                    max="100"
                    step="1"
                    className="progress"
                    onChange={(e) => {
                      // e.preventDefault();
                      // setSkillSlider(e.target.value);
                      sliderVal["value"] = e.target.value;
                    }}
                  /> */}
                </Col>
                <Col md={12} className="matchCandidateChip">
                  <Row style={{ marginTop: "5px", marginBottom: "5px" }}>
                    <Col md={12}>
                      <h5 className="matchCandidateText">Management Level</h5>
                    </Col>
                    <Col md={10}>
                      <input
                        defaultValue={0}
                        type="range"
                        // value={skillSlider}
                        min="0"
                        max="100"
                        step="1"
                        className="progress matchCandidateRange"
                        onChange={(e) => {
                          // e.preventDefault();
                          // setSkillSlider(e.target.value);
                          sliderVal["managementLevel"] = Number(e.target.value);
                        }}
                      />
                    </Col>
                    <Col md={2}>
                      {/* <div className="numContainer">
                        <h6>{skillSlider}</h6>
                      </div> */}
                    </Col>
                  </Row>
                  {/* <input
                    type="range"
                    // value={skillSlider}
                    min="0"
                    max="100"
                    step="1"
                    className="progress"
                    onChange={(e) => {
                      // e.preventDefault();
                      // setSkillSlider(e.target.value);
                      sliderVal["value"] = e.target.value;
                    }}
                  /> */}
                </Col>
              </Row>
            </Col>
          </Row>
        </Modal>
      </>
    );
  };

  const NoCandidateAdded = () => {
    return (
      <>
        <Container fluid className="hire_bulk_container mt-2">
          <Col md={12} className="d-flex justify-content-center">
            <img src={addCandidateNew} style={{ height: "100px" }} alt="" />
          </Col>
          <Col md={12} className="d-flex justify-content-center">
            <h2 className="mb-2">Start adding candidates</h2>
          </Col>
          <Col md={12} className="d-flex justify-content-center">
            <p style={{ color: "#667085" }}>
              You will see list after adding your candidates
            </p>
          </Col>
          <Row className="p-3 pt-1 m-auto  w-75 ">
            <Col
              sm={12}
              md={6}
              className=" m-auto hire_bulk_col_bulk  "
              style={{ width: "47%" }}
            >
              <Card className="w-100 m-auto pt-4 pb-4 hire_bulk_col_card ">
                <Card.Body className="pl-4 pr-4">
                  {/* <Card.Title className="fs-3 fw-semibold">
                    
                  </Card.Title> */}
                  <h4>Upload in Bulk</h4>
                  <Card.Text className="fs-6" style={{ color: "#667085" }}>
                    we support <span className="fw-bold">.zip files </span> only
                  </Card.Text>
                  <Button
                    onClick={() => setModalShow(true)}
                    variant=" w-100 fs-5  mt-1"
                    className="hire_bulk_button_multiple"
                  >
                    <svg
                      width="28"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      className="mr-3 mb-1"
                    >
                      <path
                        d="M11.5806 13.1093C11.0916 12.7681 10.569 12.4901 10.0224 12.2777C10.7495 11.6168 11.2318 10.6911 11.3157 9.6547C12.4183 8.58032 13.8636 7.99134 15.413 7.99134C16.6226 7.99134 17.7839 8.35556 18.7718 9.0445C19.1258 9.29138 19.6125 9.20471 19.8594 8.85071C20.1062 8.49686 20.0195 8.00995 19.6656 7.76322C19.1766 7.42203 18.6538 7.14417 18.1073 6.93161C18.9096 6.20239 19.414 5.15091 19.414 3.98392C19.414 1.78711 17.6269 0 15.4301 0C13.2334 0 11.4463 1.78711 11.4463 3.98392C11.4463 5.14618 11.9467 6.19385 12.7435 6.92276C12.6344 6.96472 12.5259 7.00913 12.4185 7.05643C11.9296 7.27158 11.47 7.53617 11.0426 7.84683C10.4531 6.38245 9.01805 5.34607 7.34523 5.34607C5.14857 5.34607 3.36131 7.13318 3.36131 9.32984C3.36131 10.4889 3.8589 11.5337 4.65144 12.2623C2.53245 13.0562 0.814308 14.7614 0.114845 16.936C-0.117089 17.6572 0.0057444 18.4219 0.451912 19.0343C0.898079 19.6465 1.58839 19.9976 2.34583 19.9976H9.14195C9.57331 19.9976 9.92305 19.6478 9.92305 19.2163C9.92305 18.7849 9.57331 18.4352 9.14195 18.4352H2.34583C2.0933 18.4352 1.8632 18.3182 1.71442 18.114C1.56565 17.9099 1.52476 17.6549 1.60197 17.4144C2.37406 15.0139 4.7288 13.3374 7.32814 13.3374C8.53755 13.3374 9.69905 13.7016 10.6869 14.3906C11.0408 14.6375 11.5277 14.5506 11.7745 14.1968C12.0213 13.8429 11.9346 13.356 11.5806 13.1093V13.1093ZM15.4301 1.56235C16.7654 1.56235 17.8517 2.64862 17.8517 3.98392C17.8517 5.31906 16.7654 6.40549 15.4301 6.40549C14.095 6.40549 13.0085 5.31906 13.0085 3.98392C13.0085 2.64862 14.095 1.56235 15.4301 1.56235ZM7.34523 6.90827C8.68052 6.90827 9.7668 7.99469 9.7668 9.32984C9.7668 10.6651 8.68052 11.7514 7.34523 11.7514C6.00993 11.7514 4.92365 10.6651 4.92365 9.32984C4.92365 7.99469 6.00993 6.90827 7.34523 6.90827V6.90827ZM20 16.2871C20 16.7184 19.6502 17.0682 19.2187 17.0682H17.0706V19.2163C17.0706 19.6478 16.7208 19.9976 16.2895 19.9976C15.858 19.9976 15.5082 19.6478 15.5082 19.2163V17.0682H13.3601C12.9287 17.0682 12.579 16.7184 12.579 16.2871C12.579 15.8556 12.9287 15.5058 13.3601 15.5058H15.5082V13.3577C15.5082 12.9263 15.858 12.5766 16.2895 12.5766C16.7208 12.5766 17.0706 12.9263 17.0706 13.3577V15.5058H19.2187C19.6502 15.5058 20 15.8556 20 16.2871V16.2871Z"
                        fill="white"
                      />
                    </svg>
                    Add Multiple Candidates
                  </Button>
                </Card.Body>
              </Card>
            </Col>
            <Col
              sm={12}
              md={6}
              className="m-auto  hire_bulk_col_bulk"
              style={{ width: "47%" }}
            >
              <Card className="w-100 m-auto pt-4 pb-4 hire_bulk_col_card">
                <Card.Body className="pl-4 pr-4">
                  {/* <Card.Title className="fs-3 fw-semibold">
                    Upload 1 Resume
                  </Card.Title> */}
                  <h4>Upload 1 Resume</h4>
                  <Card.Text className="fs-6" style={{ color: "#667085" }}>
                    we support{" "}
                    <span className="fw-bold">.pdf, .doc, and more</span>
                  </Card.Text>
                  <Link to={`/addCandidate/${jobId}`}>
                    <Button
                      variant=" w-100 fs-5  mt-1"
                      className="hire_bulk_button_single"
                    >
                      <svg
                        width="25"
                        height="20"
                        viewBox="0 0 25 20"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="mr-3 mb-1"
                      >
                        <path
                          d="M16.5 19V17C16.5 15.9391 16.0786 14.9217 15.3284 14.1716C14.5783 13.4214 13.5609 13 12.5 13H5.5C4.43913 13 3.42172 13.4214 2.67157 14.1716C1.92143 14.9217 1.5 15.9391 1.5 17V19M20.5 6V12M23.5 9H17.5M13 5C13 7.20914 11.2091 9 9 9C6.79086 9 5 7.20914 5 5C5 2.79086 6.79086 1 9 1C11.2091 1 13 2.79086 13 5Z"
                          stroke="#344054"
                          stroke-width="2"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                        />
                      </svg>
                      Add Single Candidate
                    </Button>
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
        <AddMultipleCandidate
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
      </>
    );
  };
  const CandidateDataPresent = () => {
    return (
      <>
        <MatchCandidateModal showModal={visible} />
        <div className="mt-3"></div>
        <Card>
          <Card.Body>
            <Row>
              <Col md={5}>
                <h6>Candidates</h6>
                <span>Out of 200 resumes, here are shortlisted candidates</span>
              </Col>
              <Col md={1}>
                <div className="filterNavBtn">
                  <AiOutlineDelete />
                </div>
              </Col>
              <Col md={3}>
                {" "}
                <Link to={`/addCandidate/${jobId}`}>
                  <div className="filterNavBtn">
                    <BiUserPlus />
                    <span>Add Candidates</span>
                  </div>
                </Link>
              </Col>
              {/* <Col md={2}>
                {" "}
                <div
                  className="filterNavBtn"
                  style={{ background: "#206DC5", color: "white" }}
                  // onClick={() => setLgShow(true)}
                  onClick={showModal}
                >
                  <img src={aiLogo} alt="" /> <span>Run Ai Assesment</span>
                </div>
              </Col> */}
              <Col md={3}>
                {" "}
                <div
                  className="filterNavBtn"
                  style={{ background: "#206DC5", color: "white" }}
                  onClick={showModal}
                >
                  <img src={aiLogo} alt="" /> <span>Run Ai Assesment</span>
                </div>
              </Col>
            </Row>

            {/* <Modal
              size="lg"
              show={true}
              onHide={() => setLgShow(false)}
              backdrop="static"
              keyboard={false}
              aria-labelledby="example-modal-sizes-title-lg"
            >
              <Modal.Header closeButton>
                <Modal.Title id="example-modal-sizes-title-lg">
                  <h5>Run Ai Assesment</h5>
                </Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <Row>
                  <Col md={5}>
                    <p>Certifications</p>
                    <Form.Range
                      value={skillSlider}
                      onChange={(e) => setSkillSlider(e.target.value)}
                    />

                    <input
                      type="range"
                      value={skillSlider}
                      min="0"
                      max="100"
                      step="1"
                      className="progress"
                      onChange={(e) => {
                        e.preventDefault();
                        setSkillSlider(e.target.value);
                      }}
                    />
                    <span>{skillSlider}</span>
                  </Col>
                </Row>
              </Modal.Body>
            </Modal> */}

            {/* <Modal
              visible={visible}
              title="Title"
              onOk={handleOk}
              onCancel={handleCancel}
              footer={[
                <Button key="back" onClick={handleCancel}>
                  Close
                </Button>,
              ]}
            >
              <input
                type="range"
                value={skillSlider}
                min="0"
                max="100"
                step="1"
                className="progress"
                onChange={(e) => setSkillSlider(e.target.value)}
              />
            </Modal> */}

            {/* <Button type="primary" onClick={showModal}>
              Open Modal with customized footer
            </Button> */}
          </Card.Body>
        </Card>
        <div className="mt-3"></div>
        <Card>
          <Card.Body>
            <Row>
              <Col md={7} className="d-flex align-items-center">
                <ButtonGroup
                  aria-label="Basic example"
                  className="candidateFilterBtn"
                >
                  <Button variant="light" size="sm">
                    View All
                  </Button>
                  <Button variant="light" size="sm">
                    New
                  </Button>
                  <Button variant="light" size="sm">
                    Shortlisted
                  </Button>
                  <Button variant="light" size="sm">
                    Selected
                  </Button>
                </ButtonGroup>
              </Col>
              <Col md={3}>
                <Row>
                  <Col md={12}>
                    <Form.Control
                      size="sm"
                      type="text"
                      placeholder="Search for Candidates"
                    />
                  </Col>
                </Row>
              </Col>
              <Col md={2}>
                <Button variant="outline-secondary" size="sm">
                  Filters
                </Button>
              </Col>
            </Row>
          </Card.Body>
        </Card>

        <Card id="jdIndexCard">
          <Row>
            <Col sm={1} className="d-flex justify-content-center">
              {/* <input type="checkbox" /> */}
            </Col>
            <Col
              sm={2}
              className="d-flex align-items-center"
              style={{ paddingLeft: "20px" }}
            >
              <p>Name</p>
            </Col>
            <Col sm={2} style={{ paddingLeft: "20px" }}>
              <p>email</p>
            </Col>
            <Col sm={1} className="d-flex align-items-center ">
              <p>Phone</p>
            </Col>
            <Col md={2} className="d-flex justify-content-center">
              <p>Status</p>
            </Col>

            <Col sm={1} className="d-flex  align-items-center ">
              <p>CV Score</p>
            </Col>
            <Col sm={1} className="d-flex  align-items-center ">
              <p>Compatibality</p>
            </Col>
            {/* <Col
              sm={1}
              className="d-flex justify-content-center align-items-center"
            >
              <p>Status</p>
            </Col>
            <Col md={2}></Col> */}
          </Row>
        </Card>
        <Row className="d-flex justify-content-center">
          {candidateArr.map((item, index) => {
            return (
              <Card
                style={{
                  width: "98%",
                  marginTop: "5px",
                  paddingTop: "3px",
                  paddingBottom: "3px",
                }}
                key={index}
              >
                <Row>
                  <Col
                    md={1}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <input type="checkbox" />
                  </Col>
                  <Col md={2}>
                    <Row>
                      <Col md={12}>
                        <span style={{ fontSize: "14px", fontWeight: "600" }}>
                          {`${item.firstName} ${item.lastName}`}
                          {/* {`${item.fullName}`} */}
                        </span>
                      </Col>
                      <Col md={12}>
                        <span style={{ fontSize: "11px" }}>
                          {item.resumeIdentifier}
                        </span>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={2} className="d-flex align-items-center">
                    {item.emailId}
                  </Col>
                  <Col md={1} className="d-flex align-items-center">
                    {item.mobileNumber}
                  </Col>
                  <Col
                    md={2}
                    className="d-flex justify-content-center align-items-center"
                  >
                    {/* <div className={`${item.resumeState}`}>
                      {item.resumeState}
                    </div> */}
                    <StateItem stateVal={item.resumeState}></StateItem>
                  </Col>

                  <Col
                    md={1}
                    className="d-flex justify-content-center align-items-center"
                  >
                    {item.resumeScore ? item.resumeScore : "NA"}
                  </Col>
                  <Col
                    md={1}
                    className="d-flex justify-content-center align-items-center"
                  >
                    {item.reverseCompatibilityScore
                      ? item.reverseCompatibilityScore
                      : "NA"}
                  </Col>
                  <Col
                    md={2}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <ActionBtn
                      actionText={item.resumeAction}
                      resumeId={item.resumeIdentifier}
                    ></ActionBtn>
                    {/* <div className="reviewStatus">{}</div> */}
                  </Col>
                </Row>
              </Card>
            );
          })}
        </Row>
        <div className="mt-2"></div>
        <Row>
          <Col md={12} className="d-flex justify-content-center">
            <Pagination size="sm">{pagenationItemArr}</Pagination>
          </Col>
        </Row>
      </>
    );
  };
  return (
    <div className="hirePlusPlusPageContent">
      <Sidebar toggleStatus={toggleStatus} toggleHandle={handleToggle} />
      <div
        style={{
          width: toggleStatus == "left" ? "100%" : "86%",
          height: "100vh",
          overflowY: "auto",
          transition: "all 0.3s",
        }}
      >
        <InterviewDetailsModal />
        <ParsedJdModal />
        <SkillWeightageModal showSkillModal={visibleSkill} />
        <TopBar pageName="Initial Details" />
        <div id="overlayAllJd">
          <div id="loaderPos">Loading...</div>
          {/* <Spinner id="loaderPos" animation="border" variant="light" /> */}
        </div>
        <div className="hirePlusPlusPageContainer">
          <Row>
            <Alert
              show={showAlert}
              variant="danger"
              onClose={() => setShowAlert(false)}
              dismissible
            >
              {showAlertText}
            </Alert>
            <Col md={9}>
              <Card id="jobDetailsCard">
                <Card.Body>
                  <Row>
                    <Col md={12}>
                      <Row>
                        <Col md={6}>
                          <h2 className="jobDetailCardFont">
                            {jobDescription.jdName}
                          </h2>
                          {/* <div className="mt-1"></div> */}
                          <p className="jobDetailCardFont">{jobId}</p>
                        </Col>
                        <Col md={6} className="d-flex justify-content-end">
                          <Row>
                            <Col className="d-flex justify-content-end align-items-start">
                              <img
                                src={defaultCompanySvg}
                                alt=""
                                style={{ width: "50px" }}
                              />
                            </Col>
                            <Col>
                              <Row>
                                <Col
                                  md={12}
                                  className="d-flex align-items-center"
                                >
                                  <h5 className="jobDetailCardFont">
                                    {jobDescription.clientName}
                                  </h5>
                                </Col>
                                <Col
                                  md={12}
                                  className="d-flex align-items-center"
                                >
                                  <p className="jobDetailCardFont">
                                    {`Hiring Manager : ${jobDescription.hiringDetails}`}
                                  </p>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    <div className="mt-4"></div>
                    <Col md={12}>
                      <img src={defaultOwnerImg} className="ownerLeft" />
                      <div className="ownerRight jobDetailCardFont">
                        {`Owner: ${jobDescription.hiringDetails}`}
                      </div>
                    </Col>
                    <div className="mt-4"></div>
                    <Col md={12}>
                      <Row>
                        <Col md={4}>
                          <div className="ownerLeft">
                            <HiOutlineLocationMarker
                              size={20}
                              color={"white"}
                            ></HiOutlineLocationMarker>
                          </div>
                          <div className="ownerRight">
                            <p className="jobDetailCardFont">
                              {`Location: ${jobDescription.jobLocation}`}
                            </p>
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className="ownerLeft">
                            <AiOutlineUser
                              size={20}
                              color={"white"}
                            ></AiOutlineUser>
                          </div>
                          <div className="ownerRight">
                            <p className="jobDetailCardFont">{`Openings: ${jobDescription.numberOfOpenings}`}</p>
                          </div>
                        </Col>
                        <Col md={4} className="d-flex justify-content-center">
                          <div className="ownerLeft">
                            <RiSuitcaseLine
                              size={20}
                              color={"white"}
                            ></RiSuitcaseLine>
                          </div>
                          <div className="ownerRight">
                            <p className="jobDetailCardFont">
                              {`Employment Type: ${jobDescription.jobEngagementType}`}
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                    {/* <Col md={4}></Col>
                    <Col md={4}></Col> */}

                    <Col md={12} className="d-flex justify-content-end">
                      <div
                        className="jobDetailCardFont viewJdSeeAll"
                        onClick={() => setParsedJdModal(true)}
                      >
                        {`See All >>`}
                      </div>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
            <Col md={3}>
              <Card style={{ height: "100%", borderRadius: "10px" }}>
                <Card.Body>
                  <Row style={{ height: "90%", overflowY: "scroll" }}>
                    <Col md={12} className="d-flex justify-content-center">
                      <h4>Skill(Skill Weightage %)</h4>
                    </Col>
                    {/* <SkillAbsent /> */}

                    {skillFlag ? <SkillPresent /> : <SkillAbsent />}
                    <div className="mt-4"></div>
                  </Row>
                  {skillFlag ? (
                    <Row className="bottomPlacement">
                      <Col
                        md={6}
                        className="d-flex justify-content-center"
                        onClick={showSkillModal}
                        style={{ cursor: "pointer" }}
                      >
                        + Add Skills
                      </Col>
                      <Col
                        md={6}
                        className="d-flex justify-content-center"
                        style={{ cursor: "pointer" }}
                        onClick={showSkillModal}
                      >
                        View All
                      </Col>
                    </Row>
                  ) : (
                    <div></div>
                  )}
                </Card.Body>
              </Card>
            </Col>
          </Row>

          {candidateDataFlag ? <CandidateDataPresent /> : <NoCandidateAdded />}
        </div>
      </div>
    </div>
  );
}
export default ViewJd;
