import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../../API/api";
import Modal from "./ModalHeaderAdd";
import "react-datepicker/dist/react-datepicker.css";
import { browserName, osName, browserVersion } from "react-device-detect";

const ModalChildAdd = ({
  isOpen,
  onClose,
  reload,
  groupOptions,
  currentChild,
  currentDetail,
  laterChild,
  ddlParent,
}) => {
  const [key, setkey] = useState("");
  const [value, setValue] = useState("");
  const [name, setName] = useState("");
  const [urut, setUrut] = useState("");
  const [parent, setParent] = useState("");

  const [dynamicHeader, setDynamicHeader] = useState(currentChild);
  const [dynamicDetail, setDynamicDetail] = useState(currentDetail);
  const [childDetail, setChildDetail] = useState(
    Array.isArray(laterChild) ? laterChild : []
  );
  const [ddlDetail, setDdlDetail] = useState(
    Array.isArray(ddlParent) ? ddlParent : []
  );
  const level = JSON.parse(localStorage.getItem("detailRoleUser"));
  const storedDdlValue = JSON.parse(localStorage.getItem("ddl_value"));

  useEffect(() => {
    setValue("");
    setName("");
    setUrut("");
  }, [onClose]);

  useEffect(() => {
    setDynamicHeader(currentChild);
  }, [currentChild]);

  useEffect(() => {
    setDynamicDetail(currentDetail);
  }, [currentDetail]);

  useEffect(() => {
    setChildDetail(laterChild);
  }, [laterChild]);

  useEffect(() => {
    setDdlDetail(ddlParent);
  }, [ddlParent]);

  // console.log("ddt_key:", key); // Mencetak ddl_value yang sudah berubah
  // console.log("ddt_value:", value); // Mencetak ddl_name sebelum perubahan
  // console.log("ddt_name:", name); // Mencetak urut sebelum perubahan
  // console.log("ddt_id:", parent);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setDynamicHeader((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange2 = (event, index) => {
    const { name, value } = event.target;

    setChildDetail((prevState) => {
      const updatedDetail = [...prevState];
      updatedDetail[index] = {
        ...updatedDetail[index],
        [name]: value,
      };
      return updatedDetail;
    });

    console.log("ddt_key:", childDetail[index].ddt_key); // Mencetak ddl_value yang sudah berubah
    console.log("ddt_value:", childDetail[index].ddt_value); // Mencetak ddl_name sebelum perubahan
    console.log("ddt_name:", childDetail[index].ddt_name); // Mencetak urut sebelum perubahan
    console.log("ddt_id:", childDetail[index].ddt_id);
  };

  const addDynamic = () => {
    Save();
  };

  const updateDynamic = (dynamicId, index) => {
    saveUpdate(dynamicId, index);
  };

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
    plact: "Add Child Dynamic",
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
    console.log("Code nya : ", dynamicHeader.ddh_code);
    console.log("key nya : ", key);
    console.log("value nya : ", value);
    console.log("name nya : ", name);
    console.log("counter nya : ", urut);
    console.log("parentar nya : ", parent);
  };

  const insertobjectdata = (val) => {
    InsertDynamicNew(val);
  };

  const InsertDynamicNew = (val) => {
    try {
      const dynamicNew = axios
        .post(
          "http://116.206.196.65:30992/skyparameter/DynamicOption/child/add",
          {
            code: dynamicHeader.ddh_code,
            key: key,
            value: value,
            urut: urut,
            parent: parent,
            name: name,
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
            console.log(response.data.message, "", "error");
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

  const dataLogUserTracking2 = {
    plcd: "",
    plusr: userid,
    plhtt: "OFF",
    plsvrn: window.location.hostname,
    plact: "Update Child Dynamic",
    plpgur: window.location.href,
    plqry: "-",
    plbro: browserName + " " + browserVersion,
    plos: osName,
    plcli: ip,
  };

  const postDataLogUserTracking2 = async () => {
    let log = "";
    try {
      await axios
        .post(
          "http://116.206.196.65:30983/skycore/LogActivity/postDataLogUserTracking",
          dataLogUserTracking2,
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

      await insertobjectdataUpdate(log);
      // alert("postDataLogUserTracking Berhasil");
    } catch (error) {
      alert("postDataLogUserTracking Tidak Berhasil");
      console.log(error);
    }
  };

  const saveUpdate = async (dynamicCode, index) => {
    if (!dynamicHeader.ddh_code) {
      Swal.fire({
        icon: "error",
        title: "Oops... Data Tidak Boleh Kosong. Please check again?",
        text: "",
        footer: '<a href="">Why do I have this issue?</a>',
      });
      return;
    }
    postDataLogUserTracking2();
    console.log("Code nya : ", dynamicHeader.ddh_code);
    insertobjectdataUpdate(dynamicCode, index);
  };

  const insertobjectdataUpdate = (val, index) => {
    UpdateDynamicNew(val, childDetail[index]);
  };

  const UpdateDynamicNew = (val, childDetailData) => {
    try {
      axios
        .post(
          "http://116.206.196.65:30992/skyparameter/DynamicOption/child/update",
          {
            id: childDetailData.ddt_id,
            key: childDetailData.ddt_key,
            value: childDetailData.ddt_value,
            urut: childDetailData.urut,
            parent: childDetailData.ddt_parent,
            name: childDetailData.ddt_name,
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
          console.log("ddt_id : ", childDetailData.ddt_id);
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
            <h5 className="modal-title fw-bold">Dynamic Option | Child Add </h5>
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
                        Parent Code<span className="text-danger">*</span>
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
                        Parent Value <span className="text-danger">*</span>
                      </label>
                    </div>

                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        value={storedDdlValue}
                        name="valueSession"
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
                  <th className="py-3 px-6 text-center">Key</th>
                  <th className="py-3 px-6 text-center">Value</th>
                  <th className="py-3 px-6 text-center">Name</th>
                  <th className="py-3 px-6 text-center">Counter</th>
                  <th className="py-3 px-6 text-center">Parent</th>
                  <th className="py-3 px-6 text-center">Action</th>
                </tr>
              </thead>
              <tbody className="text-gray-600 text-sm font-light border-b">
                {/*update Data Dynamic*/}
                {Array.isArray(childDetail) &&
                  childDetail.map((dyn, index) => (
                    <tr
                      key={dyn.ddt_id}
                      className="transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 white:hover:bg-neutral-600"
                    >
                      <td className="py-1 px-1 text-left whitespace-nowrap font-semibold">
                        <input
                          type="text"
                          className="form-control"
                          value={dyn.ddt_key}
                          name="ddt_key"
                          onChange={(event) => handleInputChange2(event, index)}
                          required
                          readOnly
                        />
                      </td>

                      <td className="py-1 px-1 text-left whitespace-nowrap font-semibold">
                        <input
                          type="text"
                          className="form-control"
                          value={dyn.ddt_value}
                          name="ddt_value"
                          onChange={(event) => handleInputChange2(event, index)}
                          required
                        />
                      </td>

                      <td className="py-1 px-1 text-left whitespace-nowrap font-semibold">
                        <input
                          type="text"
                          className="form-control"
                          value={dyn.ddt_name}
                          name="ddt_name"
                          onChange={(event) => handleInputChange2(event, index)}
                          required
                        />
                      </td>

                      <td className="py-1 px-1 text-left whitespace-nowrap font-semibold">
                        <input
                          type="text"
                          className="form-control"
                          value={dyn.urut}
                          name="urut"
                          onChange={(event) => handleInputChange2(event, index)}
                          required
                        />
                      </td>

                      <td className="py-1 px-1 text-left whitespace-nowrap font-semibold">
                        <select
                          type="text"
                          className="form-control"
                          id="recipient-name"
                          name="ddt_parent"
                          value={dyn.ddt_parent}
                          onChange={(event) => handleInputChange2(event, index)}
                        >
                          <option value="">Select One</option>
                          {Array.isArray(ddlDetail) &&
                            ddlDetail.map((option) => (
                              <option
                                key={option.ddt_id}
                                value={option.ddt_parent}
                              >
                                {option.ddt_parent_name}
                              </option>
                            ))}
                        </select>
                      </td>

                      <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => updateDynamic(dyn.ddt_id, index)}
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
                  ))}

                {/*add Data Dynamic*/}
                <tr className="transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 white:hover:bg-neutral-600">
                  <td className="py-1 px-1 text-left whitespace-nowrap font-semibold">
                    <input
                      type="text"
                      value={key}
                      className="form-control"
                      maxLength={25}
                      id="recipient-name"
                      onChange={(x) => setkey(x.target.value)}
                      required
                    />
                  </td>
                  <td className="py-1 px-1 text-left whitespace-nowrap font-semibold">
                    <input
                      type="text"
                      value={value}
                      className="form-control"
                      maxLength={25}
                      id="recipient-name"
                      onChange={(x) => setValue(x.target.value)}
                      required
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
                    />
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                    <select
                      className="form-control"
                      value={parent || ""}
                      onChange={(e) => setParent(e.target.value)}
                      required
                    >
                      <option value="">Select One</option>
                      {groupOptions.map((option) => (
                        <option key={option} value={option}>
                          {option}
                        </option>
                      ))}
                    </select>
                  </td>
                  <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                    <button
                      className="btn btn-primary btn-sm"
                      onClick={() => {
                        addDynamic(dynamicHeader.ddh_code);
                      }}
                    >
                      Add New
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
            <button
              type="submit"
              className="btn btn-primary"
              onClick={openModal && onClose}
            >
              Prev
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        groupOptions={groupOptions}
        currentDynamic={currentChild}
        laterDynamic={currentDetail}
      ></Modal>
    </div>
  );
};
export default ModalChildAdd;
