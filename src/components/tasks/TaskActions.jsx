import { useState, useRef, useEffect } from "react";
import { MdMoreVert, MdEdit, MdDelete } from "react-icons/md";
import PropTypes from "prop-types";
import useOutsideClick from "../../hooks/useOutsideClick";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const menuVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.95, originX: 1, originY: 0 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    originX: 1,
    originY: 0,
    transition: { duration: 0.15, ease: [0.4, 0, 0.2, 1] },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.95,
    originX: 1,
    originY: 0,
    transition: { duration: 0.12, ease: [0.4, 0, 0.2, 1] },
  },
};

const TaskActions = ({ task, onEdit, onDeleteRequest }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const toggleButtonRef = useRef(null);

  const handleToogle = () => {
    setIsOpen((prev) => !prev);
  };

  useOutsideClick(menuRef, () => setIsOpen(false));

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setIsOpen(false);
        toggleButtonRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="relative flex items-center gap-2">
      {/* Direct actions on desktop */}
      <div className="hidden md:flex gap-2">
        <button
          onClick={() => onEdit(task)}
          className={`${
            task.completed && "opacity-50"
          } flex items-center gap-1 px-3 py-1 text-sm text-secondary rounded-md hover:bg-primary hover:text-white transition cursor-pointer`}
          disabled={task.completed}
        >
          <MdEdit size={16} aria-hidden="true" />
          Editar
        </button>
        <button
          onClick={() => onDeleteRequest(task)}
          className="flex items-center gap-1 px-3 py-1 text-sm text-secondary rounded-md hover:bg-primary hover:text-white transition cursor-pointer"
        >
          <MdDelete size={18} aria-hidden="true" />
          Excluir
        </button>
      </div>

      {/* Direct actions on mobile */}
      <div className="md:hidden relative" ref={menuRef}>
        <button
          onClick={handleToogle}
          ref={toggleButtonRef}
          aria-label={`Mais ações para a tarefa ${task.title}`}
          aria-expanded={isOpen}
          aria-haspopup="menu"
          className="flex items-center gap-1 p-1 text-sm rounded-full cursor-pointer focus:outline-secondary/50"
        >
          <MdMoreVert size={20} aria-hidden="true" />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              role="menu"
              className="absolute top-8 right-0 w-40 bg-white shadow-md rounded-md z-50"
            >
              <li className="border-b border-gray-200" role="none">
                <button
                  onClick={() => {
                    onEdit(task);
                    setIsOpen(false);
                  }}
                  className={`${
                    task.completed && "opacity-50"
                  } flex gap-2 items-center text-sm p-3 w-full text-left`}
                  disabled={task.completed}
                  role="menuitem"
                >
                  <MdEdit
                    size={16}
                    className="text-secondary"
                    aria-hidden="true"
                  />
                  Editar
                </button>
              </li>
              <li role="none">
                <button
                  onClick={() => {
                    onDeleteRequest(task);
                    setIsOpen(false);
                  }}
                  className="flex gap-2 items-center text-sm p-3 w-full text-left"
                  role="menuitem"
                >
                  <MdDelete
                    size={16}
                    className="text-secondary"
                    aria-hidden="true"
                  />
                  Excluir
                </button>
              </li>
            </motion.ul>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

TaskActions.propTypes = {
  task: PropTypes.object.isRequired,
  onEdit: PropTypes.func.isRequired,
  onDeleteRequest: PropTypes.func.isRequired,
};

export default TaskActions;
