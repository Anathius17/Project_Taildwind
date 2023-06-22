import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../API/api";
import $ from "jquery";
import Swal from "sweetalert2";
import "../assets/css/modal.css";
import { browserName, osName, browserVersion } from "react-device-detect";

const ModalEditRole = ({ isOpen, onClose, reload, currentRole }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isStatusChecked, setIsStatusChecked] = useState(false);
  const [isStatus, setIsStatus] = useState(false);
  const [roleid, setroleid] = useState(currentRole);
  const [name, setNameRole] = useState("");
  const [desc, setDescRole] = useState("");
  const [stats, setStatsRole] = useState(false);
  const [ctgrydtl, setListCtgrDtl] = useState([]);
  const [activeUsers, setActiveUsers] = useState([]);
  const [clickButton, setclickButton] = useState("");
  const [checkedRoleIds, setCheckedRoleIds] = useState([]);
  const [updatedCheckedRoleIds, setUpdatedCheckedRoleIds] = useState([]);

  const sessionData = JSON.parse(localStorage.getItem("tokenData"));
  const userid = JSON.parse(localStorage.getItem("userid"));
  console.log(userid);

  const token = sessionData;
  useEffect(() => {
    if (token && token.map !== "") {
      getListCategoryDetail();
    }
  }, [token]);

  useEffect(() => {
    setroleid(currentRole);
  }, [currentRole]);

  const handleInputChange = (event) => {
    const { name, value, type, checked } = event.target;
    const newValue = type === "checkbox" ? !checked : value;

    setroleid((prevState) => ({
      ...prevState,
      [name]: newValue,
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
    plcd: "role_management",
    plusr: userid,
    plhtt: "OFF",
    plsvrn: window.location.hostname,
    plact: "Update Role Management",
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

  const Updateobjectdata = (val) => {
    UpdateRoleNew(val);
  };
  const Submit = () => {
    postDataLogUserTracking();
  };

  const getListCategoryDetail = async () => {
    try {
      const body = {
        role_id: "-1",
      };

      const listCategoryDetail = await axios.post(
        "http://116.206.196.65:30983/skycore/role/category/detail/v2",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const updatedListCategoryDetail = listCategoryDetail.data.data.map(
        (item) => {
          const updatedDetail = item.detail.map((detailItem) => {
            const updatedChild = detailItem.child.map((childItem) => ({
              ...childItem,
              is_checked: false,
            }));
            return {
              ...detailItem,
              is_checked: false,
              child: updatedChild,
            };
          });
          return {
            ...item,
            is_checked: false,
            detail: updatedDetail,
          };
        }
      );

      setListCtgrDtl(updatedListCategoryDetail);
    } catch (error) {
      console.log(error);
    }
  };

  const UpdateRoleNew = async (val) => {
    if (
      !roleid.rl_id ||
      !roleid.rl_name ||
      !roleid.rl_description ||
      !roleid.rl_status ||
      !checkedValues
    ) {
      Swal.fire("Please completed all fields", "", "error");
      return;
    }
    try {
      await axios
        .post(
          "http://116.206.196.65:30983/skycore/role/update",
          {
            role_id: roleid.rl_id,
            action_by: userid,
            log_id: val,
            role_name: roleid.rl_name,
            role_description: roleid.rl_description,
            role_status: roleid.rl_status,
            update_log_id: val,
            update_role_master_id: checkedValues,
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

      reload();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleCheckboxChange = (item) => {
    setListCtgrDtl((prevCtgrydtl) => {
      const updatedCtgrydtl = prevCtgrydtl.map((ctgry) => {
        if (ctgry.rlm_id === item.rlm_id) {
          return {
            ...ctgry,
            is_checked: !ctgry.is_checked, // Toggle the checked status
          };
        }
        const updatedDetail = ctgry.detail.map((detailItem) => {
          if (detailItem.rlm_id === item.rlm_id) {
            return {
              ...detailItem,
              is_checked: !detailItem.is_checked, // Toggle the checked status
            };
          }
          const updatedChild = detailItem.child.map((childItem) => {
            if (childItem.rlm_id === item.rlm_id) {
              return {
                ...childItem,
                is_checked: !childItem.is_checked, // Toggle the checked status
              };
            }
            return childItem;
          });
          return {
            ...detailItem,
            child: updatedChild,
          };
        });
        return {
          ...ctgry,
          detail: updatedDetail,
        };
      });

      const checkedRoleIds = updatedCtgrydtl.reduce((acc, ctgry) => {
        if (ctgry.is_checked) {
          acc.push(ctgry.rlm_id);
        }
        ctgry.detail.forEach((detailItem) => {
          if (detailItem.is_checked) {
            acc.push(detailItem.rlm_id);
          }
          detailItem.child.forEach((childItem) => {
            if (childItem.is_checked) {
              acc.push(childItem.rlm_id);
            }
          });
        });
        return acc;
      }, []);

      const updatedRoleid = {
        ...roleid,
        action: roleid.action.map((action) => {
          if (action.rlm_id === item.rlm_id) {
            return {
              ...action,
              is_checked: !action.is_checked,
            };
          }
          return action;
        }),
      };

      const updatedCheckedRoleIds = updatedRoleid.action.reduce(
        (acc, action) => {
          if (action.is_checked) {
            acc.push(action.rlm_id);
          }
          return acc;
        },
        checkedRoleIds
      );

      setUpdatedCheckedRoleIds(updatedCheckedRoleIds);
      setroleid(updatedRoleid);

      return updatedCtgrydtl;
    });
  };

  // Contoh untuk mendapatkan nilai-nilai checkbox yang sudah dicentang
  const checkedValues = roleid.action
    .filter((action) => action.is_checked)
    .map((action) => action.rlm_id);

  console.log(checkedValues);

  useEffect(() => {
    getListCategoryDetail();
  }, []);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-dialog modal-dialog-scrollable modal-xl w-10/12 mr-10">
        <div className="modal-content" style={{ width: "1000px" }}>
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Role Edit</h5>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">
                  Name <span className="text-danger">*</span>
                </label>
                <input
                  type="text"
                  value={roleid?.rl_name || ""}
                  className="form-control"
                  maxLength={25}
                  id="recipient-name"
                  name="rl_name" // Remove the "roleid." prefix
                  onChange={handleInputChange}
                  required
                  readOnly
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Description</label>
                <textarea
                  rows={2}
                  cols={2}
                  className="form-control"
                  id="txtname"
                  name="rl_description" // Remove the "roleid." prefix
                  value={roleid?.rl_description || ""}
                  onChange={handleInputChange}
                />
              </div>

              <div className="row mb-2">
                <div className="col-3">
                  <label htmlFor="exampleInputAddress" className="form-label">
                    Status
                  </label>
                </div>
                <input
                  className="mr-2 mt-[0.3rem] h-3.5 w-10 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-success checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-success checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-success checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-success dark:checked:after:bg-success dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  name="rl_status" // Remove the "roleid." prefix
                  checked={roleid?.rl_status || false}
                  onChange={handleInputChange}
                />
              </div>
            </form>
            <div className="main">
              <table className="w-full overflow-auto table-bordered">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Details</th>
                    <th>Child</th>
                  </tr>
                </thead>
                <tbody>
                  {ctgrydtl.map((item) => (
                    <React.Fragment key={item.rlm_id}>
                      <tr>
                        <td>
                          <div className="form-check">
                            <input
                              type="checkbox"
                              id={item.rlm_id}
                              name="chkCategory"
                              value={item.rlm_id}
                              className="form-check-input"
                              checked={roleid.action.some(
                                (action) =>
                                  action.rlm_id === item.rlm_id &&
                                  action.is_checked
                              )}
                              onChange={() => handleCheckboxChange(item)}
                            />
                            <label
                              htmlFor={item.rlm_id}
                              className="form-check-label"
                            >
                              {item.rlm_name}
                            </label>
                          </div>
                        </td>
                        <td></td>
                        <td></td>
                      </tr>
                      {item.detail.map((detailItem) => (
                        <React.Fragment key={detailItem.rlm_id}>
                          <tr>
                            <td></td>
                            <td>
                              <div className="form-check">
                                <input
                                  type="checkbox"
                                  id={detailItem.rlm_id}
                                  name="chkCategoryParent"
                                  value={detailItem.rlm_id}
                                  className="form-check-input"
                                  checked={roleid.action.some(
                                    (action) =>
                                      action.rlm_id === detailItem.rlm_id &&
                                      action.is_checked
                                  )}
                                  onChange={() =>
                                    handleCheckboxChange(detailItem)
                                  }
                                />
                                <label
                                  htmlFor={detailItem.rlm_id}
                                  className="form-check-label"
                                >
                                  {detailItem.rlm_name}
                                </label>
                              </div>
                            </td>
                            <td></td>
                          </tr>
                          {detailItem.child.map((childItem) => (
                            <tr key={childItem.rlm_id}>
                              <td></td>
                              <td></td>
                              <td>
                                <div className="form-check">
                                  <input
                                    type="checkbox"
                                    id={childItem.rlm_id}
                                    name="chkCategoryChild"
                                    value={childItem.rlm_id}
                                    className="form-check-input"
                                    checked={roleid.action.some(
                                      (action) =>
                                        action.rlm_id === childItem.rlm_id &&
                                        action.is_checked
                                    )}
                                    onChange={() =>
                                      handleCheckboxChange(childItem)
                                    }
                                  />
                                  <label
                                    htmlFor={childItem.rlm_id}
                                    className="form-check-label"
                                  >
                                    {childItem.rlm_name}
                                  </label>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </React.Fragment>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
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
            <button type="button" className="btn btn-primary" onClick={Submit}>
            Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditRole;
