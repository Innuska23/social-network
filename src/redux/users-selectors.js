import { createSelector } from "reselect";

const getUsersPageSelector = (state) => {
  return state.usersPage.users;
};

export const getUsersPage = createSelector(getUsersPageSelector, (users) => {
  return users.filter((u) => true);
});

export const getPageSize = (state) => {
  return state.usersPage.pageSize;
};

export const getTotalUsersCount = (state) => {
  return state.usersPage.totalUsersCount;
};

export const getCurrentPage = (state) => {
  return state.usersPage.currentPage;
};

export const getIsFetching = (state) => {
  return state.usersPage.isFetching;
};

export const getToggleIsFollowingProgress = (state) => {
  return state.usersPage.toggleIsFollowingProgress;
};

export const countSomethingDifficult = (state) => {
  // //for
  // return state.usersPage.toggleIsFollowingProgress;
};