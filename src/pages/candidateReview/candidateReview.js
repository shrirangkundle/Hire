import { Fragment, useState, useEffect } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import Form from "react-bootstrap/Form";
import "../../styles/reviewCandidate.css";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import hirePPBaseURl from "../../assets/envVar/baseUrl";
import axios from "axios";
import Button from "react-bootstrap/Button";
import InputGroup from "react-bootstrap/InputGroup";
import TagsInput from "../../components/reviewCandidate/TagsInput";
import { Rate } from "antd";
import { Radio } from "antd";
import WebUtils from "../../WebUtils";
import { Checkbox } from "antd";

// /aimatcher/api/v1

var resumeHTML_text =
  '<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <title>Document</title> </head> <body> <h3>Loading</h3> </body></html>';
var JdHTML_text =
  '<!DOCTYPE html><html lang="en"> <head> <meta charset="UTF-8"/> <meta http-equiv="X-UA-Compatible" content="IE=edge"/> <meta name="viewport" content="width=device-width, initial-scale=1.0"/> <title>Document</title> </head> <body> <h3>Loading</h3> </body></html>';

function CandidateReview(props) {
  const [toggleStatus, setSidebarSatus] = useState("left");
  const [jobDescription, setJobDescription] = useState({});
  const [candidateDescription, setCandidateDescription] = useState({});
  const [jobSkillArr, setjobSkillArr] = useState([]);
  const [dateOfJoining, setDateOfJoining] = useState("01-01-2022*");
  const [resumeHTML, setResumeHTML] = useState(resumeHTML_text);
  const [jdHTML, setJdHTML] = useState(JdHTML_text);
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const jobId = urlParams.get("jdId");
  const cvId = urlParams.get("resumeId");
  const plainOptions = ["Large Firms", "Startup", "SME", "MNC"];
  const [radiovalue, setRadioValue] = useState(1);
  const [candidateFeedback, setCandidateFeedback] = useState({
    resumeState: "",
    city: "",
    totalExperience: "0",
    relevantExperience: "0",
    domainExperience: [""],
    haveOtherOffers: false,
    servingNoticePeriod: false,
    recruiterRating: 0,
    pastEmployers: {
      mnc: false,
      largeFirms: false,
      sme: false,
      startUps: false,
    },
  });

  const [recruiterRating, setRecruiterRating] = useState(0);
  useEffect(() => {
    setCandidateFeedback((prevState) => ({
      ...prevState,
      recruiterRating: recruiterRating,
    }));
  }, [recruiterRating]);

  const handleToggle = () => {
    if (toggleStatus == "left") {
      setSidebarSatus("right");
    } else {
      setSidebarSatus("left");
    }
  };

  function domainVal(val) {
    setCandidateFeedback((prevState) => ({
      ...prevState,
      domainExperience: val,
    }));
  }

  var pastEmployersObj = {
    mnc: false,
    largefirms: false,
    sme: false,
    startUps: false,
  };

  const setPastEmployer = (key, e) => {
    if (e.target.checked === true) {
      pastEmployersObj[key] = true;
    } else {
      pastEmployersObj[key] = false;
    }
    setCandidateFeedback((prevState) => ({
      ...prevState,
      pastEmployers: pastEmployersObj,
    }));
  };

  const onChange = (e) => {
    setRadioValue(e.target.value);

    if (e.target.value === 1) {
      setCandidateFeedback((prevState) => ({
        ...prevState,
        haveOtherOffers: true,
      }));
    } else {
      setCandidateFeedback((prevState) => ({
        ...prevState,
        haveOtherOffers: false,
      }));
    }
  };

  const candidateStateChange = (state) => {
    var newObj = candidateFeedback;

    newObj["resumeState"] = state;
    newObj["pastEmployers"] = pastEmployersObj;
    on();

    WebUtils.httpOperations(
      `${hirePPBaseURl}/resume/review?jdId=${jobId}&resumeId=${cvId}`,
      candidateFeedback,
      "POST"
    ).then(
      (response) => {
        off();
        window.location.href = `/viewJd/${jobId}`;
      },
      (error) => {
        off();
        console.log(error);
        alert(error);
      }
    );
  };
  function on() {
    document.getElementById("overlayAllJd").style.display = "block";
  }

  function off() {
    document.getElementById("overlayAllJd").style.display = "none";
  }

  const resumeStateChange = (stateVal) => {
    var data = JSON.stringify({
      jdIdentifier: jobId,
      resumeIdentifier: cvId,
      resumeState: stateVal,
    });
    WebUtils.httpOperations(
      `${hirePPBaseURl}/resume/updateState`,
      data,
      "POST"
    ).then(
      (response) => {
        console.log(JSON.stringify(response.data));
      },
      (error) => error
    );
  };

  const jobDetailsFunc = () => {
    WebUtils.httpOperations(
      `${hirePPBaseURl}/jd/?jdId=${jobId}`,
      {},
      "GET"
    ).then(
      (response) => {
        setJobDescription(response.data.data);
        setjobSkillArr(response.data.data.interviewSkillDataList);
        setJdHTML(response.data.data.parsedJobData.parsedJdHtml);
        var updatedDate = dateStringGenerator(
          response.data.data.preferredJoiningDate
        );
        setDateOfJoining(updatedDate);
      },
      (error) => error
    );
  };

  function dateStringGenerator(dateStr) {
    var strArr = dateStr.split("T");
    var interStr = strArr[0];
    var FinalArr = interStr.split("-");
    return FinalArr[2] + "-" + FinalArr[1] + "-" + FinalArr[0];
  }

  function switchChange(e) {
    setCandidateFeedback((prevState) => ({
      ...prevState,
      servingNoticePeriod: e.target.checked,
    }));
  }

  function candidateDetails() {
    WebUtils.httpOperations(
      `${hirePPBaseURl}/resume/?jdId=${jobId}&resumeId=${cvId}`,
      {},
      "GET"
    ).then(
      (response) => {
        setCandidateDescription(response.data.data);
        setResumeHTML(response.data.data.parsedResumeData.parsedResumeHtml);
      },
      (error) => error
    );
  }

  useEffect(() => {
    jobDetailsFunc();
    candidateDetails();
  }, []);
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
        <TopBar pageName="Candidate Review" />
        <div id="overlayAllJd">
          <div id="loaderPos">Loading...</div>
          {/* <Spinner id="loaderPos" animation="border" variant="light" /> */}
        </div>
        <div className="hirePlusPlusPageContainer">
          <Row>
            <Col md={12}>
              <Row>
                <Col md={6}>
                  <Row>
                    <Col md={6}>
                      <h4>Job Description</h4>
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col md={12} className="d-flex justify-content-end">
                          {jobDescription.jdName}
                        </Col>
                        <Col md={12} className="d-flex justify-content-end">
                          {jobDescription.jdIdentifier}
                        </Col>
                      </Row>
                    </Col>
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
                </Col>
                <Col md={6}>
                  <Row>
                    <Col md={6}>
                      <h4>Resume</h4>
                    </Col>
                    <Col md={6}>
                      <Row>
                        <Col md={12} className="d-flex justify-content-end">
                          {candidateDescription.fullName}
                        </Col>
                        <Col md={12} className="d-flex justify-content-end">
                          {candidateDescription.resumeIdentifier}
                        </Col>
                      </Row>
                    </Col>
                    <Col md={12}>
                      <Card className="resumeCard">
                        <Card.Body>
                          <Row>
                            <Col md={12}>
                              <div
                                className="content"
                                dangerouslySetInnerHTML={{
                                  __html: resumeHTML,
                                }}
                              ></div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                    <div className="mt-3"></div>
                  </Row>
                </Col>
              </Row>
              <div className="mt-3"></div>
              <Row>
                <Col md={6}>
                  <Card className="candidateIntermediateCard">
                    <Card.Body>
                      <Row>
                        <Col md={12}>
                          <h5>Budget</h5>
                        </Col>
                        <Col md={4}>
                          <div className="form-group">
                            <p>Minimum Budget</p>
                            <Form.Control
                              // className="addCandidateInput"
                              size="sm"
                              type="text"
                              disabled
                              value={jobDescription.minSalary}
                              // onChange={(e) =>
                              //   setCandidateLastName(e.target.value)
                              // }
                            />
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className="form-group">
                            <p>Maxmum Budget</p>
                            <Form.Control
                              // className="addCandidateInput"
                              size="sm"
                              type="text"
                              disabled
                              value={jobDescription.maxSalary}
                              // onChange={(e) =>
                              //   setCandidateLastName(e.target.value)
                              // }
                            />
                          </div>
                        </Col>
                        <Col md={4}>
                          <div className="form-group">
                            <p>Expected Salary Multiple</p>
                            <Form.Control
                              // className="addCandidateInput"
                              disabled
                              size="sm"
                              type="text"
                              value="2X"
                              // onChange={(e) =>
                              //   setCandidateLastName(e.target.value)
                              // }
                            />
                          </div>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="candidateIntermediateCard">
                    <Card.Body>
                      <Row>
                        <Col md={6}>Expected CTC</Col>
                        <Col
                          md={6}
                        >{`: ${candidateDescription.expectedCTC}`}</Col>
                        <div className="mt-3"></div>
                        <Col md={6}>Current CTC</Col>
                        <Col
                          md={6}
                        >{`: ${candidateDescription.currentCTC}`}</Col>
                        <div className="mt-3"></div>
                        <Col md={6}>Present Salary Multiple</Col>
                        <Col md={6}>: 5X**</Col>
                        <div className="mt-3  "></div>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
              <div className="mt-3"></div>
              <Row>
                <Col md={6}>
                  <Card className="candidateReviewGrey">
                    <Card.Body>
                      <Row>
                        <Col md={12}>
                          <h5>Skills Required</h5>
                        </Col>

                        <div className="mt-3"></div>
                        <Col md={12}>
                          {jobSkillArr.map((data, index) => {
                            return (
                              <div className="chipCandidateReview">
                                {data.skillName}: {data.skillWeightage}%
                              </div>
                            );
                          })}
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="candidateReviewGrey">
                    <Card.Body>
                      <Row>
                        <Col md={12}>
                          <h4>Scores</h4>
                        </Col>
                        <Col md={6} className="d-flex justify-content-center">
                          <Row>
                            <Col
                              md={12}
                              className="d-flex justify-content-center"
                            >
                              <div className="scoreProgress">
                                <CircularProgressbar
                                  value={candidateDescription.resumeScore}
                                  text={`${candidateDescription.resumeScore}%`}
                                />
                              </div>
                            </Col>
                            <Col
                              md={12}
                              className="d-flex justify-content-center"
                            >
                              <p>AI Score</p>
                            </Col>
                          </Row>
                        </Col>
                        <Col md={6} className="d-flex justify-content-center">
                          <Row>
                            <Col
                              md={12}
                              className="d-flex justify-content-center"
                            >
                              <div className="scoreProgress">
                                <CircularProgressbar
                                  value={
                                    candidateDescription.reverseCompatibilityScore
                                  }
                                  text={`${candidateDescription.reverseCompatibilityScore}%`}
                                />
                              </div>
                            </Col>
                            <Col
                              md={12}
                              className="d-flex justify-content-center"
                            >
                              <p>Compatibality Score</p>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <div className="mt-3"></div>
                <Col md={6}>
                  <Card className="candidateReviewGrey">
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <p>Hiring Manager:</p>
                        </Col>
                        <Col md={6}>
                          <p>{`${jobDescription.hiringDetails}`}</p>
                        </Col>
                        <Col md={6}>
                          <p>Location</p>
                        </Col>
                        <Col md={6}>
                          <p>{`${jobDescription.jobLocation}`}</p>
                        </Col>
                        <Col md={6}>
                          <p>To Look For</p>
                        </Col>
                        <Col md={6}>
                          <p>Developer*</p>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6}>
                  <Card className="candidateReviewGrey">
                    <Card.Body>
                      <Row>
                        <Col md={6}>
                          <p>City</p>
                        </Col>
                        <Col md={6}>
                          <Form.Control
                            // disabled
                            // className="addCandidateInput"
                            value={candidateFeedback.city}
                            size="sm"
                            type="text"
                            placeholder="City"
                            onChange={(e) => {
                              setCandidateFeedback((prevState) => ({
                                ...prevState,
                                city: e.target.value,
                              }));
                            }}
                          />
                        </Col>
                        <Col md={6}>
                          <p>Total Exp</p>
                        </Col>
                        <Col md={3}>
                          <InputGroup className="mb-3" size="sm">
                            <Form.Control
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              type="number"
                              value={candidateFeedback.totalExperience}
                              onChange={(e) => {
                                setCandidateFeedback((prevState) => ({
                                  ...prevState,
                                  totalExperience: e.target.value,
                                }));
                              }}
                            />
                            <InputGroup.Text id="basic-addon1">
                              years
                            </InputGroup.Text>
                          </InputGroup>
                        </Col>
                        <Col md={6}>
                          <p> Relavent Exp</p>
                        </Col>
                        <Col md={3}>
                          <InputGroup className="mb-3" size="sm">
                            <Form.Control
                              aria-label="Username"
                              aria-describedby="basic-addon1"
                              type="number"
                              value={candidateFeedback.relevantExperience}
                              onChange={(e) => {
                                setCandidateFeedback((prevState) => ({
                                  ...prevState,
                                  relevantExperience: e.target.value,
                                }));
                              }}
                            />
                            <InputGroup.Text id="basic-addon1">
                              years
                            </InputGroup.Text>
                          </InputGroup>
                        </Col>
                        <Col md={6}>Domain Experience</Col>
                        <Col md={6}>
                          <TagsInput setDataFunc={domainVal} />
                        </Col>
                        <Col md={6}>Other Offers</Col>
                        <Col md={6}>
                          <Radio.Group onChange={onChange}>
                            <Radio value={1}>Yes</Radio>
                            <Radio value={2}>No</Radio>
                          </Radio.Group>
                        </Col>
                        <div className="mt-1"></div>
                        <Col md={6}>Serving Notice</Col>
                        <Col md={6}>
                          {" "}
                          <Form.Check
                            type="switch"
                            id="custom-switch"
                            onChange={switchChange}
                            // label="Check this switch"
                          />
                        </Col>
                        <div className="mt-1"></div>
                        <Col md={6}>Recruiter Rating</Col>
                        <Col md={6}>
                          {" "}
                          <Rate
                            allowHalf
                            value={recruiterRating}
                            onChange={setRecruiterRating}
                          />
                        </Col>
                        <Col md={6}>Past Employers</Col>
                        <Col md={6}>
                          <Checkbox
                            onChange={(e) => setPastEmployer("largefirms", e)}
                          >
                            Large Firms
                          </Checkbox>
                          <Checkbox
                            onChange={(e) => setPastEmployer("startUps", e)}
                          >
                            Startups
                          </Checkbox>
                          <Checkbox onChange={(e) => setPastEmployer("sme", e)}>
                            SME
                          </Checkbox>
                          <Checkbox onChange={(e) => setPastEmployer("mnc", e)}>
                            MNC
                          </Checkbox>
                        </Col>
                        <div className="mt-3"></div>
                        <Col md={12} className="d-flex justify-content-center">
                          <div
                            className="reviewStatus viewJdStandBy candidateReviewAction"
                            onClick={() => candidateStateChange("STAND_BY")}
                          >
                            Stand by
                          </div>
                          <Button
                            className="candidateReviewAction"
                            onClick={() => {
                              candidateStateChange("SHORTLISTED_FOR_INTERVIEW");
                            }}
                            // onClick={shortlistFunc}
                          >
                            Shortlist
                          </Button>
                        </Col>
                      </Row>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
export default CandidateReview;
