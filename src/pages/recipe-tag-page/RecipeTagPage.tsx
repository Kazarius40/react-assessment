import {useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {IRecipe} from "../../models/recipe/IRecipe.ts";
import {Link} from "react-router-dom";
import {RecipeList} from "../../components/recipes/recipe-tag-page/recipe-list/RecipeList.tsx";
import "./RecipeTagPage.css"

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
        <div className="recipe-tag-page">
            <h3 className="recipe-tag-title">Рецепти з тегом: {tag}</h3>

            <RecipeList recipes={recipes}/>

            <Link className="recipe-tag-back-link" to="/auth/recipes">Назад до списку рецептів</Link>
        </div>
    );
};
