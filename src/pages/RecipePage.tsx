import {Link, useParams} from "react-router-dom";
import {useEffect} from "react";
import {RecipeDetails} from "../components/recipes/RecipeDetails.tsx";
import {RecipeAuthor} from "../components/recipes/RecipeAuthor.tsx";
import {useAppSelector} from "../redux/hooks/useAppSelector.ts";
import {IRecipe} from "../models/recipe/IRecipe.ts";
import {useAppDispatch} from "../redux/hooks/useAppDispatch.ts";
import {fetchRecipes} from "../redux/slices/recipesSlice.ts";

export const RecipePage = () => {
    const {recipeId} = useParams<{recipeId: string}>();
    const dispatch = useAppDispatch();
    const {recipes, loading} = useAppSelector(state => state.recipes);

    useEffect(() => {
        dispatch(fetchRecipes({limit: 10, page: 1}));
    }, [dispatch]);

    const recipe = recipes.find((recipe: IRecipe) => recipe.id === Number(recipeId));

    if (loading) return <div>Завантаження...</div>;
    if (!recipe) return <div>Рецепт не знайдено</div>;

    return (
        <div>
            <RecipeDetails recipe={recipe}/>
            <RecipeAuthor authorId={recipe.userId}/>
            <Link to={"/auth/recipes"}>Назад до списку рецептів</Link>
        </div>
    );
};
