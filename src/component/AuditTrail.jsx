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
  const [listbranch, setListbranch] = useState([]);

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

  // const getListLog = async () => {
  //   try {
  //     const listbranch = await axios.post(
  //       "http://116.206.196.65:30991/skyaudittrail/audit/list_log",
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     const cekData = listbranch.data.data.map((e) => {
  //       return e;
  //     });

  //     return cekData; // Mengembalikan nilai listbranch
  //   } catch (errorbranch) {
  //     alert(errorbranch);
  //   }
  // };

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

  const handleSearch = async () => {
    console.log("Search button clicked");
    console.log("From Date:", formattedFromDate);
    console.log("To Date:", formattedToDate);
    console.log("Selected User:", usersName);
    console.log("Selected Modul:", modulsName);

    try {
      const params = {
        user: {
          val_users: usersName,
        },
        modul: {
          val_code: modulsName,
        },
        fromDate: {
          val_form: formattedFromDate,
        },
        toDate: {
          val_to: formattedToDate,
        },
      };

      const response = await axios.post(
        "http://116.206.196.65:30991/skyaudittrail/audit/list_log",
        params,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const listbranch = response.data.data.map((e) => {
        return e;
      });

      setListbranch(listbranch);
    } catch (error) {
      alert(error);
    }
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
                value={usersName} // Use value instead of selected
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
                value={modulsName} // Use value instead of selected
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
              <tbody className="text-gray-600 text-sm font-light border-b">
                {listbranch.length > 0 ? (
                  listbranch.map((modul) => (
                    <tr
                      key={modul.b_log_id}
                      className="transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 white:hover:bg-neutral-600"
                    >
                      <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
                        {modul.b_code}
                      </td>
                      <td className="py-3 px-6 text-left  whitespace-nowrap font-semibold">
                        {modul.b_log_userid}
                      </td>
                      <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                        {modul.b_log_action_date}
                      </td>
                      <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                        {modul.b_log_https}
                      </td>
                      <td className="py-3 px-6 text-center  whitespace-nowrap font-semibold">
                        {modul.b_log_server_name}
                      </td>
                      <td className="py-3 px-6 text-center  whitespace-nowrap font-semibold">
                        {modul.b_log_activity}
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="6" className="py-3 px-6 text-center">
                      No data available
                    </td>
                  </tr>
                )}
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
