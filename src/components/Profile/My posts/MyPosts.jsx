import React, { useState } from "react";
import s from "./MyPosts.module.css";
import Post from "./Post/Post";
import { useForm } from "react-hook-form";
import { required } from "../../../utils/validators/validators";
import { Textarea } from "../../common/FormsControl/FormsControl";

const MyPosts = (props) => {
  const [posts, setPosts] = useState(props.posts);

  let postsElement = posts?.map((p) => {
    return <Post key={p.id} message={p.message} likes={p.likes} />;
  });

  const addPost = (newText) => {
    const updatedPosts = [...posts, { id: posts.length + 1, message: newText }];
    setPosts(updatedPosts);
  };

  return (
    <div className={s.postsBlock}>
      <div>
        <h3>My posts</h3>
        <div></div>
      </div>
      <MyFormData addPost={addPost} />
      <div className={s.posts}>{postsElement}</div>
    </div>
  );
};

const MyFormData = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
    trigger,
  } = useForm();

  let onAddPost = async (data) => {
    await trigger();
    if (Object.keys(errors).length === 0) {
      props.addPost(data.Textarea);
      reset();
    }
  };

  return (
    <form onSubmit={handleSubmit(onAddPost)}>
      <div>
        <Textarea
          component={Textarea}
          {...register("Textarea", {
            required: required,
            maxLength: {
              value: 30,
              message: "No more than 30 characters.",
            },
          })}
          className={errors.Textarea ? s.error : ""}
        />
        {touchedFields.Textarea &&
          errors.Textarea &&
          errors.Textarea.type === "required" && (
            <p className={s.postError}>Textarea is required.</p>
          )}
        {errors.Textarea && errors.Textarea.type === "maxLength" && (
          <p className={s.postError}>No more than 30 characters.</p>
        )}
      </div>
      <div>
        <button type="submit">Add post</button>
      </div>
    </form>
  );
};

export default MyPosts;
