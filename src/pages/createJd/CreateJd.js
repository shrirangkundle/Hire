import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import pattern1 from "../../assets/createJobFlow/pattern1.svg";
import "../../styles/createJdNew.css";
import hirePPBaseURl from "../../assets/envVar/baseUrl";
import axios from "axios";
import $ from "jquery";
import Alert from "react-bootstrap/Alert";

$(document).ready(function () {
  var today = new Date().toISOString().split("T")[0];
  if (document.getElementsByName("setTodaysDate")[0]) {
    document.getElementsByName("setTodaysDate")[0].setAttribute("min", today);
  }
});

function CreateJd(props) {
  const [toggleStatus, setSidebarSatus] = useState("right");
  const [clientName, setClientName] = useState("");
  const [openingNum, setOpeningNum] = useState(0);
  const [jobTitle, setJobTitle] = useState("");
  const [selectHiringManager, setSelectHiringManager] = useState("");
  const [locationType, setLocationType] = useState("");
  const [cityLocation, setCityLocation] = useState("");
  const [dateOfJoining, setDateOfJoining] = useState("");
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
      nextPageNavigation();
    }
    setValidated(true);
  };

  const handleToggle = () => {
    if (toggleStatus == "left") {
      setSidebarSatus("right");
    } else {
      setSidebarSatus("left");
    }
  };

  useEffect(() => {
    $(".createJdProgressBar").css("width", "16.6%");
    var prevData1 = localStorage.getItem("noOfOpening");
    var prevData2 = localStorage.getItem("currJobName");
    var prevData3 = localStorage.getItem("currJobJoiningDate");
    var prevData4 = localStorage.getItem("locationType");
    var prevData7 = localStorage.getItem("cityLocation");
    var prevData5 = localStorage.getItem("hiringManager");
    var prevData6 = localStorage.getItem("clientName");

    if (
      prevData1 !== null ||
      prevData2 !== null ||
      prevData3 !== null ||
      prevData4 !== null ||
      prevData5 !== null ||
      prevData6 !== null ||
      prevData7 !== null
    ) {
      setClientName(prevData6);
      setJobTitle(prevData2);
      setLocationType(prevData4);
      setCityLocation(prevData7);
      setDateOfJoining(prevData3);
      setSelectHiringManager(prevData5);
      setOpeningNum(Number(prevData1));
    }

    var flag1 = localStorage.getItem("flag1");
    var flag2 = localStorage.getItem("flag2");

    //both flag1 and flag2 are null
    if (flag1 === null || flag2 === null) {
      localStorage.setItem("flag1", false);
      localStorage.setItem("flag2", false);
    }
    if (flag1 === "true" && flag2 === "false") {
      localStorage.setItem("clientName", "");
      localStorage.setItem("noOfOpening", "");
      localStorage.setItem("currJobName", "");
      localStorage.setItem("currJobJoiningDate", "");
      localStorage.setItem("locationType", "");
      localStorage.setItem("cityLocation", "");
      localStorage.setItem("hiringManager", "");
      localStorage.setItem("hirePPEmploymentType", "");
      localStorage.setItem("hirePPDomain", "");
      localStorage.setItem("hirePPFunctionalArea", "");
      localStorage.setItem("hirePPCurr", "");
      localStorage.setItem("hirePPExpSalaryMin", "");
      localStorage.setItem("hirePPExpSalaryMax", "");
    }
    if (flag1 === "true" && flag2 === "true") {
      localStorage.setItem("newJobObj", "");
      localStorage.setItem("flag1", false);
      localStorage.setItem("flag2", false);
      localStorage.setItem("clientName", "");
      localStorage.setItem("noOfOpening", "");
      localStorage.setItem("currJobName", "");
      localStorage.setItem("currJobJoiningDate", "");
      localStorage.setItem("locationType", "");
      localStorage.setItem("cityLocation", "");
      localStorage.setItem("hiringManager", "");
      localStorage.setItem("hirePPEmploymentType", "");
      localStorage.setItem("hirePPDomain", "");
      localStorage.setItem("hirePPFunctionalArea", "");
      localStorage.setItem("hirePPCurr", "");
      localStorage.setItem("hirePPExpSalaryMin", "");
      localStorage.setItem("hirePPExpSalaryMax", "");
    }

    //user has completed step 1 but has not completed step 2
    // if(flag1==='true'&&flag2==='false'){

    // }
  }, []);

  const nextPageNavigation = () => {
    if (openingNum < 0 || openingNum === 0) {
      setShowAlertText("No. of opening cannot be negative");
      setShowAlert(true);
      return;
    }
    // var ToDate = Date.now();
    let date = new Date().toLocaleDateString();
    localStorage.setItem("clientName", clientName);
    localStorage.setItem("noOfOpening", openingNum);
    localStorage.setItem("currJobName", jobTitle);
    localStorage.setItem("currJobJoiningDate", dateOfJoining);
    localStorage.setItem("locationType", locationType);
    localStorage.setItem("cityLocation", cityLocation);
    localStorage.setItem("hiringManager", selectHiringManager);

    window.location.href = `/createJdStep2`;
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
        <TopBar pageName="Add Job Description" />

        <Container style={{ maxWidth: "100%" }}>
          <Row id="createJobBanner">
            <Col
              md={12}
              className="d-flex justify-content-center align-items-center"
            >
              <h1 style={{ color: "white" }}>Basic Client Information</h1>
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
                              <Form.Group
                                className="createJdInputs"
                                controlId="validationCustom01"
                              >
                                <Form.Label>Client Name</Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="Client Name"
                                  value={clientName}
                                  onChange={(e) =>
                                    setClientName(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <div className="mt-1"></div>
                            <Col md={9}>
                              <Form.Group className="createJdInputs">
                                <Form.Label>Select Hiring Manager</Form.Label>
                                <Form.Control
                                  value={selectHiringManager}
                                  onChange={(e) =>
                                    setSelectHiringManager(e.target.value)
                                  }
                                  placeholder="Hiring Manager"
                                  // style={{ color: "grey" }}
                                  required
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col
                              md={1}
                              className="d-flex justify-content-center align-items-center"
                            >
                              <Row>
                                <Col md={12}>
                                  <span style={{ color: "#F9FAFB" }}>
                                    placeholder
                                  </span>
                                </Col>
                                <Col
                                  md={12}
                                  className="d-flex justify-content-center"
                                >
                                  <span>Or</span>
                                </Col>
                              </Row>
                            </Col>
                            <Col
                              md={2}
                              className="d-flex justify-content-center align-items-center"
                            >
                              <Row>
                                <Col md={12}>
                                  <span style={{ color: "#F9FAFB" }}>
                                    placeholder
                                  </span>
                                </Col>
                                <Col
                                  md={12}
                                  className="d-flex justify-content-center"
                                >
                                  <button id="addManagerBtn">
                                    + Add Manager
                                  </button>
                                </Col>
                              </Row>
                            </Col>
                            <div className="mt-1"></div>
                            <Col md={4}>
                              <Form.Group className="createJdInputs">
                                <Form.Label>Location Type</Form.Label>
                                <Form.Select
                                  value={locationType}
                                  onChange={(e) =>
                                    setLocationType(e.target.value)
                                  }
                                  required
                                >
                                  {/* hardcoded values */}
                                  <option value="" disabled>
                                    -Select One-
                                  </option>
                                  <option value="onsite">On-site</option>
                                  <option value="remote">Remote</option>
                                  <option value="hybrid">Hybrid</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            <Col md={8}>
                              <Form.Group className="createJdInputs">
                                <Form.Label>Location</Form.Label>
                                <Form.Control
                                  required
                                  value={cityLocation}
                                  type="text"
                                  placeholder="Location"
                                  onChange={(e) =>
                                    setCityLocation(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <div className="mt-1"></div>
                            <Col md={12}>
                              {/* <label htmlFor="openingNum">Openings</label>
                              <input
                                type="number"
                                id="openingNum"
                                className="form-control form-control-md"
                                placeholder="Please enter a value"
                                value={openingNum}
                                onChange={(e) => setOpeningNum(e.target.value)}
                              /> */}
                              <Form.Group className="createJdInputs">
                                <Form.Label>Openings</Form.Label>
                                <Form.Control
                                  required
                                  type="number"
                                  placeholder="No. of Openings"
                                  value={openingNum === 0 ? "" : openingNum}
                                  onChange={(e) =>
                                    setOpeningNum(e.target.value)
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <div className="mt-1"></div>
                            <Col md={12}>
                              <Form.Group className="createJdInputs">
                                <Form.Label>Job Title</Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="job Title"
                                  value={jobTitle}
                                  onChange={(e) => setJobTitle(e.target.value)}
                                />
                              </Form.Group>
                            </Col>
                            <div className="mt-1"></div>
                            <Col md={12}>
                              <div className="form-group">
                                <label htmlFor="hirePPDateOfJoining">
                                  Date of Joining
                                </label>
                                <input
                                  required
                                  type="date"
                                  id="hirePPDateOfJoining"
                                  name="setTodaysDate"
                                  className="form-control form-control-md createJdInputs"
                                  max="2023-01-01"
                                  // onKeyDown={(e) => e.preventDefault()}
                                  value={dateOfJoining}
                                  onChange={(e) =>
                                    setDateOfJoining(e.target.value)
                                  }
                                />
                              </div>
                            </Col>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col
                      md={4}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <img src={pattern1} alt="" style={{ height: "55vh" }} />
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Row>
            {/* <div className="mt-3"></div> */}
            <div className="createjdProgressContainer">
              <div className="createJdProgressBar"></div>
            </div>
            <Row>
              <Col md={6} className="d-flex justify-content-start">
                {/* <button className="navBtn" disabled>
                Previous
              </button> */}
              </Col>
              <Col md={6} className="d-flex justify-content-end">
                {/* <button className="navBtn" onClick={nextPageNavigation}>
                  Next
                </button> */}
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
export default CreateJd;
