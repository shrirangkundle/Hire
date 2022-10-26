import { useState, useEffect } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
import { AiOutlineDelete } from "react-icons/ai";
import $ from "jquery";
import hirePPBaseURl from "../../assets/envVar/baseUrl";
import Alert from "react-bootstrap/Alert";
import { Select } from "antd";
import WebUtils from "../../WebUtils";
import hirePPBaseURlInterview from "../../assets/envVar/baseUrlInterview";

const { Option } = Select;

///aimatcher/api/v1

const SkillAddComponent = (props) => {
  const [oldSkillCount, setOldSkillCount] = useState(props.prevData.length);
  const [allOldSkill, setAllOldSkill] = useState(props.prevData);
  const [skillCount, setSkillCount] = useState(0);
  const [allSkill, setAllSkill] = useState([]);
  const [overallPerc, setOverallPerc] = useState(100);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertText, setShowAlertText] = useState("");
  const [skillDBArr, setSkillDBArr] = useState([]);

  var skillName = "";
  var skillPerc = 0;
  var finalSkillArr = [];

  useEffect(() => {
    getSkillDBArr();
    var oldPerc = 0;
    for (let i = 0; i < allOldSkill.length; i++) {
      oldPerc = oldPerc + allOldSkill[i].skillWeightage;
    }
    setOverallPerc(overallPerc - oldPerc);
  }, [allOldSkill]);

  const getSkillDBArr = () => {
    WebUtils.httpOperations(
      `${hirePPBaseURlInterview}/questionnaire/skills`,
      {},
      "GET"
    ).then(
      (response) => {
        setSkillDBArr(response.data.data.skillsList);
      },
      (error) => error
    );
  };

  function handleClick() {
    if (skillName === "" || skillPerc === 0) {
      return;
    }
    setOverallPerc(overallPerc - skillPerc);
    var finalSkillArr = allSkill;
    var skillObj = {};
    skillObj["skillName"] = skillName;
    skillObj["skillWeightage"] = skillPerc;
    finalSkillArr.push(skillObj);
    setAllSkill(finalSkillArr);
    skillName = "";
    skillPerc = 0;
    setSkillCount(skillCount + 1);
  }

  const handleDelete = (index) => {
    if (skillName === "" || skillPerc === 0) {
      setShowAlertText("Atleast one skill must be selected");
      setShowAlert(true);
      return;
    }

    var dupliSkillArr = allSkill;
    dupliSkillArr.splice(index, 1);
    setAllSkill(dupliSkillArr);
    if (skillCount === 1) {
      setSkillCount(0);
    }
  };

  const deleteOldSkill = (index) => {
    var tempArr = allOldSkill;
    var tempCount = oldSkillCount;
    console.log(allOldSkill);

    tempArr.splice(index, 1);
    var newCount = tempCount - 1;

    console.log(tempArr);
    console.log(newCount);

    setOldSkillCount(newCount);
    setAllOldSkill(tempArr);
  };

  const saveSkillFunc = () => {
    if (100 - overallPerc < 0) {
      setShowAlertText("percentage cannot be more than 100%");
      setShowAlert(true);
      return;
    }
    finalApiCall();
  };
  function finalApiCall() {
    var data = {};
    var finalArr = allSkill;

    if (skillName !== "" && skillPerc !== 0) {
      var skillObj = {};
      skillObj["skillName"] = skillName;
      skillObj["skillWeightage"] = skillPerc;
      finalArr.push(skillObj);
      // for (let i = 0; i < allOldSkill.length; i++) {
      //   finalArr.push(allOldSkill[i]);
      // }
    }
    for (let i = 0; i < allOldSkill.length; i++) {
      finalArr.push(allOldSkill[i]);
    }
    console.log(finalArr);
    // for (let i = 0; i < allOldSkill.length; i++) {
    //   finalArr.push(allOldSkill[i]);
    // }
    console.log(allOldSkill);
    console.log(finalArr);

    data["jdIdentifier"] = props.jdIdentifier;
    data["interviewSkillDataList"] = finalArr;

    WebUtils.httpOperations(
      `${hirePPBaseURl}/jd/addInterviewSkillsData`,
      data,
      "POST"
    ).then(
      (response) => {
        props.skillChangeFlag();
        console.log("placeholder func");
        props.cancelBtn();
      },
      (error) => error
    );
  }
  const onChange = (value) => {
    console.log(`selected ${value}`);
    skillName = value;
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };
  return (
    <>
      <div style={{ width: "100%" }}>
        <Alert
          show={showAlert}
          variant="danger"
          onClose={() => setShowAlert(false)}
          dismissible
        >
          {showAlertText}
        </Alert>
        <Row>
          <Col md={8}>
            <p>Total weightage of all skills is going to be 100%</p>
          </Col>
          <Col md={4}>
            <p>{`% remaining: ${overallPerc}%`}</p>
          </Col>
        </Row>
        {Array.from(Array(oldSkillCount)).map((c, index) => {
          // setOverallPerc(overallPerc - props.prevData[index].skillWeightage);
          return (
            <Row
              style={{ marginTop: "10px" }}
              id={`Oldskill_${index}`}
              key={index}
            >
              <Col md={7}>
                <Form.Group className="createJdInputs">
                  <Form.Control
                    value={props.prevData[index].skillName}
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={3}>
                <Form.Group className="createJdInputs">
                  <Form.Control
                    id={`skillPerc_${index}`}
                    value={props.prevData[index].skillWeightage}
                    type="number"
                    maxLength="2"
                    placeholder="%"
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={2}>
                <div
                  className="filterNavBtn"
                  onClick={() => {
                    setOverallPerc(
                      overallPerc + Number($(`#skillPerc_${index}`).val())
                    );
                    deleteOldSkill(index);

                    // $(`#Oldskill_${index}`).remove();
                  }}
                >
                  <AiOutlineDelete />
                </div>
              </Col>
            </Row>
          );
        })}
        {Array.from(Array(skillCount)).map((c, index) => {
          // var perc = 0;

          return (
            <Row
              style={{ marginTop: "10px" }}
              id={`skill_${index}`}
              key={index}
            >
              <Col md={7}>
                {/* <Form.Group className="createJdInputs">
                  <Form.Control
                    onChange={(e) => {
                      skillName = e.target.value;
                    }}
                    placeholder="Type Skills here"
                  ></Form.Control>
                </Form.Group> */}
                <Select
                  showSearch
                  placeholder="Select a Skill"
                  optionFilterProp="children"
                  onChange={onChange}
                  onSearch={onSearch}
                  filterOption={(input, option) =>
                    option.children.toLowerCase().includes(input.toLowerCase())
                  }
                  style={{ width: "100%" }}
                >
                  {skillDBArr.map((skill, index) => {
                    return (
                      <Option value={skill} key={index}>
                        {skill}
                      </Option>
                    );
                  })}
                </Select>
              </Col>
              <Col md={3}>
                <Form.Group className="createJdInputs">
                  <Form.Control
                    id={`skillPerc_${index}`}
                    type="number"
                    maxLength="2"
                    onChange={(e) => {
                      skillPerc = e.target.value;
                    }}
                    placeholder="%"
                  ></Form.Control>
                </Form.Group>
              </Col>
              <Col md={2}>
                <div
                  className="filterNavBtn"
                  onClick={() => {
                    setOverallPerc(
                      overallPerc + Number($(`#skillPerc_${index}`).val())
                    );

                    handleDelete(index);
                  }}
                >
                  <AiOutlineDelete />
                </div>
              </Col>
            </Row>
          );
        })}
        <Row style={{ marginTop: "20px" }}>
          <Col md={12} className="d-flex justify-content-center">
            <Button
              variant="primary"
              style={{
                background: "#206DC5 ",
                // width: "8vw",
                // height: "3vw",
              }}
              onClick={(e) => {
                e.preventDefault();
                if (overallPerc === 0 || overallPerc - skillPerc < 0) {
                  setShowAlertText("percentage cannot be more than 100%");
                  setShowAlert(true);
                  return;
                }
                handleClick();
                console.log(skillCount);
                if (skillCount === 0) {
                  setSkillCount(skillCount + 1);
                }
              }}
            >
              + Add Skills
            </Button>
          </Col>
          <Col
            md={12}
            className="d-flex justify-content-center"
            style={{ marginTop: "75px" }}
          >
            <Button
              variant="primary"
              style={{
                background: "white",
                // marginLeft: "20px",
                color: "black",
                width: "7vw",
                height: "3vw",
              }}
              onClick={props.cancelBtn}
            >
              Cancel
            </Button>
            <Button
              variant="primary"
              style={{
                background: "#206DC5",
                marginLeft: "20px",
                // color: "black",
                width: "7vw",
                height: "3vw",
              }}
              onClick={saveSkillFunc}
            >
              Save
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default SkillAddComponent;
