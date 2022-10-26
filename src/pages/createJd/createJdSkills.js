import { Fragment, useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import pattern5 from "../../assets/createJobFlow/pattern5.svg";
import "../../styles/createJdNew.css";
import hirePPBaseURl from "../../assets/envVar/baseUrl";
import axios from "axios";
import $ from "jquery";
import Alert from "react-bootstrap/Alert";

function CreateJdSkills(props) {
  const [toggleStatus, setSidebarSatus] = useState("right");
  const [currSkill, setCurrSkill] = useState("");
  const [skillChipArr, setSkillChipArr] = useState([]);
  const [skillText, setSkillText] = useState("");
  const [minExp, setMinExp] = useState(0);
  const [maxExp, setMaxExp] = useState(0);
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertText, setShowAlertText] = useState("");
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      nextPageRedirect();
    }
    setValidated(true);
  };
  var jobObjStr = localStorage.getItem("newJobObj");
  var jobObj = JSON.parse(jobObjStr);

  const handleToggle = () => {
    if (toggleStatus == "left") {
      setSidebarSatus("right");
    } else {
      setSidebarSatus("left");
    }
  };
  useEffect(() => {
    $(".createJdProgressBar").css("width", "83.2%");
    var storedObj = JSON.parse(localStorage.getItem("newJobObj"));

    if (jobObj.initSkillArr !== undefined) {
      setSkillChipArr(jobObj.initSkillArr);
      setSkillText(jobObj.skillText);
      setMinExp(jobObj.minExperience);
      setMaxExp(jobObj.maxExperience);
    }
  }, []);

  function removeSkill(skillName) {
    setSkillChipArr(skillChipArr.filter((item) => item !== skillName));
  }

  function prevPageFunc() {
    jobObj["initSkillArr"] = skillChipArr;
    jobObj["minExperience"] = minExp;
    jobObj["maxExperience"] = maxExp;
    jobObj["skillText"] = skillText;
    localStorage.setItem("newJobObj", JSON.stringify(jobObj));
    window.location.href = "./createJdDescription";
  }

  function nextPageRedirect() {
    if (minExp > maxExp) {
      setShowAlertText(
        "Minimum Experience cannot be greater than maximum experience"
      );
      setShowAlert(true);

      return;
    }
    if (skillChipArr.length === 0 && skillText === "") {
      setShowAlertText("Please Select Skill as text or add Skills");
      setShowAlert(true);
      return;
    }
    var finalSkillArr = [];
    for (let i = 0; i < skillChipArr.length; i++) {
      var tempObj = {};
      tempObj["name"] = skillChipArr[i];
      tempObj["requirement"] = "MANDATORY";
      finalSkillArr.push(tempObj);
    }
    // jobObj["initSkillArr"] = skillChipArr;

    jobObj["skillList"] = finalSkillArr;
    jobObj["minExperience"] = minExp;
    jobObj["maxExperience"] = maxExp;
    jobObj["skillText"] = skillText;
    localStorage.setItem("newJobObj", JSON.stringify(jobObj));
    window.location.href = "./createJdAdditionalDetails";
  }

  const SkillChip = (props) => {
    return (
      <>
        <div className="chip" id={props.skillName}>
          {props.skillName}
          <span
            className="closebtn"
            onClick={() => removeSkill(props.skillName)}
          >
            &times;
          </span>
        </div>
      </>
    );
  };

  function addSkillFunc() {
    if (currSkill === "") {
      alert("skill cannot be empty");
      return;
    }
    setSkillChipArr((arr) => [...arr, currSkill]);
    setCurrSkill("");
  }

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
        <TopBar pageName="Add Job Description" />
        <Container style={{ maxWidth: "100%" }}>
          <Row id="createJobBanner">
            <Col
              md={12}
              className="d-flex justify-content-center align-items-center"
            >
              <h1 style={{ color: "white" }}>Experience and skills</h1>
            </Col>
          </Row>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row id="createJdContainer">
              <Card id="mainBodyCard">
                <Card.Body>
                  <Alert
                    show={showAlert}
                    variant="danger"
                    onClose={() => setShowAlert(false)}
                    dismissible
                  >
                    {showAlertText}
                  </Alert>
                  <Row>
                    <Col md={8}>
                      <Card>
                        <Card.Body id="createJdFormBody">
                          <Row>
                            <Col md={12}>
                              <Row>
                                <Col md={12}>
                                  <h6>Years of Experience</h6>
                                </Col>
                                <Col md={6}>
                                  <Form.Group>
                                    <Form.Label>Minimum</Form.Label>
                                    <Form.Select
                                      required
                                      value={minExp}
                                      onChange={(e) =>
                                        setMinExp(e.target.value)
                                      }
                                    >
                                      <option value="" disabled>
                                        -Select from the List-
                                      </option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                      <option value="7">7</option>
                                      <option value="8">8</option>
                                      <option value="9">9</option>
                                      <option value="10">10</option>
                                    </Form.Select>
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group>
                                    <Form.Label>Maximum</Form.Label>
                                    <Form.Select
                                      required
                                      value={maxExp}
                                      onChange={(e) =>
                                        setMaxExp(e.target.value)
                                      }
                                    >
                                      <option value="" disabled>
                                        -Select from the List-
                                      </option>
                                      <option value="1">1</option>
                                      <option value="2">2</option>
                                      <option value="3">3</option>
                                      <option value="4">4</option>
                                      <option value="5">5</option>
                                      <option value="6">6</option>
                                      <option value="7">7</option>
                                      <option value="8">8</option>
                                      <option value="9">9</option>
                                      <option value="10">10</option>
                                    </Form.Select>
                                  </Form.Group>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                      <div className="mt-2"></div>
                      <Card>
                        <Card.Body id="createJdFormBody">
                          <Row>
                            <Col md={12}>
                              <h6>Skills</h6>
                            </Col>
                            <Col md={10}>
                              <label htmlFor="openingNum">
                                Add relavent tags
                              </label>
                              <input
                                type="text"
                                className="form-control form-control-md"
                                placeholder="Please enter a skill name"
                                value={currSkill}
                                onChange={(e) => setCurrSkill(e.target.value)}
                              />
                            </Col>
                            <Col
                              md={2}
                              className="d-flex justify-content-center align-items-end"
                            >
                              <Button onClick={addSkillFunc}>Add</Button>
                            </Col>

                            <Col md={10}>
                              {skillChipArr.map((i, index) => {
                                return <SkillChip skillName={i} />;
                              })}
                            </Col>
                            <div className="mt-1"></div>
                            <Col
                              md={12}
                              className="d-flex justify-content-center"
                            >
                              <p>or</p>
                            </Col>
                            <Col md={12}>
                              <Form.Group controlId="title of job">
                                <Form.Label>Skills as text</Form.Label>
                                <Form.Control
                                  className="jobDescriptionText"
                                  type="text"
                                  placeholder="Copy and paste if skills are in text format."
                                  value={skillText}
                                  onChange={(e) => setSkillText(e.target.value)}
                                />
                              </Form.Group>
                            </Col>

                            <div className="mt-1"></div>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col
                      md={4}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <img src={pattern5} alt="" style={{ height: "55vh" }} />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
            {/* <div className="mt-3"></div> */}
            <div className="createjdProgressContainer">
              <div className="createJdProgressBar"></div>
            </div>
            <div className="mt-3"></div>
            <Row>
              <Col md={6} className="d-flex justify-content-start">
                <button className="navBtn" onClick={prevPageFunc}>
                  Previous
                </button>
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                <button className="navBtn" type="submit">
                  Next
                </button>
              </Col>
            </Row>
          </Form>
        </Container>
      </div>
    </div>
  );
}
export default CreateJdSkills;
