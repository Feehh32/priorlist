import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
const Menu = () => {
  return (
    <nav className="md:w-auto w-full mt-4 md:mt-0 order-2 md:order-0">
      <ul className="flex font-secondary justify-center font-semibold text-white  md:gap-4 gap-2 bg-[#1f56ce] md:bg-transparent w-full py-2 px-4">
        <li className="relative">
          <NavLink
            to="/tasks"
            className={({ isActive }) =>
              `px-4 py-2 after:absolute after:content-[''] after:bg-white after:block after:w-[60%] after:h-[1.5px] after:mt-[1px] after:mx-auto after:translate-x-0 ${
                isActive
                  ? "after:scale-100 after:translate-x-1/3"
                  : "after:scale-0"
              } hover:after:scale-100 hover:after:translate-x-1/3 hover:after:transition-all hover:after:duration-300`
            }
          >
            Tarefas
          </NavLink>
        </li>
        <li className="relative">
          <NavLink
            to="/about"
            className={({ isActive }) =>
              `px-4 py-2 after:absolute after:content-[''] after:bg-white after:block after:w-[60%] after:h-[1.5px] after:mt-[1px] after:mx-auto after:translate-x-0 ${
                isActive
                  ? "after:scale-100 after:translate-x-1/3"
                  : "after:scale-0"
              } hover:after:scale-100 hover:after:translate-x-1/3 hover:after:transition-all hover:after:duration-300`
            }
          >
            Sobre
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

export default Menu;
