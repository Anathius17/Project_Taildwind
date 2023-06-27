import React, { useState, useEffect } from "react";
import axios from "axios";
import Logo from "../assets/images/LogoSky.png";
import Branch from "../assets/images/Sky.png";
import "../assets/css/style_login.css";
// import "../assets/css/util.css";
// import "bootstrap/dist/css/bootstrap.css";
import { useNavigate } from "react-router-dom";
import { getToken } from "../API/api";
import md5 from "js-md5";
import { browserName, osName, browserVersion } from "react-device-detect";
import Captcha from "react-captcha-code";

// ? membuat isi dalam captcha
// const generateCaptcha = () => {
//   const characters =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let captcha = "";
//   for (let i = 0; i < 6; i++) {
//     captcha += characters.charAt(Math.floor(Math.random() * characters.length));
//   }

//   return captcha;
// };

const Login = (props) => {
  const [hasReloaded, setHasReloaded] = useState(false);

  // useEffect(() => {
  //   // Jalankan window.location.reload() hanya sekali
  //   // window.location.reload();

  // }, []);

  // ! pada kodingan dibawah kita memasukan nilai ke variabel captcha pada render awal
  const [captcha, setCaptcha] = useState("");
  // ! pada kodingan dibawah kita set input pada saat render pertama
  const [input, setInput] = useState("");
  // ! kemudian kita atur expirednya ketika render awal yg berisi boolean bernilai false
  const [expired, setExpired] = useState(false);

  const [username, setUsername] = useState("");
  const [usernameCek, setUsernameCek] = useState("");
  const [password, setPassword] = useState("");
  const hashedPassword = md5(password);
  const [errorMessage, setErrorMessage] = useState("");
  const [token, setToken] = useState("");
  const [userStatus, setUserStatus] = useState();
  const [userIsLogin, setUserIsLogin] = useState();
  const [userDateTampungan, setUserDateTampungan] = useState("");
  const [uslPassword, setUslPassword] = useState("");
  const [isFristLogin, setIsFristLogin] = useState([]);
  const [dataCheckData, setDataCheck] = useState([]);
  const [userDataCekLogin, setUserLoginDataCek] = useState("");
  const [userFaillLogin, setuserFaillLogin] = useState();

  const today = new Date();
  console.log(today);
  const [ip, setIP] = useState("");
  localStorage.setItem("ipAddres", JSON.stringify(ip));
  const getData = async () => {
    const res = await axios.get("https://api.ipify.org/?format=json");
    console.log(res.data);
    setIP(res.data.ip);
  };

  useEffect(() => {
    getData();
  }, []);

  console.log(osName);

  const [dataRoleUserDetail, setDataRoleUserDetail] = useState([]); // ! Hasil data yang di ambil dari getroleuserdetail
  localStorage.setItem("detailRoleUser", JSON.stringify(dataRoleUserDetail));
  const [listMenuSend, setListMenuSend] = useState([]);
  localStorage.setItem("MenuList", JSON.stringify(listMenuSend));

  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Simpan data sesi
  localStorage.setItem("tokenData", JSON.stringify(token));
  localStorage.setItem("userid", JSON.stringify(username));

  const getTokenApi = () => {
    getToken().then((e) => {
      setToken(e);
    });
  };

  useEffect(() => {
    if (token !== "") {
      getPasswordUser();
      generalListMenuAPI();
      console.log(1);
    }
  }, [token]);

  const getPasswordUser = async () => {
    try {
      const PasswordUser = await axios.get(
        "http://116.206.196.65:30983/skycore/Login/getPasswordUser/" + username,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const cekData = PasswordUser.data.data.map((e) => {
        return e;
      });

      setDataCheck(cekData);
      // console.log(cekData);
      let cekUser = PasswordUser.data.data.map((e) => {
        return e.usruserid;
      });
      let statusUser = PasswordUser.data.data.map((e) => {
        return e.usrstatus;
      });

      let userLogin = PasswordUser.data.data.map((e) => {
        return e.usrislogin;
      });

      let UserDate = PasswordUser.data.data.map((e) => {
        return e.usrefectivedate;
      });

      let cekpassword = PasswordUser.data.data.map((e) => {
        return e.uslpassword;
      });

      setUsernameCek(cekUser[0]);
      console.log(cekUser);
      setUserStatus(statusUser[0]);
      setUserIsLogin(userLogin[0]);
      setUserDateTampungan(UserDate[0]);
      setUslPassword(cekpassword[0]);
      // alert("Berhasil");
    } catch (errorUser) {
      alert(
        "Sorry, we have trouble getting data, please contact administrator"
      );
    }
  };

  const resetFailLogin = async () => {
    try {
      const failLogin = await axios.get(
        "http://116.206.196.65:30983/skycore/Login/resetFailLogin/" + username,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // alert("failLogin Berhasil");
    } catch (error) {
      alert("reset fail login gagal");
      console.log(error);
    }
  };

  // ! nanti atur secara dinamis
  const data1 = {
    user: username,
    modules: "CORE",
  };
  const getDataUserRoleDetail = async () => {
    try {
      const userRoleDetail = await axios.post(
        "http://116.206.196.65:30983/skycore/Login/getDataUserRoleDetail",
        JSON.stringify(data1),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let dataUserRoleDetailApi = userRoleDetail.data.data.map((e) => {
        return e;
      });
      console.log(dataUserRoleDetailApi);
      setDataRoleUserDetail(dataUserRoleDetailApi);

      // alert("userRoleDetail Berhasil ke Hit");
    } catch (error) {
      alert("reset fail login gagal");
    }
  };

  const generalListMenuAPI = async () => {
    try {
      const listMenu = await axios.get(
        "http://116.206.196.65:30983/skycore/Login/GenerateListMenu/0",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let generalListMenu = listMenu.data.data.map((e) => {
        return e;
      });

      setListMenuSend(generalListMenu);
    } catch (error) {
      alert("List Menu gagal");
    }
  };

  // ! nanti atur secara dinamis
  const dataFristLogin = {
    p_userid: username,
  };

  const getIsFristLogin = async () => {
    try {
      const frisLogin = await axios.post(
        "http://116.206.196.65:30983/skycore/LogActivity/IsFirstLogin",
        JSON.stringify(dataFristLogin),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log(frisLogin);

      let cekIsLogin = frisLogin.data.data.map((e) => {
        return e.is_first_login;
      });

      let userLoginCek = frisLogin.data.data.map((e) => {
        return e.userid;
      });

      console.log(cekIsLogin);
      setIsFristLogin(cekIsLogin[0]);
      setUserLoginDataCek();
      // alert("Test Berhasil");
    } catch (error) {
      alert("Test Tidak Berhasil");
    }
  };

  // postJDataUserIsLogin;

  const dataUserLogiin = {
    p_usr: username,
    p_ipaddress: "10.101.123.234",
  };

  const postJDataUserIsLogin = async () => {
    try {
      const userIsLogin = await axios.post(
        "http://116.206.196.65:30983/skycore/Login/postJDataUserIsLogin",
        JSON.stringify(dataUserLogiin),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // alert("postDataLogUserTracking Berhasil");
    } catch (error) {
      alert("postDataLogUserTracking Tidak Berhasil");
    }
  };

  // !  atur secara dinamis
  const dataLogUserTracking = {
    plcd: "user_access",
    plusr: username,
    plhtt: "OFF",
    plsvrn: window.location.hostname,
    plact: "Login Success",
    plpgur: window.location.href,
    plqry: "-",
    plbro: browserName + " " + browserVersion,
    plos: osName,
    plcli: ip,
  };

  const [dataTracking, setDataTracking] = useState();
  const postDataLogUserTracking = async () => {
    try {
      const frisLogin = await axios.post(
        "http://116.206.196.65:30983/skycore/LogActivity/postDataLogUserTracking",
        JSON.stringify(dataLogUserTracking),
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // alert("postDataLogUserTracking Berhasil");
    } catch (error) {
      alert("postDataLogUserTracking Tidak Berhasil");
    }
  };

  const faillLogin = async () => {
    try {
      const failLoginuser = await axios.get(
        "http://116.206.196.65:30983/skycore/Login/UserFailLogin/" + username,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      let cekFailLogin = failLoginuser.data.data.map((e) => {
        return e;
      });

      // alert("usrfaillogin Berhasil");
      setuserFaillLogin(cekFailLogin.usrfaillogin);
    } catch (error) {
      alert("Sorry, the username has not been activated or is blocked");
    }
  };

  const demo = () => {
    setIsLoggedIn(true);
  };

  console.log(userDateTampungan);

  // if (dataCheckData.length > 0) {

  useEffect(() => {
    if (username === usernameCek && username !== "") {
      //
      console.log(2);
      if (userStatus === true) {
        console.log(3);

        if (userIsLogin === 0) {
          getDataUserRoleDetail();
          console.log(4);
          if (new Date(userDateTampungan) < new Date()) {
            console.log(5);
            if (hashedPassword === uslPassword) {
              console.log(6);
              resetFailLogin();
              // getDataUserRoleDetail();
              postJDataUserIsLogin();
              // generalListMenuAPI();
              getIsFristLogin();
            } else if (hashedPassword !== uslPassword) {
              //hit API UserFalLogin
              alert("password Salah");
              faillLogin();
              // resetFailLogin();
            }
          } else {
            postDataLogUserTracking();
            alert("Sorry, tanggal user belum aktif");
          }
        } else if (userIsLogin === 1) {
          //hit API postDataLogUserTracking
          postDataLogUserTracking();
          alert("Sorry, the username is already login");
        }
      } else if (userStatus === false) {
        postDataLogUserTracking();
        alert("Sorry, the username has not been activated or is blocked");
      }
    } else if (username !== usernameCek) {
      alert("Please enter a username yang benar ");
    }
  }, [dataCheckData]);

  useEffect(() => {
    if (isFristLogin === false) {
      postDataLogUserTracking();
      demo();

      console.log("wow");
    }
  }, [isFristLogin]);

  const handleSendDataToParent = () => {
    props.onDataFromChild(usernameCek);
  };

  const handleMenuList = () => {
    props.dataMenu(listMenuSend);
  };

  const handleMenuLevel = () => {
    props.dataMenuLevel(dataRoleUserDetail);
  };

  useEffect(() => {
    if (userFaillLogin < 3) {
      alert("Fail berhasil");
      postDataLogUserTracking();
    } else if (userFaillLogin > 3) {
      alert("You have been blocked please call administrator");
    }
  }, [userFaillLogin]);

  useEffect(() => {
    if (isLoggedIn === true && isLoggedIn !== "") {
      handleMenuList();
      handleMenuLevel();
      handleSendDataToParent();

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);
    } else {
      navigate("/");
      console.log("gagal login");
    }
  }, [isLoggedIn]);

  //? ---batas bagian captcha validation

  useEffect(() => {
    const timer = setTimeout(() => {
      handleRefresh();
    }, 30000);

    return () => clearTimeout(timer);
  }, [captcha]);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    if (input === captcha) {
      // alert("CAPTCHA validated successfully!");
      getTokenApi();
    } else {
      alert("CAPTCHA validation failed. Please try again.");
      handleRefresh();
    }
  };

  const handleRefresh = () => {
    // const newCaptcha = generateCaptcha();
    setCaptcha(Captcha);
    setInput("");
    setExpired(false);
  };
  console.log(captcha);

  //? ---batas bagian captcha validation

  return (
    // <div classNameName="fullscreen_bg">
    //   <div classNameName="limiter">
    //     <div classNameName="container-login100">
    //       <div classNameName="wrap-login100 p-t-190 p-b-30">
    //         <form
    //           classNameName="mx-auto px-1"
    //           onSubmit={(event) => {
    //             handleSubmit(event);
    //           }}>
    //           <div classNameName="mx-auto w-32 my-1">
    //             <img src={Logo} alt="Logo" classNameName="logo" />
    //           </div>
    //           <div
    //             classNameName="mx-auto my-2"
    //             data-validate="Username is required">
    //             <input
    //               classNameName="input100"
    //               type="text"
    //               name="username"
    //               placeholder="Username"
    //               value={username}
    //               onChange={(e) => setUsername(e.target.value)}
    //             />
    //             <span classNameName="focus-input100"></span>
    //             <span classNameName="symbol-input100">
    //               <i classNameName="fa fa-user"></i>
    //             </span>
    //           </div>
    //           <div
    //             classNameName="mx-auto my-2"
    //             data-validate="Password is required">
    //             <input
    //               classNameName="input100"
    //               type="password"
    //               name="pass"
    //               placeholder="Password"
    //               value={password}
    //               onChange={(e) => setPassword(e.target.value)}
    //             />
    //             <span classNameName="focus-input100"></span>
    //             <span classNameName="symbol-input100">
    //               <i classNameName="fa fa-lock"></i>
    //             </span>
    //           </div>
    //           <span>
    //             {errorMessage && <p classNameName="eror">{errorMessage}</p>}{" "}
    //           </span>
    //           <div classNameName="bg-zinc-600 rounded-md item-center mx-auto">
    //             <div classNameName="flex flex-nowrap gap-1 px-1 py-1 mx-auto my-auto">
    //               <input
    //                 type="text"
    //                 value={input}
    //                 onChange={handleInputChange}
    //                 classNameName="input100-captha"
    //                 placeholder="Enter CAPTCHA"
    //               />
    //               <br />

    //               {expired ? (
    //                 <button
    //                   classNameName="btn btn-primary text-center items-center"
    //                   onClick={handleRefresh}>
    //                   Refresh Captcha
    //                 </button>
    //               ) : (
    //                 <div classNameName="mt-1 ml-4">
    //                   <Captcha charNum={6} onChange={setCaptcha} />
    //                 </div>
    //               )}
    //             </div>
    //           </div>
    //           <div classNameName="login-form-btn mx-auto my-2">
    //             <button
    //               classNameName="btn-accent px-44 py-1 rounded-full"
    //               type="submit">
    //               Login
    //             </button>
    //           </div>
    //           <div classNameName="text-center w-full p-t-25 p-b-230"></div>
    //         </form>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <div className="fullscreen_bg bg-gray-50 dark:bg-gray-900">
      <div className="flex justify-end py-8 mx-auto md:h-screen lg:py-0">
        {/* <div>
          <img src={Branch} alt="" className="w-96 my-20 " />
        </div> */}
        <div className="w-full md:w-full lg:w-full bg-gradient-to-b from-teal-200 to-teal-600 rounded-bl-full shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700 ">
          <div className="flex justify-center">
            <img className="w-32 mt-10 sm:mt-28" src={Logo} alt="logo" />
          </div>

          <div className="p-36 space-y-4  md:space-y-6 sm:p-8 ">
            <form
              className="space-y-4 md:space-y-6"
              onSubmit={(event) => {
                handleSubmit(event);
              }}>
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-white dark:text-white">
                  User Name
                </label>
                <input
                  type="text"
                  name="userName"
                  id="userName"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-gray-300 placeholder-opacity-100 "
                  required=""
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium dark:text-white text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600  dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-gray-300 placeholder-opacity-100 "
                  required=""
                />
              </div>
              <div className="flex gap-10 bg-gray-700 items-center p-2">
                <div className="ml-1">
                  <input
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    placeholder="Enter captcha"
                    classNameName="input100-captha"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 placeholder-gray-300 placeholder-opacity-100 "
                  />
                </div>
                <div className="mr-3">
                  <Captcha
                    charNum={6}
                    onChange={setCaptcha}
                    bgColor={"#FFFFFF"}
                    width={150}
                    fontSize={30}
                    className="rounded"
                  />
                </div>
              </div>
              <div className="">
                <button
                  type="submit"
                  className="text-white bg-teal-800 hover:bg-teal-200 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-full">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
