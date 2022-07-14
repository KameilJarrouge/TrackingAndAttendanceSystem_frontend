import React, { useEffect, useState } from "react";
import THeader from "../components/THeader";
import TCell from "../components/TCell";
import { AiFillCheckSquare, AiOutlinePlus } from "react-icons/ai";
import Pagination from "../components/Pagination";
import SemesterModalAdd from "../Modals/SemesterModalAdd";
import { BiEdit } from "react-icons/bi";
import api from "../api/api";
import { toast } from "react-toastify";
import { getUser, setUser } from "../api/user";
import {
  TbCrosshair,
  TbDeviceComputerCamera,
  TbSquareForbid2,
} from "react-icons/tb";
import { CgFileDocument } from "react-icons/cg";
import { MdChecklistRtl, MdDelete } from "react-icons/md";
import PageHeaderWSearch from "../components/PageHeaderWSearch";
import AppForm from "../components/form/AppForm";
import AppFormRadioButton from "../components/form/AppFormRadioButton";
import AppFormCheckBox2 from "../components/form/AppFormCheckBox2";
import AppFormFieldHeader from "../components/form/AppFormFieldHeader";
import SubmitSearch from "../components/form/SubmitSearch";
import PeopleModalAdd from "../Modals/PeopleModalAdd";
import PeopleModalEdit from "../Modals/PeopleModelEdit";
import { IoBookOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";

function PeoplePage() {
  let user = getUser();
  let navigate = useNavigate();
  const [dataUrl, setDataUrl] = useState(
    `/api/people?identifier=&identity=-1&onCampus=-1&tracked=-1&blacklist=-1`
  );
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [invoke, setInvoke] = useState(false);
  const [people, setPeople] = useState([]);

  const getPeople = (values) => {
    setDataUrl(
      `/api/people?identifier=${
        values.identifier === null ? "" : values.identifier
      }&identity=${values.identity}&onCampus=${values.onCampus}&tracked=${
        values.tracked
      }&blacklist=${values.blacklist}`
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
    navigate(`/person/${id}/log`);
  };
  const handleSubjectsNavigation = (id, isStudent) => {
    navigate(`/${isStudent ? "student" : "professor"}/${id}/subjects`);
  };

  const handleDelete = async (id) => {
    let res = await api.delete(`/api/people/${id}/delete`);
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      refresh();
    }
  };

  return (
    <div className="py-6 px-14 h-[90vh] bg-background flex flex-col ">
      <PeopleModalAdd
        open={modalIsOpen}
        onClose={() => setmodalIsOpen(false)}
        refresh={refresh}
      ></PeopleModalAdd>
      <PeopleModalEdit
        open={editModalIsOpen}
        onClose={() => setEditModalIsOpen(false)}
        refresh={refresh}
        id={selectedId}
      ></PeopleModalEdit>
      <div className="w-full h-[88%] flex flex-col ">
        <div className="w-full h-1/6 bg-black mb-2">
          <PageHeaderWSearch
            left={
              <AppForm
                initialValues={{
                  identity: -1,
                  onCampus: -1,
                  tracked: -1,
                  blacklist: -1,
                  identifier: "",
                }}
                onSubmit={getPeople}
                // validationSchema={validationSchema}
              >
                <div className="w-full h-full mx-4 flex items-center justify-between">
                  <div className="w-[30%] h-full flex items-center">
                    <div className="w-[90%] h-full">
                      <AppFormFieldHeader
                        name={"identifier"}
                        placeholder="الاسم أو الرقم الجامعي"
                      ></AppFormFieldHeader>
                    </div>
                  </div>
                  <div className="w-[30%] h-full flex items-center justify-start">
                    <span className="text-font text-xl font-bold mr-2 w-[25%]">
                      الهوية:
                    </span>
                    <div className="w-[50%]">
                      <AppFormRadioButton
                        name={"identity"}
                        buttons={[
                          { name: "طالب", value: 1 },
                          { name: "مدرس", value: 2 },
                          { name: "إداري", value: 0 },
                        ]}
                      ></AppFormRadioButton>
                    </div>
                  </div>
                  <div className="w-[30%] h-full flex items-center">
                    <span className="text-font text-xl font-bold w-[30%]">
                      المعلومات:
                    </span>
                    <div className="w-[70%] flex">
                      <AppFormCheckBox2
                        className={"text-accent"}
                        name={"onCampus"}
                        input={<AiFillCheckSquare />}
                      ></AppFormCheckBox2>
                      <AppFormCheckBox2
                        className={"text-amber-500"}
                        name={"tracked"}
                        input={<TbCrosshair />}
                      ></AppFormCheckBox2>
                      <AppFormCheckBox2
                        className={"text-red-500"}
                        name={"blacklist"}
                        input={<TbSquareForbid2 />}
                      ></AppFormCheckBox2>
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
              <THeader width={"[20%]"}>الرقم الجامعي</THeader>
              <THeader width={"[30%]"}> الاسم</THeader>
              <THeader width={"[10%]"}> الهوية</THeader>
              <THeader width={"[15%]"}>معلومات</THeader>
              <THeader width={"[10%]"}> تحكم</THeader>
              <THeader width={"[15%]"}> روابط</THeader>
            </tr>
          </thead>
          <tbody>
            {people.map((person) => (
              <tr key={person.id}>
                <TCell>{person.id_number}</TCell>
                <TCell>{person.name}</TCell>
                <TCell>{person.IdentityNamed}</TCell>
                {/* attributes */}
                <TCell>
                  <div className="flex justify-around text-xl text-primary ">
                    <AiFillCheckSquare
                      className={
                        person.in_campus ? `text-green-500 ` : "text-font"
                      }
                    />
                    <TbCrosshair
                      className={person.track ? `text-amber-500 ` : "text-font"}
                    />
                    <TbSquareForbid2
                      className={
                        person.on_blacklist ? `text-red-500 ` : "text-font"
                      }
                    />
                  </div>
                </TCell>
                {/* actions */}
                <TCell>
                  <div className="flex justify-around text-xl text-primary ">
                    <BiEdit
                      onClick={() => handleOpenEditModal(person.id)}
                      className="hover:text-green-500 transition-all cursor-pointer"
                    ></BiEdit>
                    <MdDelete
                      onClick={() => handleDelete(person.id)}
                      className="hover:text-red-500 transition-all cursor-pointer"
                    ></MdDelete>
                  </div>
                </TCell>
                <TCell>
                  <div className="flex justify-around text-xl text-primary ">
                    {person.identity !== 0 && (
                      <>
                        <MdChecklistRtl className=" hover:text-accent cursor-pointer" />
                        <IoBookOutline
                          onClick={() =>
                            handleSubjectsNavigation(
                              person.id,
                              person.identity === 1
                            )
                          }
                          className=" hover:text-accent cursor-pointer"
                        />
                      </>
                    )}
                    <TbDeviceComputerCamera
                      onClick={() => handleLogNavigation(person.id)}
                      className=" hover:text-accent cursor-pointer"
                    />
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
            setData={setPeople}
            invoke={invoke}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}

export default PeoplePage;
