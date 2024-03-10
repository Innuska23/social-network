import { ThunkAction } from "redux-thunk";
import { authAPI } from "../api/api";
import { getAuthUserData } from "./auth-reducer";
import { Dispatch } from "redux";
import { AppStateType } from "./redux-store";

const INITIALIZED_SUCESS = "INITIALIZED_SUCESS";
const INITIALIZED_FAILED = "INITIALIZED_FAILED";

export type InitialStateType = {
  initialized: boolean,
}

let initialState: InitialStateType = {
  initialized: false,
};

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
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

type ActionsType = InitializedSuccessActionType | InitializedFailedActionType

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

type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>


export const initializeApp = (): ThunkType => async (dispatch: DispatchType) => {
  try {
    const response = await authAPI.me();
    if (response.resultCode === 0) {
      // @ts-ignore
      await dispatch(getAuthUserData());
      dispatch(initializedSuccess());
    } else {
      dispatch(initializedFailed());
    }
  } catch (e) {
    dispatch(initializedFailed());
  }
};

export default appReducer;
