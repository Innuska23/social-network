import React from "react";
import DialogItem from "./DialjgItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import {
  addMessageActionCreator,
  updateNewMessageActionCreator,
} from "../redux/state";

const Dialogs = (props) => {
  let dialogsElement = props.state?.dialogs.map((d) => {
    return <DialogItem name={d.name} id={d.id} />;
  });

  let messagesElements = props.state?.messages.map((m) => {
    return <Message text={m.message} />;
  });

  let addMessage = () => {
    props.dispatch(addMessageActionCreator());
  };

  let onMessageChange = (e) => {
    let message = e.target.value;
    props.dispatch(updateNewMessageActionCreator(message));
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElement}</div>
      <div className={s.messages}>
        <div>
          <textarea
            placeholder="Enter your message"
            onChange={onMessageChange}
            value={props.state.newMessageText}
          />
        </div>
        <div>
          <button onClick={addMessage}>Add message</button>
        </div>
        {messagesElements}
      </div>
    </div>
  );
};

export default Dialogs;
