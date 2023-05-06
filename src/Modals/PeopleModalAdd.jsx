import React from "react";
import AppForm from "../components/form/AppForm";
import * as Yup from "yup";
import AppFormField from "../components/form/AppFormField";
import AppModal from "./AppModal";
import ModalHeader from "./ModalHeader";
import SubmitButton from "../components/form/SubmitButton";
import api from "../api/api";
import { toast } from "react-toastify";
import AppFormRadioButton from "../components/form/AppFormRadioButton";
import AppFormCheckBox2 from "../components/form/AppFormCheckBox2";
import { TbCrosshair, TbSquareForbid2 } from "react-icons/tb";
import { FiEye } from "react-icons/fi";
import AppFormImage from "../components/form/AppFormImage";
import { Tooltip } from "./Tooltip";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("الحقل إجباري"),
  id_number: Yup.string(),
});

function PeopleModalAdd({ open, onClose, refresh }) {
  const handlesubmit = async (values) => {
    let fd = new FormData();
    fd.append("id_number", values.id_number);
    fd.append("name", values.name.toString());
    fd.append("track", values.track);
    fd.append("on_blacklist", values.on_blacklist);

    if (values.track === 1) {
      fd.append("recognize", 1);
    } else {
      fd.append("recognize", values.recognize);
    }

    fd.append("identity", values.identity);
    if (values.image1 !== undefined) {
      fd.append("image1", values.image1, "image1");
    }
    if (values.image2 !== undefined) {
      fd.append("image2", values.image2, "image2");
    }
    if (values.image3 !== undefined) {
      fd.append("image3", values.image3, "image3");
    }
    const res = await api.post("/api/people/add", fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
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
      className="rounded-lg fixed top-[10%] left-0 ml-auto h-[28rem]  right-0 mr-auto w-[70rem]  bg-background  shadow-md shadow-black border-[2px] border-primary "
    >
      <div className="w-full h-full">
        <div className="w-full h-[3rem] ">
          <ModalHeader title={"إضافة شخص"} onClose={onClose}></ModalHeader>
        </div>

        <div
          className="flex flex-col items-center 
        w-full h-[25rem] pt-4"
        >
          <AppForm
            validationSchema={validationSchema}
            initialValues={{
              id_number: "",
              name: "",
              track: 0,
              identity: 1,
              recognize: 1,
              on_blacklist: 0,
              image1: undefined,
              image2: undefined,
              image3: undefined,
            }}
            onSubmit={handlesubmit}
          >
            <div dir="rtl" className="w-full h-[24rem] flex">
              {/* right panel */}
              <div className="w-1/3 h-full  mr-1 ">
                <div className="w-full h-1/6">
                  <ModalHeader title={"معلومات الشخص"}></ModalHeader>
                </div>
                <div
                  className=" flex flex-col justify-start items-center
                        w-auto h-5/6
                         mx-2 pt-4"
                >
                  <AppFormField
                    name={"id_number"}
                    title={"الرقم الجامعي"}
                  ></AppFormField>
                  <AppFormField name={"name"} title={"الاسم"}></AppFormField>
                  {/* identity */}
                  <div className="w-full flex mb-2">
                    <div className=" w-3/4 h-[2rem] rounded-r-md flex justify-center items-center bg-primary text-xl  text-font">
                      الهوية
                    </div>
                    <AppFormRadioButton
                      forced
                      fillBackground
                      name={"identity"}
                      buttons={[
                        { name: "طالب", value: 1 },
                        { name: "مدرس", value: 2 },
                        { name: "إداري", value: 0 },

                        { name: "غير", value: 3 },
                      ]}
                    ></AppFormRadioButton>
                  </div>
                  <div className="w-full flex justify-between items-center mt-4">
                    {/* recognize */}
                    <div className="w-1/3 flex">
                      <div className=" w-3/5 h-[2rem] rounded-r-md flex justify-center items-center bg-primary text-xl  text-font">
                        <Tooltip message={"التعرف على الشخص"} visible nowrap>
                          تعرف
                        </Tooltip>
                      </div>
                      <div className="w-2/5">
                        <AppFormCheckBox2
                          double
                          className={"text-accent "}
                          name={"recognize"}
                          input={<FiEye className="text-3xl" />}
                        ></AppFormCheckBox2>
                      </div>
                    </div>

                    {/* tracked */}
                    <div className="w-1/3 flex">
                      <div className=" w-3/5 h-[2rem] rounded-r-md flex justify-center items-center bg-primary text-xl  text-font">
                        <Tooltip
                          message={"الاحتفاظ بصورة عند التعرف"}
                          visible
                          nowrap
                        >
                          تعقب
                        </Tooltip>
                      </div>
                      <div className="w-2/5">
                        <AppFormCheckBox2
                          double
                          className={"text-amber-500"}
                          name={"track"}
                          input={<TbCrosshair className="text-3xl" />}
                        ></AppFormCheckBox2>
                      </div>
                    </div>

                    {/* forbidden */}
                    <div className="w-1/3 flex">
                      <div className=" w-3/5 h-[2rem] rounded-r-md flex justify-center items-center bg-primary text-xl  text-font">
                        <Tooltip
                          message={"الشخص ممنوع من دخول الحرم"}
                          visible
                          nowrap
                        >
                          ممنوع
                        </Tooltip>
                      </div>
                      <div className="w-2/5">
                        <AppFormCheckBox2
                          double
                          className={"text-red-500 "}
                          name={"on_blacklist"}
                          input={<TbSquareForbid2 className="text-3xl" />}
                        ></AppFormCheckBox2>
                      </div>
                    </div>
                  </div>
                  {/* submit */}
                  <div className="w-full mt-8">
                    <SubmitButton title={"إضافة الشخص"}></SubmitButton>
                  </div>
                </div>
              </div>
              {/* devider */}
              <div className="w-0.5  mx-1 h-[98%] bg-primary"></div>
              {/* left panel */}
              <div className="w-2/3 h-full  ml-1">
                <div className="w-full h-1/6">
                  <ModalHeader title={"صور الشخص"}></ModalHeader>
                </div>
                <div
                  className="flex justify-between items-start
                    w-full h-5/6  px-5 pt-4 "
                >
                  <AppFormImage name={"image1"}></AppFormImage>
                  <AppFormImage name={"image2"}></AppFormImage>
                  <AppFormImage name={"image3"}></AppFormImage>
                </div>
              </div>
            </div>
          </AppForm>
        </div>
      </div>
    </AppModal>
  );
}

export default PeopleModalAdd;
