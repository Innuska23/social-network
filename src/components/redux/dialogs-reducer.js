const ADD_MESSAGE = "ADD-MESSAGE";
const UPDATE_NEW_MESSAGE_TEXT = "UPDATE-NEW-MESSAGE-TEXT";

let initialState = {
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How is your it-kamasutra" },
    { id: 3, message: "Yo" },
    { id: 4, message: "Yo" },
    { id: 5, message: "Yo" },
  ],
  newMessageText: "",
  dialogs: [
    { id: 1, name: "Dimych" },
    { id: 2, name: "Andrey" },
    { id: 3, name: "Sveta" },
    { id: 4, name: "Sasha" },
    { id: 5, name: "Victor" },
    { id: 6, name: "Valera" },
  ],
};

const dialogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_NEW_MESSAGE_TEXT:
      return {
        ...state,
        newMessageText: action.newMessage,
      };
    case ADD_MESSAGE:
      let newMessage = state.newMessageText;
      return {
        ...state,
        newMessageText: " ",
        messages: [...state.messages, { id: 6, message: newMessage }],
      };

    default:
      return state;
  }
};

export const addMessageActionCreator = () => ({ type: ADD_MESSAGE });

export const updateNewMessageActionCreator = (message) => ({
  type: UPDATE_NEW_MESSAGE_TEXT,
  newMessage: message,
});

export default dialogsReducer;
