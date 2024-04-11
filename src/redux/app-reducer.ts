import { Dispatch } from "redux";

import { authAPI } from "../api/auth-api";
import { getAuthUserData } from "./auth-reducer";
import { BaseThunkType, InferActionTypes } from "./redux-store";

let initialState = {
  initialized: false,
};

export type InitialStateType = typeof initialState;

type ActionsType = InferActionTypes<typeof actions>

const appReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SN/APP/INITIALIZED_SUCESS":
      return {
        ...state,
        initialized: true,
      };
    case "SN/APP/INITIALIZED_FAILED":
      return {
        ...state,
        initialized: true,
      };
    default:
      return state;
  }
};


export const actions = {
  initializedSuccess: () => ({
    type: "SN/APP/INITIALIZED_SUCESS",
  } as const),
  initializedFailed: () => ({
    type: "SN/APP/INITIALIZED_FAILED",
  } as const)
}

type DispatchType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType>

export const initializeApp = (): ThunkType => async (dispatch: DispatchType) => {
  try {
    const response = await authAPI.me();
    if (response.resultCode === 0) {
      // @ts-ignore
      await dispatch(getAuthUserData());
      dispatch(actions.initializedSuccess());
    } else {
      dispatch(actions.initializedFailed());
    }
  } catch (e) {
    dispatch(actions.initializedFailed());
  }
};

export default appReducer;
