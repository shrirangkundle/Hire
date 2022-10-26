import { useState, useEffect } from "react";
import Sidebar from "../../components/sideBarStandalone";
import TopBar from "../../components/TopBar";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import $ from "jquery";
import Alert from "react-bootstrap/Alert";
import InputGroup from "react-bootstrap/InputGroup";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

$(document).ready(function () {
  var today = new Date().toISOString().split("T")[0];
  if (document.getElementsByName("setTodaysDate")[0]) {
    document.getElementsByName("setTodaysDate")[0].setAttribute("min", today);
  }
});

function StandAlone2(props) {
  const [toggleStatus, setSidebarSatus] = useState("right");
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertText, setShowAlertText] = useState("");
  const [hirePPDataObj, setDataObj] = useState({});

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
  useEffect(() => {
    $(".createJdProgressBar").css("width", "50%");
    var prevData = localStorage.getItem("finalStandAloneDataObj");

    var prevdataObj = JSON.parse(prevData);
    if (prevdataObj !== null) {
      setDataObj(prevdataObj);
    }
  }, []);

  const nextPageNavigation = () => {
    var prevData = localStorage.getItem("finalStandAloneDataObj");
    var prevDataObj = JSON.parse(prevData);
    if (
      prevDataObj.candidateEmail === hirePPDataObj.recruiterEmail ||
      prevDataObj.candidateEmail === hirePPDataObj.interviewerEmail ||
      hirePPDataObj.recruiterEmail === hirePPDataObj.interviewerEmail
    ) {
      setShowAlert(true);
      setShowAlertText(
        "Please add unique email for candidate, recruiter and interviewer."
      );
      return;
    }
    var page2ConsolidatedData = { ...prevDataObj, ...hirePPDataObj };
    localStorage.setItem(
      "finalStandAloneDataObj",
      JSON.stringify(page2ConsolidatedData)
    );
    window.location.href = `standAloneInterview3`;
  };

  const prevPageBtn = () => {
    var prevData = localStorage.getItem("finalStandAloneDataObj");
    var prevDataObj = JSON.parse(prevData);
    var page2ConsolidatedData = { ...prevDataObj, ...hirePPDataObj };
    localStorage.setItem(
      "finalStandAloneDataObj",
      JSON.stringify(page2ConsolidatedData)
    );
    window.location.href = `standAloneInterview1`;
  };

  return (
    <div className="hirePlusPlusPageContent">
      <Sidebar toggleStatus="left" />
      <div
        style={{
          width: "100%",
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
              <h1 style={{ color: "white" }}>Interview Information</h1>
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
                  <Row className="d-flex justify-content-center">
                    <Col md={9}>
                      <Card>
                        <Card.Body id="createJdFormBody">
                          <Row>
                            <Col md={12}>
                              <h4>Recruiter Details</h4>
                            </Col>
                            <div className="mt-3"></div>
                            <Col md={6}>
                              <Form.Group
                                className="createJdInputs"
                                controlId="validationCustom01"
                              >
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="First Name"
                                  value={hirePPDataObj.recruiterFn}
                                  onChange={(e) =>
                                    setDataObj((prevState) => ({
                                      ...prevState,
                                      recruiterFn: e.target.value,
                                    }))
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group
                                className="createJdInputs"
                                controlId="validationCustom01"
                              >
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="Last Name"
                                  value={hirePPDataObj.recruiterLn}
                                  onChange={(e) =>
                                    setDataObj((prevState) => ({
                                      ...prevState,
                                      recruiterLn: e.target.value,
                                    }))
                                  }
                                />
                              </Form.Group>
                            </Col>

                            <Col md={6}>
                              <Form.Group className="createJdInputs">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                  value={hirePPDataObj.recruiterEmail}
                                  onChange={(e) =>
                                    setDataObj((prevState) => ({
                                      ...prevState,
                                      recruiterEmail: e.target.value,
                                    }))
                                  }
                                  type="email"
                                  placeholder="Recruiter Email"
                                  required
                                ></Form.Control>
                              </Form.Group>
                            </Col>

                            <Col md={6}>
                              <div className="mt-1"></div>
                              <Form.Label>Contact No.</Form.Label>
                              <div className="mt-2"></div>
                              <InputGroup
                                size="sm"
                                className="addCandidateInput"
                              >
                                <DropdownButton
                                  variant="outline-secondary"
                                  id="input-group-dropdown-1"
                                  title="IND"
                                  value={hirePPDataObj.recruiterCountryCode}
                                  onChange={(e) =>
                                    setDataObj((prevState) => ({
                                      ...prevState,
                                      recruiterCountryCode: e.target.value,
                                    }))
                                  }
                                >
                                  <Dropdown.Item value="">IND*</Dropdown.Item>
                                  <Dropdown.Item value="USA">
                                    USA*
                                  </Dropdown.Item>
                                  <Dropdown.Item value="CAN">
                                    Canada*
                                  </Dropdown.Item>
                                  <Dropdown.Item value="EU">
                                    Europe*
                                  </Dropdown.Item>
                                </DropdownButton>
                                <Form.Control
                                  required
                                  type="number"
                                  maxLength="10"
                                  placeholder="Contact No."
                                  value={hirePPDataObj.recruiterContactNum}
                                  onChange={(e) =>
                                    setDataObj((prevState) => ({
                                      ...prevState,
                                      recruiterContactNum: e.target.value,
                                    }))
                                  }
                                />
                              </InputGroup>
                            </Col>
                            <div className="mt-3"></div>

                            <Col md={12}>
                              <h4>Interviewer Details</h4>
                            </Col>
                            <Col md={6}>
                              <Form.Group
                                className="createJdInputs"
                                controlId="validationCustom01"
                              >
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="First Name"
                                  value={hirePPDataObj.interviewerFn}
                                  onChange={(e) =>
                                    setDataObj((prevState) => ({
                                      ...prevState,
                                      interviewerFn: e.target.value,
                                    }))
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <Col md={6}>
                              <Form.Group
                                className="createJdInputs"
                                controlId="validationCustom01"
                              >
                                <Form.Label>Last Name</Form.Label>
                                <Form.Control
                                  required
                                  type="text"
                                  placeholder="Last Name"
                                  value={hirePPDataObj.interviewerLn}
                                  onChange={(e) =>
                                    setDataObj((prevState) => ({
                                      ...prevState,
                                      interviewerLn: e.target.value,
                                    }))
                                  }
                                />
                              </Form.Group>
                            </Col>

                            <Col md={6}>
                              <Form.Group className="createJdInputs">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                  value={hirePPDataObj.interviewerEmail}
                                  onChange={(e) =>
                                    setDataObj((prevState) => ({
                                      ...prevState,
                                      interviewerEmail: e.target.value,
                                    }))
                                  }
                                  type="email"
                                  placeholder="interviewer Email"
                                  required
                                ></Form.Control>
                              </Form.Group>
                            </Col>

                            <Col md={6}>
                              <div className="mt-1"></div>
                              <Form.Label>Contact No.</Form.Label>
                              <div className="mt-2"></div>
                              <InputGroup
                                size="sm"
                                className="addCandidateInput"
                              >
                                <DropdownButton
                                  variant="outline-secondary"
                                  id="input-group-dropdown-1"
                                  title="IND"
                                  value={hirePPDataObj.interviewerCountryCode}
                                  onChange={(e) =>
                                    setDataObj((prevState) => ({
                                      ...prevState,
                                      interviewerCountryCode: e.target.value,
                                    }))
                                  }
                                >
                                  <Dropdown.Item value="">IND*</Dropdown.Item>
                                  <Dropdown.Item value="USA">
                                    USA*
                                  </Dropdown.Item>
                                  <Dropdown.Item value="CAN">
                                    Canada*
                                  </Dropdown.Item>
                                  <Dropdown.Item value="EU">
                                    Europe*
                                  </Dropdown.Item>
                                </DropdownButton>
                                <Form.Control
                                  required
                                  type="number"
                                  maxLength="10"
                                  placeholder="Contact No."
                                  value={hirePPDataObj.interviewerContactNum}
                                  onChange={(e) =>
                                    setDataObj((prevState) => ({
                                      ...prevState,
                                      interviewerContactNum: e.target.value,
                                    }))
                                  }
                                />
                              </InputGroup>
                            </Col>

                            <div className="mt-3"></div>
                          </Row>
                        </Card.Body>
                      </Card>
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
                <button className="navBtn" onClick={prevPageBtn}>
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
export default StandAlone2;
