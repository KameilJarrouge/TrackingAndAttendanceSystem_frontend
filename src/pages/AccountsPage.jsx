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
import AccountModalAdd from "../Modals/AccountModalAdd";
import AccountModalEdit from "../Modals/AccountModalEdit";

function AccountsPage() {
  let user = getUser();
  let navigate = useNavigate();
  const [dataUrl, setDataUrl] = useState(`/api/users?username=&isAdmin=-1`);
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [editModalIsOpen, setEditModalIsOpen] = useState(false);
  const [selectedId, setSelectedId] = useState(0);
  const [invoke, setInvoke] = useState(false);
  const [users, setUsers] = useState([]);

  const getUsers = (values) => {
    setDataUrl(
      `/api/users?username=${
        values.username === null ? "" : values.username
      }&isAdmin=${values.isAdmin}`
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
    let res = await api.delete(`/api/users/${id}/delete`);
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      refresh();
    } else {
      toast.error(res.data.message);
    }
  };

  return (
    <div className="py-6 px-14 h-[90vh] bg-background flex flex-col ">
      <AccountModalAdd
        open={modalIsOpen}
        onClose={() => setmodalIsOpen(false)}
        refresh={refresh}
      ></AccountModalAdd>
      <AccountModalEdit
        open={editModalIsOpen}
        onClose={() => setEditModalIsOpen(false)}
        refresh={refresh}
        userId={selectedId}
      ></AccountModalEdit>
      <div className="w-full h-[88%] flex flex-col ">
        <div className="w-full h-1/6 bg-black mb-2">
          <PageHeaderWSearch
            left={
              <AppForm
                initialValues={{
                  isAdmin: -1,
                  username: "",
                }}
                onSubmit={getUsers}
                // validationSchema={validationSchema}
              >
                <div className="w-full h-full mx-4 flex items-center justify-between">
                  <div className="w-[90%] flex justify-start items-center">
                    <div className="w-[30%] h-full flex items-center">
                      <div className="w-[90%] h-full">
                        <AppFormFieldHeader
                          name={"username"}
                          placeholder="اسم المستخدم"
                        ></AppFormFieldHeader>
                      </div>
                    </div>

                    <div className="w-fit h-full flex items-center justify-start">
                      <span className="text-font text-xl font-bold mx-2 w-fit">
                        نوع المستخدم:
                      </span>
                      <div className="w-fit">
                        <AppFormRadioButton
                          name={"isAdmin"}
                          buttons={[
                            { name: "أدمن", value: 1 },
                            { name: "مدرس", value: 0 },
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
              <THeader width={"2/6"}>اسم المستخدم</THeader>
              <THeader width={"1/6"}> نوع المستخدم</THeader>
              {/* السجل والمقررات بالروابط */}
              <THeader width={"1/6"}> تحكم</THeader>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <TCell>{user.username}</TCell>
                <TCell>{user.isAdmin ? "أدمن" : "مدرس"}</TCell>

                {/* control */}
                <TCell>
                  <div className="flex justify-around text-xl text-primary ">
                    <BiEdit
                      onClick={() => handleOpenEditModal(user.id)}
                      className="hover:text-green-500 transition-all cursor-pointer"
                    ></BiEdit>
                    <MdDelete
                      onClick={() => handleDelete(user.id)}
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
            setData={setUsers}
            invoke={invoke}
          ></Pagination>
        </div>
      </div>
    </div>
  );
}

export default AccountsPage;
