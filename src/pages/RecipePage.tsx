import {useParams, Link, useSearchParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IRecipe} from "../models/recipe/IRecipe.ts";
import {IUser} from "../models/user/IUser.ts";
import {IRecipes} from "../models/recipes/IRecipes.ts";
import {axiosInstance} from "../services/api.service.ts";
import {RecipeDetails} from "../components/recipes/RecipeDetails.tsx";
import {RecipeAuthor} from "../components/recipes/RecipeAuthor.tsx";
import {refresh} from "../services/auth.service.ts";

export const RecipePage = () => {
    const {recipeId, tag} = useParams<{ recipeId: string; tag?: string }>();
    const [recipe, setRecipe] = useState<IRecipe | null>(null);
    const [author, setAuthor] = useState<IUser | null>(null);
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [query] = useSearchParams();

    useEffect(() => {
        const fetchRecipeData = async (retry = false) => {
            try {
                const pg = Number(query.get('pg')) || 1;
                const limit = 10;
                const skip = (pg - 1) * limit;

                const {data: recipesData} = await axiosInstance.get<IRecipes>("/auth/recipes", {
                    params: {limit, skip}
                });
                setRecipes(recipesData.recipes);

                const foundRecipe = recipesData.recipes.find(recipe => recipe.id === Number(recipeId));

                if (!foundRecipe) {
                    setRecipe(null);
                    return;
                }

                setRecipe(foundRecipe);

                const {data: userData} = await axiosInstance.get<IUser>("/auth/users/" + foundRecipe.userId);
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
    }, [recipeId, query]);

    const filteredRecipes = tag ? recipes.filter(recipe => recipe.tags.includes(tag)) : recipes;

    if (!recipe) return <div>Завантаження...</div>;

    return (
        <div>
            <RecipeDetails recipe={recipe}/>
            <RecipeAuthor author={author}/>
            <div>
                <h3>Список рецептів</h3>
                {filteredRecipes.map(recipe => (
                    <div key={recipe.id}>
                        <Link to={"/auth/recipes/" + recipe.id}>{recipe.name}</Link>
                    </div>
                ))}
            </div>
            <Link to="/auth/recipes">Назад до списку рецептів</Link>
        </div>
    );
};
