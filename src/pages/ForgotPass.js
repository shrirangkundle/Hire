import React, { useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import "../styles/checkMail.css";
import hirePPLogo from "../assets/images/logo/finalLogo2.svg";
import placeholderPatterns from "../assets/passScreen/placeholderFlow.svg";
import forgotPassSvg from "../assets/forgotPass/forgotPass.svg";
import axios from "axios";
import hirePlusPlusBaseUrl from "../assets/envVar/baseUrlRegistration";
import Alert from "react-bootstrap/Alert";

const ForgotPass = () => {
  const [forgotUserEmail, setForgotUserEmail] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const resetPassTriggrer = () => {
    var config = {
      method: "post",
      url: `${hirePlusPlusBaseUrl}/registration/resetPassword/sendLink?email=${forgotUserEmail}`,
      headers: {},
    };

    axios(config)
      .then(function (response) {
        console.log(response);
        // localStorage.setItem("forgetPassMail", forgotUserEmail);
        // window.location.href = `/checkMail`;
        if (response.data.resultStatusInfo.resultCode) {
          setShowAlert(true);
          return;
        } else {
          localStorage.setItem("forgetPassMail", forgotUserEmail);
          window.location.href = `/checkMail`;
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };
  return (
    <>
      <Alert
        show={showAlert}
        variant="danger"
        onClose={() => setShowAlert(false)}
        dismissible
      >
        User doesn't exist
      </Alert>
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
                  <h1>Forgot Password?</h1>
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                  <p>No worries! we will send you reset instructions.</p>
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                  <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder=""
                      value={forgotUserEmail}
                      onChange={(e) => setForgotUserEmail(e.target.value)}
                      style={{ width: "20vw" }}
                    />
                  </Form.Group>
                </Col>
                <Col md={12} className="d-flex justify-content-center">
                  <Button style={{ width: "20vw" }} onClick={resetPassTriggrer}>
                    Reset Password
                  </Button>
                </Col>

                <div className="mt-4"></div>
                <div className="mt-4"></div>
                <Col md={12} className="d-flex justify-content-center">
                  <span>
                    Back to <a href="/login">log in</a>
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

export default ForgotPass;
