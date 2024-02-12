import {
  applyMiddleware,
  combineReducers,
  compose,
  legacy_createStore,
} from "redux";
import sidebarReducer from "./sidebar-reducer";
import dialogsReducer from "./dialogs-reducer";
import profileReducer from "./profile-reducer";
import usersReducer from "./users-reducer";
import authReducer from "./auth-reducer";
import { thunk as thunkMiddleware } from "redux-thunk";
import appReducer from "./app-reducer";

let reducers = combineReducers({
  profilePage: profileReducer,
  dialogsPage: dialogsReducer,
  sidebar: sidebarReducer,
  usersPage: usersReducer,
  auth: authReducer,
  app: appReducer,
});

const composerEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

let store = legacy_createStore(
  reducers,
  composerEnhancer(applyMiddleware(thunkMiddleware))
);

window.store = store;

export default store;
