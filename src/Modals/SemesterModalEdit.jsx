import React, { useEffect, useState } from "react";
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
const validationSchema = Yup.object().shape({
  name_identifier: Yup.string().required("الحقل إجباري"),
  year: Yup.string().required("الحقل إجباري"),
  semester_start: Yup.date().required("الحقل إجباري"),
  number_of_weeks: Yup.number().required("الحقل إجباري").min(1),
});

function SemesterModalEdit({ open, onClose, refresh, id, setId = (f) => f }) {
  const [semester, setSemester] = useState({});

  useEffect(() => {
    getSemester();
  }, [id]);

  const getSemester = async () => {
    if (id === 0 || id === undefined) return;
    let res = await api.get(`/api/semesters/${id}`);
    setSemester(res.data);
  };
  const handlesubmit = async (values) => {
    // moment(values.date).format("yyyy-MM-DD")
    const res = await api.put(`/api/semesters/${id}/update`, {
      name_identifier: values?.name_identifier,
      year: values?.year,
      semester_start: moment(values?.semester_start).format("yyyy-MM-DD"),
      number_of_weeks: values?.number_of_weeks,
    });
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      onClose();
      refresh();
      setId(0);
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
          <ModalHeader title={"تعديل فصل"} onClose={onClose}></ModalHeader>
        </div>

        <div
          className="flex flex-col items-center 
        w-full"
        >
          <AppForm
            validationSchema={validationSchema}
            initialValues={{
              name_identifier: semester?.name_identifier,
              year: semester?.year,
              semester_start: new Date(
                moment(semester?.semester_start).toDate()
              ),
              number_of_weeks: semester?.number_of_weeks,
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
              <AppFormDatePicker
                title="بداية الفصل"
                name={"semester_start"}
                type="text"
                placeholder=""
              ></AppFormDatePicker>
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
              <SubmitButton title={"تعديل"} />
            </div>
          </AppForm>
        </div>
      </div>
    </AppModal>
  );
}

export default SemesterModalEdit;
