import { useState } from "react";
import { MdClose } from "react-icons/md";
import PropTypes from "prop-types";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";

const GenericError = ({ error }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (!error) return null;

  const isNetworkError = error.includes("Failed to fetch");
  const errorMsg = isNetworkError
    ? "Erro ao carregar, Verifique sua conexão."
    : `Ocorreu um erro inesperado: ${error}.`;

  return (
    isOpen && (
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        exit={{ opacity: 0, y: -50 }}
        className="text-red-700 font-semibold bg-red-100 fixed top-0 left-0 right-0 py-4 px-4 flex justify-center items-center gap-4 shadow-md z-50"
        aria-live="assertive"
        role="alert"
      >
        <p>{errorMsg}</p>
        <button
          onClick={() => window.location.reload()}
          className="text-primary underline cursor-pointer hover:text-blue-900 focus:outline-none focus:ring-2 focus:ring-blue-400 rounded transition-colors duration-200"
        >
          Recarregar a página
        </button>
        <button
          onClick={() => setIsOpen(false)}
          className="absolute top-2 right-2 text-black hover:text-red-600 focus:outline-none focus:ring-2 focus:ring-red-700 rounded transition-colors duration-200 cursor-pointer"
        >
          <MdClose size={20} />
        </button>
      </motion.div>
    )
  );
};

GenericError.propTypes = { error: PropTypes.object.isRequired };

export default GenericError;
