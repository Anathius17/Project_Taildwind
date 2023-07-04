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
  currentBranch,
  laterBranch,
}) => {
  const [code, setCode] = useState("");
  const [description, setDescription] = useState("");
  const [dynamic, setDynamic] = useState(currentBranch);
  const [option, setOption] = useState(laterBranch);
  const level = JSON.parse(localStorage.getItem("detailRoleUser"));
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCode("");
    setDescription("");
  }, [onClose]);

  useEffect(() => {
    setDynamic(currentBranch);
  }, [currentBranch]);

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

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const Save = async (e) => {
    if (!code || !description) {
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
            desc: description,
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
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute bg-white p-6 rounded-lg shadow-lg">
        <div className="modal-content">
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
                        value={description}
                        id="recipient-name"
                        onChange={(e) => setDescription(e.target.value)}
                        required
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
            <button type="submit" className="btn btn-primary" onClick={Save}>
              Save Changes
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
