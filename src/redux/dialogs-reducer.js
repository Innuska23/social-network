const ADD_MESSAGE = "ADD-MESSAGE";

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
    case ADD_MESSAGE:
      let newMessage = action.newMessageText;
      return {
        ...state,
        messages: [...state.messages, { id: 6, message: newMessage }],
      };

    default:
      return state;
  }
};

export const addMessageActionCreator = (newMessageText) => ({
  type: ADD_MESSAGE,
  newMessageText,
});

export default dialogsReducer;
