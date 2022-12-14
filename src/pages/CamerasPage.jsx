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
import ConfirmationModal from "../Modals/ConfirmationModal";

function CamerasPage() {
  let user = getUser();
  let navigate = useNavigate();
  const [confirmationModalIsOpen, setConfirmationModalIsOpen] = useState(false);
  const [confirmationInfo, setConfirmationInfo] = useState("");
  const [dataUrl, setDataUrl] = useState(`/api/cameras?identifier=&type=-1`);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [invoke, setInvoke] = useState(false);
  const [cameras, setCameras] = useState([]);

  const getCameras = (values) => {
    setDataUrl(
      `/api/cameras?identifier=${
        values.identifier === null ? "" : values.identifier
      }&type=${values.type}`
    );
  };

  const refresh = () => {
    setInvoke(invoke !== true);
  };

  const handleOpenEditModal = (id) => {
    setSelectedId(id);
    setEditModalIsOpen(true);
  };

  const handleLogNavigation = (id) => {
    navigate(`/camera/${id}/log`);
  };
  const handleScheduleNavigation = (id) => {
    navigate(`/camera/${id}/schedule`);
  };

  const handleDelete = async (id) => {
    let res = await api.delete(`/api/cameras/${id}/delete`);
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
        title={"?????????? ????????????????"}
        titleInfo={confirmationInfo}
        warningMessage={
          "?????????? ???????????????? ?????????? ???????? ???????? ?????????????? ???????????? ??????. ???????? ???????????????? ???? ?????? ?????????????? ???? ???????? ?????????????? ????????"
        }
      ></ConfirmationModal>
      <CameraModalAdd
        open={modalIsOpen}
        onClose={() => setmodalIsOpen(false)}
        refresh={refresh}
      ></CameraModalAdd>
      <CameraModalEdit
        open={editModalIsOpen}
        onClose={() => setEditModalIsOpen(false)}
        refresh={refresh}
        camId={selectedId}
      ></CameraModalEdit>
      <div className="w-full h-[88%] flex flex-col ">
        <div className="w-full h-1/6 bg-black mb-2">
          <PageHeaderWSearch
            left={
              <AppForm
                initialValues={{
                  type: -1,
                  identifier: "",
                }}
                onSubmit={getCameras}
                // validationSchema={validationSchema}
              >
                <div className="w-full h-full mx-4 flex items-center justify-between">
                  <div className="w-[90%] flex justify-start items-center">
                    <div className="w-[30%] h-full flex items-center">
                      <div className="w-[90%] h-full">
                        <AppFormFieldHeader
                          name={"identifier"}
                          placeholder="???????? ????????????????"
                        ></AppFormFieldHeader>
                      </div>
                    </div>

                    <div className="w-fit h-full flex items-center justify-start">
                      {/* <span className="text-font text-xl font-bold mx-2 w-fit">
                        ?????? ????????????:
                      </span> */}
                      <div className="w-fit">
                        <AppFormRadioButton
                          border
                          name={"type"}
                          buttons={[
                            { name: "????????", value: 0 },
                            { name: "????????", value: 1 },
                            { name: "????????", value: 2 },
                            { name: "???????? ???? ????????", value: 4 },
                            { name: "??????", value: 3 },
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
              <THeader width={"1/6"}>???????? ???????????????? </THeader>
              <THeader width={"2/6"}> ???????? ????????????????</THeader>
              <THeader width={"1/6"}> ?????? ????????????</THeader>
              <THeader width={"1/6"}> ??????????</THeader>
              {/* ?????????? ?????????????????? ???????????????? */}
              <THeader width={"1/6"}> ????????</THeader>
            </tr>
          </thead>
          <tbody>
            {cameras.map((cam) => (
              <tr key={cam.id}>
                <TCell>{cam.cam_url}</TCell>
                <TCell>{cam.location}</TCell>
                <TCell>{getCamTypeAsString(cam.type)}</TCell>
                <TCell>
                  {/* links */}
                  <div className="flex justify-around text-xl text-primary ">
                    <TiDocumentText
                      onClick={() => handleLogNavigation(cam.id)}
                      className="hover:text-green-500 transition-all cursor-pointer"
                    ></TiDocumentText>
                    <MdSchedule
                      onClick={() => handleScheduleNavigation(cam.id)}
                      className="hover:text-green-500 transition-all cursor-pointer"
                    ></MdSchedule>
                  </div>
                </TCell>
                {/* control */}
                <TCell>
                  <div className="flex justify-around text-xl text-primary ">
                    <BiEdit
                      onClick={() => handleOpenEditModal(cam.id)}
                      className="hover:text-green-500 transition-all cursor-pointer"
                    ></BiEdit>
                    <MdDelete
                      onClick={() => {
                        setSelectedId(cam.id);
                        setConfirmationModalIsOpen(true);
                        setConfirmationInfo(cam.location);
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
            setData={setCameras}
            invoke={invoke}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}

export default CamerasPage;
