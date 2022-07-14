import React from "react";
import AppForm from "../components/form/AppForm";
import * as Yup from "yup";
import AppFormField from "../components/form/AppFormField";
import AppModal from "./AppModal";
import ModalHeader from "./ModalHeader";
import SubmitButton from "../components/form/SubmitButton";
import api from "../api/api";
import { toast } from "react-toastify";
import AppFormDatePicker from "../components/form/AppFormDatePicker";
import moment from "moment";
import { setUser } from "../api/user";

const validationSchema = Yup.object().shape({
  name_identifier: Yup.string().required("الحقل إجباري"),
  year: Yup.string().required("الحقل إجباري"),
  semester_start: Yup.date().required("الحقل إجباري"),
  number_of_weeks: Yup.number().required("الحقل إجباري").min(1),
});

function SemesterModalAdd({ open, onClose, refresh }) {
  const handlesubmit = async (values) => {
    // moment(values.date).format("yyyy-MM-DD")
    const res = await api.post("/api/semesters/add", {
      name_identifier: values?.name_identifier,
      year: values?.year,
      semester_start: moment(values?.semester_start).format("yyyy-MM-DD"),
      number_of_weeks: values?.number_of_weeks,
    });
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      setUser(res.data.user);
      onClose();
      refresh();
    }
  };
  return (
    <AppModal
      closeModal={onClose}
      modalIsOpen={open}
      className="rounded-lg fixed top-[20%] left-0 ml-auto h-[22rem]  right-0 mr-auto w-96  bg-background  shadow-md shadow-black border-[2px] border-primary "
    >
      <div className="w-full">
        <div className="w-full h-[3rem] ">
          <ModalHeader title={"إضافة فصل"} onClose={onClose}></ModalHeader>
        </div>

        <div
          className="flex flex-col items-center 
        w-full"
        >
          <AppForm
            validationSchema={validationSchema}
            initialValues={{
              name_identifier: "",
              year: "",
              semester_start: new Date(),
              number_of_weeks: 1,
            }}
            onSubmit={handlesubmit}
          >
            <div className="w-11/12 mt-6 ">
              <AppFormField
                title="اسم الفصل"
                name={"name_identifier"}
                type="text"
                placeholder=""
              ></AppFormField>
              <AppFormField
                title="العام الدراسي"
                name={"year"}
                type="text"
                placeholder=""
              ></AppFormField>
              <div className="w-full mb-[1.5rem]">
                <AppFormDatePicker
                  title="بداية الفصل"
                  name={"semester_start"}
                  type="text"
                  placeholder=""
                ></AppFormDatePicker>
              </div>
              <AppFormField
                title="عدد الأسابيع"
                name={"number_of_weeks"}
                type="text"
                placeholder=""
              ></AppFormField>
            </div>

            <div
              className="flex justify-center items-center
            w-1/3"
            >
              <SubmitButton title={"إضافة"} />
            </div>
          </AppForm>
        </div>
      </div>
    </AppModal>
  );
}

export default SemesterModalAdd;
