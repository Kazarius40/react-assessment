import {IRecipe} from "../../../../models/recipe/IRecipe.ts";
import {RecipeListItem} from "../recipe-list-item/RecipeListItem.tsx";
import "./RecipeList.css"

interface RecipeListProps {
    recipes: IRecipe[];
}

export const RecipeList = ({recipes}: RecipeListProps) => {
    return (
        <ul className="recipe-list">
            {recipes.map((recipe) => (
                <RecipeListItem key={recipe.id} recipe={recipe}/>
            ))}
        </ul>
    );
};
