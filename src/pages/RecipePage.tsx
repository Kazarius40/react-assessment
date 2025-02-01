import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { IRecipe } from "../models/recipe/IRecipe.ts";
import { IUser } from "../models/user/IUser.ts";
import { IRecipes } from "../models/recipes/IRecipes.ts";
import { axiosInstance } from "../services/api.service.ts";
import { refresh } from "../services/auth.service.ts";

export const RecipePage = () => {
    const {recipeId} = useParams<{recipeId: string }>();
    const [recipe, setRecipe] = useState<IRecipe | null>(null);
    const [author, setAuthor] = useState<IUser | null>(null);

    useEffect(() => {
        const fetchRecipeData = async (retry = false) => {
            try {
                const { data: recipesData } = await axiosInstance.get<IRecipes>("/auth/recipes");
                const foundRecipe = recipesData.recipes.find(recipe => recipe.id === Number(recipeId));

                if (!foundRecipe) return;
                setRecipe(foundRecipe);

                const {data: userData} = await axiosInstance.get<IUser>('/auth/users/' + foundRecipe.userId);
                setAuthor(userData);
            } catch {
                if (!retry) {
                    await refresh();
                    return fetchRecipeData(true);
                }
            }
        };

        (async () => {
            await fetchRecipeData();
        })();
    }, [recipeId]);

    if (!recipe) return <div>Завантаження...</div>;

    return (
        <div>
            <h2>{recipe.name}</h2>
            <ul>
                {recipe.instructions.map((info, index) => (
                    <li key={index}>{info}</li>
                ))}
            </ul>
            {author && (
                <p>
                    Автор: <Link to={'/auth/users/' + author.id}>{author.firstName} {author.lastName}</Link>
                </p>
            )}
            <Link to="/auth/recipes">Назад до списку рецептів</Link>
        </div>
    );
};
