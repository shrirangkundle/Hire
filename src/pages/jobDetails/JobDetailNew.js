import { Fragment, useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import Card from "react-bootstrap/Card";
import defaultCompanySvg from "../../assets/AddCandidate/companyLogo.svg";
import defaultOwnerImg from "../../assets/AddCandidate/ownerDefault.png";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { AiOutlineUser, AiOutlineCalendar } from "react-icons/ai";
import { RiSuitcaseLine } from "react-icons/ri";
import { BsShield } from "react-icons/bs";
import Accordion from "react-bootstrap/Accordion";
import { FiHexagon } from "react-icons/fi";
import hirePPBaseURl from "../../assets/envVar/baseUrl";
import axios from "axios";
import Button from "react-bootstrap/Button";
import WebUtils from "../../WebUtils";
import "../../styles/jobdetails.css";
import TopBar from "../../components/TopBar";
// /aimatcher/api/v1

function NewAllJd(props) {
  const [toggleStatus, setSidebarSatus] = useState("right");
  const [jobDescription, setJobDescription] = useState({});
  const [createdDate, setCreatedDate] = useState("01-01-2011");
  const [dateOfJoining, setDateOfJoining] = useState("01-01-2022*");
  const [skillArr, setSkillArr] = useState([]);
  var jobId = window.location.pathname.split("/").pop();
  console.log(jobId);

  const allJdPageRedirection = () => {
    window.location.href = "/allJd";
  };

  const jobDetailsFunc = () => {
    WebUtils.httpOperations(
      `${hirePPBaseURl}/jd/?jdId=${jobId}`,
      {},
      "GET"
    ).then(
      (response) => {
        setJobDescription(response.data.data);
      },
      (error) => error
    );
  };

  useEffect(() => {
    jobDetailsFunc();
  }, []);

  const handleToggle = () => {
    if (toggleStatus == "left") {
      setSidebarSatus("right");
    } else {
      setSidebarSatus("left");
    }
  };
  return (
    <div className="hirePlusPlusPageContent">
      <Sidebar toggleStatus={toggleStatus} toggleHandle={handleToggle} />
      <div
        style={{
          width: toggleStatus == "left" ? "100%" : "81%",
          height: "100vh",
          overflowY: "auto",
          transition: "all 0.3s",
        }}
      >
        <TopBar pageName="Review job Description" />
        <Container>
          <Row>
            <Col md={12}>
              <Card id="jobDetailsCard">
                <Card.Body>
                  <Row>
                    <Col md={12}>
                      <h5 className="jobDetailCardFont">
                        Basic Client Information
                      </h5>
                    </Col>
                    <div className="mt-4"></div>
                    <Col md={12}>
                      <Row style={{ width: "78vw" }}>
                        <Col md={6}>
                          <h2 className="jobDetailCardFont">
                            {jobDescription.jdName}
                          </h2>
                          {/* <div className="mt-1"></div> */}
                          <p className="jobDetailCardFont">{jobId}</p>
                        </Col>
                        <Col md={6} className="d-flex justify-content-end">
                          <Row>
                            <Col className="d-flex justify-content-end align-items-start">
                              <img
                                src={defaultCompanySvg}
                                alt=""
                                style={{ width: "50px" }}
                              />
                            </Col>
                            <Col>
                              <Row style={{ width: "27vw" }}>
                                <Col
                                  md={12}
                                  className="d-flex align-items-center"
                                >
                                  <h5 className="jobDetailCardFont">
                                    {jobDescription.clientName}
                                  </h5>
                                </Col>
                                <Col
                                  md={12}
                                  className="d-flex align-items-center"
                                >
                                  <p className="jobDetailCardFont">
                                    Hiring Manager : Tim Cook*
                                  </p>
                                </Col>
                              </Row>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </Col>
                    <div className="mt-4"></div>
                    <Col md={12}>
                      <img src={defaultOwnerImg} className="ownerLeft" />
                      <div className="ownerRight jobDetailCardFont">
                        {`Owner: ${jobDescription.hiringDetails}`}
                      </div>
                    </Col>
                    <div className="mt-4"></div>
                    <Col md={12}>
                      <Row>
                        <Col md={3}>
                          <div className="ownerLeft">
                            <HiOutlineLocationMarker
                              size={20}
                              color={"white"}
                            ></HiOutlineLocationMarker>
                          </div>
                          <div className="ownerRight">
                            <p className="jobDetailCardFont">
                              {`Location: ${jobDescription.jobLocation}`}
                            </p>
                          </div>
                        </Col>
                        <Col md={3}>
                          <div className="ownerLeft">
                            <AiOutlineUser
                              size={20}
                              color={"white"}
                            ></AiOutlineUser>
                          </div>
                          <div className="ownerRight">
                            <p className="jobDetailCardFont">{`Openings: ${jobDescription.numberOfOpenings}`}</p>
                          </div>
                        </Col>
                        <Col md={3}>
                          <div className="ownerLeft">
                            <RiSuitcaseLine
                              size={20}
                              color={"white"}
                            ></RiSuitcaseLine>
                          </div>
                          <div className="ownerRight">
                            <p className="jobDetailCardFont">
                              {`Employment Type: ${jobDescription.jobEngagementType}`}
                            </p>
                          </div>
                        </Col>
                        <Col md={3}>
                          <div className="ownerLeft">
                            <AiOutlineCalendar
                              size={20}
                              color={"white"}
                            ></AiOutlineCalendar>
                          </div>
                          <div className="ownerRight">
                            <p className="jobDetailCardFont">
                              {`Date Of Joining: ${dateOfJoining}`}
                            </p>
                          </div>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="d-flex justify-content-center">
            <Col md={10}>
              <Accordion
                defaultActiveKey={["0"]}
                alwaysOpen
                id="jobDetailsAccordion"
              >
                <Accordion.Item
                  eventKey="0"
                  className="jobDetailsAccordionItem"
                >
                  <Accordion.Header>General Details</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <p>
                        Employment Type :{" "}
                        <strong>{jobDescription.jobEngagementType}</strong>
                      </p>
                    </Row>

                    <Row>
                      <Col md={4}>
                        <div className="ownerLeft">
                          <BsShield></BsShield>
                        </div>
                        <div className="ownerRight">
                          <p>{`Domain: ${jobDescription.preferredDomain}`}</p>
                        </div>
                      </Col>
                      <Col md={4}>
                        <div className="ownerLeft">
                          <FiHexagon></FiHexagon>
                        </div>
                        <div className="ownerRight">
                          <p>{`Functional Area: ${jobDescription.functionalArea}`}</p>
                        </div>
                      </Col>
                    </Row>
                    <hr />
                    <Row>
                      <h4>About Company</h4>
                      <p>
                        Need a Product Designer based in Melbourne, Australia. I
                        specialise in UX/UI design, brand strategy, and Webflow
                        development. I'm always striving to grow and learn
                        something new and I don't take myself too seriously. I'm
                        passionate about helping startups grow, improve their
                        customer experience, and to raise venture capital
                        through good design. (hardcoaded)
                      </p>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item
                  eventKey="1"
                  className="jobDetailsAccordionItem"
                >
                  <Accordion.Header>Skills and Experience</Accordion.Header>
                  <Accordion.Body>
                    {/* Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    Duis aute irure dolor in reprehenderit in voluptate velit
                    esse cillum dolore eu fugiat nulla pariatur. Excepteur sint
                    occaecat cupidatat non proident, sunt in culpa qui officia
                    deserunt mollit anim id est laborum. */}
                    <Row>
                      {skillArr.map((item, index) => {
                        return <h5>Hello</h5>;
                      })}
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item
                  eventKey="2"
                  className="jobDetailsAccordionItem"
                >
                  <Accordion.Header>Salary and Perks</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <h6>Salary Range</h6>
                    </Row>
                    <Row>
                      <Col md={6}>
                        <p>{`Minimum Salary: ${jobDescription.minSalary}`}</p>
                      </Col>
                      <Col md={6}>
                        <p>{`Maximum Salary: ${jobDescription.maxSalary}`}</p>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item
                  eventKey="3"
                  className="jobDetailsAccordionItem"
                >
                  <Accordion.Header>More Details</Accordion.Header>
                  <Accordion.Body>
                    <p>Expected Date of joining</p>

                    <p>{dateOfJoining}</p>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </Col>
            <div className="mt-4"></div>
            <Col md={12} className="d-flex justify-content-end">
              <Button variant="light">Reject</Button>
              <Button
                style={{
                  background: "#206DC5 ",
                  // width: "20vw",
                  height: "3vw",
                }}
                onClick={allJdPageRedirection}
              >
                Confirm and Save
              </Button>
            </Col>
            <div className="mt-4"></div>
          </Row>
        </Container>
      </div>
    </div>
  );
}
export default NewAllJd;
