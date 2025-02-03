import {Link} from "react-router-dom";
import {FC} from "react";
import {IRecipe} from "../../../../models/recipe/IRecipe.ts";
import "./UserRecipes.css"

interface IUserRecipesProps {
    recipes: IRecipe[];
}

export const UserRecipes: FC<IUserRecipesProps> = ({recipes}) => {
    return (
        <div className="user-recipes-container">
            <h3 className="user-recipes-title">Рецепти користувача:</h3>
            {recipes.length > 0 ? (
                <ul className="user-recipes-list">
                    {recipes.map(recipe => (
                        <li key={recipe.id} className="user-recipes-item">
                            <Link to={'/auth/recipes/' + recipe.id}>{recipe.name}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p className="no-recipes-message">Рецепти у даного користувача відсутні</p>
            )}
        </div>
    );
};
