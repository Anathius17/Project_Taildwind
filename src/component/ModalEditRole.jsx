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
  // const [ctgry, setListCategory] = useState("");
  const [ctgrydtl, setListCtgrDtl] = useState([]);
  // const [token, setToken] = useState();
  const [activeUsers, setActiveUsers] = useState([]);
  const [clickButton, setclickButton] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);

  const sessionData = JSON.parse(localStorage.getItem("tokenData"));

  const token = sessionData;
  useEffect(() => {
    if (token && token.map !== "") {
      getListCategoryDetail();
    }
  }, [token]);

  const getListCategoryDetail = async (id) => {
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

      const cekData = listCategoryDetail.data.data.map((e) => {
        return e;
      });

      setListCtgrDtl(cekData);
    } catch (errorusers) {
      console.log(errorusers);
    }
  };

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute bg-white p-6 rounded-lg shadow-lg overflow-y-auto max-h-full w-10/12 modal-xl">
        <div className="modal_content">
          <div className="modal-header">
            <h5 className="modal-title fw-bold">Role Add New</h5>
          </div>
          <div className="modal-body">
            <form>
              <div className="mb-3">
                <label className="form-label">
                  Name <span className="text-danger">*</span>
                </label>
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
              <div className="mb-3">
                <label className="form-label">Description</label>
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

              <div className="mb-3">
                <label className="form-label">Status</label>
                <div className="form-check form-switch">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    role="switch"
                    id="flexSwitchCheckDefault"
                    value=""
                  />
                  <label
                    className="form-check-label"
                    htmlFor="flexSwitchCheckDefault"
                  >
                    Active
                  </label>
                </div>
              </div>
            </form>
            <div className="main">
            <table className="w-full overflow-auto">
                <thead>
                  <tr>
                    <th>Category</th>
                    <th>Details</th>
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
                              checked={item.is_checked}
                              onChange={() => {
                                const updatedCtgrydtl = ctgrydtl.map(
                                  (ctgry) => {
                                    if (ctgry.rlm_id === item.rlm_id) {
                                      return {
                                        ...ctgry,
                                        is_checked: !ctgry.is_checked,
                                      };
                                    }
                                    return ctgry;
                                  }
                                );
                                setListCtgrDtl(updatedCtgrydtl);
                                if (
                                  !selectedCategory ||
                                  selectedCategory.rlm_id !== item.rlm_id
                                ) {
                                  setSelectedCategory(item);
                                } else {
                                  setSelectedCategory(null);
                                }
                              }}
                            />
                            <label
                              htmlFor={item.rlm_id}
                              className="form-check-label"
                            >
                              {item.rlm_name}
                            </label>
                          </div>
                        </td>
                        <td>
                          {selectedCategory &&
                            selectedCategory.rlm_id === item.rlm_id && (
                              <ul>
                                {item.detail.map((detailItem) => (
                                  <li key={detailItem.rlm_id}>
                                    <div className="form-check">
                                      <input
                                        type="checkbox"
                                        id={detailItem.rlm_id}
                                        name="chkCategoryParent"
                                        value={detailItem.rlm_id}
                                        className="form-check-input"
                                        checked={detailItem.is_checked}
                                        onChange={() => {
                                          const updatedCtgrydtl = ctgrydtl.map(
                                            (ctgry) => {
                                              if (
                                                ctgry.rlm_id === item.rlm_id
                                              ) {
                                                const updatedDetail =
                                                  ctgry.detail.map((detail) => {
                                                    if (
                                                      detail.rlm_id ===
                                                      detailItem.rlm_id
                                                    ) {
                                                      const updatedChild =
                                                        detail.child.map(
                                                          (child) => {
                                                            if (
                                                              child.rlm_parentid ===
                                                              detailItem.rlm_id
                                                            ) {
                                                              return {
                                                                ...child,
                                                                is_checked:
                                                                  !detailItem.is_checked,
                                                              };
                                                            }
                                                            return child;
                                                          }
                                                        );
                                                      return {
                                                        ...detail,
                                                        is_checked:
                                                          !detailItem.is_checked,
                                                        child: updatedChild,
                                                      };
                                                    }
                                                    return detail;
                                                  });
                                                return {
                                                  ...ctgry,
                                                  detail: updatedDetail,
                                                };
                                              }
                                              return ctgry;
                                            }
                                          );
                                          setListCtgrDtl(updatedCtgrydtl);
                                        }}
                                      />
                                      <label
                                        htmlFor={detailItem.rlm_id}
                                        className="form-check-label"
                                      >
                                        {detailItem.rlm_name}
                                      </label>
                                    </div>

                                    {detailItem.child &&
                                      detailItem.child.length > 0 && (
                                        <ul>
                                          {detailItem.child.map((childItem) => (
                                            <li key={childItem.rlm_id}>
                                              <div className="form-check">
                                                <input
                                                  type="checkbox"
                                                  id={childItem.rlm_id}
                                                  name="chkCategoryChild"
                                                  value={childItem.rlm_id}
                                                  className="form-check-input"
                                                  checked={childItem.is_checked}
                                                  onChange={() => {
                                                    const updatedCtgrydtl =
                                                      ctgrydtl.map((ctgry) => {
                                                        if (
                                                          ctgry.rlm_id ===
                                                          item.rlm_id
                                                        ) {
                                                          const updatedDetail =
                                                            ctgry.detail.map(
                                                              (detail) => {
                                                                if (
                                                                  detail.rlm_id ===
                                                                  detailItem.rlm_id
                                                                ) {
                                                                  const updatedChild =
                                                                    detail.child.map(
                                                                      (
                                                                        child
                                                                      ) => {
                                                                        if (
                                                                          child.rlm_id ===
                                                                          childItem.rlm_id
                                                                        ) {
                                                                          return {
                                                                            ...child,
                                                                            is_checked:
                                                                              !child.is_checked,
                                                                          };
                                                                        }
                                                                        return child;
                                                                      }
                                                                    );
                                                                  return {
                                                                    ...detail,
                                                                    child:
                                                                      updatedChild,
                                                                  };
                                                                }
                                                                return detail;
                                                              }
                                                            );
                                                          return {
                                                            ...ctgry,
                                                            detail:
                                                              updatedDetail,
                                                          };
                                                        }
                                                        return ctgry;
                                                      });
                                                    setListCtgrDtl(
                                                      updatedCtgrydtl
                                                    );
                                                  }}
                                                />
                                                <label
                                                  htmlFor={childItem.rlm_id}
                                                  className="form-check-label"
                                                >
                                                  {childItem.rlm_name}
                                                </label>
                                              </div>
                                            </li>
                                          ))}
                                        </ul>
                                      )}
                                  </li>
                                ))}
                              </ul>
                            )}
                        </td>
                      </tr>
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
            <button type="button" className="btn btn-primary">
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditRole;
