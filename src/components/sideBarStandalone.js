import { useState } from "react";
import "../styles/sidebar2.css";
import Icon from "./Icons";
import { Link } from "react-router-dom";
import collapseLogo from "../assets/sidebarLogos/collapseLogo.svg";

function Sidebar(props) {
  let views = [];
  let _views = props.views || views;
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

      {_views.map((view, index) => {
        return (
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
        );
      })}
    </div>
  );
}
export default Sidebar;
