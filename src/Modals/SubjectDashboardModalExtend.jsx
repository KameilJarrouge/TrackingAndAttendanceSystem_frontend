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
import PrimaryInfo from "../components/PrimaryInfo";
import { getTimeAsString } from "../components/getTimeAsString";
import { Tooltip } from "./Tooltip";
import moment from "moment";
import AppFormInfo from "../components/form/AppFormInfo";
const validationSchema = Yup.object().shape({
  extend_duration: Yup.number().min(1),
});

function SubjectDashboardModalExtend({
  open,
  onClose,
  refresh,
  givenSubjectId,
}) {
  const [givenSubject, setGivenSubject] = useState({});

  const getSubject = async () => {
    if (givenSubjectId === 0) return;
    let res = await api.get(
      `/api/given-subjects/${givenSubjectId}/infoDashboard`
    );
    console.log(res.data);
    setGivenSubject(res.data);
  };

  const handleSubmit = async (values) => {
    if (parseInt(values.extend_duration) < 1) return;
    if (givenSubjectId === 0) return;
    let res = await api.put(
      `/api/given-subjects/${givenSubjectId}/extend`,
      values
    );
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      onClose();
      refresh();
    }
  };

  useEffect(() => {
    getSubject();
  }, [givenSubjectId]);

  return (
    <AppModal
      closeModal={onClose}
      modalIsOpen={open}
      className="rounded-lg fixed top-[20%] left-0 ml-auto h-auto  right-0 mr-auto w-96  bg-background  shadow-md shadow-black border-[2px] border-primary "
    >
      <div className="w-full">
        <div className="w-full h-[3rem] ">
          <ModalHeader
            title={"تمديد تسجيل الحضور"}
            onClose={onClose}
          ></ModalHeader>
        </div>

        <div
          className="flex flex-col items-center 
        w-full"
        >
          <div className="w-11/12">
            <PrimaryInfo
              text={"اسم المادة"}
              data={givenSubject?.subject?.name}
            ></PrimaryInfo>
            <div className="flex flex-row-reverse">
              <div className="w-3/4">
                <PrimaryInfo
                  text={"اسم المدرس"}
                  data={givenSubject?.professor?.name}
                ></PrimaryInfo>
              </div>
              <div className="w-1/4">
                <PrimaryInfo
                  text={null}
                  textWidth=""
                  dataWidth="full"
                  data={givenSubject?.is_theory === 1 ? "نظري" : "عملي"}
                ></PrimaryInfo>
              </div>
            </div>
            <div className="w-full my-2 h-0.5 bg-primary"></div>
            <AppForm
              validationSchema={validationSchema}
              initialValues={{
                extend_duration: 0,
              }}
              onSubmit={handleSubmit}
            >
              <div className="w-full">
                <div className="flex flex-row-reverse ">
                  <div className="my-2 w-full px-1">
                    <AppFormField
                      name={"extend_duration"}
                      title={"عدد دقائق التمديد"}
                      withError={false}
                      infoWidth="3/5"
                      inputWidth="2/5"
                    ></AppFormField>
                  </div>
                </div>
                <div className="w-full flex flex-row-reverse">
                  {/* <AppFormInfo
                    text={null}
                    textWidth=""
                    dataWidth="full"
                    name={"restart_time"}
                    renderFunc={getTimeAsString}
                  ></AppFormInfo> */}
                  <AppFormInfo
                    text={
                      <Tooltip
                        message={"توقيت انتهاء تسجيل الحضور بعد التمديد"}
                        visible
                        nowrap
                      >
                        توقيت الإنتهاء
                      </Tooltip>
                    }
                    textWidth="2/3"
                    dataWidth="1/3"
                    name={"extend_duration"}
                    additionalName=""
                    renderFunc={(value) =>
                      getTimeAsString(
                        givenSubject?.time,
                        true,
                        false,
                        (parseInt(value) || 0) + givenSubject?.attendance_post
                      )
                    }
                  ></AppFormInfo>
                  <AppFormInfo
                    text={
                      <Tooltip
                        message={"توقيت انتهاء تسجيل الموجودين"}
                        visible
                        nowrap
                      >
                        بعد الإنتهاء
                      </Tooltip>
                    }
                    textWidth="2/3"
                    dataWidth="1/3"
                    name={"extend_duration"}
                    additionalName=""
                    renderFunc={(value) =>
                      getTimeAsString(
                        givenSubject?.time,
                        true,
                        false,
                        (parseInt(value) || 0) +
                          givenSubject?.attendance_post +
                          givenSubject?.attendance_present
                      )
                    }
                  ></AppFormInfo>
                </div>

                <div className="w-full flex justify-center items-center">
                  <div className="w-1/2 my-2 ">
                    <SubmitButton title={"تمديد"}></SubmitButton>
                  </div>
                </div>
              </div>
            </AppForm>
          </div>
        </div>
      </div>
    </AppModal>
  );
}

export default SubjectDashboardModalExtend;
