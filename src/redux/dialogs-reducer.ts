// import { Dispatch } from "redux";
// import { ThunkAction } from "redux-thunk";
// import { AppStateType } from "./redux-store";

const ADD_MESSAGE = "ADD-MESSAGE";

type MessageType = {
  id: number
  message: string
}

type DialogsType = {
  id: number
  name: string
}

let initialState = {
  messages: [
    { id: 1, message: "Hi" },
    { id: 2, message: "How is your it-kamasutra" },
    { id: 3, message: "Yo" },
    { id: 4, message: "Yo" },
    { id: 5, message: "Yo" },
  ] as Array<MessageType>,
  newMessageText: "" as string,
  dialogs: [
    { id: 1, name: "Dimych" },
    { id: 2, name: "Andrey" },
    { id: 3, name: "Sveta" },
    { id: 4, name: "Sasha" },
    { id: 5, name: "Victor" },
    { id: 6, name: "Valera" },
  ] as Array<DialogsType>,
};

export type InitialStateType = typeof initialState

const dialogsReducer = (state = initialState, action: AddMessageActionCreatorType): InitialStateType => {
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

// type DispatchType = Dispatch<AddMessageActionCreatorType>
// type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, AddMessageActionCreatorType>


type AddMessageActionCreatorType = {
  type: typeof ADD_MESSAGE
  newMessageText: string
}

export const addMessageActionCreator = (newMessageText: string): AddMessageActionCreatorType => ({
  type: ADD_MESSAGE,
  newMessageText,
});

export default dialogsReducer;
