import { FaBars, FaHome, FaUser } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";
import SidebarMenu from "./SidebarMenu";
import blitzLogo from "../../assets/images/logo/Logomark-Hirepp.svg";
import { AiOutlineCalendar, AiOutlineStar } from "react-icons/ai";
import { RiSuitcaseLine } from "react-icons/ri";
import { BsFlag } from "react-icons/bs";
import { FiHome } from "react-icons/fi";
import { FiUsers } from "react-icons/fi";
import expandSideNav from "../../assets/sidebarLogos/collapseSideNav.svg";

const routes = [
  {
    path: "/recruiterDash",
    name: "Home",
    icon: <FiHome className="sidebarIcons" />,
  },
  {
    path: "/allJd",
    name: "Jobs",
    icon: <RiSuitcaseLine className="sidebarIcons" />,
  },
  {
    path: "/#",
    name: "Candidates",
    icon: <FiUsers className="sidebarIcons" />,
  },
  {
    path: "#",
    name: "Interview Scheduler",
    icon: <AiOutlineCalendar className="sidebarIcons" />,
  },
  {
    path: "#",
    name: "Report",
    icon: <AiOutlineStar className="sidebarIcons" />,
  },
  {
    path: "#",
    name: "Rewards",
    icon: <BsFlag className="sidebarIcons" />,
  },
];

const SideBar = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggle = () => setIsOpen(!isOpen);
  // const inputAnimation = {
  //   hidden: {
  //     width: 0,
  //     padding: 0,
  //     transition: {
  //       duration: 0.2,
  //     },
  //   },
  //   show: {
  //     width: "140px",
  //     padding: "5px 15px",
  //     transition: {
  //       duration: 0.2,
  //     },
  //   },
  // };

  const showAnimation = {
    hidden: {
      width: 0,
      opacity: 0,
      transition: {
        duration: 0.5,
      },
    },
    show: {
      opacity: 1,
      width: "auto",
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <>
      <div className="main-container">
        <motion.div
          animate={{
            width: isOpen ? "200px" : "53px",

            transition: {
              duration: 0.5,
              type: "spring",
              damping: 10,
            },
          }}
          className={`sidebar`}
        >
          <div className="top_section">
            <img
              src={blitzLogo}
              style={{ width: isOpen ? "65px" : "0px" }}
              alt=""
            />
          </div>

          {/* <div className="search">
            <div className="search_icon">
              <BiSearch />
            </div>
            <AnimatePresence>
              {isOpen && (
                <motion.input
                  initial="hidden"
                  animate="show"
                  exit="hidden"
                  variants={inputAnimation}
                  type="text"
                  placeholder="Search"
                />
              )}
            </AnimatePresence>
          </div> */}
          <section className="routes">
            {routes.map((route, index) => {
              return (
                <SidebarMenu
                  key={index}
                  setIsOpen={setIsOpen}
                  route={route}
                  showAnimation={showAnimation}
                  isOpen={isOpen}
                />
              );
            })}
          </section>
          <div className="bars">
            <img
              src={expandSideNav}
              alt=""
              onClick={toggle}
              className="expandCollapseSidebar"
            />
          </div>
        </motion.div>

        <main>{children}</main>
      </div>
    </>
  );
};

export default SideBar;
