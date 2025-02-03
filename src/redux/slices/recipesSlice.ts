import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {fetchRecipesApi} from "../../services/recipes.service.ts";
import {IRecipe} from "../../models/recipe/IRecipe.ts";

interface RecipesState {
    recipes: IRecipe [];
    loading: boolean;
}

const initialState: RecipesState = {
    recipes: [],
    loading: false,
};

export const fetchRecipes = createAsyncThunk(
    "recipes/fetchRecipes",
    async ({limit, page}: {limit: number; page: number}) => {
        return await fetchRecipesApi(limit, page);
    }
);

export const recipesSlice = createSlice({
    name: "recipes",
    initialState: initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchRecipes.pending, (state) => {
            state.loading = true;
        });
        builder.addCase(fetchRecipes.fulfilled, (state, {payload}) => {
            state.recipes = payload.recipes;
            state.loading = false;
        });
        builder.addCase(fetchRecipes.rejected, (state) => {
            state.loading = false;
        });
    },
});