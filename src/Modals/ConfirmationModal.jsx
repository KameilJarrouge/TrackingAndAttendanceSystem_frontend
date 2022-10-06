import moment from "moment";
import React, { useEffect } from "react";
import AppModal from "./AppModal";
import ModalHeader from "./ModalHeader";

function ConfirmationModal({
  open,
  onClose,
  title = "إزالة الشخص",
  warningMessage = "لا يمكن التراجع عن هذه العملية",
  confirmationButtonTitle = "حذف",
  onConfirm = (f) => f,
  data,
  titleInfo = "",
}) {
  useEffect(() => {}, [data]);

  return (
    <AppModal
      closeModal={onClose}
      modalIsOpen={open}
      className="rounded-lg fixed top-[30%] left-0 ml-auto min-h-[9rem] h-auto  right-0 mr-auto w-fit min-w-[25rem]  max-w-screen-md max-h-screen  bg-background  shadow-md shadow-black border-[2px] border-primary "
    >
      <div
        dir="rtl"
        class="bg-background rounded-lg md:max-w-md md:mx-auto p-4 fixed inset-x-0 bottom-0 z-50  mx-4 md:relative"
      >
        <div class="md:flex items-center w-full">
          {/* <div class="rounded-full border border-gray-300 flex items-center justify-center w-16 h-16 flex-shrink-0 mx-auto">
            <i class="bx bx-error text-3xl"></i>
          </div> */}
          <div class="w-full mt-4 md:mt-0  text-center md:text-right">
            <p class="w-full font-bold text-lg text-primary">
              {title}
              {"(" + titleInfo + ")"}
            </p>
            <div className="w-full h-0.5 bg-primary"></div>
            <p class="text-base text-gray-700 mt-1">{warningMessage}</p>
          </div>
        </div>
        <div class="text-center md:text-right mt-4 md:flex md:justify-end">
          <button
            onClick={() => {
              onConfirm(data);
              onClose();
            }}
            class="block min-w-[5rem] w-full md:inline-block md:w-auto px-4 py-3 md:py-2 mx-2 bg-red-200 text-red-700 rounded-lg font-semibold text-sm md:ml-2 md:order-2"
          >
            {confirmationButtonTitle}
          </button>
          <button
            onClick={() => onClose()}
            class="block min-w-[5rem] w-full md:inline-block md:w-auto px-4 py-3 md:py-2 mx-2 bg-gray-200 rounded-lg font-semibold text-sm mt-4
          md:mt-0 md:order-1"
          >
            {"إلغاء"}
          </button>
        </div>
      </div>
    </AppModal>
  );
}

export default ConfirmationModal;
