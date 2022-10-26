import "../styles/topbar.css";
import Icon from "./Icons";
import Dropdown from "react-bootstrap/Dropdown";
import Utils from "../Utils";
import { Fragment } from "react";

function TopBar(props) {
  const logoutHandler = () => {
    // localStorage.clear();
    localStorage.setItem("currentPage", 0);
    //have to create another function where i will clear all the irrelevant info when logout
    Utils.removeUserDetail();
    window.location.href = "/";
  };
  let userDetail = Utils.getUserDetail() || {};
  let { curPage } = props;
  if (userDetail && userDetail.userDetail) {
    userDetail = userDetail.userDetail;
  }
  return (
    <div className="topbar-wrapper">
      <div className="page-title">
        {(curPage == "home" || curPage == "dashboard" || !curPage) && (
          <Fragment>
            <div className="welcome-text">
              Welcome back, {userDetail.firstName}
            </div>
            <div className="page-desc">
              Track, Manage & Schedule your Hiring Activities like a Champion.
              All the best!
            </div>
          </Fragment>
        )}
      </div>
      <div className="display-flex">
        <div style={{ marginRight: 20 }}>
          <Icon type="circle-question" />
        </div>
        <Icon type="bell" />
        <div className="user-image"></div>
        <div className="user-detail-wrapper">
          <div className="user-name">
            {userDetail.firstName} {userDetail.lastName}
          </div>
          <div className="user-role">Hire++ {userDetail.userRole}</div>
        </div>

        <Dropdown>
          <Dropdown.Toggle></Dropdown.Toggle>

          <Dropdown.Menu>
            <Dropdown.Item href="./recruiter">Profile</Dropdown.Item>
            <Dropdown.Item onClick={logoutHandler}>Log out</Dropdown.Item>
          </Dropdown.Menu>
        </Dropdown>
      </div>
    </div>
  );
}
export default TopBar;
