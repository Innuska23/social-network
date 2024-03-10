import { PhotosType, ProfileType, UserType } from './../types/types';
import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    "API-KEY": "0cac80d9-1e05-4909-bef7-f4fd9749bb6d",
  },
});

type GetUsersType = {
  items: Array<UserType>
  totalCount: number
  error: null | string
}

type DeletePostFollowType = {
  data: {
    userId: number
  }
  resultCode: ResultCodesEnum | ResultCodesForCaptcha
  messages: Array<string>
}

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  deleteFollow(userId: number) {
    return instance
      .delete<DeletePostFollowType>(`follow/${userId}`)
      .then((response) => response.data);
  },
  postFollow(userId: number) {
    return instance.post<DeletePostFollowType>(`follow/${userId}`).then((response) => response.data);
  },
};

type GetProfileType = ProfileType

type UpdateStatusType = {
  data: {
    userId: number
  }
  resultCode: ResultCodesEnum | ResultCodesForCaptcha
  messages: Array<string>
}

type SavePhotoTypes = {
  photos: PhotosType
  resultCode: ResultCodesEnum | ResultCodesForCaptcha
  messages: Array<string>
}

type SaveProfileTypes = {
  data: ProfileType
  resultCode: ResultCodesEnum | ResultCodesForCaptcha
  messages: Array<string>
}


export const profileAPI = {
  getProfile(userId: number) {
    return instance.get<GetProfileType>(`profile/` + userId).then(res => res.data);
  },
  getStatus(userId: number) {
    return instance.get<any>(`profile/status/` + userId).then(res => res.data);
  },
  updateStatus(status: string) {
    try {
      return instance.put<UpdateStatusType>(`profile/status`, { status: status }).then(res => res.data);
    } catch (error) {
    }
  },
  savePhoto(photoFile: any) {
    const formData = new FormData();
    formData.append("image", photoFile);
    return instance.put<SavePhotoTypes>(`profile/photo`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }).then(res => res.data);
  },
  saveProfile(profile: ProfileType) {
    return instance.put<SaveProfileTypes>("profile", profile).then(res => res.data);
  },
};

export enum ResultCodesEnum {
  Success = 0,
  Error = 1,
}

export enum ResultCodesForCaptcha {
  CaptchaIsRequired = 10
}

type MeResponseType = {
  data: {
    id: number
    email: string
    login: string
  }
  resultCode: ResultCodesEnum
  messages: Array<string>
}

type LoginResponseType = {
  data: {
    userId: number
  }
  resultCode: ResultCodesEnum | ResultCodesForCaptcha
  messages: Array<string>
}

type LogoutResponseType = {
  data: {
    userId: number
  }
  resultCode: ResultCodesEnum | ResultCodesForCaptcha
  messages: Array<string>
}

export const authAPI = {
  me() {
    return instance.get<MeResponseType>(`auth/me`).then(res => res.data);
  },
  login(email: string, password: string, rememberMe = false, captcha: null | string = null) {
    return instance.post<LoginResponseType>(`auth/login`, {
      email,
      password,
      rememberMe,
      captcha,
    }).then(res => res.data);
  },
  logout() {
    return instance.delete<LogoutResponseType>(`auth/login`).then(res => res.data);
  },
};

type getCaptchaUrlResponseType = {
  url: string
}

export const securityAPI = {
  getCaptchaUrl() {
    return instance.post<getCaptchaUrlResponseType>(`/security/get-captcha-url`).then(res => res.data);
  },
};
