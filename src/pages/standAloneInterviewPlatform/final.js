import { Fragment, useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import Sidebar from "../../components/sideBarStandalone";
import TopBar from "../../components/TopBar";
import { Card } from "antd";
import Form from "react-bootstrap/Form";
import "../../styles/standAloneInterview.css";
import { AiOutlineDelete } from "react-icons/ai";
import Alert from "react-bootstrap/Alert";
import WebUtils from "../../WebUtils";
import { Modal } from "antd";
import hirePPBaseURl from "../../assets/envVar/baseUrlInterview";

function NewAllJd(props) {
  const [toggleStatus, setSidebarSatus] = useState("left");
  var prevData = JSON.parse(localStorage.getItem("finalStandAloneDataObj"));
  const [hirePPDataObj, setDataObj] = useState(prevData);
  const [finalQuesCount, setFinalQuesCount] = useState(0);
  const [finalSkillArr, setFinalSkillArr] = useState(
    hirePPDataObj.interviewSkillArr
  );
  const [currSkillSelected, setCurrSkillSelected] = useState("none");
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertText, setShowAlertText] = useState("");
  // const [currQues, setCurrQues] = useState({});
  const [currSkillIndex, setCurrSkillindex] = useState(0);
  const [currSkillQuesArr, setCurrSkillQuesArr] = useState([]);
  const [addQuesFlag, setAddQuesFlag] = useState(false);
  const [visible, setVisible] = useState(false);
  const [responseData, setResponseData] = useState({});

  var currQues = {
    // question: "",
    // modelAnswer: "",
    // difficultyLevel: "",
    // answerRating: 0,
  };

  var FormData = require("form-data");
  var finalFormDataObj = new FormData();
  function on() {
    document.getElementById("overlayAllJd").style.display = "block";
  }

  function off() {
    document.getElementById("overlayAllJd").style.display = "none";
  }

  const showSuccessModal = () => {
    setVisible(true);
  };

  const hideSuccessmodal = () => {
    setVisible(false);
  };
  const addQuesFunc = () => {
    var tempObj = hirePPDataObj.interviewSkillArr;
    tempObj[currSkillIndex].suggestedQuestionList = currSkillQuesArr;
    setDataObj((prevState) => ({
      ...prevState,
      interviewSkillArr: tempObj,
    }));
  };

  const startAddingQues = () => {
    if (currSkillSelected === "none") {
      setShowAlert(true);
      setShowAlertText("Please select a skill to add questions.");
      setTimeout(() => {
        setShowAlert(false);
        setShowAlertText("");
      }, 1000);
      return;
    }

    setAddQuesFlag(true);
  };

  const currSkillSelection = (index) => {
    setCurrSkillindex(index);
    var tempArr = finalSkillArr;
    // var skillArr = tempArr.filter((obj) => {
    //   return obj.skillName === currSkillSelected;
    // });
    setCurrSkillQuesArr(finalSkillArr[index].suggestedQuestionList);
  };

  const finalSubmitData = () => {
    var finalObj = {};
    var usersArr = [];

    usersArr.push({
      email: hirePPDataObj.candidateEmail,
      mobile: hirePPDataObj.candidateContactNum,
      userRole: "CANDIDATE",
      firstName: hirePPDataObj.candidateFn,
      lastName: hirePPDataObj.candidateLn,
    });
    usersArr.push({
      email: hirePPDataObj.recruiterEmail,
      mobile: hirePPDataObj.recruiterContactNum,
      userRole: "RECRUITER",
      firstName: hirePPDataObj.recruiterFn,
      lastName: hirePPDataObj.recruiterLn,
    });
    usersArr.push({
      email: hirePPDataObj.interviewerEmail,
      mobile: hirePPDataObj.interviewerContactNum,
      userRole: "PANELIST",
      firstName: hirePPDataObj.interviewerFn,
      lastName: hirePPDataObj.interviewerLn,
    });
    finalObj["userInfoList"] = usersArr;
    finalObj["clientName"] = hirePPDataObj.companyName;
    finalObj["jdSkillDataList"] = hirePPDataObj.interviewSkillArr;

    var interviewInfo = {};
    interviewInfo["timeZone"] = hirePPDataObj.interviewTimeZone;
    interviewInfo["interviewDate"] = hirePPDataObj.interviewDate;
    interviewInfo["interviewStartTime"] = hirePPDataObj.interviewStartTime;
    interviewInfo["interviewEndTime"] = hirePPDataObj.interviewEndTime;

    finalObj["interviewInfo"] = interviewInfo;
    finalObj["jdTitle"] = hirePPDataObj.jobTitle;
    finalFormDataObj.append("standAloneRequestBody", JSON.stringify(finalObj));

    var resumeLocal = localStorage.getItem("resumeFile");
    var jdLocal = localStorage.getItem("jdFile");
    on();
    fetch(resumeLocal)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "resume.pdf");
        finalFormDataObj.append("resumeFile", file);
      });

    fetch(jdLocal)
      .then((res) => res.blob())
      .then((blob) => {
        const file = new File([blob], "jd.pdf");
        finalFormDataObj.append("jdFile", file);
        WebUtils.httpOperations(
          `${hirePPBaseURl}/report/standAlone/createRoom`,
          finalFormDataObj,
          "POST"
        ).then(
          (response) => {
            off();
            showSuccessModal();
            setResponseData(response.data.data);
            localStorage.removeItem("finalStandAloneDataObj");
          },
          (error) => {
            off();
            console.log(error);
          }
        );
      });
  };

  const NoQuesAdded = () => {
    return (
      <Row>
        <Alert
          show={showAlert}
          variant="danger"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {showAlertText}
        </Alert>

        <Col md={12} className="d-flex justify-content-center">
          <h4 style={{ color: "#667085" }}>
            Please Add your Question and Answers here
          </h4>
        </Col>
        <Col md={12}>
          <p>{`Skill selected : ${currSkillSelected}`}</p>
        </Col>
        <Col md={12} className="d-flex justify-content-center">
          <div className="addQues" onClick={startAddingQues}>
            + Add question
          </div>
        </Col>
      </Row>
    );
  };

  const QuesAdded = () => {
    return (
      <>
        <Row>
          <Col md={12}>Select mandatory ques that you want to ask</Col>

          {currSkillQuesArr.map((c, index) => {
            return (
              <>
                <Col md={12} className="quesBodyFinal">
                  <div className="mt-3"></div>
                  <Row>
                    <Col md={8}>
                      <div className="form-group">
                        <textarea
                          type="text"
                          rows={2}
                          className="form-control form-control-md jobDescriptionText"
                          placeholder="Enter your questions here"
                          value={currSkillQuesArr[index].question}
                          // onChange={(e) =>
                          //   setCurrSkillQuesArr((prevState) => ({
                          //     ...prevState,
                          //     recruiterFn: e.target.value,
                          //   }))
                          // }
                        />
                      </div>
                    </Col>
                    <Col
                      md={4}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <Form.Group>
                        <Form.Select
                          value={currSkillQuesArr[index].difficultyLevel}
                          // onChange={(e) =>
                          //   setCurrQues((prevState) => ({
                          //     ...prevState,
                          //     difficultyLevel: e.target.value,
                          //   }))
                          // }
                          required
                        >
                          <option value="Easy">Easy</option>
                          <option value="Medium">Medium</option>

                          <option value="Hard">Hard</option>
                        </Form.Select>
                      </Form.Group>
                    </Col>
                  </Row>
                  <Row>
                    <Col md={8}>
                      <div className="form-group">
                        <textarea
                          type="text"
                          rows={2}
                          className="form-control form-control-md jobDescriptionText"
                          placeholder="Enter your answer here"
                          value={currSkillQuesArr[index].modelAnswer}
                          // onChange={(e) =>
                          //   setCurrQues((prevState) => ({
                          //     ...prevState,
                          //     modelAnswer: e.target.value,
                          //   }))
                          // }
                        />
                      </div>
                    </Col>
                    <Col
                      md={4}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <div
                        className="filterNavBtn"
                        style={{ width: "6vw" }}
                        onClick={() => {
                          handleDelete(index);
                        }}
                      >
                        <AiOutlineDelete />
                      </div>
                    </Col>
                  </Row>
                </Col>
              </>
            );
          })}
        </Row>
        <Row>
          <Col md={12} className="quesBodyFinal">
            <div className="mt-3"></div>
            <Row>
              <Col md={8}>
                <div className="form-group">
                  <textarea
                    type="text"
                    rows={2}
                    className="form-control form-control-md jobDescriptionText"
                    placeholder="Enter your questions here"
                    value={currQues.question}
                    onChange={(e) => {
                      // setCurrQues((prevState) => ({
                      //   ...prevState,
                      //   question: e.target.value,
                      // }));
                      currQues.question = e.target.value;
                    }}
                  />
                </div>
              </Col>
              <Col
                md={4}
                className="d-flex justify-content-center align-items-center"
              >
                <Form.Group>
                  <Form.Select
                    value={currQues.difficultyLevel}
                    onChange={(e) =>
                      // setCurrQues((prevState) => ({
                      //   ...prevState,
                      //   difficultyLevel: e.target.value,
                      // }))

                      (currQues.difficultyLevel = e.target.value)
                    }
                  >
                    <option value="1">Easy</option>
                    <option value="2">Moderate</option>

                    <option value="3">Hard</option>
                  </Form.Select>
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={8}>
                <div className="form-group">
                  <textarea
                    type="text"
                    rows={2}
                    className="form-control form-control-md jobDescriptionText"
                    placeholder="Enter your answer here"
                    value={currQues.modelAnswer}
                    onChange={(e) =>
                      // setCurrQues((prevState) => ({
                      //   ...prevState,
                      //   modelAnswer: e.target.value,
                      // }))
                      (currQues.modelAnswer = e.target.value)
                    }
                  />
                </div>
              </Col>
              <Col
                md={4}
                className="d-flex justify-content-center align-items-center"
              >
                <div
                  className="quesAddBtn"
                  onClick={() => {
                    if (
                      currQues.question === undefined ||
                      currQues.modelAnswer === undefined
                    ) {
                      setShowAlert(true);
                      setShowAlertText("Please Complete the question");
                      return;
                    }

                    if (currQues.difficultyLevel === undefined) {
                      currQues.difficultyLevel = "Easy";
                    }
                    currQues.answerRating = 0;

                    var tempArr = currSkillQuesArr;
                    tempArr.push(currQues);
                    setCurrSkillQuesArr(tempArr);

                    currQues = {};
                    addQuesFunc();
                  }}
                >
                  + Add question
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      </>
    );
  };

  const handleDelete = (index) => {
    var dupliSkillArr = currSkillQuesArr;
    dupliSkillArr.splice(index, 1);
    setCurrSkillQuesArr(dupliSkillArr);
  };

  const SuccessModal = (props) => {
    return (
      <>
        <Modal
          visible={props.showModal}
          title="Success"
          onCancel={hideSuccessmodal}
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
            <Col md={12}>
              <h6>{`Interview Room has been created with Id: ${responseData.interviewId}`}</h6>
            </Col>
          </Row>
        </Modal>
      </>
    );
  };

  return (
    <div className="hirePlusPlusPageContent">
      <SuccessModal showModal={visible} />
      <Sidebar toggleStatus="left" />
      <div
        style={{
          width: "100%",
          height: "100vh",
          overflowY: "auto",
          transition: "all 0.3s",
        }}
      >
        <TopBar />
        <div id="overlayAllJd">
          <div id="loaderPos">Loading...</div>
          {/* <Spinner id="loaderPos" animation="border" variant="light" /> */}
        </div>
        <Container>
          <Row>
            <Col md={11}>
              <Card id="finalInterviewCard">
                <Row>
                  <Col md={6}>
                    <Row>
                      <Col md={12}>
                        <h4>Candidate Details</h4>
                      </Col>
                      <Col md={12}>
                        <p>{`Name : ${hirePPDataObj.candidateFn} ${hirePPDataObj.candidateLn}`}</p>
                      </Col>
                      <Col md={12}>
                        <p>{`Email : ${hirePPDataObj.candidateEmail}`}</p>
                      </Col>
                      <Col md={12}>
                        <p>{`Contact No : ${hirePPDataObj.candidateContactNum}`}</p>
                      </Col>
                      <Col md={12}>
                        <p style={{ float: "left" }}>Resume : </p>

                        <div style={{ float: "left", marginLeft: "15px" }}>
                          Upload
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col md={12}>
                        <h4>Recruiter Details</h4>
                      </Col>
                      <Col md={12}>
                        <p>{`Name : ${hirePPDataObj.recruiterFn} ${hirePPDataObj.recruiterLn}`}</p>
                      </Col>
                      <Col md={12}>
                        <p>{`Email : ${hirePPDataObj.recruiterEmail}`}</p>
                      </Col>
                      <Col md={12}>
                        <p>{`Contact No : ${hirePPDataObj.recruiterContactNum}`}</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={6}>
                    <Row>
                      <Col md={12}>
                        <h4>Interviewer Details</h4>
                      </Col>
                      <Col md={12}>
                        <p>{`Name : ${hirePPDataObj.interviewerFn} ${hirePPDataObj.interviewerLn}`}</p>
                      </Col>
                      <Col md={12}>
                        <p>{`Email : ${hirePPDataObj.interviewerEmail}`}</p>
                      </Col>
                      <Col md={12}>
                        <p>{`Contact No : ${hirePPDataObj.interviewerContactNum}`}</p>
                      </Col>
                    </Row>
                  </Col>
                  <Col md={12}>
                    <Row>
                      <Col md={12}>
                        <h4>Job Details</h4>
                      </Col>
                      <Col md={4}>
                        <p>{`Job Title: ${hirePPDataObj.jobTitle}`}</p>
                      </Col>
                      <Col md={4}>
                        <p>{`Company: ${hirePPDataObj.companyName}`}</p>
                      </Col>
                      <Col md={4}>
                        <p>
                          Jd upload:{" "}
                          <span style={{ color: "#32D583" }}>Completed</span>
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </Card>

              <Card id="finalInterviewTimeCard">
                <Row>
                  <Col md={10}>
                    <h4>{`Scheduled Date & Time  :  ${hirePPDataObj.interviewDate}, Start time: ${hirePPDataObj.interviewStartTime}, End Time: ${hirePPDataObj.interviewEndTime}, ${hirePPDataObj.interviewTimeZone}`}</h4>
                  </Col>
                  <Col md={2}>
                    <div
                      className="scheduleInterview"
                      onClick={finalSubmitData}
                    >
                      Schedule
                    </div>
                  </Col>
                </Row>
              </Card>

              <Card id="quesManagerParentDiv">
                <Row>
                  <Col md={12}>
                    <h4>Question Manager</h4>
                  </Col>
                  <Col md={4}>
                    <Card className="quesManagerCard">
                      <Row>
                        <Col md={12}>
                          <h5>Skill Selector</h5>
                        </Col>
                        <Col md={12} style={{ background: "#F9FAFB" }}>
                          <Row>
                            <Col md={1}></Col>
                            <Col md={6}>Skills</Col>
                            <Col md={3}>Weightage</Col>
                            <Col md={2}>Ques</Col>
                          </Row>
                        </Col>
                        <div className="mt-2"></div>
                        <Col md={12}>
                          <Row>
                            {hirePPDataObj.interviewSkillArr.map(
                              (skillData, index) => {
                                return (
                                  <>
                                    <Col md={1}>
                                      <input
                                        type="radio"
                                        name="skillRadio"
                                        value={skillData.skillName}
                                        onClick={(e) => {
                                          setCurrSkillSelected(e.target.value);
                                          currSkillSelection(index);
                                        }}
                                      ></input>
                                    </Col>
                                    <Col md={6}>{`${skillData.skillName}`}</Col>
                                    <Col
                                      md={3}
                                    >{`${skillData.skillWeightage}`}</Col>
                                    <Col md={2}>0</Col>
                                  </>
                                );
                              }
                            )}
                          </Row>
                        </Col>
                      </Row>
                    </Card>
                  </Col>
                  <Col md={8}>
                    <Card className="quesManagerCard">
                      {addQuesFlag ? <QuesAdded /> : <NoQuesAdded />}
                    </Card>
                  </Col>
                </Row>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default NewAllJd;
