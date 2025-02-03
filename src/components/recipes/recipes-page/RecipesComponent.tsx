import {useState} from "react";
import {IRecipe} from "../../../models/recipe/IRecipe.ts";
import {Link} from "react-router-dom";
import "./RecipesComponent.css"

interface RecipesComponentProps {
    recipes: IRecipe[];
    allRecipes: IRecipe[];
}

export const RecipesComponent = ({recipes, allRecipes}: RecipesComponentProps) => {
    const [search, setSearch] = useState("");

    const filteredRecipes = search
        ? allRecipes.filter(({name, id}) =>
            name.toLowerCase().includes(search.toLowerCase()) ||
            id.toString().includes(search)
        )
        : recipes;

    return (
        <div className="recipes-container">
            <h2 className="recipes-title">Список рецептів</h2>

            <input
                type="text"
                className="recipes-search"
                placeholder="Введіть назву рецепта"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <ul className="recipes-list">
                {filteredRecipes.map(recipe => (
                    <li key={recipe.id} className="recipe-item">
                        <p className="recipe-id">
                            <strong>ID:</strong> {recipe.id}
                        </p>
                        <p className="recipe-name">
                            <strong>Назва:</strong> {recipe.name}
                        </p>
                        <Link className="recipe-link" to={"/auth/recipes/" + recipe.id}>Переглянути рецепт</Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};
