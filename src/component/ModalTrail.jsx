import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const ModalTrail = ({ isOpen, onClose, modulName }) => {
  const [modalData, setModalData] = useState(null);
  const sessionData = JSON.parse(localStorage.getItem("tokenData"));
  const token = sessionData;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const body = {
        id: "13",
        code: "user_management",
      };

      const response = await axios.post(
        "http://116.206.196.65:30991/skyaudittrail/audit/view_detail",
        body,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("API Response:", response.data);
      setModalData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  console.log("Modal Data:", modalData);

  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="absolute bg-white p-6 rounded-lg shadow-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Audit Trail - {modulName}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Field Name</th>
                  <th className="py-3 px-6 text-left">Before</th>
                  <th className="py-3 px-6 text-left">After</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="py-3 px-6 text-left">User ID</td>
                  <td
                    className={
                      modalData &&
                      modalData.find(
                        (data) => data.p_log_action_mode === "Before"
                      )?.p_usr_userid !==
                        modalData.find(
                          (data) => data.p_log_action_mode === "After"
                        )?.p_usr_userid
                        ? "text-red-500"
                        : ""
                    }
                  >
                    {modalData &&
                      modalData.find(
                        (data) => data.p_log_action_mode === "Before"
                      )?.p_usr_userid}
                  </td>
                  <td
                    className={
                      modalData &&
                      modalData.find(
                        (data) => data.p_log_action_mode === "Before"
                      )?.p_usr_userid !==
                        modalData.find(
                          (data) => data.p_log_action_mode === "After"
                        )?.p_usr_userid
                        ? "text-red-500"
                        : ""
                    }
                  >
                    {modalData &&
                      modalData.find(
                        (data) => data.p_log_action_mode === "After"
                      )?.p_usr_userid}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-6 text-left">User Name</td>
                  <td
                    className={
                      modalData &&
                      modalData.find(
                        (data) => data.p_log_action_mode === "Before"
                      )?.p_usr_name !==
                        modalData.find(
                          (data) => data.p_log_action_mode === "After"
                        )?.p_usr_name
                        ? "text-red-500"
                        : ""
                    }
                  >
                    {modalData &&
                      modalData.find(
                        (data) => data.p_log_action_mode === "Before"
                      )?.p_usr_name}
                  </td>
                  <td
                    className={
                      modalData &&
                      modalData.find(
                        (data) => data.p_log_action_mode === "Before"
                      )?.p_usr_name !==
                        modalData.find(
                          (data) => data.p_log_action_mode === "After"
                        )?.p_usr_name
                        ? "text-red-500"
                        : ""
                    }
                  >
                    {modalData &&
                      modalData.find(
                        (data) => data.p_log_action_mode === "After"
                      )?.p_usr_name}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-6 text-left">User Email</td>
                  <td
                    className={
                      modalData &&
                      modalData.find(
                        (data) => data.p_log_action_mode === "Before"
                      )?.p_usr_email !==
                        modalData.find(
                          (data) => data.p_log_action_mode === "After"
                        )?.p_usr_email
                        ? "text-red-500"
                        : ""
                    }
                  >
                    {modalData &&
                      modalData.find(
                        (data) => data.p_log_action_mode === "Before"
                      )?.p_usr_email}
                  </td>
                  <td
                    className={
                      modalData &&
                      modalData.find(
                        (data) => data.p_log_action_mode === "Before"
                      )?.p_usr_email !==
                        modalData.find(
                          (data) => data.p_log_action_mode === "After"
                        )?.p_usr_email
                        ? "text-red-500"
                        : ""
                    }
                  >
                    {modalData &&
                      modalData.find(
                        (data) => data.p_log_action_mode === "After"
                      )?.p_usr_email}
                  </td>
                </tr>
                <tr>
                  <td className="py-3 px-6 text-left">NIP</td>
                  <td
                    className={
                      modalData &&
                      modalData.find(
                        (data) => data.p_log_action_mode === "Before"
                      )?.p_usr_nip !==
                        modalData.find(
                          (data) => data.p_log_action_mode === "After"
                        )?.p_usr_nip
                        ? "text-red-500"
                        : ""
                    }
                  >
                    {modalData &&
                      modalData.find(
                        (data) => data.p_log_action_mode === "Before"
                      )?.p_usr_nip}
                  </td>
                  <td
                    className={
                      modalData &&
                      modalData.find(
                        (data) => data.p_log_action_mode === "Before"
                      )?.p_usr_nip !==
                        modalData.find(
                          (data) => data.p_log_action_mode === "After"
                        )?.p_usr_nip
                        ? "text-red-500"
                        : ""
                    }
                  >
                    {modalData &&
                      modalData.find(
                        (data) => data.p_log_action_mode === "After"
                      )?.p_usr_nip}
                  </td>
                </tr>
              </tbody>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTrail;
