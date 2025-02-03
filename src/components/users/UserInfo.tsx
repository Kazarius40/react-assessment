import {FC} from "react";
import {IUser} from "../../models/user/IUser.ts";

interface IUserInfoProps {
    user: IUser;
}

export const UserInfo: FC<IUserInfoProps> = ({user}) => {
    return (
        <div>
            <h2>Інформація про користувача</h2>
            <p><strong>Ім'я:</strong> {user.username}</p>
            <p><strong>Фамілія:</strong> {user.lastName}</p>
            <p><strong>Електронна пошта:</strong> {user.email}</p>
            <p><strong>Вік:</strong> {user.age}</p>
            <p><strong>Телефон:</strong> {user.phone}</p>
            <p><strong>Роль:</strong> {user.role}</p>
            <p><strong>Освіта:</strong> {user.university}</p>
        </div>
    );
};