import React from "react";
import { AiFillCheckSquare } from "react-icons/ai";
import { BsThreeDots } from "react-icons/bs";
import { GoPrimitiveDot } from "react-icons/go";
import { MdDangerous } from "react-icons/md";
import { toast } from "react-toastify";
import api from "../api/api";
import TCell from "./TCell";

function AttendanceCellProf({
  attendance,
  setData = (f) => f,
  openModal = (f) => f,
  refresh,
  clickable = true,
}) {
  const handleClick = async () => {
    if (!clickable) return;
    let res = await api.put(
      `/api/professor-attendance/${attendance.id}/update`
    );

    refresh();
  };

  const handleDoubleClick = () => {
    if (!clickable) return;
    if (attendance.verification_img) {
      setData(attendance.verification_img, attendance.timestamp);
      openModal();
    }
  };
  return (
    <TCell>
      <div className="w-full flex items-center justify-center">
        {attendance.visited === 1 ? (
          <>
            {attendance.skipped === 1 ? (
              <GoPrimitiveDot
                onClick={handleClick}
                className="cursor-pointer text-amber-500"
              />
            ) : (
              <>
                {attendance.attended === 1 ? (
                  <AiFillCheckSquare
                    onDoubleClick={handleDoubleClick}
                    className="cursor-pointer text-accent"
                  />
                ) : (
                  <MdDangerous
                    onClick={handleClick}
                    className="cursor-pointer text-red-600"
                  />
                )}
              </>
            )}
          </>
        ) : (
          <BsThreeDots
            // onDoubleClick={handleDoubleClick}
            className="text-primary/70"
          />
        )}
      </div>
    </TCell>
  );
}

export default AttendanceCellProf;
