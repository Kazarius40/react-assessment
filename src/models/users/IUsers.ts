import {IUser} from "../user/IUser.ts";

export interface IUsers {
    users: IUser[];
    total: number;
    skip: number;
    limit: number;
}