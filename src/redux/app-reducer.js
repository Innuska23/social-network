import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCESS = "INITIALIZED_SUCESS";

let initialState = {
  initialized: null,
};

const appReducer = (state = initialState, action) => {
  switch (action.type) {
    case INITIALIZED_SUCESS:
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};

export const initializedSuccess = () => ({
  type: INITIALIZED_SUCESS,
});

export const initializeApp = () => (dispatch) => {
  let promise = dispatch(getAuthUserData());
  // dispatch(somethingelse())
  // dispatch(somethingelse())
  promise.then(() => {
    dispatch(initializedSuccess());
  });
};

// export const login = (email, password, rememberMe) => (dispatch) => {
//   authAPI.login(email, password, rememberMe).then((response) => {
//     if (response.data.resultCode === 0) {
//       dispatch(getAuthUserData());
//     } else {
//       dispatch(loginFailed(response.data.messages[0]));
//     }
//   });
// };

// export const logout = () => (dispatch) => {
//   authAPI.logout().then((response) => {
//     if (response.data.resultCode === 0) {
//       dispatch(setAuthUserData(null, null, null, false));
//     }
//   });
// };

export default appReducer;
