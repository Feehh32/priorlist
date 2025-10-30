import { useState, useContext, useRef, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
// eslint-disable-next-line no-unused-vars
import { motion, AnimatePresence } from "framer-motion";
import { AuthContext } from "../../contexts/AuthContext";
import { MdOutlineLogout } from "react-icons/md";
import { MdOutlineDeleteOutline } from "react-icons/md";
import useOutsideClick from "../../hooks/useOutsideClick";
import ConfirmModal from "../modal/ConfirmModal";

const LogActions = () => {
  const { user, logout } = useContext(AuthContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const menuRef = useRef(null);
  const [showConfirm, setShowConfirm] = useState(false);

  const usernameInitials = user?.name ? user.name[0].toUpperCase() : "?";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  useOutsideClick(menuRef, () => setIsOpen(false));

  const disableAccount = (confirmation) => {
    if (confirmation) {
      console.log("Conta desativada");
      setShowConfirm((prev) => !prev);
      setIsOpen((prev) => !prev);
    } else {
      setShowConfirm((prev) => !prev);
      setIsOpen((prev) => !prev);
      return;
    }
  };

  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        e.stopPropagation();
        setIsOpen(false);
        menuRef.current?.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  if (!user) {
    return (
      <div className="flex gap-2 md:gap-4 items-center">
        <Link
          to="/login"
          className="text-white font-secondary font-semibold px-4 py-2 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary rounded-md"
        >
          Login
        </Link>
        <Link
          to="/register"
          className="text-primary font-semibold bg-white md:px-8 py-2 px-4 rounded-lg shadow-md hover:bg-[#3B82F6] hover:text-white transition-all duration-300 font-secondary text-center md:mt-0 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
        >
          Registrar
        </Link>
      </div>
    );
  }

  return (
    <div className="relative flex items-center gap-4 md:gap-6" ref={menuRef}>
      <p className="hidden md:block text-white font-normal text-sm">
        Bem-vindo, {user.name.split(" ")[0]}
      </p>
      <button
        type="button"
        onClick={() => setIsOpen((prev) => !prev)}
        aria-label={`Abrir menu da conta de ${user.name}`}
        aria-haspopup="true"
        aria-expanded={isOpen}
        className="bg-[#3B82F6] hover:bg-white hover:text-primary transition-colors duration-200 rounded-full w-9 h-9 text-white font-secondary font-semibold flex items-center justify-center focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary cursor-pointer"
      >
        {usernameInitials}
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.ul
            key="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.15 }}
            className="absolute top-12 right-0 z-50 gap-2 bg-white shadow-lg rounded-2xl py-2 w-48 flex flex-col focus:outline-none p-2"
          >
            <li role="none">
              <button
                onClick={handleLogout}
                className="w-full text-left px-4 py-2 text-sm text-gray-800 flex items-center gap-2 hover:bg-gray-100 rounded-md transition-colors duration-200 focus:outline-none focus:bg-gray-100 cursor-pointer"
              >
                <MdOutlineLogout size={18} aria-hidden="true" />
                Sair
              </button>
            </li>
            <li role="none">
              <button
                onClick={() =>
                  setShowConfirm((prev) => {
                    return !prev;
                  })
                }
                className="w-full text-left px-4 py-2 text-sm text-red-600 flex items-center gap-2 hover:bg-red-50 rounded-md transition-colors duration-200 focus:outline-none focus:bg-red-50 cursor-pointer"
              >
                <MdOutlineDeleteOutline size={18} aria-hidden="true" />
                Desativar Conta
              </button>
            </li>
          </motion.ul>
        )}
      </AnimatePresence>
      <ConfirmModal
        isOpen={showConfirm}
        onConfirm={disableAccount}
        title="Desativar Conta"
        message="Tem certeza de que deseja desativar sua conta? Esta ação é irreversível."
        confirmLabel="Sim, desativar"
        cancelLabel="Cancelar"
      />
    </div>
  );
};

export default LogActions;
