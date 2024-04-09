import React, { useState } from "react";
import { Navigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import DialogItem from "./DialogItem/DialogItem";
import s from "./Dialogs.module.css";
import Message from "./Message/Message";
import { Textarea } from "../common/FormsControl/FormsControl";

const Dialogs = (props) => {
  const [messages, setMessages] = useState(props.dialogsPage.messages);

  let state = props.dialogsPage;

  let dialogsElement = state?.dialogs.map((d) => {
    return <DialogItem name={d.name} key={d.id} id={d.id} />;
  });

  let messagesElements = messages.map((m) => {
    return <Message text={m.message} key={m.id} />;
  });

  if (!props.isAuth) return <Navigate to={"/login"} />;

  const addMessage = (newMessage) => {
    const updatedMessages = [
      ...messages,
      { id: messages.length + 1, message: newMessage },
    ];
    setMessages(updatedMessages);
  };

  return (
    <div className={s.dialogs}>
      <div className={s.dialogsItems}>{dialogsElement}</div>
      <div className={s.messages}>{messagesElements}</div>
      <AddNewMessage addMessage={addMessage} />
    </div>
  );
};

const AddNewMessage = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
    trigger,
  } = useForm();

  const onSubmit = async (data) => {
    await trigger();
    if (Object.keys(errors).length === 0) {
      props.addMessage(data.Textarea);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <Textarea
          {...register("Textarea", {
            required: true,
            maxLength: {
              value: 1000,
              message: "No more than 1000 characters.",
            },
          })}
          placeholder="Enter your message"
          className={errors.Textarea ? s.error : ""}
        />
        {touchedFields.Textarea &&
          errors.Textarea &&
          errors.Textarea.type === "required" && (
            <p className={s.dialogsError}>Textarea is required.</p>
          )}
        {errors.Textarea && errors.Textarea.type === "maxLength" && (
          <p className={s.dialogsError}>No more than 1000 characters.</p>
        )}
      </div>
      <div>
        <button type="submit">Add message</button>
      </div>
    </form>
  );
};

export default Dialogs;
