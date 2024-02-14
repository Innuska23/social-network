import React from "react";
import styles from "./users.module.css";
import userPhoto from "../../assets/images/users.jpeg";
import { NavLink } from "react-router-dom";

let User = ({ user, followingInProgress, unfollow, follow }) => {
  return (
    <div>
      <div>
        <NavLink to={"/profile/" + user.id}>
          <img
            alt="photoUser"
            src={user.photos?.small ? user.photos.small : userPhoto}
            className={styles.userPhoto}
          />
        </NavLink>
      </div>
      <div>
        {user.followed ? (
          <button
            disabled={followingInProgress?.some((id) => id === user.id)}
            onClick={() => {
              unfollow(user.id);
            }}
          >
            Unfollow
          </button>
        ) : (
          <button
            disabled={followingInProgress?.some((id) => id === user.id)}
            onClick={() => {
              follow(user.id);
            }}
          >
            Follow
          </button>
        )}
      </div>
      <span>
        <span>
          <div>{user.name}</div>
          <div>{user.status}</div>
        </span>
        <span>
          <div>{"u.location.country"}</div>
          <div>{"u.location.city"}</div>
        </span>
      </span>
    </div>
  );
};

export default User;
