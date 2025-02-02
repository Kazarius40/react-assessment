import {RecipesComponent} from "../components/recipes/RecipesComponent.tsx";
import {PaginationComponent} from "../components/pagination/PaginationComponent.tsx";
import {useCallback, useEffect, useState} from "react";
import {refresh} from "../services/auth.service.ts";
import {IRecipe} from "../models/recipe/IRecipe.ts";
import {useAppSelector} from "../redux/hooks/useAppSelector.ts";
import {useDispatch} from "react-redux";
import {paginationSliceActions} from "../redux/slices/paginationSlice.ts";
import {fetchRecipesApi} from "../services/recipes.service.ts";

export const RecipesPage = () => {
    const dispatch = useDispatch();
    const {limit, page} = useAppSelector(state => state.pagination);
    const [recipes, setRecipes] = useState<IRecipe[]>([]);

    const fetchRecipes = useCallback(async (retry = false) => {
        try {
            const data = await fetchRecipesApi(limit, page);
            setRecipes(data.recipes);
            dispatch(paginationSliceActions.setTotal(data.total));
        } catch {
            if (!retry) {
                await refresh();
                return fetchRecipes(true);
            }
        }
    }, [limit, page, dispatch]);

    useEffect(() => {
        fetchRecipes().catch(error => console.error(error));
    }, [fetchRecipes]);

    return (
        <>
            <PaginationComponent/>
            <RecipesComponent recipes={recipes}/>
        </>
    );
};
