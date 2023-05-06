import React, { useEffect, useState } from "react";
import AppForm from "../components/form/AppForm";
import * as Yup from "yup";
import AppFormField from "../components/form/AppFormField";
import AppModal from "./AppModal";
import ModalHeader from "./ModalHeader";
import SubmitButton from "../components/form/SubmitButton";
import api from "../api/api";
import { toast } from "react-toastify";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("الحقل إجباري"),
  department: Yup.string().required("الحقل إجباري"),
});

function SubjectModalEdit({ open, onClose, refresh, id, setId = (f) => f }) {
  const [subject, setSubject] = useState({});

  useEffect(() => {
    getSubject();
  }, [id]);

  const getSubject = async () => {
    if (id === 0 || id === undefined) return;
    let res = await api.get(`/api/subjects/${id}`);
    setSubject(res.data);
  };
  const handlesubmit = async (values) => {
    // moment(values.date).format("yyyy-MM-DD")
    const res = await api.put(`/api/subjects/${id}/update`, values);
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
      className="rounded-lg fixed top-[20%] left-0 ml-auto h-[15rem]  right-0 mr-auto w-[26rem]  bg-background  shadow-md shadow-black border-[2px] border-primary "
    >
      <div className="w-full">
        <div className="w-full h-[3rem] ">
          <ModalHeader title={"تعديل مقرر"} onClose={onClose}></ModalHeader>
        </div>

        <div
          className="flex flex-col items-center 
        w-full"
        >
          <AppForm
            validationSchema={validationSchema}
            initialValues={{
              name: subject?.name,
              department: subject?.department,
            }}
            onSubmit={handlesubmit}
          >
            <div className="w-11/12 mt-6 ">
              <AppFormField
                title="اسم المقرر"
                name={"name"}
                type="text"
                placeholder=""
              ></AppFormField>
              <AppFormField
                title="الكلية"
                name={"department"}
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

export default SubjectModalEdit;
