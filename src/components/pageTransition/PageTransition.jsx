// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import PropTypes from "prop-types";

const variants = {
  hidden: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
};

const PageTransition = ({ children }) => {
  return (
    <motion.div
      variants={variants}
      initial="hidden"
      animate="enter"
      exit="exit"
      transition={{
        type: "spring",
        stiffness: 100,
        damping: 18,
      }}
      className="w-full h-full"
    >
      {children}
    </motion.div>
  );
};

PageTransition.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageTransition;
