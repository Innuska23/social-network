import React from "react";
import Users from "./Users";
import { connect } from "react-redux";
import {
  follow,
  setCurrentPage,
  unfollow,
  toggleIsFollowingProgress,
  getUsers,
} from "../../redux/users-reducer";
import Preloader from "../common/Preloader/Preloader";
// import { withAuthRedirect } from "../hoc/withAuthRedirect";
import { compose } from "redux";
import {
  getUsersPage,
  getPageSize,
  getTotalUsersCount,
  getCurrentPage,
  getIsFetching,
  getToggleIsFollowingProgress,
} from "../../redux/users-selectors";

class UsersContainer extends React.Component {
  componentDidMount() {
    this.props.getUsers(this.props.currentPage, this.props.pageSize);
  }

  onPageChanged = (pageNumber) => {
    this.props.setCurrentPage(pageNumber);
    this.props.getUsers(pageNumber, this.props.pageSize);
  };

  render() {
    return (
      <>
        {this.props.isFetching ? <Preloader /> : null}
        <Users
          totalUsersCount={this.props.totalUsersCount}
          pageSize={this.props.pageSize}
          currentPage={this.props.currentPage}
          selectedPage={this.props.selectedPage}
          onPageChanged={this.onPageChanged}
          users={this.props.users}
          unfollow={this.props.unfollow}
          follow={this.props.follow}
          followingInProgress={this.props.followingInProgress}
        />
      </>
    );
  }
}

// let mapStateToProps = (state) => {
//   return {
//     users: state.usersPage.users,
//     pageSize: state.usersPage.pageSize,
//     totalUsersCount: state.usersPage.totalUsersCount,
//     currentPage: state.usersPage.currentPage,
//     isFetching: state.usersPage.isFetching,
//     followingInProgress: state.usersPage.toggleIsFollowingProgress,
//   };
// };

let mapStateToProps = (state) => {
  return {
    users: getUsersPage(state),
    pageSize: getPageSize(state),
    totalUsersCount: getTotalUsersCount(state),
    currentPage: getCurrentPage(state),
    isFetching: getIsFetching(state),
    followingInProgress: getToggleIsFollowingProgress(state),
  };
};

export default compose(
  // withAuthRedirect,
  connect(mapStateToProps, {
    follow,
    unfollow,
    setCurrentPage,
    toggleIsFollowingProgress,
    getUsers,
  })
)(UsersContainer);
