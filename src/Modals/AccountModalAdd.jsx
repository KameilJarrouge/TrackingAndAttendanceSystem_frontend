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
import { Autocomplete, TextField } from "@mui/material";
import { useFormikContext } from "formik";
const validationSchema = Yup.object().shape({
  username: Yup.string().required("يرجى إدخال اسم المستخدم"),
  password: Yup.string().required("يرجى إدخال كلمة المرور"),
});
function AccountModalAdd({ open, onClose, refresh }) {
  const [professor, setProfessor] = useState(null);
  const [professorOptions, setProfessorOptions] = useState([]);
  const [professorInputValue, setProfessorInputValue] = useState("");
  const [openAutoComplete, setOpenAutoComplete] = useState(false);
  const handlesubmit = async (values) => {
    if (values.isAdmin === 0 && professor === null) {
      toast.error("يرجى اختيار مدرس");
      return;
    }
    const res = await api.post(`/api/users/add`, {
      username: values?.username,
      password: values?.password,
      isAdmin: values?.isAdmin,
      prof_id: professor?.id || "-1",
    });
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      onClose();
      refresh();
    }
  };
  const handleChoosingProf = (value) => {
    if (value === 0) {
      setOpenAutoComplete(true);
    } else {
      setOpenAutoComplete(false);
    }
  };
  const getProfessorOptions = async () => {
    let res = await api.get("/api/professors/userable-professors");
    setProfessorOptions(res.data);
  };

  useEffect(() => {
    getProfessorOptions();
  }, [open]);

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
              <div className="w-full flex justify-center items-center mb-5">
                <AppFormRadioButton
                  afterClick={handleChoosingProf}
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
              {openAutoComplete && (
                <Autocomplete
                  isOptionEqualToValue={(option1, option2) => {
                    return option1.name === option2.name;
                  }}
                  getOptionLabel={(option) => `${option?.name}`}
                  renderOption={(props, option, state) => {
                    return (
                      <div
                        {...props}
                        dir="rtl"
                        className="self-center border-[2px] my-1 text-2xl  px-4 mx-1 rounded-lg   flex justify-between items-center cursor-pointer
                      hover:text-white hover:bg-primary_dark transition-all border-primary_light text-font bg-primary_light"
                      >
                        <div>{option.name}</div>
                      </div>
                    );
                  }}
                  value={professor}
                  onChange={(event, newValue) => {
                    setProfessor(newValue);
                  }}
                  inputValue={professorInputValue}
                  onInputChange={(event, newInputValue) => {
                    setProfessorInputValue(newInputValue);
                  }}
                  dir="ltr"
                  className="border-primary border-[1px] bg-input rounded-md w-full self-center my-1 text-right text-primary text-3xl "
                  disablePortal
                  id="combo-box-demo"
                  options={professorOptions}
                  renderInput={(params) => {
                    params.value = professor?.name || "";
                    return (
                      <TextField
                        {...params}
                        // label="اسم المادة"
                        placeholder="المدرس"
                        dir="rtl"
                        className="text-right border-primary text-3xl text-primary"
                      />
                    );
                  }}
                />
              )}
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
