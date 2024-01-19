let rerenderEntireTree = () => {
  console.log("State was changed");
};
let state = {
  profilePages: {
    posts: [
      { id: 1, message: "Hi, how are you?", likes: 12 },
      { id: 2, message: "It's my first post", likes: 11 },
    ],
    newPostText: "it-kamasutra.com",
  },
  dialogsPage: {
    messages: [
      { id: 1, message: "Hi" },
      { id: 2, message: "How is your it-kamasutra" },
      { id: 3, message: "Yo" },
      { id: 4, message: "Yo" },
      { id: 5, message: "Yo" },
    ],
    newMessageText: "Yo",
    dialogs: [
      { id: 1, name: "Dimych" },
      { id: 2, name: "Andrey" },
      { id: 3, name: "Sveta" },
      { id: 4, name: "Sasha" },
      { id: 5, name: "Victor" },
      { id: 6, name: "Valera" },
    ],
  },
};

window.state = state;

export const addPost = () => {
  let newPost = {
    id: 5,
    message: state.profilePages.newPostText,
    likes: 0,
  };
  state.profilePages.posts.push(newPost);
  state.profilePages.newPostText = "";
  rerenderEntireTree(state);
};

export const updateNewPostText = (newText) => {
  state.profilePages.newPostText = newText;
  rerenderEntireTree(state);
};

export const addMessage = () => {
  let newMessage = { id: 6, message: state.dialogsPage.newMessageText };
  state.dialogsPage.messages.push(newMessage);
  state.dialogsPage.newMessageText = "";
  rerenderEntireTree(state);
};

export const updateNewMessageText = (newMessage) => {
  state.dialogsPage.newMessageText = newMessage;
  rerenderEntireTree(state);
};

export const subscribe = (observer) => {
  rerenderEntireTree = observer;
};

export default state;
