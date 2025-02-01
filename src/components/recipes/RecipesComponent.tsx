import { useCallback, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IRecipes } from "../../models/recipes/IRecipes";
import { IRecipe } from "../../models/recipe/IRecipe";
import { axiosInstance } from "../../services/api.service";
import { refresh } from "../../services/auth.service";

export const RecipesComponent = () => {
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [search, setSearch] = useState("");

    const fetchRecipes = useCallback(async (retry = false) => {
        try {
            const { data: { total } } = await axiosInstance.get<IRecipes>("/auth/recipes?limit=1");
            const { data } = await axiosInstance.get<IRecipes>("/auth/recipes?limit=" + total);
            setRecipes(data.recipes);
        } catch {
            if (!retry) {
                await refresh();
                return fetchRecipes(true);
            }
        }
    }, []);

    useEffect(() => {
        fetchRecipes().catch(error => console.error("Помилка:", error));
    }, [fetchRecipes]);

    const filteredRecipes = recipes.filter(({ name, id }) =>
        name.toLowerCase().includes(search.toLowerCase()) ||
        id.toString().includes(search)
    );

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
