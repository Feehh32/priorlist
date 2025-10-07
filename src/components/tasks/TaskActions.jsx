import { useState, useRef } from "react";
import { MdMoreVert, MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
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

const TaskActions = ({ task, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  const handleToogle = () => {
    setIsOpen((prev) => !prev);
  };

  useOutsideClick(menuRef, () => setIsOpen(false));

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
          <MdEdit size={16} />
          Editar
        </button>
        <button
          onClick={() => onDelete(task.id)}
          className="flex items-center gap-1 px-3 py-1 text-sm text-secondary rounded-md hover:bg-primary hover:text-white transition cursor-pointer"
        >
          <FaTrash size={16} />
          Excluir
        </button>
      </div>

      {/* Direct actions on mobile */}
      <div className="md:hidden relative" ref={menuRef}>
        <button onClick={handleToogle}>
          <MdMoreVert size={20} />
        </button>
        <AnimatePresence>
          {isOpen && (
            <motion.ul
              variants={menuVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="absolute top-8 right-0 w-40 bg-white shadow-md rounded-md z-50"
            >
              <li className="border-b border-gray-200">
                <button
                  onClick={() => {
                    onEdit(task);
                    setIsOpen(false);
                  }}
                  className={`${
                    task.completed && "opacity-50"
                  } flex gap-2 items-center text-sm p-3 w-full text-left`}
                  disabled={task.completed}
                >
                  <MdEdit size={16} className="text-secondary" />
                  Editar
                </button>
              </li>
              <li>
                <button
                  onClick={() => {
                    onDelete(task.id);
                    setIsOpen(false);
                  }}
                  className="flex gap-2 items-center text-sm p-3 w-full text-left"
                >
                  <FaTrash size={16} className="text-secondary" />
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
  onDelete: PropTypes.func.isRequired,
};

export default TaskActions;
