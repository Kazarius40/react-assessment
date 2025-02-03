import {Link} from "react-router-dom";
import {IRecipe} from "../../../../models/recipe/IRecipe.ts";
import "./RecipeListItem.css"

interface RecipeListItemProps {
    recipe: IRecipe;
}

export const RecipeListItem = ({recipe}: RecipeListItemProps) => {
    return (
        <li className="recipe-list-item">
            <Link to={"/auth/recipes/" + recipe.id}>{recipe.name}</Link>
        </li>
    );
};
