import React, { useEffect, useState } from "react";
import * as Yup from "yup";
import AppModal from "./AppModal";
import ModalHeader from "./ModalHeader";
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

function StudentTakenModalAdd({ open, onClose, refresh, subjectId }) {
  const [studentOptions, setStudentOptions] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [studentInputValue, setStudentInputValue] = useState("");

  const [theoryOptions, setTheoryOptions] = useState([]);
  const [selectedTheory, setSelectedTheory] = useState(null);
  const [theoryInputValue, setTheoryInputValue] = useState("");

  const [practicalOptions, setPracticalOptions] = useState([]);
  const [selectedPractical, setSelectedPractical] = useState(null);
  const [practicalInputValue, setPracticalInputValue] = useState("");

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

  const getStudentOptions = async () => {
    if (subjectId === 0) return;
    let res = await api.get(`/api/students/subjects/${subjectId}/options`);
    setStudentOptions(res.data);
  };

  useEffect(() => {
    getStudentOptions();
    getGivenSubjectsOptions();
  }, [open, subjectId]);

  //   useEffect(() => {
  //     if (selectedStudent !== null) {
  //     }
  //   }, [open,subject]);

  const handlesubmit = async () => {
    if (selectedStudent === null) {
      toast.error("يرجى اختيار طالب");
      return;
    }
    const res = await api.post(`/api/subjects/${subjectId}/add-student`, {
      person_id: selectedStudent?.id || null,
      theory_id: selectedTheory?.id || null,
      practical_id: selectedPractical?.id || null,
    });
    console.log(res.data);
    if (res.data.status === "ok") {
      toast.success(res.data.message);

      setSelectedStudent(null);
      setSelectedTheory(null);
      setSelectedPractical(null);
      onClose();
      refresh();
    } else {
      toast.warning(res.data.message);
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
              isOptionEqualToValue={(option1, option2) => {
                return option1.name === option2.name;
              }}
              getOptionLabel={(option) => `${option?.name}`}
              renderOption={(props, option, state) => {
                return (
                  <div
                    {...props}
                    dir="rtl"
                    className="self-center border-[2px] my-1 text-2xl  px-2 mx-1 rounded-lg  flex justify-between items-center cursor-pointer
                    hover:text-white hover:bg-primary_dark transition-all border-primary_light text-font bg-primary_light"
                  >
                    <div>{option.name}</div>
                  </div>
                );
              }}
              value={selectedStudent}
              onChange={(event, newValue) => {
                setSelectedStudent(newValue);
              }}
              inputValue={studentInputValue}
              onInputChange={(event, newInputValue) => {
                setStudentInputValue(newInputValue);
              }}
              dir="ltr"
              className="border-primary border-[1px] bg-input rounded-md w-full self-center my-1 text-right text-primary text-3xl "
              disablePortal
              id="combo-box-demo"
              options={studentOptions}
              renderInput={(params) => {
                params.value = selectedStudent?.name;
                return (
                  <TextField
                    {...params}
                    // label="اسم المادة"
                    placeholder="اسم الطالب"
                    dir="rtl"
                    className="text-right border-primary text-3xl text-primary"
                  />
                );
              }}
            />
            {/* theory */}
            <Autocomplete
              isOptionEqualToValue={(option1, option2) => {
                return (
                  option1.name === option2.name ||
                  getDayAsString(option1.day) === getDayAsString(option2.day)
                );
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
              إضافة
            </button>
          </div>
        </div>
      </div>
    </AppModal>
  );
}

export default StudentTakenModalAdd;
