import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import DialogItem from "./DialogItem/DialogItem";
import Message from "./Message/Message";
import { Textarea } from "../common/FormsControl/FormsControl";
import { InitialStateType } from "../../redux/dialogs-reducer";

import s from "./Dialogs.module.css";

type OwnPropsType = {
  dialogsPage: InitialStateType;
  onSubmit: (data: FormValues) => void;
};

type FormValues = {
  Textarea: string;
};

const Dialogs: React.FC<OwnPropsType> = (props) => {
  const [messages, setMessages] = useState(props.dialogsPage.messages);

  const state = props.dialogsPage;

  const dialogsElement = state?.dialogs.map((d) => (
    <DialogItem name={d.name} key={d.id} id={d.id} />
  ));

  const messagesElements = messages.map((m) => (
    <Message text={m.message} key={m.id} />
  ));

  const addMessage = (newMessage: string) => {
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

type AddNewMessageProps = {
  addMessage: (newMessage: string) => void;
};

const AddNewMessage: React.FC<AddNewMessageProps> = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
    trigger,
  } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
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
