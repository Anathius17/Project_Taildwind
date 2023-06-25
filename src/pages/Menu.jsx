// // const dataMenu = localStorage.getItem("MenuList");
// // const parsedData = JSON.parse(dataMenu);
// // const dataMenuLevel = localStorage.getItem("detailRoleUser");
// // const parsedDataLevel = JSON.parse(dataMenuLevel);

// import axios from "axios";

// // export const getMenuList = () => {
// //   const dataMenu = localStorage.getItem("MenuList");
// //   const parsedData = JSON.parse(dataMenu);
// //   return parsedData;
// // };

// // export const getLevelMenu = () => {
// //   const dataMenuLevel = localStorage.getItem("detailRoleUser");
// //   const parsedDataLevel = JSON.parse(dataMenuLevel);
// //   return parsedDataLevel;
// // };

//  const getDataUserRoleDetail = async () => {
//    try {
//      const userRoleDetail = await axios.post(
//        "http://116.206.196.65:30983/skycore/Login/getDataUserRoleDetail",
//        {
//    user: "username",
//    modules: "CORE",
//  },
//        {
//          headers: {
//            "Content-Type": "application/json",
//            Authorization: `Bearer ${token}`,
//          },
//        }
//      );

//      let dataUserRoleDetailApi = userRoleDetail.data.data.map((e) => {
//        return e;
//      });

//      setDataRoleUserDetail(dataUserRoleDetailApi);
//    } catch (error) {
//      alert("reset fail login gagal");
//    }
//  };

//  const generalListMenuAPI = async () => {
//    try {
//      const listMenu = await axios.get(
//        "http://116.206.196.65:30983/skycore/Login/GenerateListMenu/0",
//        {
//          headers: {
//            "Content-Type": "application/json",
//            Authorization: `Bearer ${token}`,
//          },
//        }
//      );

//      let generalListMenu = listMenu.data.data.map((e) => {
//        return e;
//      });

//     //  setListMenuSend(generalListMenu);
//    } catch (error) {
//      alert("List Menu gagal");
//    }
//  };
