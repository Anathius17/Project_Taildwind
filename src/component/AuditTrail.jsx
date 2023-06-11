import React, { useState, useEffect } from "react";
import axios from "axios";
import DatePicker from "react-datepicker";
import { format, parse } from "date-fns";
const AuditTrail = () => {
  const [users, setUsers] = useState([]);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [status, setStatus] = useState();
  const [currentUser, setCurrentUser] = useState(users);
  const [startDate, setStartDate] = useState(null);
  const [tampung, setTampung] = useState(null);
  // Dapatkan data sesi
  const sessionData = JSON.parse(localStorage.getItem("tokenData"));
  // console.log(sessionData);
  const token = sessionData;
  console.log(users);

  useEffect(() => {
    if (token !== "") {
      getUserList();
      console.log(1);
    }
  }, [token]);

  const getUserList = async () => {
    try {
      const listUser = await axios.get(
        "http://116.206.196.65:30998/skyaudittrail/audit/list_name_user",
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
      setUsers(cekData);
    } catch (errorUser) {
      alert(errorUser);
    }
  };

  useEffect(() => {
    if (startDate !== null) {
      const formattedDate = format(startDate, "yyyy-MM-dd");
      setTampung(formattedDate);
    }
  }, [startDate]);

  // Menghitung indeks item pertama dan item terakhir
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Mengambil data yang sesuai dengan halaman saat ini dan term pencarian
  const filteredData = users.filter((item) =>
    item.usrname.toLowerCase().includes(searchTerm.toLowerCase())
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
                id="recipient-name"
                // onChange={(e) => setBranchName(e.target.value)}
                required>
                {/* {branch.map((item, i) => {
                  return (
                    <option value={item.namevalue} key={i}>
                      {item.nameview}
                    </option>
                  );
                })} */}
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
                id="recipient-name"
                // onChange={(e) => setSupervisiorName(e.target.value)}
              >
                {/* {superVisior.map((item, i) => {
                  return (
                    <option value={item.namevalue} key={i}>
                      {item.nameview}
                    </option>
                  );
                })} */}
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
                selected={startDate}
                onChange={(date) => setStartDate(date)}
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
                selected={startDate}
                onChange={(date) => setStartDate(date)}
                dateFormat="yyyy/MM/dd"
              />
            </div>
          </div>
        </div>
      </div>
      <div className="card-body">
        <div className="datatable-wrapper datatable-loading no-footer sortable searchable fixed-columns">
          <div className="datatable-top mb-3 d-flex justify-content-between">
            <div className="page-item">
              <span>Show entries:</span>
              <select
                value={itemsPerPage}
                onChange={handleEntriesChange}
                className="form-control">
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
                onChange={handleSearchChange}
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
              <tbody className="text-gray-600 text-sm font-light border-b">
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
              </tbody>
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
                          disabled={currentPage === 1}>
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
                            disabled={pageNumber === currentPage}>
                            {pageNumber}
                          </button>
                        ))}
                      </li>
                      <li>
                        <button
                          className="px-3 py-2 leading-tight text-gray-500 bg-white border border-gray-300 hover:bg-gray-100 hover:text-gray-700 dark:bg-gray-800 dark:border-gray-700 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-white"
                          onClick={() => handlePageChange(currentPage + 1)}
                          disabled={currentPage === totalPages}>
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
