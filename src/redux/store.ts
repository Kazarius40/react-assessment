import {configureStore} from "@reduxjs/toolkit";
import {authSlice} from "./slices/authSlice.ts";
import {paginationSlice} from "./slices/paginationSlice.ts";
import {recipesSlice} from "./slices/recipesSlice.ts";

export const store = configureStore({
    reducer: {
        authorization: authSlice.reducer,
        pagination: paginationSlice.reducer,
        recipes: recipesSlice.reducer,
    }
});