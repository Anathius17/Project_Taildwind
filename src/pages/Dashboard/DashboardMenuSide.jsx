import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";

export default function DashboardSideMenu(props) {
  const menuTest = props.listmenu;
  const levelm = props.levelmenu;

  const filteredUsers = menuTest.filter((user) => {
    const matchingMenuLevel = levelm.find(
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
            const level = levelm.find(
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
    <div>
      <aside
        id="sidebar-multi-level-sidebar"
        className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0"
        aria-label="Sidebar">
        <div className="h-full px-3 py-4 overflow-y-auto bg-gray-50 dark:bg-gray-800">
          <ul className="navbar-nav bg-gradient-primary sidebar sidebar-dark accordion ">
            {filteredUsers.map((user) => (
              <li className="ml-10" key={user.id}>
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
      </aside>
    </div>
  );
}
