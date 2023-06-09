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
            <h5 className="modal-title">General Setting | Edit</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              //   onClick={onClose}
            ></button>
          </div>
          {/* <div className="modal-body">
            <form>
              <div className="row">
                <div className="col-12">
                  {" "}
                  <div className=" row mb-1">
                    <div className="col-4">
                      <label for="exampleInputEmail1" class="form-label">
                        Code
                      </label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        name="glc_code"
                        // value={general.glc_code}
                        // onChange={handleInputChange}
                        disabled
                        // onChange={(e) => setUserId(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-4">
                      <label for="exampleInputName" class="form-label">
                        Name
                      </label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        name="glc_name"
                        // value={general.glc_name}
                        // onChange={handleInputChange}
                        disabled
                      />
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-4">
                      <label for="exampleInputAddress" class="form-label">
                        Description
                      </label>
                    </div>
                    <div className="col-8">
                      <textarea
                        rows={4}
                        cols={4}
                        className="form-control"
                        id="recipient-name"
                        name="glc_desc"
                        // value={general.glc_desc}
                        // onChange={handleInputChange}
                        disabled
                      />
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-4">
                      <label for="exampleInputCity" class="form-label">
                        Value
                      </label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        // value={general.glc_value}
                        name="glc_value"
                        // onChange={handleInputChange}
                        required
                      />
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
              //   onClick={onClose}
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
          </div> */}
        </div>
      </div>
    </div>
  );
};
export default ModalTrail;
