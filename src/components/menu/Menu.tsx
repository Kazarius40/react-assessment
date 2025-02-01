import {Link, useLocation, useNavigate} from "react-router-dom";
import {authSliceActions} from "../../redux/slices/authSlice.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";

export const Menu = () => {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.authorization.user);
    const location = useLocation();
    const navigate = useNavigate();


    const logoutHandler = () => {
        dispatch(authSliceActions.logout());
        localStorage.removeItem("user");
        navigate("/auth");
    };

    return (
        <nav>
            <ul>
                {!user && location.pathname !== "/auth" && (
                    <li><Link to="/auth">Увійти</Link></li>
                )}
                {user && (
                    <>
                        <img src={user.image} alt={user.username}/>
                        <li><Link to="/auth/recipes">Рецепти</Link></li>
                        <li><Link to="/auth/users">Користувачі</Link></li>
                        <button onClick={logoutHandler}>Logout</button>
                    </>
                )}
            </ul>
        </nav>
    );
};