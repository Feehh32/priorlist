import Menu from "./Menu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-primary flex justify-between flex-wrap md:flex-nowrap py-4 px-4 md:px-8 items-center gap-4 md:gap-0 md:flex-row">
      <Link to="/" className="text-2xl font-semibold text-white font-logo mr-8">
        PriorList
      </Link>
      <Menu />
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
    </header>
  );
};

export default Header;
