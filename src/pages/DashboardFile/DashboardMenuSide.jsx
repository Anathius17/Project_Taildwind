import React, { useState, useEffect } from "react";

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

const DashboardMenuSide = () => {
  const filteredUsers = users.filter((user) => {
    const matchingMenuLevel = menuLevel.find(
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

  const renderChildMenu = (children) => {
    return (
      <ul className="dropdown-menu">
        {children
          .filter((child) => {
            const level = menuLevel.find(
              (menu) => menu.ldlmdescription === child.mn_acl
            );
            return level;
          })
          .map((child) => (
            <li key={child.id} className="cabang p-0">
              {child.child && child.child.length > 0 ? (
                <div>
                  <button className="btn" onClick={() => toggleDropdown(child)}>
                    {child.mn_name}
                  </button>
                  {activeUsers.includes(child) && renderChildMenu(child.child)}
                </div>
              ) : (
                <a href={child.mn_link}>{child.mn_name}</a>
              )}
            </li>
          ))}
      </ul>
    );
  };

  return (
    <div className="side-menu">
      <ul className="menu-items">
        {filteredUsers.map((user) => (
          <li key={user.id}>
            {user.child && user.child.length > 0 ? (
              <div>
                <button onClick={() => toggleDropdown(user)}>
                  {user.mn_name}
                </button>
                {activeUsers.includes(user) && renderChildMenu(user.child)}
              </div>
            ) : (
              <span>{user.mn_name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DashboardMenuSide;

// DashboardMenuSide;
