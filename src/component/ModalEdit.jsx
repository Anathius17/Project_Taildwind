import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import axios from "axios";
import { getToken } from "../API/api";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { format } from "date-fns";
import { BiReset } from "react-icons/bi";
import md5 from "js-md5";
const Modal = ({
  isOpen,
  onClose,
  currentUser,
  dropdownBranch,
  dropdownSN,
  dropdownRole,
  reload,
}) => {
  const [token, setToken] = useState();
  const [users, setUser] = useState(currentUser);
  const [isChecked, setIsChecked] = useState(false);
  const [status, setStatus] = useState("");
  const [password, setPassword] = useState("");
  const pass = md5(password);
  const [passwordMd5, setPasswordMd5] = useState(pass);
  const passwordDefult = "5fec4ba8376f207d1ff2f0cac0882b01";

  console.log(password);
  console.log(passwordMd5);
  console.log(pass);

  useEffect(() => {
    if (password === "" || password === null) {
      setPasswordMd5("");
    }
  }, [password]);

  useEffect(() => {
    setPasswordMd5("");
  }, [onClose]);

  const isCheckedFrist = users.usrstatus;
  console.log(isCheckedFrist);
  console.log(isChecked);
  const [branch, setBranch] = useState(dropdownBranch);
  const [superVisior, setSupervisior] = useState(dropdownSN);
  const [role, setRole] = useState(dropdownRole);
  const [startDate, setStartDate] = useState(null);

  const initialDateString = users.usrefectivedate;
  useEffect(() => {
    if (initialDateString) {
      const initialDate = new Date(initialDateString);
      setStartDate(initialDate);
    }
  }, [initialDateString]);

  const handleDateChange = (date) => {
    setStartDate(date);
  };

  useEffect(() => {
    if (isCheckedFrist === 1) {
      setIsChecked(true);
    } else if (isCheckedFrist === 0) {
      setIsChecked(false);
    }
  }, [users]);

  useEffect(() => {
    if (isChecked === true) {
      setStatus("True");
    } else {
      setStatus("False");
    }
  }, [isChecked]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const [tampungDate, settampungDate] = useState(users.usrefectivedate);
  var [tanggalString, settanggalString] = useState(tampungDate);
  var tanggal = new Date(tanggalString);
  console.log(tanggal);

  useEffect(() => {
    settanggalString(tampungDate);
  }, [tampungDate]);

  const getTokenApi = () => {
    getToken().then((e) => {
      setToken(e);
    });
  };

  useEffect(() => {
    getTokenApi();
    setUser(currentUser);
  }, [currentUser]);

  console.log(users.usruserid);

  // useEffect(() => {
  //   DropDown();
  //   DropDownSv();
  //   DropDownRl();
  // }, [users]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const dataEditUser = {
    p_usrid: users.usruserid,
    p_name: users.usrname,
    p_nip: users.usrnip,
    p_email: users.usremail,
    p_notlp: users.usrnotlp,
    p_branchcode: users.usrbranch,
    p_spv: users.usrsupervisor,
    p_position: "area",
    p_acclevel: users.usraccesslevel,
    p_efectivedate: startDate,
    p_status: status,
    p_usr: "bani",
    p_defaultpwd: passwordMd5,
    p_logid: "13",
  };

  const Submit = () => {
    EditUser();
  };
  const EditUser = async () => {
    if (!users.usrname || !users.usrnip) {
      Swal.fire("Mohon lengkapi semua field", "", "error");
      return;
    }
    try {
      await axios.post(
        "http://116.206.196.65:30983/skycore/User/postJDataEditRecord",
        dataEditUser,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      Swal.fire("Save Berhasil", "", "success");

      reload();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const checkBoxStyle = {
    margin: 0,
  };

  if (!isOpen) return null;
  return (
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute bg-white p-6 rounded-lg shadow-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">User Edit</h5>
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
                  {" "}
                  <div className=" row mb-1">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        User Id
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        name="usruserid"
                        value={users.usruserid}
                        onChange={handleInputChange}
                        disabled
                        // onChange={(e) => setUserId(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Name <span className="text-danger">*</span>
                      </label>
                    </div>

                    <div className="col-9">
                      <input
                        type="text"
                        className="form-control"
                        value={users.usrname}
                        name="usrname"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className=" row mb-1">
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
                        value={users.usrnip}
                        name="usrnip"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Email <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="form-control"
                        value={users.usremail}
                        name="usremail"
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        No Tlp <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        value={users.usrnotlp}
                        name="usrnotlp"
                        onChange={handleInputChange}
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
                        name="usrbranch"
                        value={users.usrbranch}
                        onChange={handleInputChange}>
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
                  <div className=" row mb-1">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Supervisor Name
                      </label>
                    </div>
                    <div className="col-9">
                      <select
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        name="usrsupervisor"
                        value={users.usrsupervisor}
                        onChange={handleInputChange}>
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
                  <div className=" row mb-1">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Role <span className="text-danger">*</span>
                      </label>
                    </div>
                    <div className="col-9">
                      <select
                        type="text"
                        required
                        className="form-control"
                        id="recipient-name"
                        name="usraccesslevel"
                        value={users.usraccesslevel}
                        onChange={handleInputChange}>
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
                  <div className=" row mb-1">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Status
                      </label>
                    </div>
                    <div className="col-9">
                      <input
                        class="form-check-input mt-0"
                        type="checkbox"
                        style={checkBoxStyle}
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                      />
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Effective Date
                      </label>
                    </div>
                    <div className="col-9">
                      <DatePicker
                        className="form-control"
                        selected={startDate}
                        name="usrefectivedate"
                        // onChange={handleInputChange}
                        onChange={handleDateChange}
                        dateFormat="yyyy/MM/dd"

                        // onChange={(date) => setStartDate(date)}
                      />
                    </div>
                  </div>

                  <div className=" row mb-1">
                    <div className="col-3">
                      <label for="exampleInputEmail1" class="form-label">
                        Password
                      </label>
                    </div>
                    <div className="col-9 input-group">
                      <input
                        type="password"
                        className="form-control"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <button
                        type="button"
                        onClick={() => setPasswordMd5(passwordDefult)}
                        className="px-4 py-2 text-sm font-medium text-gray-900 bg-transparent border border-gray-900 rounded-r-md hover:bg-gray-900 hover:text-white focus:z-10 focus:ring-2 focus:ring-gray-500 focus:bg-gray-900 focus:text-white dark:border-white dark:text-white dark:hover:text-white dark:hover:bg-gray-700 dark:focus:bg-gray-700">
                        <BiReset />
                      </button>
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
              onClick={onClose}>
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

export default Modal;
