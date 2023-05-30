import axios from "axios";

// const token = process.env.REACT_APP_TOKEN;

export const getToken = async () => {
  try {
    const apiToken = await axios.post(
      "http://116.206.196.65:30983/skycore/token",
      {
        data: {
          username: "SKYWORXAPIAccess",
          password: "SkyW0rxC0n5ult1n9",
        },
      },
      {
        headers: {
          "Content-Type": "application/x-www-form-urlencoded",
          username: "SKYWORXAPIAccess",
          password: "SkyW0rxC0n5ult1n9",
        },
      }
    );

    // alert("Berhasil Hit token");

    return apiToken.data.access_token;
  } catch (error) {
    alert("Gagal");
  }
};
