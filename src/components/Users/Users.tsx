import React from "react";
import Paginator from "../common/Paginator/Paginator";
import User from "./User";
import { UserType } from "../../types/types";

type PropsType = {
  currentPage: number
  totalItemsCount: number
  pageSize: number
  onPageChanged: (pageNumber: number) => void
  users: Array <UserType>
  selectedPage?: number
  followingInProgress: Array <number>
  unfollow: (userId: number) => void;
  follow: (userId: number) => void;
}

let Users: React.FC<PropsType> = ({
  currentPage,
  totalItemsCount,
  pageSize,
  onPageChanged,
  users,
  followingInProgress,
  unfollow,
  follow,
  ...props
}) => {
  return (
    <div>
      <Paginator
        currentPage={currentPage}
        onPageChanged={onPageChanged}
        totalItemsCount={totalItemsCount}
        pageSize={pageSize}
      />
      <div>
        {users.map((u) => (
          <User
            user={u}
            key={u.id}
            followingInProgress={followingInProgress}
            unfollow={unfollow}
            follow={follow}
          />
        ))}
      </div>
    </div>
  );
};

export default Users;
