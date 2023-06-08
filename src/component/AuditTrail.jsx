import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { format, parse } from "date-fns";
const AuditTrail = () => {
  const [users, setUsers] = useState([]);
  const [usersName, setUsersName] = useState([]);
  const [moduls, setModuls] = useState([]);
  const [modulsName, setModulsName] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState();
  const [currentUser, setCurrentUser] = useState(users);
  const [startDate, setStartDate] = useState(null);
  const [fromDate, setFromDate] = useState(null);
  const [toDate, setToDate] = useState(null);
  const [formattedFromDate, setFormattedFromDate] = useState(null);
  const [formattedToDate, setFormattedToDate] = useState(null);
  // const [tampung, setTampung] = useState(null);
  // Dapatkan data sesi
  const sessionData = JSON.parse(localStorage.getItem("tokenData"));
  // console.log(sessionData);
  const token = sessionData;
  console.log(users);

  useEffect(() => {
    if (token && token.map !== "") {
      getUserList();
      getListModul();
    }
  }, [token]);

  const getUserList = async () => {
    try {
      const listbranch = await axios.get(
        "http://116.206.196.65:30991/skyaudittrail/audit/list_name_user",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cekData = listbranch.data.data.map((e) => {
        return e;
      });

      setUsers(cekData);
    } catch (errorbranch) {
      alert(errorbranch);
    }
  };

  const getListModul = async () => {
    try {
      const listbranch = await axios.get(
        "http://116.206.196.65:30991/skyaudittrail/audit/list_modul",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cekData = listbranch.data.data.map((e) => {
        return e;
      });

      setModuls(cekData);
    } catch (errorbranch) {
      alert(errorbranch);
    }
  };

  useEffect(() => {
    if (fromDate !== null) {
      const formattedDate = format(fromDate, "yyyy-MM-dd");
      setFormattedFromDate(formattedDate);
    }
  }, [fromDate]);

  useEffect(() => {
    if (toDate !== null) {
      const formattedDate = format(toDate, "yyyy-MM-dd");
      setFormattedToDate(formattedDate);
    }
  }, [toDate]);

  const handleFromChange = (date) => {
    setFromDate(date);
  };

  const handleToChange = (date) => {
    setToDate(date);
  };

  // Menghitung indeks item pertama dan item terakhir
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Mengambil data yang sesuai dengan halaman saat ini dan term pencarian
  const filteredData = users.filter((item) =>
    item.p_username.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const currentItems = filteredData.slice(indexOfFirstItem, indexOfLastItem);

  // Menghitung jumlah total halaman
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  // Mengubah halaman saat tombol halaman diklik
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  // Mengubah jumlah item per halaman saat pilihan entri data berubah
  const handleEntriesChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1); // Mengatur halaman kembali ke halaman pertama
  };

  // Mengubah term pencarian saat input pencarian berubah
  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1); // Mengatur halaman kembali ke halaman pertama saat melakukan pencarian baru
  };

  const handleSearch = () => {
    // Logika pencarian atau tindakan lainnya setelah tombol "Search" ditekan
    console.log("Search button clicked");
    console.log("From Date:", formattedFromDate);
    console.log("To Date:", formattedToDate);
    console.log("Selected User:", usersName);
    console.log("Selected Modul:", modulsName);
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header justify-content-between mb-2">
        <div className="test">
          <h4>Audit Trail</h4>
        </div>
        <div className="flex">
          <div className="col-6 row mb-2">
            <div className="col-3">
              <label for="exampleInputEmail1" class="form-label">
                Log Users<span className="text-danger">*</span>
              </label>
            </div>
            <div className="col-9">
              <select
                type="text"
                className="form-control"
                selected={usersName}
                id="recipient-name"
                onChange={(e) => setUsersName(e.target.value)}
                required
              >
                {users.map((item, i) => {
                  return (
                    <option value={item.p_userid} key={i}>
                      {item.p_username}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
          <div className="col-6 row mb-2">
            <div className="col-3">
              <label for="exampleInputEmail1" class="form-label">
                Log Modul<span className="text-danger">*</span>
              </label>
            </div>
            <div className="col-9">
              <select
                type="text"
                className="form-control"
                selected={modulsName}
                id="recipient-name"
                onChange={(e) => setModulsName(e.target.value)}
              >
                {moduls.map((item, i) => {
                  return (
                    <option value={item.lgc_val} key={i}>
                      {item.lgc_name}
                    </option>
                  );
                })}
              </select>
            </div>
          </div>
        </div>
        <div className="flex">
          <div className="col-6 row mb-2">
            <div className="col-3">
              <label for="exampleInputEmail1" className="form-label">
                From<span className="text-danger">*</span>
              </label>
            </div>
            <div className="col-9">
              <DatePicker
                className="form-control"
                selected={fromDate}
                onChange={handleFromChange}
                dateFormat="yyyy/MM/dd"
              />
            </div>
          </div>
          <div className="col-6 row mb-2">
            <div className="col-3">
              <label for="exampleInputEmail1" className="form-label">
                To<span className="text-danger">*</span>
              </label>
            </div>
            <div className="col-9">
              <DatePicker
                className="form-control"
                selected={toDate}
                onChange={handleToChange}
                dateFormat="yyyy/MM/dd"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
          <div className="flex justify-end mb-3">
            <button className="btn btn-success btn-sm" onClick={handleSearch}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                className="w-6 h-6"
              >
                <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
              </svg>
            </button>
          </div>
          <div className="datatable-top mb-3 flex justify-content-between">
            <div className="page-item">
              <span>Show entries:</span>
              <select
                value={itemsPerPage}
                // onChange={handleEntriesChange}
                className="form-control"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={25}>25</option>
                <option value={50}>50</option>
              </select>
            </div>

            <div className="page-iittem">
              <input
                type="text"
                placeholder="Search by Name"
                value={searchTerm}
                // onChange={handleSearchChange}
                className="form-control"
              />
            </div>

            {/* <input type="number" /> */}
          </div>
          <div className="datatable-container">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Code</th>
                  <th className="py-3 px-6 text-left">User Id</th>
                  <th className="py-3 px-6 text-center">Action Date</th>
                  <th className="py-3 px-6 text-center">Client IP</th>
                  <th className="py-3 px-6 text-center">Server Name</th>
                  <th className="py-3 px-6 text-center">Activity</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              {/* <tbody className="text-gray-600 text-sm font-light border-b">
                {currentItems.map((user) => (
                  <tr
                    key={user.usrid}
                    className=" transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 white:hover:bg-neutral-600">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
                      {user.usruserid}
                    </td>
                    <td className="py-3 px-6 text-left  whitespace-nowrap font-semibold">
                      {user.usrname}
                    </td>
                    <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                      {user.usrnip}
                    </td>
                    <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                      {user.usraccesslevel}
                    </td>
                    <td className="py-3 px-6 text-center  whitespace-nowrap font-semibold ">
                      {user.usrstatusformat}
                    </td>
                    <td className="py-3 px-6 text-left  whitespace-nowrap ">
                      <button
                        className="btn btn-success btn-sm"
                        // onClick={() => editUser(user.usruserid)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6">
                          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                          <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                        </svg>
                      </button>
                      <button
                        className="btn btn-danger btn-sm ml-1"
                        // onClick={() => handleDeleteUser(user.usruserid)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6">
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </button>
                      {user.usrstatusformat !== "Active" ? (
                        <button
                          className="btn btn-warning btn-sm ml-1"
                          //   onClick={() => handleActiveUser(user.usruserid)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                        </button>
                      ) : (
                        <></>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody> */}
            </table>
            {/* Pagination */}
            <nav className="mt-2">
              <div className="pagination-item d-flex justify-content-between">
                <div className="page-1"></div>
                <div className="page-2">
                  <nav aria-label="Page navigation example">
                    <ul class="inline-flex -space-x-px">
                      <li>
                        <button
                          className="px-3 py-2 ml-0 leading-tight text-gray-500 bg-white border border-gray-300 rounded-l-lg hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                          onClick={() => handlePageChange(currentPage - 1)}
                          disabled={currentPage === 1}
                        >
                          Previous
                        </button>
                      </li>
                      <li>
                        {Array.from(
                          { length: totalPages },
                          (_, index) => index + 1
                        ).map((pageNumber) => (
                          <button
                            className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                            key={pageNumber}
                            onClick={() => handlePageChange(pageNumber)}
                            disabled={pageNumber === currentPage}
                          >
                            {pageNumber}
                          </button>
                        ))}
                      </li>
                      <li>
                        <button
                          className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}
                        >
                          Next
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuditTrail;
