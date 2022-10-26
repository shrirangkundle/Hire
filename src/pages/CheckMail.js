import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../styles/checkMail.css";
import hirePPLogo from "../assets/images/logo/finalLogo2.svg";
import placeholderPatterns from "../assets/passScreen/placeholderFlow.svg";
import CheckMailSvg from "../assets/CheckMail/checkmail.svg";

const CheckMail = () => {
  var checkMailuserEmail = localStorage.getItem("forgetPassMail");

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
              {/* <h2>Check your mail</h2> */}
              <Row>
                <Col md={12} className="d-flex justify-content-center">
                  <img src={CheckMailSvg} alt="" />
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                  <h1>Check your email</h1>
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                  <p>We have sent varification link to </p>
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                  <p>{checkMailuserEmail}</p>
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

export default CheckMail;
