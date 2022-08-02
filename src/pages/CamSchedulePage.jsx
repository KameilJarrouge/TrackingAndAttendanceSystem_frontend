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
import CamScheduleModalAdd from "../Modals/CamScheduleModalAdd";
import CamScheduleModalEdit from "../Modals/CamScheduleModalEdit";

function CamSchedulePage() {
  let user = getUser();
  let { camId } = useParams();

  const [dataUrl, setDataUrl] = useState(`/api/cameras/${camId}/schedule`);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [invoke, setInvoke] = useState(false);
  const [schedules, setSchedules] = useState([]);
  const [camera, setCamera] = useState({});
  const refresh = () => {
    setInvoke(invoke !== true);
  };

  const getCamera = async () => {
    let res = await api.get(`/api/cameras/${camId}`);
    setCamera(res.data);
  };
  useEffect(() => {
    getCamera();
  }, []);

  const handleOpenEditModal = (id) => {
    setSelectedId(id);
    setEditModalIsOpen(true);
  };

  const handleDelete = async (id) => {
    let res = await api.delete(`/api/schedules/${id}/delete`);
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      refresh();
    }
  };

  return (
    <div className="py-6 px-14 h-[90vh] bg-background flex flex-col ">
      <CamScheduleModalAdd
        open={modalIsOpen}
        onClose={() => setmodalIsOpen(false)}
        refresh={refresh}
        camId={camId}
      ></CamScheduleModalAdd>
      <CamScheduleModalEdit
        open={editModalIsOpen}
        onClose={() => setEditModalIsOpen(false)}
        refresh={refresh}
        scheduleId={selectedId}
      ></CamScheduleModalEdit>
      <div className="w-full h-[88%] flex flex-col ">
        <div className="w-full h-1/6 bg-black mb-2">
          <PageHeader
            title={
              <div className="w-full h-full mx-4 flex items-center justify-center">
                <div className="w-full h-full flex  items-center justify-center text-xl font-bold text-font">
                  <span className="ml-2">{" أوقات عمل الكاميرا: "}</span>
                  <span>{camera.location}</span>
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
              <THeader width="[30%]">اليوم</THeader>
              <THeader width="[30%]"> البداية</THeader>
              <THeader width="[30%]"> النهاية</THeader>
              <THeader>تحكم</THeader>
            </tr>
          </thead>
          <tbody>
            {schedules.map((schedule) => (
              <tr key={schedule.id}>
                {/* day */}
                <TCell>{getDayAsString(schedule.day)}</TCell>
                {/* start */}
                <TCell>
                  {moment(schedule.start, "HH:mm:ss").format("HH:mm")}
                </TCell>
                {/* end */}
                <TCell>
                  {moment(schedule.end, "HH:mm:ss").format("HH:mm")}
                </TCell>

                <TCell>
                  <div className="flex justify-around text-xl text-primary ">
                    <BiEdit
                      onClick={() => handleOpenEditModal(schedule.id)}
                      className="hover:text-green-500 transition-all cursor-pointer"
                    ></BiEdit>
                    <MdDelete
                      onClick={() => handleDelete(schedule.id)}
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
            setData={setSchedules}
            invoke={invoke}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}

export default CamSchedulePage;
