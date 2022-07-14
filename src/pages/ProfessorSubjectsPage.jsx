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
import { useParams } from "react-router-dom";
import SubjectGivenModalAdd from "../Modals/SubjectGivenModalAdd";
import SubjectGivenModalEdit from "../Modals/SubjectGivenModalEdit";
import moment from "moment";
import { getDayAsString } from "../components/getDayAsString";

function ProfessorSubjectsPage() {
  let user = getUser();
  let { professorId } = useParams();

  const [dataUrl, setDataUrl] = useState(
    `/api/professors/${professorId}/subjects`
  );
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
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

  const handleOpenEditModal = (id) => {
    setSelectedId(id);
    setEditModalIsOpen(true);
  };

  const handleDelete = async (id) => {
    let res = await api.delete(`/api/given-subjects/${id}/remove-subject`);
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      refresh();
    }
  };

  return (
    <div className="py-6 px-14 h-[90vh] bg-background flex flex-col ">
      <SubjectGivenModalAdd
        open={modalIsOpen}
        onClose={() => setmodalIsOpen(false)}
        refresh={refresh}
        professorId={professorId}
      ></SubjectGivenModalAdd>
      <SubjectGivenModalEdit
        open={editModalIsOpen}
        onClose={() => setEditModalIsOpen(false)}
        refresh={refresh}
        professorId={professorId}
        givenSubjectId={selectedId}
      ></SubjectGivenModalEdit>
      <div className="w-full h-[88%] flex flex-col ">
        <div className="w-full h-1/6 bg-black mb-2">
          <PageHeader
            title={
              <div className="w-full h-full mx-4 flex items-center justify-center">
                <div className="w-full h-full flex  items-center justify-center text-2xl font-bold text-font">
                  <span className="ml-2">{" مقررات المدرس: "}</span>
                  <span>{professor.name}</span>
                </div>
              </div>
            }
            right={
              <AiOutlinePlus
                className="text-5xl  transition-all rounded-lg border-[0.2px] border-background cursor-pointer text-background hover:text-accent hover:border-accent"
                strokeWidth={20}
                onClick={() => setmodalIsOpen(true)}
              ></AiOutlinePlus>
            }
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
              {/* <THeader>الحضور</THeader> */}
              <THeader>تحكم</THeader>
            </tr>
          </thead>
          <tbody>
            {givenSubjects.map((givenSubject) => (
              <tr key={givenSubject.pivot.id}>
                <TCell>{givenSubject.pivot.is_theory ? "نظري" : "عملي"}</TCell>
                <TCell>{givenSubject.name}</TCell>
                <TCell>{givenSubject.department}</TCell>
                <TCell>
                  {givenSubject.pivot.group === ""
                    ? "--"
                    : givenSubject.pivot.group}
                </TCell>

                <TCell>
                  {moment(givenSubject.pivot.time, "HH:mm:dd").format("HH:mm")}
                </TCell>
                <TCell>{getDayAsString(givenSubject.pivot.day)}</TCell>

                <TCell>
                  {/* location */}
                  {givenSubject.given_subjects[0].cam === null
                    ? "--"
                    : givenSubject.given_subjects[0].cam}
                </TCell>
                {/* <TCell> */}
                {/* links */}
                {/* <div className="flex justify-around text-xl text-primary ">
                    <MdChecklistRtl
                      onClick={(f) => f}
                      className="hover:text-accent transition-all cursor-pointer"
                    ></MdChecklistRtl>
                  </div> */}
                {/* </TCell> */}
                {/* control */}
                <TCell>
                  <div className="flex justify-around text-xl text-primary ">
                    <BiEdit
                      onClick={() => handleOpenEditModal(givenSubject.pivot.id)}
                      className="hover:text-green-500 transition-all cursor-pointer"
                    ></BiEdit>
                    <MdDelete
                      onClick={() => handleDelete(givenSubject.pivot.id)}
                      className="hover:text-red-500 transition-all cursor-pointer"
                    ></MdDelete>
                  </div>
                </TCell>
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

export default ProfessorSubjectsPage;
