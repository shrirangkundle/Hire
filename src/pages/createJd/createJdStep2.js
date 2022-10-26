import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import pattern2 from "../../assets/createJobFlow/pattern2.svg";
import "../../styles/createJdNew.css";
import hirePPBaseURl from "../../assets/envVar/baseUrl";
import $ from "jquery";
import Alert from "react-bootstrap/Alert";
import WebUtils from "../../WebUtils";

function CreateJdStep2(props) {
  const [toggleStatus, setSidebarSatus] = useState("right");
  const [hirePPEmploymentType, sethirePPEmploymentType] = useState("");
  const [hirePPDomain, sethirePPEDomain] = useState("");
  const [hirePPFunctionalArea, sethirePPEFunctionalArea] = useState("");
  const [hirePPCurr, sethirePPCurr] = useState("");
  const [hirePPExpSalaryMin, sethirePPExpSalaryMin] = useState("");
  const [hirePPExpSalaryMax, sethirePPExpSalaryMax] = useState("");
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
      validateValues();
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
    $(".createJdProgressBar").css("width", "33.3%");
    var prevData1 = localStorage.getItem("hirePPEmploymentType");
    var prevData2 = localStorage.getItem("hirePPDomain");
    var prevData3 = localStorage.getItem("hirePPFunctionalArea");
    var prevData4 = localStorage.getItem("hirePPCurr");
    var prevData5 = localStorage.getItem("hirePPExpSalaryMin");
    var prevData6 = localStorage.getItem("hirePPExpSalaryMax");

    if (
      prevData1 !== null ||
      prevData2 !== null ||
      prevData3 !== null ||
      prevData4 !== null ||
      prevData5 !== null ||
      prevData6 !== null
    ) {
      sethirePPEmploymentType(prevData1);
      sethirePPEDomain(prevData2);
      sethirePPEFunctionalArea(prevData3);
      sethirePPCurr(prevData4);
      sethirePPExpSalaryMin(prevData5);
      sethirePPExpSalaryMax(prevData6);
    }
  }, []);

  function on() {
    document.getElementById("overlayAllJd").style.display = "block";
  }

  function off() {
    document.getElementById("overlayAllJd").style.display = "none";
  }

  function validateValues() {
    on();
    if (Number(hirePPExpSalaryMin) > Number(hirePPExpSalaryMax)) {
      off();
      setShowAlertText("Maximum salary cannot be less than minimum salary!");
      setShowAlert(true);

      return;
    } else {
      var newJobObj = {};
      newJobObj["jobEngagementType"] = hirePPEmploymentType;
      newJobObj["preferredDomain"] = hirePPDomain;
      newJobObj["functionalArea"] = hirePPFunctionalArea;
      newJobObj["currencyType"] = hirePPCurr;
      newJobObj["minSalaryBudget"] = hirePPExpSalaryMin;
      newJobObj["maxSalaryBudget"] = hirePPExpSalaryMax;
      newJobObj["clientName"] = localStorage.getItem("clientName");
      newJobObj["numberOfOpenings"] = localStorage.getItem("noOfOpening");
      newJobObj["jdName"] = localStorage.getItem("currJobName");
      var dateOfJoining =
        localStorage.getItem("currJobJoiningDate") + "T08:06:19";
      newJobObj["preferredJoiningDate"] = dateOfJoining;
      newJobObj["locationType"] = localStorage.getItem("locationType");
      newJobObj["location"] = localStorage.getItem("cityLocation");
      newJobObj["hiringDetails"] = localStorage.getItem("hiringManager");
      WebUtils.httpOperations(
        `${hirePPBaseURl}/jd/new`,
        newJobObj,
        "POST"
      ).then(
        (response) => {
          var jobId = response.data.data;
          localStorage.setItem("currJobId", jobId);
          localStorage.setItem("flag1", true);
          localStorage.setItem("flag2", false);
          window.location.href = `/createJdUploadFile`;
          localStorage.setItem("currentPage", 0);
          off();
        },
        (error) => {
          console.log(error);
          off();
        }
      );
    }
  }

  function prevPageFunc() {
    localStorage.setItem("hirePPEmploymentType", hirePPEmploymentType);
    localStorage.setItem("hirePPDomain", hirePPDomain);
    localStorage.setItem("hirePPFunctionalArea", hirePPFunctionalArea);
    localStorage.setItem("hirePPCurr", hirePPCurr);
    localStorage.setItem("hirePPExpSalaryMin", hirePPExpSalaryMin);
    localStorage.setItem("hirePPExpSalaryMax", hirePPExpSalaryMax);
    window.location.href = "./createJd";
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
        <div id="overlayAllJd">
          <div id="loaderPos">Loading...</div>
          {/* <Spinner id="loaderPos" animation="border" variant="light" /> */}
        </div>
        <Container style={{ maxWidth: "100%", maxHeight: "100%" }}>
          <Row id="createJobBanner">
            <Col
              md={12}
              className="d-flex justify-content-center align-items-center"
            >
              <h1 style={{ color: "white" }}>Add General Details</h1>
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
                              <Form.Group className="mb-2">
                                <Form.Label htmlFor="disabledSelect">
                                  Employment Type
                                </Form.Label>
                                <Form.Select
                                  required
                                  value={hirePPEmploymentType}
                                  onChange={(e) =>
                                    sethirePPEmploymentType(e.target.value)
                                  }
                                  id="blitzLocationType"
                                >
                                  {/* hardcoded values */}
                                  <option value="" disabled>
                                    Select Location Preference
                                  </option>
                                  <option value="fullTime">Full-time</option>
                                  <option value="internship">Internship</option>
                                  <option value="partTime">Part-Time</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            <Col md={12}>
                              <Form.Group className="mb-2">
                                <Form.Label htmlFor="disabledSelect">
                                  Domain/Industry
                                </Form.Label>
                                <Form.Control
                                  required
                                  onChange={(e) =>
                                    sethirePPEDomain(e.target.value)
                                  }
                                  placeholder="Domain Name"
                                  value={hirePPDomain}
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <Col md={12}>
                              <Form.Group className="mb-2">
                                <Form.Label htmlFor="disabledSelect">
                                  Functional Area
                                </Form.Label>
                                <Form.Control
                                  required
                                  value={hirePPFunctionalArea}
                                  onChange={(e) =>
                                    sethirePPEFunctionalArea(e.target.value)
                                  }
                                  id="blitzFuncAreaType"
                                  placeholder="Enter Functional Area"
                                ></Form.Control>
                              </Form.Group>
                            </Col>
                            <div className="mt-2"></div>
                          </Row>
                        </Card.Body>
                      </Card>
                      <Card>
                        <Card.Body id="createJdFormBody">
                          <Row>
                            <Col md={12}>
                              <Form.Group className="mb-2">
                                <Form.Label>Currency</Form.Label>
                                <Form.Select
                                  required
                                  value={hirePPCurr}
                                  onChange={(e) =>
                                    sethirePPCurr(e.target.value)
                                  }
                                >
                                  {/* hardcoded values */}
                                  <option value="" disabled>
                                    Select currency
                                  </option>
                                  <option value="inr">INR</option>
                                  <option value="usd">USD</option>
                                  <option value="eur">EUR</option>
                                </Form.Select>
                              </Form.Group>
                            </Col>
                            <Col md={12}>
                              <Form.Label>Salary (P.A)</Form.Label>
                              <Row>
                                <Col md={6}>
                                  {" "}
                                  <Form.Group className="mb-2">
                                    <Form.Control
                                      required
                                      type="number"
                                      placeholder="Min Salary"
                                      value={hirePPExpSalaryMin}
                                      onChange={(e) =>
                                        sethirePPExpSalaryMin(e.target.value)
                                      }
                                    />
                                  </Form.Group>
                                </Col>
                                <Col md={6}>
                                  <Form.Group className="mb-2">
                                    <Form.Control
                                      required
                                      type="number"
                                      value={hirePPExpSalaryMax}
                                      placeholder="Max Salary"
                                      onChange={(e) =>
                                        sethirePPExpSalaryMax(e.target.value)
                                      }
                                    />
                                  </Form.Group>
                                </Col>
                              </Row>
                            </Col>

                            <div className="mt-2"></div>
                          </Row>
                        </Card.Body>
                      </Card>
                    </Col>
                    <Col
                      md={4}
                      className="d-flex justify-content-center align-items-center"
                    >
                      <img src={pattern2} alt="" style={{ height: "55vh" }} />
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
                {/* <button className="navBtn" onClick={validateValues}>
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
export default CreateJdStep2;
