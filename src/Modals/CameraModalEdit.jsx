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

const validationSchema = Yup.object().shape({
  cam_url: Yup.string().required("الحقل إجباري"),
  location: Yup.string().required("الحقل إجباري"),
});

function CameraModalEdit({ open, onClose, refresh, camId }) {
  const [camera, setCamera] = useState({});
  const handlesubmit = async (values) => {
    // moment(values.date).format("yyyy-MM-DD")
    const res = await api.put(`/api/cameras/${camId}/update`, {
      cam_url: values?.cam_url,
      location: values?.location,
      type: values?.type,
    });
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      onClose();
      refresh();
    }
  };

  const getCamera = async () => {
    if (camId === 0) return;
    let res = await api.get(`/api/cameras/${camId}`);
    console.log(res.data);
    setCamera(res.data);
  };
  useEffect(() => {
    getCamera();
  }, [open, camId]);

  return (
    <AppModal
      closeModal={onClose}
      modalIsOpen={open}
      className="rounded-lg fixed top-[20%] left-0 ml-auto h-auto  right-0 mr-auto w-96  bg-background  shadow-md shadow-black border-[2px] border-primary "
    >
      <div className="w-full">
        <div className="w-full h-[3rem] ">
          <ModalHeader title={"تعديل كاميرا"} onClose={onClose}></ModalHeader>
        </div>

        <div
          className="flex flex-col items-center 
        w-full"
        >
          <AppForm
            validationSchema={validationSchema}
            initialValues={{
              cam_url: camera?.cam_url,
              location: camera?.location,
              type: camera?.type,
            }}
            onSubmit={handlesubmit}
          >
            <div className="w-11/12 mt-6 ">
              <AppFormField
                title="رابط الكاميرا"
                name={"cam_url"}
                type="text"
                placeholder=""
              ></AppFormField>
              <AppFormField
                title="موقع الكاميرا"
                name={"location"}
                type="text"
                placeholder=""
              ></AppFormField>

              <div className="flex w-full flex-row-reverse items-center justify-center">
                <div
                  className={`flex items-center justify-center
            w-full h-[2.0rem] 
            rounded-r-lg text-xl 
            text-font bg-primary `}
                >
                  نوع الموقع
                </div>
                <AppFormRadioButton
                  buttons={[
                    { name: "حرم", value: 3 },
                    { name: "مخرج", value: 2 },
                    { name: "مدخل", value: 1 },
                    { name: "قاعة", value: 0 },
                  ]}
                  fillBackground
                  name={"type"}
                ></AppFormRadioButton>
              </div>
            </div>

            <div
              className="flex justify-center items-center
            w-1/3 mb-3 mt-5"
            >
              <SubmitButton title={"تعديل"} />
            </div>
          </AppForm>
        </div>
      </div>
    </AppModal>
  );
}

export default CameraModalEdit;
