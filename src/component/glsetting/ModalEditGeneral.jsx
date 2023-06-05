import React, { useEffect, useState } from "react";
// import "bootstrap/dist/css/bootstrap.min.css";
import Swal from "sweetalert2";
import axios from "axios";
import { getToken } from "../../API/api";
import { browserName, osName,browserVersion } from "react-device-detect";

const ModalGeneral = ({
    isOpen,
    onClose,
    currentGeneral,
    reload,
  }) => {

  const [token, setToken] = useState();
  const [general, setGeneral] = useState(currentGeneral);

   // get userid 
   const userid = JSON.parse(localStorage.getItem("userid"));
    console.log("test1233");
    console.log(userid);


  const getTokenApi = () => {
    getToken().then((e) => {
      setToken(e);
    });
  };

  useEffect(() => {
    getTokenApi();
    setGeneral(currentGeneral);
  }, [currentGeneral]);

  const handleInputChange = (event) => {
  const { name, value } = event.target;

    setGeneral((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  // insert log activity
  const [ip, setIP] = useState("");
  const [logid, setlogid] = useState("");
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    console.log(res.data);
    setIP(res.data.ip);
  }; 
  useEffect(() => {
    getData();
  }, []);

    const dataLogUserTracking = {
      plcd: "general_setting",
      plusr: userid,
      plhtt: "OFF",
      plsvrn: window.location.hostname,
      plact: "Update General Setting",
      plpgur: window.location.href,
      plqry: "-",
      plbro: browserName +" " +browserVersion,
      plos: osName,
      plcli: ip,
    };

  const postDataLogUserTracking = async () => {
    let log = ""; 
    try {
      await axios.post(
        "http://localhost:30983/skycore/LogActivity/postDataLogUserTracking",
        dataLogUserTracking,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      ) 
      .then((response) => {
        console.log(response.data.data[0].resultprocess);
        log = response.data.data[0].resultprocess;
      });
 
      await Updateobjectdata(log);
      // alert("postDataLogUserTracking Berhasil");
    } catch (error) {
      alert("postDataLogUserTracking Tidak Berhasil");
      console.log(error);
    }
  };

  const Updateobjectdata = (val) => {
    EditGeneral(val);
  }
  const Submit = () => {
    postDataLogUserTracking();
  };

  const EditGeneral = async (val) => {
   
    try {
      await axios.post(
        "http://localhost:30983/skycore/Global/config/update",
        {
          code: general.glc_code,
          usr: userid,
          value: general.glc_value,
          logid: val,

        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data.status);
        if (response.data.status === "true")
        {
            Swal.fire("Update Successfully ", "", "success");
        }
        else
        {
            Swal.fire(response.data.message, "", "error");
        }

      });
      //Swal.fire("Save Berhasil", "", "success");

      reload();
      onClose();
    } catch (error) {
      console.log(error);
    }
  };

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
                       Code 
                      </label>
                    </div>
                    <div className="col-8">
                      <input
                        type="text"
                        className="form-control"
                        id="recipient-name"
                        name="glc_code"
                        value={general.glc_code}
                        onChange={handleInputChange}
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
                        value={general.glc_name}
                        onChange={handleInputChange}
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
                        value={general.glc_desc}
                        onChange={handleInputChange}
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
                        value={general.glc_value}
                        name="glc_value"
                        onChange={handleInputChange}
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
              onClick={onClose}>
              Close
            </button>
            <button type="submit" className="btn btn-primary" onClick={Submit}>
              Save changes
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalGeneral;