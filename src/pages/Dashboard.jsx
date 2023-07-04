import React, { useState, useEffect } from "react";
import "../assets/css/sb-admin-2.css";
import Sky from "../assets/images/Sky.png";
import Skysite from "../assets/images/LogoSky.png";
import "../assets/css/Dashboard.css";
import Demo from "../component/usermanagement/UserMenagement";
import Rule from "../component/roleManagement/RoleMenagement";
import Audit from "../component/auditTrail/AuditTrail";
import BranchMenagement from "../component/branchmgmt/BranchManagement";
import GeneralSettings from "../component/glsetting/GenenalSetting";
import BatchScheduler from "../component/system/BatchScheduler";
import BatchSchedulerApp from "../component/system/BatchSchedulerApproval";
import BatchSchedulerCk from "../component/system/BatchSchedulerChecker";
import Apimanagement from "../component/apimgmt/ApiManagement";
import DynamicOption from "../component/dynamicOption/DynamicOption";
import { IconName } from "react-icons/ri";
import "../assets/css/modal.css";
import axios from "axios";
import { getToken } from "../API/api";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
  NavLink,
} from "react-router-dom";

// const dataMenu = localStorage.getItem("MenuList");
// const parsedData = JSON.parse(dataMenu);
// const dataMenuLevel = localStorage.getItem("detailRoleUser");
// const parsedDataLevel = JSON.parse(dataMenuLevel);

const Dashboard = (props) => {
  const [sidebarActive, setActiveSideBAr] = useState(true);
  const [activeUsers, setActiveUsers] = useState([]);

  const [menuListBaru, setMenuListBaru] = useState([]);
  const [menuLevelBaru, setMenuLevelBaru] = useState([]);
  localStorage.setItem("detailRoleUser", JSON.stringify(menuLevelBaru));

  // ! get userid
  const userid = JSON.parse(localStorage.getItem("userid"));
  const tokenTest = JSON.parse(localStorage.getItem("tokenData"));

  const userId = props.userid;
  console.log(userId);
  const menuTest = props.listmenu;
  const levelm = props.levelmenu;

  const [sideBarHide, setSideBarHide] = useState(true);

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

  useEffect(() => {
    getDataUserRoleDetail();
    generalListMenuAPI();
  }, [token]);

  // ! nanti atur secara dinamis
  const data1 = {
    user: userid,
    modules: "CORE",
  };
  const getDataUserRoleDetail = async () => {
    try {
      const userRoleDetail = await axios.post(
        "http://116.206.196.65:30983/skycore/Login/getDataUserRoleDetail",
        JSON.stringify(data1),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenTest}`,
          },
        }
      );

      let dataUserRoleDetailApi = userRoleDetail.data.data.map((e) => {
        return e;
      });
      console.log(dataUserRoleDetailApi);
      setMenuLevelBaru(dataUserRoleDetailApi);

      // alert("userRoleDetail Berhasil ke Hit");
    } catch (error) {
      alert("reset fail login gagal");
    }
  };

  const generalListMenuAPI = async () => {
    try {
      const listMenu = await axios.get(
        "http://116.206.196.65:30983/skycore/Login/GenerateListMenu/0",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${tokenTest}`,
          },
        }
      );

      let generalListMenu = listMenu.data.data.map((e) => {
        return e;
      });

      setMenuListBaru(generalListMenu);
    } catch (error) {
      alert("List Menu gagal");
    }
  };

  // Dapatkan data sesi
  const sessionData = JSON.parse(localStorage.getItem("sessionData"));
  const listMenu = JSON.parse(localStorage.getItem("ListMenu"));
  const levelMenu = JSON.parse(localStorage.getItem("LevelMenu"));
  console.log(clickButton);

  const filteredUsers = menuListBaru.filter((user) => {
    const matchingMenuLevel = menuLevelBaru.find(
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

  //  <button
  //    className="text-white ml-3"
  //    onClick={() => setclickButton(child.mn_link)}
  //    id={child.mn_name}>
  //    <span className="text-sm">{child.mn_name}</span>
  //  </button>;

  // useEffect(() => {
  // setTimeout(() => {

  // }, 30000);
  // }, [input])

  const rute = "/dashboard";
  const renderChildMenu = (children) => {
    return (
      <ul className="dropdown-menu1">
        {children
          .filter((child) => {
            const level = menuLevelBaru.find(
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
                    className="text-white ml-6 font-semibold"
                  >
                    <span className="text-sm">{child.mn_name}</span>
                  </button>
                  {activeUsers.includes(child) && renderChildMenu(child.child)}
                </div>
              ) : (
                <NavLink to={`${rute}${child.mn_link}`}>
                  <button
                    className={`text-white ml-6 ${child.mn_name}`}
                    id={child.mn_name}
                  >
                    <span className="text-sm">{child.mn_name}</span>
                  </button>
                </NavLink>
              )}
            </li>
          ))}
      </ul>
    );
  };

  const datalogout = {
    p_usr: userid,
  };

  const postJDataUserResetIsLogin = async () => {
    try {
      const failLogin = await axios.post(
        "http://116.206.196.65:30983/skycore/Login/postJDataUserResetIsLogin",
        JSON.stringify(datalogout),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      await navigate("/");
      // setTimeout(() => {
      //   // alert("Berhasil Reload");
      //   window.location.reload();
      // }, 900);
      // await window.location.reload();
      // window.location.href = "/";
    } catch (error) {
      alert("reset fail login gagal");
      console.log(error);
    }
  };

  const LogOut = () => {
    sessionStorage.clear();

    postJDataUserResetIsLogin();
    // localStorage.removeItem("detailRoleUser");
    // localStorage.removeItem("MenuList");

    // setTimeout(() => {
    //   navigate("/");
    // }, 1000);
  };

  const currentDate = new Date();
  const formattedDate = `${currentDate.toLocaleDateString("en-US", {
    weekday: "long",
  })}/${currentDate.getMonth() + 1}/${currentDate.getFullYear()}`;

  return (
    <div id="page-top">
      <div id="wrapper">
        {sidebarActive === true ? (
          <>
            <div className="side-bar">
              <div
                className="sidebar-brand d-flex align-items-center justify-content-center h-full"
                href="index.html"
              >
                <div className="sidebar-brand-icon rotate-n-15"></div>
                <div className="sidebar-brand-text mx-3 ">
                  <img src={Sky} alt="" className="logoSky w-44" />
                </div>
              </div>
              {}
              <ul className="navbar-nav bg-gradient-to-b from-cyan-500 to-blue-500 sidebar sidebar-dark h-full p-1">
                {filteredUsers.map((user) => (
                  <li className="mt-3" key={user.id}>
                    {user.child && user.child.length > 0 ? (
                      <>
                        <div className="Menu p-1">
                          <button
                            onClick={() => toggleDropdown(user)}
                            className="flex items-center text-white"
                            id={user.mn_name}
                          >
                            {" "}
                            <svg
                              fill="none"
                              viewBox="0 0 24 24"
                              height="1em"
                              width="1em"
                              {...props}
                            >
                              <path
                                fill="currentColor"
                                d="M4 4h4v4H4V4zM4 10h4v4H4v-4zM8 16H4v4h4v-4zM10 4h4v4h-4V4zM14 10h-4v4h4v-4zM10 16h4v4h-4v-4zM20 4h-4v4h4V4zM16 10h4v4h-4v-4zM20 16h-4v4h4v-4z"
                              />
                            </svg>
                            <span className="text-base font-semibold ml-2">
                              {user.mn_name}{" "}
                            </span>{" "}
                          </button>

                          {activeUsers.includes(user) &&
                            renderChildMenu(user.child)}
                        </div>
                      </>
                    ) : (
                      <div className="Dashboard p-1 hover:bg-gray-100 hover:p-1 rounded">
                        <NavLink to={"/dashboard" + user.mn_link}>
                          <button className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                            <span className="flex items-center p-1 text-white rounded-lg dark:text-white text-base font-semibold">
                              {" "}
                              <svg
                                viewBox="0 0 1024 1024"
                                fill="currentColor"
                                height="1em"
                                width="1em"
                                className="mr-2"
                              >
                                <path d="M924.8 385.6a446.7 446.7 0 00-96-142.4 446.7 446.7 0 00-142.4-96C631.1 123.8 572.5 112 512 112s-119.1 11.8-174.4 35.2a446.7 446.7 0 00-142.4 96 446.7 446.7 0 00-96 142.4C75.8 440.9 64 499.5 64 560c0 132.7 58.3 257.7 159.9 343.1l1.7 1.4c5.8 4.8 13.1 7.5 20.6 7.5h531.7c7.5 0 14.8-2.7 20.6-7.5l1.7-1.4C901.7 817.7 960 692.7 960 560c0-60.5-11.9-119.1-35.2-174.4zM482 232c0-4.4 3.6-8 8-8h44c4.4 0 8 3.6 8 8v80c0 4.4-3.6 8-8 8h-44c-4.4 0-8-3.6-8-8v-80zM270 582c0 4.4-3.6 8-8 8h-80c-4.4 0-8-3.6-8-8v-44c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v44zm90.7-204.5l-31.1 31.1a8.03 8.03 0 01-11.3 0L261.7 352a8.03 8.03 0 010-11.3l31.1-31.1c3.1-3.1 8.2-3.1 11.3 0l56.6 56.6c3.1 3.1 3.1 8.2 0 11.3zm291.1 83.6l-84.5 84.5c5 18.7.2 39.4-14.5 54.1a55.95 55.95 0 01-79.2 0 55.95 55.95 0 010-79.2 55.87 55.87 0 0154.1-14.5l84.5-84.5c3.1-3.1 8.2-3.1 11.3 0l28.3 28.3c3.1 3.1 3.1 8.1 0 11.3zm43-52.4l-31.1-31.1a8.03 8.03 0 010-11.3l56.6-56.6c3.1-3.1 8.2-3.1 11.3 0l31.1 31.1c3.1 3.1 3.1 8.2 0 11.3l-56.6 56.6a8.03 8.03 0 01-11.3 0zM846 582c0 4.4-3.6 8-8 8h-80c-4.4 0-8-3.6-8-8v-44c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v44z" />
                              </svg>
                              {user.mn_name}
                            </span>
                          </button>
                        </NavLink>
                      </div>
                    )}
                  </li>
                ))}
                <li>
                  <NavLink to={"/dashboard" + "/dynamicOption"}>
                    <button className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                      <span className="flex items-center p-1 text-white rounded-lg dark:text-white text-base font-semibold">
                        {" "}
                        <svg
                          viewBox="0 0 1024 1024"
                          fill="currentColor"
                          height="1em"
                          width="1em"
                          className="mr-2"
                        >
                          <path d="M924.8 385.6a446.7 446.7 0 00-96-142.4 446.7 446.7 0 00-142.4-96C631.1 123.8 572.5 112 512 112s-119.1 11.8-174.4 35.2a446.7 446.7 0 00-142.4 96 446.7 446.7 0 00-96 142.4C75.8 440.9 64 499.5 64 560c0 132.7 58.3 257.7 159.9 343.1l1.7 1.4c5.8 4.8 13.1 7.5 20.6 7.5h531.7c7.5 0 14.8-2.7 20.6-7.5l1.7-1.4C901.7 817.7 960 692.7 960 560c0-60.5-11.9-119.1-35.2-174.4zM482 232c0-4.4 3.6-8 8-8h44c4.4 0 8 3.6 8 8v80c0 4.4-3.6 8-8 8h-44c-4.4 0-8-3.6-8-8v-80zM270 582c0 4.4-3.6 8-8 8h-80c-4.4 0-8-3.6-8-8v-44c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v44zm90.7-204.5l-31.1 31.1a8.03 8.03 0 01-11.3 0L261.7 352a8.03 8.03 0 010-11.3l31.1-31.1c3.1-3.1 8.2-3.1 11.3 0l56.6 56.6c3.1 3.1 3.1 8.2 0 11.3zm291.1 83.6l-84.5 84.5c5 18.7.2 39.4-14.5 54.1a55.95 55.95 0 01-79.2 0 55.95 55.95 0 010-79.2 55.87 55.87 0 0154.1-14.5l84.5-84.5c3.1-3.1 8.2-3.1 11.3 0l28.3 28.3c3.1 3.1 3.1 8.1 0 11.3zm43-52.4l-31.1-31.1a8.03 8.03 0 010-11.3l56.6-56.6c3.1-3.1 8.2-3.1 11.3 0l31.1 31.1c3.1 3.1 3.1 8.2 0 11.3l-56.6 56.6a8.03 8.03 0 01-11.3 0zM846 582c0 4.4-3.6 8-8 8h-80c-4.4 0-8-3.6-8-8v-44c0-4.4 3.6-8 8-8h80c4.4 0 8 3.6 8 8v44z" />
                        </svg>
                        Dynamic Option
                      </span>
                    </button>
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        ) : (
          <></>
        )}

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-2 static-top shadow">
              <button
                className="btn mr-3 bg-gray-300"
                onClick={() => setActiveSideBAr(!sidebarActive)}
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

              <ul className="navbar-nav ml-auto">
                <li>
                  <div className="flex items-center p-1 text-gray rounded-lg dark:text-white ml-2">
                    <svg
                      viewBox="0 0 448 512"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                      className="mr-1"
                      {...props}
                    >
                      <path d="M224 256c70.7 0 128-57.3 128-128S294.7 0 224 0 96 57.3 96 128s57.3 128 128 128zm-45.7 48C79.8 304 0 383.8 0 482.3 0 498.7 13.3 512 29.7 512h388.6c16.4 0 29.7-13.3 29.7-29.7 0-98.5-79.8-178.3-178.3-178.3h-91.4z" />
                    </svg>
                    <span className="">{userid}</span>
                  </div>
                </li>
                <li>
                  <div className="flex items-center p-1 text-gray rounded-lg dark:text-white ml-2">
                    <svg
                      fill="currentColor"
                      viewBox="0 0 16 16"
                      height="1em"
                      width="1em"
                      className="mr-1"
                      {...props}
                    >
                      <path d="M4 .5a.5.5 0 00-1 0V1H2a2 2 0 00-2 2v1h16V3a2 2 0 00-2-2h-1V.5a.5.5 0 00-1 0V1H4V.5zm5.402 9.746c.625 0 1.184-.484 1.184-1.18 0-.832-.527-1.23-1.16-1.23-.586 0-1.168.387-1.168 1.21 0 .817.543 1.2 1.144 1.2z" />
                      <path d="M16 14V5H0v9a2 2 0 002 2h12a2 2 0 002-2zm-6.664-1.21c-1.11 0-1.656-.767-1.703-1.407h.683c.043.37.387.82 1.051.82.844 0 1.301-.848 1.305-2.164h-.027c-.153.414-.637.79-1.383.79-.852 0-1.676-.61-1.676-1.77 0-1.137.871-1.809 1.797-1.809 1.172 0 1.953.734 1.953 2.668 0 1.805-.742 2.871-2 2.871zm-2.89-5.435v5.332H5.77V8.079h-.012c-.29.156-.883.52-1.258.777V8.16a12.6 12.6 0 011.313-.805h.632z" />
                    </svg>
                    <span className="">{formattedDate}</span>
                  </div>
                </li>
                {/* <li>
                  <div className="flex items-center p-1 text-gray rounded-lg dark:text-white ml-2">
                    {" "}
                    <svg
                      viewBox="0 0 512 512"
                      fill="currentColor"
                      height="1em"
                      width="1em"
                      {...props}>
                      <path d="M256 48C141.13 48 48 141.13 48 256s93.13 208 208 208 208-93.13 208-208S370.87 48 256 48zm96 240h-96a16 16 0 01-16-16V128a16 16 0 0132 0v128h80a16 16 0 010 32z" />
                    </svg>
                    <span className="">{time.toLocaleTimeString()}</span>
                  </div>
                </li> */}
                <li className="nav-item dropdown no-arrow flex">
                  <div>
                    <button
                      onClick={LogOut}
                      className="flex items-center p-1 text-gray rounded-lg dark:text-white ml-2"
                    >
                      <svg
                        viewBox="0 0 900 1000"
                        fill="currentColor"
                        height="1em"
                        width="1em"
                        {...props}
                      >
                        <path d="M502 850V750h98v100c0 26.667-9.667 50-29 70s-43 30-71 30H100c-26.667 0-50-10-70-30S0 876.667 0 850V150c0-28 10-51.667 30-71s43.333-29 70-29h400c28 0 51.667 9.667 71 29s29 43 29 71v150h-98V150H100v700h402m398-326L702 720V600H252V450h450V330l198 194" />
                      </svg>
                      <span>Log Out</span>
                    </button>
                  </div>
                </li>
              </ul>
            </nav>
            <div className="main">
              <Routes>
                <Route path="/user" element={<Demo></Demo>}></Route>
                <Route path="/RoleManagement" element={<Rule></Rule>}></Route>
                <Route
                  path="/BatchSchedule"
                  element={<BatchScheduler></BatchScheduler>}
                ></Route>
                <Route
                  path="/BatchSchedule/Checker"
                  element={<BatchSchedulerCk></BatchSchedulerCk>}
                ></Route>
                <Route
                  path="/BatchSchedule/Approval"
                  element={<BatchSchedulerApp></BatchSchedulerApp>}
                ></Route>
                <Route path="/AuditTrail" element={<Audit></Audit>}></Route>
                <Route
                  path="/global"
                  element={<GeneralSettings></GeneralSettings>}
                ></Route>
                <Route
                  path="/Branch"
                  element={<BranchMenagement></BranchMenagement>}
                ></Route>
                <Route
                  path="/Apimanagement"
                  element={<Apimanagement></Apimanagement>}
                ></Route>
                <Route
                  path="/dynamicOption"
                  element={<DynamicOption></DynamicOption>}
                ></Route>
              </Routes>
            </div>
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
