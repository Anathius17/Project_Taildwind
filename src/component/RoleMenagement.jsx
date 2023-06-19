import React, { useState, useEffect } from "react";
import axios from "axios";
// import ModalEdit from "./ModalEditRole";
import ModalAdd from "./ModalAddRole";
import Swal from "sweetalert2";

const RoleMenagement = () => {
  const [role, setRole] = useState([]);
  const [currentRole, setcurrentRole] = useState(role);
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
      getRoleList();
    }
  }, [token]);

  const getRoleList = async () => {
    try {
      const listrole = await axios.get(
        "http://116.206.196.65:30983/skycore/role/list",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cekData = listrole.data.data.map((e) => {
        return e;
      });

      setRole(cekData);
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
  const filteredData = role.filter((item) =>
    item.rl_name.toLowerCase().includes(searchTerm.toLowerCase())
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

  //! Edit Role
  const [detaiRoleParam, setDetaiRoleParam] = useState("");

  const editRole = (id) => {
    setDetaiRoleParam(id);
    setIsModalOpenEdit(true);
  };

  const [roleEdit, setRoleEdit] = useState();

  const getRoleDetail = async () => {
    console.log(detaiRoleParam);
    try {
      const listRoleDetail = await axios.post(
        "http://116.206.196.65:30983/skycore/role/detail",
        {
          role_id: "1",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cekData = listRoleDetail.data.data.map((e) => {
        console.log(e);
        return e;
      });

      //console.log(cekData[0]);
      console.log(listRoleDetail.data.status);
      setRoleEdit(cekData[0]);
    } catch (errorUser) {
      console.log(errorUser);
    }
  };

  // ? Menghapus pengguna
  const [id, setDeleteRole] = useState("");

  const handleDeleteRole = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this data?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      if (result.isConfirmed) {
        //postDataLogUserTracking();
        DeleteRole(id);
        setDeleteRole(id);
      } else Swal.fire(" Cancelled", "", "error");
    });
  };

  // useEffect(() => {
  //   if (id !== "") {
  //     DeleteRole();
  //   }
  // }, [id]);

  const DeleteRole = async () => {
    try {
      const userDelete = await axios.post(
        "http://116.206.196.65:30983/skycore/role/delete",
        {
          role_id: "",
          role_detail_id: "",
          action_by: "",
          log_id: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire("Role Berhasil Di Hapus", "", "success");
      getRoleList();
    } catch (error) {
      alert(error);
    }
  };

  // action isactive
  const [idActive, setRoleActive] = useState("");

  const handleActiveRole = (id) => {
    setRoleActive(id);
    Active();
  };

  const Active = async () => {
    try {
      await axios.post(
        "http://116.206.196.65:30983/skycore/role/activate",
        {
          role_id: "",
          role_status: "",
          action_by: "",
          log_id: "",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire("User Berhasil Di Aktifkan", "", "success");
      getRoleList();
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

  useEffect(() => {
    getRoleDetail();
  }, [detaiRoleParam]);

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
                  <th className="py-3 px-6 text-center">Name</th>
                  <th className="py-3 px-6 text-center">Description</th>
                  <th className="py-3 px-6 text-center">Status</th>
                  <th className="py-3 px-6 text-center">Users</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light border-b">
                {currentItems.map((rol) => (
                  <tr
                    key={rol.rl_id}
                    className=" transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 white:hover:bg-neutral-600"
                  >
                    <td className=" py-2 px-4 text-left whitespace-nowrap font-semibold">
                      {rol.rl_name}
                    </td>
                    <td className="py-2 px-4 text-left  whitespace-nowrap font-semibold">
                      {rol.rl_description}
                    </td>
                    {rol.rl_status === true ? (
                      <td className="py-2 px-4 text-center  whitespace-nowrap font-semibold">
                        Aktif
                      </td>
                    ) : (
                      <td className="py-2 px-4 text-center  whitespace-nowrap font-semibold">
                        Inactive
                      </td>
                    )}
                    <td className="py-2 px-4 text-center whitespace-nowrap font-semibold">
                      {rol.rl_created_by}
                    </td>
                    <td className="py-2 px-4 text-center  whitespace-nowrap ">
                      <button
                        className="btn btn-success btn-sm"
                        onClick={() => editRole(rol.rl_id)}
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
                        onClick={() => handleDeleteRole(rol.rl_id)}
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
                      {rol.usrstatusformat !== "Active" ? (
                        <button
                          className="btn btn-warning btn-sm ml-1"
                          onClick={() => handleActiveRole(rol.rl_id)}
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="w-6 h-6"
                          >
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

      <ModalAdd isOpen={isModalOpen} onClose={closeModal} reload={getRoleList}>
        {/* <button onClick={closeModal}>Tutup Modal</button> */}
      </ModalAdd>

      {roleEdit !== undefined ? (
        <ModalEdit
          isOpen={isModalOpenEdit}
          onClose={closeModalEdit}
          currentRole={roleEdit}
          reload={getRoleList}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default RoleMenagement;
