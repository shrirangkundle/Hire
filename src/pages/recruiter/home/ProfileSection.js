import { Fragment } from "react";

function RecruiterSection(props) {

    const { isEditable, onChange } = props;

    return (
        <div className="recruiter-profile-section">
            <div className="right-section">
                <div className="section">
                    <div className="profile-pic">
                    </div>
                    <div className="title-wrapper">
                        <div className="title">Syed Imran</div>
                        <div className="email">syed.i@bridgentech.com</div>
                    </div>
                </div>
            </div>
            <div className="left-section">
                <div className="close-button">x</div>
                <div className="button-wrapper">
                    {
                        isEditable ? (
                            <Fragment>
                                <button className="cancle-button" onClick={() => onChange(false)}>Cancel</button>
                                <button className="primary-button">Save</button>
                            </Fragment>
                        ) : (
                            <button className="primary-button" onClick={() => onChange(true)}>Edit</button>
                        )
                    }
                </div>
            </div>
        </div>
    )
}
export default RecruiterSection;