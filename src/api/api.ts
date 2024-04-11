import axios from "axios";
import { PhotosType } from "../types/types";

export const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    "API-KEY": "0cac80d9-1e05-4909-bef7-f4fd9749bb6d",
  },
});

export type ResponseType<D = {}, RC = ResultCodesEnum> = {
  data: D
  messages: Array<string>
  resultCode: RC
  photos: PhotosType
}

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodesForCaptcha {
  CaptchaIsRequired = 10
}



