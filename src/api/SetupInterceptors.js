import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "./api";

const SetupInterceptors = (navigate) => {
  api.interceptors.response.use(null, (error) => {
    // Do something with response error
    if (error?.response?.status === 401) {
      // console.log(error.response);
      // toast.error("اسم المستخدم أو كلمة المرور خاطئة");
      window.location.href = "localhost:3000/login";
      // toast.error("error 401");
    } else if (error?.response?.status === 402) {
      toast.error("اسم المستخدم أو كلمة المرور خاطئة");
      navigate("/login");
    } else if (error?.response?.status === 403) {
      toast.error("لا تملك الصلاحيات");
    } else if (error?.response?.status === 404) {
      navigate("/404");
    } else {
      toast.error("error 500");
    }

    return Promise.reject(error);
  });
};

export default SetupInterceptors;
