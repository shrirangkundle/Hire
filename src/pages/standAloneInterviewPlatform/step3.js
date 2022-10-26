import { useState, useEffect } from "react";
import Sidebar from "../../components/sideBarStandalone";
import TopBar from "../../components/TopBar";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import "../../styles/createJdNew.css";
import $ from "jquery";
import Alert from "react-bootstrap/Alert";

import SkillWeightageModal from "../../components/viewJd/SkillWeightageInterviewPlatform";

$(document).ready(function () {
  var today = new Date().toISOString().split("T")[0];
  if (document.getElementsByName("setTodaysDate")[0]) {
    document.getElementsByName("setTodaysDate")[0].setAttribute("min", today);
  }
});

function StandAlone3(props) {
  const [toggleStatus, setSidebarSatus] = useState("right");
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertText, setShowAlertText] = useState("");
  const [finalSkillArr, setFinalSkillArr] = useState([]);
  const [nextFlag, setNextFlag] = useState(false);

  useEffect(() => {
    $(".createJdProgressBar").css("width", "75%");
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    setNextFlag(true);
  };

  const finalSkillArrFunc = (finalArr) => {
    setFinalSkillArr(finalArr);
  };

  useEffect(() => {
    if (finalSkillArr.length === 0 && nextFlag === true) {
      alert("Please select a skill");
    } else if (finalSkillArr.length > 0) {
      var prevData = localStorage.getItem("finalStandAloneDataObj");
      var prevDataObj = JSON.parse(prevData);
      var updatedData = { ...prevDataObj, interviewSkillArr: finalSkillArr };
      localStorage.setItem(
        "finalStandAloneDataObj",
        JSON.stringify(updatedData)
      );
      nextPageNavigation();
    }
  }, [finalSkillArr]);

  const nextPageNavigation = () => {
    window.location.href = `standAloneInterview4`;
  };

  const prevPageBtn = () => {
    window.location.href = `standAloneInterview2`;
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
              <h1 style={{ color: "white" }}>Skill Information</h1>
            </Col>
          </Row>

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
                  <Col md={9} style={{ height: "66vh", overflowY: "scroll" }}>
                    <SkillWeightageModal
                      skillArr={finalSkillArrFunc}
                      nextFlag={nextFlag}
                    />
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
              {/* <button className="navBtn" onClick={nextPageNavigation}>
                  Next
                </button> */}
              <button className="navBtn" onClick={handleSubmit}>
                Next
              </button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default StandAlone3;
