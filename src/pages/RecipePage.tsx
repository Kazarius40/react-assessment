import {useParams, Link} from "react-router-dom";
import {useEffect, useState} from "react";
import {IRecipe} from "../models/recipe/IRecipe.ts";
import {IUser} from "../models/user/IUser.ts";
import {IRecipes} from "../models/recipes/IRecipes.ts";
import {axiosInstance} from "../services/api.service.ts";
import {refresh} from "../services/auth.service.ts";
import {RecipeDetails} from "../components/recipes/RecipeDetails.tsx";
import {RecipeAuthor} from "../components/recipes/RecipeAuthor.tsx";


export const RecipePage = () => {
    const { recipeId, tag } = useParams<{ recipeId: string, tag?: string }>();
    const [recipe, setRecipe] = useState<IRecipe | null>(null);
    const [author, setAuthor] = useState<IUser | null>(null);
    const [recipes, setRecipes] = useState<IRecipe[]>([]);

    useEffect(() => {
        const fetchRecipeData = async (retry = false) => {
            try {
                const {data: recipesData} = await axiosInstance.get<IRecipes>("/auth/recipes");
                setRecipes(recipesData.recipes);
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

    const filteredRecipes = tag ? recipes.filter(recipe => recipe.tags.includes(tag)) : recipes;

    if (!recipe) return <div>Завантаження...</div>;

    return (
        <div>
            <RecipeDetails recipe={recipe}/>
            <RecipeAuthor author={author}/>
            <div>
                <h3>Теги</h3>
                {recipe.tags.map((tag, index) => (
                    <Link key={index} to={'/auth/recipes/' + tag} className="tag">{tag}</Link>
                ))}
            </div>
            <div>
                <h3>Список рецептів</h3>
                <ul>
                    {filteredRecipes.map((recipe, index) => (
                        <li key={index}><Link to={'/auth/recipes/' + recipe.id}>{recipe.name}</Link></li>
                    ))}
                </ul>
            </div>
            <Link to="/auth/recipes">Назад до списку рецептів</Link>
        </div>
    );
};
