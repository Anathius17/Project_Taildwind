import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../../API/api";
import "react-datepicker/dist/react-datepicker.css";
import { browserName, osName, browserVersion } from "react-device-detect";

const ModalHeaderAdd = ({
  isOpen,
  onClose,
  reload,
  groupOptions,
  currentDynamic,
  laterDynamic,
}) => {
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [urut, setUrut] = useState("");
  const [isNewRow, setIsNewRow] = useState(true);
  const [dynamicHeader, setDynamicHeader] = useState(currentDynamic);
  const [dynamic, setDynamic] = useState(laterDynamic);
  const [dynamicRows, setDynamicRows] = useState([laterDynamic]); // Menyimpan semua row dinamis

  const level = JSON.parse(localStorage.getItem("detailRoleUser"));

  useEffect(() => {
    setValue("");
    setName("");
    setUrut("");
  }, [onClose]);

  useEffect(() => {
    setDynamicHeader(currentDynamic);
    setDynamic(laterDynamic);
  }, [currentDynamic]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setDynamicHeader((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const addDynamicRow = (ddh_code) => {
    setIsNewRow(true);
    Save();
  };

  //   const handleInputChange2 = (index, event) => {
  //     const { name, value } = event.target;
  //     const updatedDynamicRows = [...dynamicRows];
  //     updatedDynamicRows[index] = {
  //       ...updatedDynamicRows[index],
  //       [name]: value,
  //     };
  //     setDynamicRows(updatedDynamicRows);
  //   };

  //   const addDynamicRow = () => {
  //     const newDynamicRow = { ddl_value: "", ddl_name: "", urut: "" };
  //     setDynamicRows((prevRows) => [...prevRows, newDynamicRow]);
  //     Save();
  //   };

  // get userid
  const userid = JSON.parse(localStorage.getItem("userid"));

  // untuk Token yang tersimpan di session
  const sessionData = JSON.parse(localStorage.getItem("tokenData"));
  const token = sessionData;

  // insert log activity
  const [logid, setlogid] = useState("");
  const ip = JSON.parse(localStorage.getItem("ipAddres"));

  const dataLogUserTracking = {
    plcd: "",
    plusr: userid,
    plhtt: "OFF",
    plsvrn: window.location.hostname,
    plact: "Add Header Option",
    plpgur: window.location.href,
    plqry: "-",
    plbro: browserName + " " + browserVersion,
    plos: osName,
    plcli: ip,
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
          setlogid(response.data.data[0].resultprocess);
          log = response.data.data[0].resultprocess;
        });

      await insertobjectdata(log);
      // alert("postDataLogUserTracking Berhasil");
    } catch (error) {
      alert("postDataLogUserTracking Tidak Berhasil");
      console.log(error);
    }
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const Save = async (e) => {
    if (!dynamicHeader.ddh_code) {
      Swal.fire({
        icon: "error",
        title: "Oops... Data Tidak Boleh Kosong. Please check again?",
        text: "",
        footer: '<a href="">Why do I have this issue?</a>',
      });
      return;
    }
    postDataLogUserTracking();
    setIsModalOpen(true);
  };

  const insertobjectdata = (val) => {
    InsertDynamicNew(val);
  };

  const InsertDynamicNew = (val) => {
    try {
      const dynamicNew = axios
        .post(
          "http://116.206.196.65:30992/skyparameter/DynamicOption/insert",
          //JSON.stringify(insertBranch),
          {
            code: dynamicHeader.ddh_code,
            value: value,
            name: name,
            urut: urut,
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
            Swal.fire("Save Successfully ", "", "success");
            reload();
            onClose();
          } else {
            Swal.fire(response.data.message, "", "error");
            reload();
            onClose();
          }
        });
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: error,
        text: "",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-dialog modal-dialog-scrollable modal-xl w-10/12 mr-10">
        <div className="modal-content" style={{ width: "1000px" }}>
          <div className="modal-header">
            <h5 className="modal-title fw-bold">
              Dynamic Option | Header Add{" "}
            </h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="row">
                <div className="col-12">
                  {" "}
                  <div className=" row mb-2">
                    <div className="col-4">
                      <label class="form-label">
                        Code <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        value={dynamicHeader.ddh_code}
                        name="ddh_code"
                        onChange={handleInputChange}
                        required
                        readOnly
                      />
                    </div>
                  </div>
                  <div className=" row mb-2">
                    <div className="col-4">
                      <label class="form-label">
                        Description <span className="text-danger">*</span>
                      </label>
                    </div>

                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        value={dynamicHeader.ddh_desc}
                        name="ddh_desc"
                        onChange={handleInputChange}
                        required
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
            <table className="min-w-max w-full table-bordered">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-center">value</th>
                  <th className="py-3 px-6 text-center">Name</th>
                  <th className="py-3 px-6 text-center">Counter</th>
                  <th className="py-3 px-6 text-center">Child</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light border-b">
                <tr className="transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 white:hover:bg-neutral-600">
                  <td className="py-1 px-1 text-left whitespace-nowrap font-semibold">
                    <input
                      type="text"
                      value={value}
                      className="form-control"
                      maxLength={25}
                      id="recipient-name"
                      onChange={(x) => setValue(x.target.value)}
                      required
                      disabled={isNewRow}
                    />
                  </td>
                  <td className="py-1 px-1 text-left whitespace-nowrap font-semibold">
                    <input
                      type="text"
                      value={name}
                      className="form-control"
                      maxLength={25}
                      id="recipient-name"
                      onChange={(x) => setName(x.target.value)}
                      required
                      disabled={isNewRow}
                    />
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                    <input
                      type="text"
                      value={urut}
                      className="form-control"
                      maxLength={25}
                      id="recipient-name"
                      onChange={(x) => setUrut(x.target.value)}
                      required
                      disabled={isNewRow}
                    />
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                    <button
                      className="btn btn-success btn-sm"
                      onClick={() => {
                        addDynamicRow(dynamicHeader.ddh_code);
                        setIsNewRow(false);
                      }}
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
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                    <button
                      className="btn btn-primary btn-sm"
                      // onClick={() => updateDynamic(dynamic.ddp_code)}
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
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary">
              Prev
            </button>
          </div>
        </div>
      </div>
      {/* <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        // reload={getBranchList}
        groupOptions={groupOptions}
        currentBranch={branch}
      ></Modal> */}
    </div>
  );
};
export default ModalHeaderAdd;
