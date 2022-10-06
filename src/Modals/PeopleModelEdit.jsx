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
import AppFormCheckBox2 from "../components/form/AppFormCheckBox2";
import { TbCrosshair, TbSquareForbid2 } from "react-icons/tb";
import AppFormImage from "../components/form/AppFormImage";
import { Tooltip } from "./Tooltip";
import { FiEye } from "react-icons/fi";
const validationSchema = Yup.object().shape({
  name: Yup.string().required("الحقل إجباري"),
  id_number: Yup.string().required("الحقل إجباري"),
});

function PeopleModalEdit({ open, onClose, refresh, id }) {
  const [person, setPerson] = useState({});
  const [image1Url, setImage1Url] = useState("");
  const [image1Id, setImage1Id] = useState(0);
  const [image2Url, setImage2Url] = useState("");
  const [image2Id, setImage2Id] = useState(0);
  const [image3Url, setImage3Url] = useState("");
  const [image3Id, setImage3Id] = useState(0);
  const getPerson = async () => {
    if (id === 0 || id === undefined) return;
    let res = await api.get(`/api/people/${id}`);
    console.log(res.data);
    setPerson(res.data);
    if (res.data.images[0] !== undefined) {
      setImage1Url(res.data.images[0].url + "?" + new Date().getTime());
      setImage1Id(res.data.images[0].id);
    } else {
      setImage1Url("");
      setImage1Id(0);
    }
    if (res.data.images[1] !== undefined) {
      setImage2Url(res.data.images[1].url + "?" + new Date().getTime());
      setImage2Id(res.data.images[1].id);
    } else {
      setImage2Url("");
      setImage2Id(0);
    }
    if (res.data.images[2] !== undefined) {
      setImage3Url(res.data.images[2].url + "?" + new Date().getTime());
      setImage3Id(res.data.images[2].id);
    } else {
      setImage3Url("");
      setImage3Id(0);
    }
  };
  useEffect(() => {
    getPerson();
  }, [id, open]);

  const handlesubmit = async (values) => {
    const res = await api.put(`/api/people/${id}/update`, values);
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      getPerson();
      onClose();
      refresh();
    }
  };
  const handleImageUpdate = async (id, file, name) => {
    let fd = new FormData();

    fd.append("image", file, "image");
    fd.append("imageNumber", name);

    let res = await api.post(`/api/images/${id}/update`, fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    console.log(res);
    getPerson();
  };
  const handleImageCreate = async (person_id, file, name) => {
    let fd = new FormData();
    fd.append("image", file, "image");
    fd.append("imageNumber", name);
    let res = await api.post(`/api/images/${person_id}/store`, fd, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    getPerson();
  };
  const handleImageDelete = async (id) => {
    let res = await api.delete(`/api/images/${id}/delete`);
    getPerson();
  };

  return (
    <AppModal
      closeModal={onClose}
      modalIsOpen={open}
      className="rounded-lg fixed top-[10%] left-0 ml-auto h-[28rem]  right-0 mr-auto w-[70rem]  bg-background  shadow-md shadow-black border-[2px] border-primary "
    >
      <div className="w-full h-full">
        <div className="w-full h-[3rem] ">
          <ModalHeader title={`تعديل شخص`} onClose={onClose}></ModalHeader>
        </div>

        <div
          className="flex flex-col items-center 
        w-full h-[25rem] pt-4"
        >
          <AppForm
            validationSchema={validationSchema}
            initialValues={{
              id_number: person.id_number,
              name: person.name,
              track: person.track,
              recognize: person.recognize,
              on_blacklist: person.on_blacklist,
              identity: person.identity,
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
                    <div className=" w-3/4 h-[2rem] rounded-r-md flex justify-center items-center bg-primary text-xl font-semibold text-font">
                      الهوية
                    </div>
                    <AppFormRadioButton
                      // editable={false}
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
                    <SubmitButton title={"تعديل معلومات الشخص"}></SubmitButton>
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
                    w-full h-5/6  px-5 pt-4"
                >
                  <AppFormImage
                    imgUrl={image1Url}
                    name={"image1"}
                    id={image1Id}
                    person_id={person.id}
                    onCreate={handleImageCreate}
                    onUpdate={handleImageUpdate}
                    onDelete={handleImageDelete}
                  ></AppFormImage>
                  <AppFormImage
                    imgUrl={image2Url}
                    name={"image2"}
                    id={image2Id}
                    person_id={person.id}
                    onCreate={handleImageCreate}
                    onUpdate={handleImageUpdate}
                    onDelete={handleImageDelete}
                  ></AppFormImage>
                  <AppFormImage
                    imgUrl={image3Url}
                    name={"image3"}
                    id={image3Id}
                    person_id={person.id}
                    onCreate={handleImageCreate}
                    onUpdate={handleImageUpdate}
                    onDelete={handleImageDelete}
                  ></AppFormImage>
                </div>
              </div>
            </div>
          </AppForm>
        </div>
      </div>
    </AppModal>
  );
}

export default PeopleModalEdit;
