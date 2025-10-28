import PropTypes from "prop-types";

const Spinner = ({ size = "w-6 h-6", color = "primary" }) => {
  return (
    <div
      className={` ${size} border-${color} rounded-full border-4 border-t-transparent animate-spin relative opacity-70`}
      aria-live="polite"
      role="status"
    >
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default Spinner;

Spinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};
