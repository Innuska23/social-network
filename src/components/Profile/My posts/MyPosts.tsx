import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import Post from "./Post/Post";
import { Textarea } from "../../common/FormsControl/FormsControl";

import s from "./MyPosts.module.css";

interface PostData {
  id: number;
  message: string;
  likes: number;
}

interface MyPostsProps {
  posts: PostData[];
}

const MyPosts: React.FC<MyPostsProps> = (props) => {
  const [posts, setPosts] = useState<PostData[]>(props.posts);

  let postsElement = posts?.map((p) => {
    return <Post key={p.id} message={p.message} likes={p.likes} />;
  });

  const addPost = (newText: string) => {
    const updatedPosts = [...posts, { id: posts.length + 1, message: newText, likes: 0 }];
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

interface MyFormDataProps {
  addPost: (newText: string) => void;
}

const MyFormData: React.FC<MyFormDataProps> = (props) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, touchedFields },
    trigger,
  } = useForm();

  const onAddPost: SubmitHandler<Record<string, string>> = async (data) => {
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
          {...register("Textarea", {
            required: "Field is required",
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
