import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import hirePPBaseURl from "../../assets/envVar/baseUrl";
import $ from "jquery";
import "../../styles/addCandidate.css";
import DropFileInput from "../../components/drop-file-input/DropFileInput";
import Alert from "react-bootstrap/Alert";
import WebUtils from "../../WebUtils";
import { Input, Select } from "antd";

function CreateJd(props) {
  const [toggleStatus, setSidebarSatus] = useState("right");
  const [candidateFirstName, setCandidateFirstName] = useState("");
  const [candidateLastName, setCandidateLastName] = useState("");
  const [candidateEmail, setCandidateEmail] = useState("");
  const [candidateContactNum, setCandidateContactNum] = useState(0);
  const [candidateNoticePeriod, setCandidateNoticePeriod] = useState("");
  const [candidateCurrCompany, setCandidateCurrCompany] = useState("");
  const [candidateCurrentCTC, setCandidateCurrentCTC] = useState(0);
  const [candidateExpectedCTC, setCandidateExpectedCTC] = useState(0);
  const [candidateCurrency, setCandidateCurrency] = useState("");
  const [candidateListArr, setCandidateListArr] = useState([]);
  const [formDataFlag, setFormDataFlag] = useState(false);
  const [countryCode, setCountryCode] = useState("IND");
  const [validated, setValidated] = useState(false);
  const [resumeFile, setResumeFile] = useState({});
  const [showAlert, setShowAlert] = useState(false);
  const [showFileUploadAlert, setShowFileUploadAlert] = useState(false);
  const [showAlertText, setShowAlertText] = useState("");
  const [alertType, setAlertType] = useState("");
  const [resumeName, setResumeName] = useState(
    "PDF, DOC, DOCX files are allowed"
  );
  const { Option } = Select;
  var jobId = window.location.pathname.split("/").pop();
  var FormData = require("form-data");
  var formData = new FormData();

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      // finalSubmitFunc(event);
      candidateAddFunc(event);
    }
    setValidated(true);
  };

  const onFileChange = (files) => {
    // formData.append("resumeFile", files[0]);
    setResumeName(files[0].name);
    setResumeFile(files[0]);
    setShowFileUploadAlert(true);
    setFormDataFlag(true);
    setTimeout(() => {
      setShowFileUploadAlert(false);
    }, 1000);
  };

  const handleToggle = () => {
    if (toggleStatus == "left") {
      setSidebarSatus("right");
    } else {
      setSidebarSatus("left");
    }
  };

  const candidateAddFunc = (event) => {
    on();
    if (formDataFlag === false) {
      off();
      setShowAlertText("Please Upload a resume!");
      setAlertType("danger");
      setShowAlert(true);
      return;
    }
    var candidateData = {};
    candidateData["firstName"] = candidateFirstName;
    candidateData["lastName"] = candidateLastName;
    // candidateData["fullName"] = `${candidateFirstName} ${candidateLastName}`;
    candidateData["emailId"] = candidateEmail;
    candidateData["mobileNumber"] = candidateContactNum;
    candidateData["currencyType"] = candidateCurrency;
    candidateData["currentCTC"] = candidateCurrentCTC;
    candidateData["expectedCTC"] = candidateExpectedCTC;
    // candidateData["availableFrom"] = candidateDate + "T12:14:10";
    candidateData["availableFrom"] = "2022-07-27T08:06:19";
    formData.append("uploadResumeRequest", JSON.stringify(candidateData));
    formData.append("resumeFile", resumeFile);

    const url = `${hirePPBaseURl}/resume/upload?jdId=${jobId}`;
    // let baseUrl = WebUtils.getBaseUrl();
    // const url = `${baseUrl}/aimatcher/api/v1/resume/upload?jdId=${jobId}`;
    WebUtils.httpOperations(url, formData, "POST").then(
      (response) => {
        if (response.data.resultStatusInfo.resultCode === "SUCCESS") {
          $(".form-control").removeClass("is-invalid");
          setCandidateFirstName("");
          setCandidateLastName("");
          setCandidateEmail("");
          setCandidateContactNum(0);
          setCandidateNoticePeriod("");
          setCandidateCurrCompany("");
          setCandidateCurrentCTC(0);
          setCandidateExpectedCTC(0);
          setCandidateCurrency("");
          $("#uploadResume").val("");
          setResumeName("");
          setValidated(true);
          var candidateData = {};
          // candidateData["fullName"] = response.data.data.fullName;
          candidateData["firstName"] = response.data.data.firstName;
          candidateData["lastName"] = response.data.data.lastName;
          candidateData["cv_id"] = response.data.data.resumeIdentifier;
          setCandidateListArr((arr) => [...arr, candidateData]);
          setValidated(false);
          event.target.reset();
          off();
          setShowAlertText(
            "candidate added successfully, you can add new candidate!"
          );
          setAlertType("success");
          setShowAlert(true);
          setTimeout(() => {
            setShowAlert(false);
          }, 1000);
        } else {
          off();
          setShowAlert(true);
          setAlertType("danger");
          setShowAlertText(response.data.resultStatusInfo.message);
          return;
        }
      },
      (error) => {
        console.log(error);
        off();
      }
    );
  };

  function on() {
    document.getElementById("overlayAllJd").style.display = "block";
  }

  function off() {
    document.getElementById("overlayAllJd").style.display = "none";
  }

  const resetFunc = () => {
    setCandidateFirstName("");
    setCandidateLastName("");
    setCandidateEmail("");
    setCandidateContactNum(0);
    setCandidateNoticePeriod("");
    setCandidateCurrCompany("");
    setCandidateCurrentCTC(0);
    setCandidateExpectedCTC(0);
    setCandidateCurrency("");
    $("#uploadResume").val("");
    // event.target.reset();
  };

  const addCandidateFinish = () => {
    if (candidateListArr.length === 0) {
      setShowAlertText(
        "No candidates have been added, Please fill the form and click 'Add' to add candidates."
      );
      setAlertType("warning");
      setShowAlert(true);
    } else {
      window.location.href = `/viewJd/${jobId}`;
    }
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
        <TopBar pageName="Add Candidate" />
        <div id="overlayAllJd">
          <div id="loaderPos">Loading...</div>
          {/* <Spinner id="loaderPos" animation="border" variant="light" /> */}
        </div>
        <Container style={{ maxWidth: "96%" }}>
          <Row>
            <Col md={9}>
              <Form noValidate validated={validated} onSubmit={handleSubmit}>
                <Row>
                  <Col md={6}>
                    <p>Add Candidate Information here</p>
                  </Col>
                  <Col md={6} className="d-flex justify-content-end">
                    <Button
                      variant="outline-dark"
                      onClick={resetFunc}
                      style={{ marginRight: "10px" }}
                    >
                      Reset
                    </Button>
                    <Button
                      className="addCandidateBtn"
                      variant="success"
                      // style={{ marginLeft: "10px", background: "#206DC5" }}
                      type="submit"
                    >
                      Add
                    </Button>
                  </Col>
                  <div className="mt-1"></div>
                  <Col md={12}>
                    <Card className="addCandidateCards">
                      <Card.Body>
                        <Alert
                          show={showAlert}
                          variant={alertType}
                          onClose={() => setShowAlert(false)}
                          dismissible
                        >
                          {showAlertText}
                        </Alert>
                        <Row>
                          <Col md={12}>
                            <h5>General Details</h5>
                          </Col>
                          <Col md={6}>
                            <Form.Label>First Name</Form.Label>
                            <Form.Control
                              required
                              className="addCandidateInput"
                              size="sm"
                              type="text"
                              value={candidateFirstName}
                              onChange={(e) =>
                                setCandidateFirstName(e.target.value)
                              }
                            />
                          </Col>
                          <Col md={6}>
                            <Form.Label>Last Name</Form.Label>
                            <Form.Control
                              required
                              className="addCandidateInput"
                              size="sm"
                              type="text"
                              value={candidateLastName}
                              onChange={(e) =>
                                setCandidateLastName(e.target.value)
                              }
                            />
                          </Col>
                          <div className="mt-1"></div>
                          <Col md={6}>
                            <Form.Label>Email Id</Form.Label>
                            <Form.Control
                              required
                              className="addCandidateInput"
                              size="sm"
                              type="email"
                              value={candidateEmail}
                              onChange={(e) =>
                                setCandidateEmail(e.target.value)
                              }
                            />
                          </Col>
                          <Col md={6}>
                            <Form.Label style={{ marginBottom: "0px" }}>
                              Contact No.
                            </Form.Label>

                            <Input.Group compact>
                              <Select
                                defaultValue="IND"
                                // defaultValue={countryCode}
                                size="middle"
                                onChange={(e) => setCountryCode(e.target.value)}
                              >
                                <Option value="IND">IND</Option>
                                <Option value="USA">USA</Option>
                                <Option value="CAN">CAN</Option>
                                <Option value="EU">EU</Option>
                              </Select>
                              <Input
                                size="middle"
                                style={{ width: "82%" }}
                                defaultValue="Contact No."
                                type="number"
                                maxLength={10}
                                placeholder="Contact No."
                                value={
                                  candidateContactNum === 0
                                    ? ""
                                    : candidateContactNum
                                }
                                onChange={(e) =>
                                  setCandidateContactNum(e.target.value)
                                }
                              />
                            </Input.Group>
                          </Col>
                          <div className="mt-1"></div>
                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>Notice Period</Form.Label>
                              <Form.Select
                                size="sm"
                                className="addCandidateInput"
                                value={candidateNoticePeriod}
                                onChange={(e) =>
                                  setCandidateNoticePeriod(e.target.value)
                                }
                                required
                              >
                                <option value="" disabled>
                                  -Select from the List-
                                </option>
                                <option value="1">Immediate</option>
                                <option value="2">Less than 30 Days</option>
                                <option value="3">More than 30 days</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                    <div className="mt-1"></div>
                    <Card className="addCandidateCards">
                      <Card.Body>
                        <Row>
                          <Col md={12}>
                            <h5>Pay</h5>
                          </Col>
                          <Col md={6}>
                            <Form.Label>Current Company</Form.Label>
                            <Form.Control
                              required
                              className="addCandidateInput"
                              size="sm"
                              type="text"
                              value={candidateCurrCompany}
                              onChange={(e) =>
                                setCandidateCurrCompany(e.target.value)
                              }
                            />
                          </Col>
                          <Col md={6}>
                            <Form.Group>
                              <Form.Label>Currency Type</Form.Label>
                              <Form.Select
                                className="addCandidateInput"
                                size="sm"
                                value={candidateCurrency}
                                required
                                onChange={(e) =>
                                  setCandidateCurrency(e.target.value)
                                }
                              >
                                <option value="" disabled>
                                  -Select from the List-
                                </option>
                                <option value="1">INR*</option>
                                <option value="2">GBP*</option>
                                <option value="3">USD*</option>
                              </Form.Select>
                            </Form.Group>
                          </Col>
                          <div className="mt-1"></div>
                          <Col md={6}>
                            <Form.Label>Current CTC</Form.Label>
                            <Form.Control
                              className="addCandidateInput"
                              size="sm"
                              type="number"
                              placeholder="Currenct CTC"
                              required
                              value={
                                candidateCurrentCTC === 0
                                  ? ""
                                  : candidateCurrentCTC
                              }
                              onChange={(e) =>
                                setCandidateCurrentCTC(e.target.value)
                              }
                            />
                          </Col>
                          <Col md={6}>
                            <Form.Label>Expected CTC</Form.Label>
                            <Form.Control
                              required
                              className="addCandidateInput"
                              size="sm"
                              type="number"
                              placeholder="Expected CTC"
                              value={
                                candidateExpectedCTC === 0
                                  ? ""
                                  : candidateExpectedCTC
                              }
                              onChange={(e) =>
                                setCandidateExpectedCTC(e.target.value)
                              }
                            />
                          </Col>
                          <div className="mt-1"></div>
                        </Row>
                      </Card.Body>
                    </Card>
                    <div className="mt-1"></div>
                    <Card className="addCandidateCards">
                      <Card.Body>
                        <Row className="d-flex justify-content-center">
                          <Col md={12}>
                            <Alert
                              show={showFileUploadAlert}
                              variant="success"
                              onClose={() => setShowFileUploadAlert(false)}
                              dismissible
                            >
                              File uploaded successfully.
                            </Alert>
                          </Col>
                          <Col
                            md={12}
                            className="d-flex justify-content-center"
                          >
                            <Form.Label>Upload Resume</Form.Label>
                          </Col>

                          <Col md={8} className="d-flex justify-content-center">
                            <Card className="addCandidateUploadCard">
                              <Card.Body>
                                <DropFileInput
                                  onFileChange={(files) => onFileChange(files)}
                                  resumeName={resumeName}
                                />
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                </Row>
              </Form>
            </Col>
            <Col md={3}>
              <Row>
                <div id="addCandidateList">
                  <Row>
                    <Col md={12} className="d-flex justify-content-center">
                      <h5 style={{ marginTop: "5px" }}>
                        Added Candidates ({candidateListArr.length})
                      </h5>
                    </Col>
                    {candidateListArr
                      .slice(0)
                      .reverse()
                      .map((index, item) => {
                        return (
                          <Col md={12} key={item}>
                            <Card className="candidateListCard">
                              <Card.Body>
                                <Row>
                                  <Col md={12}>
                                    <h6 style={{ color: "white" }}>
                                      {`${index.firstName} ${index.lastName}`}
                                      {/* {`${index.fullName}`} */}
                                    </h6>
                                  </Col>
                                  <Col md={12}>
                                    <p>{index.cv_id}</p>
                                  </Col>
                                  <Col
                                    md={12}
                                    className="d-flex justify-content-end"
                                    style={{
                                      fontSize: "10px",
                                      marginTop: "-10px",
                                    }}
                                  >
                                    <span>Added 1 min ago</span>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        );
                      })}
                  </Row>
                </div>
              </Row>
              <Row className="d-flex justify-content-center">
                <Button
                  className="addCandidateBtn"
                  onClick={addCandidateFinish}
                  style={{ width: "22vw" }}
                >
                  Finish
                </Button>
                {/* <Col md={12} className="d-flex justify-content-center"></Col> */}
              </Row>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default CreateJd;
