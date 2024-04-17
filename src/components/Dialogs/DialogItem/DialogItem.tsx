import { NavLink } from "react-router-dom";
import React from "react";

import s from "../Dialogs.module.css";

type PropsType = {
  name: string,
  id: number
}

const DialogItem: React.FC<PropsType> = (props) => {
  let path = "/dialogs/" + props.id;
  return (
    <div className={`${s.dialog} ${s.active}`}>
      <NavLink to={path}>{props.name}</NavLink>
    </div>
  );
};

export default DialogItem;
