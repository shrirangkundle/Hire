import { Fragment, useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import pattern4 from "../../assets/createJobFlow/pattern4.svg";
import "../../styles/createJdNew.css";
import hirePPBaseURl from "../../assets/envVar/baseUrl";
import axios from "axios";
import $ from "jquery";

function CreateJdDescription(props) {
  const [toggleStatus, setSidebarSatus] = useState("right");
  const [jobDescription, setJobDescription] = useState("");
  const [jobRequirements, setJobRequirements] = useState("");
  const [jobPerks, setJobPerks] = useState("");
  const [validated, setValidated] = useState(false);
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      event.preventDefault();
      nextPageFunc();
    }
    setValidated(true);
  };

  var jobObj = JSON.parse(localStorage.getItem("newJobObj"));
  // var jobObj = {};

  const handleToggle = () => {
    if (toggleStatus == "left") {
      setSidebarSatus("right");
    } else {
      setSidebarSatus("left");
    }
  };
  useEffect(() => {
    $(".createJdProgressBar").css("width", "66.6%");
    var storedObj = JSON.parse(localStorage.getItem("newJobObj"));
    if (storedObj !== null) {
      setJobDescription(storedObj.jobDescription);
      setJobRequirements(storedObj.jobRequirements);
      setJobPerks(storedObj.jobPerks);
    }
  }, []);
  function prevPageFunc() {
    window.location.href = "./createJdUploadFile";
  }

  function nextPageFunc() {
    if (jobDescription === "" || jobRequirements === "") {
      alert("Please enter the required data");
    } else {
      jobObj["jobDescription"] = jobDescription;
      jobObj["jobRequirements"] = jobRequirements;
      jobObj["jobPerks"] = jobPerks;
      localStorage.setItem("newJobObj", JSON.stringify(jobObj));
      window.location.href = "./createJdSkills";
    }
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
              <h1 style={{ color: "white" }}>Requirements and perks</h1>
            </Col>
          </Row>
          <Form noValidate validated={validated} onSubmit={handleSubmit}>
            <Row id="createJdContainer">
              <Card id="mainBodyCard">
                <Card.Body>
                  <Row>
                    <Col md={8}>
                      <Card>
                        <Card.Body id="createJdFormBody">
                          <Row>
                            <Col md={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="title of job"
                              >
                                <Form.Label>Job Description</Form.Label>
                                <textarea
                                  required
                                  className="form-control"
                                  id="exampleFormControlTextarea1"
                                  rows="3"
                                  placeholder=""
                                  value={jobDescription}
                                  onChange={(e) =>
                                    setJobDescription(e.target.value)
                                  }
                                ></textarea>
                              </Form.Group>
                            </Col>
                            <Col md={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="title of job"
                              >
                                <Form.Label>Requirements</Form.Label>
                                <textarea
                                  required
                                  className="form-control"
                                  id="exampleFormControlTextarea1"
                                  rows="3"
                                  placeholder=""
                                  value={jobRequirements}
                                  onChange={(e) =>
                                    setJobRequirements(e.target.value)
                                  }
                                ></textarea>
                              </Form.Group>
                            </Col>
                            <Col md={12}>
                              <Form.Group
                                className="mb-3"
                                controlId="title of job"
                              >
                                <p>Perks</p>
                                <textarea
                                  className="form-control"
                                  id="exampleFormControlTextarea1"
                                  rows="3"
                                  placeholder=""
                                  value={jobPerks}
                                  onChange={(e) => setJobPerks(e.target.value)}
                                ></textarea>
                              </Form.Group>
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
                      <img src={pattern4} alt="" style={{ height: "55vh" }} />
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
export default CreateJdDescription;
