import { useState, useRef } from "react";
import { MdMoreVert, MdEdit } from "react-icons/md";
import { FaTrash } from "react-icons/fa";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import useOutsideClick from "../../hooks/useOutsideClick";

const TaskActions = ({ task, onEdit, onDelete }) => {
  const [isOpen, setIsOpen] = useState(false);
  const buttonRef = useRef(null);
  const menuRef = useRef(null);
  const portalRef = useRef(null);
  const [coords, setCoords] = useState({ top: 0, left: 0 });

  const handleToogle = () => {
    if (buttonRef.current) {
      const rect = buttonRef.current.getBoundingClientRect();
      setCoords({
        top: rect.bottom + window.scrollY + 5,
        left: rect.left - 150 + window.scrollX,
      });
    }
    setIsOpen((prev) => !prev);
  };

  useOutsideClick([menuRef, portalRef], () => setIsOpen(false));

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
        <button onClick={handleToogle} ref={buttonRef}>
          <MdMoreVert size={20} />
        </button>

        {isOpen &&
          createPortal(
            <ul
              className="absolute w-40 bg-white shadow-md rounded-md z-50"
              style={{ top: coords.top, left: coords.left }}
              ref={portalRef}
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
            </ul>,
            document.body
          )}
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
