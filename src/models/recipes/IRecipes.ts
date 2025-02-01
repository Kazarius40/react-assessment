import {IRecipe} from "../recipe/IRecipe.ts";

export interface IRecipes {
    recipes: IRecipe[];
    total: number;
    skip: number;
    limit: number;
}