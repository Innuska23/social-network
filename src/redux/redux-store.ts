import {
  Action,
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from "redux";
import { ThunkAction, thunk as thunkMiddleware } from "redux-thunk";

import sidebarReducer from "./sidebar-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import appReducer from "./app-reducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
});

type ReducersType = typeof reducers

export type AppStateType = ReturnType<ReducersType>

export type InferActionTypes<T> = T extends { [key: string]: (...args: any[]) => infer U } ? U : never

export type BaseThunkType<A extends Action> = ThunkAction<Promise<void>, AppStateType, unknown, A>

// @ts-ignore
const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

let store = legacy_createStore(
  reducers,
  composerEnhancer(applyMiddleware(thunkMiddleware))
);
// @ts-ignore
window.__store__ = store

export default store
