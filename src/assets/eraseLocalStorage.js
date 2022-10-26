const eraseLocalStorage = () => {
  localStorage.removeItem("hirePPEmploymentType");
  localStorage.removeItem("hirePPDomain");
  localStorage.removeItem("hirePPFunctionalArea");
  localStorage.removeItem("hirePPCurr");
  localStorage.removeItem("hirePPExpSalaryMin");
  localStorage.removeItem("hirePPExpSalaryMax");
  localStorage.removeItem("newJobObj");
  localStorage.removeItem("flag1");
  localStorage.removeItem("flag2");
  localStorage.removeItem("clientName");
  localStorage.removeItem("noOfOpening");
  localStorage.removeItem("currJobName");
  localStorage.removeItem("currJobJoiningDate");
  localStorage.removeItem("locationType");
  localStorage.removeItem("cityLocation");
  localStorage.removeItem("hiringManager");
};

export default eraseLocalStorage;
