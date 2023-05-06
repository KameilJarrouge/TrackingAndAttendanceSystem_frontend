import React from "react";
import { AiOutlineClose } from "react-icons/ai";
import Title from "../components/Title";

function ModalHeader({ title, onClose, className = "" }) {
  return (
    <div
      dir="rtl"
      className={`w-full h-full flex flex-row bg-primary items-center ${className}`}
    >
      <div className="w-full flex flex-row justify-center items-center ">
        <Title title={title}></Title>
      </div>
    </div>
  );
}

export default ModalHeader;
