import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";
import {RecipeDetails} from "../../components/recipes/recipe-page/recipe-details/RecipeDetails.tsx";
import {RecipeAuthor} from "../../components/recipes/recipe-page/recipe-author/RecipeAuthor.tsx";
import {IRecipe} from "../../models/recipe/IRecipe.ts";
import "./RecipePage.css"

export const RecipePage = () => {
    const {recipeId} = useParams<{recipeId: string}>();
    const [recipe, setRecipe] = useState<IRecipe | null>(null);

    useEffect(() => {
        const localStorageRecipes = localStorage.getItem("allRecipes");

        if (localStorageRecipes) {
            const recipes = JSON.parse(localStorageRecipes);
            const foundRecipe = recipes.find((recipe: IRecipe) => recipe.id === Number(recipeId));
            setRecipe(foundRecipe || null);
        }
    }, [recipeId]);

    return (
        <div className="recipe-page-container">
            {recipe && (
                <>
                    <RecipeDetails recipe={recipe}/>
                    <RecipeAuthor authorId={recipe.userId}/>
                </>
            )}
            <Link className="recipe-page-link" to={"/auth/recipes"}>Назад до списку рецептів</Link>
        </div>
    );
};
