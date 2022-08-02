import React, { useEffect, useState } from "react";
import AppForm from "../components/form/AppForm";
import * as Yup from "yup";
import AppFormField from "../components/form/AppFormField";
import AppModal from "./AppModal";
import ModalHeader from "./ModalHeader";
import SubmitButton from "../components/form/SubmitButton";
import api from "../api/api";
import { toast } from "react-toastify";
import { getUser, setUser } from "../api/user";
const validationSchema = Yup.object().shape({
  username: Yup.string().required("يرجى إدخال اسم المستخدم"),
});
function AccountModalEdit({ open, onClose, refresh, userId = 0 }) {
  const [reactUser, setReactUser] = useState({});
  const handlesubmit = async (values) => {
    // moment(values.date).format("yyyy-MM-DD")
    let password = values.password;
    if (password === "") {
      password = "-1";
    }
    const res = await api.put(`/api/users/${userId}/update`, {
      username: values?.username,
      password: password,
    });
    console.log("update", res.data);
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      setUser(res.data.user);
      onClose();
      refresh();
    }
  };

  const getUserFromApi = async () => {
    if (userId === 0) {
      return;
    }
    let res = await api.get(`/api/users/${userId}`);
    // console.log(res.data);
    setReactUser(res.data);
  };
  useEffect(() => {
    getUserFromApi();
  }, [open]);

  return (
    <AppModal
      closeModal={onClose}
      modalIsOpen={open}
      className="rounded-lg fixed top-[20%] left-0 ml-auto h-auto  right-0 mr-auto w-96  bg-background  shadow-md shadow-black border-[2px] border-primary "
    >
      <div className="w-full">
        <div className="w-full h-[3rem] ">
          <ModalHeader title={"تعديل الحساب"} onClose={onClose}></ModalHeader>
        </div>

        <div
          className="flex flex-col items-center 
        w-full"
        >
          <AppForm
            validationSchema={validationSchema}
            initialValues={{
              username: reactUser?.username,
              password: "",
            }}
            onSubmit={handlesubmit}
          >
            <div className="w-11/12 mt-6 ">
              <AppFormField
                title="اسم المستخدم"
                name={"username"}
                type="text"
                placeholder=""
              ></AppFormField>
              <AppFormField
                title="كلمة السر"
                name={"password"}
                type="password"
                placeholder=""
              ></AppFormField>
            </div>

            <div
              className="flex justify-center items-center
            w-1/3 mb-3 mt-4"
            >
              <SubmitButton title={"تعديل"} />
            </div>
          </AppForm>
        </div>
      </div>
    </AppModal>
  );
}

export default AccountModalEdit;
