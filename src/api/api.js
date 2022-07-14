import Axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import history from "./history";
import { getToken } from "./token";

const api = Axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "content-type": "application/json",
    Accept: "application/json",
  },
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => {
    // config.headers["Authorization"] = "bearer " + getToken();
    // console.log("====================================");
    // console.log(config);
    // console.log("====================================");
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);
api.interceptors.response.use(null, (error) => {
  // Do something with response error
  if (error?.response?.status === 401 || error?.response?.status === 419) {
    // console.log(error.response);
    // toast.error("اسم المستخدم أو كلمة المرور خاطئة");
    history.replace("/login");
    // toast.error("يرجى تسجيل الدخول");
  } else if (error?.response?.status === 402) {
    toast.error("اسم المستخدم أو كلمة المرور خاطئة");
    // history.replace("/login");
  } else if (error?.response?.status === 403) {
    toast.error("المستخدم لا يمتلك الصلاحيات");
  } else if (error?.response?.status === 404) {
    // history.replace("/404");
  } else {
    if (error.response.data.message.indexOf("Duplicate entry") !== -1) {
      toast.error("يرجى إدخال قيم فريدة");
    } else {
      toast.error("error 500");
    }
  }

  return Promise.reject(error);
});

export default api;
