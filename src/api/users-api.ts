import { UserType } from "../types/types";
import { ResponseType, ResultCodesEnum, ResultCodesForCaptcha, instance } from "./api";

type GetUsersType = {
    items: Array<UserType>
    totalCount: number
    error: null | string
}

type DeletePostFollowType = {
    userId: number
}

export const usersAPI = {
    getUsers(currentPage = 1, pageSize = 10) {
        return instance
            .get<GetUsersType>(`users?page=${currentPage}&count=${pageSize}`)
            .then((response) => response.data);
    },
    deleteFollow(userId: number) {
        return instance
            .delete<ResponseType<DeletePostFollowType, ResultCodesEnum | ResultCodesForCaptcha>>(`follow/${userId}`)
            .then((response) => response.data);
    },
    postFollow(userId: number) {
        return instance.post<ResponseType<DeletePostFollowType, ResultCodesEnum | ResultCodesForCaptcha>>(`follow/${userId}`).then((response) => response.data);
    },
};