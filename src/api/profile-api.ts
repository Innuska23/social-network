import { PhotosType, ProfileType } from "../types/types";
import { ResponseType, ResultCodesEnum, ResultCodesForCaptcha, instance } from "./api";


type GetProfileType = ProfileType

type UpdateStatusType = {
    userId: number
}

type SavePhotoTypes = {
    photos: PhotosType
}

type SaveProfileTypes = {
    data: ProfileType
}

export const profileAPI = {
    getProfile(userId: number) {
        return instance.get<GetProfileType>(`profile/` + userId).then(res => res.data);
    },
    getStatus(userId: number) {
        return instance.get<string>(`profile/status/` + userId).then(res => res.data);
    },
    updateStatus(status: string) {
        try {
            return instance.put<ResponseType<UpdateStatusType, ResultCodesEnum | ResultCodesForCaptcha>>(`profile/status`, { status: status }).then(res => res.data);
        } catch (error) {
        }
    },
    savePhoto(photoFile: any) {
        const formData = new FormData();
        formData.append("image", photoFile);
        return instance.put<ResponseType<SavePhotoTypes, ResultCodesEnum | ResultCodesForCaptcha>>(`profile/photo`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }).then(res => res.data);
    },
    saveProfile(profile: ProfileType) {
        return instance.put<ResponseType<SaveProfileTypes, ResultCodesEnum | ResultCodesForCaptcha>>("profile", profile).then(res => res.data);
    },
};