import {useState} from "react";
import {Link} from "react-router-dom";
import {IUser} from "../../../models/user/IUser.ts";
import "./UsersComponent.css"

interface UsersComponentProps {
    users: IUser[];
    allUsers: IUser[];
}

export const UsersComponent = ({users, allUsers}: UsersComponentProps) => {
    const [search, setSearch] = useState("");

    const filteredUsers = search
        ? allUsers.filter(({username, id}) =>
            username.toLowerCase().includes(search.toLowerCase()) ||
            id.toString().includes(search)
        )
        : users;

    return (
        <div className="users-container">
            <h2 className="users-title">Список користувачів</h2>

            <input
                className="users-search"
                type="text"
                placeholder="Введіть ім'я користувача"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <ul className="users-list">
                {filteredUsers.map(user => (
                    <li className="user-item" key={user.id}>
                        <p className="user-id">
                            <strong>ID:</strong> {user.id}
                        </p>
                        <p className="user-name">
                            <strong>Ім'я:</strong> {user.username}
                        </p>
                        <p className="user-email">
                            <strong>Електронна пошта:</strong> {user.email}
                        </p>
                        <Link className="user-link" to={"/auth/users/" + user.id}>Переглянути профіль</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};