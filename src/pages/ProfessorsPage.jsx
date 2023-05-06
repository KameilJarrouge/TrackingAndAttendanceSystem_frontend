import React, { useState } from "react";
import THeader from "../components/THeader";
import TCell from "../components/TCell";
import TitleHeader from "../components/TitleHeader";
import PageHeader from "../components/PageHeader";
import { AiOutlinePlus } from "react-icons/ai";
import Pagination from "../components/Pagination";
import SemesterModalAdd from "../Modals/SemesterModalAdd";
import { BiEdit } from "react-icons/bi";
import { MdDelete } from "react-icons/md";
import { FaRegEye } from "react-icons/fa";
import api from "../api/api";
import { toast } from "react-toastify";
import SemesterModalEdit from "../Modals/SemesterModalEdit";
import { useNavigate } from "react-router-dom";
import { getUser, setUser } from "../api/user";
function ProfessorsPage() {
  let navigate = useNavigate();
  let user = getUser();
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [invoke, setInvoke] = useState(false);
  const [semesters, setSemesters] = useState([]);

  const refresh = () => {
    setInvoke(invoke !== true);
  };

  const handleOpenEditModal = (id) => {
    setSelectedId(id);
    setEditModalIsOpen(true);
  };

  const handleDelete = async (id) => {
    let res = await api.delete(`/api/semesters/${id}/delete`);
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      refresh();
    }
  };

  const handlePreview = async (id) => {
    let res = await api.put(`/api/semesters/${id}/preview`);
    setUser(res.data.user);
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      refresh();
    }
  };

  return (
    <div className="py-6 px-14 h-[90vh] bg-background flex flex-col ">
      <SemesterModalAdd
        open={modalIsOpen}
        onClose={() => setmodalIsOpen(false)}
        refresh={refresh}
      ></SemesterModalAdd>

      <div className="w-full h-[88%] flex flex-col ">
        <div className="w-full h-1/6 bg-black mb-2">
          <PageHeader
            title={<TitleHeader>الفصول</TitleHeader>}
            left={null}
            right={
              <AiOutlinePlus
                className="text-5xl  transition-all rounded-lg border-[0.2px] border-background cursor-pointer text-background hover:text-accent hover:border-accent"
                strokeWidth={20}
                onClick={() => setmodalIsOpen(true)}
              ></AiOutlinePlus>
            }
          ></PageHeader>
        </div>
        <SemesterModalEdit
          open={editModalIsOpen}
          onClose={() => setEditModalIsOpen(false)}
          refresh={refresh}
          id={selectedId}
          setId={setSelectedId}
        ></SemesterModalEdit>
        <table className="w-full ">
          <thead>
            <tr>
              <THeader>اسم الفصل</THeader>
              <THeader> العام الدراسي</THeader>
              <THeader> بداية الفصل</THeader>
              <THeader> عدد الأسابيع</THeader>
              <THeader> </THeader>
            </tr>
          </thead>
          <tbody>
            {semesters.map((semester) => (
              <tr key={semester.id}>
                <TCell>{semester.name_identifier}</TCell>
                <TCell>{semester.year}</TCell>
                <TCell>{semester.semester_start}</TCell>
                <TCell>{semester.number_of_weeks}</TCell>
                <TCell>
                  <div className="flex justify-around text-xl text-primary ">
                    <BiEdit
                      onClick={() => handleOpenEditModal(semester.id)}
                      className="hover:text-green-500 transition-all cursor-pointer"
                    ></BiEdit>
                    <MdDelete
                      onClick={() => handleDelete(semester.id)}
                      className="hover:text-red-500 transition-all cursor-pointer"
                    ></MdDelete>
                    <FaRegEye
                      onClick={() => handlePreview(semester.id)}
                      className={`${
                        user.semester_id === semester.id && "text-lightBlue-600"
                      } hover:text-lightBlue-600 transition-all cursor-pointer`}
                    ></FaRegEye>
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
            dataUrl="/api/semesters"
            setData={setSemesters}
            invoke={invoke}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}

export default ProfessorsPage;
