import { useState, useEffect } from "react";
import Sidebar from "../../components/sideBarStandalone";
import TopBar from "../../components/TopBar";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import "../../styles/createJdNew.css";
import $ from "jquery";
import Alert from "react-bootstrap/Alert";

import "react-bootstrap-timezone-picker/dist/react-bootstrap-timezone-picker.min.css";

$(document).ready(function () {
  var today = new Date().toISOString().split("T")[0];
  if (document.getElementsByName("setTodaysDate")[0]) {
    document.getElementsByName("setTodaysDate")[0].setAttribute("min", today);
  }
});

function StandAlone4(props) {
  const [toggleStatus, setSidebarSatus] = useState("right");
  const [validated, setValidated] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertText, setShowAlertText] = useState("");
  const [hirePPDataObj, setDataObj] = useState({});

  useEffect(() => {
    $(".createJdProgressBar").css("width", "100%");
    var prevData = localStorage.getItem("finalStandAloneDataObj");

    var prevdataObj = JSON.parse(prevData);
    if (prevdataObj !== null) {
      setDataObj(prevdataObj);
    }
  }, []);

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

  const nextPageNavigation = () => {
    var prevData = localStorage.getItem("finalStandAloneDataObj");
    var prevDataObj = JSON.parse(prevData);
    var page2ConsolidatedData = { ...prevDataObj, ...hirePPDataObj };
    localStorage.setItem(
      "finalStandAloneDataObj",
      JSON.stringify(page2ConsolidatedData)
    );
    window.location.href = `standAlonePreview`;
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
              <h1 style={{ color: "white" }}>Scheduler</h1>
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
                    <Col md={9} style={{ height: "66vh" }}>
                      <Row>
                        <Col md={6}>
                          <Form.Group
                            className="createJdInputs"
                            controlId="validationCustom01"
                          >
                            <Form.Label>Date</Form.Label>
                            <Form.Control
                              required
                              type="date"
                              name="setTodaysDate"
                              value={hirePPDataObj.interviewDate}
                              onChange={(e) =>
                                setDataObj((prevState) => ({
                                  ...prevState,
                                  interviewDate: e.target.value,
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
                            <Form.Label>Start Time</Form.Label>
                            <Form.Control
                              required
                              type="time"
                              value={hirePPDataObj.interviewStartTime}
                              onChange={(e) =>
                                setDataObj((prevState) => ({
                                  ...prevState,
                                  interviewStartTime: e.target.value,
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
                            <Form.Label>End Time</Form.Label>
                            <Form.Control
                              required
                              type="time"
                              value={hirePPDataObj.interviewEndTime}
                              onChange={(e) =>
                                setDataObj((prevState) => ({
                                  ...prevState,
                                  interviewEndTime: e.target.value,
                                }))
                              }
                            />
                          </Form.Group>
                        </Col>
                        <Col md={6}>
                          <Form.Group>
                            <Form.Label>Interview Time Zone</Form.Label>
                            <Form.Select
                              value={hirePPDataObj.interviewTimeZone}
                              onChange={(e) =>
                                setDataObj((prevState) => ({
                                  ...prevState,
                                  interviewTimeZone: e.target.value,
                                }))
                              }
                              required
                            >
                              <option value="GMT+0">GMT+0:30</option>
                              <option value="GMT+5:30">IND +5:30</option>

                              <option value="GMT-6:00">PCT -6:00</option>
                              <option value="GMT-7:00">GMT -7:00</option>
                            </Form.Select>
                          </Form.Group>
                        </Col>
                      </Row>
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
                <button
                  className="navBtn"
                  onClick={() => {
                    window.location.href = `standAloneInterview3`;
                  }}
                >
                  Previous
                </button>
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
export default StandAlone4;
