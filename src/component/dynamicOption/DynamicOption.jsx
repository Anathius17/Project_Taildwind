import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { getToken } from "../../API/api";
import Modal from "./ModalAddOption";
import ModalEdit from "./ModalHeaderAdd";
import axios from "axios";
import Swal from "sweetalert2";
import { browserName, osName, browserVersion } from "react-device-detect";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useNavigate,
  Link,
  NavLink,
} from "react-router-dom";

const DynamicOption = () => {
  const [dynamic, setDynamic] = useState([]);
  const [currentDynamic, setCurrentDynamic] = useState(dynamic);

  // hit token
  // const [token, setToken] = useState("");
  // const getTokenApi = () => {
  //   getToken().then((e) => {
  //     setToken(e);
  //   });
  // };
  // useEffect(() => {
  //   getTokenApi();
  // }, [token]);

  const sessionData = JSON.parse(localStorage.getItem("tokenData"));
  const token = sessionData;

  // end token

  // get userid
  const userid = JSON.parse(localStorage.getItem("userid"));
  const navigate = useNavigate();
  // const level = JSON.parse(localStorage.getItem("detailRoleUser"));

  useEffect(() => {
    if (token && token.map !== "") {
      getDynamicList();
    }
  }, [token]);

  const getDynamicList = async () => {
    try {
      const listdynamic = await axios.get(
        "http://116.206.196.65:30992/skyparameter/DynamicOption/list",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cekData = listdynamic.data.data.map((e) => {
        return e;
      });

      setDynamic(cekData);
    } catch (errordynamic) {
      //alert(errordynamic);
      postJDataUserResetIsLogin();
      navigate("/");
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

  // log activity object
  const ip = JSON.parse(localStorage.getItem("ipAddres"));

  //! --------for API delete--------
  const [deleteDynamicId, setDeleteDynamicId] = useState("");

  const dataLogUserTracking = {
    plcd: "",
    plusr: userid,
    plhtt: "OFF",
    plsvrn: window.location.hostname,
    plact: "Delete Dynamic Option",
    plpgur: window.location.href,
    plqry: "-",
    plbro: browserName + " " + browserVersion,
    plos: osName,
    plcli: ip,
  };

  const Updateobjectdata = (val) => {
    DeleteDynamic(val);
  };

  const handleDeletedynamic = (id) => {
    console.log(deleteDynamicId);
    Swal.fire({
      title: "Are you sure you want to delete this data?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        // postDataLogUserTracking();
        deleteDynamic(id);
        setDeleteDynamicId(id);
      } else {
        Swal.fire("Cancelled", "", "error");
      }
    });
  };

  const postDataLogUserTracking = async () => {
    let log = "";
    try {
      await axios
        .post(
          "http://116.206.196.65:30983/skycore/LogActivity/postDataLogUserTracking",
          dataLogUserTracking,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data.data[0].resultprocess);
          log = response.data.data[0].resultprocess;
        });

      await Updateobjectdata(log);
      // alert("postDataLogUserTracking Berhasil");
    } catch (error) {
      alert("postDataLogUserTracking Tidak Berhasil");
      console.log(error);
    }
  };

  const DeleteDynamic = async (val) => {
    try {
      const userDelete = await axios
        .post(
          "http://116.206.196.65:30992/skyparameter/DynamicOption/delete",
          {
            id: deleteDynamicId,
            user: userid,
            logid: val,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log(response.data.status);
          if (response.data.status === "true") {
            Swal.fire("Dynamic List Berhasil Di Hapus", "", "success");
            getDynamicList();
          } else {
            Swal.fire(response.data.message, "", "error");
            getDynamicList();
          }
        });
    } catch (error) {
      alert(error);
    }
  };
  //     console.log(userDelete);
  //     Swal.fire("Role Berhasil Di Hapus", "", "success");
  //
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    if (deleteDynamicId !== "") {
      postDataLogUserTracking();
    }
  }, [deleteDynamicId]);

  const deleteDynamic = (id) => {
    setDynamic(dynamic.filter((dyn) => dyn.ddh_id !== id));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  // Menghitung indeks item pertama dan item terakhir
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  // Mengambil data yang sesuai dengan halaman saat ini dan term pencarian
  const filteredData = dynamic.filter((item) =>
    item.ddh_code.toLowerCase().includes(searchTerm.toLowerCase())
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

  //! Detail dynamic header
  const [detailDynamicHeaderParam, setDetailDynamicHeaderParam] = useState("");

  useEffect(() => {
    getDynamicDetailHeader();
  }, [detailDynamicHeaderParam]);

  const editDynamic = (dynamicCode) => {
    setDetailDynamicHeaderParam(dynamicCode);
    setDetailDynamicParam(dynamicCode);
    setIsModalOpenEdit(true);
  };

  const [dynamicEditHeader, setDynamicEditHeader] = useState(undefined);

  const getDynamicDetailHeader = async () => {
    console.log("dynamicCode");
    console.log(detailDynamicHeaderParam);
    try {
      const listDynamicDetailHeader = await axios.get(
        "http://116.206.196.65:30992/skyparameter/DynamicOption/header/detail/" +
          detailDynamicHeaderParam,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cekData = listDynamicDetailHeader.data.data.map((e) => {
        console.log(e);
        return e;
      });

      //console.log(cekData[0]);
      console.log(listDynamicDetailHeader.data.status);
      setDynamicEditHeader(cekData[0]);
    } catch (errorUser) {
      console.log(errorUser);
    }
  };

  //! Detail dynamic detail
  const [detailDynamicParam, setDetailDynamicParam] = useState("");

  useEffect(() => {
    getDynamicDetail();
  }, [detailDynamicParam]);

  const [dynamicEdit, setDynamicEdit] = useState(undefined);

  const getDynamicDetail = async () => {
    console.log("dynamicCode");
    console.log(detailDynamicParam);
    try {
      const listDynamicDetail = await axios.get(
        "http://116.206.196.65:30992/skyparameter/DynamicOption/detail/" +
          detailDynamicParam,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cekData = listDynamicDetail.data.data.map((e) => {
        console.log(e);
        return e;
      });

      //console.log(cekData[0]);
      console.log(listDynamicDetail.data.status);
      setDynamicEdit(cekData[0]);
    } catch (errorUser) {
      console.log(errorUser);
    }
  };
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

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

  // useEffect(() => {
  //   getBranchDetail();
  // }, [detaiBranchParam]);

  return (
    <div className="card shadow mb-4">
      <div className="card-header d-flex justify-content-between mb-2">
        <div className="test">
          <h4>Dynamic Option</h4>
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
            <table className="min-w-max w-full table-bordered">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-center">Code</th>
                  <th className="py-3 px-6 text-center">Description</th>
                  <th className="py-3 px-6 text-center">Total Data</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light border-b">
                {currentItems.map((dyn) => (
                  <tr
                    key={dyn.ddh_id}
                    className=" transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 white:hover:bg-neutral-600"
                  >
                    <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
                      {dyn.ddh_code}
                    </td>
                    <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
                      {dyn.ddh_desc}
                    </td>
                    <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                      {dyn.count_ddp_code}
                    </td>
                    <td className="py-3 px-6 text-left  whitespace-nowrap ">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => editDynamic(dyn.ddh_code)}
                      >
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

                      <button
                        className="btn btn-danger btn-sm ml-1"
                        onClick={() => handleDeletedynamic(dyn.ddh_id)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M16.5 4.478v.227a48.816 48.816 0 013.878.512.75.75 0 11-.256 1.478l-.209-.035-1.005 13.07a3 3 0 01-2.991 2.77H8.084a3 3 0 01-2.991-2.77L4.087 6.66l-.209.035a.75.75 0 01-.256-1.478A48.567 48.567 0 017.5 4.705v-.227c0-1.564 1.213-2.9 2.816-2.951a52.662 52.662 0 013.369 0c1.603.051 2.815 1.387 2.815 2.951zm-6.136-1.452a51.196 51.196 0 013.273 0C14.39 3.05 15 3.684 15 4.478v.113a49.488 49.488 0 00-6 0v-.113c0-.794.609-1.428 1.364-1.452zm-.355 5.945a.75.75 0 10-1.5.058l.347 9a.75.75 0 101.499-.058l-.346-9zm5.48.058a.75.75 0 10-1.498-.058l-.347 9a.75.75 0 001.5.058l.345-9z"
                            clipRule="evenodd"
                          />
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

      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        reload={getDynamicList}
        currentDynamic={dynamicEditHeader}
      ></Modal>

      {dynamicEditHeader !== undefined ? (
        <ModalEdit
          isOpen={isModalOpenEdit}
          onClose={closeModalEdit}
          currentDynamic={dynamicEditHeader}
          laterDynamic={dynamicEdit}
          reload={getDynamicList}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default DynamicOption;
