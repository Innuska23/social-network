import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
  let postsElement = props.posts?.map((p) => {
    return <Post message={p.message} likes={p.likes} />;
  });

  return (
    <div className={s.postsBlock}>
      <div>
        <h3>My posts</h3>
        <div>
          <div>
            <textarea></textarea>
          </div>
          <div>
            <button>Add post</button>
          </div>
        </div>
      </div>
      <div className={s.posts}>{postsElement}</div>
    </div>
  );
};

export default MyPosts;
