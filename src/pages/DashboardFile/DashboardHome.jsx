import React from "react";
import Navbar from "./DashboardNavbar";
import SideMenu from "./DashboardMenuSide";
import UserMenagement from "../../component/usermanagement/UserMenagement";
import BatchScheduler from "../../component/branchmgmt/BranchManagement";
// import Content from "./Content";
// import ContextDemo from "./ContextDemo";
import { Routes, Route } from "react-router-dom";

const DasboardHome = () => {
  return (
    <div className="min-h-screen bg-white">
      <SideMenu />
      <div className="p-2 xl:ml-72 sm:ml-72">
        <Navbar />
      </div>
      <div className=" px-0 pt-0 pb-2 p-2 xl:ml-72">
        <Routes>
          <Route exact path={"/user"} element={<UserMenagement />}></Route>
          <Route
            exact
            path={"/BatchSchedule"}
            element={<BatchScheduler />}></Route>
        </Routes>
      </div>
      {/* <div className="p-2 xl:ml-72">
        <Navbar />
      </div>
      <div className=" px-0 pt-0 pb-2 p-2 xl:ml-72">
        <Routes>
          <Route exact path={"/Demo"} element={<Content />}></Route>
          <Route e path={"/Demo2"} element={<ContextDemo />}></Route>
        </Routes>
      </div> */}
    </div>
  );
};

export default DasboardHome;
