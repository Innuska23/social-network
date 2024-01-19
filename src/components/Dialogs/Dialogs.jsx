import React from "react";
import DialogItem from "./DialjgItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";

const Dialogs = (props) => {
  let dialogsElement = props.state?.dialogs.map((d) => {
    return <DialogItem name={d.name} id={d.id} />;
  });

  let messagesElements = props.state?.messages.map((m) => {
    return <Message text={m.message} />;
  });

  let newMessageElement = React.createRef();

  let addMessage = (e) => {
    e.preventDefault();
    props.addMessage();
  };

  let onMessageChange = (e) => {
    e.preventDefault();
    let message = newMessageElement.current.value;
    props.updateNewMessageText(message);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElement}</div>
      <div className={s.messages}>
        <textarea
          ref={newMessageElement}
          onChange={onMessageChange}
          value={props.state.newMessageText}
        />
        <button onClick={addMessage}>Add message</button>
        {messagesElements}
      </div>
    </div>
  );
};

export default Dialogs;
