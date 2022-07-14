import { useState } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import api from "./api/api";
import { getUser } from "./api/user";
import SetupInterceptors from "./api/SetupInterceptors";
import ContainerPage from "./pages/ContainerPage";
import LoginPage from "./pages/LoginPage";
import UserContext from "./context/userContext";
import DashboardPage from "./pages/DashboardPage";
import SettingPage from "./pages/SettingPage";
import SemestersPage from "./pages/SemestersPage";
import PeoplePage from "./pages/PeoplePage";
import StudentsPage from "./pages/StudentsPage";
import ProfessorsPage from "./pages/ProfessorsPage";
import SubjectsPage from "./pages/SubjectsPage";
import CamerasPage from "./pages/CamerasPage";
import PersonLog from "./pages/PersonLog";
import StudentSubjectsPage from "./pages/StudentSubjectsPage";
import ProfessorSubjectsPage from "./pages/ProfessorSubjectsPage";
import SubjectProfessorsPage from "./pages/SubjectProfessorsPage";
import SubjectStudentsPage from "./pages/SubjectStudentsPage";
import CamLogPage from "./pages/CamLogPage";
import CamSchedulePage from "./pages/CamSchedulePage";

function App() {
  const [user, setUser] = useState(() => {
    if (!getUser()) {
      return {};
    }

    return getUser();
  });

  function NavigateFunctionComponent(props) {
    let navigate = useNavigate();
    if (api.interceptors.response.handlers.length === 0) {
      SetupInterceptors(navigate);
    }
    return <></>;
  }

  return (
    <UserContext.Provider value={{ user: user, setUser: setUser }}>
      {/* <NavigateFunctionComponent /> */}
      <div className="min-h-[100vh] bg-white ">
        <ToastContainer
          className={"z-50 text-right text-xl"}
          autoClose={1000}
        />
        <div>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/" element={<ContainerPage></ContainerPage>}>
              <Route path="dashboard" element={<DashboardPage />} />
              <Route path="settings" element={<SettingPage />} />
              <Route path="semesters" element={<SemestersPage />} />
              <Route path="people" element={<PeoplePage />} />
              <Route path="person/:personId/log" element={<PersonLog />} />
              <Route
                path="student/:studentId/subjects"
                element={<StudentSubjectsPage />}
              />
              <Route
                path="professor/:professorId/subjects"
                element={<ProfessorSubjectsPage />}
              />
              <Route
                path="subject/:subjectId/professors"
                element={<SubjectProfessorsPage />}
              />
              <Route
                path="subject/:subjectId/students"
                element={<SubjectStudentsPage />}
              />
              <Route path="camera/:camId/log" element={<CamLogPage />} />
              <Route
                path="camera/:camId/schedule"
                element={<CamSchedulePage />}
              />

              <Route path="student" element={<StudentsPage />} />
              <Route path="professor" element={<ProfessorsPage />} />
              <Route path="subject" element={<SubjectsPage />} />
              <Route path="camera" element={<CamerasPage />} />
            </Route>
          </Routes>
        </div>
      </div>
    </UserContext.Provider>
  );
}

export default App;
