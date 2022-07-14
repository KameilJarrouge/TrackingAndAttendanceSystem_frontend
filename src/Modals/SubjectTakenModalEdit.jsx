import React, { useEffect, useState } from "react";
import AppForm from "../components/form/AppForm";
import * as Yup from "yup";
import AppModal from "./AppModal";
import ModalHeader from "./ModalHeader";
import SubmitButton from "../components/form/SubmitButton";
import api from "../api/api";
import { toast } from "react-toastify";
import { Autocomplete, createFilterOptions, TextField } from "@mui/material";
import { getDayAsString } from "../components/getDayAsString";
import moment from "moment";
const validationSchema = Yup.object().shape({
  subject: Yup.number().required("الحقل إجباري"),
  theory: Yup.number().required("الحقل إجباري"),
  practical: Yup.number().required("الحقل إجباري"),
});

const filterOptions = createFilterOptions({
  matchFrom: "any",
  stringify: (option) =>
    option.professor.name +
    " " +
    getDayAsString(option.day) +
    " " +
    moment(option.time, "HH:mm:ss").format("HH:mm") +
    " " +
    option.group,
});

function SubjectTakenModalEdit({
  open,
  onClose,
  refresh,
  takenSubjectId,
  subjectId,
}) {
  const [subjectOptions, setSubjectOptions] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState(null);
  const [subjectInputValue, setSubjectInputValue] = useState("");

  const [theoryOptions, setTheoryOptions] = useState([]);
  const [selectedTheory, setSelectedTheory] = useState(null);
  const [theoryInputValue, setTheoryInputValue] = useState("");

  const [practicalOptions, setPracticalOptions] = useState([]);
  const [selectedPractical, setSelectedPractical] = useState(null);
  const [practicalInputValue, setPracticalInputValue] = useState("");

  const getInfo = async () => {
    if (takenSubjectId === 0) return;
    let res = await api.get(`/api/taken-subjects/${takenSubjectId}/info`);
    console.log("====================================");
    console.log(res.data);
    console.log("====================================");
    setSelectedSubject(res.data.subject);
    setSelectedTheory(res.data.theory);
    setSelectedPractical(res.data.practical);
  };

  const getGivenSubjectsOptions = async () => {
    if (subjectId === 0) return;
    let res = await api.get(`/api/given-subjects/${subjectId}/theory`);
    console.log("====================================");
    console.log("options", res.data);
    console.log("====================================");
    setTheoryOptions(res.data);
    res = await api.get(`/api/given-subjects/${subjectId}/practical`);
    setPracticalOptions(res.data);
  };

  const getSubjectOptions = async () => {
    // let res = await api.get(`/api/subjects/options`);
    // setSubjectOptions(res.data);
  };

  useEffect(() => {
    if (takenSubjectId !== undefined) {
      getInfo();
    }
  }, [open, takenSubjectId]);

  useEffect(() => {
    getGivenSubjectsOptions();
  }, [open]);

  useEffect(() => {
    if (selectedSubject !== null) {
      getGivenSubjectsOptions();
    }
  }, [selectedSubject]);

  const handlesubmit = async () => {
    const res = await api.put(
      `/api/taken-subjects/${takenSubjectId}/update-subject`,
      {
        theory_id: selectedTheory?.id || "null",
        practical_id: selectedPractical?.id || "null",
      }
    );
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      setSelectedSubject(null);
      setSelectedTheory(null);
      setSelectedPractical(null);
      onClose();
      refresh();
    }
  };
  return (
    <AppModal
      closeModal={onClose}
      modalIsOpen={open}
      className="rounded-lg fixed top-[20%] left-0 ml-auto h-auto  right-0 mr-auto w-96  bg-background  shadow-md shadow-black border-[2px] border-primary "
    >
      <div className="w-full">
        <div className="w-full h-[3rem] ">
          <ModalHeader
            title={"إضافة مقرر للطالب"}
            onClose={onClose}
          ></ModalHeader>
        </div>

        <div
          className="flex flex-col items-center 
        w-full"
        >
          <div className="w-11/12 my-4 ">
            {/* subject */}
            <Autocomplete
              disabled
              isOptionEqualToValue={(option1, option2) => {
                return option1.name === option2.name;
              }}
              getOptionLabel={(option) => `${option?.name}`}
              renderOption={(props, option, state) => {
                return (
                  <div
                    {...props}
                    dir="rtl"
                    className="self-center border-[2px] text-2xl text-primary bg-background  px-2 mx-1 rounded-lg  border-primary flex justify-between items-center cursor-pointer"
                  >
                    <div>{option.name}</div>
                  </div>
                );
              }}
              value={selectedSubject}
              onChange={(event, newValue) => {
                setSelectedSubject(newValue);
              }}
              inputValue={subjectInputValue}
              onInputChange={(event, newInputValue) => {
                setSubjectInputValue(newInputValue);
              }}
              dir="ltr"
              className="border-primary border-[1px] bg-input rounded-md w-full self-center my-1 text-right text-primary text-3xl "
              disablePortal
              id="combo-box-demo"
              options={subjectOptions}
              renderInput={(params) => {
                params.value = selectedSubject?.name;
                return (
                  <TextField
                    {...params}
                    // label="اسم المادة"
                    placeholder="اسم المقرر"
                    dir="rtl"
                    className="text-right border-primary text-3xl text-primary"
                  />
                );
              }}
            />
            {/* theory */}
            <Autocomplete
              isOptionEqualToValue={(option1, option2) => {
                return option1.name === option2.name;
              }}
              getOptionLabel={(option) => {
                console.log("option", option?.professor?.name);
                return `${
                  option?.professor?.name +
                  " | " +
                  getDayAsString(option.day) +
                  " | " +
                  moment(option.time, "HH:mm:ss").format("HH:mm")
                }`;
              }}
              renderOption={(props, option, state) => {
                return (
                  <div
                    {...props}
                    dir="rtl"
                    className=" self-center border-[2px] my-1 text-2xl  px-2 mx-1 rounded-lg  flex justify-between items-center cursor-pointer
                    hover:text-white hover:bg-primary_dark transition-all border-primary_light text-font bg-primary_light"
                  >
                    <div className="w-1/5">{getDayAsString(option.day)}</div>
                    <div className="w-1/5">
                      {moment(option.time, "HH:mm:ss").format("HH:mm")}
                    </div>
                    {/* {option.group !== "" && <div>{option.group}</div>} */}

                    <div className="w-3/5">
                      {"| "}
                      {option.professor.name}
                    </div>
                  </div>
                );
              }}
              value={selectedTheory}
              onChange={(event, newValue) => {
                setSelectedTheory(newValue);
              }}
              inputValue={theoryInputValue}
              onInputChange={(event, newInputValue) => {
                setTheoryInputValue(newInputValue);
              }}
              dir="ltr"
              placeholder=""
              className="border-primary border-[1px] bg-input rounded-md w-full self-center mt-4 text-right text-primary text-3xl "
              disablePortal
              id="combo-box-demo"
              options={theoryOptions}
              filterOptions={filterOptions}
              renderInput={(params) => {
                params.value = selectedTheory?.name;
                return (
                  <TextField
                    {...params}
                    // label="اسم المادة"
                    placeholder="النظري"
                    dir="rtl"
                    className="text-right border-primary text-3xl text-primary"
                  />
                );
              }}
            />
            {/* practical if it has practical */}
            <Autocomplete
              isOptionEqualToValue={(option1, option2) => {
                return option1.name === option2.name;
              }}
              getOptionLabel={(option) =>
                `${
                  option?.professor?.name +
                  " | " +
                  getDayAsString(option.day) +
                  " | " +
                  moment(option.time, "HH:mm:ss").format("HH:mm")
                }`
              }
              renderOption={(props, option, state) => {
                return (
                  <div
                    {...props}
                    dir="rtl"
                    className=" self-center border-[2px] my-1 text-2xl  px-2 mx-1 rounded-lg  flex justify-between items-center cursor-pointer
                    hover:text-white hover:bg-primary_dark transition-all border-primary_light text-font bg-primary_light"
                  >
                    <div className="w-1/5">{getDayAsString(option.day)}</div>
                    <div className="w-1/5">
                      {moment(option.time, "HH:mm:ss").format("HH:mm")}
                    </div>
                    {/* {option.group !== "" && <div>{option.group}</div>} */}

                    <div className="w-3/5">
                      {"| "}
                      {option.professor.name}
                    </div>
                  </div>
                );
              }}
              value={selectedPractical}
              onChange={(event, newValue) => {
                setSelectedPractical(newValue);
              }}
              inputValue={practicalInputValue}
              onInputChange={(event, newInputValue) => {
                setPracticalInputValue(newInputValue);
              }}
              dir="ltr"
              placeholder=""
              className="border-primary border-[1px] bg-input rounded-md w-full self-center mt-4 text-right text-primary text-3xl "
              disablePortal
              id="combo-box-demo"
              options={practicalOptions}
              filterOptions={filterOptions}
              renderInput={(params) => {
                params.value = selectedPractical?.name;
                return (
                  <TextField
                    {...params}
                    // label="اسم المادة"
                    placeholder="العملي"
                    dir="rtl"
                    className="text-right border-primary text-3xl text-primary"
                  />
                );
              }}
            />
          </div>

          <div
            className="flex justify-center items-center
            w-1/3 mb-3"
          >
            <button
              type="button"
              className={`flex justify-center items-center 
                w-full h-full 
                rounded-lg text-2xl font-bold
                bg-primary text-accent  border-[2px]  border-accent  
                hover:bg-accent hover:text-primary hover:border-primary transition-all`}
              onClick={handlesubmit}
            >
              تعديل
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}

export default SubjectTakenModalEdit;
