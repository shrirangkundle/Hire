import { useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import pattern6 from "../../assets/createJobFlow/pattern6.svg";
import "../../styles/createJdNew.css";
import hirePPBaseURl from "../../assets/envVar/baseUrl";
import $ from "jquery";
import WebUtils from "../../WebUtils";

// /aimatcher/api/v1
function CreateJdStepAdditionaldetails(props) {
  const [toggleStatus, setSidebarSatus] = useState("right");
  const [additionalDetails, setAdditionalDetails] = useState("");
  var jobObjStr = localStorage.getItem("newJobObj");
  var currJobId = localStorage.getItem("currJobId");
  var positionName = localStorage.getItem("currJobName");
  localStorage.setItem("flag2", true);
  var jobObj = JSON.parse(jobObjStr);

  const handleToggle = () => {
    if (toggleStatus == "left") {
      setSidebarSatus("right");
    } else {
      setSidebarSatus("left");
    }
  };
  useEffect(() => {
    $(".createJdProgressBar").css("width", "100%");
    if (jobObj.additionalInfo !== undefined) {
      setAdditionalDetails(jobObj.additionalInfo);
    }
  }, []);

  function prevPageFunc() {
    jobObj["additionalInfo"] = additionalDetails;
    localStorage.setItem("newJobObj", JSON.stringify(jobObj));
    window.location.href = "./createJdSkills";
  }

  function createJobFunc() {
    on();
    jobObj["jdIdentifier"] = currJobId;
    jobObj["jobTitle"] = positionName;
    jobObj["location"] = "Hyderabad";
    jobObj["preferredJoiningDate"] = "2022-07-27T08:06:19";
    WebUtils.httpOperations(
      `${hirePPBaseURl}/jd/fillForm`,
      jobObj,
      "POST"
    ).then(
      (res) => {
        localStorage.removeItem("newJobObj");
        localStorage.removeItem("currJobId");
        localStorage.removeItem("currJobName");
        localStorage.setItem("flag2", true);
        off();
        window.location.href = `/reviewJd/${currJobId}`;
      },
      (error) => {
        off();
        console.log(error);
      }
    );
  }

  function on() {
    document.getElementById("overlayAllJd").style.display = "block";
  }

  function off() {
    document.getElementById("overlayAllJd").style.display = "none";
  }

  return (
    <div className="recuiter-profile-page">
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
        <Container style={{ maxWidth: "100%" }}>
          <Row id="createJobBanner">
            <Col
              md={12}
              className="d-flex justify-content-center align-items-center"
            >
              <h1 style={{ color: "white" }}>Add More Details</h1>
            </Col>
          </Row>
          <Row id="createJdContainer">
            <Card id="mainBodyCard">
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <Card>
                      <Card.Body id="createJdFormBody">
                        <Row>
                          <Col md={12}>
                            <div className="form-group">
                              More Details
                              <textarea
                                type="text"
                                id="clientName"
                                rows={5}
                                className="form-control form-control-md jobDescriptionText"
                                value={additionalDetails}
                                onChange={(e) =>
                                  setAdditionalDetails(e.target.value)
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
                    <img src={pattern6} alt="" style={{ height: "55vh" }} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
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
              <button className="navBtn" onClick={createJobFunc}>
                Create Job
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default CreateJdStepAdditionaldetails;
