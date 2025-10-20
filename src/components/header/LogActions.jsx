import { useNavigate, Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import { MdOutlineLogout } from "react-icons/md";

const LogActions = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const usernameInitials = user?.name ? user?.name[0].toUpperCase() : "?";

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return user ? (
    <div className="flex gap-4 md:gap-6 items-center">
      <button
        className=" md:hidden bg-clip-padding bg-[#3B82F6] rounded-full w-8 h-8 text-white font-secondary font-semibold flex items-center justify-center"
        onClick={handleLogout}
        aria-label={`Sair da conta de ${user?.name}`}
      >
        {usernameInitials}
      </button>
      <p className="hidden md:block text-white font-normal text-sm ">
        Bem vindo, {user?.name.split(" ")[0]}
      </p>
      <button onClick={handleLogout} className="cursor-pointer flex gap-2">
        <MdOutlineLogout color="white" size={20} />
        <span className="text-white font-normal hidden md:block ">Sair</span>
      </button>
    </div>
  ) : (
    <div className="flex gap-2 md:gap-4 items-center">
      <Link
        to="/login"
        className="text-white font-secondary font-semibold px-4 py-2"
      >
        Login
      </Link>
      <Link
        to="/register"
        className="text-primary font-semibold bg-white md:px-8 py-2 px-4 rounded-lg shadow-md hover:bg-[#3B82F6] hover:text-white transition-all duration-300 font-secondary text-center md:mt-0"
      >
        Registrar
      </Link>
    </div>
  );
};

export default LogActions;
