import { useState, useEffect } from "react";

import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import { AiOutlineDelete } from "react-icons/ai";
import $ from "jquery";
import Alert from "react-bootstrap/Alert";
import { Select } from "antd";
import WebUtils from "../../WebUtils";
import hirePPBaseURl from "../../assets/envVar/baseUrlInterview";

const { Option } = Select;

const SkillAddComponent = (props) => {
  const [skillCount, setSkillCount] = useState(0);
  const [allSkill, setAllSkill] = useState([]);
  const [overallPerc, setOverallPerc] = useState(100);
  const [showAlert, setShowAlert] = useState(false);
  const [showAlertText, setShowAlertText] = useState("");
  const [currSkillName, setCurrSkillName] = useState("");
  const [currSkillPerc, setCurrSkillperc] = useState(0);
  const [skillDBArr, setSkillDBArr] = useState([]);

  useEffect(() => {
    getSkillDBArr();
    console.log("flag invoked");
    console.log(props.nextFlag);
    if (props.nextFlag === true) {
      saveSkillFunc();
    }
  }, [props.nextFlag]);

  const onChange = (value) => {
    setCurrSkillName(value);
  };

  const onSearch = (value) => {
    console.log("search:", value);
  };

  const getSkillDBArr = () => {
    WebUtils.httpOperations(
      `${hirePPBaseURl}/questionnaire/skills`,
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
    if (currSkillName === "" || currSkillPerc === 0) {
      return;
    }
    setOverallPerc(overallPerc - currSkillPerc);
    var finalSkillArr = allSkill;
    var skillObj = {};
    skillObj["skillName"] = currSkillName;
    skillObj["skillWeightage"] = currSkillPerc;
    skillObj["suggestedQuestionList"] = [];
    finalSkillArr.push(skillObj);
    setAllSkill(finalSkillArr);

    setCurrSkillName("");
    setCurrSkillperc(0);

    setSkillCount(skillCount + 1);
  }

  const handleDelete = (index) => {
    if ((currSkillName === "" || currSkillPerc === 0) && skillCount === 0) {
      setShowAlertText("Atleast one skill must be selected");
      setShowAlert(true);
      return;
    }
    setCurrSkillName("");
    setCurrSkillperc(0);
    $(`#skill_${index}`).remove();
    var dupliSkillArr = allSkill;
    dupliSkillArr.splice(index, 1);
    setAllSkill(dupliSkillArr);
    if (skillCount === 1) {
      setSkillCount(0);
    }
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
    var finalArr = allSkill;
    if (currSkillName !== "" && currSkillPerc !== 0) {
      //   var lastObjSkillame = allSkill[allSkill.length - 1].skillName;
      //   console.log(lastObjSkillame, currSkillName);
      //   if ((lastObjSkillame == currSkillName)&&(skillCount>)) {
      //     return;
      //   } else {
      //     var skillObj = {};
      //     skillObj["skillName"] = currSkillName;
      //     skillObj["skillWeightage"] = currSkillPerc;
      //     finalArr.push(skillObj);
      //   }
      var skillObj = {};
      skillObj["skillName"] = currSkillName;
      skillObj["skillWeightage"] = currSkillPerc;
      finalArr.push(skillObj);
    }
    console.log(finalArr);
    props.skillArr(finalArr);
  }
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
                      setCurrSkillName(e.target.value);
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
                      //   skillPerc = e.target.value;
                      setCurrSkillperc(e.target.value);
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
          <Col md={12} className="d-flex justify-content-start">
            <p
              variant="primary"
              style={{
                color: "#206DC5",
              }}
              onClick={(e) => {
                e.preventDefault();
                if (overallPerc === 0 || overallPerc - currSkillPerc < 0) {
                  setShowAlertText("percentage cannot be more than 100%");
                  setShowAlert(true);
                  return;
                } else {
                  handleClick();

                  if (skillCount === 0) {
                    setSkillCount(skillCount + 1);
                  }
                }
              }}
            >
              + Add Skills
            </p>
          </Col>
          {/* <Col
            md={12}
            className="d-flex justify-content-start"
            style={{ marginTop: "75px" }}
          >
            <Button
              variant="primary"
              style={{
                background: "#206DC5",
                marginLeft: "20px",
                color: "black",
                width: "7vw",
                height: "3vw",
              }}
              onClick={saveSkillFunc}
            >
              Save
            </Button>
          </Col> */}
        </Row>
      </div>
    </>
  );
};

export default SkillAddComponent;
