import { useRef } from "react";
import PropTypes from "prop-types";
import useOutsideClick from "../../hooks/useOutsideClick";

const Modal = ({ isOpen, onClose, children }) => {
  const modalRef = useRef(null);
  useOutsideClick(modalRef, onClose);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
      <div
        className="bg-white rounded-2xl shadow-lg mx-2 p-6 w-full max-w-lg relative"
        ref={modalRef}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-500 hover:text-gray-700 cursor-pointer"
        >
          ✕
        </button>
        {children}
      </div>
    </div>
  );
};

Modal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
};

export default Modal;
