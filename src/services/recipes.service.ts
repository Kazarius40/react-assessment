import {axiosInstance} from "./api.service.ts";
import {IRecipes} from "../models/recipes/IRecipes.ts";

export const fetchRecipesApi = async (): Promise<IRecipes> => {
    const {data: initialData} = await axiosInstance.get<IRecipes>("/auth/recipes");
    const total = initialData.total;

    const {data} = await axiosInstance.get<IRecipes>("/auth/recipes", {
        params: {limit: total}
    });

    return {recipes: data.recipes, total};
};