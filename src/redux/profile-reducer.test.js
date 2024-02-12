import profileReducer, {
  addPostActionCreator,
  deletePost,
} from "./profile-reducer";

let state = {
  posts: [
    { id: 1, message: "Hi, how are you?", likes: 12 },
    { id: 2, message: "It's my first post", likes: 11 },
  ],
  newPostText: "",
};

it("length of posts should be incremented", () => {
  let action = addPostActionCreator("it-k");

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(3);
});

it("message of new posts should be correct", () => {
  let action = addPostActionCreator("it-k");
  let newState = profileReducer(state, action);
  let newPost = newState.posts.find((post) => post.message === "it-k");
  expect(newPost).toBeTruthy();
  expect(newPost.message).toBe("it-k");
});

it("after deleting length of message should be decrement", () => {
  let action = deletePost(1);

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(1);
});

it("after deleting length shouldn't be decrement if id is incorrect", () => {
  let action = deletePost(1000);

  let newState = profileReducer(state, action);

  expect(newState.posts.length).toBe(2);
});
