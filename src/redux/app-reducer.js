import { authAPI } from "../api/api";
import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCESS = "INITIALIZED_SUCESS";
const INITIALIZED_FAILED = "INITIALIZED_FAILED";

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
    case INITIALIZED_FAILED:
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

export const initializedFailed = () => ({
  type: INITIALIZED_FAILED,
});

export const initializeApp = () => async (dispatch) => {
  try {
    const response = await authAPI.me();
    if (response.data.resultCode === 0) {
      dispatch(getAuthUserData());
      dispatch(initializedSuccess());
    } else {
      dispatch(initializedFailed());
    }
  } catch (e) {
    dispatch(initializedFailed());
  }
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
