import { IRecipe } from "../../models/recipe/IRecipe.ts";
import {Link} from "react-router-dom";

interface IRecipeDetailsProps {
    recipe: IRecipe;
}

export const RecipeDetails = ({ recipe }: IRecipeDetailsProps) => {
    return (
        <div>
            <h2>{recipe.name}</h2>
            <ul>
                {recipe.instructions.map((step, index) => (
                    <li key={index}>{step}</li>
                ))}
            </ul>
            <div>
                <h4>Теги:</h4>
                {recipe.tags.map((tag, index) => (
                    <div key={index}>
                        <Link to={'/auth/recipes/tag/' + tag}>{tag}</Link>
                    </div>
                ))}
            </div>
        </div>
    );
};
