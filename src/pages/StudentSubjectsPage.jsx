import React, { useEffect, useState } from "react";
import THeader from "../components/THeader";
import TCell from "../components/TCell";
import { AiOutlinePlus } from "react-icons/ai";
import Pagination from "../components/Pagination";
import { BiEdit } from "react-icons/bi";
import api from "../api/api";
import { toast } from "react-toastify";
import { getUser } from "../api/user";
import { MdDelete, MdOutlineDangerous } from "react-icons/md";
import { RiErrorWarningLine } from "react-icons/ri";
import SubjectModalAdd from "../Modals/SubjectModalAdd";
import SubjectModalEdit from "../Modals/SubjectModalEdit";
import PageHeader from "../components/PageHeader";
import { useParams } from "react-router-dom";
import SubjectTakenModalAdd from "../Modals/SubjectTakenModalAdd";
import SubjectTakenModalEdit from "../Modals/SubjectTakenModalEdit";

function StudentSubjectsPage() {
  let user = getUser();
  let { studentId } = useParams();

  const [dataUrl, setDataUrl] = useState(`/api/students/${studentId}/subjects`);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [invoke, setInvoke] = useState(false);
  const [takenSubjects, setTakenSubjects] = useState([]);
  const [student, setStudent] = useState({});
  const refresh = () => {
    setInvoke(invoke !== true);
  };

  const getStudent = async () => {
    let res = await api.get(`/api/students/${studentId}`);
    setStudent(res.data);
  };
  useEffect(() => {
    getStudent();
  }, []);

  const handleOpenEditModal = (id) => {
    setSelectedId(id);
    setEditModalIsOpen(true);
  };

  const handleDelete = async (id) => {
    let res = await api.delete(`api/taken-subjects/${id}/remove-subject`);
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      refresh();
    }
  };

  return (
    <div className="py-6 px-14 h-[90vh] bg-background flex flex-col ">
      <SubjectTakenModalAdd
        studentId={studentId}
        open={modalIsOpen}
        onClose={() => setmodalIsOpen(false)}
        refresh={refresh}
      ></SubjectTakenModalAdd>
      <SubjectTakenModalEdit
        open={editModalIsOpen}
        onClose={() => setEditModalIsOpen(false)}
        refresh={refresh}
        takenSubjectId={selectedId}
      ></SubjectTakenModalEdit>
      <div className="w-full h-[88%] flex flex-col ">
        <div className="w-full h-1/6 bg-black mb-2">
          <PageHeader
            title={
              <div className="w-full h-full mx-4 flex items-center justify-center">
                <div className="w-full h-full flex  items-center justify-center text-2xl font-bold text-font">
                  <span className="ml-2">{" مقررات الطالب: "}</span>
                  <span>{student.name}</span>
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

        <table className="w-full table-fixed">
          <thead className="w-full">
            <tr className="w-full">
              <THeader width={"[35%]"}>المقرر</THeader>
              <THeader width={"[30%]"}> الكلية</THeader>
              <THeader width={"[10%]"}> إنذار </THeader>
              <THeader width={"[10%]"}> حرمان</THeader>
              {/* <THeader width={"[12%]"}>عدد الغيابات</THeader> */}
              <THeader width={"[10%]"}>تحكم</THeader>
            </tr>
          </thead>
          <tbody>
            {takenSubjects.map((takenSubject) => (
              <tr key={takenSubject.id}>
                <TCell>{takenSubject.name}</TCell>
                <TCell>{takenSubject.department}</TCell>
                <TCell>
                  {/* warning */}
                  <div className="flex justify-around text-2xl text-primary ">
                    <RiErrorWarningLine
                      className={`${
                        takenSubject.pivot.attendance_warning === 0
                          ? "text-font"
                          : "text-yellow-500"
                      } `}
                    ></RiErrorWarningLine>
                  </div>
                </TCell>
                <TCell>
                  {/* forbidden */}
                  <div className="flex justify-around text-2xl text-primary ">
                    <MdOutlineDangerous
                      className={`${
                        takenSubject.pivot.suspended === 0
                          ? "text-font"
                          : "text-red-500"
                      } `}
                    ></MdOutlineDangerous>
                  </div>
                </TCell>
                {/* <TCell> */}
                {/* absence */}
                {/* 15 */}
                {/* </TCell> */}
                {/* control */}
                <TCell>
                  <div className="flex justify-around text-xl text-primary ">
                    <BiEdit
                      onClick={() => handleOpenEditModal(takenSubject.pivot.id)}
                      className="hover:text-green-500 transition-all cursor-pointer"
                    ></BiEdit>
                    <MdDelete
                      onClick={() => handleDelete(takenSubject.pivot.id)}
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
            setData={setTakenSubjects}
            invoke={invoke}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}

export default StudentSubjectsPage;
