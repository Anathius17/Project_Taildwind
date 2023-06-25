import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { getToken } from "../../API/api";
import ModalEdit from "./ModalEditSchedulerChecker";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
  NavLink,
} from "react-router-dom";

import axios from "axios";

const BatchSchedulerChecker = () => {
  const [bs, setSchedulerChecker] = useState([]);
  const userid = JSON.parse(localStorage.getItem("userid"));

  const navigate = useNavigate();

  //const [token, setToken] = useState();

  // hit token
  const sessionData = JSON.parse(localStorage.getItem("tokenData"));
  // console.log(sessionData);
  const token = sessionData;
  // Dapatkan data sesi

  useEffect(() => {
    if (token && token.map !== "") {
      getSchedulerCheckerList();
    }
  }, [token]);

  const getSchedulerCheckerList = async () => {
    try {
      const listbs = await axios.get(
        "http://116.206.196.65:30999/skybatch/Batchscheduler/list/approval/checked",
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

      setSchedulerChecker(cekData);
    } catch (error) {
      //alert(error);
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

  const openModalEdit = () => {
    setIsModalOpenEdit(true);
  };

  const closeModalEdit = () => {
    setIsModalOpenEdit(false);
    // window.location.reload();
  };

  const editSchedulerChecker = (id) => {
    getSchedulerDetailChecker(id);
    //setDetaiSchedulerParam(id);
    setIsModalOpenEdit(true);
  };

  const [bsEdit, setSchedulerEdit] = useState();
  const [bsEditdetail, setSchedulerDetail] = useState();

  const getSchedulerDetailChecker = async (val) => {
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header d-flex justify-content-between mb-2">
        <div className="test">
          <h4> Batch Schedule Checker</h4>
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
            <table className="min-w-max w-full  table-bordered">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
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
                        onClick={() => editSchedulerChecker(bs.p_id)}>
                        Checked
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
          reload={getSchedulerCheckerList}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default BatchSchedulerChecker;
