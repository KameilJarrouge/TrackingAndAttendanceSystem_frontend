import React, { useState } from "react";
import THeader from "../components/THeader";
import TCell from "../components/TCell";
import { AiOutlinePlus } from "react-icons/ai";
import Pagination from "../components/Pagination";
import { BiEdit } from "react-icons/bi";
import api from "../api/api";
import { toast } from "react-toastify";
import { getUser } from "../api/user";
import { MdChecklistRtl, MdDelete } from "react-icons/md";
import PageHeaderWSearch from "../components/PageHeaderWSearch";
import AppForm from "../components/form/AppForm";
import AppFormFieldHeader from "../components/form/AppFormFieldHeader";
import SubmitSearch from "../components/form/SubmitSearch";
import { RiExternalLinkLine } from "react-icons/ri";
import SubjectModalAdd from "../Modals/SubjectModalAdd";
import SubjectModalEdit from "../Modals/SubjectModalEdit";
import { useNavigate } from "react-router-dom";

function SubjectsPage() {
  let user = getUser();
  let navigate = useNavigate();
  const [dataUrl, setDataUrl] = useState(`/api/subjects?identifier=`);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [invoke, setInvoke] = useState(false);
  const [subjects, setSubjects] = useState([]);

  const getSubjects = (values) => {
    setDataUrl(
      `/api/subjects?identifier=${
        values.identifier === null ? "" : values.identifier
      }`
    );
  };

  const refresh = () => {
    setInvoke(invoke !== true);
  };

  const handleOpenEditModal = (id) => {
    setSelectedId(id);
    setEditModalIsOpen(true);
  };

  const handleDelete = async (id) => {
    let res = await api.delete(`/api/subjects/${id}/delete`);
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      refresh();
    }
  };

  const handleProfessorsNavigate = (subjectId) => {
    navigate(`/subject/${subjectId}/professors`);
  };

  const handleStudentsNavigate = (subjectId) => {
    navigate(`/subject/${subjectId}/students`);
  };

  return (
    <div className="py-6 px-14 h-[90vh] bg-background flex flex-col ">
      <SubjectModalAdd
        open={modalIsOpen}
        onClose={() => setmodalIsOpen(false)}
        refresh={refresh}
      ></SubjectModalAdd>
      <SubjectModalEdit
        open={editModalIsOpen}
        onClose={() => setEditModalIsOpen(false)}
        refresh={refresh}
        id={selectedId}
      ></SubjectModalEdit>
      <div className="w-full h-[88%] flex flex-col ">
        <div className="w-full h-1/6 bg-black mb-2">
          <PageHeaderWSearch
            left={
              <AppForm
                initialValues={{
                  identifier: "",
                }}
                onSubmit={getSubjects}
                // validationSchema={validationSchema}
              >
                <div className="w-full h-full mx-4 flex items-center justify-between">
                  <div className="w-[30%] h-full flex items-center">
                    <div className="w-[90%] h-full">
                      <AppFormFieldHeader
                        name={"identifier"}
                        placeholder="اسم المقرر أو الكلية"
                      ></AppFormFieldHeader>
                    </div>
                  </div>

                  <div className="w-[10%] h-full flex justify-end pl-4">
                    <SubmitSearch></SubmitSearch>
                  </div>
                </div>
              </AppForm>
            }
            right={
              <AiOutlinePlus
                className="text-5xl  transition-all rounded-lg border-[0.2px] border-background cursor-pointer text-background hover:text-accent hover:border-accent"
                strokeWidth={20}
                onClick={() => setmodalIsOpen(true)}
              ></AiOutlinePlus>
            }
          ></PageHeaderWSearch>
        </div>

        <table className="w-full table-fixed">
          <thead className="w-full">
            <tr className="w-full">
              <THeader width={"[35%]"}>المقرر</THeader>
              <THeader width={"[25%]"}> الكلية</THeader>
              <THeader width={"[13%]"}> المدرسين</THeader>
              <THeader width={"[13%]"}> الطلاب</THeader>
              <THeader width={"[14%]"}>تحكم</THeader>
            </tr>
          </thead>
          <tbody>
            {subjects.map((subject) => (
              <tr key={subject.id}>
                <TCell>{subject.name}</TCell>
                <TCell>{subject.department}</TCell>
                <TCell>
                  {/* professors */}
                  <div className="flex justify-around text-xl text-primary ">
                    <RiExternalLinkLine
                      onClick={() => handleProfessorsNavigate(subject.id)}
                      className="hover:text-blue-500 transition-all cursor-pointer"
                    ></RiExternalLinkLine>
                    <MdChecklistRtl className="hover:text-green-500 transition-all cursor-pointer" />
                  </div>
                </TCell>
                <TCell>
                  {/* students */}
                  <div className="flex justify-around text-xl text-primary ">
                    <RiExternalLinkLine
                      onClick={() => handleStudentsNavigate(subject.id)}
                      className="hover:text-blue-500 transition-all cursor-pointer"
                    ></RiExternalLinkLine>
                    <MdChecklistRtl className="hover:text-green-500 transition-all cursor-pointer" />
                  </div>
                </TCell>
                {/* control */}
                <TCell>
                  <div className="flex justify-around text-xl text-primary ">
                    <BiEdit
                      onClick={() => handleOpenEditModal(subject.id)}
                      className="hover:text-green-500 transition-all cursor-pointer"
                    ></BiEdit>
                    <MdDelete
                      onClick={() => handleDelete(subject.id)}
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
            setData={setSubjects}
            invoke={invoke}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}

export default SubjectsPage;
