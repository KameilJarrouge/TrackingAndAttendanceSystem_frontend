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
function SubjectDashboardModalInfo({ open, onClose, refresh, givenSubjectId }) {
  const [givenSubject, setGivenSubject] = useState({});

  const getSubject = async () => {
    if (givenSubjectId === 0) return;
    let res = await api.get(
      `/api/given-subjects/${givenSubjectId}/infoDashboard`
    );
    console.log(res.data);
    setGivenSubject(res.data);
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
          <ModalHeader title={"معلومات"} onClose={onClose}></ModalHeader>
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
            <div className="flex flex-row-reverse">
              <PrimaryInfo
                text={null}
                textWidth=""
                dataWidth="full"
                data={
                  <Tooltip message={"قبل البداية"} visible nowrap>
                    <>
                      {getTimeAsString(
                        givenSubject?.time,
                        false,
                        true,
                        givenSubject?.attendance_pre
                      )}
                    </>
                  </Tooltip>
                }
              ></PrimaryInfo>
              <PrimaryInfo
                text={null}
                textWidth=""
                dataWidth="full"
                data={
                  <Tooltip message={"توقيت المحاضرة"} visible nowrap>
                    <>{getTimeAsString(givenSubject?.time)}</>
                  </Tooltip>
                }
              ></PrimaryInfo>
              <PrimaryInfo
                text={null}
                textWidth=""
                dataWidth="full"
                data={
                  <Tooltip message={"النهاية"} visible nowrap>
                    <>
                      {getTimeAsString(
                        givenSubject?.time,
                        true,
                        false,
                        givenSubject?.attendance_post
                      )}
                    </>
                  </Tooltip>
                }
              ></PrimaryInfo>
              <PrimaryInfo
                text={null}
                textWidth=""
                dataWidth="full"
                data={
                  <Tooltip message={"بعد النهاية"} visible nowrap>
                    <>
                      {getTimeAsString(
                        givenSubject?.time,
                        true,
                        false,
                        givenSubject?.attendance_present +
                          givenSubject?.attendance_post
                      )}
                    </>
                  </Tooltip>
                }
              ></PrimaryInfo>
            </div>
            <div className="flex flex-row-reverse">
              <PrimaryInfo
                text={"المدرس"}
                data={
                  givenSubject?.professorAttended?.attended === 1
                    ? "موجود"
                    : "غير موجود"
                }
              ></PrimaryInfo>
              <PrimaryInfo
                text={"الحضور"}
                data={
                  givenSubject?.active_week_attendance_attended_count +
                  "/" +
                  givenSubject?.active_week_attendance_count
                }
              ></PrimaryInfo>
            </div>
          </div>
        </div>
      </div>
    </AppModal>
  );
}

export default SubjectDashboardModalInfo;
