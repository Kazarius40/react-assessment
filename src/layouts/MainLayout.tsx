import {Outlet} from "react-router-dom";
import {Menu} from "../components/menu/Menu.tsx";
import {authSliceActions} from "../redux/slices/authSlice.ts";
import {useAppDispatch} from "../redux/hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {IUserWithTokens} from "../models/user-with-tokens/IUserWithTokens.ts";

export const MainLayout = () => {
    const dispatch = useAppDispatch();

    // Потрібно мені, щоб при завантаженні сторінки повертало з локального сховища токен, щоб не робити даремно повторну логінацію.
    // Але треба зауважити, що це лише як доступ до основного меню, після любого кліка відбувається повторне переписування токенів в локальному сховищі.
    useEffect(() => {
        const localStorageUser = localStorage.getItem("user");

        if (localStorageUser) {
            const user: IUserWithTokens = JSON.parse(localStorageUser);
            dispatch(authSliceActions.login(user));
        }
    }, [dispatch]);

    return (
        <>
            <Menu/>
            <Outlet/>
        </>
    );
};