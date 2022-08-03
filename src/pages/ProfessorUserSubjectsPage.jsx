import React, { useEffect, useState } from "react";
import THeader from "../components/THeader";
import TCell from "../components/TCell";
import { AiOutlinePlus } from "react-icons/ai";
import Pagination from "../components/Pagination";
import { BiEdit } from "react-icons/bi";
import api from "../api/api";
import { toast } from "react-toastify";
import { getUser } from "../api/user";
import { MdChecklistRtl, MdDelete } from "react-icons/md";

import PageHeader from "../components/PageHeader";
import { useNavigate, useParams } from "react-router-dom";
import SubjectGivenModalAdd from "../Modals/SubjectGivenModalAdd";
import SubjectGivenModalEdit from "../Modals/SubjectGivenModalEdit";
import moment from "moment";
import { getDayAsString } from "../components/getDayAsString";
import LatestSemester from "../components/LatestSemester";

function ProfessorUserSubjectsPage() {
  let user = getUser();
  let professorId = user.person_id;
  let navigate = useNavigate();

  const [dataUrl, setDataUrl] = useState(
    `/api/professors/${professorId}/subjects`
  );

  const [invoke, setInvoke] = useState(false);
  const [givenSubjects, setGivenSubjects] = useState([]);
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
  }, []);

  return (
    <div className="py-6 px-14 h-[90vh] bg-background flex flex-col ">
      <div className="w-full h-[88%] flex flex-col ">
        <div className="w-full h-1/6 bg-black mb-2">
          <PageHeader
            title={
              <div className="w-full h-full mx-4 flex items-center justify-center">
                <div className="w-full h-full flex  items-center justify-center text-xl font-bold text-font">
                  <span className="ml-2">{" مقررات المدرس: "}</span>
                  <span>{professor.name}</span>
                </div>
              </div>
            }
            right={null}
            left={null}
          ></PageHeader>
        </div>

        <table className="w-full table-fixed ">
          <thead className="w-full">
            <tr className="w-full">
              <THeader width="[5%]"></THeader>
              <THeader width="[30%]">المقرر</THeader>
              <THeader width="[20%]"> الكلية</THeader>
              <THeader> المجموعة</THeader>
              <THeader> التوقيت </THeader>
              <THeader> اليوم</THeader>
              <THeader> الموقع</THeader>
              <THeader>الحضور</THeader>
              {/* <THeader>تحكم</THeader> */}
            </tr>
          </thead>
          <tbody>
            {givenSubjects.map((givenSubject) => (
              <tr key={givenSubject.id}>
                <TCell>{givenSubject.is_theory ? "نظري" : "عملي"}</TCell>
                <TCell>{givenSubject.subject.name}</TCell>
                <TCell>{givenSubject.subject.department}</TCell>
                <TCell>
                  {givenSubject.group === "" ? "--" : givenSubject.group}
                </TCell>

                <TCell>
                  {moment(givenSubject.time, "HH:mm:dd").format("HH:mm")}
                </TCell>
                <TCell>{getDayAsString(givenSubject.day)}</TCell>

                <TCell>
                  {/* location */}
                  {givenSubject.cam === null ? "--" : givenSubject.cam.location}
                </TCell>
                <TCell>
                  {/* links */}
                  <div className="flex justify-around text-xl text-primary ">
                    <MdChecklistRtl
                      onClick={() =>
                        navigate(
                          `/my-subjects/${givenSubject.id}/students-attendance`
                        )
                      }
                      className="hover:text-accent transition-all cursor-pointer"
                    ></MdChecklistRtl>
                  </div>
                </TCell>
                {/* control */}
                {/* <TCell>
                  <div className="flex justify-around text-xl text-primary ">
                    <BiEdit
                      onClick={() => handleOpenEditModal(givenSubject.id)}
                      className="hover:text-green-500 transition-all cursor-pointer"
                    ></BiEdit>
                    <MdDelete
                      onClick={() => handleDelete(givenSubject.id)}
                      className="hover:text-red-500 transition-all cursor-pointer"
                    ></MdDelete>
                  </div>
                </TCell> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="w-full h-[12%] flex justify-center items-center">
        <div className="w-1/6 ">
          <Pagination
            dataUrl={dataUrl}
            setData={setGivenSubjects}
            invoke={invoke}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}

export default ProfessorUserSubjectsPage;
