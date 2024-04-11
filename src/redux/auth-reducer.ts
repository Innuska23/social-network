import { Dispatch } from "redux";

import { BaseThunkType } from './redux-store';
import { ResultCodesEnum, ResultCodesForCaptcha } from "../api/api";
import { InferActionTypes, } from "./redux-store";
import { authAPI } from "../api/auth-api";
import { securityAPI } from "../api/security-api";

let initialState = {
  userId: null as number | null,
  email: null as string | null,
  login: null as string | null,
  isFetching: false as boolean,
  isAuth: false as boolean,
  error: null as string | null,
  captchaUrl: null as string | null,
};

export type InitialStateType = typeof initialState;

type ActionsType = InferActionTypes<typeof actions>

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case "SN/AUTH/SET_USER_DATA":
    case "SN/AUTH/GET_CAPTCHA_URL_SUCCESS":
      return {
        ...state,
        ...action.payload,
        error: null,
      };
    case "SN/AUTH/LOGIN_FAILED":
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

export const actions = {
  setAuthUserData: (userId: number | null, email: string | null, login: string | null, isAuth: boolean) => ({
    type: "SN/AUTH/SET_USER_DATA",
    payload: { userId, email, login, isAuth },
  } as const),
  getCaptchaUrlSuccess: (captchaUrl: string) => ({
    type: "SN/AUTH/GET_CAPTCHA_URL_SUCCESS",
    payload: { captchaUrl },
  } as const),
  loginFailed: (error: string) => ({
    type: "SN/AUTH/LOGIN_FAILED",
    error,
  } as const),
}

type DispatchType = Dispatch<ActionsType>
type ThunkType = BaseThunkType<ActionsType>

export const getAuthUserData = (): ThunkType => async (dispatch) => {
  try {
    const meData = await authAPI.me();
    if (meData.resultCode === ResultCodesEnum.Success) {
      let { id, login, email } = meData.data;
      dispatch(actions.setAuthUserData(id, email, login, true));
    }
  } catch (e) { }
};

export const login =
  (email: string, password: string, rememberMe: boolean, captcha: null | undefined): ThunkType => async (dispatch) => {
    let loginData = await authAPI.login(email, password, rememberMe, captcha);
    if (loginData.resultCode === ResultCodesEnum.Success) {
      dispatch(getAuthUserData());
    } else {
      if (loginData.resultCode === ResultCodesForCaptcha.CaptchaIsRequired) {
        dispatch(getCaptchaUrl());
      }
      dispatch(actions.loginFailed(loginData.messages[0]));
    }
  };

export const getCaptchaUrl = (): ThunkType => async (dispatch: DispatchType) => {
  const getCaptchaUrlData = await securityAPI.getCaptchaUrl();
  const captchaUrl = getCaptchaUrlData.url;
  dispatch(actions.getCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): ThunkType => async (dispatch: DispatchType) => {
  let logoutData = await authAPI.logout();
  if (logoutData.resultCode === 0) {
    dispatch(actions.setAuthUserData(null, null, null, false));
  }
};

export default authReducer;