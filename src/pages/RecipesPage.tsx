import {RecipesComponent} from "../components/recipes/RecipesComponent.tsx";
import {PaginationComponent} from "../components/pagination/PaginationComponent.tsx";
import {useCallback, useEffect, useState} from "react";
import {refresh} from "../services/auth.service.ts";
import {IRecipe} from "../models/recipe/IRecipe.ts";
import {useAppSelector} from "../redux/hooks/useAppSelector.ts";
import {fetchRecipesApi} from "../services/recipes.service.ts";
import {useDispatch} from "react-redux";
import {paginationSlice} from "../redux/slices/paginationSlice.ts";
import {useLocation} from "react-router-dom";

export const RecipesPage = () => {
    const {limit, page} = useAppSelector(state => state.pagination);
    const [recipes, setRecipes] = useState<IRecipe[]>([]);
    const [allRecipes, setAllRecipes] = useState<IRecipe[]>([]);
    const dispatch = useDispatch();
    const location = useLocation();

    const fetchAllRecipes = useCallback(async () => {
        const localStorageRecipes = localStorage.getItem("allRecipes");

        if (localStorageRecipes) {
            const parsedRecipes = JSON.parse(localStorageRecipes);
            setAllRecipes(parsedRecipes);
            dispatch(paginationSlice.actions.setTotal(parsedRecipes.length));
        } else {
            try {
                const data = await fetchRecipesApi();

                if (JSON.stringify(data.recipes) !== localStorageRecipes) {
                    localStorage.setItem("allRecipes", JSON.stringify(data.recipes));
                    setAllRecipes(data.recipes);
                    dispatch(paginationSlice.actions.setTotal(data.total));
                }
            } catch {
                await refresh();
                return fetchAllRecipes();
            }
        }
    }, [dispatch]);

    const fetchRecipes = useCallback(() => {
        const firstIndex = (page - 1) * limit;
        const lastIndex = firstIndex + limit;
        setRecipes(allRecipes.slice(firstIndex, lastIndex));
    }, [allRecipes, limit, page]);

    useEffect(() => {
        if (location.pathname.includes("auth/recipes")) {
            dispatch(paginationSlice.actions.setPage(1));
        }
        fetchAllRecipes().catch(console.error);
    }, [fetchAllRecipes, dispatch, location]);

    useEffect(() => {
        fetchRecipes();
    }, [fetchRecipes]);

    return (
        <>
            <PaginationComponent/>
            <RecipesComponent recipes={recipes} allRecipes={allRecipes}/>
        </>
    );
};
