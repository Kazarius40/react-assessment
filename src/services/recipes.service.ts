import {axiosInstance} from "./api.service.ts";
import {IRecipes} from "../models/recipes/IRecipes.ts";

export const fetchRecipesApi = async (limit: number, page: number): Promise<IRecipes> => {
    const skip = (page - 1) * limit;
    const {data} = await axiosInstance.get<IRecipes>("/auth/recipes", {params: {limit, skip}});
    return data;
};