import PropTypes from "prop-types";

const Spinner = ({ size = "w-6 h-6", color = "border-primary" }) => {
  return (
    <div
      className={` ${size} ${color} rounded-full border-4 border-t-transparent animate-spin`}
    ></div>
  );
};

export default Spinner;

Spinner.propTypes = {
  size: PropTypes.string,
  color: PropTypes.string,
};
