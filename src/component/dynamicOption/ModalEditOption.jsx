import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../../API/api";
import Modal from "./ModalHeaderAdd";
import "react-datepicker/dist/react-datepicker.css";
import { browserName, osName, browserVersion } from "react-device-detect";

const ModalEditOption = ({
  isOpen,
  onClose,
  reload,
  groupOptions,
  currentDynamic,
  laterDynamic,
}) => {
  const [dynamicHeader, setDynamicHeader] = useState(currentDynamic);

  useEffect(() => {
    setDynamicHeader(currentDynamic);
  }, [currentDynamic]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setDynamicHeader((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  console.log("code nya : ", dynamicHeader.ddh_code);
  console.log("desc nya : ", dynamicHeader.ddh_desc);
  console.log("Codenya : ", dynamicHeader.ddh_id);
  console.log("Deletenya : ", dynamicHeader.ddh_isdelete);

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
    plact: "Add Dynamic Option",
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

  const Save = async (e) => {
    if (!dynamicHeader.ddh_id || !dynamicHeader.ddh_desc) {
      Swal.fire({
        icon: "error",
        title: "Oops... Data Tidak Boleh Kosong. Please check again?",
        text: "",
        footer: '<a href="">Why do I have this issue?</a>',
      });
      return;
    }
    setIsModalOpen(true);
    postDataLogUserTracking();
    console.log("Codenya : ", dynamicHeader.ddh_code);
    console.log("Codenya : ", dynamicHeader.ddh_id);
    console.log("Descriptinya : ", dynamicHeader.ddh_desc);
  };

  const insertobjectdata = (val) => {
    UpdateDynamicNew(val);
  };

  const UpdateDynamicNew = (val) => {
    try {
      const dynamicNew = axios
        .post(
          "http://116.206.196.65:30992/skyparameter/DynamicOption/header/update",

          {
            id: dynamicHeader.ddh_id,
            desc: dynamicHeader.ddh_desc,
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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  if (!isOpen) return null;
  return (
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute bg-white p-6 rounded-lg shadow-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Dynamic Option | Edit</h5>
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
                      />
                    </div>
                  </div>
                </div>
              </div>
            </form>
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
            <button type="submit" className="btn btn-primary" onClick={Save}>
              Save Changes
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              onClick={openModal}
            >
              Next
            </button>
          </div>
        </div>
      </div>
      {currentDynamic !== undefined ? (
        <Modal
          isOpen={isModalOpen}
          onClose={closeModal}
          reload={reload}
          currentDynamic={currentDynamic || ""}
          laterDynamic={laterDynamic || ""}
          groupOptions={groupOptions}
        />
      ) : (
        <></>
      )}
    </div>
  );
};
export default ModalEditOption;
