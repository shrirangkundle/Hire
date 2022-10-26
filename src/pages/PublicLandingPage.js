import { Fragment, useState } from "react"
import Icon from "../components/Icons"

function PublicLandingPage() {
    const [activeNav, setActiveNave]=useState(null)

    const topbar = (
        <div className="topbar">
            <div className="back-cover"></div>
            <div className="hire-plus-logo">
                <Icon type={"hire-logo"} width={80} height={44}/>
                <div className="company-title-wrapper">from  <div className="company-title">BRIDGE<span>N</span>TECH</div> </div>
            </div>
            <div className="right-section">
                {/* <div className="nav-menu">Platform</div>
                <div className="nav-menu">Employers</div>
                <div className="nav-menu">Applicants</div>
                <div className="nav-menu">Panelists</div> */}
                <div className="nav-menu">Recruiters</div>
                {/* <div className="nav-menu">Contact</div> */}
                <div className="nav-menu login-option"><a href="">Contact</a></div>
            </div>
        </div>
    )

    const firstSection = (
        <div className="first-section">
             <div className="left-section"  data-aos="slide-right" data-aos-duration="1000" data-aos-delay="50" >
                {/* <div className="buble-wrapper">
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                </div> */}
                 <div className="header-text text-1" 
                 >
                    Trust-Based Platform for IT Hiring.<br/> 
                 </div>
                 {/* <div className="header-text text-2">
                    Platform for <br/>
                 </div>
                 <div className="header-text text-3">
                    IT Hiring.
                 </div> */}
                 <div className="sub-text">
                    We source reliable pre-vetted IT Techies, ready for consideration within <br/>
                    96 Hours, using our SaaS Platform and help you scale your team saving <br/>
                    time, effort and budgets.
                </div>
                <div className="get-start-button">
                  <a href="/login">Get started</a>
                </div>
             </div>
            <div className="right-section" data-aos="slide-left" data-aos-duration="1000" data-aos-delay="50">
                <div className="home-image"></div>
                {/* <div className="circle"><Icon type="circle-svg" /></div>
                <div className="oval"><Icon type="oval" /></div> */}
            </div>
            
        </div>
    )

    const secondSection = (
        <div className="second-section">
             {/* <div className="buble-wrapper">
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                    <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span> <span></span>
                </div> */}
            <div  className="section-title" data-aos="fade-up" data-aos-duration="1500">
                Hire++ Platform <span className="text-blue">Serves</span>
            </div>
            <div  className="section-desc"> 
            </div>  
            <div className="cards-wrapper">
            <a href="/register"  className="registration-type-card"  data-aos="slide-right">
                {/* <div className="top-section candidate">
                </div> */}
                <div className="botton-section">
                    <Icon type="client-icon" />
                    <div className="card-title">Clients</div>
                    <div className="card-desc">Introduction to Wireframing and its Principles. Learn from the best in the industry.</div>
                    {/* <div className="registration-button"><a href="/candidateRegister">Register as a Candidate <Icon type={"arrow-right"} width={30} height={30}/></a></div> */}
                </div>
            </a>
            
            <a href="/panelistRegister" className="registration-type-card"  data-aos="slide-right" data-aos-delay="100"  data-aos-duration="1500">
                {/* <div className="top-section candidate">
                </div> */}
                <div className="botton-section">
                    <Icon type="panelist-icon" />
                    <div className="card-title">Panelists</div>
                    <div className="card-desc">Join as Domain and Technology Experts to hone Interviewing Skills, Stay in-sync with tech, and win rewards.</div>
                    {/* <div className="registration-button"><a href="/candidateRegister">Register as a Candidate <Icon type={"arrow-right"} width={30} height={30}/></a></div> */}
                </div>
            </a>

            <a  href="/candidateRegister" className="registration-type-card"  data-aos="slide-right"  data-aos-delay="200"  data-aos-duration="2000">
                {/* <div className="top-section candidate">
                </div> */}
                <div className="botton-section">
                    <Icon type="candidate-icon" />
                    <div className="card-title">Candidates</div>
                    <div className="card-desc">Candidates apply, test their proficiency and expertise, matching themselves with the right job with the right employer.</div>
                    {/* <div className="registration-button"><a href="/candidateRegister">Register as a Candidate <Icon type={"arrow-right"} width={30} height={30}/></a></div> */}
                </div>
            </a>

            <a href="/recruiterRegister" className="registration-type-card"  data-aos="slide-right" data-aos-delay="300"  data-aos-duration="2500">
                {/* <div className="top-section candidate">
                </div> */}
                <div className="botton-section">
                    <Icon type="recruiter-icon" />
                    <div className="card-title">Recruiters</div>
                    <div className="card-desc">Recruiters use platform to shortlist, test and verify their candidates for relevant submissions and fast closures.</div>
                    {/* <div className="registration-button"><a href="/candidateRegister">Register as a Candidate <Icon type={"arrow-right"} width={30} height={30}/></a></div> */}
                </div>
            </a>

            </div>

        </div>
    )

    const footer = (
        <div className="footer-section" >
            <div className="left-section" data-aos="slide-right" data-aos-duration="1000" data-aos-delay="50">
                <Icon type={"hire-logo"} width={80} height={44}/>
                <div className="from-text">from</div>
                <div className="company-title">BRIDGE<span className="text-blue">N</span>TECH</div>
                <div className="social-media-section">
                <Icon type="twitter-white"/>
                    <Icon type="linkdin-white"/>
                    <Icon type="google-white"/>

                </div>
            </div>
            <div className="right-section" >
                <div className="sub-section">
                    <div className="sub-section-title">Solutions</div>
                    <div className="sub-section-option" data-aos="slide-up" data-aos-duration="1000" data-aos-delay="50">Employers</div>
                    <div className="sub-section-option" data-aos="slide-up" data-aos-duration="1000" data-aos-delay="50">Applicants</div>
                    <div className="sub-section-option" data-aos="slide-up" data-aos-duration="1000" data-aos-delay="50">Panelists</div>
                    <div className="sub-section-option" data-aos="slide-up" data-aos-duration="1000" data-aos-delay="50">Recruiters</div>
                </div>

                <div className="sub-section">
                    <div className="sub-section-title">Resources</div>
                    <div className="sub-section-option" data-aos="slide-up" data-aos-duration="1000" data-aos-delay="50">Blogs   </div>
                    <div className="sub-section-option" data-aos="slide-up" data-aos-duration="1000" data-aos-delay="50">News</div>
                    <div className="sub-section-option" data-aos="slide-up" data-aos-duration="1000" data-aos-delay="50">Use Cases</div>
                    <div className="sub-section-option" data-aos="slide-up" data-aos-duration="1000" data-aos-delay="50">About Us</div>
                    <div className="sub-section-option" data-aos="slide-up" data-aos-duration="1000" data-aos-delay="50">Our Process </div>
                </div>

                <div className="sub-section">
                    <div className="sub-section-title" >Careers</div>
                    <div className="sub-section-option" data-aos="slide-up" data-aos-duration="1000" data-aos-delay="50">Open Positions</div>
                    <div className="sub-section-option" data-aos="slide-up" data-aos-duration="1000" data-aos-delay="50">Benefits</div>
                </div>


                <div className="sub-section">
                    <div className="sub-section-title">Policy</div>
                    <div className="sub-section-option" data-aos="slide-up" data-aos-duration="1000" data-aos-delay="50">Blogs</div>
                    <div className="sub-section-option" data-aos="slide-up" data-aos-duration="1000" data-aos-delay="50">News</div>
                    <div className="sub-section-option" data-aos="slide-up" data-aos-duration="1000" data-aos-delay="50">Use Cases</div>
                    <div className="sub-section-option" data-aos="slide-up" data-aos-duration="1000" data-aos-delay="50">About Us</div>
                    <div className="sub-section-option" data-aos="slide-up" data-aos-duration="1000" data-aos-delay="50">Our Process </div>
                </div>

                <div className="sub-section">
                    <div className="sub-section-title">Contact Us </div>
                    <div className="sub-section-option" data-aos="slide-up" data-aos-duration="1000" data-aos-delay="50">Support</div>
                    <div className="sub-section-option" data-aos="slide-up" data-aos-duration="1000" data-aos-delay="50">Sales</div>
                    <div className="sub-section-option" data-aos="slide-up" data-aos-duration="1000" data-aos-delay="50">Media Enquiries</div>
                    <div className="sub-section-option" data-aos="slide-up" data-aos-duration="1000" data-aos-delay="50">Login</div>
                </div>
            </div>
            <div className="copy-right">
            Copyright © 2022. Bridgentech Consulting, Plano, TX. All rights reserved.
            </div>

        </div>
    )

    return (
       <Fragment>
            <div className="welcome-wrapper">
                <div className="welcome-text-1" data-aos="slide-down" data-aos-duration="1000" > Hire with unprecedented</div>
                <div className="welcome-text-2" data-aos="slide-down" data-aos-duration="1300"> Speed and precision.</div>
                <div className="welcome-text-3" data-aos="slide-down" data-aos-duration="1800" ><span>With</span> <Icon type={"hire-logo"} width={130} height={52}/></div>
            </div>
            <div className="public-landing-page">
                {topbar}
                {firstSection}
                {secondSection}
                {footer}
            </div>
       </Fragment>
    )
}
export default PublicLandingPage