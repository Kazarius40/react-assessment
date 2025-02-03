import {useState} from "react";
import {IRecipe} from "../../models/recipe/IRecipe";
import {Link} from "react-router-dom";

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
        <>
            <h2>Список рецептів</h2>

            <input
                type="text"
                placeholder="Введіть назву рецепта"
                value={search}
                onChange={e => setSearch(e.target.value)}
            />

            <ul>
                {filteredRecipes.map(recipe => (
                    <li key={recipe.id}>
                        <p>
                            <strong>ID:</strong> {recipe.id}
                        </p>
                        <p>
                            <strong>Назва:</strong> {recipe.name}
                        </p>
                        <Link to={"/auth/recipes/" + recipe.id}>Переглянути рецепт</Link>
                    </li>
                ))}
            </ul>
        </>
    );
};
