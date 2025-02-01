import {createBrowserRouter} from "react-router-dom";
import {MainLayout} from "../layouts/MainLayout.tsx";
import {AuthorizationPage} from "../pages/AuthorizationPage.tsx";
import {UsersPage} from "../pages/UsersPage.tsx";
import {UserPage} from "../pages/UserPage.tsx";
import {RecipesPage} from "../pages/RecipesPage.tsx";
import {RecipePage} from "../pages/RecipePage.tsx";
import {RecipeTagPage} from "../pages/RecipeTagPage.tsx";

export const routes = createBrowserRouter([
    {
        path: '/',
        element: <MainLayout/>,
        children: [
            {path: 'auth', element: <AuthorizationPage/>},
            {path: 'auth/users', element: <UsersPage/>},
            {path: 'auth/users/:userId', element: <UserPage/>},
            {path: 'auth/recipes', element: <RecipesPage/>},
            {path: 'auth/recipes/:recipeId', element: <RecipePage/>},
            {path: '/auth/recipes/tag/:tag', element: <RecipeTagPage/>}
        ],
    },
])