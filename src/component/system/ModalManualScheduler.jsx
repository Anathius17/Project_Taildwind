import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import axios from "axios";
import { getToken } from "../../API/api";
import $ from "jquery";

const ModalManualScheduler = ({
  isOpen,
  onClose,
  currentScheduler,
  reload,
}) => {
  const [token, setToken] = useState();
  const [bs, setScheduler] = useState(currentScheduler);

  const getTokenApi = () => {
    getToken().then((e) => {
      setToken(e);
    });
  };

  useEffect(() => {
    getTokenApi();
    localStorage.setItem("tokenData", JSON.stringify(token));
  }, [token]);

  useEffect(() => {
    setScheduler(currentScheduler);
  }, [currentScheduler]);

  const Submit = () => {
    EditScheduler();
  };

  const jodatarequpdate = {
    name: $("#txtnama").val(),
    type: "manual",
    status: "waiting",
  };

  const EditScheduler = async () => {
    try {
      await axios
        .post(
          "http://116.206.196.65:30999/skybatch/Batchscheduler/run_manual",
          jodatarequpdate,
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
            Swal.fire("Update Successfully ", "", "success").then((okay) => {
              if (okay) {
                //refresh();
                reload();
                onClose();
              }
            });
          } else {
            Swal.fire(response.data.message, "", "error").then((okay) => {
              if (okay) {
                //refresh();
                reload();
                onClose();
              }
            });
          }
        });
    } catch (error) {
      console.log(error);
    }
  };

  // close page
  const refresh = () => window.location.reload(true);
  const closepage = (e) => {
    e.preventDefault();
    refresh();
  };

  if (!isOpen) return null;
  return (
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute bg-white p-6 rounded-lg shadow-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Batch Schedule | Manual Run</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
              onClick={onClose}></button>
          </div>
          <div className="modal-body">
            <form>
              <div className="row">
                <div className="col-12">
                  {" "}
                  <div className=" row mb-1">
                    <div className="col-4">
                      <label for="exampleInputEmail1" class="form-label">
                        Job Category
                      </label>
                    </div>
                    <div className="col-8">
                      <p className="form-label" style={{ fontSize: 15 }}>
                        : {bs.category}
                      </p>
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-4">
                      <label for="exampleInputName" class="form-label">
                        Job Name
                      </label>
                    </div>
                    <div className="col-8">
                      <p className="form-label" style={{ fontSize: 15 }}>
                        : {bs.name}
                      </p>
                      <input
                        type="hidden"
                        value={bs.name}
                        name="txtnama"
                        id="txtnama"
                      />
                    </div>
                  </div>
                  <div className=" row mb-2">
                    <div className="col-4">
                      <label for="exampleInputAddress" class="form-label">
                        Description
                      </label>
                    </div>
                    <div className="col-8">
                      <p className="form-label" style={{ fontSize: 15 }}>
                        : {bs.desc}
                      </p>
                      <input
                        type="hidden"
                        value={bs.desc}
                        name="txtdesc"
                        id="txtdesc"
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
              onClick={onClose}>
              Close
            </button>
            <button type="submit" className="btn btn-primary" onClick={Submit}>
              Manual Run
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalManualScheduler;
