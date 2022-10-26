import { useState } from "react";
import { notification, Checkbox } from "antd";
import FormComponent from "../components/form";
import Icon from "../components/Icons";
import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import loginLotti from "../assets/login/loginAnimate.json";
import _ from "underscore";
import AppAPIs from "../APIs/AppAPIs";
import WebUtils from "../WebUtils";
import $ from "jquery";
import Utils from "../Utils";

const loginLottiFile = {
  loop: true,
  autoplay: true,
  animationData: loginLotti,
  rendererSettings: {
    preserveAspectRatio: "xMidYMid slice",
  },
};

function LoginPage(props) {
  let hplussUd = localStorage.getItem("hplussUd");
  if (hplussUd) {
    hplussUd = atob(JSON.parse(hplussUd));
    hplussUd = hplussUd.split("<>");
  }
  const [message, setMessage] = useState(null);
  const [rememberMe, setRememberMe] = useState(hplussUd ? true : false);
  const [formData, setFormData] = useState({
    ...(hplussUd && { username: hplussUd[0], password: hplussUd[1] }),
  });
  const navigate = useNavigate();

  const handleRememberMe = (e) => {
    setRememberMe(e.target.checked);
  };

  const formChangeHandler = (data) => {
    let modFormData = { ...formData, [data.key]: data.value };
    setFormData(modFormData);
  };

  let config = {
    title: ["Login", "Welcome Back! Please enter your details."],
    _order: { username: 2, password: 3, submit: 6 },
    on_change: true,
    username: {
      type: "text",
      label: "Email ID",
      key: "username",
      required: true,
      value: formData["username"],
      placeholder: "Enter email Id",
    },
    password: {
      type: "password",
      label: "Password",
      key: "password",
      required: true,
      value: formData["password"],
      placeholder: "Enter your password",
      fieldFooter: (
        <div className="password-footer">
          <div className="remeber-me">
            <Checkbox checked={rememberMe} onChange={handleRememberMe}>
              Remember me
            </Checkbox>
          </div>{" "}
          <a href="/forgotPassword" className="forgot-password">
            Forgot Password
          </a>
        </div>
      ),
    },
    submit: {
      type: "button",
      display: "Login",
      button_type: "primary",
      className: "primary-button",
    },
  };

  const submitHandler = (data) => {
    if (data) {
      setMessage(<div style={{ textAlign: "center" }}>Please Wait.</div>);
      let formData = new FormData();
      if (rememberMe) {
        localStorage.setItem(
          "hplussUd",
          JSON.stringify(btoa(data.username + "<>" + data.password))
        );
      } else {
        localStorage.removeItem("hplussUd");
      }

      _.map(data, (value, key) => {
        formData.append(key, btoa(value));
      });

      let settings = {
        url: AppAPIs["LOGIN_USER"] + `rememberMe=${rememberMe}`,
        method: "POST",
        timeout: 0,
        processData: false,
        mimeType: "multipart/form-data",
        contentType: false,
        data: formData,
      };
      $.ajax(settings).done(function (response) {
        let res = JSON.parse(response);
        if (res.resultStatusInfo.resultCode === "UNAUTHORIZED") {
          // notification["error"]({
          //   message: res.resultStatusInfo.message,
          // });
          setMessage(
            <div style={{ textAlign: "center", color: "red" }}>
              {res.resultStatusInfo.message}
            </div>
          );
        } else if (res.resultStatusInfo.resultCode === "SUCCESS") {
          Utils.setUserDetail(res.data);
          localStorage.setItem("currentPage", 0);
          WebUtils.httpOperations(
            AppAPIs["GET_USER_DETAIL"] + res.data.userIdentifier,
            {},
            "GET"
          ).then(
            (user) => {
              let userD = Utils.getUserDetail();
              Utils.setUserDetail({ ...userD, userDetail: user.data.data });
              setTimeout(() => {
                window.location.href = "/";
              }, 200);
            },
            (error) => error
          );
        } else if (res.resultStatusInfo.resultCode === "ACCOUNT_INACTIVE") {
          window.location.href = "./checkMail";
        }
      });
    }
  };
  return (
    <div className="registration-page">
      <div className="left-section login">
        <Lottie options={loginLottiFile} height={"80%"} width={"80% "} />
      </div>
      <div className="right-section">
        <div className="logo-holder">
          <Icon type="hire-logo" width={180} height={60} />
        </div>
        <FormComponent
          config={config}
          onSubmit={submitHandler}
          onChange={formChangeHandler}
          message={message}
          footer={
            <div style={{ textAlign: "center", marginTop: 10 }}>
              Don't have an account?{" "}
              <span
                style={{ color: "#206EC7", cursor: "pointer" }}
                onClick={() => navigate(`/register`)}
              >
                Sign Up
              </span>
            </div>
          }
        />
      </div>
    </div>
  );
}
export default LoginPage;
