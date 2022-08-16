import React, { useEffect, useState } from "react";
import THeader from "../components/THeader";
import TCell from "../components/TCell";
import { AiFillCheckSquare } from "react-icons/ai";
import Pagination from "../components/Pagination";
import api from "../api/api";
import { toast } from "react-toastify";
import { getUser } from "../api/user";
import { MdDangerous } from "react-icons/md";
import PageHeader from "../components/PageHeader";
import { useParams } from "react-router-dom";
import StudentTakenModalAdd from "../Modals/StudentTakenModalAdd";
import { GoPrimitiveDot } from "react-icons/go";
import AttendanceCell from "../components/AttendanceCell";
import { Tooltip } from "../Modals/Tooltip";
import moment from "moment";
import AttendanceImageModal from "../Modals/AttendanceImageModal";
import AttendanceCellProf from "../components/AttendanceCellProf";
import { TbMinusVertical } from "react-icons/tb";
import { getTimeAsString } from "../components/getTimeAsString";
import { getDayAsShortString } from "../components/getDayAsShortString";

function ProfessorUserAttendancePage() {
  let user = getUser();
  let weekNumber =
    Math.abs(moment(user.semester.semester_start).diff(moment(), "weeks")) + 1;
  let professorId = user.person_id;

  const [dataUrl, setDataUrl] = useState(
    `/api/professors/${professorId}/given-subjects`
  );
  const [weeks, setWeeks] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  const [imageSrc, setImageSrc] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [invoke, setInvoke] = useState(false);
  const [subjects, setSubjects] = useState([]);
  const [professor, setProfessor] = useState({});

  const refresh = () => {
    setInvoke(invoke !== true);
  };

  const getProfessor = async () => {
    let res = await api.get(`/api/professors/${professorId}`);
    setProfessor(res.data);
  };
  useEffect(() => {
    getProfessor();
    if (user.semester.number_of_weeks === undefined) {
      return;
    }
    if (parseInt(user.semester.number_of_weeks) !== 0) {
      setWeeks(Array(parseInt(user.semester.number_of_weeks)).fill(1));
    }
  }, []);

  const handleImageModalOpen = (src, timestamp) => {
    setImageSrc(src);
    setTimestamp(timestamp);
  };

  return (
    <div className="py-6 px-14 h-[90vh] bg-background flex flex-col ">
      <AttendanceImageModal
        open={modalIsOpen}
        onClose={() => setmodalIsOpen(false)}
        imageSrc={imageSrc}
        timestamp={timestamp}
      ></AttendanceImageModal>

      <div className="w-full h-[88%] flex flex-col ">
        <div className="w-full h-1/6 bg-black mb-2">
          <PageHeader
            title={
              <div className="w-full h-full mx-4 flex items-center justify-center">
                <div className="w-full h-full flex  items-center justify-center text-xl font-bold text-font">
                  <span className="ml-2">{" حضور المدرس: "}</span>
                  <span>{professor.name}</span>
                </div>
              </div>
            }
            left={
              <div className="w-3/12  py-2 px-4 flex flex-row-reverse justify-between bg-background">
                <Tooltip message={"غائب"} visible>
                  <MdDangerous className="text-2xl text-red-600" />
                </Tooltip>
                <Tooltip message={"حاضر"} visible>
                  <AiFillCheckSquare className="text-2xl text-accent" />
                </Tooltip>
              </div>
            }
            right={null}
          ></PageHeader>
        </div>

        <div className="w-full h-full overflow-y-scroll overflow-x-hidden">
          <table className="w-full table-fixed ">
            <thead className="w-full  sticky top-0">
              <tr className="w-full">
                <THeader colSpan={4} width={"[25%]"}>
                  الأسابيع
                </THeader>
                {weeks.map((week, index) => (
                  <THeader>
                    <Tooltip
                      // background="background text-primary"
                      message={moment(user.semester.semester_start)
                        .add(index * 7 - 1, "days")
                        .format("yyyy-MM-DD")}
                      visible
                      textSize="xs"
                    >
                      <span
                        className={index + 1 === weekNumber && "text-accent"}
                      >
                        {index + 1}
                      </span>
                    </Tooltip>
                  </THeader>
                ))}
              </tr>
            </thead>
            <tbody className="h-fit">
              {subjects.map((subject) => (
                <>
                  <tr className="w-full">
                    <TCell
                      fillColor="primary_dark"
                      textColor="font"
                      borderColor="primary"
                      colSpan={2}
                      rowSpan={subject.given_subjects.length}
                    >
                      {subject.name}
                    </TCell>
                    {subject.given_subjects.length !== 0 && (
                      <>
                        <TCell
                          borderColor="primary"
                          fillColor="primary_dark"
                          textColor="font"
                          colSpan={2}
                        >
                          <div className="w-full flex justify-evenly items-center text-base">
                            {subject.given_subjects[0].is_theory
                              ? "نظري"
                              : "عملي"}

                            <TbMinusVertical />

                            <div>
                              {getTimeAsString(subject.given_subjects[0].time)}
                            </div>

                            <TbMinusVertical />

                            <div>
                              {getDayAsShortString(
                                subject.given_subjects[0].day
                              )}
                            </div>
                          </div>
                        </TCell>
                        {subject.given_subjects[0].attendances.map(
                          (attendance) => (
                            <AttendanceCellProf
                              attendance={attendance}
                              refresh={refresh}
                              openModal={() => setmodalIsOpen(true)}
                              setData={handleImageModalOpen}
                            />
                          )
                        )}
                      </>
                    )}
                  </tr>
                  {subject.given_subjects.map((givenSubject, index) => (
                    <>
                      {index !== 0 && (
                        <tr className="w-full">
                          <TCell
                            borderColor="primary"
                            fillColor="primary_dark"
                            textColor="font"
                            colSpan={2}
                          >
                            <div className="w-full flex justify-evenly items-center text-base">
                              {givenSubject.is_theory ? "نظري" : "عملي"}

                              <TbMinusVertical />

                              <div>{getTimeAsString(givenSubject.time)}</div>

                              <TbMinusVertical />

                              <div>{getDayAsShortString(givenSubject.day)}</div>
                            </div>
                          </TCell>
                          {givenSubject.attendances.map((attendance) => (
                            <AttendanceCellProf
                              clickable={false}
                              attendance={attendance}
                              refresh={refresh}
                              openModal={() => setmodalIsOpen(true)}
                              setData={handleImageModalOpen}
                            />
                          ))}
                        </tr>
                      )}
                    </>
                  ))}
                </>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full h-[12%] flex justify-center items-center">
        <div className="w-1/6 ">
          <Pagination
            dataUrl={dataUrl}
            setData={setSubjects}
            invoke={invoke}
            logResult
          ></Pagination>
        </div>
      </div>
    </div>
  );
}

export default ProfessorUserAttendancePage;
