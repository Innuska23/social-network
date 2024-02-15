import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";
import ProfileStatusWithHooks from "./ProfileStatusWithHooks";
import userPhoto from "../../../assets/images/users.jpeg";

const ProfileInfo = ({ profile, status, updateStatus, isOwner, savePhoto }) => {
  if (!profile) {
    return <Preloader />;
  }

  const onMainPhotoSelected = (e) => {
    if (e.target.files.length) {
      savePhoto(e.target.files[0]);
    }
  };

  return (
    <div>
      <div className={s.descriptionBlock}>
        {profile.aboutMe} <br />
        {profile.fullName} <br />
        {profile.contacts.facebook}
        <div>
          <img
            src={profile.photos.large || userPhoto}
            className={s.mainPhoto}
            alt="ava"
          />
          <br />
          {isOwner && <input type={"file"} onChange={onMainPhotoSelected} />}
        </div>
        <ProfileStatusWithHooks status={status} updateStatus={updateStatus} />
      </div>
    </div>
  );
};

export default ProfileInfo;
