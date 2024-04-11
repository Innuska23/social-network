import { Dispatch } from "redux";

import { usersAPI } from "../api/users-api";
import { UserType } from "../types/types";
import { updateObjectInArray } from "../utils/validators/object-helpers";
import { BaseThunkType, InferActionTypes } from "./redux-store";

let initialState = {
  users: [] as Array<UserType>,
  pageSize: 10,
  totalItemsCount: 0,
  currentPage: 1,
  isFetching: false,
  followingInProgress: [] as Array<number>,
};

type InitialState = typeof initialState

const usersReducer = (state = initialState, action: ActionsType): InitialState => {
  switch (action.type) {
    case "SN/USERS/FOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: true,
        }),
      };
    case "SN/USERS/UNFOLLOW":
      return {
        ...state,
        users: updateObjectInArray(state.users, action.userId, "id", {
          followed: false,
        }),
      };
    case "SN/USERS/SET_USERS": {
      return {
        ...state,
        users: action.users,
      };
    }
    case "SN/USERS/SET_CURRENT_PAGE": {
      return {
        ...state,
        currentPage: action.currentPage,
      };
    }
    case "SN/USERS/SET_TOTAL_USERS_COUNT": {
      return {
        ...state,
        totalItemsCount: action.count,
      };
    }
    case "SN/USERS/TOGGLE_IS_FETCHING": {
      return {
        ...state,
        isFetching: action.isFetching,
      };
    }
    case "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS": {
      return {
        ...state,
        followingInProgress: action.isFetching
          ? [...state.followingInProgress, action.userId]
          : state.followingInProgress.filter((id) => id !== action.userId),
      };
    }
    default:
      return state;
  }
};

type ActionsType = InferActionTypes<typeof actions>

export const actions = {
  followSuccess: (userId: number) => ({ type: "SN/USERS/FOLLOW", userId } as const),
  unfollowSuccess: (userId: number) => ({ type: "SN/USERS/UNFOLLOW", userId } as const),
  setUsers: (users: Array<UserType>) => ({ type: "SN/USERS/SET_USERS", users } as const),
  setCurrentPage: (currentPage: number) => ({
    type: "SN/USERS/SET_CURRENT_PAGE",
    currentPage,
  } as const),
  setTotalItemsCount: (totalItemsCount: number) => ({
    type: "SN/USERS/SET_TOTAL_USERS_COUNT",
    count: totalItemsCount,
  } as const),
  toggleIsFetching: (isFetching: boolean) => ({
    type: "SN/USERS/TOGGLE_IS_FETCHING",
    isFetching,
  } as const),
  toggleIsFollowingProgress: (isFetching: boolean, userId: number) => ({
    type: "SN/USERS/TOGGLE_IS_FOLLOWING_PROGRESS",
    isFetching,
    userId,
  } as const),
}


type DispatchType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType>

export const getUsers = (page: number, pageSize: number): ThunkType => {
  return async (dispatch, getState) => {
    dispatch(actions.toggleIsFetching(true));
    dispatch(actions.setCurrentPage(page));

    let data = await usersAPI.getUsers(page, pageSize);
    dispatch(actions.toggleIsFetching(false));
    dispatch(actions.setUsers(data.items));
    dispatch(actions.setTotalItemsCount(data.totalCount));
  };
};

const _followUnfollowFlow = async (
  dispatch: DispatchType,
  userId: number,
  apiMethod: any,
  actionCreator: (userId: number) => ActionsType
) => {
  dispatch(actions.toggleIsFollowingProgress(true, userId));
  let data = await apiMethod(userId);
  if (data.resultCode === 0) {
    dispatch(actionCreator(userId));
  }
  dispatch(actions.toggleIsFollowingProgress(false, userId));
};

export const follow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.postFollow.bind(usersAPI),
      actions.followSuccess
    );
  };
};

export const unfollow = (userId: number): ThunkType => {
  return async (dispatch) => {
    _followUnfollowFlow(
      dispatch,
      userId,
      usersAPI.deleteFollow.bind(userId),
      actions.unfollowSuccess
    );
  };
};

export default usersReducer;
