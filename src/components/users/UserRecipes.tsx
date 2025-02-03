import {Link} from "react-router-dom";
import {FC} from "react";
import {IRecipe} from "../../models/recipe/IRecipe.ts";

interface IUserRecipesProps {
    recipes: IRecipe[];
}

export const UserRecipes: FC<IUserRecipesProps> = ({recipes}) => {
    return (
        <div>
            <h3>Рецепти користувача:</h3>
            {recipes.length > 0 ? (
                <ul>
                    {recipes.map(recipe => (
                        <li key={recipe.id}>
                            <Link to={'/auth/recipes/' + recipe.id}>{recipe.name}</Link>
                        </li>
                    ))}
                </ul>
            ) : (
                <p>Рецепти у даного користувача відсутні</p>
            )}
        </div>
    );
};
