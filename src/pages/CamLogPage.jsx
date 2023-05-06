import React, { useEffect, useState } from "react";
import THeader from "../components/THeader";
import TCell from "../components/TCell";
import Pagination from "../components/Pagination";
import { BiLeftArrowCircle } from "react-icons/bi";
import api from "../api/api";
import { getUser } from "../api/user";
import PageHeaderWSearch from "../components/PageHeaderWSearch";
import AppForm from "../components/form/AppForm";
import SubmitSearch from "../components/form/SubmitSearch";
import { useParams } from "react-router-dom";
import AppFormDatePicker from "../components/form/AppFormDatePicker";
import { BsImage, BsQuestionSquare } from "react-icons/bs";
import AppFormCheckBox2 from "../components/form/AppFormCheckBox2";
import moment from "moment";
import AppFormFieldHeader from "../components/form/AppFormFieldHeader";
import { FiEyeOff } from "react-icons/fi";
import { AiOutlineWarning } from "react-icons/ai";
import { Tooltip } from "../Modals/Tooltip";
import { toast } from "react-toastify";
import AttendanceImageModal from "../Modals/AttendanceImageModal";

function CamLogPage() {
  let user = getUser();
  const [modalIsOpen, setmodalIsOpen] = useState(false);
  const [timestamp, setTimestamp] = useState("");

  let { camId } = useParams();
  const [invoke, setInvoke] = useState(false);
  const [dataUrl, setDataUrl] = useState(
    `/api/cameras/${camId}/log?identifier=&start=null&end=null&withImage=-1&withIgnore=-1&withUnknown=-1&withForbid=-1`
  );
  const [logs, setLogs] = useState([]);
  const [camera, setCamera] = useState({});
  const [imageSrc, setImageSrc] = useState("");
  const getLogs = (values) => {
    setImageSrc("");
    let start = null;
    if (values.start !== null) {
      start = moment(values.start).format("YYYY-MM-DD HH:mm:ss");
    }
    let end = null;
    if (values.end !== null) {
      end = moment(values.end).format("YYYY-MM-DD HH:mm:ss");
    }
    console.log("start", start, "end", end);
    setDataUrl(
      `/api/cameras/${camId}/log?identifier=${values.identifier}&start=${start}&end=${end}&withIgnore=${values.withIgnore}&withImage=${values.withImage}&withUnknown=${values.withUnknown}&withForbid=${values.withForbid}`
    );
  };
  const getCamera = async () => {
    let res = await api.get(`/api/cameras/${camId}`);
    console.log(res.data);
    setCamera(res.data);
  };

  const handleIgnore = async (logId, ignorable) => {
    if (!ignorable) return;
    let res = await api.put(`/api/logs/${logId}/ignore`);
    if (res.data.status === "ok") {
      toast.success(res.data.message);
    } else {
      toast.error(res.data.message);
    }
    let temp = dataUrl;
    setInvoke(invoke !== true);
  };

  const handleImageModalOpen = (src, timestamp) => {
    setmodalIsOpen(true);
    setImageSrc(src);
    setTimestamp(timestamp);
  };

  useEffect(() => {
    getCamera();
  }, []);

  return (
    <div className="py-6 px-14 h-[90vh] bg-background flex flex-col ">
      <AttendanceImageModal
        open={modalIsOpen}
        onClose={() => setmodalIsOpen(false)}
        imageSrc={imageSrc}
        timestamp={timestamp}
      ></AttendanceImageModal>
      <div className="w-full h-full flex flex-col ">
        <div className="w-full h-1/6 bg-black mb-2">
          <PageHeaderWSearch
            left={
              <AppForm
                initialValues={{
                  identifier: "",
                  start: null,
                  end: null,
                  withImage: -1,
                  withIgnore: -1,
                  withUnknown: -1,
                  withForbid: -1,
                }}
                onSubmit={getLogs}
                validationSchema={null}
              >
                <div className="w-full h-full mx-4 flex items-center justify-between">
                  <div className="w-[95%] h-full flex items-center ">
                    <div className="w-[12%] h-full ml-4 flex justify-between">
                      <span className="w-5/6 text-center text-font h-full text-xl font-bold ">
                        <Tooltip message={"موقع الكاميرا"} visible>
                          {camera?.location || "موقع الكاميرا"}
                        </Tooltip>
                      </span>

                      <div className="w-0.5 min-h-full bg-white"></div>
                    </div>
                    <div className="w-[20%] ml-4">
                      <AppFormFieldHeader
                        name={"identifier"}
                        placeholder="الاسم أو الرقم الجامعي"
                      ></AppFormFieldHeader>
                    </div>
                    <div className="w-[42%] flex items-center">
                      <AppFormDatePicker
                        clearIcon
                        height="[2rem]"
                        name={"start"}
                        format="yyyy/MM/dd HH:mm"
                      ></AppFormDatePicker>
                      <BiLeftArrowCircle className="text-5xl text-font"></BiLeftArrowCircle>
                      <AppFormDatePicker
                        clearIcon
                        height="[2rem]"
                        name={"end"}
                        format="yyyy/MM/dd HH:mm"
                      ></AppFormDatePicker>
                    </div>

                    <div className="w-[20%] flex justify-start items-center mr-4">
                      <AppFormCheckBox2
                        className={"text-amber-500"}
                        name={"withUnknown"}
                        input={
                          <Tooltip message={"مجهول"} visible>
                            <BsQuestionSquare />
                          </Tooltip>
                        }
                      ></AppFormCheckBox2>
                      <AppFormCheckBox2
                        textSize="text-2xl"
                        className={"text-red-500"}
                        name={"withForbid"}
                        input={
                          <Tooltip message={"إنذار"} visible>
                            <AiOutlineWarning />
                          </Tooltip>
                        }
                      ></AppFormCheckBox2>
                      <AppFormCheckBox2
                        className={"text-purple-500"}
                        name={"withIgnore"}
                        input={
                          <Tooltip message={"متجاهل"} visible>
                            <FiEyeOff />
                          </Tooltip>
                        }
                      ></AppFormCheckBox2>
                      <AppFormCheckBox2
                        className={"text-accent"}
                        name={"withImage"}
                        input={
                          <Tooltip message={"صورة"} visible>
                            <BsImage />
                          </Tooltip>
                        }
                      ></AppFormCheckBox2>
                    </div>
                  </div>

                  <div className="w-[5%] h-full flex justify-end pl-4">
                    <SubmitSearch></SubmitSearch>
                  </div>
                </div>
              </AppForm>
            }
            right={null}
          ></PageHeaderWSearch>
        </div>
        <div
          className=" flex
            w-full h-full"
        >
          <div
            className="flex flex-col
              w-full h-full"
          >
            <div className="w-full h-full">
              <table className="w-full  table-fixed ">
                <thead className="w-full">
                  <tr className="w-full">
                    <THeader width={"[30%]"}>اسم الشخص</THeader>
                    <THeader width={"[30%]"}> التوقيت</THeader>
                    <THeader width={"[13%]"}> مجهول</THeader>
                    <THeader width={"[13%]"}> إنذار</THeader>
                    <THeader width={"[11%]"}> تجاهل</THeader>
                    <THeader width={"[11%]"}> صورة</THeader>
                  </tr>
                </thead>
                <tbody>
                  {/* <tr>
                    <TCell>1</TCell>
                    <TCell>2</TCell>
                    <TCell>3</TCell>
                    <TCell>4</TCell>
                    <TCell>65</TCell>
                    <TCell>6</TCell>
                  </tr> */}
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <TCell>{log.person?.name || "--"}</TCell>
                      <TCell>
                        <div dir="ltr">
                          {moment(log.timestamp).format(
                            "YYYY-MM-DD   |   HH:mm:ss"
                          )}
                        </div>
                      </TCell>
                      {/* unknown? */}
                      <TCell>
                        <div className="w-full flex items-center justify-center">
                          {log.unidentified ? (
                            <BsQuestionSquare
                              strokeWidth={0.5}
                              className={`text-xl text-amber-500`}
                            ></BsQuestionSquare>
                          ) : (
                            <BsQuestionSquare
                              className={`text-xl text-font`}
                            ></BsQuestionSquare>
                          )}
                        </div>
                      </TCell>
                      {/* warning? */}
                      <TCell>
                        <div className="w-full flex items-center justify-center">
                          {log.warning_flag ? (
                            <AiOutlineWarning
                              strokeWidth={20}
                              className={`text-xl text-red-500`}
                            ></AiOutlineWarning>
                          ) : (
                            <AiOutlineWarning
                              className={`text-xl text-font`}
                            ></AiOutlineWarning>
                          )}
                        </div>
                      </TCell>
                      {/* ignore? */}
                      <TCell>
                        <div className="w-full flex items-center justify-center">
                          {log.ignore ? (
                            <FiEyeOff
                              strokeWidth={2}
                              className={`text-xl text-purple-500`}
                            ></FiEyeOff>
                          ) : (
                            <FiEyeOff
                              onClick={() =>
                                handleIgnore(
                                  log.id,
                                  log.warning_flag || log.unidentified
                                )
                              }
                              className={`text-xl text-font ${
                                (log.warning_flag || log.unidentified) &&
                                "cursor-pointer"
                              }`}
                            ></FiEyeOff>
                          )}
                        </div>
                      </TCell>
                      {/* image? */}
                      <TCell>
                        <div className="w-full flex items-center justify-center">
                          {log.verification_img === "" ? (
                            <BsImage className={`text-xl text-font`}></BsImage>
                          ) : (
                            <BsImage
                              onClick={() =>
                                handleImageModalOpen(
                                  log.verification_img,
                                  log.timestamp
                                )
                              }
                              className={`text-xl cursor-pointer text-accent`}
                            ></BsImage>
                          )}
                        </div>
                      </TCell>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div className="w-full h-1/6  flex justify-center items-center">
              <div className="w-1/6 ">
                <Pagination
                  numberPerPage={"10"}
                  dataUrl={dataUrl}
                  setData={setLogs}
                  invoke={invoke}
                ></Pagination>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CamLogPage;
