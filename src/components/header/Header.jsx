import LogActions from "./LogActions";
import Menu from "./Menu";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="bg-primary flex justify-between flex-wrap md:flex-nowrap py-4 px-4 md:px-16 items-center gap-4 md:gap-0 md:flex-row shadow-md">
      <Link to="/" className="text-2xl font-semibold text-white font-logo mr-8">
        PriorList
      </Link>
      <Menu />
      <LogActions />
    </header>
  );
};

export default Header;
