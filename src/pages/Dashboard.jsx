import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import "../assets/css/sb-admin-2.css";
// import "../vendor/fontawesome-free/css/all.min.css";
import Sky from "../assets/images/Sky.png";
import Skysite from "../assets/images/LogoSky.png";
import "../assets/css/Dashboard.css";
import Demo from "../component/UserMenagement";
import Rule from "../component/RuleMenagement";
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

const Dashboard = ({ listmenu, levelmenu, user }) => {
  const [menuList, setMenuList] = useState(listmenu);
  const [menuLevel, setMenuLevel] = useState(levelmenu);
  const [menuList1, setMenuList1] = useState(listmenu);
  const [menuLevel1, setMenuLevel1] = useState(levelmenu);
  const [sideBarHide, setSideBarHide] = useState(true);
  const [userActive, setUserActive] = useState(user);
  const [token, setToken] = useState();
  const navigate = useNavigate();

  const [ruleMenagement, setruleMenagement] = useState(false);

  const getTokenApi = () => {
    getToken().then((e) => {
      setToken(e);
    });
  };

  useEffect(() => {
    getTokenApi();
  }, [menuList]);

  useEffect(() => {
    if (token !== "") {
      postJDataUserResetIsLogin();
    }
  }, []);

  useEffect(() => {
    if (menuList === undefined) {
      setMenuList(listMenu);
    }
    if (menuLevel === undefined) {
      setMenuLevel(levelMenu);
    }
    if (menuList1 === undefined) {
      setMenuList1(listMenu);
    }
    if (menuLevel1 === undefined) {
      setMenuLevel1(levelMenu);
    }
  }, [menuList, menuLevel, menuList1, menuLevel1]);

  // Dapatkan data sesi
  const sessionData = JSON.parse(localStorage.getItem("sessionData"));
  const listMenu = JSON.parse(localStorage.getItem("ListMenu"));
  const levelMenu = JSON.parse(localStorage.getItem("LevelMenu"));
  console.log(menuList);
  console.log(menuLevel);
  console.log(menuList1);
  console.log(menuLevel1);
  console.log(listMenu);
  console.log(levelMenu);

  const lvusr = menuLevel;
  const objParent = menuList;
  let html = "";
  html +=
    '<ul className="nav side-menu" style="padding-left:16px;color: white">';

  // for (let i = 0; i < objParent.data.data.length; i++) {
  //   for (let d = 0; d < lvusr.length; d++) {
  //     if (lvusr[d].ldlmdescription === objParent.data.data[i].mn_acl) {
  //       if (objParent.data.data[i].child.length > 0) {
  //         //bagian admin dan parameter
  //         html =
  //           html +
  //           `<li class="nav-item dropdown"><a class='dropdown-new'><i class="` +
  //           objParent.data.data[i].mn_icon +
  //           '"></i> ' +
  //           objParent.data.data[i].mn_name;
  //         html = html + ` <span class="fas fa-chevron-down"></span></a>`;
  //         html = html + `<ul class="nav-child" >`;

  //         for (var z = 0; z < objParent.data.data[i].child.length; z++) {
  //           for (var o = 0; o < lvusr.length; o++) {
  //             if (
  //               lvusr[o].ldlmdescription ===
  //               objParent.data.data[i].child[z].mn_acl
  //             ) {
  //               if (objParent.data.data[i].child[z].child.length > 0) {
  //                 html +=
  //                   `<li class='dropdown-item2' style = 'color:white'><a class='system-list' >` +
  //                   objParent.data.data[i].child[z].mn_name;
  //                 html += '<span class="fa fa-chevron-down"></span></a>';
  //                 html += '<ul class="nav child_menu2">';
  //                 for (
  //                   var u = 0;
  //                   u < objParent.data.data[i].child[z].child.length;
  //                   u++
  //                 ) {
  //                   for (var h = 0; h < lvusr.length; h++) {
  //                     if (
  //                       lvusr[h].ldlmdescription ===
  //                       objParent.data.data[i].child[z].child[u].mn_acl
  //                     ) {
  //                       html +=
  //                         '<li class="sub_menu"><a href="${local_server}' +
  //                         objParent.data.data[i].child[z].child[u].mn_link +
  //                         '">' +
  //                         objParent.data.data[i].child[z].child[u].mn_name +
  //                         "</a></li>";
  //                     }
  //                   }
  //                 }
  //                 html += "</ul>";
  //                 html += "</li>";
  //               } else {
  //                 html +=
  //                   '<li className="dropdown-item"><a href="${local_server}' +
  //                   objParent.data.data[i].child[z].mn_link +
  //                   '">' +
  //                   objParent.data.data[i].child[z].mn_name;
  //                 html += "</li>";
  //               }
  //             }
  //           }
  //         }
  //         html += "</ul>";
  //         html += "</li>";
  //       } else {
  //         html +=
  //           '<li class="nav-item"><a class="dropdown-new" href="${local_server}' +
  //           objParent.data.data[i].mn_link +
  //           `"><i class="` +
  //           objParent.data.data[i].mn_icon +
  //           `"></i>` +
  //           objParent.data.data[i].mn_name;
  //         html += "</li>";
  //       }
  //     }
  //   }
  // }
  // html += "</ul>";

  // const lvusr1 = menuLevel1;
  // const objParent1 = menuList1;
  // let html1 = "";
  // html1 +=
  //   '<ul className="nav side-menu" style="padding-left:16px;color: white">';

  // for (let a = 0; a < objParent1.data.data.length; a++) {
  //   for (let b = 0; b < lvusr1.length; b++) {
  //     if (lvusr1[b].ldlmdescription === objParent1.data.data[a].mn_acl) {
  //       if (objParent1.data.data[a].child.length > 0) {
  //         //bagian admin dan parameter
  //         html1 =
  //           html1 +
  //           `<li class="nav-item dropdown1"><a class='dropdown-new'><i class="` +
  //           "<RiAdminFill/>" +
  //           '"></i> ';
  //         // +
  //         // objParent1.data.data[a].mn_name;
  //         html1 = html1 + ` <span class="item"></span></a>`;
  //         html1 = html1 + `<ul class="nav-child1" >`;
  //         for (var y = 0; y < objParent1.data.data[a].child.length; y++) {
  //           for (var p = 0; p < lvusr1.length; p++) {
  //             if (
  //               lvusr1[p].ldlmdescription ===
  //               objParent1.data.data[a].child[y].mn_acl
  //             ) {
  //               if (objParent1.data.data[a].child[y].child.length > 0) {
  //                 html1 +=
  //                   `<li class='dropdown-item1' style = 'color:white'><a class='system-list' >` +
  //                   objParent1.data.data[a].child[y].mn_name;
  //                 html1 += '<span class="fa fa-chevron-down"></span></a>';
  //                 html1 += '<ul class="nav child_menu1">';
  //                 for (
  //                   var n = 0;
  //                   n < objParent1.data.data[a].child[y].child.length;
  //                   n++
  //                 ) {
  //                   for (var c = 0; c < lvusr1.length; c++) {
  //                     if (
  //                       lvusr1[c].ldlmdescription ===
  //                       objParent1.data.data[a].child[y].child[n].mn_acl
  //                     ) {
  //                       html1 +=
  //                         '<li class="sub_menu-site"><a href="${local_server}' +
  //                         objParent1.data.data[a].child[y].child[n].mn_link +
  //                         '">' +
  //                         objParent1.data.data[a].child[y].child[n].mn_name +
  //                         "</a></li>";
  //                     }
  //                   }
  //                 }
  //                 html1 += "</ul>";
  //                 html1 += "</li>";
  //               } else {
  //                 html1 +=
  //                   '<li className="dropdown-item"><a href="${local_server}' +
  //                   objParent1.data.data[a].child[y].mn_link +
  //                   '">' +
  //                   objParent1.data.data[a].child[y].mn_name;
  //                 html1 += "</li>";
  //               }
  //             }
  //           }
  //         }
  //         html1 += "</ul>";
  //         html1 += "</li>";
  //       } else {
  //         html1 +=
  //           '<li class="nav-item"><a class="dropdown-new" href="${local_server}' +
  //           objParent1.data.data[a].mn_link +
  //           `"><i class="` +
  //           objParent1.data.data[a].mn_icon +
  //           `"></i>`;
  //         //  +
  //         // objParent1.data.data[a].mn_name;
  //         html1 += "</li>";
  //       }
  //     }
  //   }
  // }
  // html1 += "</ul>";

  const data = {
    p_usr: userActive,
  };

  const postJDataUserResetIsLogin = async () => {
    try {
      const listDropdown = await axios.post(
        "http://116.206.196.65:30983/skycore/Login/postJDataUserResetIsLogin",
        JSON.stringify(data),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const cekData = listDropdown.data.data.map((e) => {
        return e;
      });
    } catch (error) {
      console.log(error);
    }
  };

  const dataLogUserTracking = {
    plcd: "ua",
    plusr: userActive,
    plhtt: "OFF",
    plsvrn: "uat-web-los",
    plact: "Login Success",
    plpgur: "/lmsadmin_ocbc/login/v6/nc",
    plqry: "-",
    plbro: "Firefox 72.0",
    plos: "linux",
    plcli: "uat-web-los/10.1.1.1",
  };

  const postDataLogUserTracking = async () => {
    try {
      await axios.post(
        "http://116.206.196.65:30983/skycore/LogActivity/postDataLogUserTracking",
        dataLogUserTracking,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      alert("postDataLogUserTracking Berhasil");
    } catch (error) {
      alert("postDataLogUserTracking Tidak Berhasil");
      console.log(error);
    }
  };

  const logOut = () => {
    postJDataUserResetIsLogin();
    postDataLogUserTracking();
    navigate("/");
  };

  const testing = () => {
    setruleMenagement(true);
  };
  return (
    <div id="page-top">
      <div id="wrapper">
        {sideBarHide === true ? (
          <div className="test-sidebar">
            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="index.html">
              <div className="sidebar-brand-icon rotate-n-15">
                {/* <i className="fas fa-laugh-wink"></i> */}
              </div>
              <div className="sidebar-brand-text mx-3 shadow">
                <img src={Sky} alt="" className="logoSky" />
              </div>

              {/* <button
                className="fa fa-bars"
                onClick={() => setSideBarHide(false)}></button> */}
            </a>
            <ul
              className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
              id="accordionSidebar">
              {/* <li
                className="nav-item"
                dangerouslySetInnerHTML={{ __html: html }}></li> */}
              <li className="py-2 px-4 hover:bg-gray-700">
                {" "}
                <a
                  class=" text-white-500 flex items-center justify-between py-1.5 px-4 rounded cursor-pointer"
                  onClick={() => setruleMenagement(false)}>
                  <span class="flex items-center space-x-2">
                    <span className="font-bold">User Management</span>
                  </span>
                </a>
              </li>

              <li className="py-2 px-4 hover:bg-gray-700">
                {" "}
                <a
                  className=" text-white-500 flex items-center justify-between py-1.5 px-4 rounded cursor-pointer"
                  onClick={() => setruleMenagement(true)}>
                  <span className="flex items-center space-x-2">
                    <span className="font-bold">Role Management</span>
                  </span>
                </a>
              </li>
            </ul>
          </div>
        ) : (
          <div className="test-sidebar-site">
            <a
              className="sidebar-brand d-flex align-items-center justify-content-center"
              href="index.html">
              <div className="sidebar-brand-icon rotate-n-15">
                {/* <i className="fas fa-laugh-wink"></i> */}
              </div>
              <div className="sidebar-brand-text mx-3 shadow">
                <img src={Skysite} alt="" className="logoSkySite" />
              </div>

              {/* <button
                className="fa fa-bars"
                onClick={() => setSideBarHide(true)}></button> */}
            </a>
            <ul
              className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion"
              id="accordionSidebar">
              {/* <li
                className="nav-item"
                dangerouslySetInnerHTML={{ __html: html1 }}></li> */}
            </ul>
          </div>
        )}

        <div id="content-wrapper" className="d-flex flex-column">
          <div id="content">
            <nav className="navbar navbar-expand navbar-light bg-white topbar mb-2 static-top shadow">
              {sideBarHide === true ? (
                <>
                  <button
                    className="btn mr-3"
                    onClick={() => setSideBarHide(false)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6">
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
                    onClick={() => setSideBarHide(true)}>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      className="w-6 h-6">
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
                      className="w-6 h-6">
                      <path
                        fill-rule="evenodd"
                        d="M7.5 3.75A1.5 1.5 0 006 5.25v13.5a1.5 1.5 0 001.5 1.5h6a1.5 1.5 0 001.5-1.5V15a.75.75 0 011.5 0v3.75a3 3 0 01-3 3h-6a3 3 0 01-3-3V5.25a3 3 0 013-3h6a3 3 0 013 3V9A.75.75 0 0115 9V5.25a1.5 1.5 0 00-1.5-1.5h-6zm10.72 4.72a.75.75 0 011.06 0l3 3a.75.75 0 010 1.06l-3 3a.75.75 0 11-1.06-1.06l1.72-1.72H9a.75.75 0 010-1.5h10.94l-1.72-1.72a.75.75 0 010-1.06z"
                        clip-rule="evenodd"
                      />
                    </svg>
                    <span>Log Out</span>
                  </a>
                </li>
              </ul>
            </nav>
            {/* <Demo /> */}

            {ruleMenagement === false ? <Demo /> : <Rule />}
          </div>

          <footer className="sticky-footer bg-white">
            <div className="container my-auto">
              <div className="copyright text-center my-auto">
                <span>Copyright &copy; Your Website 2023</span>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
