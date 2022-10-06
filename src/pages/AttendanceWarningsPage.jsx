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
import { RiErrorWarningLine, RiFileExcel2Fill } from "react-icons/ri";
import { SiMicrosoftexcel } from "react-icons/si";
import HolidayModalAdd from "../Modals/HolidayModalAdd";
import HolidayModalEdit from "../Modals/HolidayModalEdit";
import { ExportToExcel } from "../components/ExportTable";
import { Tooltip } from "../Modals/Tooltip";

function AttendanceWarningsPage() {
  let user = getUser();
  //   const [dataUrl, setDataUrl] = useState(
  //     `/api/taken-subjects/warnings?scope=&identifier=`
  //   );
  //   const [invoke, setInvoke] = useState(false);
  const [takenSubjects, setTakenSubjects] = useState([]);

  const getCameras = async (values) => {
    if (values === undefined) {
      values = { scope: "", identifier: "" };
    }

    let res = await api.get(
      `/api/taken-subjects/warnings?scope=${values.scope}&identifier=${values.identifier}`
    );
    // setDataUrl(
    //   `/api/taken-subjects/warnings?scope=${values.scope}&identifier=${values.identifier}`
    // );
    console.log("====================================");
    console.log(res.data);
    console.log("====================================");
    setTakenSubjects(res.data);
  };
  const preprocessDataForExcel = (data) => {
    return data.map((ts) => {
      return {
        المقرر: ts.subject.name,
        "الرقم الجامعي": ts.student.id_number,
        الاسم: ts.student.name,
        إنذار: ts.attendance_warning === 1 ? "نعم" : "لا",
        حرمان: ts.suspended === 1 ? "نعم" : "لا",
      };
    });
  };

  //   const refresh = () => {
  //     setInvoke(invoke !== true);
  //   };
  useEffect(() => {
    getCameras();
  }, []);

  return (
    <div className="py-6 px-14 h-[90vh] bg-background flex flex-col ">
      <div className="w-full h-full flex flex-col ">
        <div className="w-full h-1/6 bg-black mb-2">
          <PageHeaderWSearch
            left={
              <AppForm
                initialValues={{
                  scope: "",
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
                          placeholder="الاسم أو الرقم الجامعي"
                        ></AppFormFieldHeader>
                      </div>
                    </div>
                    <div className="w-fit h-full flex items-center justify-start">
                      <div className="w-fit">
                        <AppFormRadioButton
                          border
                          name={"scope"}
                          buttons={[
                            { name: "الإنذارات", value: "warnings" },
                            { name: "الحرمان", value: "suspensions" },
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
              <Tooltip
                message={"استخراج كملف اكسيل"}
                nowrap
                visible
                textSize="sm"
              >
                <RiFileExcel2Fill
                  className="text-4xl  transition-all rounded-lg  cursor-pointer text-accent hover:text-green-400"
                  // strokeWidth={20}
                  onClick={() =>
                    ExportToExcel(
                      preprocessDataForExcel(takenSubjects),
                      "attendance_warnings"
                    )
                  }
                ></RiFileExcel2Fill>
              </Tooltip>
            }
          ></PageHeaderWSearch>
        </div>

        <div className="w-full h-full overflow-y-scroll ">
          <table className="w-full table-fixed " id="data">
            <thead className="w-full sticky top-0">
              <tr className="w-full">
                <THeader width={"[30%]"}>المقرر</THeader>
                <THeader width={"[20%]"}>الرقم الجامعي</THeader>
                <THeader width={"[30%]"}> الاسم</THeader>
                <THeader width={"[10%]"}> إنذار </THeader>
                <THeader width={"[10%]"}> حرمان</THeader>
              </tr>
            </thead>
            <tbody>
              {takenSubjects.map((takenSubject) => (
                <tr key={takenSubject.id}>
                  <TCell>{takenSubject.subject.name}</TCell>
                  <TCell>{takenSubject.student.id_number}</TCell>
                  <TCell>{takenSubject.student.name}</TCell>
                  <TCell>
                    {/* warning */}
                    <div className="flex justify-around text-2xl text-primary ">
                      <RiErrorWarningLine
                        className={`${
                          takenSubject.attendance_warning === 0
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
                          takenSubject.suspended === 0
                            ? "text-font"
                            : "text-red-500"
                        } `}
                      ></MdOutlineDangerous>
                    </div>
                  </TCell>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="w-full h-0.5 bg-primary self-center"></div>
      </div>
      {/* <div className="w-full h-[12%] flex justify-center items-center">
        <div className="w-1/6 ">
          <Pagination
            dataUrl={dataUrl}
            setData={setTakenSubjects}
            invoke={invoke}
            logResult
          ></Pagination>
        </div>
      </div> */}
    </div>
  );
}

export default AttendanceWarningsPage;
