import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../API/api";
import $ from "jquery";
import "../assets/css/modal.css";

const ModalAddRole = ({ isOpen, onClose, reload }) => {
  const [isChecked, setIsChecked] = useState(false);
  const [isStatusChecked, setIsStatusChecked] = useState(false);
  const [isStatus, setIsStatus] = useState(false);
  const [roleid, setidRole] = useState("");
  const [name, setNameRole] = useState("");
  const [desc, setDescRole] = useState("");
  const [ctgry, setListCategory] = useState("");
  const [ctgrydtl, setListCtgrDtl] = useState("");
  const [token, setToken] = useState();
  const [activeUsers, setActiveUsers] = useState([]);
  const [clickButton, setclickButton] = useState("");

  //token
  const getTokenApi = () => {
    getToken().then((e) => {
      setToken(e);
    });
  };

  const listCategory = async () => {
    try {
      const listctagory = await axios.post(
        "http://localhost:30983/skycore/role/category/list",
        {
          role_id: "1",
          modules: "CORE",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const cekData = listctagory.data.data.map((e) => {
        return e;
      });

      setListCategory(cekData);
      console.log("6446");
      console.log(cekData);
    } catch (errorUser) {
      console.log(errorUser);
    }
  };

  const listCategoryDetail = async (masterid, id) => {
    //const listCategoryDetail = async () => {

    try {
      const listctagorydetail = await axios
        .post(
          "http://localhost:30983/skycore/role/category/detail",
          {
            role_id: id,
            role_master_id: [masterid],
            modules: "CORE",
          },

          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        )
        .then((response) => {
          console.log("1234");
          console.log(response.data.data);
          if (response.data.status === "true") {
            setListCtgrDtl(response.data.data);
            //ObjCategoryDetail(response.data.data);
          }
        });
      //   const cekData = listctagorydetail.data.data.map((e) => {
      //   return e;

      // });
      //   console.log("1234");
      //   console.log(cekData);
      // // setListCtgrDtl(cekData);

      // ObjCategoryDetail();
    } catch (errorUser) {
      console.log(errorUser);
    }
  };

  useEffect(() => {
    getTokenApi();
    setidRole("");
    setDescRole("");
    listCategory();
    //listCategoryDetail();
  }, [onClose]);

  const handleCheckboxChange = (id) => {
    let xx = parseInt($("#btnCategory_" + id).val());
    if (xx === id) {
      setIsChecked(!isChecked);
    } else {
      setIsChecked(false);
    }
    // ObjectParents(val);
  };

  const styletbl = {
    main: {
      boxshadow: "none",
      border: "solid thin #ddd",
    },
  };

  const findChild = (a, id) => {
    console.log("test");
    console.log(a);
    console.log(id);

    let stsmaster = $("#" + a).is(":checked");
    if (stsmaster === true) {
      $("#" + a).prop("checked", true);
    } else {
      $("#" + a).prop("checked", false);
    }

    listCategoryDetail(a, id);
    setTimeout(() => {
      console.log("delay");
      setIsStatus(true);
      ObjCategoryDetail(a);
    }, 5000);
  };

  const ObjCategoryDetail = (id) => {
    console.log("testdtl");
    console.log(ctgrydtl);
    //let stsmaster = $('#' + id).is(":checked")

    return (
      <tbody id="bodyContent" className="font-light border-b">
        {ctgrydtl.map((item, p) => {
          if (ctgrydtl[p].rlm_is_action === true) {
            return (
              <tr key={p}>
                <td
                  style={{ width: "30%" }}
                  className="py-0 px-2 text-left"
                ></td>
                <td style={{ width: "40%" }} className="py-0 px-2 text-left">
                  {ctgrydtl[p].rlm_name}
                </td>
                <td style={{ width: "10%" }} className="py-0 px-2 text-center">
                  <input
                    type="checkbox"
                    name="txtMasterId"
                    id="category"
                    value={ctgrydtl[p].rlm_id}
                    disabled=""
                  />
                </td>
                <td style={{ width: "20%" }} className="py-0 px-2 text-left">
                  {ctgrydtl[p].rlm_name}
                </td>
              </tr>
            );
          } else {
            return (
              <tr key={p}>
                <td style={{ width: "30%" }} className="py-0 px-2 text-left">
                  {ctgrydtl[p].rlm_name}
                </td>
                <td style={{ width: "40%" }} className="py-0 px-2 text-left">
                  {ctgrydtl[p].rlm_name}
                </td>
                <td style={{ width: "10%" }} className="py-0 px-2"></td>
                <td style={{ width: "20%" }} className="py-0 px-2"></td>
              </tr>
            );
          }
        })}
      </tbody>
    );
  };

  const ObjectParents = (val) => {
    // console.log("asas");
    // console.log(val);

    return (
      <div>
        {ctgry.map((item, x) => {
          let objMenu = ctgry;

          if (ctgry[x].rlm_parentid === 2) {
            // if (objMenu[i].rlm_id == ctgry[x].rlm_parentid)
            // {
            return (
              <ul className="flex justify-start px-10 pt-2">
                <li>
                  <div class="flex items-center">
                    <input
                      type="checkbox"
                      //checked={isChecked1}
                      //onChange={handleCheckboxChange1}
                      class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                    />
                    <label
                      for="checked-checkbox"
                      class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                    >
                      {ctgry[x].rlm_name}
                    </label>
                  </div>
                </li>
              </ul>
            );
            //}
          } else {
            <></>;
          }
        })}
      </div>
    );
  };
  console.log(ctgrydtl);
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-dialog modal-dialog-scrollable modal-xl w-10/12 mr-10">
        <div className="modal-content" style={{ width: "1000px" }}>
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Role Management | Add New</h5>
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
              <div className=" row mb-12">
                <div className="col-3">
                  <label class="form-label">
                    Name <span className="text-danger">*</span>
                  </label>
                </div>
                <div className="col-9">
                  <input
                    type="text"
                    value={name}
                    className="form-control"
                    maxLength={25}
                    id="recipient-name"
                    onChange={(x) => setNameRole(x.target.value)}
                    required
                  />
                </div>
              </div>
              <div className=" row mb-12">
                <div className="col-3">
                  <label for="exampleInputAddress" class="form-label">
                    Description
                  </label>
                </div>
                <div className="col-9">
                  <textarea
                    rows={2}
                    cols={2}
                    className="form-control"
                    id="txtname"
                    name="txtname"
                    value={desc}
                    onChange={(x) => setDescRole(x.target.value)}
                  />
                </div>
              </div>

              <div className="row mb-2">
                <div className="col-3">
                  <label for="exampleInputAddress" class="form-label">
                    Status
                  </label>
                </div>
                <div className="col-8">
                  <input
                    className="mr-2 mt-[0.3rem] h-3.5 w-10 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-success checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-success checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-success checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-success dark:checked:after:bg-success dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    value=""
                  />
                </div>
              </div>
            </form>

            <div className="main" style={styletbl.main}>
              <div className="row mb-4">
                <div className="col-md-4">
                  <fieldset
                    className="scheduler-border"
                    style={{ padding: "0px" }}
                  >
                    <ul className="space-y-2 font-medium">
                      {ctgry.map((item, i) => {
                        if (ctgry[i].rlm_parentid === 0) {
                          return (
                            <li>
                              {/* <div class="flex items-center"> */}
                              <button
                                id={"btnCategory_" + ctgry[i].rlm_id}
                                name={"btnCategory_" + ctgry[i].rlm_id}
                                value={ctgry[i].rlm_id}
                                onClick={() =>
                                  handleCheckboxChange(ctgry[i].rlm_id)
                                }
                                style={
                                  isChecked
                                    ? { transform: "rotate(80deg)" }
                                    : { transform: "rotate(0deg)" }
                                }
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                  className="w-5 h-5"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>

                              <input
                                type="checkbox"
                                id={ctgry[i].rlm_id}
                                name="chkCategory"
                                value={ctgry[i].rlm_id}
                                //checked={isStatusChecked}
                                onChange={(event) =>
                                  findChild(event.target.value, "-1")
                                }
                                className="child-idc"
                              />
                              <label
                                for="checked-checkbox"
                                class=" ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                              >
                                {ctgry[i].rlm_name}
                              </label>

                              {isChecked ? (
                                // CALL OBJECT PARENT
                                // <div>
                                //     <ObjectParents />
                                // </div>
                                <div>
                                  {ctgry.map((item, x) => {
                                    console.log("asas");
                                    if (ctgry[x].rlm_parentid !== 0) {
                                      if (
                                        ctgry[i].rlm_id ===
                                        ctgry[x].rlm_parentid
                                      ) {
                                        return (
                                          <ul className="flex justify-start px-10 pt-2">
                                            <li>
                                              <div class="flex items-center">
                                                <input
                                                  type="checkbox"
                                                  id={ctgry[x].rlm_id}
                                                  name="chkCategory"
                                                  value={ctgry[x].rlm_id}
                                                  //checked={isChecked1}
                                                  onChange={(event) =>
                                                    findChild(
                                                      event.target.value,
                                                      "-1"
                                                    )
                                                  }
                                                  className="child-idc"
                                                />
                                                <label
                                                  for="checked-checkbox"
                                                  class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                                >
                                                  {ctgry[x].rlm_name}
                                                </label>
                                              </div>
                                            </li>
                                          </ul>
                                        );
                                      }
                                    } else {
                                      <></>;
                                    }
                                  })}
                                </div>
                              ) : (
                                <></>
                              )}

                              {/* </div> */}
                            </li>
                          );
                        }
                      })}
                    </ul>
                  </fieldset>
                </div>
                <div className="col-md-8">
                  <fieldset
                    className="scheduler-border"
                    style={{ padding: "10px" }}
                  >
                    <div id="getContentByCategory">
                      <table
                        className="table-bordered table-striped"
                        id="tblContent"
                        style={{ textAlign: "right" }}
                      >
                        <thead>
                          <tr>
                            <th className="py-0 px-4">Category</th>
                            <th className="py-0 px-4">Permission</th>
                            <th className="py-0 px-4 text-center">Status</th>
                            <th className="py-0 px-4">Description</th>
                          </tr>
                        </thead>

                        {isStatus ? (
                          <ObjCategoryDetail />
                        ) : (
                          // <tbody id="bodyContent" className="font-light border-b">
                          // {ctgrydtl.map((dtl) => {
                          //     console.log(dtl);
                          //     console.log("aaaaa");
                          //     <tr>
                          //         <td className="text-left font-semibold">{dtl.rlm_name}</td>
                          //         <td className="text-left font-semibold">{dtl.rlm_name}</td>
                          //         <td className="text-left font-semibold">{dtl.rlm_name}</td>
                          //         <td className="text-left font-semibold">{dtl.rlm_name}</td>
                          //     </tr>
                          // })}
                          //  </tbody>
                          <></>
                        )}
                      </table>
                    </div>
                  </fieldset>
                </div>
              </div>
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
            <button
              type="button"
              className="btn btn-primary"
              //   onClick={InsertUserNew}
            >
              Save Changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalAddRole;
