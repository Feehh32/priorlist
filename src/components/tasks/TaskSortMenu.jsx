import { useState, useRef } from "react";
import { MdOutlineSort } from "react-icons/md";
import { MdCheck } from "react-icons/md";
import PropTypes from "prop-types";
import useOutsideClick from "../../hooks/useOutsideClick";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";

const menuVariants = {
  hidden: { opacity: 0, y: -10, scale: 0.98 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.15, ease: "easeOut" },
  },
  exit: {
    opacity: 0,
    y: -10,
    scale: 0.98,
    transition: { duration: 0.15, ease: "easeIn" },
  },
};

const TaskSortMenu = ({ handleSortOptions }) => {
  const localOption = localStorage.getItem("sortOption");
  const [selectedSortOption, setSelectedSortOption] = useState(
    localOption || "default"
  );
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);

  useOutsideClick(menuRef, () => setIsOpen(false));

  const handleOptionClick = (selection) => {
    localStorage.setItem("sortOption", selection);
    const option = selection;
    setSelectedSortOption(option);
    handleSortOptions(option);
  };

  return (
    <div className="relative mb-4 max-w-fit md:max-w-none" ref={menuRef}>
      <button
        className="text-secondary min-w-[160px] flex items-center gap-2 border border-secondary/50 px-4 py-2 rounded-md cursor-pointer hover:bg-secondary/10 transition-colors duration-300"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <MdOutlineSort size={20} />
        <span>Ordenar</span>
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="flex flex-col gap-2 min-w-[160px] mt-4 bg-white p-4 rounded-2xl shadow-md absolute top-8 left-0 z-50"
          >
            <li>
              <button
                className={`grid grid-cols-[min-content_auto] text-sm gap-2 w-full justify-items-start items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-150 ${
                  selectedSortOption === "default"
                    ? "bg-secondary/10 font-medium"
                    : ""
                }`}
                onClick={() => handleOptionClick("default")}
              >
                <MdCheck
                  size={20}
                  className={`${
                    selectedSortOption === "default"
                      ? "text-primary opacity-100"
                      : "opacity-0"
                  }`}
                />
                <span>Padrão</span>
              </button>
            </li>
            <li>
              <button
                className={`grid grid-cols-[min-content_auto] text-sm gap-2 w-full justify-items-start items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-150 ${
                  selectedSortOption === "urgents"
                    ? "bg-secondary/10 font-medium"
                    : ""
                }`}
                onClick={() => handleOptionClick("urgents")}
              >
                <MdCheck
                  size={20}
                  className={`${
                    selectedSortOption === "urgents"
                      ? "text-primary opacity-100"
                      : "opacity-0"
                  }`}
                />
                <span>Urgentes</span>
              </button>
            </li>
            <li>
              <button
                className={`grid grid-cols-[min-content_auto] text-sm gap-2 w-full justify-items-start items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-150 ${
                  selectedSortOption === "recents"
                    ? "bg-secondary/10 font-medium"
                    : ""
                }`}
                onClick={() => handleOptionClick("recents")}
              >
                <MdCheck
                  size={20}
                  className={`${
                    selectedSortOption === "recents"
                      ? "text-primary opacity-100"
                      : "opacity-0"
                  }`}
                />
                <span>Recentes</span>
              </button>
            </li>
            <li>
              <button
                className={`grid grid-cols-[min-content_auto] text-sm gap-2 w-full justify-items-start items-center p-2 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors duration-150 ${
                  selectedSortOption === "a-z"
                    ? "bg-secondary/10 font-medium"
                    : ""
                }`}
                onClick={() => handleOptionClick("a-z")}
              >
                <MdCheck
                  size={20}
                  className={`${
                    selectedSortOption === "a-z"
                      ? "text-primary opacity-100"
                      : "opacity-0"
                  }`}
                />
                <span>De A-Z</span>
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  );
};
TaskSortMenu.propTypes = {
  handleSortOptions: PropTypes.func,
};

export default TaskSortMenu;
