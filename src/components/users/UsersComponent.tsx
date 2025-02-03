import {useState} from "react";
import {Link} from "react-router-dom";
import {IUser} from "../../models/user/IUser.ts";

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
        <>
            <h2>Список користувачів</h2>

            <input
                type="text"
                placeholder="Введіть ім'я користувача"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <ul>
                {filteredUsers.map(user => (
                    <li key={user.id}>
                        <p>
                            <strong>ID:</strong> {user.id}
                        </p>
                        <p>
                            <strong>Ім'я:</strong> {user.username}
                        </p>
                        <p>
                            <strong>Електронна пошта:</strong> {user.email}
                        </p>
                        <Link to={"/auth/users/" + user.id}>Переглянути профіль</Link>
                    </li>
                ))}
            </ul>
        </>
    );
};