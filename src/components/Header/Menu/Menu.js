import React from "react";
import s from "./Menu.module.scss";
import { MENU } from "./data";
import { NavLink } from "react-router-dom";

const Menu = ({ handleClickLink }) => {
  const handleClick = () => {
    handleClickLink && handleClickLink();
  };
  return (
    <ul className={s.menu}>
      {MENU.map(({ name, href }, index) => (
        <li key={index} onClick={handleClick}>
          <NavLink
            to={href}
            className={({ isActive }) => {
              return isActive ? s.active : null;
            }}
          >
            {name}
          </NavLink>
        </li>
      ))}
    </ul>
  );
};

export default Menu;
