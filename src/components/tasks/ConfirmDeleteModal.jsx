// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef } from "react";

const backdrop = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 },
};

const modal = {
  hidden: { opacity: 0, scale: 0.95, y: -20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { type: "spring", stiffness: 400, damping: 18, duration: 0.25 },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: -20,
    transition: {
      duration: 0.2,
      ease: "easeInOut",
    },
  },
};

const ConfirmDeleteModal = ({ isOpen, confirmDelete }) => {
  const titleId = "delete-modal-title";
  const modalRef = useRef(null);

  // Create a focus trap and handle escape key
  useEffect(() => {
    if (!isOpen) return;
    modalRef.current?.focus();
    document.body.style.overflow = "hidden";

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        confirmDelete(false);
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, confirmDelete]);

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdrop}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-2 md:px-0"
        >
          <motion.div
            variants={modal}
            initial="hidden"
            animate="visible"
            exit="exit"
            role="alertdialog"
            aria-labelledby={titleId}
            tabIndex={-1}
            ref={modalRef}
            className="bg-white max-w-md border-t-16 rounded-lg shadow-lg border-primary p-4"
          >
            <h2 className="text-xl text-secondary font-medium" id={titleId}>
              Tem certeza que deseja excluir essa tarefa?
            </h2>
            <div className="flex justify-center items-center gap-4 mt-4">
              <button
                className="px-4 py-2 hover:bg-primary hover:text-white cursor-pointer rounded-lg transition-colors duration-300 focus:bg-primary focus:text-white"
                id="cancel-button"
                onClick={() => confirmDelete(false)}
              >
                Cancelar
              </button>
              <button
                onClick={() => confirmDelete(true)}
                className="px-4 py-2 hover:bg-red-600 hover:text-white cursor-pointer rounded-lg transition-colors duration-300 focus:bg-red-600 focus:text-white"
              >
                Excluir
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
export default ConfirmDeleteModal;
