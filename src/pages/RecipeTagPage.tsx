import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IRecipe} from "../models/recipe/IRecipe.ts";

export const RecipeTagPage = () => {
    const {tag} = useParams<{tag: string}>();
    const [recipes, setRecipes] = useState<IRecipe[]>([]);

    useEffect(() => {
        const localStorageRecipes = localStorage.getItem("allRecipes");

        if (localStorageRecipes && tag) {
            const recipes = JSON.parse(localStorageRecipes);
            const filteredRecipes = recipes.filter((recipe: IRecipe) => recipe.tags.includes(tag));
            setRecipes(filteredRecipes);
        }
    }, [tag]);


    return (
        <div>
            <h3>Рецепти з тегом: {tag}</h3>
            <ul>
                {recipes.map(recipe => (
                    <li key={recipe.id}>
                        <Link to={"/auth/recipes/" + recipe.id}>{recipe.name}</Link>
                    </li>
                ))}
            </ul>
            <Link to="/auth/recipes">Назад до списку рецептів</Link>
        </div>
    );
};
