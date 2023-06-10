import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const ModalTrail = ({ isOpen, onClose, modulName }) => {
  const [modalData, setModalData] = useState(null);
  const sessionData = JSON.parse(localStorage.getItem("tokenData"));
  const token = sessionData;
  console.log(modulName)

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const body = {
        id: "13",
        code: "user_management",
        // code: modulName,
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

      console.log("API Response:", response.data.data);
      setModalData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  const renderTableCell = (fieldName) => {
    const beforeValue = modalData?.find(
      (data) => data.p_log_action_mode === "Before"
    )?.[fieldName];
    const afterValue = modalData?.find(
      (data) => data.p_log_action_mode === "After"
    )?.[fieldName];
    const hasDifference = beforeValue !== afterValue;

    // Perbarui bagian ini untuk menangani tampilan status dengan benar
    let beforeRenderValue = beforeValue;
    let afterRenderValue = afterValue;
    if (fieldName === "p_usr_status") {
      beforeRenderValue = beforeValue ? "true" : "false";
      afterRenderValue = afterValue ? "true" : "false";
    }

    return (
      <>
        <td className={hasDifference ? "text-red-500" : ""}>
          {beforeRenderValue}
        </td>
        <td className={hasDifference ? "text-red-500" : ""}>
          {afterRenderValue}
        </td>
      </>
    );
  };

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
                  {renderTableCell("p_usr_userid")}
                </tr>
                <tr>
                  <td className="py-3 px-6 text-left">User Name</td>
                  {renderTableCell("p_usr_name")}
                </tr>
                <tr>
                  <td className="py-3 px-6 text-left">User Email</td>
                  {renderTableCell("p_usr_email")}
                </tr>
                <tr>
                  <td className="py-3 px-6 text-left">NIP</td>
                  {renderTableCell("p_usr_nip")}
                </tr>
                <tr>
                  <td className="py-3 px-6 text-left">Access Level</td>
                  {renderTableCell("p_usr_access_level")}
                </tr>
                <tr>
                  <td className="py-3 px-6 text-left">User Effective Date</td>
                  {renderTableCell("p_usr_efective_date")}
                </tr>
                <tr>
                  <td className="py-3 px-6 text-left">Branch</td>
                  {renderTableCell("p_usr_branch")}
                </tr>
                <tr>
                  <td className="py-3 px-6 text-left">User Supervisor</td>
                  {renderTableCell("p_usr_supervisor")}
                </tr>
                <tr>
                  <td className="py-3 px-6 text-left">Status</td>
                  {renderTableCell("p_usr_status")}
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
