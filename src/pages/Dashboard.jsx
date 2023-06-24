import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/sb-admin-2.css";
// import "../vendor/fontawesome-free/css/all.min.css";
import Sky from "../assets/images/Sky.png";
import Skysite from "../assets/images/LogoSky.png";
import "../assets/css/Dashboard.css";
import Demo from "../component/usermanagement/UserMenagement";
import Rule from "../component/RoleMenagement";
import Audit from "../component/auditTrail/AuditTrail";
import BranchMenagement from "../component/branchmgmt/BranchManagement";
import GeneralSettings from "../component/glsetting/GenenalSetting";
import BatchScheduler from "../component/system/BatchScheduler";
// import BatchScheduler from "../component/system/BatchScheduler";
import { IconName } from "react-icons/ri";
import "../assets/css/modal.css";
import axios from "axios";
import { getToken } from "../API/api";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
} from "react-router-dom";

import { Link, NavLink } from "react-router-dom";

const users = [
  {
    id: "1",
    mn_name: "Dashboard",
    mn_link: "/dashboard",
    mn_parentid: "0",
    mn_acl: "lvl_dash",
    mn_order: "1",
    mn_icon: "fa fa-dashboard",
    mn_breadcrumb: " ",
    child: [],
  },
  {
    id: "2",
    mn_name: "Administrator",
    mn_link: "",
    mn_parentid: "0",
    mn_acl: "lvl_adm",
    mn_order: "2",
    mn_icon: "fa fa-users",
    mn_breadcrumb: " ",
    element: "",
    child: [
      {
        id: "4",
        mn_name: "User Management",
        mn_link: "user",
        mn_parentid: "2",
        mn_acl: "lvl_adm_mgt",
        mn_order: "1",
        mn_icon: "",
        mn_breadcrumb: "User Management",
        element: <Demo />,
        child: [],
      },
      {
        id: "5",
        mn_name: "Role Management",
        mn_link: "/RoleManagement",
        mn_parentid: "2",
        mn_acl: "lvl_adm_acl",
        mn_order: "2",
        mn_icon: "",
        mn_breadcrumb: "Role Management",
        element: <Rule />,
        child: [],
      },
      {
        id: "6",
        mn_name: "System",
        mn_link: "",
        mn_parentid: "2",
        mn_acl: "lvl_adm_sys",
        mn_order: "3",
        mn_icon: "",
        mn_breadcrumb: "fa fa-cogs",
        child: [
          {
            id: "11",
            mn_name: "Batch Schedule",
            mn_link: "/BatchSchedule",
            mn_parentid: "6",
            mn_acl: "lvl_sys_bch_sch",
            mn_order: "1",
            mn_icon: "",
            mn_breadcrumb: "Batch Schedule",
            child: [],
          },
          {
            id: "12",
            mn_name: "Batch Schedule Checker",
            mn_link: "/BatchSchedule/Checker",
            mn_parentid: "6",
            mn_acl: "lvl_sys_bch_sch_chk",
            mn_order: "2",
            mn_icon: "",
            mn_breadcrumb: "Batch Schedule Checker",
            child: [],
          },
          {
            id: "13",
            mn_name: "Batch Schedule Approval",
            mn_link: "/BatchSchedule/Approval",
            mn_parentid: "6",
            mn_acl: "lvl_sys_bch_sch_apr",
            mn_order: "3",
            mn_icon: "",
            mn_breadcrumb: "Batch Schedule Approval",
            child: [],
          },
        ],
      },
      {
        id: "7",
        mn_name: "Audit Trail",
        mn_link: "/AuditTrail",
        mn_parentid: "2",
        mn_acl: "lvl_adm_adt",
        mn_order: "4",
        mn_icon: "",
        mn_breadcrumb: "Audit Trail",
        child: [],
      },
    ],
  },
  {
    id: "3",
    mn_name: "Parameter",
    mn_link: "",
    mn_parentid: "0",
    mn_acl: "lvl_prm",
    mn_order: "3",
    mn_icon: "",
    mn_breadcrumb: " ",
    child: [
      {
        id: "9",
        mn_name: "Global Setting",
        mn_link: "/global",
        mn_parentid: "3",
        mn_acl: "lvl_prm_gnr",
        mn_order: "1",
        mn_icon: "",
        mn_breadcrumb: "Global Setting",
        child: [],
      },
      {
        id: "10",
        mn_name: "Branch Management",
        mn_link: "/Branch",
        mn_parentid: "3",
        mn_acl: "lvl_sys_bch_m",
        mn_order: "2",
        mn_icon: "",
        mn_breadcrumb: "Branch Management",
        child: [],
      },
    ],
  },
];

const menuLevel = [
  {
    usruserid: "crm_admin",
    usrname: "crm_admin",
    usrnip: "crm_admin",
    usraccesslevel: "1",
    usrbranch: "BC001",
    usrstatus: 1,
    ldlmdescription: "lvl_dash",
    modules: "CORE",
  },
  {
    usruserid: "crm_admin",
    usrname: "crm_admin",
    usrnip: "crm_admin",
    usraccesslevel: "1",
    usrbranch: "BC001",
    usrstatus: 1,
    ldlmdescription: "lvl_adm",
    modules: "CORE",
  },
  {
    usruserid: "crm_admin",
    usrname: "crm_admin",
    usrnip: "crm_admin",
    usraccesslevel: "1",
    usrbranch: "BC001",
    usrstatus: 1,
    ldlmdescription: "lvl_prm",
    modules: "CORE",
  },
  {
    usruserid: "crm_admin",
    usrname: "crm_admin",
    usrnip: "crm_admin",
    usraccesslevel: "1",
    usrbranch: "BC001",
    usrstatus: 1,
    ldlmdescription: "lvl_adm_mgt",
    modules: "CORE",
  },
  {
    usruserid: "crm_admin",
    usrname: "crm_admin",
    usrnip: "crm_admin",
    usraccesslevel: "1",
    usrbranch: "BC001",
    usrstatus: 1,
    ldlmdescription: "lvl_adm_acl",
    modules: "CORE",
  },
  {
    usruserid: "crm_admin",
    usrname: "crm_admin",
    usrnip: "crm_admin",
    usraccesslevel: "1",
    usrbranch: "BC001",
    usrstatus: 1,
    ldlmdescription: "lvl_adm_sys",
    modules: "CORE",
  },
  {
    usruserid: "crm_admin",
    usrname: "crm_admin",
    usrnip: "crm_admin",
    usraccesslevel: "1",
    usrbranch: "BC001",
    usrstatus: 1,
    ldlmdescription: "lvl_adm_adt",
    modules: "CORE",
  },
  {
    usruserid: "crm_admin",
    usrname: "crm_admin",
    usrnip: "crm_admin",
    usraccesslevel: "1",
    usrbranch: "BC001",
    usrstatus: 1,
    ldlmdescription: "lvl_prm_gnr",
    modules: "CORE",
  },
  {
    usruserid: "crm_admin",
    usrname: "crm_admin",
    usrnip: "crm_admin",
    usraccesslevel: "1",
    usrbranch: "BC001",
    usrstatus: 1,
    ldlmdescription: "lvl_prm_brm",
    modules: "CORE",
  },
  {
    usruserid: "crm_admin",
    usrname: "crm_admin",
    usrnip: "crm_admin",
    usraccesslevel: "1",
    usrbranch: "BC001",
    usrstatus: 1,
    ldlmdescription: "lvl_sys_bch_sch",
    modules: "CORE",
  },
];

const Dashboard = (props) => {
  const [activeUsers, setActiveUsers] = useState([]);

  const menuTest = props.listmenu;
  const levelm = props.levelmenu;

  console.log(menuTest);
  console.log(levelm);

  const [sideBarHide, setSideBarHide] = useState(true);
  // const [userActive, setUserActive] = useState(user);
  const [token, setToken] = useState();
  const navigate = useNavigate();

  const [ruleMenagement, setruleMenagement] = useState(false);
  const [clickButton, setclickButton] = useState("");
  const [AuditTrail, setauditTrail] = useState(true);

  const getTokenApi = () => {
    getToken().then((e) => {
      setToken(e);
    });
  };

  useEffect(() => {
    getTokenApi();
  }, []);

  // useEffect(() => {
  //   if (token !== "") {
  //     postJDataUserResetIsLogin();
  //   }
  // }, []);

  // Dapatkan data sesi
  const sessionData = JSON.parse(localStorage.getItem("sessionData"));
  const listMenu = JSON.parse(localStorage.getItem("ListMenu"));
  const levelMenu = JSON.parse(localStorage.getItem("LevelMenu"));

  const filteredUsers = menuTest.filter((user) => {
    const matchingMenuLevel = levelm.find(
      (menu) => menu.ldlmdescription === user.mn_acl
    );
    return matchingMenuLevel !== undefined;
  });

  const toggleDropdown = (user) => {
    if (activeUsers.includes(user)) {
      setActiveUsers(activeUsers.filter((activeUser) => activeUser !== user));
    } else {
      setActiveUsers([...activeUsers, user]);
    }
  };

  const demo = (test) => {
    setclickButton(test);
  };
  console.log(clickButton);

  const renderChildMenu = (children) => {
    return (
      <ul className="dropdown-menu1">
        {children
          .filter((child) => {
            const level = levelm.find(
              (menu) => menu.ldlmdescription === child.mn_acl
            );
            return level;
          })
          .map((child) => (
            <li key={child.id} className="cabang p-0">
              {child.child && child.child.length > 0 ? (
                <div>
                  <button
                    onClick={() => toggleDropdown(child)}
                    className="text-white ml-3"
                  >
                    {child.mn_name}
                  </button>
                  {activeUsers.includes(child) && renderChildMenu(child.child)}
                </div>
              ) : (
                <button
                  className="text-white ml-3"
                  onClick={() => setclickButton(child.mn_link)}
                >
                  {child.mn_name}
                </button>
              )}
            </li>
          ))}
      </ul>
    );
  };

  // <NavLink to={`/dasboard ${child.mn_link}`}>
  //   <button>{child.mn_name}</button>
  // </NavLink>;
  return (
    <div id="page-top">
      <div id="wrapper">
        <div className="test-sidebar">
          <a
            className="sidebar-brand d-flex align-items-center justify-content-center"
            href="index.html"
          >
            <div className="sidebar-brand-icon rotate-n-15"></div>
            <div className="sidebar-brand-text mx-3 shadow">
              <img src={Sky} alt="" className="logoSky" />
            </div>
          </a>

          <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ">
            {filteredUsers.map((user) => (
              <li className="ml-4" key={user.id}>
                {user.child && user.child.length > 0 ? (
                  <div>
                    <button
                      onClick={() => toggleDropdown(user)}
                      className="flex items-center p-2 text-white rounded-lg dark:text-white hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <span className="">{user.mn_name}</span>
                    </button>
                    {activeUsers.includes(user) && renderChildMenu(user.child)}
                  </div>
                ) : (
                  <span className="flex items-center p-2 text-white rounded-lg dark:text-white  ">
                    {user.mn_name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-2 static-top shadow">
              {sideBarHide === true ? (
                <>
                  <button
                    className="btn mr-3"
                    onClick={() => setSideBarHide(false)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </>
              ) : (
                <>
                  <button
                    className="btn mr-3 "
                    onClick={() => setSideBarHide(true)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </>
              )}

              <ul className="navbar-nav ml-auto">
                <li className="nav-item dropdown no-arrow flex">
                  <a href="/" className="log-out flex">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6"
                    >
                      <path
                        fillRule="evenodd"
                        d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                        clipRule="evenodd"
                      />
                    </svg>
                    <span>Log Out</span>
                  </a>
                </li>
              </ul>
            </nav>

            {clickButton === "user" ? (
              <Demo />
            ) : clickButton === "RoleManagement" ? (
              <Rule />
            ) : clickButton === "AuditTrail" ? (
              <Audit />
            ) : clickButton === "Branch" ? (
              <BranchMenagement />
            ) : clickButton === "global" ? (
              <GeneralSettings />
            ) : clickButton === "BatchSchedule" ? (
              <BatchScheduler />
            ) : (
              <div>
                <h1>Dashboard</h1>
              </div>
            )}

            {/* <Routes>
              <Route exact path={"/user"} element={<Demo />}></Route>
              <Route path={"/RoleManagement"} element={<Rule />}></Route>
            </Routes> */}

            {/* <Routes>
              {users.map((link, pages) => (
                <Routes exact path={link.mn_link} element={link.element} />
              ))}
            </Routes> */}

            {/* <Routes>
              {menuTest.map(
                (menu) =>
                  menu.mn_name === "Dashboard" &&
                  child.map(({ , element }) => (
                    <Route exact path={path} element={element} />
                  ))
              )}
            </Routes> */}

            {/* <Routes>
              {menuTest.map(
                (menu) =>
                  menu.name === "Dashboard" &&
                  menu.child.map((childs) => (
                    <Route
                      exact
                      path={childs.mn_link}
                      element={childs.element}
                    />
                  ))
              )}
            </Routes> */}
          </div>

          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; SkyWorx 2023</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
