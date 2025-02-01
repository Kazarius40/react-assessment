import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IUser} from "../models/user/IUser.ts";
import {IRecipe} from "../models/recipe/IRecipe.ts";
import {IRecipes} from "../models/recipes/IRecipes.ts";
import {axiosInstance} from "../services/api.service.ts";
import {refresh} from "../services/auth.service.ts";
import {UserInfo} from "../components/user/UserInfo.tsx";
import {UserRecipes} from "../components/user/UserRecipes.tsx";

export const UserPage = () => {
    const {userId} = useParams<{ userId: string }>();
    const [user, setUser] = useState<IUser | null>(null);
    const [recipes, setRecipes] = useState<IRecipe[]>([]);

    useEffect(() => {
        const fetchUserData = async (retry = false) => {
            try {
                const {data} = await axiosInstance.get<IUser>("/auth/users/" + userId);
                setUser(data);

                const recipesResponse = await axiosInstance.get<IRecipes>("/auth/recipes");
                const userRecipes = recipesResponse.data.recipes.filter(recipe => recipe.userId === Number(userId));
                setRecipes(userRecipes);
            } catch {
                if (!retry) {
                    await refresh();
                    return fetchUserData(true);
                }
            }
        };

        (async () => {
            await fetchUserData();
        })();
    }, [userId]);


    if (!user) return <div>Завантаження...</div>;


    return (
        <>
            <UserInfo user={user} />
            <UserRecipes recipes={recipes} />
        </>
    );
};