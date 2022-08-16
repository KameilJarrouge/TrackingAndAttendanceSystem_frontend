import React, { useEffect, useState } from "react";
import api from "../api/api";
import { getUser } from "../api/user";
import SubjectsContainer from "../components/SubjectsContainer";
import SubjectStatus from "../Enums/SubjectStatus";

function ProfessorDashboardPage() {
  const [user, setUser] = useState(getUser());
  const [subjectsPrev, setSubjectsPrev] = useState([]);
  const [subjectsCurr, setSubjectsCurr] = useState([]);
  const [subjectsFuture, setSubjectsFuture] = useState([]);

  const [currentIsOpen, setCurrentIsOpen] = useState(1);

  const getSubjects = async () => {
    let res = await api.get(
      `/api/professors/${user.person_id}/dashboard-subjects`
    );
    console.log(res.data);
    setSubjectsPrev(res.data.previous);
    setSubjectsCurr(res.data.current);
    setSubjectsFuture(res.data.future);
  };

  useEffect(() => {
    getSubjects();
  }, []);

  return (
    <div className="py-14 px-14 h-[90vh] bg-background   ">
      {/* main box */}
      <div className="w-full h-full  flex justify-between border-[0.1px] border-primary">
        {/* previous subjects */}
        <div
          onClick={() => setCurrentIsOpen(0)}
          className={`${
            currentIsOpen === 0 ? "w-[95%]" : "w-[5%]"
          }   transition-all duration-200 overflow-x-hidden `}
        >
          <SubjectsContainer
            withControl={false}
            withProfessor={false}
            refresh={getSubjects}
            currentId={currentIsOpen}
            myId={SubjectStatus.PREVIOUS}
            title={"المحاضرات السابقة"}
            hiddenColor="primary_dark"
            subjects={subjectsPrev === undefined ? [] : subjectsPrev}
          />
        </div>

        <div className="w-0.5 h-full bg-background"></div>

        {/* current subjects */}
        <div
          onClick={() => setCurrentIsOpen(1)}
          className={`${
            currentIsOpen === 1 ? "w-[95%]" : "w-[5%]"
          }   transition-all duration-200 overflow-x-hidden`}
        >
          <SubjectsContainer
            withControl={false}
            withProfessor={false}
            refresh={getSubjects}
            currentId={currentIsOpen}
            myId={SubjectStatus.CURRENT}
            title={"المحاضرات الحالية"}
            hiddenColor="primary_dark"
            subjects={subjectsCurr === undefined ? [] : subjectsCurr}
          />
        </div>

        <div className="w-0.5 h-full bg-background"></div>

        {/* future subjects */}
        <div
          onClick={() => setCurrentIsOpen(2)}
          className={`${
            currentIsOpen === 2 ? "w-[95%]" : "w-[5%]"
          }   transition-all duration-200 overflow-x-hidden `}
        >
          <SubjectsContainer
            withControl={false}
            withProfessor={false}
            refresh={getSubjects}
            currentId={currentIsOpen}
            myId={SubjectStatus.FUTURE}
            title={"المحاضرات التالية"}
            hiddenColor="primary_dark"
            subjects={subjectsFuture === undefined ? [] : subjectsFuture}
          />
        </div>
      </div>
    </div>
  );
}

export default ProfessorDashboardPage;
