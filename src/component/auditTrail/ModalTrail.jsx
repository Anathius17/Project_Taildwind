import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";

const ModalTrail = ({ isOpen, onClose, modulName, b_log_id, lgc_name }) => {
  const [modalData, setModalData] = useState({});
  const sessionData = JSON.parse(localStorage.getItem("tokenData"));
  const token = sessionData;
  console.log(modulName);
  console.log(b_log_id);
  console.log(lgc_name);

  useEffect(() => {
    fetchData();
  }, [modulName, b_log_id, lgc_name]);

  const fetchData = async () => {
    try {
      const body = {
        id: b_log_id,
        code: modulName,
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

      if (modulName === "branch_mgmt") {
        const sortedData = response.data.data.sort((a, b) =>
          a.p_lbrc_action.localeCompare(b.p_lbrc_action)
        );

        let beforeData = null;
        let afterData = null;

        for (let i = 0; i < sortedData.length; i++) {
          if (
            sortedData[i].p_lbrc_action === "BEFORE" ||
            sortedData[i].p_lbrc_action === "DELETE"
          ) {
            beforeData = sortedData[i];
          } else if (sortedData[i].p_lbrc_action === "AFTER") {
            afterData = sortedData[i];
          }
        }

        setModalData({ beforeData, afterData });
      } else if (modulName === "user_management") {
        const sortedData = response.data.data.sort((a, b) =>
          a.p_log_action_mode.localeCompare(b.p_log_action_mode)
        );

        let beforeData = null;
        let afterData = null;

        for (let i = 0; i < sortedData.length; i++) {
          if (
            sortedData[i].p_log_action_mode === "Before" ||
            sortedData[i].p_log_action_mode === "Delete"
          ) {
            beforeData = sortedData[i];
          } else if (
            sortedData[i].p_log_action_mode === "After" ||
            sortedData[i].p_log_action_mode === "New"
          ) {
            afterData = sortedData[i];
          }
        }

        setModalData({ beforeData, afterData });
      } else if (modulName === "general_setting") {
        const sortedData = response.data.data.sort((a, b) =>
          a.glc_log_action.localeCompare(b.glc_log_action)
        );

        let beforeData = null;
        let afterData = null;

        for (let i = 0; i < sortedData.length; i++) {
          if (sortedData[i].glc_log_action === "BEFORE") {
            beforeData = sortedData[i];
          } else if (sortedData[i].glc_log_action === "AFTER") {
            afterData = sortedData[i];
          }
        }

        setModalData({ beforeData, afterData });
      } else if (modulName === "user_access") {
        const sortedData = response.data.data.sort((a, b) =>
          a.log_action_date.localeCompare(b.log_action_date)
        );

        let beforeData = null;
        let afterData = null;

        for (let i = 0; i < sortedData.length; i++) {
          if (sortedData[i].log_activity === "Login Success") {
            beforeData = sortedData[i];
            break; // Stop the loop after finding the matching entry
          }
        }

        setModalData({ beforeData, afterData });
      } else if (modulName === "api_management") {
        const sortedData = response.data.data.sort((a, b) =>
          a.api_log_action.localeCompare(b.api_log_action)
        );

        let beforeData = null;
        let afterData = null;

        for (let i = 0; i < sortedData.length; i++) {
          if (
            sortedData[i].api_log_action === "before" ||
            sortedData[i].api_log_action === "delete"
          ) {
            beforeData = sortedData[i];
          } else if (sortedData[i].api_log_action === "after") {
            afterData = sortedData[i];
          }
        }

        setModalData({ beforeData, afterData });
      } else if (modulName === "role_management") {
        const sortedData = response.data.data.sort((a, b) =>
          a.p_rl_log_action.localeCompare(b.p_rl_log_action)
        );

        let roleData = {
          beforeData: null,
          afterData: null,
        };

        let roleDetailData = {
          beforeData: [],
          afterData: [],
        };

        for (let i = 0; i < sortedData[0].role.length; i++) {
          const role = sortedData[0].role[i];

          if (
            role.p_rl_log_action === "before" ||
            role.p_rl_log_action === "delete"
          ) {
            roleData.beforeData = role;
          } else if (
            role.p_rl_log_action === "after" ||
            role.p_rl_log_action === "create"
          ) {
            roleData.afterData = role;
          }
        }

        for (let i = 0; i < sortedData[0].role_detail.length; i++) {
          const roleDetail = sortedData[0].role_detail[i];

          if (
            roleDetail.p_rld_log_action === "before" ||
            roleDetail.p_rld_log_action === "delete"
          ) {
            roleDetailData.beforeData.push(roleDetail);
          } else if (
            roleDetail.p_rld_log_action === "after" ||
            roleDetail.p_rld_log_action === "create"
          ) {
            roleDetailData.afterData.push(roleDetail);
          }
        }

        setModalData({ roleData, roleDetailData });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const renderTableCell = (fieldName) => {
    const beforeValue = modalData?.beforeData?.[fieldName];
    const afterValue = modalData?.afterData?.[fieldName];
    const hasDifference = beforeValue !== afterValue;

    // Perbarui bagian ini untuk menangani tampilan status dengan benar
    let beforeRenderValue = beforeValue;
    let afterRenderValue = afterValue;
    if (fieldName === "p_usr_status" || fieldName === "api_status") {
      beforeRenderValue =
        beforeValue !== undefined && beforeValue !== ""
          ? String(beforeValue)
          : null;
      afterRenderValue =
        afterValue !== undefined && afterValue !== ""
          ? String(afterValue)
          : null;
    }

    return (
      <>
        <td
          className={`py-3 px-6 text-left ${
            hasDifference && beforeRenderValue && afterRenderValue
              ? "text-red-500"
              : ""
          }`}>
          {beforeRenderValue}
        </td>
        <td
          className={`py-3 px-6 text-left ${
            hasDifference && beforeRenderValue && afterRenderValue
              ? "text-red-500"
              : ""
          }`}>
          {afterRenderValue}
        </td>
      </>
    );
  };
  const renderRoleTableCell = (fieldName) => {
    const beforeValue = modalData?.roleData?.beforeData?.[fieldName];
    const afterValue = modalData?.roleData?.afterData?.[fieldName];
    const hasDifference = beforeValue !== afterValue;
    let beforeRenderValue = beforeValue;
    let afterRenderValue = afterValue;
    if (fieldName === "p_rl_status" || fieldName === "api_status") {
      beforeRenderValue =
        beforeValue !== undefined && beforeValue !== ""
          ? String(beforeValue)
          : null;
      afterRenderValue =
        afterValue !== undefined && afterValue !== ""
          ? String(afterValue)
          : null;
    }

    return (
      <>
        <td
          className={`py-3 px-6 text-left ${
            hasDifference && beforeRenderValue && afterRenderValue
              ? "text-red-500"
              : ""
          }`}>
          {beforeRenderValue}
        </td>
        <td
          className={`py-3 px-6 text-left ${
            hasDifference && beforeRenderValue && afterRenderValue
              ? "text-red-500"
              : ""
          }`}>
          {afterRenderValue}
        </td>
      </>
    );
  };

  const renderRoleDetailTableCell = (fieldName) => {
    const roleDetailData = modalData?.roleDetailData ?? {
      beforeData: [],
      afterData: [],
    };

    const { beforeData, afterData } = roleDetailData;

    const beforeCells = beforeData.map((data, index) => (
      <td className="py-3 px-6 text-left" key={`before_${index}`}>
        {data[fieldName]}
      </td>
    ));

    const afterCells = afterData.map((data, index) => (
      <td className="py-3 px-6 text-left" key={`after_${index}`}>
        {data[fieldName]}
      </td>
    ));

    return (
      <>
        {beforeCells}
        {afterCells}
      </>
    );
  };
  if (!isOpen) return null;

  // Ubah format modulName menjadi User Access
  const formattedModulName = modulName
    .split("_")
    .map((word) => {
      if (word === "mgmt") {
        return "management";
      } else {
        return word;
      }
    })
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50">
      <div className="modal-dialog modal-dialog-scrollable modal-xl w-10/12 mr-10">
        <div className="modal-content" style={{ width: "1000px" }}>
          <div className="modal-header">
            <h5 className="modal-title">Audit Trail - {formattedModulName}</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}></button>
          </div>
          <div className="modal-body">
            {modulName === "branch_mgmt" && (
              <table className="min-w-max w-full table-auto table-bordered">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Field Name</th>
                    <th className="py-3 px-6 text-left">Before</th>
                    <th className="py-3 px-6 text-left">After</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const fieldNames = [
                      { fieldName: "p_lbrc_code", label: "Code" },
                      { fieldName: "p_lbrc_name", label: "Name" },
                      { fieldName: "p_lbrc_group", label: "Group" },
                      { fieldName: "p_lbrc_address", label: "Address" },
                      { fieldName: "p_lbrc_city", label: "City" },
                      { fieldName: "p_lbrc_phone_num", label: "Phone Number" },
                    ];

                    return fieldNames.map(({ fieldName, label }) => {
                      const tableCells = renderTableCell(fieldName);
                      return (
                        <tr key={fieldName}>
                          <td className="py-3 px-6 text-left">{label}</td>
                          {tableCells}
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            )}

            {modulName === "user_management" && (
              <table className="min-w-max w-full table-auto table-bordered">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Field Name</th>
                    <th className="py-3 px-6 text-left">Before</th>
                    <th className="py-3 px-6 text-left">After</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const fieldNames = [
                      { fieldName: "p_usr_userid", label: "User ID" },
                      { fieldName: "p_usr_name", label: "User Name" },
                      { fieldName: "p_usr_email", label: "User Email" },
                      { fieldName: "p_usr_nip", label: "NIP" },
                      {
                        fieldName: "p_usr_access_level",
                        label: "Access Level",
                      },
                      {
                        fieldName: "p_usr_efective_date",
                        label: "User Effective Date",
                      },
                      { fieldName: "p_usr_branch", label: "Branch" },
                      {
                        fieldName: "p_usr_supervisor",
                        label: "User Supervisor",
                      },
                      { fieldName: "p_usr_status", label: "Status" },
                    ];

                    return fieldNames.map(({ fieldName, label }) => {
                      const tableCells = renderTableCell(fieldName);
                      return (
                        <tr key={fieldName}>
                          <td className="py-3 px-6 text-left">{label}</td>
                          {tableCells}
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            )}

            {modulName === "general_setting" && (
              <table className="min-w-max w-full table-auto table-bordered">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Field Name</th>
                    <th className="py-3 px-6 text-left">Before</th>
                    <th className="py-3 px-6 text-left">After</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const fieldNames = [
                      { fieldName: "glc_code", label: "Code" },
                      { fieldName: "glc_name", label: "Name" },
                      { fieldName: "glc_desc", label: "Description" },
                      { fieldName: "glc_value", label: "Value" },
                      { fieldName: "glc_action_by", label: "Action By" },
                      { fieldName: "glc_log_date", label: "Log Date" },
                    ];

                    return fieldNames.map(({ fieldName, label }) => {
                      const tableCells = renderTableCell(fieldName);
                      return (
                        <tr key={fieldName}>
                          <td className="py-3 px-6 text-left">{label}</td>
                          {tableCells}
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            )}

            {modulName === "user_access" && (
              <table className="min-w-max w-full table-auto table-bordered">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Field Name</th>
                    <th className="py-3 px-6 text-left">Before</th>
                    <th className="py-3 px-6 text-left">After</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const fieldNames = [
                      { fieldName: "usr_userid", label: "User ID" },
                      { fieldName: "usr_name", label: "Name" },
                      { fieldName: "usr_nip", label: "NIP" },
                      { fieldName: "usr_access_level", label: "Access Level" },
                      { fieldName: "usr_branch", label: "Branch" },
                      { fieldName: "status", label: "Status" },
                      { fieldName: "usr_last_access", label: "Last Access" },
                      { fieldName: "usr_is_login", label: "Is Login" },
                      { fieldName: "usr_fail_login", label: "Fail Login" },
                      { fieldName: "log_action_date", label: "Action Date" },
                      { fieldName: "log_server_name", label: "Server Name" },
                      { fieldName: "log_activity", label: "Activity" },
                      { fieldName: "log_browser", label: "Browser" },
                      {
                        fieldName: "log_operating_system",
                        label: "Operating System",
                      },
                      { fieldName: "client_ip", label: "Client IP" },
                    ];

                    return fieldNames.map(({ fieldName, label }) => {
                      const beforeValue = modalData.beforeData
                        ? modalData.beforeData[fieldName]
                        : "";
                      const afterValue = modalData.afterData
                        ? modalData.afterData[fieldName]
                        : "";

                      return (
                        <tr key={fieldName}>
                          <td className="py-3 px-6 text-left">{label}</td>
                          <td className="py-3 px-6 text-left">{beforeValue}</td>
                          <td className="py-3 px-6 text-left">{afterValue}</td>
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            )}

            {modulName === "api_management" && (
              <table className="min-w-max w-full table-auto table-bordered">
                <thead>
                  <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                    <th className="py-3 px-6 text-left">Field Name</th>
                    <th className="py-3 px-6 text-left">Before</th>
                    <th className="py-3 px-6 text-left">After</th>
                  </tr>
                </thead>
                <tbody>
                  {(() => {
                    const fieldNames = [
                      { fieldName: "api_code", label: "Code" },
                      { fieldName: "api_name", label: "Name" },
                      { fieldName: "api_desc", label: "Description" },
                      { fieldName: "api_status", label: "Status" },
                      { fieldName: "api_action_by", label: "Action By" },
                      { fieldName: "api_log_date", label: "Log Date" },
                    ];

                    return fieldNames.map(({ fieldName, label }) => {
                      const tableCells = renderTableCell(fieldName);
                      return (
                        <tr key={fieldName}>
                          <td className="py-3 px-6 text-left">{label}</td>
                          {tableCells}
                        </tr>
                      );
                    });
                  })()}
                </tbody>
              </table>
            )}

            {modulName === "role_management" && (
              <>
                <h2>Role Table</h2>
                <table className="min-w-max w-full table-auto table-bordered">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Field Name</th>
                      <th className="py-3 px-6 text-left">Before</th>
                      <th className="py-3 px-6 text-left">After</th>
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const fieldNames = [
                        { fieldName: "p_rl_name", label: "Name" },
                        { fieldName: "p_rl_description", label: "Description" },
                        { fieldName: "p_rl_status", label: "Status" },
                        { fieldName: "p_rl_action_by", label: "Action By" },
                        { fieldName: "p_rl_log_date", label: "Log Date" },
                      ];

                      return fieldNames.map(({ fieldName, label }) => {
                        const tableCells = renderRoleTableCell(fieldName);
                        return (
                          <tr key={fieldName}>
                            <td className="py-3 px-6 text-left">{label}</td>
                            {tableCells}
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>

                <h2>Role Detail Table</h2>
                <table className="min-w-max w-full table-auto table-bordered">
                  <thead>
                    <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Field Name</th>
                      {renderRoleDetailTableCell("p_rld_log_action")}
                    </tr>
                  </thead>
                  <tbody>
                    {(() => {
                      const fieldNames = [
                        { fieldName: "p_rlm_name", label: "Role Manager Name" },
                        { fieldName: "p_rlm_code", label: "Role Manager Code" },
                        { fieldName: "p_rld_action_by", label: "Action By" },
                        { fieldName: "p_rld_log_date", label: "Log Date" },
                      ];

                      return fieldNames.map(({ fieldName, label }) => {
                        const tableCells = renderRoleDetailTableCell(fieldName);
                        return (
                          <tr key={fieldName}>
                            <td className="py-3 px-6 text-left">{label}</td>
                            {tableCells}
                          </tr>
                        );
                      });
                    })()}
                  </tbody>
                </table>
              </>
            )}
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
              onClick={onClose}>
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalTrail;
