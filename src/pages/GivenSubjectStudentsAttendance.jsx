import React, { useEffect, useState } from "react";
import THeader from "../components/THeader";
import TCell from "../components/TCell";
import { AiFillCheckSquare } from "react-icons/ai";
import Pagination from "../components/Pagination";
import api from "../api/api";
import { getUser } from "../api/user";
import { MdDangerous } from "react-icons/md";
import PageHeader from "../components/PageHeader";
import { useParams } from "react-router-dom";
import { GoPrimitiveDot } from "react-icons/go";
import AttendanceCell from "../components/AttendanceCell";
import { Tooltip } from "../Modals/Tooltip";
import moment from "moment";
import AttendanceImageModal from "../Modals/AttendanceImageModal";
import { TbMinusVertical } from "react-icons/tb";
import { getTimeAsString } from "../components/getTimeAsString";
import { getDayAsShortString } from "../components/getDayAsShortString";

function GivenSubjectStudentsAttendance() {
  let user = getUser();
  let { givenSubjectId, isTheory } = useParams();
  let weekNumber =
    Math.abs(moment(user.semester.semester_start).diff(moment(), "weeks")) + 1;
  const [dataUrl, setDataUrl] = useState(
    `/api/given-subjects/${givenSubjectId}/students-attendance-detailed-${
      isTheory === "true" ? "theory" : "practical"
    }`
  );

  const [weeks, setWeeks] = useState([]);
  const [modalIsOpen, setmodalIsOpen] = useState(false);

  const [imageSrc, setImageSrc] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [invoke, setInvoke] = useState(false);
  const [takenSubjects, setTakenSubjects] = useState([]);
  const [givenSubject, setGivenSubject] = useState({});

  const refresh = () => {
    setInvoke(invoke !== true);
  };

  const getGivenSubject = async () => {
    let res = await api.get(`/api/given-subjects/${givenSubjectId}/`);
    setGivenSubject(res.data);
  };
  useEffect(() => {
    getGivenSubject();
    if (user.semester.number_of_weeks === undefined) {
      return;
    }
    // console.log("now", user.semester.number_of_weeks);
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
            rightWidth="1/4"
            leftWidth="1/4"
            titleWidth="1/2"
            title={
              <div className="w-full h-full mx-4 flex items-center justify-center">
                <div className="w-full h-full flex  items-center justify-center text-xl font-bold text-font">
                  <span className="ml-2">{" حضور طلاب مقرر: "}</span>
                  <span>{givenSubject?.subject?.name}</span>
                  <div className="w-fit flex justify-evenly items-center text-base mr-2">
                    <span>(</span>
                    {givenSubject.is_theory ? "نظري" : "عملي"}

                    <TbMinusVertical />

                    <div>{getTimeAsString(givenSubject.time)}</div>

                    <TbMinusVertical />

                    <div>{getDayAsShortString(givenSubject.day)}</div>
                    <span>)</span>
                  </div>
                </div>
              </div>
            }
            left={
              <div className="w-3/5  py-2 px-4 flex flex-row-reverse justify-between bg-background">
                <Tooltip message={"موجود"} visible>
                  <GoPrimitiveDot className="text-2xl text-black" />
                </Tooltip>

                <Tooltip message={"مبرر"} visible>
                  <GoPrimitiveDot className="text-2xl text-amber-500" />
                </Tooltip>
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
                <THeader colSpan={2} width={"[25%]"}>
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
              {takenSubjects.map((takenSubject) => (
                <tr>
                  <TCell
                    fillColor="primary_dark"
                    textColor="font"
                    borderColor="primary"
                    colSpan={2}
                  >
                    {takenSubject.student.name}
                  </TCell>

                  {takenSubject[
                    givenSubject.is_theory === 1
                      ? "attendances_th"
                      : "attendances_pr"
                  ]?.map((attendance) => (
                    <AttendanceCell
                      clickable={false}
                      attendance={attendance}
                      refresh={refresh}
                      openModal={() => setmodalIsOpen(true)}
                      setData={handleImageModalOpen}
                    />
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className="w-full h-[12%] flex justify-center items-center">
        <div className="w-1/6 ">
          <Pagination
            dataUrl={dataUrl}
            setData={setTakenSubjects}
            invoke={invoke}
            logResult
          ></Pagination>
        </div>
      </div>
    </div>
  );
}

export default GivenSubjectStudentsAttendance;
