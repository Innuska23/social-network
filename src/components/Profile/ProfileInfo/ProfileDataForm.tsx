import { useForm } from "react-hook-form";
import { useEffect } from "react";

import { Textarea, Input } from "../../common/FormsControl/FormsControl";
import { ContactsType, ProfileType } from "../../../types/types";

import s from "./ProfileInfo.module.css";

export interface ProfileData {
  fullName: string;
  lookingForAJob: boolean;
  lookingForAJobDescription: string;
  aboutMe: string;
  contacts: ContactsType;
}

interface ProfileDataFormProps {
  onSubmit: (formData: ProfileData) => Promise<any>;
  initialValues: ProfileType;
  profile: ProfileType;
  error: string | null;
}

const ProfileDataForm: React.FC<ProfileDataFormProps> = ({
  onSubmit,
  initialValues,
  profile,
  error,
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<ProfileData>();

  useEffect(() => {
    Object.keys(initialValues).forEach((key) => {
      setValue(key as keyof ProfileData, initialValues[key as keyof ProfileData]);
    });
  }, [initialValues, setValue]);

  const handleFormSubmit = (formData: ProfileData) => {
    const profileData: ProfileType = {
      userId: profile.userId,
      aboutMe: formData.aboutMe,
      contacts: formData.contacts,
      fullName: formData.fullName,
      lookingForAJob: formData.lookingForAJob,
      lookingForAJobDescription: formData.lookingForAJobDescription,
      photos: profile.photos,
    };
    onSubmit(profileData);
  };

  const renderContactInputs = () => {
    const contacts = profile.contacts || {};
    return Object.keys(contacts).map((key) => {
      const contactKey = key as keyof ContactsType;
      return (
        <div key={key} className={s.contact}>
          <b>
            {key}:{" "}
            <Input
              {...register(`contacts.${contactKey}`, {
                pattern: {
                  value: /^(ftp|http|https):\/\/[^ "]+$/,
                  message: "Please enter a valid URL",
                },
              })}
              placeholder={key}
            />
          </b>
          {errors.contacts?.[contactKey] && (
            <p className={s.profileError}>
              {errors.contacts[contactKey]?.message}
            </p>
          )}
        </div>
      );
    });
  };

  return (
    <form onSubmit={handleSubmit(handleFormSubmit)}>
      <div>
        <button type="submit">save</button>
      </div>
      <div>
        <b>Full name:</b>{" "}
        <Input {...register("fullName", { required: true })} placeholder="Full name" />
      </div>
      <div>
        <b>Looking for a job:</b>{" "}
        <Input {...register("lookingForAJob")} type="checkbox" />
      </div>
      <div>
        <b>My professional skills:</b>{" "}
        <Textarea {...register("lookingForAJobDescription")} placeholder="My skills" />
      </div>
      <div>
        <b>About me: </b>{" "}
        <Textarea {...register("aboutMe")} placeholder="About me" />
      </div>
      {renderContactInputs()}
    </form>
  );
};

export default ProfileDataForm;