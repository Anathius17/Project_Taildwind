import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
// import "../assets/css/modal.css";
import axios from "axios";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format, parse } from "date-fns";
import { browserName, osName, browserVersion } from "react-device-detect";

const Modal = ({ isOpen, onClose, reload, currentUser }) => {
  // const [user, setUser] = useState(currentUser);

  // useEffect(() => {
  //   setUser(currentUser);
  // }, [currentUser]);n

  const [isChecked, setIsChecked] = useState(false);
  const [status, setStatus] = useState("");
  const [userId, setUserId] = useState("");
  console.log(userId);
  const [name, setName] = useState("");
  const [nip, setNip] = useState("");
  const [email, setEmail] = useState("");
  const [noTelepon, setNoTelepon] = useState("");
  const [branch, setBranch] = useState([]);
  const [branchName, setBranchName] = useState("");
  const [superVisior, setSupervisior] = useState([]);
  const [superVisiorName, setSupervisiorName] = useState("");
  const [role, setRole] = useState([]);
  const [roleName, setRoleName] = useState();
  const numRole = parseInt(roleName);

  console.log(numRole);
  console.log(typeof numRole);

  const [startDate, setStartDate] = useState(null);
  const [tampung, setTampung] = useState(null);

  useEffect(() => {
    setUserId("");
    setName("");
    setNip("");
    setEmail("");
    setNoTelepon("");
    setIsValidEmail(true);
    setIsChecked(false);
    setStartDate(null);
  }, [onClose]);

  useEffect(() => {
    if (startDate !== null) {
      const formattedDate = format(startDate, "yyyy-MM-dd");
      setTampung(formattedDate);
    }
  }, [startDate]);

  // untuk Token yang tersimpan di session
  const sessionData = JSON.parse(localStorage.getItem("tokenData"));

  const token = sessionData;

  useEffect(() => {
    DropDown();
    DropDownSv();
    DropDownRl();
  }, [userId]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const checkBoxStyle = {
    margin: 0,
  };

  const regex1 = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

  useEffect(() => {
    if (isChecked === true) {
      setStatus("True");
    } else {
      setStatus("False");
    }
  }, [isChecked]);

  const Save = () => {
    if (
      !userId ||
      !name ||
      !nip ||
      !email ||
      !noTelepon ||
      !branchName ||
      !numRole
    ) {
      Swal.fire({
        icon: "error",
        title: "Oops... Data Tidak Boleh Kosong",
        text: "",
        footer: '<a href="">Why do I have this issue?</a>',
      });
      return;
    }
    // else if (email !== regex1) {
    //   Swal.fire({
    //     icon: "error",
    //     title: "Oops... Data Email Salah",
    //     text: "",
    //     footer: '<a href="">Why do I have this issue?</a>',
    //   });
    //   return;
    // }

    postDataLogUserTracking();
  };

  const Updateobjectdata = (val) => {
    InsertUserNew(val);
  };
  //! --------for API Create USer--------

  // const handleReload = () => {};

  const insertUser = {
    p_usrid: userId,
    p_name: name,
    p_nip: nip,
    p_email: email,
    p_notlp: noTelepon,
    p_branchcode: branchName,
    p_spv: superVisiorName,
    p_position: "SUPPORT",
    p_acclevel: numRole,
    p_efectivedate: tampung,
    p_status: status,
    p_usr: "kijang1",
    p_defaultpwd: "5fec4ba8376f207d1ff2f0cac0882b01",
    p_logid: "12",
  };

  const InsertUserNew = async (val) => {
    try {
      const userNew = await axios
        .post(
          "http://116.206.196.65:30983/skycore/User/postJDataInsertRecord",
          {
            p_usrid: userId,
            p_name: name,
            p_nip: nip,
            p_email: email,
            p_notlp: noTelepon,
            p_branchcode: branchName,
            p_spv: superVisiorName,
            p_position: "SUPPORT",
            p_acclevel: numRole,
            p_efectivedate: tampung,
            p_status: status,
            p_usr: "kijang1",
            p_defaultpwd: "5fec4ba8376f207d1ff2f0cac0882b01",
            p_logid: val,
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          // console.log(response.data.success);
          // const cek = typeof response.data.success;
          // console.log(cek);
          if (response.data.success === true) {
            Swal.fire("Save Berhasil", "", "success");
            reload();
            onClose();
          } else {
            Swal.fire(response.data.data.message, "", "error");
            // getBranchList();
            reload();
            onClose();
          }
        });

      // console.log(userNew);
      // const cekData = userNew.data.data.map((e) => {
      //   return e.message;
      // });

      // Swal.fire("Save Berhasil", "", "success");
      // reload();
      // onClose();
    } catch (error) {
      console.log(error);
      Swal.fire({
        icon: "error",
        title: "User Sudah ada",
        text: "",
        footer: '<a href="">Why do I have this issue?</a>',
      });
    }
  };

  const [ip, setIP] = useState("");
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    console.log(res.data);
    setIP(res.data.ip);
  };

  useEffect(() => {
    //passing getData method to the lifecycle method
    getData();
  }, []);

  // get userid
  const userid = JSON.parse(localStorage.getItem("userid"));

  const dataLogUserTracking = {
    plcd: "user_management",
    plusr: userid,
    plhtt: "OFF",
    plsvrn: window.location.hostname,
    plact: "Create User Management",
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
    } catch (error) {
      alert("postDataLogUserTracking Tidak Berhasil");
      console.log(error);
    }
  };

  //! dropdown ddl branch
  const hitDropdown = {
    type: "branch",
    usr: userId,
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

      // console.log(cekData);
      setBranch(cekData);
    } catch (error) {
      console.log(error);
    }
  };

  //! dropdown ddl supervisor
  const hitDropdownSv = {
    type: "supervisor",
    usr: userId,
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

  //! dropdown ddl Role
  const hitDropdownRl = {
    type: "level",
    usr: userId,
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

      console.log(cekData);
      setRole(cekData);
    } catch (error) {
      console.log(error);
    }
  };

  const dateString = "2020-09-30T00:00:00";
  const dateObject = new Date(dateString);
  console.log(dateObject);

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [disabled, setDisabled] = useState("");
  const handleChangeEmail = (event) => {
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    if (regex.test(event.target.value)) {
      setEmail(event.target.value);
      setIsValidEmail(true);
    } else {
      setEmail(event.target.value);
      setIsValidEmail(false);
      // set
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-opacity-50"
      style={{ backgroundColor: "rgb(52 52 52 / 72%)" }}>
      <div className="absolute bg-white p-6 rounded-lg shadow-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">User Add New</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="row">
                <div className="col-6">
                  <div className=" row mb-2">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        User Id <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        value={userId}
                        maxLength={25}
                        id="recipient-name"
                        onChange={(e) => setUserId(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className=" row mb-2">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Name <span className="text-danger">*</span>
                      </label>
                    </div>

                    <div className="col-9">
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        value={name}
                        onChange={(e) => {
                          const regex = /^[a-zA-Z\s]*$/;
                          if (regex.test(e.target.value)) {
                            setName(e.target.value);
                          }
                        }}
                        required
                      />
                    </div>
                  </div>
                  <div className=" row mb-2">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        NIP <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        value={nip}
                        onChange={(e) => setNip(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="row mb-2">
                    <div className="col-3">
                      <label
                        htmlFor="exampleInputEmail1"
                        className="form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="email"
                        className={`form-control ${
                          isValidEmail ? "" : "is-invalid"
                        }`}
                        id="recipient-name"
                        aria-describedby="emailHelp"
                        value={email}
                        onChange={handleChangeEmail}
                        required
                      />
                      {!isValidEmail && (
                        <div className="invalid-feedback">
                          Email is not valid.
                        </div>
                      )}
                    </div>
                  </div>
                  <div className=" row mb-2">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        No Hp <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        onChange={(e) => setNoTelepon(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                </div>
                <div className="col-6">
                  <div className=" row mb-2">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Branch <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-9">
                      <select
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        onChange={(e) => setBranchName(e.target.value)}
                        required>
                        {branch.map((item, i) => {
                          return (
                            <option value={item.namevalue} key={i}>
                              {item.nameview}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className=" row mb-2">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Supervisior Name
                      </label>
                    </div>
                    <div className="col-9">
                      <select
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        onChange={(e) => setSupervisiorName(e.target.value)}>
                        {superVisior.map((item, i) => {
                          return (
                            <option value={item.namevalue} key={i}>
                              {item.nameview}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className=" row mb-2">
                    <div className="col-3">
                      <label for="exampleInputEmail1" className="form-label">
                        Role <span className="text-danger">*</span>
                      </label>
                    </div>

                    <div className="col-9">
                      <select
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        onChange={(e) => setRoleName(e.target.value)}
                        required>
                        {role.map((item, i) => {
                          return (
                            <option value={item.namevalue} key={i}>
                              {item.nameview}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className=" row mb-2" style={{ display: "none" }}>
                    <div className="col-3">
                      <label for="exampleInputEmail1" className="form-label">
                        Status
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        className="form-check-input mt-0 bg-primary"
                        type="checkbox"
                        style={checkBoxStyle}
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                    </div>
                  </div>
                  <div className=" row mb-2">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Effectived Date
                      </label>
                    </div>
                    <div className="col-9">
                      <DatePicker
                        className="form-control"
                        selected={startDate}
                        onChange={(date) => setStartDate(date)}
                        dateFormat="yyyy/MM/dd"
                      />
                    </div>
                  </div>
                  {/* {isChecked ? (
                    <div className=" row mb-2">
                      <div className="col-3">
                        <label for="exampleInputEmail1" class="form-label">
                          Effectived Date
                        </label>
                      </div>
                      <div className="col-9">
                        <DatePicker
                          className="form-control"
                          selected={startDate}
                          onChange={(date) => setStartDate(date)}
                          dateFormat="yyyy/MM/dd"
                        />
                      </div>
                    </div>
                  ) : (
                    <></>
                  )} */}
                </div>
              </div>
            </form>
          </div>
          <div className="modal-footer ">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}>
              Close
            </button>
            <button type="submit" className="btn btn-primary" onClick={Save}>
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
