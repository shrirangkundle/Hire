import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import forgotPassSvg from "../assets/forgotPass/forgotPass.svg";
import "../styles/checkMail.css";
import hirePPLogo from "../assets/images/logo/finalLogo2.svg";
import placeholderPatterns from "../assets/passScreen/placeholderFlow.svg";

const NewPass = () => {
  const [newPass, setNewPass] = useState("");
  const [confNewPass, setConfNewPass] = useState("");
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
                  <img src={forgotPassSvg} style={{ width: "66px" }} alt="" />
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                  <h1>New Password</h1>
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                  <p>Set your new password</p>
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <h6>Password</h6>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder=""
                      value={newPass}
                      onChange={(e) => newPass(e.target.value)}
                      style={{ width: "20vw" }}
                    />
                  </Form.Group>
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                  <Form.Group className="mb-3">
                    <Form.Label>
                      <h6>Confirm Password</h6>
                    </Form.Label>
                    <Form.Control
                      type="password"
                      placeholder=""
                      value={confNewPass}
                      onChange={(e) => setConfNewPass(e.target.value)}
                      style={{ width: "20vw" }}
                    />
                  </Form.Group>
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                  <Button style={{ width: "20vw" }}>Reset Password</Button>
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

export default NewPass;
