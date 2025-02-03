import {UsersComponent} from "../components/users/UsersComponent.tsx";
import {useCallback, useEffect, useState} from "react";
import {useAppSelector} from "../redux/hooks/useAppSelector.ts";
import {IUser} from "../models/user/IUser.ts";
import {useDispatch} from "react-redux";
import {fetchUsersApi} from "../services/users.service.ts";
import {paginationSlice} from "../redux/slices/paginationSlice.ts";
import {refresh} from "../services/auth.service.ts";
import {PaginationComponent} from "../components/pagination/PaginationComponent.tsx";
import {useLocation} from "react-router-dom";

export const UsersPage = () => {
    const {limit, page} = useAppSelector(state => state.pagination);
    const [users, setUsers] = useState<IUser[]>([]);
    const [allUsers, setAllUsers] = useState<IUser[]>([]);
    const dispatch = useDispatch();
    const location = useLocation();

    const fetchAllUsers = useCallback(async () => {
        const localStorageUsers = localStorage.getItem("allUsers");

        if (localStorageUsers) {
            const parsedUsers = JSON.parse(localStorageUsers);
            setAllUsers(parsedUsers);
            dispatch(paginationSlice.actions.setTotal(parsedUsers.length));
        } else {
            try {
                const data = await fetchUsersApi();

                if (JSON.stringify(data.users) !== localStorageUsers) {
                    localStorage.setItem("allUsers", JSON.stringify(data.users));
                    setAllUsers(data.users);
                    dispatch(paginationSlice.actions.setTotal(data.total));
                }
            } catch {
                await refresh();
                return fetchAllUsers();
            }
        }
    }, [dispatch]);

    const fetchUsers = useCallback(() => {
        const firstIndex = (page - 1) * limit;
        const lastIndex = firstIndex + limit;
        setUsers(allUsers.slice(firstIndex, lastIndex));
    }, [allUsers, limit, page]);

    useEffect(() => {
        if (location.pathname.includes("auth/users")) {
            dispatch(paginationSlice.actions.setPage(1));
        }
        fetchAllUsers().catch(console.error);
    }, [fetchAllUsers, dispatch, location]);

    useEffect(() => {
        fetchUsers();
    }, [fetchUsers]);

    return (
        <>
            <PaginationComponent/>
            <UsersComponent users={users} allUsers={allUsers}/>
        </>
    );
};