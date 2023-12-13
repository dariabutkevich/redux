import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { selectUserEmail } from "../redux/user/selectors";

function Header() {
  const user = useSelector(selectUserEmail);

  return (
    <header className="p-4 flex justify-between items-center">
      {user && <a className="ml-4">Hello, {user}</a>}{" "}
      <nav className="flex gap-4 ml-4">
        <NavLink
          to="/about"
          end={true}
          className="text-gray-800 px-2 py-1  hover:bg-gray-300"
        >
          About
        </NavLink>
        <NavLink
          to="/notes"
          className="text-gray-800 px-2 py-1  hover:bg-gray-300"
        >
          Notes
        </NavLink>
        <NavLink to="/" className="text-gray-800 px-2 py-1  hover:bg-gray-300">
          Log out
        </NavLink>
      </nav>
    </header>
  );
}

export default Header;
