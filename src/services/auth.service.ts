import {axiosInstance} from "./api.service.ts";
import {retrieveLocalStorage} from "./storage.helper.ts";
import {ITokensPair} from "../models/tokens/ITokensPair.ts";
import {IUserWithTokens} from "../models/user-with-tokens/IUserWithTokens.ts";

type LoginData = {
    username: string,
    password: string,
    expiresInMins: number,
}

export const login = async (loginData: LoginData): Promise<IUserWithTokens> => {
    const {data: userWithTokens} = await axiosInstance.post<IUserWithTokens>('/auth/login', loginData);
    localStorage.setItem('user', JSON.stringify(userWithTokens));
    return userWithTokens;
}

export const refresh = async () => {
    const iUserWithTokens = retrieveLocalStorage<IUserWithTokens>('user');

    if (!iUserWithTokens) {
        throw new Error("Немає токену в локальному сховищі");
    }

    const { data: { accessToken, refreshToken } } = await axiosInstance.post<ITokensPair>('/auth/refresh', {
        refreshToken: iUserWithTokens.refreshToken,
        expiresInMins: 1
    });

    const updatedUser = { ...iUserWithTokens, accessToken, refreshToken };
    localStorage.setItem('user', JSON.stringify(updatedUser));
};
