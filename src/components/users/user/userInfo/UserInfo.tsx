import {FC} from "react";
import {IUser} from "../../../../models/user/IUser.ts";
import "./UserInfo.css"

interface IUserInfoProps {
    user: IUser;
}

export const UserInfo: FC<IUserInfoProps> = ({user}) => {
    return (
        <div className="user-info-container">
            <h2 className="user-info-title">Інформація про користувача</h2>
            <p className="user-info-item"><strong>Ім'я:</strong> {user.username}</p>
            <p className="user-info-item"><strong>Фамілія:</strong> {user.lastName}</p>
            <p className="user-info-item"><strong>Електронна пошта:</strong> {user.email}</p>
            <p className="user-info-item"><strong>Вік:</strong> {user.age}</p>
            <p className="user-info-item"><strong>Телефон:</strong> {user.phone}</p>
            <p className="user-info-item"><strong>Роль:</strong> {user.role}</p>
            <p className="user-info-item"><strong>Освіта:</strong> {user.university}</p>
        </div>
    );
};