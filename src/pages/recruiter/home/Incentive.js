import FormComponent from "../../../components/form";
import TableComponent from "../../../components/Table";
import "../../../styles/incentive.css";

function Incentive(props) {
  const { isEditable } = props;

  let config2 = {
    initial_disabled: !isEditable,
    // "title":"Company Profile",
    _order: {
      Name: 1,
      "Pan Number": 2,
      "Account Holder Name": 3,
      "Bank Name": 4,
      "IFSC Code": 5,
      "Bank Address": 6,
      "Email ID (For intimation)": 7,
      "Mobile Number (For Intimation)": 8,
      verify: 9,
    },
    verify: {
      type: "switch",
      // "placeholder": "Type here",
      width: "100%",
      key: "",
      display:
        "I verify the details above and indemnify Hire++ team from any error in details.",
      flex: false,
      required: false,
    },
    "I m also open for freelance hiriring assignemnets as an individual": {
      type: "switch",
      // "placeholder": "Type here",
      width: "100%",
      key: "II’m also open for freelance hiriring assignemnets as an individual",
      display:
        "II’m also open for freelance hiriring assignemnets as an individual",
      flex: false,
      required: false,
    },
    Name: {
      type: "text",
      placeholder: "Type here",
      width: "49%",
      key: "Name",
      label: "Name (as Per PAN Card)",
      flex: false,
      required: true,
    },
    "Pan Number": {
      type: "text",
      placeholder: "Type here",
      width: "49%",
      key: "Pan Number",
      label: "Pan Number",
      flex: false,
      required: true,
    },
    "Account Holder Name": {
      type: "text",
      placeholder: "Type here",
      width: "49%",
      key: "Account Holder Name",
      label: "Account Holder Name",
      flex: false,
      required: true,
    },
    "Bank Name": {
      type: "text",
      placeholder: "Type here",
      width: "49%",
      key: "Bank Name",
      label: "Bank Name",
      flex: false,
      required: true,
    },
    "IFSC Code": {
      type: "text",
      placeholder: "Type here",
      width: "49%",
      key: "IFSC Code",
      label: "IFSC Code",
      flex: false,
      required: true,
    },
    "Bank Address": {
      type: "text",
      placeholder: "Type here",
      width: "49%",
      key: "Bank Address",
      label: "Bank Address",
      flex: false,
      required: false,
    },
    "Email ID (For intimation)": {
      type: "text",
      placeholder: "Type here",
      width: "49%",
      key: "Email ID (For intimation)",
      label: "Email ID (For intimation)",
      flex: false,
      required: true,
    },
    "Mobile Number (For Intimation)": {
      type: "text",
      placeholder: "Type here",
      width: "49%",
      key: "Mobile Number (For Intimation)",
      label: "Mobile Number (For Intimation)",
      flex: false,
      required: true,
    },
  };
  return (
    <div className="incentive-page-wrapper">
      <div className="incentive-section">
        <div className="incentive-title">Incentive Summary</div>
        <div className="incentive-desc">
          Here you can see your incentives for the Successful Placements &
          Sourcing
        </div>
        <TableComponent id={"incentive"} />
      </div>
      <div className="incentive-section">
        <div className="incentive-title">Banking Details</div>
        <div className="incentive-desc">
          You can update your Bank Account Details where you receive the
          Incentives
        </div>
        <FormComponent
          config={config2}
          preFilledData={{ "Bank Name": "State Bank of India" }}
        />
        <div className="incentive-button-wrapper">
          <button className="cancle-button" disabled={!isEditable}>
            Cancel
          </button>
          <button className="primary-button" disabled={!isEditable}>
            Save changes
          </button>
        </div>
      </div>
    </div>
  );
}
export default Incentive;
