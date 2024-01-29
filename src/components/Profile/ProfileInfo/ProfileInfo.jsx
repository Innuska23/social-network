import Preloader from "../../common/Preloader/Preloader";
import s from "./ProfileInfo.module.css";

const ProfileInfo = (props) => {
  if (!props.profile) {
    return <Preloader />;
  }

  return (
    <div>
      <div>
        <img src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" />
      </div>
      <div className={s.descriptionBlock}>
        {props.profile.aboutMe} <br />
        {props.profile.fullName} <br />
        {props.profile.contacts.facebook}
        <div>
          <img src={props.profile.photos.large} alt="ava" />
        </div>
        ava + description
      </div>
    </div>
  );
};

export default ProfileInfo;
