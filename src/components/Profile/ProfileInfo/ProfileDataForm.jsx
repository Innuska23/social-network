import { useForm } from "react-hook-form";
import Textarea, { Input } from "../../common/FormsControl/FormsControl";
import { useEffect } from "react";
import s from "./ProfileInfo.module.css";

const ProfileDataForm = ({ onSubmit, initialValues, profile, error }) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    Object.keys(initialValues).forEach((key) => {
      setValue(key, initialValues[key]);
    });
  }, [initialValues, setValue]);

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <button type="submit">save</button>
      </div>
      <div>
        <b>Full name:</b>{" "}
        <Input
          {...register("fullName", { required: true })}
          placeholder="Full name"
        />
      </div>
      <div>
        <b>Looking for a job:</b>{" "}
        <Input {...register("lookingForAJob")} type="checkbox" />
      </div>
      <div>
        <b>My professional skills:</b>{" "}
        <Textarea
          {...register("lookingForAJobDescription")}
          placeholder="My skills"
        />
      </div>
      <div>
        <b>About me: </b>{" "}
        <Textarea {...register("aboutMe")} placeholder="About me" />
      </div>
      {profile.contacts && (
        <div>
          <b>Contacts: </b>
          {Object.keys(profile.contacts).map((key) => {
            return (
              <div key={key} className={s.contact}>
                <b>
                  {key}:
                  <Input
                    {...register(`contacts.${key}`, {
                      pattern: {
                        value: /^(ftp|http|https):\/\/[^ "]+$/,
                        message: "Please enter a valid URL",
                      },
                    })}
                    placeholder={key}
                  />
                </b>
                {errors.contacts && errors.contacts[key] && (
                  <p className={s.profileError}>
                    {errors.contacts[key].message}
                  </p>
                )}
              </div>
            );
          })}
        </div>
      )}
    </form>
  );
};

export default ProfileDataForm;
