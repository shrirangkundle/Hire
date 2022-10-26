import { useState } from "react";
import "../styles/sidebar2.css";
import Icon from "./Icons";
import { Link } from "react-router-dom";
import collapseLogo from "../assets/sidebarLogos/collapseLogo.svg";
import { Button, Tooltip, Popover } from "antd";
import Utils from "../Utils";

function Sidebar(props) {
  let views = [
    {
      display: "Home",
      key: "home",
      path: "/recruiterDash",
      // path: "/recuiter/home"
    },
    {
      display: "Jobs",
      key: "job",
      path: "/allJd",
    },
    {
      display: "Clients",
      key: "client",
      path: "/#",
    },
    {
      display: "Candidate",
      key: "candidate",
      path: "/recuiter/candidate",
    },
    {
      display: "Calendar",
      key: "scheduler",
      path: "/recuiter/scheduler",
    },
    {
      display: "Reports",
      key: "reports",
      path: "/#",
    },
    {
      display: "Rewards",
      key: "rewards",
      path: "/#",
    },
  ];
  let _views = props.views || views;
  let userDetail = Utils.getUserDetail();
  // console.log(userDetail);
  let role = userDetail.userRole;
  return (
    <div
      className="sidebar-wrapper"
      data-collapsed={props.toggleStatus == "left" ? false : true}
    >
      <div className="collapse-logo">
        <img
          src={collapseLogo}
          style={{ width: "2.9vw", paddingBottom: "20px" }}
          alt=""
        />
      </div>
      <div className="hire-logo">
        <Icon type="hire-logo" width={83.44} height={32} />
      </div>
      <div className="search-box">
        <span className="search-icon"></span>
        <input placeholder="search" />
      </div>
      {_views.map((view, index) => {
        return (
          <Tooltip
            color={"white"}
            overlayInnerStyle={{ color: "black" }}
            placement="right"
            title={props.toggleStatus == "left" ? view.display : false}
          >
            <Link to={view.path} key={index}>
              <div
                className="view-wrapper"
                data-status={props.activePage == view.key}
              >
                <span className="view-icon" data-view={view.key}>
                  {" "}
                </span>
                <div className="view">{view.display}</div>
              </div>
            </Link>
          </Tooltip>
        );
      })}
      {role == "RECRUITER" && props.toggleStatus == "right" && (
        <div className="stand-alone-box">
          <div className="stand-alone-title">Our Additional Tools</div>
          <a
            className="stand-alone-option"
            href="https://pdfmasker.dev.hireplusplus.com/"
            target={"_blank"}
          >
            <div>
              Hire++ Reveal <Icon type="external-link" width={15} height={15} />
            </div>
          </a>
          <a
            className="stand-alone-option"
            target={"_blank"}
            href="/standAloneInterview1"
          >
            <div>
              Hire++ Now <Icon type="external-link" width={15} height={15} />
            </div>
          </a>
        </div>
      )}
      {role == "RECRUITER" && props.toggleStatus == "left" && (
        <div className="stand-alone-box-collapsed">
          <Popover
            content={
              <div className="stand-alone-popover-content-box">
                <div className="stand-alone-popover-content-title">
                  Our Additional Tools
                </div>
                <a
                  href="https://pdfmasker.dev.hireplusplus.com/"
                  target={"_blank"}
                >
                  <div className="stand-alone-popover-content-option">
                    Hire++ Reveal{" "}
                    <Icon type="external-link" width={15} height={15} />
                  </div>
                </a>
                <a target={"_blank"}>
                  <div className="stand-alone-popover-content-option">
                    Hire++ Now{" "}
                    <Icon type="external-link" width={15} height={15} />
                  </div>
                </a>
              </div>
            }
            title={false}
            placement="right"
          >
            <div className="option">
              <Icon type="setting" width={21} height={21} />
            </div>
          </Popover>
        </div>
      )}
      <div className="toggle-button" onClick={props.toggleHandle}>
        <span className="toogle-icon" data-dir={props.toggleStatus}></span>
      </div>
    </div>
  );
}
export default Sidebar;
