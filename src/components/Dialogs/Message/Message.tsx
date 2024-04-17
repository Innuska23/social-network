import s from "../Dialogs.module.css";

type PropsType = {
  message: string,
  text: string
}

const Message: React.FC<PropsType> = (props) => {
  return <div className={s.message}>{props.text}</div>;
};

export default Message;
