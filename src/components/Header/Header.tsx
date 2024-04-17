import React from "react";
import { NavLink, useNavigate } from "react-router-dom";

import s from "./Header.module.css";

export type HeaderPropsType = {
  isAuth: boolean,
  login: string | null;
}

export type DispatchPropsType = {
  logout: () => void,
}

const Header: React.FC<HeaderPropsType & DispatchPropsType> = (props) => {
  const navigate = useNavigate();
  const handleLogoutClick = async () => {
    await props.logout();
    navigate("/login");
  };
  return (
    <header className={s.header}>
      <img
        src="https://play-lh.googleusercontent.com/ahJtMe0vfOlAu1XJVQ6rcaGrQBgtrEZQefHy7SXB7jpijKhu1Kkox90XDuH8RmcBOXNn"
        alt="header"
      />
      <div className={s.loginBlock}>
        {props.isAuth ? (
          <div>
            {props.login} - <button onClick={handleLogoutClick}>log out</button>
          </div>
        ) : (
          <NavLink to={"/login"}>Login</NavLink>
        )}
      </div>
    </header>
  );
};

export default Header;
