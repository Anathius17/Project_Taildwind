import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../../API/api";
import Modal from "./ModalHeaderAdd";
import "react-datepicker/dist/react-datepicker.css";
import { browserName, osName, browserVersion } from "react-device-detect";

const ModalAddBranch = ({
  isOpen,
  onClose,
  reload,
  groupOptions,
  currentBranch,
}) => {
  const [code, setCode] = useState("");
  const [desc, setDesc] = useState("");
  const [option, setOption] = useState(currentBranch);

  useEffect(() => {
    setOption(currentBranch);
  }, [currentBranch]);

  useEffect(() => {
    setCode("");
    setDesc("");
  }, [onClose]);

  // get userid
  const userid = JSON.parse(localStorage.getItem("userid"));

  // untuk Token yang tersimpan di session
  const [token, setToken] = useState();
  const getTokenApi = () => {
    getToken().then((e) => {
      setToken(e);
    });
  };

  useEffect(() => {
    getTokenApi();
    localStorage.setItem("tokenData", JSON.stringify(token));
  }, [token]);

  // insert log activity
  const [logid, setlogid] = useState("");
  const ip = JSON.parse(localStorage.getItem("ipAddres"));

  const dataLogUserTracking = {
    plcd: "branch_mgmt",
    plusr: userid,
    plhtt: "OFF",
    plsvrn: window.location.hostname,
    plact: "Add Branch Management",
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
    postDataLogUserTracking();
  };

  const insertobjectdata = (val) => {
    InsertBranchNew(val);
  };

  const InsertBranchNew = (val) => {
    try {
      const branchNew = axios
        .post(
          "http://116.206.196.65:30992/skyparameter/DynamicOption/header/add",
          //JSON.stringify(insertBranch),
          {
            code: code,
            name: desc,
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

  //! Edit branch
  const [detaiBranchParam, setDetaiBranchParam] = useState("");

  useEffect(() => {
    getBranchDetail();
  }, [detaiBranchParam]);

  const editBranch = (branchcode) => {
    setDetaiBranchParam(branchcode);
    setIsModalOpenEdit(true);
  };

  const [branchEdit, setBranchEdit] = useState();

  const getBranchDetail = async () => {
    console.log("branchcode");
    console.log(detaiBranchParam);
    try {
      const listBranchDetail = await axios.get(
        "http://116.206.196.65:30992/skyparameter/DynamicOption/detail/" +
          detaiBranchParam,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cekData = listBranchDetail.data.data.map((e) => {
        console.log(e);
        return e;
      });

      //console.log(cekData[0]);
      console.log(listBranchDetail.data.status);
      setBranchEdit(cekData[0]);
    } catch (errorUser) {
      console.log(errorUser);
    }
  };

  const [isModalOpenEdit, setIsModalOpenEdit] = useState(false);

  const openModalEdit = () => {
    setIsModalOpenEdit(true);
  };

  const closeModalEdit = () => {
    setIsModalOpenEdit(false);
    // window.location.reload();
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
                        onChange={(e) => setDesc(e.target.value)}
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
            <button
              type="submit"
              className="btn btn-primary"
              onClick={openModal}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isModalOpen}
        onClose={closeModal}
        groupOptions={groupOptions}
        currentBranch={option}
        laterBranch={branchEdit}
      ></Modal>
    </div>
  );
};
export default ModalAddBranch;
