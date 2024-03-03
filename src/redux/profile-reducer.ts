import { profileAPI } from "../api/api";
import { PhotosType, PostType, ProfileType } from "../types/types";

const ADD_POST = "profile/ADD_POST";
const SET_USER_PROFILE = "profile/SET_USER_PROFILE";
const SET_STATUS = "profile/SET_STATUS";
const DELETE_POST = "profile/DELETE_POST";
const SAVE_PHOTO_SUCCESS = "profile/SAVE_PHOTO_SUCCESS";
const ERROR_SAVING_PROFILE = "profile/ERROR_SAVING_PROFILE";



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

const profileReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case ADD_POST:
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

    case SET_USER_PROFILE:
      return {
        ...state,
        profile: action.profile,
      };

    case SET_STATUS:
      return {
        ...state,
        status: action.status,
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter((post) => post.id !== action.postId),
      };

    case SAVE_PHOTO_SUCCESS:
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

type AddPostActionCreatorType = {
  type: typeof ADD_POST
  newPostText: string
}

export const addPostActionCreator = (newPostText: string): AddPostActionCreatorType => ({
  type: ADD_POST,
  newPostText,
});

type SetUserProfileActionType = {
  type: typeof SET_USER_PROFILE
  profile: ProfileType
}

export const setUserProfile = (profile: ProfileType): SetUserProfileActionType => ({
  type: SET_USER_PROFILE,
  profile,
});

type SetStatusActionType = {
  type: typeof SET_STATUS
  status: string
}

export const setStatus = (status: string): SetStatusActionType => ({
  type: SET_STATUS,
  status,
});

type DeletePostActionType = {
  type: typeof DELETE_POST
  postId: number
}

export const deletePost = (postId: number): DeletePostActionType => ({
  type: DELETE_POST,
  postId,
});

type SavePhotoSuccessActionType = {
  type: typeof SAVE_PHOTO_SUCCESS
  photos: PhotosType
}

export const savePhotoSuccess = (photos: PhotosType): SavePhotoSuccessActionType => ({
  type: SAVE_PHOTO_SUCCESS,
  photos,
});

type SaveProfileFailedActionType = {
  type: typeof ERROR_SAVING_PROFILE
  error: string
}

export const saveProfileFailed = (error: string): SaveProfileFailedActionType => ({
  type: ERROR_SAVING_PROFILE,
  error,
});

export const getUserProfile = (userId: number) => async (dispatch: any) => {
  try {
    const response = await profileAPI.getProfile(userId);
    dispatch(setUserProfile(response.data));
  } catch (error) {
    console.error("Error fetching user profile:", error);
  }
};

export const getStatus = (userId: number) => async (dispatch: any) => {
  try {
    const response = await profileAPI.getStatus(userId);
    dispatch(setStatus(response.data));
  } catch (error) {
    console.error("Error fetching status:", error);
  }
};

export const updateStatus = (status: string) => async (dispatch: any) => {
  try {
    const response = await profileAPI.updateStatus(status);
    // @ts-ignore
    if (response.data.resultCode === 0) {
      dispatch(setStatus(status));
    }
  } catch (error: any) {
    console.error("Error updating status:", error);
  }
};

export const savePhoto = (file: any) => async (dispatch: any) => {
  try {
    const response = await profileAPI.savePhoto(file);
    if (response.data.resultCode === 0) {
      dispatch(savePhotoSuccess(response.data.data.photos));
    }
  } catch (error) {
    console.error("Error saving photo:", error);
  }
};

export const saveProfile = (profile: ProfileType) => async (dispatch: any, getState: any) => {
  const userId = getState().auth.userId;
  try {
    const response = await profileAPI.saveProfile(profile);
    if (response.data.resultCode === 0) {
      dispatch(getUserProfile(userId));
    } else {
      dispatch(saveProfileFailed(response.data.messages[0]));
      console.error("Error saving profile:", response.data.messages[0]);
    }
  } catch (error: any) {
    dispatch(saveProfileFailed(error.message));
    console.error("Error saving profile:", error);
  }
};

export default profileReducer;
