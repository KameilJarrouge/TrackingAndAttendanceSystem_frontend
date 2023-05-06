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
import { setUser } from "../api/user";
import AppFormRadioButton from "../components/form/AppFormRadioButton";
import moment from "moment";

const validationSchema = Yup.object().shape({
  name: Yup.string().required("الحقل إجباري"),
});

function HolidayModalEdit({ open, onClose, refresh, holidayId }) {
  const [holiday, setHoliday] = useState({});
  const handlesubmit = async (values) => {
    // moment(values.date).format("yyyy-MM-DD")
    const res = await api.put(`/api/holidays/${holidayId}/update`, {
      name: values.name,
      start: moment(values?.start).format("yyyy-MM-DD"),
      end: moment(values?.end).format("yyyy-MM-DD"),
    });
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      onClose();
      refresh();
    }
  };

  const getHoliday = async () => {
    if (holidayId === 0) return;
    let res = await api.get(`/api/holidays/${holidayId}`);
    setHoliday(res.data);
  };
  useEffect(() => {
    getHoliday();
  }, [open, holidayId]);

  return (
    <AppModal
      closeModal={onClose}
      modalIsOpen={open}
      className="rounded-lg fixed top-[20%] left-0 ml-auto h-auto  right-0 mr-auto w-96  bg-background  shadow-md shadow-black border-[2px] border-primary "
    >
      <div className="w-full">
        <div className="w-full h-[3rem] ">
          <ModalHeader title={"تعديل العطلة"} onClose={onClose}></ModalHeader>
        </div>

        <div
          className="flex flex-col items-center 
        w-full"
        >
          <AppForm
            validationSchema={validationSchema}
            initialValues={{
              name: holiday.name,
              start: new Date(moment(holiday?.start).toDate()),
              end: new Date(moment(holiday?.end).toDate()),
            }}
            onSubmit={handlesubmit}
          >
            <div className="w-11/12 mt-6 ">
              <AppFormField
                title="الاسم"
                name={"name"}
                type="text"
                placeholder=""
              ></AppFormField>
              <div className="w-full mb-[1.5rem]">
                <AppFormDatePicker
                  title="بداية العطلة"
                  name={"start"}
                  type="text"
                  placeholder=""
                ></AppFormDatePicker>
              </div>
              <div className="w-full mb-[1.5rem]">
                <AppFormDatePicker
                  title="نهاية العطلة"
                  name={"end"}
                  type="text"
                  placeholder=""
                ></AppFormDatePicker>
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

export default HolidayModalEdit;
