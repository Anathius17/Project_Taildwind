import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import axios from "axios";
import { getToken } from "../../API/api";
import $ from "jquery";

const ModalEditSchedulerChecker = ({
  isOpen,
  onClose,
  currentScheduler,
  currentSchedulerdetail,
  reload,
}) => {
  const [token, setToken] = useState();
  const [bs, setScheduler] = useState(currentScheduler);
  const [bsd, setSchedulerDetail] = useState(currentSchedulerdetail);
  // get userid
  const userid = JSON.parse(localStorage.getItem("userid"));
  const refresh = () => window.location.reload(true);

  //    useEffect(() => {
  //     setSchedulerDetail(currentSchedulerdetail);
  //     }, [currentSchedulerdetail]);

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
    setSchedulerDetail(currentSchedulerdetail);
    getobject(currentScheduler, currentSchedulerdetail);

    //console.log(currentScheduler);
    //setScheduler(currentScheduler);
  }, [currentScheduler, currentSchedulerdetail]);

  const getobject = (sch, schd) => {
    $("#ddlSchedule").val(sch.schedule);
    if (sch.schedule !== "automatic") {
      $("#hideShowTypeSchedule").hide();
      $("#hideShowtxtHourly").hide();
      $("#hideShowDaily").hide();
      $("#hideShowMonthly").hide();
    } else {
      $("#ddlTypeSchedule").val(sch.type);
      if (sch.type === "hourly") {
        $("#hideShowtxtHourly").show();
        $("#hideShowDaily").hide();
        $("#hideShowMonthly").hide();
        $("#txtHourly").val(schd[0].p_hour);
      } else if (sch.type === "daily") {
        $("#hideShowtxtHourly").hide();
        $("#hideShowDaily").show();
        $("#hideShowMonthly").hide();
        $("#txtJam").val(schd[0].p_hour);
        $("#txtMinute").val(schd[0].p_minutes);
      } else if (sch.type === "monthly") {
        $("#hideShowtxtHourly").hide();
        $("#hideShowDaily").hide();
        $("#hideShowMonthly").show();
        $("#txtDay").val(schd[0].p_day);
        $("#txtJamMonthly").val(schd[0].p_hour);
        $("#txtMinuteMonthly").val(schd[0].p_minutes);
      }
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setScheduler((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const Submit = () => {
    EditScheduler();
  };

  const jodatarequpdate = {
    id: $("#txtid").val(),
    approval_status: "checked",
    approval_usr: userid,
  };

  const EditScheduler = async () => {
    try {
      await axios
        .post(
          "http://116.206.196.65:30999/skybatch/Batchscheduler/approval",
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
            Swal.fire("Update Successfully ", "", "success");
            // Swal.fire("Update Successfully ", "", "success").then(okay => {
            //     if (okay) {
            //         refresh();

            //    } });
            reload();
            onClose();
          } else {
            Swal.fire(response.data.message, "", "error");
            // Swal.fire(response.data.message, "", "error").then(okay => {
            //     if (okay) {
            //         refresh();

            //    } });
            reload();
            onClose();
          }
        });
      //Swal.fire("Save Berhasil", "", "success");
    } catch (error) {
      console.log(error);
      reload();
      onClose();
    }
  };

  if (!isOpen) return null;
  return (
    <div class="fixed inset-0 flex items-center justify-center z-50">
      <div class="absolute bg-white p-6 rounded-lg shadow-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Batch Schedule Checker| Edit</h5>
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
                      <p className="form-label" style={{ color: "red" }}>
                        {bs.category}
                      </p>
                      <input
                        type="hidden"
                        value={bs.id}
                        name="txtid"
                        id="txtid"
                      />
                    </div>
                  </div>
                  <div className=" row mb-1">
                    <div className="col-4">
                      <label for="exampleInputName" class="form-label">
                        Job Name
                      </label>
                    </div>
                    <div className="col-8">
                      <p className="form-label" style={{ color: "red" }}>
                        {bs.name}
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
                      <textarea
                        rows={4}
                        cols={4}
                        className="form-control"
                        id="txtdesc"
                        name="desc"
                        value={bs.desc}
                        onChange={handleInputChange}
                        disabled
                      />
                    </div>
                  </div>
                  <div className=" row mb-2">
                    <div className="col-4">
                      <label for="exampleInputCity" class="form-label">
                        Schedule
                      </label>
                    </div>
                    <div className="col-8">
                      <select
                        disabled
                        className="form-control"
                        id="ddlSchedule"
                        name="ddlSchedule"
                        //value={bs.schedule}
                        //onChange={(event) => changeDdlSchedule(event.target.value)}
                      >
                        <option value="0">-- Select One --</option>
                        <option value="manual">Manual</option>
                        <option value="automatic">Automatic</option>
                      </select>
                    </div>
                  </div>
                  <div className=" row mb-2" id="hideShowTypeSchedule">
                    <div className="col-4"></div>
                    <div className="col-8">
                      <select
                        disabled
                        className="form-control"
                        id="ddlTypeSchedule"
                        name="ddlTypeSchedule"
                        //value={bs.type}
                        //onChange={(event) => changeDdlTypeSchedule(event.target.value)}
                      >
                        <option value="">-- Select One --</option>
                        <option value="hourly">Hourly</option>
                        <option value="daily">Daily</option>
                        <option value="monthly">Monthly</option>
                      </select>
                    </div>
                  </div>
                  <div className=" row mb-2" id="hideShowtxtHourly">
                    <div className="col-4"></div>
                    <div className="col-3">
                      <input
                        type="number"
                        disabled
                        className="form-control"
                        placeholder={"Hourly"}
                        id="txtHourly"
                        name="txtHourly"
                        //value={bsd[0].p_hour}
                        maxLength={2}
                      />
                    </div>
                  </div>
                  <div className="row mb-1" id="hideShowDaily">
                    <div className="col-4"></div>
                    <div className="col-2">
                      <input
                        type="number"
                        disabled
                        className="form-control"
                        id="txtJam"
                        placeholder={"Hour"}
                        name="txtJam"
                        //value={bsd[0].p_hour}
                        maxLength={2}
                      />
                    </div>
                    <p style={{ fontSize: 20 }}>:</p>
                    <div className="col-2">
                      <input
                        type="number"
                        disabled
                        className="form-control"
                        id="txtMinute"
                        placeholder={"Minute"}
                        name="txtMinute"
                        //value={bsd[0].p_minutes}
                        maxLength={2}
                      />
                    </div>
                  </div>
                  <div className="row mb-1" id="hideShowMonthly">
                    <div className="col-4"></div>
                    <div className="col-3">
                      <input
                        type="number"
                        disabled
                        className="form-control"
                        id="txtDay"
                        placeholder={"Day"}
                        name="txtDay"
                        //value={bsd[0].p_day}
                        maxLength={2}
                      />
                    </div>
                    <div className="col-2">
                      <input
                        type="number"
                        disabled
                        className="form-control"
                        id="txtJamMonthly"
                        placeholder={"Hour"}
                        name="txtJamMonthly"
                        //value={bsd[0].p_hour}
                        maxLength={2}
                      />
                    </div>
                    <p style={{ fontSize: 20 }}>:</p>
                    <div className="col-2">
                      <input
                        type="number"
                        disabled
                        className="form-control"
                        id="txtMinuteMonthly"
                        placeholder={"Minute"}
                        name="txtMinuteMonthly"
                        //value={bsd[0].p_minutes}
                        maxLength={2}
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
              onClick={onClose}
              //onClick={closepage}
            >
              Close
            </button>
            <button type="submit" className="btn btn-primary" onClick={Submit}>
              Checked
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditSchedulerChecker;
