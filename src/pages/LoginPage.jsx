import React, { useContext, useEffect } from "react";
import { ReactComponent as Logo } from "../assets/Logo.svg";
import * as Yup from "yup";
import AppForm from "../components/form/AppForm";
import LoginFormField from "../components/form/LoginFormField";
import SubmitButton from "../components/form/SubmitButton";
import api from "../api/api";
import UserContext from "../context/userContext";
import { setToken } from "../api/token";
import { setUser } from "../api/user";
import { useNavigate } from "react-router-dom";
import LoginSubmitButton from "../components/form/LoginSubmitButton";
const validationSchema = Yup.object().shape({
  username: Yup.string().required("يرجى إدخال اسم المستخدم"),
  password: Yup.string().required("يرجى إدخال كلمة المرور"),
});
function LoginPage() {
  const userContext = useContext(UserContext);
  let navigate = useNavigate();
  const getCookie = async () => {
    await api.get(`/sanctum/csrf-cookie`);
  };
  useEffect(() => {
    getCookie();
  }, []);

  const handlesubmit = async (values) => {
    let res = await api.post("/api/login", values);
    console.log(res.data);
    userContext.setUser(res.data.user);
    // setToken(res.data.token);
    setUser(res.data.user);
    navigate("/dashboard");
  };
  return (
    <div className="w-full h-[100vh] bg-background_special flex justify-center items-center">
      <div className="w-1/3 h-2/3 bg-primary flex flex-col items-center rounded-2xl">
        <div className="w-2/3 h-full mt-4">
          {/* header */}
          <div className=" h-1/5 flex  items-center">
            <Logo width={70} height={70}></Logo>
            <span className="ml-6 text-font font-extrabold text-3xl font-serif w-3/4">
              System
            </span>
          </div>
          {/* seperator */}
          <div className="w-full h-0.5 bg-accent"></div>
          {/* form */}
          <div className="h-4/5 mt-2 ">
            <AppForm
              validationSchema={validationSchema}
              initialValues={{ username: "", password: "" }}
              onSubmit={handlesubmit}
            >
              <div className=" h-[65%]">
                <LoginFormField
                  name={"username"}
                  title="اسم المستخدم"
                ></LoginFormField>
                <LoginFormField
                  type="password"
                  name={"password"}
                  title="كلمة المرور"
                ></LoginFormField>
              </div>
              <div className="w-full flex items-start justify-center h-[35%]">
                <LoginSubmitButton title={"تسجيل دخول"}></LoginSubmitButton>
              </div>
            </AppForm>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
