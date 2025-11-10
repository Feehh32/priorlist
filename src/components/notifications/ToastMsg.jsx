import PropTypes from "prop-types";
import {
  MdCheck,
  MdOutlineErrorOutline,
  MdWarning,
  MdOutlineClose,
  MdUpdate,
} from "react-icons/md";
import { useEffect } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

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

  // Animation variants config
  const toastVariants = {
    initial: { opacity: 0, y: 100, scale: 0.9 },
    animate: { opacity: 1, y: 0, scale: 1 },
    exit: { opacity: 0, x: 300, scale: 0.8 },
  };

  return (
    <motion.div
      variants={toastVariants}
      initial="initial"
      animate="animate"
      exit="exit"
      transition={{ duration: 0.3 }}
      role={role}
      aria-live="polite"
      className="flex items-center justify-between gap-3 bg-gray-800/90 text-white px-4 py-3 rounded-lg shadow-lg mx-2 md:mx-0"
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
    </motion.div>
  );
};

ToastMsg.propTypes = {
  message: PropTypes.string.isRequired,
  type: PropTypes.oneOf(["success", "error", "warning", "update"]).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default ToastMsg;
