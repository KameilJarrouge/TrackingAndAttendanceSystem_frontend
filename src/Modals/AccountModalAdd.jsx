import React, { useEffect, useState } from "react";
import AppForm from "../components/form/AppForm";
import * as Yup from "yup";
import AppFormField from "../components/form/AppFormField";
import AppModal from "./AppModal";
import ModalHeader from "./ModalHeader";
import SubmitButton from "../components/form/SubmitButton";
import api from "../api/api";
import { toast } from "react-toastify";
import AppFormRadioButton from "../components/form/AppFormRadioButton";
const validationSchema = Yup.object().shape({
  username: Yup.string().required("يرجى إدخال اسم المستخدم"),
  password: Yup.string().required("يرجى إدخال كلمة المرور"),
});
function AccountModalAdd({ open, onClose, refresh }) {
  const handlesubmit = async (values) => {
    const res = await api.post(`/api/users/add`, {
      username: values?.username,
      password: values?.password,
      isAdmin: values?.isAdmin,
    });
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      onClose();
      refresh();
    }
  };

  return (
    <AppModal
      closeModal={onClose}
      modalIsOpen={open}
      className={`rounded-lg fixed top-[20%] left-0 ml-auto h-auto  right-0 mr-auto w-96    bg-background  shadow-md shadow-black border-[2px] border-primary `}
    >
      <div className="w-full">
        <div className="w-full h-[3rem] ">
          <ModalHeader title={"إضافة مستخدم"} onClose={onClose}></ModalHeader>
        </div>

        <div
          className="flex flex-col items-center 
        w-full"
        >
          <AppForm
            validationSchema={validationSchema}
            initialValues={{
              username: "",
              password: "",
              isAdmin: 1,
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
              <div className="w-full flex justify-center items-center">
                <AppFormRadioButton
                  minWidth="min-w-[60px]"
                  fillBackground
                  forced
                  name={"isAdmin"}
                  buttons={[
                    { name: "أدمن", value: 1 },
                    { name: "مدرس", value: 0 },
                  ]}
                ></AppFormRadioButton>
              </div>
            </div>

            <div
              className="flex justify-center items-center
            w-1/3 mb-3 mt-5"
            >
              <SubmitButton title={"إضافة"} />
            </div>
          </AppForm>
        </div>
      </div>
    </AppModal>
  );
}

export default AccountModalAdd;
