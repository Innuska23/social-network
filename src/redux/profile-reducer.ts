import { Dispatch } from "redux";

import { ResultCodesEnum } from "../api/api";
import { PhotosType, PostType, ProfileType } from "../types/types";
import { BaseThunkType, InferActionTypes } from "./redux-store";
import { profileAPI } from "../api/profile-api";

const initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likes: 12 },
    { id: 2, message: "It's my first post", likes: 11 },
  ] as Array<PostType>,
  profile: null as ProfileType | null,
  status: "",
  newPostText: "",
};

export type InitialStateType = typeof initialState

type ActionsType = InferActionTypes<typeof actions>

const profileReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SN/PROFILE/ADD_POST":
      const newPost = {
        id: state.posts.length + 1,
        message: action.newPostText,
        likes: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };

    case "SN/PROFILE/SET_USER_PROFILE":
      return {
        ...state,
        profile: action.profile,
      };

    case "SN/PROFILE/SET_STATUS":
      return {
        ...state,
        status: action.status,
      };

    case "SN/PROFILE/DELETE_POST":
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.postId),
      };

    case "SN/PROFILE/SAVE_PHOTO_SUCCESS":
      return {
        ...state,
        profile: {
          ...state.profile,
          photos: action.photos,
        } as ProfileType,
      };

    default:
      return state;
  }
};

export const actions = {
  addPostActionCreator: (newPostText: string) => ({
    type: "SN/PROFILE/ADD_POST",
    newPostText,
  } as const),
  setUserProfile: (profile: ProfileType) => ({
    type: "SN/PROFILE/SET_USER_PROFILE",
    profile,
  } as const),
  setStatus: (status: string) => ({
    type: "SN/PROFILE/SET_STATUS",
    status,
  } as const),
  deletePost: (postId: number) => ({
    type: "SN/PROFILE/DELETE_POST",
    postId,
  } as const),
  savePhotoSuccess: (photos: PhotosType) => ({
    type: "SN/PROFILE/SAVE_PHOTO_SUCCESS",
    photos,
  } as const),
  saveProfileFailed: (error: string) => ({
    type: "SN/PROFILE/ERROR_SAVING_PROFILE",
    error,
  } as const),
}

type DispatchType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType>


export const getUserProfile = (userId: number): ThunkType => async (dispatch: DispatchType, getState) => {
  try {
    const responseProfile = await profileAPI.getProfile(userId);
    dispatch(actions.setUserProfile(responseProfile));
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

export const getStatus = (userId: number): ThunkType => async (dispatch: DispatchType) => {
  try {
    const responseStatus = await profileAPI.getStatus(userId);
    dispatch(actions.setStatus(responseStatus));
  } catch (error) {
    console.error("Error fetching status:", error);
  }
};

export const updateStatus = (status: string): ThunkType => async (dispatch: DispatchType) => {
  try {
    const response = await profileAPI.updateStatus(status);
    // @ts-ignore
    if (response.data.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.setStatus(status));
    }
  } catch (error) {
    console.error("Error updating status:", error);
  }
};

export const savePhoto = (file: File): ThunkType => async (dispatch: DispatchType) => {
  try {
    const responsePhoto = await profileAPI.savePhoto(file);
    if (responsePhoto.resultCode === ResultCodesEnum.Success) {
      dispatch(actions.savePhotoSuccess(responsePhoto.photos));
    }
  } catch (error) {
    console.error("Error saving photo:", error);
  }
};

export const saveProfile = (profile: ProfileType): ThunkType => async (
  dispatch: DispatchType,
  getState,
) => {
  const userId = getState().auth.userId;
  try {
    const responseProfile = await profileAPI.saveProfile(profile);
    if (responseProfile.resultCode === ResultCodesEnum.Success) {
      // @ts-ignore
      dispatch(getUserProfile(userId));
    } else {
      dispatch(actions.saveProfileFailed(responseProfile.messages[0]));
      console.error("Error saving profile:", responseProfile.messages[0]);
    }
  } catch (error: any) {
    dispatch(actions.saveProfileFailed(error.message));
    console.error("Error saving profile:", error);
  }
};

export default profileReducer;
