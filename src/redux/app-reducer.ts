import { authAPI } from "../api/api";
import { getAuthUserData } from "./auth-reducer";

const INITIALIZED_SUCESS = "INITIALIZED_SUCESS";
const INITIALIZED_FAILED = "INITIALIZED_FAILED";

export type InitialStateType = {
  initialized: boolean,
}

let initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action: any): InitialStateType => {
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

type InitializedSuccessActionType = {
  type: typeof INITIALIZED_SUCESS
}

type InitializedFailedActionType = {
  type: typeof INITIALIZED_FAILED
}

export const initializedSuccess = (): InitializedSuccessActionType => ({
  type: INITIALIZED_SUCESS,
});

export const initializedFailed = (): InitializedFailedActionType => ({
  type: INITIALIZED_FAILED,
});

export const initializeApp = () => async (dispatch: any) => {
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

export default appReducer;
