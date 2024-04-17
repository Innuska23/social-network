import React from "react";
import s from "./Post.module.css";

interface PostProps {
  message: string;
  likes: number;
}

const Post: React.FC<PostProps> = (props) => {
  return (
    <div className={s.item}>
      <img src="https://w7.pngwing.com/pngs/340/946/png-transparent-avatar-user-computer-icons-software-developer-avatar-child-face-heroes-thumbnail.png" alt="User Avatar" />
      {props.message}
      <div>
        <span>like : {props.likes}</span>
      </div>
    </div>
  );
};

export default Post;
