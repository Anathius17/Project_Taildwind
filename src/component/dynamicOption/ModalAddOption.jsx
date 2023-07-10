import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../../API/api";
import Modal from "./ModalHeaderAdd2";
import "react-datepicker/dist/react-datepicker.css";
import { browserName, osName, browserVersion } from "react-device-detect";

const ModalAddOption = ({
  isOpen,
  onClose,
  reload,
  currentDynamic,
  laterDynamic,
}) => {
  const [code, setCode] = useState("");
  const [desc, setDescription] = useState("");

  useEffect(() => {
    setCode("");
    setDescription("");
  }, [onClose]);

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
    if (!code || !desc) {
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
  };

  const insertobjectdata = (val) => {
    InsertDynamicNew(val);
  };

  const InsertDynamicNew = (val) => {
    try {
      const dynamicNew = axios
        .post(
          "http://116.206.196.65:30992/skyparameter/DynamicOption/header/add",
          //JSON.stringify(insertBranch),
          {
            code: code,
            desc: desc,
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
            <h5 className="modal-title fw-bold">Dynamic Option | Add New</h5>
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
                        value={code}
                        className="form-control"
                        maxLength={25}
                        id="recipient-name"
                        onChange={(x) => setCode(x.target.value)}
                        required
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
                        value={desc}
                        id="recipient-name"
                        onChange={(e) => setDescription(e.target.value)}
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
            <button type="submit" className="btn btn-primary">
              Save Changes
            </button>
          </div>
        </div>
      </div>
      {/* <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        reload={reload}
        currentDynamic={currentDynamic}
        laterDynamic={laterDynamic}
      ></Modal> */}
    </div>
  );
};
export default ModalAddOption;
