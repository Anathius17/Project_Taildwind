import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../API/api";
import $ from "jquery";
import "../assets/css/modal.css";

const ModalEditRole = ({ isOpen, onClose, reload, currentUser }) => {
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

  if (!isOpen) return null;
  return (
    <div class="fixed inset-0 flex items-center justify-end z-50 bg-white">
      <div class="absolute bg-white p-6 rounded-lg shadow-lg w-10/12 mr-10">
        <div className="modal_content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Role Add New</h5>
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
            <div className="flex w-full max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-start px-4 pt-4">
                <ul className="space-y-2 font-medium">
                  <li>
                    <li>
                      <div class="flex flex-col items-center">
                        <div class="flex items-center mb-4">
                          <input
                            type="checkbox"
                            class="appearance-none border-4 border-sky-500 checked:bg-blue-500 ..."
                          />
                          <label
                            for="default-checkbox"
                            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Default checkbox
                          </label>
                        </div>
                        <div class="flex items-center">
                          <input
                            type="checkbox"
                            class="appearance-none border-4 border-sky-500 checked:bg-blue-500 ..."
                          />
                          <label
                            for="checked-checkbox"
                            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Checked state
                          </label>
                        </div>
                        <div class="flex items-center">
                          <input
                            type="checkbox"
                            class="appearance-none border-4 border-sky-500 checked:bg-blue-500 ..."
                          />
                          <label
                            for="checked-checkbox"
                            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Checked state
                          </label>
                        </div>
                        <div class="flex items-center">
                          <input
                            type="checkbox"
                            class="appearance-none border-4 border-sky-500 checked:bg-blue-500 ..."
                          />
                          <label
                            for="checked-checkbox"
                            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Checked state
                          </label>
                        </div>
                        <div class="flex items-center">
                          <input
                            type="checkbox"
                            class="appearance-none border-4 border-sky-500 checked:bg-blue-500 ..."
                          />
                          <label
                            for="checked-checkbox"
                            class="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                          >
                            Checked state
                          </label>
                        </div>
                      </div>
                    </li>
                  </li>
                  <li>
                    <div class="flex items-center"></div>
                  </li>
                </ul>
              </div>

              <div className="flex justify-start px-4 pt-4">
                {/* {isChecked ? <h1>Hallo Grasia</h1> : <></>} */}
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
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditRole;
