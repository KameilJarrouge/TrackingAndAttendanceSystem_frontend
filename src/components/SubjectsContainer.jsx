import React, { useEffect, useState } from "react";
import THeader from "../components/THeader";
import TCell from "../components/TCell";
import PageHeader from "../components/PageHeader";
import { AiOutlineInfoCircle } from "react-icons/ai";
import {
  MdChecklistRtl,
  MdMoreTime,
  MdOutlineCancel,
  MdOutlineRestartAlt,
} from "react-icons/md";

import {
  BsFillArrowLeftSquareFill,
  BsFillArrowRightSquareFill,
} from "react-icons/bs";
import FilterInput from "./FilterInput";
import moment from "moment";
import SubjectStatus from "../Enums/SubjectStatus";
import SubjectDashboardModalInfo from "../Modals/SubjectDashboardModalInfo";
import SubjectDashboardModalRestart from "../Modals/SubjectDashboardModalRestart";
import SubjectDashboardModalExtend from "../Modals/SubjectDashboardModalExtend";
import { getUser } from "../api/user";
import { useNavigate } from "react-router-dom";
import api from "../api/api";
import { toast } from "react-toastify";

function SubjectsContainer({
  withControl = true,
  withProfessor = true,
  subjects,
  currentId = 1,
  title = "title goes here",
  myId = 1,
  hiddenColor,
  refresh = (f) => f,
}) {
  let navigate = useNavigate();
  const [user, setUser] = useState(getUser());
  const [isOpen, setIsOpen] = useState(myId === currentId);
  const [infoModalIsOpen, setInfoModalIsOpen] = useState(false);
  const [extendModalIsOpen, setExtendModalIsOpen] = useState(false);
  const [restartModalIsOpen, setRestartModalIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);

  useEffect(() => {
    setIsOpen(myId === currentId);
  }, [currentId]);

  const [filteredSubjects, setFilteredSubjects] = useState(subjects);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    if (filter) {
      setFilteredSubjects(
        subjects.filter((givenSubject) =>
          givenSubject.subject.name.match(filter)
        )
      );
    } else {
      setFilteredSubjects(subjects);
    }
  }, [filter, subjects]);

  const handleSkipping = async (id, skipped = false) => {
    let res = await api.put(
      `/api/given-subjects/${id}/${skipped ? "un" : ""}skip-this-week`
    );
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      refresh();
    }
  };

  return (
    <div className="w-full h-full flex flex-col transition-all  ">
      <SubjectDashboardModalInfo
        open={infoModalIsOpen}
        onClose={() => setInfoModalIsOpen(false)}
        givenSubjectId={selectedId}
        refresh={refresh}
      />
      <SubjectDashboardModalRestart
        open={restartModalIsOpen}
        onClose={() => setRestartModalIsOpen(false)}
        givenSubjectId={selectedId}
        refresh={refresh}
      />
      <SubjectDashboardModalExtend
        open={extendModalIsOpen}
        onClose={() => setExtendModalIsOpen(false)}
        givenSubjectId={selectedId}
        refresh={refresh}
      />
      {isOpen ? (
        <>
          <div className="w-full h-1/6 bg-black mb-2">
            <PageHeader
              title={
                <div className="w-full h-full mx-4 flex items-center justify-center">
                  <div className="w-full h-full flex  items-center justify-center text-xl font-bold text-font">
                    <span className="">{title}</span>
                  </div>
                </div>
              }
              right={
                <FilterInput
                  filterUpdateFunc={setFilter}
                  placeholder="اسم المقرر"
                ></FilterInput>
              }
              left={null}
            ></PageHeader>
          </div>

          <div className="w-full h-full overflow-y-scroll overflow-x-hidden">
            <table className="w-full table-fixed ">
              <thead className="w-full  sticky top-0">
                <tr className="w-full">
                  <THeader colSpan={5} width={"[40%]"}>
                    اسم المقرر
                  </THeader>

                  <THeader width={"[10%]"}>المجموعة</THeader>
                  {withProfessor && <THeader width={"[20%]"}>المدرس</THeader>}
                  <THeader width={"[10%]"}>البدء</THeader>
                  <THeader width={"[10%]"}>الانتهاء</THeader>
                  <THeader width={"[10%]"}>تحكم</THeader>
                </tr>
              </thead>
              <tbody className="h-fit">
                {filteredSubjects.map((givenSubject) => (
                  <tr className="w-full">
                    <TCell width="[75%]" colSpan={4}>
                      {givenSubject.subject.name}
                    </TCell>
                    <TCell>{givenSubject.is_theory ? "نظري" : "عملي"}</TCell>
                    <TCell>{givenSubject.group || "--"}</TCell>
                    {withProfessor && (
                      <TCell>{givenSubject.professor.name}</TCell>
                    )}
                    {givenSubject.restart_start_time === null ? (
                      <>
                        {" "}
                        <TCell>
                          {moment(givenSubject.time, "HH:mm:ss")
                            .subtract(givenSubject.attendance_pre, "minutes")
                            .format("HH:mm")
                            .toString()}
                        </TCell>
                        <TCell>
                          {moment(givenSubject.time, "HH:mm:ss")
                            .add(
                              parseInt(
                                givenSubject.attendance_extend +
                                  givenSubject.attendance_post +
                                  givenSubject.attendance_present
                              ),
                              "minutes"
                            )
                            .format("HH:mm")
                            .toString()}
                        </TCell>
                      </>
                    ) : (
                      <>
                        {" "}
                        <TCell>
                          {moment(givenSubject.restart_start_time, "HH:mm:ss")
                            .format("HH:mm")
                            .toString()}
                        </TCell>
                        <TCell>
                          {moment(givenSubject.restart_start_time, "HH:mm:ss")
                            .add(
                              parseInt(givenSubject.restart_duration),
                              "minutes"
                            )
                            .format("HH:mm")
                            .toString()}
                        </TCell>
                      </>
                    )}

                    <TCell>
                      <div className="flex justify-evenly items-center text-xl text-primary">
                        <AiOutlineInfoCircle
                          strokeWidth={0.5}
                          className="cursor-pointer hover:text-accent transition-all"
                          onClick={() => {
                            setInfoModalIsOpen(true);
                            setSelectedId(givenSubject.id);
                          }}
                        />
                        {myId === SubjectStatus.FUTURE && user.isAdmin === 0 && (
                          <MdChecklistRtl
                            // strokeWidth={0.5}
                            className="cursor-pointer hover:text-accent transition-all"
                            onClick={() => {
                              navigate(
                                `/my-subjects/${
                                  givenSubject.id
                                }/students-attendance/${
                                  givenSubject.is_theory === 1
                                    ? "true"
                                    : "false"
                                }`
                              );
                            }}
                          />
                        )}

                        {withControl && (
                          <>
                            {myId === SubjectStatus.CURRENT && (
                              <>
                                {givenSubject.attendance_extend !== 0 ? (
                                  <MdMoreTime className=" text-accent transition-all" />
                                ) : (
                                  <>
                                    {givenSubject.restart_duration !== null ? (
                                      <MdOutlineRestartAlt className=" text-blue-500 transition-all" />
                                    ) : (
                                      <MdMoreTime
                                        className="cursor-pointer hover:text-accent transition-all"
                                        onClick={() => {
                                          setExtendModalIsOpen(true);
                                          setSelectedId(givenSubject.id);
                                        }}
                                      />
                                    )}
                                  </>
                                )}
                              </>
                            )}
                            {myId === SubjectStatus.PREVIOUS && (
                              <MdOutlineRestartAlt
                                className="cursor-pointer hover:text-accent transition-all"
                                onClick={() => {
                                  setRestartModalIsOpen(true);
                                  setSelectedId(givenSubject.id);
                                }}
                              />
                            )}
                            <MdOutlineCancel
                              className={`cursor-pointer ${
                                givenSubject.skipped === 1
                                  ? "text-red-500 hover:text-inherit"
                                  : "hover:text-red-500"
                              }  transition-all`}
                              onClick={() => {
                                handleSkipping(
                                  givenSubject.id,
                                  givenSubject.skipped
                                );
                              }}
                            />
                          </>
                        )}
                      </div>
                    </TCell>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      ) : (
        <div
          className={`w-full h-full bg-${hiddenColor} cursor-pointer flex justify-center items-center text-3xl text-font hover:text-white `}
        >
          {currentId > myId ? (
            <div>
              <BsFillArrowRightSquareFill />
            </div>
          ) : (
            <div>
              <BsFillArrowLeftSquareFill />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default SubjectsContainer;
