import { getToken } from "../API/api";
import React, { useState, useEffect } from "react";
import axios from "axios";
import ModalNewRole from "../component/ModalEditRole";

const RuleMenagement = () => {
  const [token, setToken] = useState("");
  const [list, setList] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getTokenApi = () => {
    getToken().then((e) => {
      setToken(e);
    });
  };

  useEffect(() => {
    getTokenApi();
  }, []);

  useEffect(() => {
    if (token !== "") {
      getList();
      console.log(1);
    }
  }, [token]);

  const getList = async () => {
    try {
      const listUser = await axios.get(
        "http://116.206.196.65:30983/skycore/role/list",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cekData = listUser.data.data.map((e) => {
        return e;
      });
      console.log(cekData);
      setList(cekData);
    } catch (errorUser) {
      alert(errorUser);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage, setUsersPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  // Mendapatkan index pengguna pada halaman saat ini
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = list.slice(indexOfFirstUser, indexOfLastUser);

  // Mengubah halaman
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Mengatur nilai pencarian
  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  // Filter pengguna berdasarkan kata kunci pencarian
  const filteredUsers = currentUsers.filter((user) =>
    user.rl_name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="card shadow mb-4">
      <div className="card-header d-flex justify-content-between mb-2">
        <div className="test">
          <h4> Role Management</h4>
        </div>
        <div className="btn-new">
          <button className="btn btn-primary" onClick={openModal}>
            Add new
          </button>
        </div>
      </div>
      <div className="card-body">
        <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
          <div className="datatable-top mb-3 d-flex justify-content-between">
            <div className="page-iittem"></div>
            <div className="page-iittem">
              <input
                type="text"
                placeholder="Search by Name"
                value={searchTerm}
                onChange={handleSearch}
                className="form-control"
              />
            </div>

            {/* <input type="number" /> */}
          </div>
          <div className="datatable-container">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-left">Description</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">User</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light border-b">
                {filteredUsers.map((user) => (
                  <tr
                    key={user.rl_id}
                    className=" transition duration-300 ease-in-out hover:bg-pink-100 dark:border-neutral-500 dark:hover:bg-neutral-600">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
                      {user.rl_name}
                    </td>
                    <td className="py-3 px-6 text-left  whitespace-nowrap font-semibold">
                      {user.rl_description}
                    </td>
                    {/* <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                    

                      {user.usrstatusformat !== "Active" ? (
                        <button className="btn btn-warning btn-sm ml-1">
                          Active
                        </button>
                      ) : (
                        <></>
                      )}
                    </td> */}

                    {user.rl_status === true ? (
                      <td className="py-3 px-6 text-center  whitespace-nowrap font-semibold">
                        Aktif
                      </td>
                    ) : (
                      <td className="py-3 px-6 text-center  whitespace-nowrap font-semibold">
                        Inactive
                      </td>
                    )}

                    <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                      {user.rl_created_by}
                    </td>

                    <td className="py-3 px-6 text-center  whitespace-nowrap ">
                      <button
                        className="btn btn-success btn-sm"
                        // onClick={() => editUser(user.usruserid)}
                      >
                        Edit
                      </button>
                      <button
                        className="btn btn-danger btn-sm ml-1"
                        // onClick={() => handleDeleteUser(user.usruserid)}
                      >
                        Hapus
                      </button>
                      {user.usrstatusformat === "Active" ? (
                        <button className="btn btn-warning btn-sm ml-1">
                          Active
                        </button>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            {/* Pagination */}
            <nav className="mt-2">
              <div className="pagination-item d-flex justify-content-between">
                <div className="page-1"></div>
                <div className="page-2">
                  {" "}
                  <ul className="pagination">
                    {list.map((user, index) => (
                      <li className="page-item" key={index}>
                        <button
                          className={`page-link ${
                            currentPage === index + 1 ? "active" : ""
                          }`}
                          onClick={() => paginate(index + 1)}>
                          {index + 1}
                        </button>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <ModalNewRole isOpen={isModalOpen} onClose={closeModal}>
        {" "}
      </ModalNewRole>
    </div>
  );
};

export default RuleMenagement;
