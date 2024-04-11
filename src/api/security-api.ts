import { instance } from "./api";

type getCaptchaUrlResponseType = {
    url: string
}

export const securityAPI = {
    getCaptchaUrl() {
        return instance.post<getCaptchaUrlResponseType>(`/security/get-captcha-url`).then(res => res.data);
    },
};