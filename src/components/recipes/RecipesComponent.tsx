import {useCallback, useEffect, useState} from "react";
import {Link, useSearchParams} from "react-router-dom";
import {IRecipes} from "../../models/recipes/IRecipes";
import {IRecipe} from "../../models/recipe/IRecipe";
import {axiosInstance} from "../../services/api.service";
import {refresh} from "../../services/auth.service";

export const RecipesComponent = () => {
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [search, setSearch] = useState("");
    const [query, setQuery] = useSearchParams({pg: "1"});


    const fetchRecipes = useCallback(async (retry = false) => {
        try {
            const pg = Number(query.get('pg')) || 1;
            const limit = 10;
            const skip = (pg - 1) * limit;

            const {data} = await axiosInstance.get<IRecipes>("/auth/recipes", {
                params: {limit, skip}
            });
            setRecipes(data.recipes);
        } catch {
            if (!retry) {
                await refresh();
                return fetchRecipes(true);
            }
        }
    }, []);

    useEffect(() => {
        fetchRecipes().catch(error => console.error(error));
    }, [fetchRecipes]);

    const filteredRecipes = recipes.filter(({name, id}) =>
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

            <button
                onClick={() => {
                    const pg = Number(query.get('pg'));
                    if (pg > 1) {
                        let currentPage = +pg;
                        setQuery({pg: (--currentPage).toString()});
                    }
                }}
            >
                Попередня
            </button>

            <button
                onClick={() => {
                    const pg = query.get('pg');
                    if (pg) {
                        let currentPage = +pg;
                        setQuery({pg: (++currentPage).toString()});
                    }
                }}
            >
                Наступна
            </button>
        </>
    );
};
