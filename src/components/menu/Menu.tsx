import {Link, useLocation, useNavigate} from "react-router-dom";
import {authSliceActions} from "../../redux/slices/authSlice.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import "./Menu.css"

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
        <nav className="navbar">
            <ul className="nav-list">
                {!user && location.pathname !== "/auth" && (
                    <li className="center-login">
                        <Link className="login-button" to="/auth">Увійти</Link>
                    </li>
                )}
                {user && (
                    <div  className="user-menu">
                        <img className="user-avatar" src={user.image} alt={user.username}/>
                        <li className="menu-item"><Link to="/auth/recipes">Рецепти</Link></li>
                        <li className="menu-item"><Link to="/auth/users">Користувачі</Link></li>
                        <button className="logout-button" onClick={logoutHandler}>Logout</button>
                    </div>
                )}
            </ul>
        </nav>
    );
};