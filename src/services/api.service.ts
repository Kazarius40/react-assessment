import axios from "axios";
import {retrieveLocalStorage} from "./storage.helper.ts";
import {IUserWithTokens} from "../models/user-with-tokens/IUserWithTokens.ts";


export const axiosInstance = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {}
})

axiosInstance.interceptors.request.use((requestObject) => {
    const user = retrieveLocalStorage<IUserWithTokens>('user');

    if (user && requestObject.method?.toUpperCase() === 'GET') {
        requestObject.headers.Authorization = 'Bearer ' + user.accessToken;
    }

    return requestObject;
});