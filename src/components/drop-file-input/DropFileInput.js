import React, { useRef, useState } from "react";
import PropTypes from "prop-types";

import "./drop-file-input.css";

import uploadImg from "./cloud.svg";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

const DropFileInput = (props) => {
  // console.log(props.resumeName);
  const wrapperRef = useRef(null);

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    const fileType = newFile.type;
    // console.log("file type " + fileType);
    if (
      fileType === "application/pdf" ||
      fileType ===
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      fileType === "application/msword"
    ) {
      // console.log("condition met");
      // const updatedList = [...fileList, newFile]; add multiple files at once.
      const updatedList = [newFile];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    } else {
      alert("Please only upload PDF or DOC file");
      return;
    }
  };

  return (
    <>
      <div
        ref={wrapperRef}
        className="drop-file-input"
        onDragEnter={onDragEnter}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        {/* <img src={uploadImg} alt="" />
          <p>
            Drag & Drop or click to upload <br /> your job escription document
            here <br />{" "}
            <span style={{ fontSize: "11px" }}>
              PDF, DOC, DOCX files are allowed
            </span>
          </p> */}
        <Row>
          <Col md={3}>
            <img src={uploadImg} alt="" />
          </Col>
          <Col md={8} className="d-flex justify-content-center">
            <Row>
              <Col md={12}>
                <h4>
                  <span style={{ color: "#206DC5" }}>Click to upload</span> or
                  drag and drop
                </h4>
              </Col>
              <Col md={12}>
                {" "}
                <p>{props.resumeName}</p>
              </Col>
            </Row>
          </Col>
        </Row>

        <input
          type="file"
          value=""
          accept="application/pdf,application/msword,
  application/vnd.openxmlformats-officedocument.wordprocessingml.document"
          onChange={onFileDrop}
        />
      </div>
    </>
  );
};

DropFileInput.propTypes = {
  onFileChange: PropTypes.func,
};

export default DropFileInput;
