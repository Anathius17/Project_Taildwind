import React, { useState, useEffect } from "react";
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
    child: [
      {
        id: "4",
        mn_name: "User Management",
        mn_link: "/user",
        mn_parentid: "2",
        mn_acl: "lvl_adm_mgt",
        mn_order: "1",
        mn_icon: "",
        mn_breadcrumb: "User Management",
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
        mn_acl: "lvl_prm_brm",
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
  {
    usruserid: "crm_admin",
    usrname: "crm_admin",
    usrnip: "crm_admin",
    usraccesslevel: "1",
    usrbranch: "BC001",
    usrstatus: 1,
    ldlmdescription: "lvl_sys_bch_sch_chk",
    modules: "CORE",
  },
  {
    usruserid: "crm_admin",
    usrname: "crm_admin",
    usrnip: "crm_admin",
    usraccesslevel: "1",
    usrbranch: "BC001",
    usrstatus: 1,
    ldlmdescription: "lvl_sys_bch_sch_apr",
    modules: "CORE",
  },
  {
    usruserid: "crm_admin",
    usrname: "crm_admin",
    usrnip: "crm_admin",
    usraccesslevel: "1",
    usrbranch: "BC001",
    usrstatus: 1,
    ldlmdescription: "lvl_adm_mgt_read",
    modules: "CORE",
  },
  {
    usruserid: "crm_admin",
    usrname: "crm_admin",
    usrnip: "crm_admin",
    usraccesslevel: "1",
    usrbranch: "BC001",
    usrstatus: 1,
    ldlmdescription: "lvl_adm_mgt_add",
    modules: "CORE",
  },
  {
    usruserid: "crm_admin",
    usrname: "crm_admin",
    usrnip: "crm_admin",
    usraccesslevel: "1",
    usrbranch: "BC001",
    usrstatus: 1,
    ldlmdescription: "lvl_adm_mgt_edit",
    modules: "CORE",
  },
  {
    usruserid: "crm_admin",
    usrname: "crm_admin",
    usrnip: "crm_admin",
    usraccesslevel: "1",
    usrbranch: "BC001",
    usrstatus: 1,
    ldlmdescription: "lvl_adm_mgt_del",
    modules: "CORE",
  },
  {
    usruserid: "crm_admin",
    usrname: "crm_admin",
    usrnip: "crm_admin",
    usraccesslevel: "1",
    usrbranch: "BC001",
    usrstatus: 1,
    ldlmdescription: "lvl_adm_mgt_act",
    modules: "CORE",
  },
  {
    usruserid: "crm_admin",
    usrname: "crm_admin",
    usrnip: "crm_admin",
    usraccesslevel: "1",
    usrbranch: "BC001",
    usrstatus: 1,
    ldlmdescription: "lvl_prm_brm_add",
    modules: "CORE",
  },
  {
    usruserid: "crm_admin",
    usrname: "crm_admin",
    usrnip: "crm_admin",
    usraccesslevel: "1",
    usrbranch: "BC001",
    usrstatus: 1,
    ldlmdescription: "lvl_prm_brm_edit",
    modules: "CORE",
  },
  {
    usruserid: "crm_admin",
    usrname: "crm_admin",
    usrnip: "crm_admin",
    usraccesslevel: "1",
    usrbranch: "BC001",
    usrstatus: 1,
    ldlmdescription: "lvl_prm_brm_del",
    modules: "CORE",
  },
];

const dataMenu = localStorage.getItem("MenuList");
const parsedData = JSON.parse(dataMenu);
const dataMenuLevel = localStorage.getItem("detailRoleUser");
const parsedDataLevel = JSON.parse(dataMenuLevel);

const DashboardMenuSide = (props) => {
  const menuTest = props.listmenu;
  const levelm = props.levelmenu;

  const filteredUsers = parsedData.filter((user) => {
    const matchingMenuLevel = parsedDataLevel.find(
      (menu) => menu.ldlmdescription === user.mn_acl
    );
    return matchingMenuLevel !== undefined;
  });

  const [activeUsers, setActiveUsers] = useState([]);
  const toggleDropdown = (user) => {
    if (activeUsers.includes(user)) {
      setActiveUsers(activeUsers.filter((activeUser) => activeUser !== user));
    } else {
      setActiveUsers([...activeUsers, user]);
    }
  };

  const rute = "/dashboard";
  const renderChildMenu = (children) => {
    return (
      <ul className="dropdown-menu1">
        {children
          .filter((child) => {
            const level = parsedDataLevel.find(
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
                    className="text-white ml-3">
                    <span className="text-sm">{child.mn_name}</span>
                  </button>
                  {activeUsers.includes(child) && renderChildMenu(child.child)}
                </div>
              ) : (
                <NavLink to={`${rute}${child.mn_link}`}>
                  <button
                    className="text-white ml-3"
                    // onClick={() => setclickButton(child.mn_link)}
                    id={child.mn_name}>
                    <span className="text-sm">{child.mn_name}</span>
                  </button>
                </NavLink>
              )}
            </li>
          ))}
      </ul>
    );
  };

  // <a href={child.mn_link}>{child.mn_name}</a>;
  return (
    // <div className="side-menu">
    //   <ul className="menu-items">
    //     {filteredUsers.map((user) => (
    //       <li key={user.id}>
    //         {user.child && user.child.length > 0 ? (
    //           <div>
    //             <button onClick={() => toggleDropdown(user)}>
    //               {user.mn_name}
    //             </button>
    //             {activeUsers.includes(user) && renderChildMenu(user.child)}
    //           </div>
    //         ) : (
    //           <span>{user.mn_name}</span>
    //         )}
    //       </li>
    //     ))}
    //   </ul>
    // </div>
    <>
      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0 "
        aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-800 dark:bg-gray-800">
          <ul className="navbar-nav ">
            {filteredUsers.map((user) => (
              <li className="ml-2 mt-3" key={user.id}>
                {user.child && user.child.length > 0 ? (
                  <>
                    <div className="hover:bg-gray-100 dark:hover:bg-gray-700">
                      <button
                        onClick={() => toggleDropdown(user)}
                        className="flex items-center p-1 text-white rounded-lg dark:text-white "
                        id={user.mn_name}>
                        <span className="text-base font-semibold ml-2">
                          {user.mn_name}
                        </span>
                      </button>
                      {activeUsers.includes(user) &&
                        renderChildMenu(user.child)}
                    </div>
                  </>
                ) : (
                  <div>
                    <NavLink to={"/dashboard" + user.mn_link}>
                      <button className="hover:bg-gray-100 dark:hover:bg-gray-700 rounded">
                        <span className="flex items-center p-1 text-white rounded-lg dark:text-white text-base font-semibold ml-2 ">
                          {" "}
                          <svg
                            viewBox="0 0 1024 1024"
                            fill="currentColor"
                            height="1em"
                            width="1em"
                            className="mr-2">
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
          </ul>
        </div>
      </aside>
    </>
  );
};

export default DashboardMenuSide;

// DashboardMenuSide;
