import { ThunkAction } from "redux-thunk";
import { ResultCodesEnum, ResultCodesForCaptcha, authAPI, securityAPI } from "../api/api";
import { Dispatch } from "redux";
import { AppStateType } from "./redux-store";

const SET_USER_DATA = "samurai-network/auth/SET_USER_DATA";
const LOGIN_FAILED = "samurai-network/auth/LOGIN_FAILED";
const GET_CAPTCHA_URL_SUCCESS = "samurai-network/auth/GET_CAPTCHA_URL_SUCCESS";

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

const authReducer = (state = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_USER_DATA:
    case GET_CAPTCHA_URL_SUCCESS:
      return {
        ...state,
        ...action.payload,
        error: null,
      };
    case LOGIN_FAILED:
      return {
        ...state,
        error: action.error,
      };
    default:
      return state;
  }
};

type ActionsType = SetAuthUserDataActionType | GetCaptchaUrlSuccessActionType | LoginFailedActionType

type SetAuthUserDataActionPayloadType = {
  userId: number | null
  email: string | null
  login: string | null
  isAuth: boolean
}

type SetAuthUserDataActionType = {
  type: typeof SET_USER_DATA,
  payload: SetAuthUserDataActionPayloadType
}

export const setAuthUserData = (userId: number | null, email: string | null, login: string | null, isAuth: boolean): SetAuthUserDataActionType => ({
  type: SET_USER_DATA,
  payload: { userId, email, login, isAuth },
});

type GetCaptchaUrlSuccessActionType = {
  type: typeof GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl: string }
}

export const getCaptchaUrlSuccess = (captchaUrl: string): GetCaptchaUrlSuccessActionType => ({
  type: GET_CAPTCHA_URL_SUCCESS,
  payload: { captchaUrl },
});

type LoginFailedActionType = {
  type: typeof LOGIN_FAILED
  error: any
}

export const loginFailed = (error: any): LoginFailedActionType => ({
  type: LOGIN_FAILED,
  error,
});

type DispatchType = Dispatch<ActionsType>
type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>


export const getAuthUserData = (): ThunkType => async (dispatch) => {
  try {
    const meData = await authAPI.me();
    if (meData.resultCode === ResultCodesEnum.Success) {
      let { id, login, email } = meData.data;
      dispatch(setAuthUserData(id, email, login, true));
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
      dispatch(loginFailed(loginData.messages[0]));
    }
  };

export const getCaptchaUrl = (): ThunkType => async (dispatch: DispatchType) => {
  const getCaptchaUrlData = await securityAPI.getCaptchaUrl();
  const captchaUrl = getCaptchaUrlData.url;
  dispatch(getCaptchaUrlSuccess(captchaUrl));
};

export const logout = (): ThunkType => async (dispatch: DispatchType) => {
  let logoutData = await authAPI.logout();
  if (logoutData.resultCode === 0) {
    dispatch(setAuthUserData(null, null, null, false));
  }
};

export default authReducer;