import { connect } from "react-redux";
import { Dispatch } from "redux";

import MyPosts from "./MyPosts";
import { actions } from "../../../redux/profile-reducer";
import { AppStateType } from "../../../redux/redux-store";
import { PostType } from "../../../types/types";

interface MapStateToPropsType {
  posts: Array<PostType>;
  newPostText: string;
}

interface MapDispatchToPropsType {
  addPost: (newPost: string) => void;
}

const mapStateToProps = (state: AppStateType): MapStateToPropsType => {
  return {
    posts: state.profilePage.posts,
    newPostText: state.profilePage.newPostText,
  };
};

const mapDispatchToProps = (dispatch: Dispatch): MapDispatchToPropsType => {
  return {
    addPost: (newPost: string) => {
      dispatch(actions.addPostActionCreator(newPost));
    },
  };
};

const MyPostsContainer = connect<MapStateToPropsType, MapDispatchToPropsType, {}, AppStateType>(
  mapStateToProps,
  mapDispatchToProps
)(MyPosts);

export default MyPostsContainer;
