import React, { useEffect, useState } from "react";
import { BiReset } from "react-icons/bi";
import { RiExternalLinkLine } from "react-icons/ri";
import { TbMinusVertical } from "react-icons/tb";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import api from "../api/api";
import { getUser, setUser } from "../api/user";
import { Tooltip } from "../Modals/Tooltip";

function LatestSemester({ refresh = (f) => f }) {
  let user = getUser();
  let navigate = useNavigate();
  const [viewedSemester, setViewedSemester] = useState({});

  const getSemester = async () => {
    if (!user.semester_id) return;
    let res = await api.get(`/api/semesters/${user.semester_id}`);
    setViewedSemester(res.data);
  };

  const handleSemestersPageNavigate = () => {
    navigate("/semesters");
  };

  const handleReturnToCurrentSemester = async () => {
    let res = await api.put(`/api/semesters/preview-current`);

    setUser(res.data.user);
    if (res.data.status === "ok") {
      toast.success(res.data.message);
      refresh();
      getSemester();
    }
  };

  useEffect(() => {
    getSemester();
    console.log(viewedSemester);
  }, []);

  return (
    <div className="flex items-center text-font">
      <Tooltip message={"الفصول"} visible>
        <RiExternalLinkLine
          onClick={handleSemestersPageNavigate}
          className="text-xl hover:text-accent transition-all cursor-pointer"
        ></RiExternalLinkLine>
      </Tooltip>
      <div className=" mx-1"></div>
      <Tooltip message={`الفصل الحالي`} visible nowrap>
        <BiReset
          onClick={handleReturnToCurrentSemester}
          className="text-xl hover:text-accent transition-all cursor-pointer"
        ></BiReset>
      </Tooltip>
      <TbMinusVertical className="text-2xl"></TbMinusVertical>

      <div className="text-font text-xl min-w-fit flex ">
        <span className="font-bold"> الفصل:</span>
        <span className="px-1 ">{viewedSemester?.name_identifier}</span>
        <span>{viewedSemester?.year}</span>
      </div>
    </div>
  );
}

export default LatestSemester;
