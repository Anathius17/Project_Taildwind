import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from "sweetalert2";
import { getToken } from "../../API/api";
import "react-datepicker/dist/react-datepicker.css";
import { browserName, osName, browserVersion } from "react-device-detect";

const ModalAddBranch = ({ isOpen, onClose, reload, groupOptions }) => {
  const [code, setCodeBranch] = useState("");
  const [name, setNameBranch] = useState("");
  const [address, setAddressBranch] = useState("");
  const [city, setCityBranch] = useState("");
  const [phonenum, setNoTelepon] = useState("");
  const [group, setGroupBranch] = useState("");

  useEffect(() => {
    setCodeBranch("");
    setNameBranch("");
    setGroupBranch("");
    setAddressBranch("");
    setCityBranch("");
    setNoTelepon("");
  }, [onClose]);

  // get userid
  const userid = JSON.parse(localStorage.getItem("userid"));

  // untuk Token yang tersimpan di session
  //  const sessionData = JSON.parse(localStorage.getItem("tokenData"));
  //  const token = sessionData;
  const [token, setToken] = useState();
  const getTokenApi = () => {
    getToken().then((e) => {
      setToken(e);
    });
  };

  useEffect(() => {
    getTokenApi();
  }, [token]);

  // insert log activity
  const [ip, setIP] = useState("");
  const [logid, setlogid] = useState("");
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    console.log(res.data);
    setIP(res.data.ip);
  };
  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);
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
    if (!code || !group || !name || !address || !city || !phonenum) {
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
          "http://116.206.196.65:30983/skycore/Branch/insert",
          //JSON.stringify(insertBranch),
          {
            code: code,
            name: name,
            group: group,
            address: address,
            city: city,
            phonenum: phonenum,
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
            <h5 className="modal-title fw-bold">Branch Management | Add New</h5>
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
                        Branch Code <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        value={code}
                        className="form-control"
                        maxLength={25}
                        id="recipient-name"
                        onChange={(x) => setCodeBranch(x.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className=" row mb-2">
                    <div className="col-4">
                      <label class="form-label">
                        Branch Name <span className="text-danger">*</span>
                      </label>
                    </div>

                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        value={name}
                        id="recipient-name"
                        onChange={(e) => setNameBranch(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-4">
                      <label className="form-label">
                        Branch Group <span className="text-danger">*</span>
                      </label>
                    </div>

                    <div className="col-8">
                      <select
                        className="form-control"
                        value={group || ""}
                        onChange={(e) => setGroupBranch(e.target.value)}
                        required
                      >
                        <option value="">Select One</option>
                        {groupOptions.map((option) => (
                          <option key={option} value={option}>
                            {option}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className=" row mb-2">
                    <div className="col-4">
                      <label class="form-label">
                        Branch Address <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        value={address}
                        id="recipient-name"
                        onChange={(e) => setAddressBranch(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className=" row mb-2">
                    <div className="col-4">
                      <label class="form-label">
                        Branch City <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        value={city}
                        id="recipient-name"
                        onChange={(e) => setCityBranch(e.target.value)}
                        required
                      />
                    </div>
                    {/* <div id="emailHelp" className="form-text">
                      We'll never share your email with anyone else.
                    </div> */}
                  </div>
                  <div className=" row mb-2">
                    <div className="col-4">
                      <label class="form-label">
                        Branch Phone Number{" "}
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        value={phonenum}
                        id="recipient-name"
                        onChange={(e) => setNoTelepon(e.target.value)}
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
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalAddBranch;
