import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import axios from "axios";
import { getToken } from "../../API/api";
import { browserName, osName, browserVersion } from "react-device-detect";

const ModalBranch = ({
  isOpen,
  onClose,
  currentBranch,
  reload,
  groupOptions,
}) => {
  // get userid
  const userid = JSON.parse(localStorage.getItem("userid"));

  const [token, setToken] = useState();
  const [branch, setBranch] = useState(currentBranch);

  const getTokenApi = () => {
    getToken().then((e) => {
      setToken(e);
    });
  };

  useEffect(() => {
    getTokenApi();
    setBranch(currentBranch);
  }, [currentBranch]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setBranch((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // insert log activity
  const [ip, setIP] = useState("");
  const [logid, setlogid] = useState("");

  useEffect(() => {
    const getData = async () => {
      const res = await axios.get("https://api.ipify.org/?format=json");
      console.log(res.data.ip);
      setIP(res.data.ip);
    };
    getData();
  }, []);

  const dataLogUserTracking = {
    plcd: "branch_mgmt",
    plusr: userid,
    plhtt: "OFF",
    plsvrn: window.location.hostname,
    plact: "Update Branch Management",
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
          log = response.data.data[0].resultprocess;
        });

      await Updateobjectdata(log);
      // alert("postDataLogUserTracking Berhasil");
    } catch (error) {
      alert("postDataLogUserTracking Tidak Berhasil");
      console.log(error);
    }
  };

  // const dataEditBranch = {
  //   code: branch.lbrc_code,
  //   name: branch.lbrc_name,
  //   address: branch.lbrc_address,
  //   city: branch.lbrc_city,
  //   phonenum: branch.lbrc_phone_num,
  //   logid: "13",
  // };

  const Updateobjectdata = (val) => {
    EditBranch(val);
  };
  const Submit = () => {
    postDataLogUserTracking();
  };

  const EditBranch = async (val) => {
    if (
      !branch.lbrc_code ||
      !branch.lbrc_name ||
      !branch.lbrc_group ||
      !branch.lbrc_address ||
      !branch.lbrc_city ||
      !branch.lbrc_phone_num
    ) {
      Swal.fire("Please completed all fields", "", "error");
      return;
    }
    try {
      await axios
        .post(
          "http://116.206.196.65:30983/skycore/Branch/update",
          {
            code: branch.lbrc_code,
            name: branch.lbrc_name,
            group: branch.lbrc_group,
            address: branch.lbrc_address,
            city: branch.lbrc_city,
            phonenum: branch.lbrc_phone_num,
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
            Swal.fire("Update Successfully ", "", "success");
          } else {
            Swal.fire(response.data.message, "", "error");
          }
        });
      //Swal.fire("Save Berhasil", "", "success");

      reload();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  if (!isOpen) return null;
  return (
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute bg-white p-6 rounded-lg shadow-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Branch Management | Edit</h5>
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
                  <div className=" row mb-1">
                    <div className="col-4">
                      <label for="exampleInputEmail1" class="form-label">
                        Branch Code <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        name="lbrc_code"
                        value={branch.lbrc_code}
                        onChange={handleInputChange}
                        disabled
                        // onChange={(e) => setUserId(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-4">
                      <label for="exampleInputName" class="form-label">
                        Branch Name <span className="text-danger">*</span>
                      </label>
                    </div>

                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        value={branch.lbrc_name}
                        name="lbrc_name"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-4">
                      <label for="exampleInputEmail1" class="form-label">
                        Branch Group <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-8">
                      <select
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        name="lbrc_group"
                        value={branch.lbrc_group}
                        onChange={handleInputChange}
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
                  <div className=" row mb-1">
                    <div className="col-4">
                      <label for="exampleInputAddress" class="form-label">
                        Branch Address <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        value={branch.lbrc_address}
                        name="lbrc_address"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-4">
                      <label for="exampleInputCity" class="form-label">
                        Branch City <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        value={branch.lbrc_city}
                        name="lbrc_city"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-4">
                      <label for="exampleInputnumberphone" class="form-label">
                        Branch Phone Number{" "}
                        <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        value={branch.lbrc_phone_num}
                        name="lbrc_phone_num"
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
            <button type="submit" className="btn btn-primary" onClick={Submit}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalBranch;
