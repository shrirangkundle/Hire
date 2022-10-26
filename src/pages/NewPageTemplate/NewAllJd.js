import { Fragment, useState } from "react";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/esm/Container";
import Sidebar from "../../components/SideBar";
import TopBar from "../../components/TopBar";

function NewAllJd(props) {
  const [toggleStatus, setSidebarSatus] = useState("right");

  const handleToggle = () => {
    if (toggleStatus == "left") {
      setSidebarSatus("right");
    } else {
      setSidebarSatus("left");
    }
  };
  return (
    <div className="hirePlusPlusPageContent">
      <Sidebar toggleStatus={toggleStatus} toggleHandle={handleToggle} />
      <div
        style={{
          width: toggleStatus == "left" ? "100%" : "86%",
          height: "100vh",
          overflowY: "auto",
          transition: "all 0.3s",
        }}
      >
        <TopBar />
      </div>
    </div>
  );
}
export default NewAllJd;
