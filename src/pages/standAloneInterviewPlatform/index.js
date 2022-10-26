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

function StandAlone1(props) {
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

  var FormData = require("form-data");
  var finalFormDataObj = new FormData();

  //
  var formDataCandidateResume = new FormData();
  var formDataJobDescription = new FormData();

  const uploadCandidateResume = (event) => {
    finalFormDataObj.append("resumeFile", event.target.files[0]);
    formDataCandidateResume.append("resumeFile", event.target.files[0]);
    setDataObj((prevState) => ({
      ...prevState,
      candidateResume: formDataCandidateResume,
    }));
    var fileReader = new FileReader();
    var base64;
    // Onload of file read the file content
    fileReader.onload = function (fileLoadedEvent) {
      base64 = fileLoadedEvent.target.result;
      // Print data in console
      localStorage.setItem("resumeFile", base64);
    };
    // Convert data to base64
    fileReader.readAsDataURL(event.target.files[0]);
  };

  const uploadJobDescripton = (event) => {
    finalFormDataObj.append("jdFile", event.target.files[0]);
    formDataJobDescription.append("jdFile", event.target.files[0]);
    setDataObj((prevState) => ({
      ...prevState,
      jobDescriptionFile: formDataCandidateResume,
    }));
    var fileReader = new FileReader();
    var base64;
    // Onload of file read the file content
    fileReader.onload = function (fileLoadedEvent) {
      base64 = fileLoadedEvent.target.result;
      // Print data in console
      localStorage.setItem("jdFile", base64);
    };
    // Convert data to base64
    fileReader.readAsDataURL(event.target.files[0]);
  };

  useEffect(() => {
    $(".createJdProgressBar").css("width", "25%");
    var prevData = localStorage.getItem("finalStandAloneDataObj");

    var prevdataObj = JSON.parse(prevData);

    if (prevdataObj !== null) {
      setDataObj(prevdataObj);
    }
  }, []);

  const nextPageNavigation = () => {
    if (
      hirePPDataObj.jobDescriptionFile === undefined ||
      hirePPDataObj.candidateResume === undefined
    ) {
      setShowAlert(true);
      setShowAlertText("Please Upload the required files");
      return;
    }

    localStorage.setItem(
      "finalStandAloneDataObj",
      JSON.stringify(hirePPDataObj)
    );
    window.location.href = `/standAloneInterview2`;
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
                              <h4>Candidate Details</h4>
                            </Col>
                            <div className="mt-3"></div>
                            <Col md={6}>
                              <Form.Group
                                className="createJdInputs"
                                controlId="validationCustom01"
                              >
                                <Form.Label>First Name</Form.Label>
                                <Form.Control
                                  size="sm"
                                  required
                                  type="text"
                                  placeholder="First Name"
                                  value={hirePPDataObj.candidateFn}
                                  onChange={(e) =>
                                    setDataObj((prevState) => ({
                                      ...prevState,
                                      candidateFn: e.target.value,
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
                                  size="sm"
                                  required
                                  type="text"
                                  placeholder="Last Name"
                                  value={hirePPDataObj.candidateLn}
                                  onChange={(e) =>
                                    setDataObj((prevState) => ({
                                      ...prevState,
                                      candidateLn: e.target.value,
                                    }))
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <div className="mt-2"></div>

                            <Col md={6}>
                              <Form.Group className="createJdInputs">
                                <Form.Label>Email</Form.Label>
                                <Form.Control
                                  size="sm"
                                  value={hirePPDataObj.candidateEmail}
                                  onChange={(e) =>
                                    setDataObj((prevState) => ({
                                      ...prevState,
                                      candidateEmail: e.target.value,
                                    }))
                                  }
                                  placeholder="Email"
                                  type="email"
                                  // style={{ color: "grey" }}
                                  required
                                ></Form.Control>
                              </Form.Group>
                            </Col>

                            <Col md={6}>
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
                                  value={hirePPDataObj.candidateCountryCode}
                                  onChange={(e) =>
                                    setDataObj((prevState) => ({
                                      ...prevState,
                                      candidateCountryCode: e.target.value,
                                    }))
                                  }
                                >
                                  <Dropdown.Item value="IND">
                                    IND*
                                  </Dropdown.Item>
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
                                  size="sm"
                                  required
                                  type="number"
                                  maxLength="10"
                                  placeholder="Contact No."
                                  value={hirePPDataObj.candidateContactNum}
                                  onChange={(e) =>
                                    setDataObj((prevState) => ({
                                      ...prevState,
                                      candidateContactNum: e.target.value,
                                    }))
                                  }
                                />
                              </InputGroup>
                            </Col>
                            <Col md={6}>
                              <Form.Group className="createJdInputs">
                                <Form.Label>Resume</Form.Label> <br />
                              </Form.Group>

                              <input
                                // style={{
                                //   height: "44px",
                                //   width: "124px",
                                //   left: "0px",
                                //   top: "0px",
                                //   borderRadius: "8px",
                                //   padding: "10px 18px 10px 18px",
                                // }}
                                type="file"
                                id="uploadJd"
                                onChange={uploadCandidateResume}
                                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              />
                            </Col>
                            <div className="mt-3"></div>
                            <Col md={12}>
                              <h4>Job Details</h4>
                            </Col>
                            <Col md={6}>
                              <Form.Group
                                className="createJdInputs"
                                controlId="validationCustom01"
                              >
                                <Form.Label>Company</Form.Label>
                                <Form.Control
                                  size="sm"
                                  required
                                  type="text"
                                  placeholder="Company Name"
                                  value={hirePPDataObj.companyName}
                                  onChange={(e) =>
                                    setDataObj((prevState) => ({
                                      ...prevState,
                                      companyName: e.target.value,
                                    }))
                                  }
                                />
                              </Form.Group>
                            </Col>

                            {/* <Col md={6}>
                              <Form.Group
                                className="createJdInputs"
                                controlId="validationCustom01"
                              >
                                <Form.Label>Job ID</Form.Label>
                                <Form.Control
                                  size="sm"
                                  required
                                  type="text"
                                  placeholder="Enter Job Id"
                                  value={hirePPDataObj.jobId}
                                  onChange={(e) =>
                                    setDataObj((prevState) => ({
                                      ...prevState,
                                      jobId: e.target.value,
                                    }))
                                  }
                                />
                              </Form.Group>
                            </Col> */}
                            <Col md={6}>
                              <Form.Group
                                className="createJdInputs"
                                controlId="validationCustom01"
                              >
                                <Form.Label>Job Title</Form.Label>
                                <Form.Control
                                  size="sm"
                                  required
                                  type="text"
                                  placeholder="Enter Job Title"
                                  value={hirePPDataObj.jobTitle}
                                  onChange={(e) =>
                                    setDataObj((prevState) => ({
                                      ...prevState,
                                      jobTitle: e.target.value,
                                    }))
                                  }
                                />
                              </Form.Group>
                            </Col>
                            <div className="mt-2"></div>
                            {/* <Col md={6}>
                              <Form.Group
                                className="createJdInputs"
                                controlId="validationCustom01"
                              >
                                <Form.Label>Company</Form.Label>
                                <Form.Control
                                  size="sm"
                                  required
                                  type="text"
                                  placeholder="Company Name"
                                  value={hirePPDataObj.companyName}
                                  onChange={(e) =>
                                    setDataObj((prevState) => ({
                                      ...prevState,
                                      companyName: e.target.value,
                                    }))
                                  }
                                />
                              </Form.Group>
                            </Col> */}

                            <Col md={6}>
                              <Form.Group className="createJdInputs">
                                <Form.Label>Job Description</Form.Label> <br />
                              </Form.Group>

                              <input
                                // style={{
                                //   height: "44px",
                                //   width: "124px",
                                //   left: "0px",
                                //   top: "0px",
                                //   borderRadius: "8px",
                                //   padding: "10px 18px 10px 18px",
                                // }}
                                type="file"
                                id="uploadJd"
                                onChange={uploadJobDescripton}
                                accept="application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                              />
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
export default StandAlone1;
