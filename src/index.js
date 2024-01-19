import state, { subscribe } from "./components/redux/state";
import "./index.css";

import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import {
  addMessage,
  addPost,
  updateNewMessageText,
  updateNewPostText,
} from "./components/redux/state";
const root = ReactDOM.createRoot(document.getElementById("root"));

let rerenderEntireTree = (state) => {
  root.render(
    <React.StrictMode>
      <App
        state={state}
        addPost={addPost}
        addMessage={addMessage}
        updateNewPostText={updateNewPostText}
        updateNewMessageText={updateNewMessageText}
      />
    </React.StrictMode>
  );
  reportWebVitals();
};

rerenderEntireTree(state);

subscribe(rerenderEntireTree);
