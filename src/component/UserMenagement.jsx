import React, { useState, useEffect } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import { getToken } from "../API/api";
import Modal from "./Modal";
import ModalEdit from "./ModalEdit";
import axios from "axios";
import Swal from "sweetalert2";
import { browserName, osName, browserVersion } from "react-device-detect";
// import { BsFillPersonPlusFill } from "react-icons/bs";
// import { ImSearch } from "react-icons/im";

const UserMenagement = () => {
  const [users, setUsers] = useState([]);

  const today = new Date();
  console.log(today);
  // const dateUser = users.usrefectivedate;

  console.log(users);
  const [status, setStatus] = useState();
  const [currentUser, setCurrentUser] = useState(users);

  // Dapatkan data sesi
  const sessionData = JSON.parse(localStorage.getItem("tokenData"));
  // console.log(sessionData);
  const token = sessionData;
  console.log(token);

  useEffect(() => {
    if (token !== "") {
      getUserList();
      console.log(1);
    }
  }, [token]);

  const getUserList = async () => {
    try {
      const listUser = await axios.get(
        "http://116.206.196.65:30983/skycore/User/list",
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

  // insert log activity
  const [ip, setIP] = useState("");
  const [logid, setlogid] = useState("");
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    console.log(res.data);
    setIP(res.data.ip);
  };
  useEffect(() => {
    getData();
  }, []);

  const userid = JSON.parse(localStorage.getItem("userid"));
  // ! nanti atur secara dinamis
  const dataLogUserTracking = {
    plcd: "user_management",
    plusr: userid,
    plhtt: "OFF",
    plsvrn: window.location.hostname,
    plact: "User Management ",
    plpgur: window.location.href,
    plqry: "-",
    plbro: "Firefox 72.0",
    plos: osName,
    plcli: ip,
  };

  const Updateobjectdata = (val) => {
    DeleteUser(val);
  };

  // ? Menghapus pengguna
  const handleDeleteUser = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this data?",
      showConfirmButton: true,
      showCancelButton: true,
      confirmButtonText: "OK",
      cancelButtonText: "Cancel",
      icon: "warning",
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        //postDataLogUserTracking();
        deleteUser(id);
        setUserId(id);
      } else Swal.fire(" Cancelled", "", "error");
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

  // ! variables untuk kebutuhan hit delete user
  const [userID, setUserId] = useState("");

  //! --------for API delete--------
  const hitDelete = {
    usr: userID,
    logid: "11",
  };
  const DeleteUser = async (val) => {
    try {
      const userDelete = await axios.post(
        "http://116.206.196.65:30983/skycore/User/postJDataDelRecord",
        {
          usr: userID,
          logid: val,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(userDelete);
      Swal.fire("User Berhasil Di Hapus", "", "success");
      console.log(userID);
    } catch (error) {
      alert(error);
    }
  };

  useEffect(() => {
    if (userID !== "") {
      postDataLogUserTracking();
    }
  }, [userID]);

  const deleteUser = (id) => {
    setUsers(users.filter((user) => user.usruserid !== id));
  };
  //! ----batas Hit Api delete-----

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

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

  //! Edit User
  const [detaiUserParam, setDetaiUserParam] = useState("");
  //  localStorage.setItem("tokenData", JSON.stringify(token));
  // sessionStorage.setItem("userDetailParam", "value");

  useEffect(() => {
    if (detaiUserParam !== "") {
      sessionStorage.setItem("userDetailParam", detaiUserParam);
    }
  }, [detaiUserParam]);

  const value = sessionStorage.getItem("userDetailParam");
  console.log(value);

  useEffect(() => {
    getUserDetail();
  }, [detaiUserParam]);

  const editUser = (userid) => {
    setDetaiUserParam(userid);
    setIsModalOpenEdit(true);
  };

  const [userEdit, setUserEdit] = useState();

  //  GET http://116.206.196.65:30983/skycore/User/getDataUser/ 404 (Not Found)

  const getUserDetail = async () => {
    try {
      const listUserDetail = await axios.get(
        "http://116.206.196.65:30983/skycore/User/getDataUser/" +
          detaiUserParam,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cekData = listUserDetail.data.data.map((e) => {
        return e;
      });
      console.log(listUserDetail);
      setUserEdit(cekData[0]);
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
    // getUserDetail();
  };

  // ! --- batas user aktif
  // const Aktif = (userid) => {
  //   setUserActive(userid);
  //   Active();
  // };

  // useEffect(() => {
  //   Active();
  // }, [useridActive]);

  const handleActiveUser = (id) => {
    setUserActive(id);
    Active();
  };

  const [useridActive, setUserActive] = useState("");
  console.log(useridActive);

  const demo = () => {
    console.log("ulang");
  };

  useEffect(() => {
    if (useridActive !== "") {
      Active();
      setUserActive("");
    }
  }, [useridActive]);

  const userActive = {
    usr: useridActive,
  };
  const Active = async () => {
    try {
      await axios.post(
        "http://116.206.196.65:30983/skycore/User/activeByUser/",
        userActive,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire("User Berhasil Di Aktifkan", "", "success");
      getUserList();
    } catch (errorUser) {
      console.log(errorUser);
    }
  };

  // ---batas user aktif

  useEffect(() => {
    DropDown();
    DropDownSv();
    DropDownRl();
  }, [detaiUserParam]);

  const [branch, setBranch] = useState([]);
  console.log(branch);
  //!--- Dropdown ddl branch------
  const hitDropdown = {
    type: "branch",
    usr: detaiUserParam,
  };

  const DropDown = async () => {
    try {
      const listDropdown = await axios.post(
        "http://116.206.196.65:30983/skycore/User/postJDataCallParameterDDL",
        JSON.stringify(hitDropdown),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const cekData = listDropdown.data.data.map((e) => {
        return e;
      });

      // console.l.usrnotlp
      setBranch(cekData);
    } catch (error) {
      console.log(error);
    }
  };

  const [superVisior, setSupervisior] = useState([]);
  // //! dropdown ddl supervisor
  const hitDropdownSv = {
    type: "supervisor",
    usr: detaiUserParam,
  };

  const DropDownSv = async () => {
    try {
      const listDropdown = await axios.post(
        "http://116.206.196.65:30983/skycore/User/postJDataCallParameterDDL",
        JSON.stringify(hitDropdownSv),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const cekData = listDropdown.data.data.map((e) => {
        return e;
      });

      // console.log(cekData);
      setSupervisior(cekData);
    } catch (error) {
      console.log(error);
    }
  };

  // //! dropdown ddl Role
  const [role, setRole] = useState([]);
  const hitDropdownRl = {
    type: "level",
    usr: detaiUserParam,
  };

  const DropDownRl = async () => {
    try {
      const listDropdown = await axios.post(
        "http://116.206.196.65:30983/skycore/User/postJDataCallParameterDDL",
        JSON.stringify(hitDropdownRl),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const cekData = listDropdown.data.data.map((e) => {
        return e;
      });

      // console.log(cekData);
      setRole(cekData);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="card shadow mb-4">
      <div className="card-header d-flex justify-content-between mb-2">
        <div className="test">
          <h4> User Management</h4>
        </div>
        <div className="btn-new">
          <button className="btn btn-sm btn-primary" onClick={openModal}>
            <span className="text-sm">Add new </span>
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
            <table className="min-w-max w-full table-bordered ">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">User Id</th>
                  <th className="py-3 px-6 text-left">Name</th>
                  <th className="py-3 px-6 text-center">Nip</th>
                  <th className="py-3 px-6 text-center">Role</th>
                  <th className="py-3 px-6 text-center">Status</th>
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
                        onClick={() => editUser(user.usruserid)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3.5 h-3.5">
                          <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-8.4 8.4a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32l8.4-8.4z" />
                          <path d="M5.25 5.25a3 3 0 00-3 3v10.5a3 3 0 003 3h10.5a3 3 0 003-3V13.5a.75.75 0 00-1.5 0v5.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5V8.25a1.5 1.5 0 011.5-1.5h5.25a.75.75 0 000-1.5H5.25z" />
                        </svg>
                      </button>
                      <button
                        className="btn btn-danger btn-sm ml-1"
                        onClick={() => handleDeleteUser(user.usruserid)}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-3.5 h-3.5">
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
                          onClick={() => handleActiveUser(user.usruserid)}>
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

      <Modal isOpen={isModalOpen} onClose={closeModal} reload={getUserList}>
        {/* <button onClick={closeModal}>Tutup Modal</button> */}
      </Modal>

      {userEdit !== undefined ? (
        <ModalEdit
          isOpen={isModalOpenEdit}
          onClose={closeModalEdit}
          currentUser={userEdit}
          dropdownBranch={branch}
          dropdownSN={superVisior}
          dropdownRole={role}
          reload={getUserList}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default UserMenagement;
