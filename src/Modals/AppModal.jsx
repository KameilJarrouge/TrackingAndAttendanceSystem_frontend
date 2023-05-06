import React from "react";
import Modal from "react-modal";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
  },
};

Modal.setAppElement("#root");

const AppModal = ({
  children,
  modalIsOpen,
  afterOpenModal,
  closeModal,
  label,
  className,
}) => {
  return (
    <Modal
      isOpen={modalIsOpen}
      onAfterOpen={afterOpenModal}
      onRequestClose={closeModal}
      contentLabel={label}
      className={className}
      overlayClassName={"fixed top-0 bottom-0 right-0 left-0 z-50 bg-black/80 "}
      shouldCloseOnOverlayClick={true}
    >
      {children}
    </Modal>
  );
};

export default AppModal;
