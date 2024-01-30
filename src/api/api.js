import axios from "axios";

const instance = axios.create({
  withCredentials: true,
  baseURL: `https://social-network.samuraijs.com/api/1.0/`,
  headers: {
    "API-KEY": "0cac80d9-1e05-4909-bef7-f4fd9749bb6d",
  },
});

export const usersAPI = {
  getUsers(currentPage = 1, pageSize = 10) {
    return instance
      .get(`users?page=${currentPage}&count=${pageSize}`)
      .then((response) => response.data);
  },
  deleteFollow(u) {
    return instance.delete(`follow/${u.id}`).then((response) => response.data);
  },
  postFollow(u) {
    return instance.post(`follow/${u.id}`).then((response) => response.data);
  },
};

// export const profileAPI = {
//   getProfile(userId) {
//     return instance.get(`profile/` + userId).then((response) => response.data);
//   },
// };

// export const getUsers = (currentPage = 1, pageSize = 10) => {
//   return instance
//     .get(`users?page=${currentPage}&count=${pageSize}`)
//     .then((response) => response.data);
// };

// export const getUsers2 = (currentPage = 1, pageSize = 10) => {
//   return instance
//     .delete(`https://social-network.samuraijs.com/api/1.0/follow/${u.id}`)
//     .then((response) => {
//       if (response.data.resultCode == 0) {
//         props.unfollow(u.id);
//       }
//     });
// };
