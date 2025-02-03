import {IRecipe} from "../../../../models/recipe/IRecipe.ts";
import {Link} from "react-router-dom";
import "./RecipeDetails.css"

interface IRecipeDetailsProps {
    recipe: IRecipe;
}

export const RecipeDetails = ({recipe}: IRecipeDetailsProps) => {
    return (
        <div className="recipe-details-container">
            <h2 className="recipe-details-title">{recipe.name}</h2>
            <ul className="recipe-details-instructions">
                {recipe.instructions.map((step, index) => (
                    <li className="recipe-details-step" key={index}>{step}</li>
                ))}
            </ul>
            <div className="recipe-details-tags">
                <h4 className="recipe-details-tags-title">Теги:</h4>
                {recipe.tags.map((tag, index) => (
                    <div key={index}>
                        <Link className="recipe-details-tag-link" to={'/auth/recipes/tag/' + tag}>{tag}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
