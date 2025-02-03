import {IUsers} from "../models/users/IUsers.ts";
import {axiosInstance} from "./api.service.ts";

export const fetchUsersApi = async (): Promise<IUsers> => {
    const {data: initialData} = await axiosInstance.get<IUsers>("/auth/users");
    const total = initialData.total;

    const {data} = await axiosInstance.get<IUsers>("/auth/users", {
        params: {limit: total}
    });

    return {users: data.users, total};
};