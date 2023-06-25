import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { getToken } from "../../API/api";
import ModalEdit from "./ModalEditScheduler";
import ModalManual from "./ModalManualScheduler";
import ModalLog from "./ModalLogScheduler";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
  NavLink,
} from "react-router-dom";

const BatchScheduler = () => {
  const [bs, setScheduler] = useState([]);
  const [currentScheduler, setCurrentScheduler] = useState(bs);
  const userid = JSON.parse(localStorage.getItem("userid"));

  const navigate = useNavigate();
  //const [token, setToken] = useState();

  // hit token
  const sessionData = JSON.parse(localStorage.getItem("tokenData"));
  // console.log(sessionData);
  const token = sessionData;
  // Dapatkan data sesi

  // get userid
  //const userid = JSON.parse(localStorage.getItem("userid"));
  //console.log("test1233");
  //console.log(userid);
  //const userid = sessionUserid;
  // Dapatkan data sesi

  useEffect(() => {
    if (token && token.map !== "") {
      getSchedulerList();
    }
  }, [token]);

  const getSchedulerList = async () => {
    try {
      const listbs = await axios.get(
        "http://116.206.196.65:30999/skybatch/Batchscheduler/ListScheduler",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cekData = listbs.data.data.map((e) => {
        return e;
      });

      setScheduler(cekData);
    } catch (error) {
      // alert(error);
      postJDataUserResetIsLogin();
    }
  };

  const datalogout = {
    p_usr: userid,
  };

  const postJDataUserResetIsLogin = async () => {
    try {
      const failLogin = await axios.post(
        "http://116.206.196.65:30983/skycore/Login/postJDataUserResetIsLogin",
        JSON.stringify(datalogout),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // alert("failLogin Berhasil");
    } catch (error) {
      alert("reset fail login gagal");
      console.log(error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  // Menghitung indeks item pertama dan item terakhir
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Mengambil data yang sesuai dengan halaman saat ini dan term pencarian
  const filteredData = bs.filter((item) =>
    item.p_name.toLowerCase().includes(searchTerm.toLowerCase())
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

  //! Edit Scheduler
  //const [detaiSchedulerParam, setDetaiSchedulerParam] = useState("");
  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);
  const [isModalOpenManual, setIsModalOpenManual] = useState(false);
  const [isModalOpenLog, setIsModalOpenLog] = useState(false);
  const openModalEdit = () => {
    setIsModalOpenEdit(true);
  };

  const closeModalEdit = () => {
    setIsModalOpenEdit(false);

    // window.location.reload();
  };

  const openModalManual = () => {
    setIsModalOpenEdit(true);
  };

  const closeModalManual = () => {
    setIsModalOpenManual(false);
    // window.location.reload();
  };

  const openModalLog = () => {
    setIsModalOpenEdit(true);
  };

  const closeModalLog = () => {
    setIsModalOpenLog(false);
    // window.location.reload();
  };

  const editScheduler = (id) => {
    getSchedulerDetail(id);
    //setDetaiSchedulerParam(id);
    setIsModalOpenEdit(true);
  };

  const manualScheduler = (id) => {
    getSchedulerDetail(id);
    setIsModalOpenManual(true);
  };

  const logScheduler = (name) => {
    getSchedulerDetailLog(name);
    setIsModalOpenLog(true);
  };

  const [bsEdit, setSchedulerEdit] = useState();
  const [bsLog, setSchedulerLog] = useState();
  const [bsEditdetail, setSchedulerDetail] = useState();

  const getSchedulerDetail = async (val) => {
    try {
      const listbsDetail = await axios.post(
        "http://116.206.196.65:30999/skybatch/Batchscheduler/detail",
        {
          id: val,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("12443");
      // //console.log(cekData[0]);
      // console.log(listbsDetail.data.detail);
      setSchedulerEdit(listbsDetail.data.data);
      setSchedulerDetail(listbsDetail.data.detail);
    } catch (errorUser) {
      console.log(errorUser);
    }
  };

  const getSchedulerDetailLog = async (val) => {
    try {
      const listbsDetailLog = await axios.get(
        "http://116.206.196.65:30999/skybatch/Batchscheduler/Logs/" + val,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // console.log("12443");
      // //console.log(cekData[0]);
      // console.log(listbsDetail.data.detail);
      setSchedulerLog(listbsDetailLog.data.data);
    } catch (errorUser) {
      console.log(errorUser);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // useEffect(() => {
  //   getSchedulerDetail();
  // }, []);

  return (
    <div className="card shadow mb-4">
      <div className="card-header d-flex justify-content-between mb-2">
        <div className="test">
          <h4> Batch Schedule</h4>
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
                placeholder="Search by Job Name"
                value={searchTerm}
                onChange={handleSearchChange}
                className="form-control"
              />
            </div>

            {/* <input type="number" /> */}
          </div>
          <div className="datatable-container">
            <table className="min-w-max w-full table-bordered">
              <thead>
                <tr className=" bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-center">Job Category</th>
                  <th className="py-3 px-6 text-center">Job Name</th>
                  <th className="py-3 px-6 text-center">Schedule</th>
                  <th className="py-3 px-6 text-center">Last Run</th>
                  <th className="py-3 px-6 text-center">Last Status</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light border-b">
                {currentItems.map((bs) => (
                  <tr
                    key={bs.p_id}
                    className=" transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 white:hover:bg-neutral-600">
                    <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
                      {bs.p_category}
                    </td>
                    <td className="py-3 px-6 text-left  whitespace-nowrap font-semibold">
                      {bs.p_name}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
                      {bs.p_scheduler}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
                      {bs.p_last_run}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
                      {bs.p_status}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
                      {bs.p_approved_status}
                    </td>
                    <td className="py-3 px-6 text-center  whitespace-nowrap ">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => editScheduler(bs.p_id)}>
                        <svg
                          viewBox="0 0 1024 1024"
                          fill="currentColor"
                          height="1em"
                          width="1em">
                          <path d="M396 512a112 112 0 10224 0 112 112 0 10-224 0zm546.2-25.8C847.4 286.5 704.1 186 512 186c-192.2 0-335.4 100.5-430.2 300.3a60.3 60.3 0 000 51.5C176.6 737.5 319.9 838 512 838c192.2 0 335.4-100.5 430.2-300.3 7.7-16.2 7.7-35 0-51.5zM508 688c-97.2 0-176-78.8-176-176s78.8-176 176-176 176 78.8 176 176-78.8 176-176 176z" />
                        </svg>
                      </button>
                      <button
                        className="btn btn-warning btn-sm ml-1"
                        onClick={() => logScheduler(bs.p_name)}>
                        <svg
                          viewBox="0 0 1024 1024"
                          fill="currentColor"
                          height="1em"
                          width="1em">
                          <path d="M536.1 273H488c-4.4 0-8 3.6-8 8v275.3c0 2.6 1.2 5 3.3 6.5l165.3 120.7c3.6 2.6 8.6 1.9 11.2-1.7l28.6-39c2.7-3.7 1.9-8.7-1.7-11.2L544.1 528.5V281c0-4.4-3.6-8-8-8zm219.8 75.2l156.8 38.3c5 1.2 9.9-2.6 9.9-7.7l.8-161.5c0-6.7-7.7-10.5-12.9-6.3L752.9 334.1a8 8 0 003 14.1zm167.7 301.1l-56.7-19.5a8 8 0 00-10.1 4.8c-1.9 5.1-3.9 10.1-6 15.1-17.8 42.1-43.3 80-75.9 112.5a353 353 0 01-112.5 75.9 352.18 352.18 0 01-137.7 27.8c-47.8 0-94.1-9.3-137.7-27.8a353 353 0 01-112.5-75.9c-32.5-32.5-58-70.4-75.9-112.5A353.44 353.44 0 01171 512c0-47.8 9.3-94.2 27.8-137.8 17.8-42.1 43.3-80 75.9-112.5a353 353 0 01112.5-75.9C430.6 167.3 477 158 524.8 158s94.1 9.3 137.7 27.8A353 353 0 01775 261.7c10.2 10.3 19.8 21 28.6 32.3l59.8-46.8C784.7 146.6 662.2 81.9 524.6 82 285 82.1 92.6 276.7 95 516.4 97.4 751.9 288.9 942 524.8 942c185.5 0 343.5-117.6 403.7-282.3 1.5-4.2-.7-8.9-4.9-10.4z" />
                        </svg>
                      </button>
                      <button
                        className="btn btn-primary btn-sm ml-1"
                        onClick={() => manualScheduler(bs.p_id)}>
                        <svg
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          height="1em"
                          width="1em">
                          <path d="M20.5 15.1a1 1 0 00-1.34.45A8 8 0 1112 4a7.93 7.93 0 017.16 4.45 1 1 0 001.8-.9 10 10 0 100 8.9 1 1 0 00-.46-1.35zM21 11h-9.59l2.3-2.29a1 1 0 10-1.42-1.42l-4 4a1 1 0 00-.21.33 1 1 0 000 .76 1 1 0 00.21.33l4 4a1 1 0 001.42 0 1 1 0 000-1.42L11.41 13H21a1 1 0 000-2z" />
                        </svg>
                      </button>
                      <></>
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

      {bsEdit !== undefined ? (
        <ModalEdit
          isOpen={isModalOpenEdit}
          onClose={closeModalEdit}
          currentScheduler={bsEdit}
          currentSchedulerdetail={bsEditdetail}
          reload={getSchedulerList}
        />
      ) : (
        <></>
      )}

      {bsEdit !== undefined ? (
        <ModalManual
          isOpen={isModalOpenManual}
          onClose={closeModalManual}
          currentScheduler={bsEdit}
          reload={getSchedulerList}
        />
      ) : (
        <></>
      )}

      {bsLog !== undefined ? (
        <ModalLog
          isOpen={isModalOpenLog}
          onClose={closeModalLog}
          currenScheduler={bsLog}
          reload={getSchedulerList}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default BatchScheduler;
