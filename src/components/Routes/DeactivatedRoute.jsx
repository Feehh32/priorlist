import { useLocation, Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import Spinner from "../UI/spinner";

const DeactivatedRoute = () => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  const wasDeactivated = location.state?.accountWasDeactivated;

  if (loading) return <Spinner size="w-12 h-12" color="primary" />;

  if (user) return <Navigate to="/tasks" replace />;

  if (!wasDeactivated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

export default DeactivatedRoute;
