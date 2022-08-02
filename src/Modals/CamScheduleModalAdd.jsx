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
import { setUser } from "../api/user";
import AppFormRadioButton from "../components/form/AppFormRadioButton";
import AppFormSelect from "../components/form/AppFormSelect";
import moment from "moment";

function CamScheduleModalAdd({ open, onClose, refresh, camId }) {
  const handlesubmit = async (values) => {
    if (
      moment(values.start).format("HH:mm:ss") ===
        moment(values.end).format("HH:mm:ss") ||
      moment(values.start).format("HH:mm:ss") >
        moment(values.end).format("HH:mm:ss")
    ) {
      toast.error("لا يوجد فترة زمنية بين هذه الأوقات");
      return;
    }
    const res = await api.post(`/api/cameras/${camId}/add-schedule`, {
      start: moment(values.start).format("HH:mm:ss"),
      end: moment(values.end).format("HH:mm:ss"),
      day: values.day,
    });
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      onClose();
      refresh();
    } else {
      toast.error(res.data.message);
    }
  };
  return (
    <AppModal
      closeModal={onClose}
      modalIsOpen={open}
      className="rounded-lg fixed top-[20%] left-0 ml-auto h-auto  right-0 mr-auto w-96  bg-background  shadow-md shadow-black border-[2px] border-primary "
    >
      <div className="w-full">
        <div className="w-full h-[3rem] ">
          <ModalHeader title={"إضافة وقت عمل"} onClose={onClose}></ModalHeader>
        </div>

        <div
          className="flex flex-col items-center 
        w-full"
        >
          <AppForm
            validationSchema={null}
            initialValues={{
              start: new Date(
                moment("2000-01-01 08:00:00", "yyyy-mm-dd HH:mm:ss").toDate()
              ),
              end: new Date(
                moment("2000-01-01 16:00:00", "yyyy-mm-dd HH:mm:ss").toDate()
              ),
              day: 0,
            }}
            onSubmit={handlesubmit}
          >
            <div className="w-11/12  ">
              <div className="my-6">
                <AppFormDatePicker
                  itemsPos="center"
                  title="البداية"
                  format="HH:mm"
                  name={"start"}
                ></AppFormDatePicker>
              </div>
              <div className="my-6">
                <AppFormDatePicker
                  itemsPos="center"
                  title="النهاية"
                  format="HH:mm"
                  name={"end"}
                ></AppFormDatePicker>
              </div>
              <div dir="rtl" className="mt-6">
                <AppFormSelect
                  infoWidth="2/5"
                  selectWidth="3/5"
                  title={
                    <div className="w-full text-center font-normal">اليوم</div>
                  }
                  name={"day"}
                  options={[
                    { name: "جميع الأيام", value: -1 },
                    { name: "الأحد", value: 0 },
                    { name: "الاثنين", value: 1 },
                    { name: "الثلاثاء", value: 2 },
                    { name: "الأربعاء", value: 3 },
                    { name: "الخميس", value: 4 },
                    { name: "الجمعة", value: 5 },
                    { name: "السبت", value: 6 },
                  ]}
                  valueAttr="value"
                  renderAttr="name"
                ></AppFormSelect>
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

export default CamScheduleModalAdd;
