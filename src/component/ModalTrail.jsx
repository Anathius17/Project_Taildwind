import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
// import { getToken } from "../../API/api";

const ModalTrail = ({ isOpen, onClose }) => {
  const [token, setToken] = useState();

  if (!isOpen) return null;
  return (
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute bg-white p-6 rounded-lg shadow-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Audit Trail</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              //   onClick={onClose}
            ></button>
          </div>
          <div className="modal-body">
            <table className="min-w-max w-full table-auto">
              <thead>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <th className="py-3 px-6 text-left">Code</th>
                  <th className="py-3 px-6 text-left">User Id</th>
                  <th className="py-3 px-6 text-left">User Id</th>
                </tr>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
                    User Id
                  </td>
                  <td className="py-3 px-6 text-left  whitespace-nowrap font-semibold">
                    code
                  </td>
                  <td className="py-3 px-6 text-left  whitespace-nowrap font-semibold">
                    code
                  </td>
                </tr>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  <td className="py-3 px-6 text-left whitespace-nowrap font-semibold">
                    User Id
                  </td>
                  <td className="py-3 px-6 text-left  whitespace-nowrap font-semibold">
                    code
                  </td>
                  <td className="py-3 px-6 text-left  whitespace-nowrap font-semibold">
                    code
                  </td>
                </tr>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  Code
                </tr>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  Code
                </tr>
                <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                  Code
                </tr>
              </thead>
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
            <button
              type="submit"
              className="btn btn-primary"
              // onClick={Submit}
            >
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ModalTrail;
