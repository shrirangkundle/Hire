import { Fragment, useState, useEffect } from "react";
import Sidebar from "../../components/SideBar";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import TopBar from "../../components/TopBar";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import hirePPBaseURl from "../../assets/envVar/baseUrl";
import Dropdown from "react-bootstrap/Dropdown";
import { Link } from "react-router-dom";
import defaultCompanyLogo from "../../assets/AllJd/companyLogo.svg";
import { FiUserPlus } from "react-icons/fi";
import "../../styles/allJd.css";
import Modal from "react-bootstrap/Modal";
import firstJdAdd from "../../assets/AllJd/firstJdAdd.svg";
import Spinner from "react-bootstrap/Spinner";
import { Pagination } from "antd";
import WebUtils from "../../WebUtils";
import eraseLocalStorage from "../../assets/eraseLocalStorage";
import { Select } from "antd";
import { DatePicker, Space } from "antd";

const { Option } = Select;
const { RangePicker } = DatePicker;
// const hirePPBaseURl = WebUtils.getBaseUrl();
//

function NewAllJd(props) {
  const [toggleStatus, setSidebarSatus] = useState("right");
  const [jobArr, setJobArr] = useState([]);
  const [currPage, setCurrPage] = useState(1);
  const [pageCount, setPageCount] = useState(0);
  const [uniqueCompany, setUniqueCompany] = useState([]);
  const [uniqueJobArr, setUniqueJobArr] = useState([]);
  const [uniqueDateArr, setUniqueDateArr] = useState([]);
  const [newPageSize, setNewPageSize] = useState(5);
  const [dataLoaded, setDataLoaded] = useState(false);
  const [searchArr, setSearchArr] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleToggle = () => {
    if (toggleStatus == "left") {
      setSidebarSatus("right");
    } else {
      setSidebarSatus("left");
    }
  };

  const onPageChange = (pageNumber) => {
    setCurrPage(pageNumber);
    localStorage.setItem("currentPage", pageNumber);
    pageCounterFunc();
    getAllJobs(pageNumber - 1, newPageSize);
  };

  function dateStringGenerator(dateStr) {
    var strArr = dateStr.split("T");
    var interStr = strArr[0];
    var FinalArr = interStr.split("-");
    return FinalArr[2] + "-" + FinalArr[1] + "-" + FinalArr[0];
  }

  const CreateJDRedirect = () => {
    localStorage.setItem("currentPage", 0);
    window.location.href = "./createJd";
    // navigate("../createJd", { replace: true });
  };
  const onChange = (value) => {
    jobDetailSearch(value);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const onClear = () => {
    getAllJobs(currPage - 1, newPageSize);
  };

  useEffect(() => {
    eraseLocalStorage();
    pageCounterFunc();
    var storedCurrPage = Number(localStorage.getItem("currentPage"));
    if (storedCurrPage == 0) {
      storedCurrPage = 1;
    }
    setCurrPage(storedCurrPage);
    getAllJobs(storedCurrPage - 1, newPageSize);
  }, []);

  function getAllJobs(currPage, pageSize) {
    on();
    // /aimatcher/api/v1

    WebUtils.httpOperations(
      `${hirePPBaseURl}/jd/all?pageNumber=${currPage}&pageSize=${pageSize}`,
      {},
      "GET"
    ).then(
      (response) => {
        setJobArr(response.data.data);

        if (response.data.data.length === 0) {
          // document.getElementById("filterRow").style.display = "none";
          // document.getElementById("mainContentRow").style.display = "none";
          document.getElementById("firstJobRow").style.display = "block";
        } else {
          document.getElementById("filterRow").style.display = "block";
          document.getElementById("mainContentRow").style.display = "block";
          // document.getElementById("firstJobRow").style.display = "none";
        }
        var uniqueJobArr = response.data.data
          .map((item) => item.jdName)
          .filter((value, index, self) => self.indexOf(value) === index);
        setUniqueJobArr(uniqueJobArr);
        var uniqueCompanyArr = response.data.data
          .map((item) => item.clientName)
          .filter((value, index, self) => self.indexOf(value) === index);
        setUniqueCompany(uniqueCompanyArr);
        var uniqueDateArr = response.data.data
          .map((item) => dateStringGenerator(item.createdDate))
          .filter((value, index, self) => self.indexOf(value) === index);
        setUniqueDateArr(uniqueDateArr);

        var searchArr = uniqueJobArr.concat(uniqueCompanyArr);
        setSearchArr(searchArr);
        off();
      },
      (error) => {
        console.log(error);
        off();
      }
    );
  }

  function pageCounterFunc() {
    WebUtils.httpOperations(`${hirePPBaseURl}/jd/all/count`, {}, "GET").then(
      (response) => {
        var count = response.data.data;
        var pageData = Math.ceil(count / newPageSize);
        var pageCount = pageData * 10;
        setPageCount(pageCount);
      },
      (error) => error
    );
  }

  const onDateChange = (value) => {
    console.log(value);
  };

  const jobSort = (jobId) => {
    var newArray = jobArr.filter(function (el) {
      return el.jdIdentifier == jobId;
    });
    setJobArr(newArray);
  };
  const jobNameSort = (jobName) => {
    var newArray = jobArr.filter(function (el) {
      return el.jdName == jobName;
    });
    setJobArr(newArray);
  };
  const dateSort = (date) => {
    var newArray = jobArr.filter(function (el) {
      return dateStringGenerator(el.createdDate) == date;
    });
    setJobArr(newArray);
  };
  const companySort = (companyName) => {
    var newArray = jobArr.filter(function (el) {
      return el.clientName == companyName;
    });
    setJobArr(newArray);
  };

  const jobDetailSearch = (str) => {
    var newArr = jobArr.filter(function (el) {
      if (
        el.clientName === str ||
        el.jdIdentifier === str ||
        el.jdName === str
      ) {
        return el;
      }
    });
    setJobArr(newArr);
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
        <TopBar pageName="Jobs" />
        <div id="overlayAllJd">
          <div id="loaderPos">Loading...</div>
          {/* <Spinner id="loaderPos" animation="border" variant="light" /> */}
        </div>
        <div className="hirePlusPlusPageContainer">
          <Row id="filterRow">
            <Col md={12}>
              <Card>
                <Card.Body
                  style={{ background: "#F9FAFB", paddingBottom: "10px" }}
                >
                  <Row>
                    <Col md={4}>
                      <Row>
                        <Col md={12}>
                          <p>Search</p>
                        </Col>
                        <Col md={12}>
                          {/* <Form.Control
                            size="sm"
                            type="text"
                            placeholder="Search for jobs, clients and more"
                          /> */}
                          <Select
                            allowClear="true"
                            showSearch
                            placeholder="Select a Skill"
                            optionFilterProp="children"
                            onChange={onChange}
                            onSearch={onSearch}
                            onClear={onClear}
                            filterOption={(input, option) =>
                              option.children
                                .toLowerCase()
                                .includes(input.toLowerCase())
                            }
                            style={{ width: "100%" }}
                          >
                            {searchArr.map((skill, index) => {
                              return (
                                <Option value={skill} key={index}>
                                  {skill}
                                </Option>
                              );
                            })}
                          </Select>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={2}>
                      <Row>
                        <Col md={12}>
                          <p>Job Status</p>
                        </Col>
                        <Col md={12}>
                          <Form.Select size="sm">
                            <option value="active">Active</option>
                            <option value="closed">Closed</option>
                          </Form.Select>
                        </Col>
                      </Row>
                    </Col>
                    <Col md={2}>
                      <Row>
                        <Col md={12}>
                          <p style={{ color: "white" }}>Filter</p>
                        </Col>
                        {/* <Col md={12}>
                          <Space
                            direction="vertical"
                            size={12}
                            onChange={onDateChange}
                          >
                            <RangePicker />
                          </Space>
                        </Col> */}
                        <Col md={12}>
                          <Button
                            variant="outline-secondary"
                            onClick={handleShow}
                            size="sm"
                          >
                            Filters
                          </Button>
                          <Modal show={show} onHide={handleClose} size="lg">
                            <Modal.Header closeButton></Modal.Header>
                            <Modal.Body>
                              <Row>
                                <Col md={4}>
                                  <Row>
                                    <Col md={12}>
                                      <p>Job Id</p>
                                    </Col>
                                    <Col md={12}>
                                      <Dropdown>
                                        <Dropdown.Toggle className="allJdFilters">
                                          Search for Job Id
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                          {jobArr.map((i, index) => {
                                            return (
                                              <Dropdown.Item
                                                key={index}
                                                onClick={() =>
                                                  jobSort(i.jdIdentifier)
                                                }
                                              >
                                                {i.jdIdentifier}
                                              </Dropdown.Item>
                                            );
                                          })}
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col md={4}>
                                  <Row>
                                    <Col md={12}>
                                      <p>Job Title</p>
                                    </Col>
                                    <Col md={12}>
                                      <Dropdown>
                                        <Dropdown.Toggle className="allJdFilters">
                                          Search for Job Title
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                          {uniqueJobArr.map((i, index) => {
                                            return (
                                              <Dropdown.Item
                                                key={index}
                                                onClick={() => jobNameSort(i)}
                                              >
                                                {i}
                                              </Dropdown.Item>
                                            );
                                          })}
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col md={4}>
                                  <Row>
                                    <Col md={12}>
                                      <p>Company</p>
                                    </Col>
                                    <Col md={12}>
                                      <Dropdown>
                                        <Dropdown.Toggle className="allJdFilters">
                                          Search...
                                        </Dropdown.Toggle>

                                        <Dropdown.Menu>
                                          {uniqueCompany.map((i, index) => {
                                            return (
                                              <Dropdown.Item
                                                key={index}
                                                onClick={() => companySort(i)}
                                              >
                                                {i}
                                              </Dropdown.Item>
                                            );
                                          })}
                                        </Dropdown.Menu>
                                      </Dropdown>
                                    </Col>
                                  </Row>
                                </Col>
                              </Row>
                              <div className="mt-4"></div>
                              <Row>
                                <p>Sort by Date</p>
                                <Space
                                  direction="vertical"
                                  size={12}
                                  onChange={onDateChange}
                                >
                                  <RangePicker />
                                </Space>
                              </Row>
                              <div className="mt-4"></div>
                              <Row>
                                {/* <Col md={12}>
                                  <p>Closing Date</p>
                                </Col> */}
                                {/* <Col md={4}>
                                  <Dropdown>
                                    <Dropdown.Toggle className="allJdFilters">
                                      Start date
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      {uniqueDateArr.map((i, index) => {
                                        return (
                                          <Dropdown.Item
                                            key={index}
                                            onClick={() => dateSort(i)}
                                          >
                                            {i}
                                          </Dropdown.Item>
                                        );
                                      })}
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </Col>
                                <Col md={4}>
                                  <Dropdown>
                                    <Dropdown.Toggle className="allJdFilters">
                                      End date
                                    </Dropdown.Toggle>

                                    <Dropdown.Menu>
                                      {uniqueDateArr.map((i, index) => {
                                        return (
                                          <Dropdown.Item
                                            key={index}
                                            onClick={() => dateSort(i)}
                                          >
                                            {i}
                                          </Dropdown.Item>
                                        );
                                      })}
                                    </Dropdown.Menu>
                                  </Dropdown>
                                </Col> */}
                                <Col md={4}>
                                  <Button
                                    onClick={() =>
                                      getAllJobs(currPage - 1, newPageSize)
                                    }
                                    style={{ background: "#206DC5 " }}
                                  >
                                    Clear
                                  </Button>
                                </Col>
                              </Row>
                            </Modal.Body>
                          </Modal>
                        </Col>
                      </Row>
                    </Col>
                    <Col
                      md={4}
                      className="d-flex justify-content-end align-items-end"
                    >
                      {/* <Row>
                        <Col md={12}>
                          <p style={{ color: "white" }}>Filter</p>
                        </Col>
                        <Col
                          md={12}
                          className="d-flex justify-content-end align-items-center"
                        ></Col>
                      </Row> */}
                      <Button
                        variant="primary"
                        style={{ background: "#206DC5" }}
                        onClick={CreateJDRedirect}
                      >
                        Add JD +
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="mt-4"></div>

          <Row className="d-flex justify-content-center">
            <Col md={12} id="mainContentRow">
              <Row>
                <Col md={3}>
                  <p style={{ marginLeft: "5vw" }}>Role</p>
                </Col>
                <Col md={2}>
                  <Row>
                    <Col md={4}></Col>
                    <Col md={8}>
                      <Row className="d-flex justify-content-center">
                        <Col md={12}>
                          <p style={{ marginLeft: "8%" }}>Company</p>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
                <Col md={2} className="d-flex justify-content-center">
                  <p>Closing Date</p>
                </Col>
                <Col md={3} className="d-flex justify-content-center">
                  <p style={{ marginLeft: "-6%" }}>
                    <span style={{ color: "#0086C9" }}>Uploaded</span>/
                    <span style={{ color: "#DC6803" }}>Shortlisted</span>/
                    <span style={{ color: "#039855" }}>Hired</span>
                  </p>
                </Col>
                <Col md={2}>
                  <p>Client Pipeline</p>
                </Col>
              </Row>
            </Col>
            <Col md={12}>
              <div>
                {jobArr.map((i, index) => {
                  var title = i.jdName;
                  var employerDetail = i.clientName;

                  return (
                    <div key={i.jdIdentifier}>
                      <Row>
                        <Col md={12}>
                          <Card key="primary" text="black" className="jobRow">
                            <Card.Body style={{ backgroundColor: "#F9FAFB" }}>
                              {/* <Card.Header>Header</Card.Header> */}
                              <Row className="d-flex align-items-center">
                                <Col
                                  className="d-flex align-items-center"
                                  md={3}
                                >
                                  <Row>
                                    <Col
                                      sm={2}
                                      className="d-flex  align-items-center"
                                    >
                                      <span>
                                        {index + (currPage - 1) * 5 + 1}
                                      </span>
                                    </Col>
                                  </Row>
                                  <Row
                                    style={{
                                      width: "20vw",
                                      marginLeft: "10px",
                                    }}
                                  >
                                    <Col
                                      sm={10}
                                      className="d-flex align-items-center"
                                    >
                                      <Link
                                        to={`/viewJd/${i.jdIdentifier}`}
                                        style={{ marginTop: "8px" }}
                                      >
                                        <h6
                                          style={{
                                            marginLeft: "15px",
                                            color: "#0086C9",
                                          }}
                                        >
                                          {title}
                                        </h6>
                                        <p
                                          style={{
                                            marginLeft: "15px",
                                            color: "#0086C9",
                                          }}
                                        >
                                          {i.jdIdentifier}
                                        </p>
                                      </Link>
                                    </Col>
                                    {/* <Col
                                      sm={2}
                                      className="d-flex  align-items-center"
                                    ></Col>
                                    <Col
                                      sm={10}
                                      className="d-flex align-items-center"
                                    >
                                      <Link to={`/viewJd/${i.jdIdentifier}`}>
                                        <p
                                          style={{
                                            marginLeft: "15px",
                                            color: "#0086C9",
                                          }}
                                        >
                                          {i.jdIdentifier}
                                        </p>
                                      </Link>
                                    </Col> */}
                                  </Row>
                                </Col>
                                <Col
                                  // className="d-flex justify-content-center align-items-center"
                                  md={2}
                                >
                                  <Row className="">
                                    <Col
                                      md={4}
                                      className="d-flex justify-content-start align-items-center"
                                    >
                                      <img src={defaultCompanyLogo} alt="" />
                                    </Col>
                                    <Col md={8}>
                                      <Row style={{ marginTop: "8px" }}>
                                        <Col sm={12}>
                                          <h6>{employerDetail}</h6>
                                        </Col>
                                        <Col sm={12}>
                                          <p>{i.hiringDetails}</p>
                                        </Col>
                                      </Row>
                                    </Col>
                                  </Row>
                                </Col>

                                <Col
                                  className="d-flex justify-content-center align-items-center"
                                  md={2}
                                >
                                  <h6>{dateStringGenerator(i.createdDate)}</h6>
                                </Col>
                                <Col
                                  className="d-flex justify-content-center align-items-center"
                                  md={3}
                                >
                                  <Row>
                                    <Col
                                      className="d-flex justify-content-center"
                                      md={4}
                                    >
                                      <h5
                                        style={{
                                          backgroundColor: "#E0F2FE",
                                          borderRadius: "7px",
                                          color: "#026AA2",
                                          padding: "0px 15px 0px 15px",
                                        }}
                                      >
                                        {i.uploadedCandidatesCount}
                                      </h5>
                                    </Col>
                                    <Col
                                      className="d-flex justify-content-center"
                                      md={4}
                                    >
                                      <h5
                                        style={{
                                          backgroundColor: "#FEF0C7",
                                          borderRadius: "7px",
                                          color: "#B54708",
                                          padding: "0px 15px 0px 15px",
                                        }}
                                      >
                                        {i.shortlistedCandidatesCount}
                                      </h5>
                                    </Col>
                                    <Col
                                      className="d-flex justify-content-center"
                                      md={4}
                                    >
                                      <h5
                                        style={{
                                          backgroundColor: "#D1FADF",
                                          borderRadius: "7px",
                                          color: "#027A48",
                                          padding: "0px 15px 0px 15px",
                                        }}
                                      >
                                        {i.selectedCandidatesCount}
                                      </h5>
                                    </Col>
                                  </Row>
                                </Col>
                                <Col
                                  md={1}
                                  className="d-flex justify-content-center"
                                >
                                  <h5
                                    style={{
                                      backgroundColor: "#F2F4F7",
                                      borderRadius: "7px",
                                      color: "#344054",
                                      padding: "0px 15px 0px 15px",
                                    }}
                                  >
                                    n/a
                                  </h5>
                                </Col>
                                <Col
                                  md={1}
                                  className="d-flex justify-content-center align-items-center"
                                >
                                  <Link to={`/addCandidate/${i.jdIdentifier}`}>
                                    <FiUserPlus
                                      size={20}
                                      style={{ cursor: "pointer" }}
                                    />
                                  </Link>
                                </Col>
                              </Row>
                            </Card.Body>
                          </Card>
                        </Col>
                      </Row>
                      <div className="mt-1"></div>
                    </div>
                  );
                })}
              </div>
            </Col>
          </Row>
          <div className="mt-4"></div>
          <Row id="firstJobRow">
            <Col md={12}>
              <Card>
                <Card.Body>
                  <Row>
                    <Col md={12} className="d-flex justify-content-center">
                      <img src={firstJdAdd} alt="" />
                    </Col>
                    <Col md={12} className="d-flex justify-content-center">
                      <h2>Start by uploading 1st Job Description</h2>
                    </Col>
                    <Col md={12} className="d-flex justify-content-center">
                      <h6>You will see list after adding your 1st job</h6>
                    </Col>
                    <Col md={12} className="d-flex justify-content-center">
                      <Button
                        variant="primary"
                        style={{
                          background: "#206DC5 ",
                          width: "10vw",
                          height: "4vw",
                        }}
                        onClick={CreateJDRedirect}
                      >
                        Add JD +
                      </Button>
                    </Col>
                  </Row>
                </Card.Body>
              </Card>
            </Col>
          </Row>
          <div className="mt-4"></div>
          <Row className="d-flex justify-content-center ">
            <Col md={9} className="d-flex justify-content-center">
              <Pagination
                current={currPage}
                total={pageCount}
                onChange={onPageChange}
                showSizeChanger={false}
              />
            </Col>
          </Row>
        </div>
      </div>
    </div>
  );
}
export default NewAllJd;
