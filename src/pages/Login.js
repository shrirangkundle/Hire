import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import loginImg from "../assets/images/login/loginImg.png";
import "../styles/login.css";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import hirePPLogo from "../assets/images/logo/finalLogo2.svg";
import hirePPResponsive from "../assets/images/login/loginResponsive.svg";
import { useState } from "react";
import hirePPBaseURl from "../assets/envVar/baseUrlRegistration";
import $ from "jquery";
import loginLottie from "../assets/login/loginAnimate.json";
import Lottie from "react-lottie";

const loginLottieAnimate = {
  loop: true,
  autoplay: true,
  animationData: loginLottie,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

const Login = () => {
  const [userEmail, setUserEmail] = useState("");
  const [userPass, setUserPass] = useState("");
  const validateCred = () => {
    // console.log(userEmail, userPass);
    var encodedUserName = btoa(userEmail);
    var encodedPass = btoa(userPass);
    var form = new FormData();
    form.append("username", encodedUserName);
    form.append("password", encodedPass);
    form.append("rememberMe", "false");

    var settings = {
      url: `${hirePPBaseURl}/login/`,
      method: "POST",
      timeout: 0,
      processData: false,
      mimeType: "multipart/form-data",
      contentType: false,
      data: form,
    };

    $.ajax(settings).done(function (response) {
      // window.location.href = `/allJd`;
      var res = JSON.parse(response);
      console.log(res.resultStatusInfo.resultCode);
      if (res.resultStatusInfo.resultCode === "UNAUTHORIZED") {
        alert("incorrect id or password");
      } else if (res.resultStatusInfo.resultCode === "SUCCESS") {
        window.location.href = "./allJd";
      } else if (res.resultStatusInfo.resultCode === "ACCOUNT_INACTIVE") {
        window.location.href = "./checkMail";
      }
    });
  };
  return (
    <>
      <Row>
        <Col md={6}>
          <div className="mt-4 hppResponsive"></div>
          <Row>
            <img src={hirePPResponsive} id="hirePPImageResponsive" alt="" />
          </Row>
          <Row>
            <img src={hirePPLogo} id="hirePPLogoLogin" />
          </Row>
          <div className="mt-3"></div>
          <div className="mt-5"></div>
          <Row className="d-flex justify-content-center">
            <div className="mt-4"></div>
            {/* <Col md={8} className="d-flex justify-content-center">
              <ButtonGroup className="userType">
                <Button variant="light">Client</Button>
                <Button variant="light">Recruiter</Button>
                <Button variant="light">Expert</Button>
              </ButtonGroup>
            </Col> */}
            <div className="mt-4"></div>
            <Col md={8}>
              <h2>Log In</h2>
              <div className="mt-4"></div>
              <p>Welcome Back! Please enter your details</p>
            </Col>
            <Col md={8}>
              <Form.Group className="mb-3">
                <h4>Email</h4>
                <Form.Control
                  type="text"
                  value={userEmail}
                  onChange={(e) => setUserEmail(e.target.value)}
                />
              </Form.Group>
              <Form.Group className="mb-3">
                <h4>Password</h4>
                <Form.Control
                  type="password"
                  value={userPass}
                  onChange={(e) => setUserPass(e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={8}>
              <Row>
                <Col md={6}>
                  <Form.Check type="checkbox" label={`Remember me`} />
                </Col>
                <Col md={6} className="d-flex justify-content-end">
                  <a href="/forgotPassword">Forget Password</a>
                </Col>
              </Row>
            </Col>
            <div className="mt-4"></div>
            <Col md={8}>
              <Row>
                <Button onClick={validateCred}>Log In</Button>
              </Row>
            </Col>
            <div className="mt-4"></div>
            <Col md={8} className="d-flex justify-content-center">
              <span>Don't have an account?</span>
              <a href="/userRegistration">Sign Up</a>
            </Col>
          </Row>
        </Col>

        <Col
          md={6}
          className="d-flex justify-content-center align-items-center"
        >
          <Lottie
            options={loginLottieAnimate}
            height={550}
            width={550}
            style={{ marginTop: "13vh" }}
          />

          {/* <div className="imgbox">
            <Lottie options={loginLottieAnimate} height={60} width={60} />
            <img className="center-fit" src={loginImg} alt="" />
          </div> */}
        </Col>
      </Row>
    </>
  );
};

export default Login;
