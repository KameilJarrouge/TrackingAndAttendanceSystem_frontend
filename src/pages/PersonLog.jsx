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
import ModalHeader from "../Modals/ModalHeader";
import AppFormDatePicker from "../components/form/AppFormDatePicker";
import AppFormSelect from "../components/form/AppFormSelect";
import { BsImage } from "react-icons/bs";
import AppFormCheckBox2 from "../components/form/AppFormCheckBox2";
import moment from "moment";
function PersonLog() {
  let user = getUser();
  let { personId } = useParams();
  const [options, setOptions] = useState([]);
  const [dataUrl, setDataUrl] = useState(
    `/api/people/${personId}/logs?start=null&end=null&location=all&withImage=-1`
  );
  const [logs, setLogs] = useState([]);
  const [person, setPerson] = useState({});
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
      `/api/people/${personId}/logs?start=${start}&end=${end}&location=${values.location}&withImage=${values.withImage}`
    );
  };
  const getPerson = async () => {
    let res = await api.get(`/api/people/${personId}/show`);
    setPerson(res.data);
    res = await api.get("/api/location-options");
    setOptions(res.data);
  };

  useEffect(() => {
    getPerson();
  }, []);

  return (
    <div className="py-6 px-14 h-[90vh] bg-background flex flex-col ">
      <div className="w-full h-[88%] flex flex-col ">
        <div className="w-full h-1/6 bg-black mb-2">
          <PageHeaderWSearch
            left={
              <AppForm
                initialValues={{
                  start: null,
                  end: null,
                  location: "جميع المواقع",
                  withImage: -1,
                }}
                onSubmit={getLogs}
                validationSchema={null}
              >
                <div className="w-full h-full mx-4 flex items-center justify-between">
                  <div className="w-[90%] h-full flex items-center ">
                    <div className="w-[60%] flex items-center">
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
                    <div className="w-[25%] mx-2 h-full">
                      <AppFormSelect
                        defaultOption="جميع المواقع"
                        title="الموقع:"
                        name={"location"}
                        options={options}
                      ></AppFormSelect>
                    </div>

                    <div className="w-[10%] mx-2 h-full flex justify-center ">
                      <div className="w-auto">
                        <AppFormCheckBox2
                          className={"text-accent"}
                          name={"withImage"}
                          input={<BsImage />}
                        ></AppFormCheckBox2>
                      </div>
                    </div>
                  </div>

                  <div className="w-[10%] h-full flex justify-end pl-4">
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
          w-1/2 h-full"
          >
            {/* right panel */}
            <div className="w-full h-5/6">
              <table className="w-full  table-fixed ">
                <thead className="w-full">
                  <tr className="w-full">
                    <THeader width={"[30%]"}>الموقع</THeader>
                    <THeader width={"[60%]"}> التوقيت</THeader>
                    <THeader width={"[10%]"}> صورة</THeader>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr key={log.id}>
                      <TCell>{log.cam?.location}</TCell>
                      <TCell>
                        <div dir="ltr">
                          {moment(log.timestamp).format("YYYY-MM-DD HH:mm:ss")}
                        </div>
                      </TCell>
                      <TCell>
                        <div className="w-full flex items-center justify-center">
                          {log.verification_img === "" ? (
                            <BsImage className={`text-xl text-font`}></BsImage>
                          ) : (
                            <BsImage
                              onClick={() => setImageSrc(log.verification_img)}
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
              <div className="w-2/6 ">
                <Pagination dataUrl={dataUrl} setData={setLogs}></Pagination>
              </div>
            </div>
          </div>
          {/* devider */}
          <div className="w-0.5 h-full mx-1 bg-primary"></div>
          <div
            className="flex flex-col
        w-1/2 h-full"
          >
            {/* left panel */}
            <div className="h-[9%]">
              <ModalHeader title={person?.name || ""}></ModalHeader>
            </div>
            <div className="w-full h-[91%] p-2 border-[0.2px] border-primary">
              <img src={imageSrc} alt="" className="w-full h-[400px] " />
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
}

export default PersonLog;
