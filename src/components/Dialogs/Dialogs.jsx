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
  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElement}</div>
      <div className={s.messages}>{messagesElements}</div>
    </div>
  );
};

export default Dialogs;
