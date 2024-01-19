import React from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";

const MyPosts = (props) => {
  let postsElement = props.posts?.map((p) => {
    return <Post message={p.message} likes={p.likes} />;
  });

  let newPostElement = React.createRef();

  let addPost = (e) => {
    // e.preventDefault();
    props.addPost();
  };

  let onPostChange = (e) => {
    // e.preventDefault();
    let text = newPostElement.current.value;
    props.updateNewPostText(text);
  };

  return (
    <div className={s.postsBlock}>
      <div>
        <h3>My posts</h3>
        <div>
          <div>
            <textarea
              ref={newPostElement}
              onChange={onPostChange}
              value={props.newPostText}
            />
          </div>
          <div>
            <button onClick={addPost}> Add post</button>
          </div>
        </div>
      </div>
      <div className={s.posts}>{postsElement}</div>
    </div>
  );
};

export default MyPosts;
