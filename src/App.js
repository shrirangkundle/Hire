import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
//hire plus plus pages

// New All jd route here
import HireAllJD from "./pages/allJd/NewAllJd";
import HirePPReviewJd from "./pages/jobDetails/JobDetailNew";
import HirePPviewJd from "./pages/addCandidates/viewJd";
import HirePPAddCandidate from "./pages/addCandidates/addCandidate";
import HirePPJobDetailsNew from "./pages/jobDetails/JobDetailNew";
// import HirePPLogin from "./pages/Login";
import HirePPRegistration from "./pages/Registration";
import HirePPCheckMail from "./pages/CheckMail";
import HirePPEmailVarified from "./pages/EmailVarified";
import HirePPForgotPass from "./pages/ForgotPass";
import HirePPNewPass from "./pages/NewPass";
import RecruiterPage from "./pages/recruiter";
import RecruiterDash from "./pages/Dashboard/RecruiterDash";
// create Jd files import
import HirePPCreateJdNew from "./pages/createJd/CreateJd";
import "./styles/main.scss";
import HirePPCreateJdAdditionalDetails from "./pages/createJd/createJdMoreDetails";
import HirePPCreateJdDescription from "./pages/createJd/createJdDescription";
import HirePPCreateJdSkills from "./pages/createJd/createJdSkills";
import HirePPCreateJdStep2 from "./pages/createJd/createJdStep2";
import HirePPCreateJdUploadFiles from "./pages/createJd/createJdUploadFile";
import HirePPReviewCandidateJd from "./pages/candidateReview/candidateReview";

import "../src/App.css";
import RegistrationPage from "./pages/RegistrationPage";
import CandidatePage from "./pages/candidate";
import PanelistPage from "./pages/panelist";
import LoginPage from "./pages/LoginPage";
import PublicLandingPage from "./pages/PublicLandingPage";
import Utils from "./Utils";
import CandidateRegistration from "./pages/CandidateRegistration";
import PanelistRegistrations from "./pages/PanelistRegistration";
import RecruiterRegistration from "./pages/RecruiterRegistration";
import StandAlone1 from "./pages/standAloneInterviewPlatform";
import StandAlone2 from "./pages/standAloneInterviewPlatform/step2";
import StandAlone3 from "./pages/standAloneInterviewPlatform/step3";
import StandAlone4 from "./pages/standAloneInterviewPlatform/step4";
import FinalPreview from "./pages/standAloneInterviewPlatform/final";

// standalone interview platform

function App() {
  let candidatePaths = [];
  let recruiterPaths = [];
  let panelistPaths = [];
  let adminPaths = [];
  let userRole = "";
  let userDetail = Utils.getUserDetail();
  // var dummyObj = { userRole: "RECRUITER" };
  // let userDetail = dummyObj;

  if (!userDetail || (userDetail && !userDetail.userRole)) {
    return (
      <Router>
        <Routes>
          <Route exact path="/register" element={<RegistrationPage />} />
          <Route
            exact
            path="/candidateRegister"
            element={<CandidateRegistration />}
          />
          <Route
            exact
            path="/panelistRegister"
            element={<PanelistRegistrations />}
          />
          <Route
            exact
            path="/recruiterRegister"
            element={<RecruiterRegistration />}
          />
          <Route exact path="/login" element={<LoginPage />} />
          <Route exact path="/checkMail" element={<HirePPCheckMail />} />
          <Route
            exact
            path="/emailVarified"
            element={<HirePPEmailVarified />}
          />
          <Route exact path="/forgotPassword" element={<HirePPForgotPass />} />
          <Route exact path="/newPassword" element={<HirePPNewPass />} />
          <Route exact path="*" element={<PublicLandingPage />} />
        </Routes>
      </Router>
    );
  } else if (userDetail) {
    if (
      userDetail.userRole == "RECRUITER" ||
      userDetail.userRole == "HIRING MANAGER"
    ) {
      return (
        <Router>
          <Routes>
            <Route exact path="/" element={<Navigate to="/recruiterDash" />} />
            <Route
              exact
              path="/recuiter"
              element={<Navigate to="/recuiter/home" />}
            />
            <Route exact path="/recuiter/:page" element={<RecruiterPage />} />
            <Route exact path="/recruiterDash" element={<RecruiterDash />} />
            {/* createJd new paths */}
            <Route exact path="/createJd" element={<HirePPCreateJdNew />} />
            <Route
              exact
              path="/createJdStep2"
              element={<HirePPCreateJdStep2 />}
            />
            <Route
              exact
              path="/candidateReview"
              element={<HirePPReviewCandidateJd />}
            />
            <Route
              exact
              path="/createJdUploadFile"
              element={<HirePPCreateJdUploadFiles />}
            />
            <Route
              exact
              path="/createJdSkills"
              element={<HirePPCreateJdSkills />}
            />
            <Route
              exact
              path="/createJdAdditionalDetails"
              element={<HirePPCreateJdAdditionalDetails />}
            />
            <Route
              exact
              path="/createJdSkills"
              element={<HirePPCreateJdSkills />}
            />
            <Route
              exact
              path="/createJdDescription"
              element={<HirePPCreateJdDescription />}
            />
            {/* Job view add/match candidates */}
            <Route exact path="/allJd" element={<HireAllJD />} />
            <Route exact path="/viewJd/:id" element={<HirePPviewJd />} />
            <Route exact path="/reviewJd/:id" element={<HirePPReviewJd />} />
            <Route
              exact
              path="/addCandidate/:id"
              element={<HirePPAddCandidate />}
            />
            <Route
              exact
              path="/jobDetails/:id"
              element={<HirePPJobDetailsNew />}
            />
            {/* Login and Registration Paths */}
            <Route exact path="/" element={<LoginPage />} />
            <Route exact path="/register" element={<RegistrationPage />} />
            <Route exact path="/login" element={<LoginPage />} />
            <Route
              exact
              path="/userRegistration"
              element={<HirePPRegistration />}
            />
            <Route exact path="/checkMail" element={<HirePPCheckMail />} />
            <Route
              exact
              path="/emailVarified"
              element={<HirePPEmailVarified />}
            />
            <Route
              exact
              path="/forgotPassword"
              element={<HirePPForgotPass />}
            />
            <Route exact path="/newPassword" element={<HirePPNewPass />} />
            {/* interview platform routes start */}
            <Route
              exact
              path="/standAloneInterview1"
              element={<StandAlone1 />}
            />
            <Route
              exact
              path="/standAloneInterview2"
              element={<StandAlone2 />}
            />
            <Route
              exact
              path="/standAloneInterview3"
              element={<StandAlone3 />}
            />
            <Route
              exact
              path="/standAloneInterview4"
              element={<StandAlone4 />}
            />
            {/* FinalPreview */}
            <Route exact path="/standAlonePreview" element={<FinalPreview />} />
          </Routes>
        </Router>
      );
    } else if (userDetail.userRole == "CANDIDATE") {
      return (
        <Router>
          <Routes>
            <Route exact path="/" element={<Navigate to="/candidate/home" />} />
            <Route
              exact
              path="/candidate"
              element={<Navigate to="/candidate/home" />}
            />
            <Route exact path="/candidate/:page" element={<CandidatePage />} />
          </Routes>
        </Router>
      );
    } else if (userDetail.userRole == "PANELIST") {
      return (
        <Router>
          <Routes>
            <Route exact path="/" element={<Navigate to="/panelist/home" />} />
            <Route
              exact
              path="/panelist"
              element={<Navigate to="/panelist/home" />}
            />
            <Route exact path="/panelist/:page" element={<PanelistPage />} />
          </Routes>
        </Router>
      );
    }
  }
}

export default App;
