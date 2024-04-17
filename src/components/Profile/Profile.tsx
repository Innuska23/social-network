import React from "react";

import ProfileInfo from "./ProfileInfo/ProfileInfo";
import MyPostsContainer from "./My posts/MyPostsContainer";
import { ProfileType } from "../../types/types";

interface ProfileProps {
  isOwner: boolean,
  profile: ProfileType,
  status: string,
  updateStatus: (status: string) => void,
  savePhoto: (file: File) => void,
  saveProfile: (profile: ProfileType) => Promise<void>,
}

const Profile: React.FC<ProfileProps> = (props) => {
  return (
    <div>
      <ProfileInfo
        isOwner={props.isOwner}
        profile={props.profile}
        status={props.status}
        updateStatus={props.updateStatus}
        savePhoto={props.savePhoto}
        saveProfile={props.saveProfile}
      />
      <MyPostsContainer />
    </div>
  );
};

export default Profile;

