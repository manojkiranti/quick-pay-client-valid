import axios from "axios";
import router from "../router";

let baseEndpoint = "";
if (process.env.NODE_ENV === "development") {
  baseEndpoint = process.env.VUE_APP_BASE_URL_DEV;
} else {
  baseEndpoint = process.env.VUE_APP_BASE_URL;
}

const instance = axios.create({
  baseURL: baseEndpoint,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
  },
  timeout: 50000, // request timeout
});

// response interceptor
instance.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
   */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  (response) => {
    const res = response;

    // if the custom code is not 20000, it is judged as an error.

    return res;
  },
  (error) => {
    console.log("err" + error); // for debug
    //   console.log('err code ' + error.response.status) // for debug

    if (error.response.status == "403" || error.response.status == "401") {
      alert("Unauthorized");
      router.push("/404");
    }
    return Promise.reject(error);
  }
);

export default instance;
