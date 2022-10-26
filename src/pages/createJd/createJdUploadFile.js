import { Fragment, useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";
import Container from "react-bootstrap/esm/Container";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import pattern3 from "../../assets/createJobFlow/pattern3.svg";
import "../../styles/createJdNew.css";
import hirePPBaseURl from "../../assets/envVar/baseUrl";
import axios from "axios";
import uploadSvg1 from "../../assets/createJobFlow/uploadJd1.svg";
import uploadSvg2 from "../../assets/createJobFlow/uploadJd2.svg";
import $ from "jquery";
import DropFileInput from "../../components/drop-file-input/DropFileInput";

function CreateJdStepUploadFile(props) {
  const [toggleStatus, setSidebarSatus] = useState("right");
  const [resumeName, setResumeName] = useState(
    "PDF, DOC, DOCX files are allowed"
  );
  var jobId = localStorage.getItem("currJobId");

  const handleToggle = () => {
    if (toggleStatus == "left") {
      setSidebarSatus("right");
    } else {
      setSidebarSatus("left");
    }
  };
  useEffect(() => {
    $(".createJdProgressBar").css("width", "50%");
  }, []);

  const uploadJDFunc = (uploadedFile) => {
    on();
    var FormData = require("form-data");
    var formData = new FormData();
    var jobId = localStorage.getItem("currJobId");
    formData.append("jdFile", uploadedFile);
    const url = `${hirePPBaseURl}/jd/upload?jdIdentifier=${jobId}`;
    const config = {
      headers: {
        userName: "abcd",
        userId: "aid",
        "content-type": "multipart/form-data",
        Authorization: "Basic YWRtaW46SGlyZXVzckA0NTc=",
      },
    };
    console.log(formData);
    axios
      .post(url, formData, config)
      .then(function (response) {
        console.log(response);
        localStorage.setItem("jdUploadData", JSON.stringify(response.data));
        off();
        // alert(
        //   "file uploaded successfully, need to redirect to job view screen"
        // );

        window.location.href = `/allJd`;
      })
      .catch(function (error) {
        off();
        console.log(error);
      });
  };

  const fillFormRedirect = () => {
    var newObj = {};
    localStorage.setItem("newJobObj", JSON.stringify(newObj));
    window.location.href = "./createJdDescription";
  };

  const onFileChange = (files) => {
    console.log(files);
    setResumeName(files[0].name);
    uploadJDFunc(files[0]);
  };

  function on() {
    document.getElementById("overlayAllJd").style.display = "block";
  }

  function off() {
    document.getElementById("overlayAllJd").style.display = "none";
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
        <Container style={{ maxWidth: "100%" }}>
          <Row id="createJobBanner">
            <Col
              md={12}
              className="d-flex justify-content-center align-items-center"
            >
              <h1
                style={{ color: "white" }}
              >{`Choose an option to fill J.D: ${jobId}`}</h1>
            </Col>
          </Row>
          <Row id="createJdContainer">
            <Card id="mainBodyCard">
              <Card.Body>
                <Row>
                  <Col md={8}>
                    <Card>
                      <Card.Body id="createJdFormBody">
                        <Row
                          className="d-flex justify-content-center"
                          style={{ height: "58vh" }}
                        >
                          <Col
                            md={9}
                            className="d-flex justify-content-center align-items-center"
                          >
                            <Card className="uploadJdSubCards">
                              <Card.Body>
                                <DropFileInput
                                  onFileChange={(files) => onFileChange(files)}
                                  resumeName={resumeName}
                                />
                              </Card.Body>
                            </Card>
                          </Col>
                          <Col
                            md={9}
                            className="d-flex justify-content-center align-items-center"
                          >
                            <Card
                              className="uploadJdSubCards"
                              onClick={fillFormRedirect}
                            >
                              <Card.Body>
                                <Row>
                                  <Col md={2}>
                                    <img src={uploadSvg2} alt="" />
                                  </Col>
                                  <Col
                                    md={10}
                                    className="d-flex justify-content-center"
                                  >
                                    <Row>
                                      <Col
                                        md={12}
                                        className="d-flex justify-content-center"
                                      >
                                        {" "}
                                        <h4>Manually fill the form</h4>
                                      </Col>
                                      <Col
                                        md={12}
                                        className="d-flex justify-content-center"
                                      >
                                        <p>This takes time and not preferred</p>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </Card.Body>
                            </Card>
                          </Col>
                        </Row>
                      </Card.Body>
                    </Card>
                  </Col>
                  <Col
                    md={4}
                    className="d-flex justify-content-center align-items-center"
                  >
                    <img src={pattern3} alt="" style={{ height: "55vh" }} />
                  </Col>
                </Row>
              </Card.Body>
            </Card>
          </Row>
          <div className="createjdProgressContainer">
            <div className="createJdProgressBar"></div>
          </div>
          <div className="mt-3"></div>
          {/* <Row>
            <Col md={6} className="d-flex justify-content-start">
              <button className="navBtn" onClick={prevPageFunc}>
                Previous
              </button>
            </Col>
            <Col md={6} className="d-flex justify-content-end">
              <button className="navBtn" onClick={nextPageFunc}>
                Next
              </button>
            </Col>
          </Row> */}
        </Container>
      </div>
    </div>
  );
}
export default CreateJdStepUploadFile;
