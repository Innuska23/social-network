import { createSelector } from "reselect";
import { AppStateType } from "./redux-store";

const getUsersPageSelector = (state: AppStateType) => {
  return state.usersPage.users;
};

export const getUsersPage = createSelector(getUsersPageSelector, (users) => {
  return users.filter((u) => true);
});

export const getPageSize = (state: AppStateType) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state: AppStateType) => {
  return state.usersPage.totalItemsCount;
};

export const getCurrentPage = (state: AppStateType) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state: AppStateType) => {
  return state.usersPage.isFetching;
};

export const getToggleIsFollowingProgress = (state: AppStateType) => {
  return state.usersPage.followingInProgress;
};

export const countSomethingDifficult = (state: AppStateType) => {
  // //for
  // return state.usersPage.toggleIsFollowingProgress;
};
