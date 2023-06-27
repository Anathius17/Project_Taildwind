import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { getToken } from "../../API/api";
import ModalEdit from "./ModalEditSchedulerApproval";
import axios from "axios";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
  NavLink,
} from "react-router-dom";

const BatchSchedulerApproval = () => {
  const [bs, setSchedulerApproval] = useState([]);
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
      getSchedulerApprovalList();
    }
  }, [token]);

  const getSchedulerApprovalList = async () => {
    try {
      const listbs = await axios.get(
        "http://116.206.196.65:30999/skybatch/Batchscheduler/list/approval/approved",
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

      setSchedulerApproval(cekData);
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

  const editSchedulerApproval = (id) => {
    getSchedulerDetailApproval(id);
    //setDetaiSchedulerParam(id);
    setIsModalOpenEdit(true);
  };

  const [bsEdit, setSchedulerEdit] = useState();
  const [bsEditdetail, setSchedulerDetail] = useState();

  const getSchedulerDetailApproval = async (val) => {
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
          <h4> Batch Schedule Approval</h4>
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
                        className="text-white bg-blue-400 btn-sm ml-1 m-0 rounded"
                        onClick={() => editSchedulerApproval(bs.p_id)}>
                        <svg
                          viewBox="0 0 512 512"
                          fill="currentColor"
                          height="1em"
                          width="1em">
                          <path d="M313.4 32.9c26 5.2 42.9 30.5 37.7 56.5l-2.3 11.4c-5.3 26.7-15.1 52.1-28.8 75.2h144c26.5 0 48 21.5 48 48 0 25.3-19.5 46-44.3 47.9 7.7 8.5 12.3 19.8 12.3 32.1 0 23.4-16.8 42.9-38.9 47.1 4.4 7.2 6.9 15.8 6.9 24.9 0 21.3-13.9 39.4-33.1 45.6.7 3.3 1.1 6.8 1.1 10.4 0 26.5-21.5 48-48 48h-73.5c-19 0-37.5-5.6-53.3-16.1l-38.5-25.7C176 420.4 160 390.4 160 358.3V247.1c0-29.2 13.3-56.7 36-75l7.4-5.9c26.5-21.2 44.6-51 51.2-84.2l2.3-11.4c5.2-26 30.5-42.9 56.5-37.7zM32 192h64c17.7 0 32 14.3 32 32v224c0 17.7-14.3 32-32 32H32c-17.7 0-32-14.3-32-32V224c0-17.7 14.3-32 32-32z" />
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
          reload={getSchedulerApprovalList}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default BatchSchedulerApproval;
