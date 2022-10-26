import React, { useState, useRef } from "react";
import { Container } from "react-bootstrap";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import UplaodImg from './cloud2.svg';
// import "./dragDrop.css";
import "../../styles/addMultipleCandidate.css";
import { Input } from "antd";
import "antd/dist/antd.css";
import { LinkOutlined } from "@ant-design/icons";

function DragandDropModal(props) {
  const wrapperRef = useRef(null);
  const inputRef = useRef(null);
  const [formData,setFormData] = useState({});
  const [uploadFile, setUploadFile] = useState("");

  const [fileList, setFileList] = useState([]);

  const onDragEnter = () => wrapperRef.current.classList.add("dragover");

  const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

  const onDrop = () => wrapperRef.current.classList.remove("dragover");

  const handleFileReader = (event) => {
    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (e) => {
      setUploadFile(e.target.result);
    };
  };

  const onFileDrop = (e) => {
    const newFile = e.target.files[0];
    const fileType = newFile.type;
    // console.log("file type " + fileType);
    if (
      fileType ===
      "zip,application/octet-stream,application/zip,application/x-zip,application/x-zip-compressed"
    ) {
      // console.log("condition met");
      // const updatedList = [...fileList, newFile]; add multiple files at once.
      const updatedList = [newFile];
      setFileList(updatedList);
      props.onFileChange(updatedList);
    } else {
      alert("Please only upload zip file");
      return;
    }
  };
  return (
    <Modal
      {...props}
      size="md"
      aria-labelledby="contained-modal-title-vcenter"
      centered
    >
      <Container
        fluid
        className=""
        style={{
          borderRadius: "12px",
          boxShadow:
            "0px 16px 24px -4px rgba(16, 24, 40, 0.08), 0px 8px 8px -4px rgba(16, 24, 40, 0.03)",
        }}
      >
        <Modal.Body>
          <div className="">
            <svg
              width="55"
              height="55"
              viewBox="0 0 56 56"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="4" y="4" width="48" height="48" rx="24" fill="#D4E7FD" />
              <path
                d="M29.5806 31.1093C29.0916 30.7681 28.569 30.4901 28.0224 30.2777C28.7495 29.6168 29.2318 28.6911 29.3157 27.6547C30.4183 26.5803 31.8636 25.9913 33.413 25.9913C34.6226 25.9913 35.7839 26.3556 36.7718 27.0445C37.1258 27.2914 37.6125 27.2047 37.8594 26.8507C38.1062 26.4969 38.0195 26.01 37.6656 25.7632C37.1766 25.422 36.6538 25.1442 36.1073 24.9316C36.9096 24.2024 37.414 23.1509 37.414 21.9839C37.414 19.7871 35.6269 18 33.4301 18C31.2334 18 29.4463 19.7871 29.4463 21.9839C29.4463 23.1462 29.9467 24.1938 30.7435 24.9228C30.6344 24.9647 30.5259 25.0091 30.4185 25.0564C29.9296 25.2716 29.47 25.5362 29.0426 25.8468C28.4531 24.3824 27.018 23.3461 25.3452 23.3461C23.1486 23.3461 21.3613 25.1332 21.3613 27.3298C21.3613 28.4889 21.8589 29.5337 22.6514 30.2623C20.5324 31.0562 18.8143 32.7614 18.1148 34.936C17.8829 35.6572 18.0057 36.4219 18.4519 37.0343C18.8981 37.6465 19.5884 37.9976 20.3458 37.9976H27.1419C27.5733 37.9976 27.923 37.6478 27.923 37.2163C27.923 36.7849 27.5733 36.4352 27.1419 36.4352H20.3458C20.0933 36.4352 19.8632 36.3182 19.7144 36.114C19.5657 35.9099 19.5248 35.6549 19.602 35.4144C20.3741 33.0139 22.7288 31.3374 25.3281 31.3374C26.5375 31.3374 27.699 31.7016 28.6869 32.3906C29.0408 32.6375 29.5277 32.5506 29.7745 32.1968C30.0213 31.8429 29.9346 31.356 29.5806 31.1093ZM33.4301 19.5623C34.7654 19.5623 35.8517 20.6486 35.8517 21.9839C35.8517 23.3191 34.7654 24.4055 33.4301 24.4055C32.095 24.4055 31.0085 23.3191 31.0085 21.9839C31.0085 20.6486 32.095 19.5623 33.4301 19.5623ZM25.3452 24.9083C26.6805 24.9083 27.7668 25.9947 27.7668 27.3298C27.7668 28.6651 26.6805 29.7514 25.3452 29.7514C24.0099 29.7514 22.9237 28.6651 22.9237 27.3298C22.9237 25.9947 24.0099 24.9083 25.3452 24.9083ZM38 34.2871C38 34.7185 37.6502 35.0682 37.2187 35.0682H35.0706V37.2163C35.0706 37.6478 34.7208 37.9976 34.2895 37.9976C33.858 37.9976 33.5082 37.6478 33.5082 37.2163V35.0682H31.3601C30.9287 35.0682 30.579 34.7185 30.579 34.2871C30.579 33.8556 30.9287 33.5058 31.3601 33.5058H33.5082V31.3577C33.5082 30.9263 33.858 30.5766 34.2895 30.5766C34.7208 30.5766 35.0706 30.9263 35.0706 31.3577V33.5058H37.2187C37.6502 33.5058 38 33.8556 38 34.2871Z"
                fill="#206DC5"
              />
              <rect
                x="4"
                y="4"
                width="48"
                height="48"
                rx="24"
                stroke="#EAF3FE"
                stroke-width="8"
              />
            </svg>
          </div>
          <h4 className="mt-3 ">Add Multiple Candidates</h4>
          <Row className="w-100 m-auto  mt-3 p-0">
            <Col
              className=" p-3"
              style={{
                background: "#f2f4f7",
                borderRadius: "6px",
                color: "#344054",
              }}
            >
              <Input
                ref={inputRef}
                type="file"
                webkitdirectory="true"
                placeholder="Upload Folder"
                id="file_folder"
                required
                style={{ display: "none" }}
              />
              <label
                for="file_folder"
                className="fs-7 fw-semibold mb-0"
                style={{ cursor: "pointer" }}
              >
                Uplaod folder
              </label>
            </Col>
          </Row>
          <Row className="w-100 m-auto mt-2 p-0">
            <Col
              className=" p-3"
              style={{
                background: "#f2f4f7",
                borderRadius: "6px",
                color: "#344054",
              }}
            >
              <input
                id="file"
                onChange={(event) =>
                  setFormData({ ...formData, file: event.target.value })
                }
                type="file"
                accept=" .png, .jpeg, .pdf, .docx"
                required
                style={{ display: "none" }}
              />
              <label
                for="file"
                className="fs-7 fw-semibold mb-0"
                style={{ cursor: "pointer" }}
              >
                select file
              </label>
            </Col>
          </Row>

          <Row className="w-100 m-auto mt-2 p-0">
            <Col
              className=" p-3"
              style={{
                background: "#f2f4f7",
                borderRadius: "6px",
                color: "#344054",
              }}
            >
              <Input
                onChange={handleFileReader}
                type="file"
                id="file-zip"
                accept=".zip,.rar,.7zip"
                required
                style={{ display: "none" }}
              />
              <label
                for="file-zip"
                className="fs-7 fw-semibold mb-0"
                style={{ cursor: "pointer" }}
              >
                upload .zip Folder
              </label>
            </Col>
          </Row>

          <p className="hire_bulk_break_line_multiple m-auto mt-4 fs-5">
            <span>or</span>
          </p>

          <div className="hire_bulk_pasteLink_multiple mt-4">
            <p className="fs-6 fw-semibold mb-2" style={{ color: "#344054" }}>
              Provide a link to download your .zip file
            </p>
            <Input
              size="large"
              placeholder="Paste your .zip file link here....."
              prefix={
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M8.33326 10.8332C8.69113 11.3117 9.14772 11.7075 9.67205 11.994C10.1964 12.2805 10.7762 12.4508 11.3721 12.4935C11.9681 12.5362 12.5662 12.4502 13.126 12.2414C13.6858 12.0326 14.1942 11.7058 14.6166 11.2832L17.1166 8.78322C17.8756 7.99738 18.2956 6.94487 18.2861 5.85238C18.2766 4.7599 17.8384 3.71485 17.0658 2.94231C16.2933 2.16978 15.2482 1.73157 14.1558 1.72208C13.0633 1.71259 12.0108 2.13256 11.2249 2.89156L9.79159 4.31656M11.6666 9.16656C11.3087 8.68811 10.8521 8.29224 10.3278 8.00577C9.80347 7.71931 9.22367 7.54896 8.62771 7.50628C8.03176 7.4636 7.4336 7.54958 6.8738 7.7584C6.314 7.96723 5.80566 8.294 5.38326 8.71656L2.88326 11.2166C2.12426 12.0024 1.70429 13.0549 1.71378 14.1474C1.72327 15.2399 2.16148 16.2849 2.93401 17.0575C3.70655 17.83 4.7516 18.2682 5.84408 18.2777C6.93657 18.2872 7.98908 17.8672 8.77492 17.1082L10.1999 15.6832"
                    stroke="#667085"
                    stroke-width="1.66667"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                  />
                </svg>
              }
              className="hire_bulk_input_zip p-2  fs-5  "
              style={{
                border: "1px solid #D0D5DD",
                borderRadius: "8px",
                boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
              }}
            />
          </div>
          <Row className="w-100 p-0 mt-3 mb-3 m-auto gap-3">
            <Col md className="mt-2 p-0 ">
              <Button
                onClick={props.onHide}
                className=" bg-light p-2 fs-5 "
                style={{
                  color: "#344054",
                  width: "100%",
                  borderRadius: "8px",
                  border: " 1px solid #D0D5DD",
                  boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                }}
              >
                Previous
              </Button>
            </Col>
            <Col md className="mt-2 p-0 ">
              <Button
                className=" p-2 fs-5"
                style={{
                  color: "white",
                  width: "100%",
                  background: "#206DC5",
                  borderRadius: "8px",
                  border: "1px solid #A9CFFB",
                  boxShadow: "0px 1px 2px rgba(16, 24, 40, 0.05)",
                }}
              >
                Next
              </Button>
            </Col>
          </Row>
        </Modal.Body>
      </Container>
    </Modal>
  );
}

export default DragandDropModal;
