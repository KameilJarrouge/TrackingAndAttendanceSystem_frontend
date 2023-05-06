import React, { useEffect, useState } from "react";
import AppForm from "../components/form/AppForm";
import * as Yup from "yup";
import AppModal from "./AppModal";
import ModalHeader from "./ModalHeader";
import SubmitButton from "../components/form/SubmitButton";
import api from "../api/api";
import { toast } from "react-toastify";
import { Autocomplete, TextField } from "@mui/material";
import AppFormRadioButton from "../components/form/AppFormRadioButton";
import AppFormDatePicker from "../components/form/AppFormDatePicker";
import AppFormSelect from "../components/form/AppFormSelect";
import moment from "moment";
import AppFormField from "../components/form/AppFormField";
const validationSchema = Yup.object().shape({});

function SubjectGivenModalEdit({
  open,
  onClose,
  refresh,
  professorId,
  givenSubjectId,
}) {
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectInputValue, setSubjectInputValue] = useState("");

  const [cameraOptions, setCameraOptions] = useState([]);
  const [selectedCamera, setSelectedCamera] = useState(null);
  const [cameraInputValue, setCameraInputValue] = useState("");

  const getCameraOptions = async () => {
    let res = await api.get(`/api/cameras/options`);
    setCameraOptions(res.data);
  };

  const getSubject = async () => {
    if (givenSubjectId === 0) return;
    let res = await api.get(`/api/given-subjects/${givenSubjectId}/info`);
    console.log("====================================");
    console.log(res.data);
    console.log("====================================");
    setSelectedSubject(res.data);
    setSelectedCamera(res.data.cam);
  };

  useEffect(() => {
    getSubject();
    getCameraOptions();
  }, [open, givenSubjectId]);

  const handlesubmit = async (values) => {
    if (selectedSubject === null) {
      toast.error("يرجى اختيار مقرر");
      return;
    }
    const res = await api.put(
      `/api/given-subjects/${givenSubjectId}/update-subject`,
      {
        cam_id: selectedCamera?.id || null,
        time: moment(values.time).format("HH:mm:ss"),
        day: values.day,
        is_theory: values.is_theory,
        group: values.group,
        attendance_pre: values.attendance_pre,
        attendance_post: values.attendance_post,
        attendance_present: values.attendance_present,
      }
    );

    if (res.data.status === "ok") {
      toast.success(res.data.message);

      setSelectedSubject(null);
      setSelectedCamera(null);
      onClose();
      refresh();
    } else {
      toast.warning(res.data.message);
    }
  };
  return (
    <AppModal
      closeModal={onClose}
      modalIsOpen={open}
      className="rounded-lg fixed top-[10%] left-0 ml-auto h-auto  right-0 mr-auto w-[34rem] bg-background  shadow-md shadow-black border-[2px] border-primary "
    >
      <div className="w-full">
        <div className="w-full h-[3rem] ">
          <ModalHeader
            title={"تعديل مقرر لمدرس"}
            onClose={onClose}
          ></ModalHeader>
        </div>

        <div
          className="flex flex-col items-center 
        w-full"
        >
          <div className="w-11/12 my-4 ">
            <AppForm
              validationSchema={validationSchema}
              initialValues={{
                is_theory: selectedSubject?.is_theory,
                time: new Date(
                  moment(
                    "2000-01-01 " + selectedSubject?.time,
                    "yyyy-MM-DD HH:mm:ss"
                  ).toDate()
                ),
                day: selectedSubject?.day,
                group: selectedSubject?.group,
                attendance_pre: selectedSubject?.attendance_pre || null,
                attendance_post: selectedSubject?.attendance_post || null,
                attendance_present: selectedSubject?.attendance_present || null,
              }}
              onSubmit={handlesubmit}
            >
              {/* subject */}
              <div className="w-full flex flex-row-reverse">
                <Autocomplete
                  disabled
                  isOptionEqualToValue={(option1, option2) => {
                    return option1.name === option2.name;
                  }}
                  getOptionLabel={(option) => `${option?.subject.name}`}
                  renderOption={(props, option, state) => {
                    return (
                      <div
                        {...props}
                        dir="rtl"
                        className="self-center border-[2px]  my-2 text-2xl   px-4 mx-1 rounded-lg flex justify-between items-center cursor-pointer
                        hover:text-white hover:bg-primary_dark transition-all border-primary_light text-font bg-primary_light "
                      >
                        <div>{option.name}</div>
                      </div>
                    );
                  }}
                  value={selectedSubject}
                  onChange={(event, newValue) => {
                    setSelectedSubject(newValue);
                  }}
                  inputValue={subjectInputValue}
                  onInputChange={(event, newInputValue) => {
                    setSubjectInputValue(newInputValue);
                  }}
                  dir="ltr"
                  className="border-primary border-[1px] bg-input rounded-md w-full self-center my-1 text-right text-primary text-3xl "
                  disablePortal
                  id="combo-box-demo"
                  options={subjectOptions}
                  renderInput={(params) => {
                    params.value = selectedSubject?.name;
                    return (
                      <TextField
                        {...params}
                        // label="اسم المادة"
                        placeholder="اسم المقرر"
                        dir="rtl"
                        className="text-right border-primary text-3xl text-primary"
                      />
                    );
                  }}
                />
              </div>
              <div className="w-full flex flex-col items-center justify-between mt-1 mb-6">
                {/* time and day */}
                <div className="flex w-full flex-row-reverse justify-between">
                  <div className="w-1/2 ">
                    <AppFormDatePicker
                      tooltipMessage="بداية المحاضرة"
                      tooltipVisiable
                      itemsPos="center"
                      title="التوقيت"
                      format="HH:mm"
                      name={"time"}
                    ></AppFormDatePicker>
                  </div>
                  <div dir="rtl" className="w-1/2 mr-2 ">
                    <AppFormSelect
                      title="اليوم"
                      name={"day"}
                      options={[
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
                {/* is_theory and group */}
                <div className="flex w-full flex-row justify-between mt-2">
                  <div className="w-1/2  flex justify-center ">
                    <AppFormRadioButton
                      fillBackground
                      forced
                      name={"is_theory"}
                      buttons={[
                        { name: "عملي", value: 0 },
                        { name: "نظري", value: 1 },
                      ]}
                    ></AppFormRadioButton>
                  </div>
                  <div className="w-1/2 ml-2">
                    <AppFormField
                      withError={false}
                      infoWidth="2/5"
                      inputWidth="3/5"
                      name={"group"}
                      title="المجموعة"
                    />
                  </div>
                </div>
              </div>
              <div className="mt-2">
                <ModalHeader
                  className="rounded-lg"
                  title={"الحضور"}
                ></ModalHeader>
              </div>

              <div className="mt-3 flex flex-row-reverse justify-between">
                <div className="w-[32%]">
                  <AppFormField
                    infoWidth="3/5"
                    inputWidth="2/5"
                    name={"attendance_pre"}
                    title="قبل البداية"
                    tooltipMessage="بدء تسجيل الحضور قبل البدء الرسمي للمحاضرة"
                    tooltipVisiable
                  />
                </div>
                <div className="w-[32%]">
                  <AppFormField
                    tooltipMessage="مدة تسجيل الحضور بعد البدء الرسمي للمحاضرة"
                    tooltipVisiable
                    infoWidth="3/5"
                    inputWidth="2/5"
                    name={"attendance_post"}
                    title="النهاية"
                  />
                </div>

                <div className="w-[32%]">
                  <AppFormField
                    tooltipMessage="مدة تسجيل تواجد الطلاب بعد الانتهاء من تسجيل الحضور"
                    tooltipVisiable
                    infoWidth="3/5"
                    inputWidth="2/5"
                    name={"attendance_present"}
                    title="بعد النهاية"
                  />
                </div>
              </div>
              <div className="">
                <ModalHeader
                  className="rounded-lg"
                  title={"الكاميرا"}
                ></ModalHeader>
              </div>
              {/* cams */}
              <div className="mt-3"></div>
              <Autocomplete
                isOptionEqualToValue={(option1, option2) => {
                  return option1.location === option2.location;
                }}
                getOptionLabel={(option) => `${option?.location}`}
                renderOption={(props, option, state) => {
                  return (
                    <div
                      {...props}
                      dir="rtl"
                      className="self-center border-[2px] my-1 text-2xl  px-4 mx-1 rounded-lg   flex justify-between items-center cursor-pointer
                      hover:text-white hover:bg-primary_dark transition-all border-primary_light text-font bg-primary_light"
                    >
                      <div>{option.location}</div>
                    </div>
                  );
                }}
                value={selectedCamera}
                onChange={(event, newValue) => {
                  setSelectedCamera(newValue);
                }}
                inputValue={cameraInputValue}
                onInputChange={(event, newInputValue) => {
                  setCameraInputValue(newInputValue);
                }}
                dir="ltr"
                className="border-primary border-[1px] bg-input rounded-md w-full self-center my-1 text-right text-primary text-3xl "
                disablePortal
                id="combo-box-demo"
                options={cameraOptions}
                renderInput={(params) => {
                  params.value = selectedCamera?.location;
                  return (
                    <TextField
                      {...params}
                      // label="اسم المادة"
                      placeholder="الكاميرا أو الموقع"
                      dir="rtl"
                      className="text-right border-primary text-3xl text-primary"
                    />
                  );
                }}
              />
              <div
                className="flex justify-center items-center
            w-full"
              >
                <div className="w-1/3 mt-4">
                  <SubmitButton title={"تعديل"} />
                </div>
              </div>
            </AppForm>
          </div>
        </div>
      </div>
    </AppModal>
  );
}

export default SubjectGivenModalEdit;
