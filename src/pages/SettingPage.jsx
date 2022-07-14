import React, { useEffect, useState } from "react";
import SettingBox from "../components/SettingBox";
import AppForm from "../components/form/AppForm";
import * as Yup from "yup";
import PrimaryInfo from "../components/PrimaryInfo";
import BodyLink from "../components/BodyLink";
import AppFormField from "../components/form/AppFormField";
import SubmitButton from "../components/form/SubmitButton";
import AppFormCheckBox from "../components/form/AppFormCheckBox";
import ResetButton from "../components/form/ResetButton";
import api from "../api/api";
import { toast } from "react-toastify";
const validationSchemaSms = Yup.object().shape({
  sms_number: Yup.string()
    .matches("^09\\d{8}$", "يرجى إدخال رقم من نمط --------09 ")
    .nullable(),
  should_send_sms: Yup.boolean(),
});
const validationSchemaThreshold = Yup.object().shape({
  warning_thresh: Yup.number().required("الحقل إجباري").min(1),
  suspension_thresh: Yup.number().required("الحقل إجباري").min(1),
});
const validationSchemaAttendance = Yup.object().shape({
  attendance_pre: Yup.number().required("الحقل إجباري").min(0),
  attendance_post: Yup.number().required("الحقل إجباري").min(1),
  attendance_present: Yup.number().required("الحقل إجباري").min(1),
});

function SettingPage() {
  const [settings, setSettings] = useState({});
  const [currentSemester, setCurrentSemester] = useState({});
  const getSettings = async () => {
    let res = await api.get("/api/settings");
    console.log(res.data);
    setSettings(res.data.settings);
    setCurrentSemester(res.data.currentSemester);
  };

  const handleUpdateAttendance = async (values) => {
    let res = await api.put("/api/settings/update-attendance", values);
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      getSettings();
    }
  };
  const handleUpdateThreshold = async (values) => {
    let res = await api.put("/api/settings/update-threshold", values);
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      getSettings();
    }
  };
  const handleUpdateSms = async (values) => {
    console.log(values);
    let res = await api.put("/api/settings/update-sms", {
      sms_number: values.sms_number,
      should_send_sms: values.should_send_sms ? 1 : 0,
    });
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      getSettings();
    }
  };

  useEffect(() => {
    getSettings();
  }, []);

  return (
    <div className="py-14 px-14 h-[90vh] bg-background ">
      <div className="flex h-full  justify-between">
        {/* ==================================Current Semester================================== */}
        <SettingBox title={"الفصل الحالي"}>
          <div className="w-11/12 h-full mt-2">
            <div className="h-5/6 flex flex-col justify-evenly">
              <PrimaryInfo
                text={`اسم الفصل: ${currentSemester?.name_identifier || ""}`}
              ></PrimaryInfo>
              <PrimaryInfo
                text={`العام الدراسي: ${currentSemester?.year || ""}`}
              ></PrimaryInfo>
              <PrimaryInfo
                text={`بداية الفصل: ${currentSemester?.semester_start || ""}`}
              ></PrimaryInfo>
              <PrimaryInfo
                text={`عدد الأسابيع: ${currentSemester?.number_of_weeks || ""}`}
              ></PrimaryInfo>
            </div>
            <div className="w-full h-0.5 bg-primary"></div>
            <div className="h-1/6 w-full flex justify-center items-center">
              <BodyLink to="/semesters" title={`إدارة الفصول`}></BodyLink>
            </div>
          </div>
        </SettingBox>
        {/* ==================================Threshold================================== */}
        <SettingBox title={"حدود الحرمانات"} subTitle="[عدد الغيابات]">
          <AppForm
            validationSchema={validationSchemaThreshold}
            initialValues={{
              warning_thresh: settings?.warning_thresh,
              suspension_thresh: settings?.suspension_thresh,
            }}
            onSubmit={handleUpdateThreshold}
          >
            <div className="w-11/12 h-full mt-2">
              <div className="h-5/6 flex flex-col justify-start">
                <AppFormField name={"warning_thresh"} title="حد الإنذار" />
                <AppFormField name={"suspension_thresh"} title="حد الفصل" />
              </div>
              <div className="w-full h-0.5 bg-primary"></div>

              <div className="w-full flex items-center justify-center h-1/6">
                <div className="h-2/3 w-full flex items-center justify-evenly">
                  <SubmitButton title={"تعديل"}></SubmitButton>
                  <ResetButton></ResetButton>
                </div>
              </div>
            </div>
          </AppForm>
        </SettingBox>
        {/* ==================================Attendance================================== */}
        <SettingBox title={"مواعيد تسجيل الحضور"} subTitle="[مقدرة بالدقيقة]">
          <AppForm
            validationSchema={validationSchemaAttendance}
            initialValues={{
              attendance_pre: settings?.attendance_pre,
              attendance_post: settings?.attendance_post,
              attendance_present: settings?.attendance_present,
            }}
            onSubmit={handleUpdateAttendance}
          >
            <div className="w-11/12 h-full mt-2">
              <div className="h-5/6 flex flex-col justify-start">
                <AppFormField name={"attendance_pre"} title="قبل البداية" />
                <AppFormField name={"attendance_post"} title="بعد البداية" />
                <AppFormField name={"attendance_present"} title="بعد النهاية" />
              </div>
              <div className="w-full h-0.5 bg-primary"></div>

              <div className="w-full flex items-center justify-center h-1/6">
                <div className="h-2/3 w-full flex items-center justify-evenly">
                  <SubmitButton title={"تعديل"}></SubmitButton>
                  <ResetButton></ResetButton>
                </div>
              </div>
            </div>
          </AppForm>
        </SettingBox>
        {/* ==================================warnings================================== */}
        <SettingBox title={"الإنذارات"}>
          <AppForm
            validationSchema={validationSchemaSms}
            initialValues={{
              sms_number: settings?.sms_number,
              should_send_sms: settings?.should_send_sms === 1,
            }}
            onSubmit={handleUpdateSms}
          >
            <div className="w-11/12 h-full mt-2 ">
              <div className="h-5/6 flex flex-col justify-start items-center">
                <AppFormField name={"sms_number"} title="الرقم" />
                <AppFormCheckBox
                  name={"should_send_sms"}
                  title="إرسال رسالة إنذار"
                />
              </div>
              <div className="w-full h-0.5 bg-primary"></div>

              <div className="w-full flex items-center justify-center h-1/6">
                <div className="h-2/3 w-full flex items-center justify-evenly">
                  <SubmitButton title={"تعديل"}></SubmitButton>
                  <ResetButton></ResetButton>
                </div>
              </div>
            </div>
          </AppForm>
        </SettingBox>
      </div>
    </div>
  );
}

export default SettingPage;
