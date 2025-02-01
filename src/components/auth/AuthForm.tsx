import {useForm} from "react-hook-form";
import {IAuthForm} from "../../models/authorization/IAuthForm.ts";
import {useNavigate} from "react-router-dom";
import {authSliceActions} from "../../redux/slices/authSlice.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {joiResolver} from "@hookform/resolvers/joi";
import userAuthValidator from "../../validators/auth.validator.ts";
import {login} from "../../services/auth.service.ts";


export const AuthForm = () => {
    const { register, handleSubmit, formState: { errors, isValid } } = useForm<IAuthForm>({
        mode: 'all',
        resolver: joiResolver(userAuthValidator),
    });

    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    const loginHandler = async (data: IAuthForm) => {
        const userWithTokens = await login({ ...data, expiresInMins: 1 });
        dispatch(authSliceActions.login(userWithTokens));
        navigate('/auth/recipes');
    };

    return (
        <form onSubmit={handleSubmit(loginHandler)}>

            <label>
                <input type="text" placeholder="Username"{...register('username')}/>
                {errors.username && <div>{errors.username.message}</div>}
            </label>

            <label>
                <input type="password" placeholder="Password"{...register('password')}/>
                {errors.password && <div>{errors.password.message}</div>}
            </label>

            <button type="submit" disabled={!isValid}>Login</button>

        </form>
    );
};