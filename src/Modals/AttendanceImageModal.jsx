import moment from "moment";
import React from "react";
import AppModal from "./AppModal";
import ModalHeader from "./ModalHeader";

function AttendanceImageModal({
  open,
  onClose,
  timestamp = "",
  imageSrc = "",
}) {
  return (
    <AppModal
      closeModal={onClose}
      modalIsOpen={open}
      className="rounded-lg fixed top-[10%] left-0 ml-auto min-h-[10rem] h-auto  right-0 mr-auto w-fit min-w-[15rem]  max-w-screen-md max-h-screen  bg-background  shadow-md shadow-black border-[2px] border-primary "
    >
      <div className="w-full">
        <div className="w-full h-[3rem] ">
          <div
            // dir="rtl"
            className="bg-primary text-lg text-center text-font py-2 flex justify-evenly"
          >
            <div>
              {moment(timestamp, "yyyy-MM-DD HH:mm:ss").format("yyyy-MM-DD")}
            </div>
            <div>
              {moment(timestamp, "yyyy-MM-DD HH:mm:ss").format("HH:mm:ss")}
            </div>
          </div>
        </div>
        <div className="w-full h-full flex justify-center items-center p-2">
          <img src={imageSrc} alt="" />
        </div>
      </div>
    </AppModal>
  );
}

export default AttendanceImageModal;
