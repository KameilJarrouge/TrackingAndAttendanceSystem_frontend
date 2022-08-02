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
  restart_time: Yup.date().min(new Date()),
  restart_duration: Yup.number().min(1),
});

function SubjectDashboardModalRestart({
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
    if (parseInt(values.restart_duration) <= 0) return;
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
            title={"إعادة بدء تسجيل الحضور"}
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
                restart_time: new Date(),
                restart_duration: 15,
              }}
              onSubmit={handleSubmit}
            >
              <div className="w-full">
                <div className="flex flex-row-reverse ">
                  <div className="my-2 w-1/2 px-1">
                    <AppFormDatePicker
                      tooltipMessage="توقيت إعادة بدء التسجيل"
                      tooltipVisiable
                      itemsPos="center"
                      title="التوقيت"
                      format="HH:mm"
                      name={"restart_time"}
                    ></AppFormDatePicker>
                  </div>{" "}
                  <div className="my-2 w-1/2 px-1">
                    <AppFormField
                      name={"restart_duration"}
                      title={"عدد الدقائق"}
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
                    text={"توقيت الانتهاء"}
                    textWidth="1/2"
                    dataWidth="1/2"
                    name={"restart_duration"}
                    additionalName={"restart_time"}
                    renderFunc={(value, additionalValue = 0) =>
                      getTimeAsString(additionalValue, true, false, value)
                    }
                  ></AppFormInfo>
                </div>
                <div className="w-full flex justify-center items-center">
                  <div className="w-1/2 my-2 ">
                    <SubmitButton title={"إعادة البدء"}></SubmitButton>
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

export default SubjectDashboardModalRestart;
