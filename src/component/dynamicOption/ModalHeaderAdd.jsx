import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../../API/api";
import ModalPrev from "./ModalEditOption";
import Modal from "./ModalChildAdd";
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

  const [dynamicHeader, setDynamicHeader] = useState(currentDynamic);
  const [dynamicDetail, setDynamicDetail] = useState(
    Array.isArray(laterDynamic) ? laterDynamic : []
  );

  const level = JSON.parse(localStorage.getItem("detailRoleUser"));

  useEffect(() => {
    setValue("");
    setName("");
    setUrut("");
  }, [onClose]);

  useEffect(() => {
    setDynamicHeader(currentDynamic);
  }, [currentDynamic]);

  useEffect(() => {
    setDynamicDetail(laterDynamic);
  }, [laterDynamic]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setDynamicHeader((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleInputChange2 = (event, index) => {
    const { name, value } = event.target;

    setDynamicDetail((prevState) => {
      const updatedDetail = [...prevState];
      updatedDetail[index] = {
        ...updatedDetail[index],
        [name]: value,
      };
      return updatedDetail;
    });

    console.log("ddl_value:", dynamicDetail[index].ddl_value); // Mencetak ddl_value yang sudah berubah
    console.log("ddl_name:", dynamicDetail[index].ddl_name); // Mencetak ddl_name sebelum perubahan
    console.log("urut:", dynamicDetail[index].urut); // Mencetak urut sebelum perubahan
    console.log("ddp_id:", dynamicDetail[index].ddp_id);
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

  const [isModalPrevOpen, setIsModalPrevOpen] = useState(false);

  const openModalPrev = () => {
    setIsModalOpen(true);
  };

  const closeModalPrev = () => {
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
  };

  const insertobjectdata = (val) => {
    InsertDynamicNew(val);
  };

  const InsertDynamicNew = (val) => {
    try {
      const dynamicNew = axios
        .post(
          "http://116.206.196.65:30992/skyparameter/DynamicOption/insert",
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

  const dataLogUserTracking2 = {
    plcd: "",
    plusr: userid,
    plhtt: "OFF",
    plsvrn: window.location.hostname,
    plact: "Update Header Option",
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
    UpdateDynamicNew(val, dynamicDetail[index]);
  };

  const UpdateDynamicNew = (val, dynamicDetailData) => {
    try {
      axios
        .post(
          "http://116.206.196.65:30992/skyparameter/DynamicOption/update",
          {
            id: dynamicDetailData.ddp_id,
            code: dynamicHeader.ddh_code,
            value: dynamicDetailData.ddl_value,
            name: dynamicDetailData.ddl_name,
            urut: dynamicDetailData.urut,
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
            console.log("ddp_id : ", dynamicDetailData.ddp_id);
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

  //! Detail dynamic
  const [detailDynamicParam, setDetailDynamicParam] = useState("");

  useEffect(() => {
    getDynamicDetail();
  }, [detailDynamicParam]);

  const addChild = (dynamicCode, index) => {
    // ...
    setDetailDynamicParam(dynamicCode);
    const ddlValue = dynamicDetail[index].ddl_value;
    localStorage.setItem("ddl_value", JSON.stringify(ddlValue));
    setIsModalOpen(true);
  };

  const [dynamicEditChild, setDynamicEditChild] = useState(undefined);

  const getDynamicDetail = async () => {
    console.log("dynamicCode");
    console.log(detailDynamicParam);
    try {
      const listDynamicDetail = await axios.get(
        "http://116.206.196.65:30992/skyparameter/DynamicOption/child/detail/" +
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
      setDynamicEditChild(cekData);
    } catch (errorUser) {
      console.log(errorUser);
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
                {/*update Data Dynamic*/}
                {Array.isArray(dynamicDetail) &&
                  dynamicDetail.map((dyn, index) => (
                    <tr
                      key={dyn.ddp_id}
                      className="transition duration-300 ease-in-out hover:bg-neutral-100 dark:border-neutral-500 white:hover:bg-neutral-600"
                    >
                      <td className="py-1 px-1 text-left whitespace-nowrap font-semibold">
                        <input
                          type="text"
                          className="form-control"
                          value={dyn.ddl_value}
                          name="ddl_value"
                          onChange={(event) => handleInputChange2(event, index)}
                          required
                          readOnly
                        />
                      </td>

                      <td className="py-1 px-1 text-left whitespace-nowrap font-semibold">
                        <input
                          type="text"
                          className="form-control"
                          value={dyn.ddl_name}
                          name="ddl_name"
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

                      <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                        <button
                          className="btn btn-success btn-sm"
                          onClick={() => {
                            addChild(dyn.ddp_id, index);
                          }}
                        >
                          Add Child
                        </button>
                      </td>
                      <td className="py-3 px-6 text-center whitespace-nowrap font-semibold">
                        <button
                          className="btn btn-primary btn-sm"
                          onClick={() => updateDynamic(dyn.ddp_id, index)}
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
              onClick={openModalPrev}
            >
              Prev
            </button>
          </div>
        </div>
      </div>

      {currentDynamic !== undefined ? (
        <ModalPrev
          isOpen={isModalPrevOpen}
          onClose={closeModalPrev}
          reload={() => {
            reload();
            getDynamicDetail();
          }}
          groupOptions={groupOptions}
          currentDynamic={currentDynamic || ""}
          laterDynamic={laterDynamic || ""}
        />
      ) : (
        <></>
      )}

      {dynamicHeader !== undefined ? (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          reload={() => {
            reload();
            getDynamicDetail();
          }}
          groupOptions={groupOptions}
          currentChild={dynamicHeader}
          currentDetail={dynamicDetail}
          laterChild={dynamicEditChild}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default ModalHeaderAdd;
