import { profileAPI } from "../api/api";

const ADD_POST = "ADD-POST";
const SET_USER_PROFILE = "SET-USER-PROFILE";
const SET_STATUS = "SET_STATUS";
const DELETE_POST = "DELETE-POST";

let initialState = {
  posts: [
    { id: 1, message: "Hi, how are you?", likes: 12 },
    { id: 2, message: "It's my first post", likes: 11 },
  ],
  profile: null,
  status: "",
  newPostText: "",
};

const profileReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST: {
      let newPost = {
        id: state.posts.length + 1,
        message: action.newPostText,
        likes: 0,
      };
      return {
        ...state,
        posts: [...state.posts, newPost],
        newPostText: "",
      };
    }
    case SET_USER_PROFILE: {
      return {
        ...state,
        profile: action.profile,
      };
    }
    case SET_STATUS: {
      return {
        ...state,
        status: action.status,
      };
    }
    case DELETE_POST: {
      return {
        ...state,
        posts: state.posts.filter((p) => p.id !== action.postId),
      };
    }
    default:
      return state;
  }
};

export const addPostActionCreator = (newPostText) => ({
  type: ADD_POST,
  newPostText,
});

export const setUserProfile = (profile) => ({
  type: SET_USER_PROFILE,
  profile,
});

export const setStatus = (status) => ({
  type: SET_STATUS,
  status,
});

export const deletePost = (postId) => ({ type: DELETE_POST, postId });

export const getUserProfile = (userId) => (dispatch) => {
  profileAPI
    .getProfile(userId)
    .then((response) => {
      dispatch(setUserProfile(response.data));
    })
    .catch((error) => {
      console.error("Error fetching user profile:", error);
    });
};

export const getStatus = (userId) => (dispatch) => {
  profileAPI
    .getStatus(userId)
    .then((response) => {
      dispatch(setStatus(response.data));
    })
    .catch((error) => {
      console.error("Error fetching status:", error);
    });
};

export const updateStatus = (status) => (dispatch) => {
  profileAPI
    .updateStatus(status)
    .then((response) => {
      if (response.data.resultCode === 0) {
        dispatch(setStatus(status));
      } else {
        console.error("Update status request failed:", response.data.error);
      }
    })
    .catch((error) => {
      console.error("Error updating status:", error);
    });
};

export default profileReducer;
