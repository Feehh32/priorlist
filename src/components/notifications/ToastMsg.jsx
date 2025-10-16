import PropTypes from "prop-types";
import { MdCheck } from "react-icons/md";
import { MdOutlineErrorOutline } from "react-icons/md";
import { MdWarning } from "react-icons/md";
import { MdOutlineClose } from "react-icons/md";
import { MdUpdate } from "react-icons/md";
import { useEffect } from "react";

const ToastMsg = ({ message, type, onClose }) => {
  const icons = {
    success: <MdCheck size={20} aria-hidden="true" />,
    error: <MdOutlineErrorOutline size={20} aria-hidden="true" />,
    warning: <MdWarning size={20} aria-hidden="true" />,
    update: <MdUpdate size={20} aria-hidden="true" />,
  };

  const bgColors = {
    success: "bg-green-500",
    error: "bg-red-500",
    warning: "bg-yellow-500",
    update: "bg-blue-500",
  };

  useEffect(() => {
    if (!message) return;

    const timer = setTimeout(() => {
      onClose();
    }, 3000);

    return () => clearTimeout(timer);
  }, [message, onClose]);

  const role = type === "error" || type === "warning" ? "alert" : "status";

  return (
    <div
      role={role}
      aria-live="polite"
      className="transition-all duration-300 translate-y-[-100%] flex items-center justify-between gap-3 bg-gray-800/90 text-white px-4 py-3 rounded-lg shadow-lg mx-2 md:mx-0"
    >
      <span
        className={`${bgColors[type]} rounded-full p-1 flex items-center justify-between`}
      >
        {icons[type]}
      </span>
      <p className="font-secondary font-medium text-white text-sm md:text-base">
        {message}
      </p>
      <button
        className="ml-2 p-2 cursor-pointer"
        onClick={onClose}
        aria-label="Fechar notificação"
      >
        <MdOutlineClose
          size={24}
          className="text-gray-300 transition-colors duration-200 hover:text-gray-400"
          aria-hidden="true"
        />
      </button>
    </div>
  );
};

ToastMsg.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "warning"]),
  onClose: PropTypes.func,
};

export default ToastMsg;
