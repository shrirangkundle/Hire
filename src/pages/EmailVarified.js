import React from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import "../styles/checkMail.css";
import hirePPLogo from "../assets/images/logo/finalLogo2.svg";
import placeholderPatterns from "../assets/passScreen/placeholderFlow.svg";
import emailVarifiedSvg from "../assets/emailVarified/emailVarified.svg";

const EmailVarified = () => {
  return (
    <>
      <Row>
        <Col md={12}>
          <div className="mt-4"></div>

          <Row>
            <img src={hirePPLogo} id="hirePPLogo" />
          </Row>
          <div className="mt-4"></div>
          <Row>
            <Col md={3}>
              <div className="mt-4"></div>
              <div className="mt-4"></div>

              <img
                src={placeholderPatterns}
                className="passPatterns leftSide"
                alt=""
              />
            </Col>
            <Col
              md={6}
              className="d-flex justify-content-center align-items-center"
            >
              <Row>
                <Col md={12} className="d-flex justify-content-center">
                  <img src={emailVarifiedSvg} alt="" />
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                  <h1>Email Varified</h1>
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                  <p>Your email has been successfully varified</p>
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                  <p>Let's start this journey</p>
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                  <Button style={{ width: "20vw" }}>Continue</Button>
                </Col>
                <div className="mt-4"></div>
                <div className="mt-4"></div>
                <Col md={12} className="d-flex justify-content-center">
                  <span>
                    Didn't recieve email ? <a href="#">click to resend</a>
                  </span>
                </Col>
                <div className="mt-4"></div>
                <div className="mt-4"></div>
                <Col md={12} className="d-flex justify-content-center">
                  <span>
                    Back to <a href="/">log in</a>
                  </span>
                </Col>
              </Row>
            </Col>
            <Col md={3} className="d-flex justify-content-end">
              <img
                src={placeholderPatterns}
                className="passPatterns rightSide"
                alt=""
              />
            </Col>
          </Row>
        </Col>
      </Row>
    </>
  );
};

export default EmailVarified;
