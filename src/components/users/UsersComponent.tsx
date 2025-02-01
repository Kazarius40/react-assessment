import {useCallback, useEffect, useState} from "react";
import {Link} from "react-router-dom";
import {IUsers} from "../../models/users/IUsers.ts";
import {IUser} from "../../models/user/IUser.ts";
import {axiosInstance} from "../../services/api.service.ts";
import {refresh} from "../../services/auth.service.ts";

export const UsersComponent = () => {
    const [users, setUsers] = useState<IUser[]>([]);
    const [search, setSearch] = useState("");

    const fetchUsers = useCallback(async (retry = false) => {
        try {
            const {data: {total}} = await axiosInstance.get<IUsers>("/auth/users?limit=1");
            const {data} = await axiosInstance.get<IUsers>("/auth/users?limit=" + total);
            setUsers(data.users);
        } catch {
            if (!retry) {
                await refresh();
                return fetchUsers(true);
            }
        }
    }, []);

    useEffect(() => {
        fetchUsers().catch(error => console.error("Помилка:", error));
    }, [fetchUsers]);

    const filteredUsers = users.filter(({username, id}) =>
        username.toLowerCase().includes(search.toLowerCase()) ||
        id.toString().includes(search)
    );

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