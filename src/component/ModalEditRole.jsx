import React, { useState, useEffect } from "react";
import axios from "axios";
import { getToken } from "../API/api";
import $ from "jquery";
import "../assets/css/modal.css";


const ModalEditRole = ({ isOpen, onClose, reload, currentUser }) => {
  const [isChecked, setIsChecked] = useState(false);

  //token
  const getTokenApi = async () => {
    const token = await getToken();
    setToken(token);
  };

  const listCategory = async () => {
    try {
      const response = await axios.post(
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

      const cekData = response.data.data.map((e) => e);

      setListCategory(cekData);
      console.log("6446");
      console.log(cekData);
    } catch (errorUser) {
      console.log(errorUser);
    }
  };

  const listCategoryDetail = async (masterid, id) => {
    try {
      const response = await axios.post(
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
      );

      console.log("1234");
      console.log(response.data.data);
      if (response.data.status === "true") {
        setListCtgrDtl(response.data.data);
      }
    } catch (errorUser) {
      console.log(errorUser);
    }
  };

  useEffect(() => {
    getTokenApi();
    setidRole("");
    setDescRole("");
    listCategory();
  }, [onClose]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
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
              <div className="mb-2">
                <label
                  for="name"
                  className="block text-gray-700 text-sm font-bold mb-2"
                >
                  Name
                </label>
                <input type="text" id="name" className="form-control" />
              </div>
              <div class="mb-2">
                <label
                  for="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <input type="text" id="description" className="form-control" />
              </div>
              <div className="mb-2">
                <input
                  className="mr-2 mt-[0.3rem] h-3.5 w-8 appearance-none rounded-[0.4375rem] bg-neutral-300 before:pointer-events-none before:absolute before:h-3.5 before:w-3.5 before:rounded-full before:bg-transparent before:content-[''] after:absolute after:z-[2] after:-mt-[0.1875rem] after:h-5 after:w-5 after:rounded-full after:border-none after:bg-neutral-100 after:shadow-[0_0px_3px_0_rgb(0_0_0_/_7%),_0_2px_2px_0_rgb(0_0_0_/_4%)] after:transition-[background-color_0.2s,transform_0.2s] after:content-[''] checked:bg-primary checked:after:absolute checked:after:z-[2] checked:after:-mt-[3px] checked:after:ml-[1.0625rem] checked:after:h-5 checked:after:w-5 checked:after:rounded-full checked:after:border-none checked:after:bg-primary checked:after:shadow-[0_3px_1px_-2px_rgba(0,0,0,0.2),_0_2px_2px_0_rgba(0,0,0,0.14),_0_1px_5px_0_rgba(0,0,0,0.12)] checked:after:transition-[background-color_0.2s,transform_0.2s] checked:after:content-[''] hover:cursor-pointer focus:outline-none focus:ring-0 focus:before:scale-100 focus:before:opacity-[0.12] focus:before:shadow-[3px_-1px_0px_13px_rgba(0,0,0,0.6)] focus:before:transition-[box-shadow_0.2s,transform_0.2s] focus:after:absolute focus:after:z-[1] focus:after:block focus:after:h-5 focus:after:w-5 focus:after:rounded-full focus:after:content-[''] checked:focus:border-primary checked:focus:bg-primary checked:focus:before:ml-[1.0625rem] checked:focus:before:scale-100 checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca] checked:focus:before:transition-[box-shadow_0.2s,transform_0.2s] dark:bg-neutral-600 dark:after:bg-neutral-400 dark:checked:bg-primary dark:checked:after:bg-primary dark:focus:before:shadow-[3px_-1px_0px_13px_rgba(255,255,255,0.4)] dark:checked:focus:before:shadow-[3px_-1px_0px_13px_#3b71ca]"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  value=""
                />
                <label
                  class="inline-block pl-[0.15rem] hover:cursor-pointer"
                  for="flexSwitchCheckDefault"
                >
                  Status
                </label>
              </div>

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
