import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import registrationImg from "../assets/images/registration/finalSection.png";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../styles/registration.css";
import hirePPLogo from "../assets/images/logo/finalLogo2.svg";
import { useState } from "react";
import hirePPBaseURl from "../assets/envVar/baseUrlRegistration";
import axios from "axios";
import Lottie from "react-lottie";
import registrationLottie from "../assets/registrationLottie/registrationLottie.json";

const registrationLottieFile = {
  loop: true,
  autoplay: true,
  animationData: registrationLottie,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};
const Registration = () => {
  const [userRegistrationName, setUserRegistrationName] = useState("");
  const [userRegistrationEmail, setUserRegistrationEmail] = useState("");
  const [userRegistrationPass, setUserRegistrationPass] = useState("");
  const [userRegistrationConfPass, setUserRegistrationConfPass] = useState("");
  const [userRegistrationType, setUserRegistrationType] = useState("");

  const registerUserFunc = () => {
    if (
      userRegistrationName === "" ||
      userRegistrationEmail === "" ||
      userRegistrationPass === "" ||
      userRegistrationType === ""
    ) {
      alert("Please enter valid details");
    } else if (userRegistrationPass !== userRegistrationConfPass) {
      alert("password mismatch");
    } else {
      var nameStr = userRegistrationName;
      var nameStrArr = nameStr.split(" ");
      console.log(nameStrArr[0]);
      console.log(nameStrArr[1]);

      var data = JSON.stringify({
        firstName: nameStrArr[0],
        lastName: nameStrArr[1],
        email: userRegistrationEmail,
        mobile: "",
        password: userRegistrationPass,
        userRole: userRegistrationType,
      });

      var config = {
        method: "post",
        url: `${hirePPBaseURl}/registration/add`,
        headers: {
          "Content-Type": "application/json",
        },
        data: data,
      };

      axios(config)
        .then(function (response) {
          // console.log(JSON.stringify(response.data));
          // console.log(response.data);
          var res = response.data;
          // alert("user successfully registered");
          if (res.resultStatusInfo.resultCode === "SUCCESS") {
            window.location.href = "./checkMail";
          } else if (res.resultStatusInfo.resultCode === "USER_EXISTS") {
            alert("user already exists. Please try with another account");
            return;
          }
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  };

  return (
    <>
      <Row>
        <Col
          md={8}
          className="d-flex align-items-center  justify-content-center"
        >
          <div id="responsiveLottie">
            <Lottie options={registrationLottieFile} height={400} width={400} />
          </div>

          {/* <img id="responsiveRegistrationImg" src={registrationImg} /> */}
        </Col>
        <Col md={3}>
          <div className="mt-4"></div>
          <Row className="d-flex justify-content-center">
            <img src={hirePPLogo} id="hirePPLogoRegistration" />
          </Row>
          <div className="mt-4"></div>

          <Row
            className="d-flex justify-content-center"
            id="registrationFormContainer"
          >
            <div className="mt-4"></div>
            <h3>Registration</h3>

            <p>Start your 60 day trial now</p>
            <div className="mt-1"></div>
            <Form.Group className="mb-1">
              <h6>Name</h6>
              <Form.Control
                type="text"
                value={userRegistrationName}
                onChange={(e) => setUserRegistrationName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <h6>Email</h6>
              <Form.Control
                type="email"
                value={userRegistrationEmail}
                onChange={(e) => setUserRegistrationEmail(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <h6>Password</h6>
              <Form.Control
                type="password"
                value={userRegistrationPass}
                onChange={(e) => setUserRegistrationPass(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <h6>Confirm Password</h6>
              <Form.Control
                type="password"
                value={userRegistrationConfPass}
                onChange={(e) => setUserRegistrationConfPass(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="mb-1">
              <h6>User Type</h6>
              <Form.Select
                value={userRegistrationType}
                onChange={(e) => setUserRegistrationType(e.target.value)}
              >
                <option value="">Select User Type</option>
                <option value="HIRING MANAGER">Hiring Manager</option>
                <option value="RECRUITER">Recruiter</option>
                <option value="CANDIDATE">Candidate</option>
                <option value="PANELIST">Panelist</option>
              </Form.Select>
            </Form.Group>
            <div className="mt-4"></div>
          </Row>
          <div className="mt-4"></div>
          <Row>
            <Button onClick={registerUserFunc} size="lg">
              Create Account
            </Button>
          </Row>
          <div className="mt-2"></div>
          <Row className="d-flex justify-content-center">
            <Col md={12} className="d-flex justify-content-center">
              <span>
                Already have an account? <a href="/">Log In</a>
              </span>
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default Registration;
