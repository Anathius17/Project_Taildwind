import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { getToken } from "../../API/api";
import ModalEdit from "./ModalEditGeneral";
import axios from "axios";

const GeneralSetting = () => {
  const [general, setGeneral] = useState([]);
  const [currentGeneral, setCurrentGeneral] = useState(general);
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
      getGeneralList();
    }
  }, [token]);

  const getGeneralList = async () => {
    try {
      const listgeneral = await axios.get(
        "http://116.206.196.65:30983/skycore/Global/config/list",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cekData = listgeneral.data.data.map((e) => {
        return e;
      });

      setGeneral(cekData);
    } catch (error) {
      alert(error);
    }
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  // Menghitung indeks item pertama dan item terakhir
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Mengambil data yang sesuai dengan halaman saat ini dan term pencarian
  const filteredData = general.filter((item) =>
    item.glc_name.toLowerCase().includes(searchTerm.toLowerCase())
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

  //! Edit General
  const [detaiGeneralParam, setDetaiGeneralParam] = useState("");

  const editGeneral = (generalcode) => {
    setDetaiGeneralParam(generalcode);
    setIsModalOpenEdit(true);
  };

  const [generalEdit, setGeneralEdit] = useState();

  const getGeneralDetail = async () => {
    console.log(detaiGeneralParam);
    try {
      const listGeneralDetail = await axios.get(
        "http://16.206.196.65:30983/skycore/Global/config/detail/" +
          detaiGeneralParam,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cekData = listGeneralDetail.data.data.map((e) => {
        console.log(e);
        return e;
      });

      //console.log(cekData[0]);
      console.log(listGeneralDetail.data.status);
      setGeneralEdit(cekData[0]);
    } catch (errorUser) {
      console.log(errorUser);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

  const openModalEdit = () => {
    setIsModalOpenEdit(true);
  };

  const closeModalEdit = () => {
    setIsModalOpenEdit(false);
    // window.location.reload();
  };

  useEffect(() => {
    getGeneralDetail();
  }, [detaiGeneralParam]);

  return (
    <div className="card shadow mb-4">
      <div className="card-header d-flex justify-content-between mb-2">
        <div className="test">
          <h4> General Setting</h4>
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
                onChange={handleSearchChange}
                className="form-control"
              />
            </div>

            {/* <input type="number" /> */}
          </div>
          <div className="datatable-container">
            <table className="min-w-max w-full ">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-center">Code</th>
                  <th className="py-3 px-6 text-center">Name</th>
                  <th className="py-3 px-6 text-center">Description</th>
                  <th className="py-3 px-6 text-center">Value</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light border-b">
                {currentItems.map((glc) => (
                  <tr
                    key={glc.glc_code}
                    className=" transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 white:hover:bg-neutral-600"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
                      {glc.glc_code}
                    </td>
                    <td className="py-3 px-6 text-left  whitespace-nowrap font-semibold">
                      {glc.glc_name}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
                      {glc.glc_desc}
                    </td>
                    <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                      {glc.glc_value}
                    </td>
                    <td className="py-3 px-6 text-center  whitespace-nowrap ">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => editGeneral(glc.glc_code)}
                      >
                        detail
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

      {generalEdit !== undefined ? (
        <ModalEdit
          isOpen={isModalOpenEdit}
          onClose={closeModalEdit}
          currentGeneral={generalEdit}
          reload={getGeneralList}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default GeneralSetting;
