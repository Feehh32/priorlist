import { createContext } from "react";
import PropTypes from "prop-types";

// expected user shape
export const userShape = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string,
  email: PropTypes.string.isRequired,
};

// expected auth context shape
export const authContextShape = {
  user: PropTypes.shape(userShape),
  register: PropTypes.func.isRequired,
  login: PropTypes.func.isRequired,
  logout: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  error: PropTypes.string,
};

export const AuthContext = createContext(null);
