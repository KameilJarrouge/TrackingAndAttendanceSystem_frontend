import React, { useState } from "react";
import THeader from "../components/THeader";
import TCell from "../components/TCell";
import { AiOutlinePlus } from "react-icons/ai";
import Pagination from "../components/Pagination";
import { BiEdit } from "react-icons/bi";
import api from "../api/api";
import { toast } from "react-toastify";
import { getUser } from "../api/user";
import { MdDelete, MdSchedule } from "react-icons/md";
import PageHeaderWSearch from "../components/PageHeaderWSearch";
import AppForm from "../components/form/AppForm";
import AppFormRadioButton from "../components/form/AppFormRadioButton";
import AppFormFieldHeader from "../components/form/AppFormFieldHeader";
import SubmitSearch from "../components/form/SubmitSearch";
import PeopleModalAdd from "../Modals/PeopleModalAdd";
import PeopleModalEdit from "../Modals/PeopleModelEdit";
import { useNavigate } from "react-router-dom";
import { getCamTypeAsString } from "../components/form/getCamTypeAsString";
import CameraModalAdd from "../Modals/CameraModalAdd";
import CameraModalEdit from "../Modals/CameraModalEdit";
import { TiDocumentText } from "react-icons/ti";
import HolidayModalAdd from "../Modals/HolidayModalAdd";
import HolidayModalEdit from "../Modals/HolidayModalEdit";
import ConfirmationModal from "../Modals/ConfirmationModal";

function HolidaysPage() {
  let user = getUser();
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
  const [confirmationInfo, setConfirmationInfo] = useState("");
  const [dataUrl, setDataUrl] = useState(`/api/holidays?scope=current&name=`);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [invoke, setInvoke] = useState(false);
  const [holidays, setHolidays] = useState([]);

  const getCameras = (values) => {
    setDataUrl(`/api/holidays?scope=${values.scope}&name=${values.name}`);
  };

  const refresh = () => {
    setInvoke(invoke !== true);
  };

  const handleOpenEditModal = (id) => {
    setSelectedId(id);
    setEditModalIsOpen(true);
  };

  const handleDelete = async (id) => {
    let res = await api.delete(`/api/holidays/${id}/delete`);
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      refresh();
    }
  };

  return (
    <div className="py-6 px-14 h-[90vh] bg-background flex flex-col ">
      <ConfirmationModal
        open={confirmationModalIsOpen}
        onClose={() => setConfirmationModalIsOpen(false)}
        onConfirm={handleDelete}
        data={selectedId}
        title={"إزالة العطلة"}
        titleInfo={confirmationInfo}
        warningMessage={"يرجى الانتباه أن هذه العملية لا يمكن التراجع عنها"}
      ></ConfirmationModal>
      <HolidayModalAdd
        open={modalIsOpen}
        onClose={() => setmodalIsOpen(false)}
        refresh={refresh}
      ></HolidayModalAdd>
      <HolidayModalEdit
        open={editModalIsOpen}
        onClose={() => setEditModalIsOpen(false)}
        refresh={refresh}
        holidayId={selectedId}
      ></HolidayModalEdit>
      <div className="w-full h-[88%] flex flex-col ">
        <div className="w-full h-1/6 bg-black mb-2">
          <PageHeaderWSearch
            left={
              <AppForm
                initialValues={{
                  scope: "current",
                  name: "",
                }}
                onSubmit={getCameras}
                // validationSchema={validationSchema}
              >
                <div className="w-full h-full mx-4 flex items-center justify-between">
                  <div className="w-[90%] flex justify-start items-center">
                    <div className="w-[30%] h-full flex items-center">
                      <div className="w-[90%] h-full">
                        <AppFormFieldHeader
                          name={"name"}
                          placeholder="الاسم"
                        ></AppFormFieldHeader>
                      </div>
                    </div>
                    <div className="w-fit h-full flex items-center justify-start">
                      <span className="text-font text-xl font-bold mx-2 w-fit">
                        الأعطال:
                      </span>
                      <div className="w-fit">
                        <AppFormRadioButton
                          forced
                          border
                          name={"scope"}
                          buttons={[
                            { name: "السابقة", value: "passed" },
                            { name: "الحالية", value: "current" },
                            { name: "القادمة", value: "upcoming" },
                            { name: "جميع الأعطال", value: "all" },
                          ]}
                        ></AppFormRadioButton>
                      </div>
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

        <table className="w-full table-fixed ">
          <thead className="w-full">
            <tr className="w-full">
              <THeader width={"3/6"}>الاسم </THeader>
              <THeader width={"1/6"}> تاريخ البداية</THeader>
              <THeader width={"1/6"}> تاريخ النهاية</THeader>
              <THeader width={"1/6"}> تحكم</THeader>
            </tr>
          </thead>
          <tbody>
            {holidays.map((holiday) => (
              <tr key={holiday.id}>
                <TCell>{holiday.name}</TCell>
                <TCell>{holiday.start}</TCell>
                <TCell>{holiday.end}</TCell>
                {/* control */}
                <TCell>
                  <div className="flex justify-around text-xl text-primary ">
                    <BiEdit
                      onClick={() => handleOpenEditModal(holiday.id)}
                      className="hover:text-green-500 transition-all cursor-pointer"
                    ></BiEdit>
                    <MdDelete
                      onClick={() => {
                        setSelectedId(holiday.id);
                        setConfirmationModalIsOpen(true);
                        setConfirmationInfo(holiday.name);
                      }}
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
            setData={setHolidays}
            invoke={invoke}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}

export default HolidaysPage;
