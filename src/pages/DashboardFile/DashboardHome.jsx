import React from "react";
import Navbar from "./DashboardNavbar";
import SideMenu from "./DashboardMenuSide";
// import Content from "./Content";
// import ContextDemo from "./ContextDemo";
import { Routes, Route } from "react-router-dom";

const DasboardHome = () => {
  return (
    <div className="bg-blue-gray-50/50">
      <SideMenu />
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
