import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IRecipe} from "../models/recipe/IRecipe.ts";
import {IRecipes} from "../models/recipes/IRecipes.ts";
import {axiosInstance} from "../services/api.service.ts";
import {Link} from "react-router-dom";

export const RecipeTagPage = () => {
    const {tag} = useParams<{ tag: string }>();
    const [recipes, setRecipes] = useState<IRecipe[]>([]);

    useEffect(() => {
        if (!tag) return;

        axiosInstance
            .get<IRecipes>('/auth/recipes/search?q=' + tag)
            .then(({data}) => setRecipes(data.recipes || []))
            .catch(console.error);
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
