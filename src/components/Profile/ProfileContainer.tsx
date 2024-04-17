import React, { Component } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { useLocation, useNavigate, useParams, Location } from 'react-router-dom';

import Profile from './Profile';
import { getUserProfile, updateStatus, getStatus, savePhoto, saveProfile } from '../../redux/profile-reducer';
import { AppStateType } from '../../redux/redux-store';
import { ProfileType } from '../../types/types';

type MapStatePropsType = {
  profile: ProfileType | null;
  status: string;
  autorizedUserId: number | null;
  isAuth: boolean;
}

type MapDispatchPropsType = {
  getUserProfile: (userId: number) => void;
  getStatus: (userId: number) => void;
  updateStatus: (status: string) => void;
  savePhoto: (file: File) => void;
  saveProfile: (profile: ProfileType) => Promise<any>;
}

type OwnPropsType = {
  location: Location;
  navigate: (path: string) => void;
  userId: string | undefined;
}

type PropsType = MapStatePropsType & MapDispatchPropsType & OwnPropsType;

class ProfileContainer extends Component<PropsType> {
  refreshProfile() {
    let userId = this.props.userId;
    if (!userId) {
      userId = this.props.autorizedUserId?.toString();
      if (!userId) {
        this.props.navigate('/login');
        return;
      }
    }
    if (!userId) {
      throw new Error("ID should exists in URL or in state ('autorizedUserId)")
    }
    else {
      this.props.getUserProfile(Number(userId));
      this.props.getStatus(Number(userId));
    }
  }

  componentDidMount() {
    this.refreshProfile();
  }

  componentDidUpdate(prevProps: PropsType) {
    if (this.props.userId !== prevProps.userId) {
      this.refreshProfile();
    }
  }

  render() {
    const { profile, status, updateStatus, savePhoto, saveProfile } = this.props;
    return profile ? (
      <div>
        <Profile
          {...this.props}
          isOwner={!this.props.userId}
          profile={profile}
          status={status}
          updateStatus={updateStatus}
          savePhoto={savePhoto}
          saveProfile={saveProfile}
        />
      </div>
    ) : null;
  }
}

const mapStateToProps = (state: AppStateType): MapStatePropsType => ({
  profile: state.profilePage.profile,
  status: state.profilePage.status,
  autorizedUserId: state.auth.userId,
  isAuth: state.auth.isAuth,
});

const withRouter = (Component: React.ComponentType<PropsType>) => {
  return (props: MapStatePropsType & MapDispatchPropsType) => {
    const location = useLocation();
    const navigate = useNavigate();
    const params = useParams();
    return <Component {...props} location={location} navigate={navigate} userId={params.userId} />;
  };
};

export default compose<React.ComponentType<MapStatePropsType & MapDispatchPropsType>>(
  connect(mapStateToProps, {
    getUserProfile,
    getStatus,
    updateStatus,
    savePhoto,
    saveProfile,
  }),
  withRouter
)(ProfileContainer);
