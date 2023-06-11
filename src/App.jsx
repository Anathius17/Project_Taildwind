import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";

// ! untuk testing

import BranchMenagement from "./component/branchmgmt/BranchManagement";

// ! untuk testing
import Demo from "./component/UserMenagement";
import Rule from "./component/RuleMenagement";
import Modal from "./component/Modal";
import BatchScheduler from "./component/system/BatchScheduler";

import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

function App() {
  const [admin, setAdmin] = useState("");

  const [dataRoleUserDetail, setDataRoleUserDetail] = useState([]);
  console.log(dataRoleUserDetail);
  const [menu, setMenu] = useState([]);
  console.log(menu);

  const handleDataFromChild = (data) => {
    setAdmin(data);
  };

  const [menuTest, setMenuTest] = useState();

  console.log(menuTest);
  const handleRoleDetail = (data) => {
    setDataRoleUserDetail(data);
  };
  const handleMenu = (data) => {
    setMenu(data);
  };

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
          mn_link: "user",
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
          mn_link: "RoleManagement",
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
              mn_link: "BatchSchedule",
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
          mn_link: "AuditTrail",
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
          mn_link: "global",
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
          mn_link: "Branch",
          mn_parentid: "3",
          mn_acl: "lvl_prm_brm",
          mn_order: "2",
          mn_icon: "",
          mn_breadcrumb: "Branch Management",
          child: [],
        },
        {
          id: "14",
          mn_name: "Api Management",
          mn_link: "/apimanagement",
          mn_parentid: "3",
          mn_acl: "lvl_prm_api",
          mn_order: "3",
          mn_icon: "",
          mn_breadcrumb: "Api Management",
          child: [],
        },
      ],
    },
    {
      id: "15",
      mn_name: "Decision Engine",
      mn_link: "",
      mn_parentid: "0",
      mn_acl: "lvl_prm_dec",
      mn_order: "4",
      mn_icon: "",
      mn_breadcrumb: "Decision Engine",
      child: [
        {
          id: "16",
          mn_name: "Master Data Management",
          mn_link: "/masterdata",
          mn_parentid: "15",
          mn_acl: "lvl_prm_dec_data",
          mn_order: "1",
          mn_icon: "",
          mn_breadcrumb: "Master Data Management",
          child: [],
        },
        {
          id: "17",
          mn_name: "Rule Management",
          mn_link: "/rule",
          mn_parentid: "15",
          mn_acl: "lvl_prm_dec_rule",
          mn_order: "2",
          mn_icon: "",
          mn_breadcrumb: "Rule Management",
          child: [],
        },
        {
          id: "18",
          mn_name: "Ruleset Management",
          mn_link: "/ruleset",
          mn_parentid: "15",
          mn_acl: "lvl_prm_dec_rulset",
          mn_order: "3",
          mn_icon: "",
          mn_breadcrumb: "Ruleset Management",
          child: [],
        },
        {
          id: "19",
          mn_name: "Scorecard Management",
          mn_link: "/rule",
          mn_parentid: "15",
          mn_acl: "lvl_prm_dec_score",
          mn_order: "4",
          mn_icon: "",
          mn_breadcrumb: "Scorecard Management",
          child: [],
        },
        {
          id: "20",
          mn_name: "Decision Tabel Management",
          mn_link: "/decisiontable",
          mn_parentid: "15",
          mn_acl: "lvl_prm_dec_tbl",
          mn_order: "5",
          mn_icon: "",
          mn_breadcrumb: "Decision Tabel Management",
          child: [],
        },
      ],
    },
    {
      id: "21",
      mn_name: "Flows Management",
      mn_link: "",
      mn_parentid: "0",
      mn_acl: "lvl_flw",
      mn_order: "5",
      mn_icon: "",
      mn_breadcrumb: "Flows Management",
      child: [
        {
          id: "22",
          mn_name: "Decision Flow",
          mn_link: "/decisionflow",
          mn_parentid: "21",
          mn_acl: "lvl_flw_dec",
          mn_order: "1",
          mn_icon: "",
          mn_breadcrumb: "Decision Flow",
          child: [],
        },
      ],
    },
    {
      id: "23",
      mn_name: "Report",
      mn_link: "",
      mn_parentid: "0",
      mn_acl: "lvl_rpt",
      mn_order: "6",
      mn_icon: "",
      mn_breadcrumb: "Report",
      child: [
        {
          id: "24",
          mn_name: "Decision Engine Report",
          mn_link: "/decisionenginereport",
          mn_parentid: "23",
          mn_acl: "lvl_rpt_decflow",
          mn_order: "1",
          mn_icon: "",
          mn_breadcrumb: "Decision Engine Report",
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
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={
            <Login
              onDataFromChild={handleDataFromChild}
              dataMenu={handleMenu}
              dataMenuLevel={handleRoleDetail}
            />
          }
        />
        <Route
          path="/dashboard/*"
          element={
            <Dashboard listmenu={users} levelmenu={menuLevel} />
          }
        />
        <Route path="*" element={<Navigate to="/dashboard/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
