import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import blitzigoLogoDark from "../../assets/images/logo/finalLogo.svg";
import { IoNotificationsOutline, IoSettingsOutline } from "react-icons/io5";
import { FaRegUserCircle } from "react-icons/fa";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import "../../styles/navBar.css";
import Button from "react-bootstrap/Button";
const BlitzNavBar = () => {
  return (
    <Navbar bg="light" expand={false} className="gap-3 px-3">
      <Container fluid>
        <Navbar.Brand href="/allJd">
          {/* <img
            id="blitzigoLogoDark"
            className="d-inline-block align-top navLogo"
            src={blitzigoLogoDark}
            alt=""
          /> */}
        </Navbar.Brand>

        {/* <Row>
          <Col>
            <h3>Create JD</h3>
          </Col>
        </Row> */}
        {/* <form action="" className="search-bar">
          <Row>
            <Col>
              <div className="wrap">
                <div className="search">
                  <input
                    type="text"
                    className="searchTerm"
                    placeholder="What are you looking for?"
                  />
                  <button type="submit" className="searchButton">
                    <i className="fa fa-search"></i>
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        </form> */}
        <Row>
          <Col md={6}>
            <a href="/createJd">
              <Button varient="primary">+ Add new job</Button>
            </a>
          </Col>
          <Col md={6}>
            <Row>
              <Col md={4} className="d-flex justify-content-end">
                {" "}
                <IoNotificationsOutline
                  size={25}
                  style={{ marginTop: "10px" }}
                />
              </Col>
              <Col md={4} className="d-flex justify-content-start">
                {" "}
                <IoSettingsOutline size={25} style={{ marginTop: "10px" }} />
              </Col>
              <Col md={4} className="d-flex justify-content-end">
                <NavDropdown
                  id="nav-dropdown-dark-example"
                  title={
                    <FaRegUserCircle size={25} style={{ marginTop: "3px" }} />
                  }
                  menuVariant="dark"
                  style={{ paddingLeft: "30px" }}
                >
                  <NavDropdown.Item href="#action/3.3">
                    Profile
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Logout</NavDropdown.Item>
                </NavDropdown>
              </Col>
            </Row>
          </Col>
        </Row>
      </Container>
    </Navbar>
  );
};

export default BlitzNavBar;
